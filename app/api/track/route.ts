import { NextRequest, NextResponse } from "next/server";

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
  referrer: string;
  isDarkMode: boolean;
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
      !!chatId
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

  const message = `${deviceEmoji} <b>New Visitor</b>

📍 <b>Location:</b> ${demographics.city}, ${demographics.country}
   Coordinates: ${demographics.latitude.toFixed(
     2
   )}°, ${demographics.longitude.toFixed(2)}°

📱 <b>Device:</b> ${demographics.deviceName}
📏 <b>Screen Size:</b> ${demographics.screenWidth}x${demographics.screenHeight}

${themeEmoji} <b>Theme:</b> ${demographics.isDarkMode ? "Dark" : "Light"} Mode
🌐 <b>Language:</b> ${demographics.language}
⏰ <b>Timezone:</b> ${demographics.timezone}

🔗 <b>Referrer:</b> ${demographics.referrer || "Direct"}
⌚ <b>Timestamp:</b> ${new Date(demographics.timestamp).toLocaleString()}`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

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
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Telegram] Send failed:", response.status, errorText);
    } else {
      console.log("[Telegram] Message sent successfully!");
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.error("[Telegram] Request timeout after 5 seconds");
      } else {
        console.error("[Telegram] Error:", error.message);
      }
    } else {
      console.error("[Telegram] Unknown error:", error);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DemographicsData;

    // Validate required fields
    if (!body.timestamp || !body.userAgent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to Telegram asynchronously (don't wait)
    sendToTelegram(body).catch(console.error);

    return NextResponse.json(
      { success: true, message: "Demographics tracked" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
