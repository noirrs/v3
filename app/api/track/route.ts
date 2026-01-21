import { NextRequest, NextResponse } from "next/server";

// Force Node.js runtime for reliable outbound HTTP calls
// Edge runtime has stricter timeouts and different fetch behavior
export const runtime = "nodejs";

// Increase max duration for Vercel serverless function (default is 10s on hobby, 60s on pro)
export const maxDuration = 10;

interface DemographicsData {
  timestamp: string;
  userAgent: string;
  language: string;
  timezone: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  screenWidth: number;
  screenHeight: number;
  deviceType: string;
  deviceName: string;
  browserName: string;
  browserVersion: string;
  os: string;
  connectionType: string;
  referrer: string;
  isDarkMode: boolean;
  visitedDomain: string;
  visitedUrl: string;
  visitorId: string;
  eventType?: "page_load" | "section_view";
  sectionName?: string;
}

async function sendToTelegram(demographics: DemographicsData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log("[Telegram] Attempting to send message...");
  console.log("[Telegram] Token exists:", !!botToken);
  console.log("[Telegram] Chat ID exists:", !!chatId);

  if (!botToken || !chatId) {
    console.error(
      "[Telegram] Missing credentials - Token:",
      !!botToken,
      "Chat ID:",
      !!chatId,
    );
    return;
  }

  const deviceEmoji =
    demographics.deviceType === "mobile"
      ? "📱"
      : demographics.deviceType === "tablet"
        ? "📊"
        : "🖥️";

  const themeEmoji = demographics.isDarkMode ? "🌙" : "☀️";
  const environmentEmoji =
    demographics.visitedDomain === "localhost" ? "🧪" : "🚀";

  // Section emoji mapping
  const sectionEmojis: Record<string, string> = {
    education: "🎓",
    experience: "💼",
    projects: "🚀",
    resume: "📄",
  };

  let message = "";

  if (demographics.eventType === "section_view" && demographics.sectionName) {
    const sectionEmoji = sectionEmojis[demographics.sectionName] || "📍";
    const sectionTitle =
      demographics.sectionName.charAt(0).toUpperCase() +
      demographics.sectionName.slice(1);

    message = `${sectionEmoji} <b>Section Navigation</b>

🆔 <b>Visitor:</b> <code>${demographics.visitorId}</code>
📌 <b>Section:</b> ${sectionTitle}
${deviceEmoji} <b>Device:</b> ${demographics.deviceName}🌐 <b>Browser:</b> ${demographics.browserName} ${demographics.browserVersion}
💻 <b>OS:</b> ${demographics.os}${themeEmoji} <b>Theme:</b> ${demographics.isDarkMode ? "Dark" : "Light"}
⌚ <b>Time:</b> ${new Date(demographics.timestamp).toLocaleString()}`;
  } else {
    message = `${deviceEmoji} <b>New Visitor</b>

🆔 <b>Visitor ID:</b> <code>${demographics.visitorId}</code>

${environmentEmoji} <b>Environment:</b> ${
      demographics.visitedDomain === "localhost" ? "Development" : "Production"
    }
📍 <b>Domain:</b> ${demographics.visitedDomain}

📍 <b>Location:</b> ${demographics.city}, ${demographics.country}
   Coordinates: ${demographics.latitude.toFixed(
     2,
   )}°, ${demographics.longitude.toFixed(2)}°

📱 <b>Device:</b> ${demographics.deviceName}
� <b>OS:</b> ${demographics.os}
🌐 <b>Browser:</b> ${demographics.browserName} ${demographics.browserVersion}
📶 <b>Connection:</b> ${demographics.connectionType}
📏 <b>Screen Size:</b> ${demographics.screenWidth}x${demographics.screenHeight}

${themeEmoji} <b>Theme:</b> ${demographics.isDarkMode ? "Dark" : "Light"} Mode
🗣 <b>Language:</b> ${demographics.language}
⏰ <b>Timezone:</b> ${demographics.timezone}

🔗 <b>Referrer:</b> ${demographics.referrer || "Direct"}
🌍 <b>Visited URL:</b> ${demographics.visitedUrl}
⌚ <b>Timestamp:</b> ${new Date(demographics.timestamp).toLocaleString()}`;
  }

  try {
    // Removed AbortController - let Vercel's maxDuration handle timeouts
    // Cold starts can take 3-5s, so 5s timeout was too aggressive
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Telegram] Send failed:", response.status, errorText);
      throw new Error(`Telegram API error: ${response.status}`);
    } else {
      console.log("[Telegram] Message sent successfully!");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Telegram] Error:", error.message);
    } else {
      console.error("[Telegram] Unknown error:", error);
    }
    // Re-throw to let the caller handle it
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DemographicsData;

    // Validate required fields
    if (!body.timestamp || !body.userAgent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // CRITICAL: Must await to ensure Telegram message is sent before function terminates
    // Vercel serverless functions kill the execution context when response is sent
    // This adds ~200-500ms latency but guarantees delivery
    await sendToTelegram(body);

    return NextResponse.json(
      { success: true, message: "Demographics tracked" },
      { status: 200 },
    );
  } catch (error) {
    console.error("API error:", error);
    // Even if Telegram fails, we return success to not block the client
    // Consider logging to external service for critical tracking
    return NextResponse.json(
      { success: true, message: "Request acknowledged" },
      { status: 200 },
    );
  }
}
