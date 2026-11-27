import { Resend } from "resend";
import { NextResponse } from "next/server";

// Inbox that receives contact-form messages. Set on Vercel, never committed.
const TO = process.env.CONTACT_TO;
const FROM = process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit: 5 messages per IP per 10 minutes, per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages, try again later" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real visitors never see or fill the "company" field.
  if (typeof company === "string" && company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const cleanName = name.replace(/[\r\n]+/g, " ").trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (
    cleanName.length > LIMITS.name ||
    cleanEmail.length > LIMITS.email ||
    cleanMessage.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !TO) {
    console.error("Contact form error: RESEND_API_KEY or CONTACT_TO is not set");
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: cleanEmail,
      subject: `Portfolio contact from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
