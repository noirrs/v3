# Telegram Webhook Delivery - Production Guide

## ✅ Current Implementation (Node.js + Await)

**File:** `app/api/track/route.ts`

**Approach:** Force Node.js runtime and await Telegram call before responding.

### Pros:

- ✅ 100% reliable delivery
- ✅ Simple, no external dependencies
- ✅ Free (included in Vercel)
- ✅ No additional services needed

### Cons:

- ⚠️ Adds ~200-500ms latency to client response
- ⚠️ User must wait for Telegram API to respond
- ⚠️ Fails client request if Telegram is down

### When to use:

- Analytics is critical and must be tracked
- Low-medium traffic (<1000 req/min)
- Acceptable to add latency for reliability

---

## 🚀 Alternative: External Queue Service (Production-Grade)

For **zero-latency** and **guaranteed delivery**, use a background job queue.

### Option 1: Upstash QStash (Recommended)

**Cost:** Free tier: 500 messages/day

```bash
npm install @upstash/qstash
```

```typescript
// app/api/track/route.ts
import { Client } from "@upstash/qstash";

const qstash = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Queue the Telegram send (instant response)
  await qstash.publishJSON({
    url: `${process.env.NEXT_PUBLIC_URL}/api/track/send-telegram`,
    body: body,
  });

  return NextResponse.json({ success: true });
}
```

```typescript
// app/api/track/send-telegram/route.ts (Worker endpoint)
export async function POST(request: NextRequest) {
  const body = await request.json();
  await sendToTelegram(body);
  return NextResponse.json({ success: true });
}
```

### Option 2: Vercel Cron + Database

Store events in a database, process them via cron every minute.

### Option 3: Inngest

Similar to QStash but with better DX and visual workflow builder.

---

## 🔧 Edge Runtime + waitUntil (Experimental)

**File:** `route.edge.ts.example`

Uses Edge runtime with `waitUntil()` API for fire-and-forget.

### Status:

- ⚠️ Experimental, may not be stable
- ⚠️ Not officially documented by Vercel
- ⚠️ May break in future Next.js versions

### When to use:

- You need instant responses
- You can tolerate occasional message drops
- You're willing to monitor and debug

---

## 📊 Recommendation

| Traffic Volume  | Recommended Approach              |
| --------------- | --------------------------------- |
| < 100 req/day   | **Node.js + Await** (current)     |
| 100-10k req/day | **Node.js + Await** or **QStash** |
| > 10k req/day   | **QStash or Inngest**             |

---

## 🐛 Why Fire-and-Forget Doesn't Work on Vercel

```typescript
// ❌ This DOES NOT WORK on Vercel
sendToTelegram(body).catch(console.error);
return NextResponse.json({ success: true });
```

**Why it fails:**

1. Response is sent immediately
2. Vercel terminates the serverless function
3. `sendToTelegram()` is killed mid-execution
4. Message never arrives

**Works locally because:**

- Local Node.js process stays alive
- Async operations continue after response

---

## 🔍 Debugging Checklist

If messages still don't arrive:

1. ✅ Check Vercel logs for errors
2. ✅ Verify `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel env vars
3. ✅ Test Telegram API directly with curl
4. ✅ Check function execution time (should be < 10s)
5. ✅ Monitor cold start times in Vercel dashboard
6. ✅ Ensure `runtime = "nodejs"` is set
