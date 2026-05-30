import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 10;

interface NoteRequest {
  note: string;
  username_hp?: string;
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
}

function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendNoteToTelegram(data: NoteRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("[Telegram Note] Missing credentials");
    return;
  }

  const deviceEmoji =
    data.deviceType === "mobile"
      ? "📱"
      : data.deviceType === "tablet"
        ? "📊"
        : "🖥️";

  const themeEmoji = data.isDarkMode ? "🌙" : "☀️";
  const environmentEmoji =
    data.visitedDomain === "localhost" ? "🧪" : "🚀";

  const formattedMessage = `📩 <b>New Anonymous Mini Note</b>

"<i>${escapeHtml(data.note)}</i>"

🆔 <b>Visitor ID:</b> <code>${escapeHtml(data.visitorId)}</code>

${environmentEmoji} <b>Environment:</b> ${
    data.visitedDomain === "localhost" ? "Development" : "Production"
  }
📍 <b>Domain:</b> ${escapeHtml(data.visitedDomain)}

📍 <b>Location:</b> ${escapeHtml(data.city)}, ${escapeHtml(data.country)}
   Coordinates: ${data.latitude ? data.latitude.toFixed(2) : 0}°, ${data.longitude ? data.longitude.toFixed(2) : 0}°

📱 <b>Device:</b> ${escapeHtml(data.deviceName)}
💻 <b>OS:</b> ${escapeHtml(data.os)}
🌐 <b>Browser:</b> ${escapeHtml(data.browserName)} ${escapeHtml(data.browserVersion)}
📶 <b>Connection:</b> ${escapeHtml(data.connectionType)}
📏 <b>Screen Size:</b> ${data.screenWidth}x${data.screenHeight}

${themeEmoji} <b>Theme:</b> ${data.isDarkMode ? "Dark" : "Light"} Mode
🗣 <b>Language:</b> ${escapeHtml(data.language)}
⏰ <b>Timezone:</b> ${escapeHtml(data.timezone)}

🔗 <b>Referrer:</b> ${escapeHtml(data.referrer || "Direct")}
🌍 <b>Visited URL:</b> ${escapeHtml(data.visitedUrl)}
⌚ <b>Timestamp:</b> ${new Date(data.timestamp).toLocaleString()}`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Telegram Note] Send failed:", response.status, errorText);
      throw new Error(`Telegram API error: ${response.status}`);
    }
  } catch (error) {
    console.error("[Telegram Note] Error sending:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NoteRequest;

    // Check Honeypot: if filled, drop it silently
    if (body.username_hp) {
      console.warn("[Honeypot Triggered] Silently dropped spam message.");
      return NextResponse.json(
        { success: true, message: "Note sent successfully" },
        { status: 200 }
      );
    }

    if (!body.note || typeof body.note !== "string" || body.note.trim() === "") {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    if (body.note.length > 300) {
      return NextResponse.json(
        { error: "Note exceeds 300 character limit" },
        { status: 400 }
      );
    }

    const allowedRegex = /^[a-zA-Z0-9\s.,!?'-]*$/;
    if (!allowedRegex.test(body.note)) {
      return NextResponse.json(
        { error: "Only letters, numbers, spaces, and basic punctuation are allowed (no links, colons, or slashes)." },
        { status: 400 }
      );
    }

    // Await Telegram delivery
    await sendNoteToTelegram(body);

    return NextResponse.json(
      { success: true, message: "Note sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error in note route:", error);
    return NextResponse.json(
      { success: true, message: "Note processed with warning" },
      { status: 200 }
    );
  }
}
