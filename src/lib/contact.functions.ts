import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  vehicle: z.string().trim().max(120).optional(),
  request: z.string().trim().min(5).max(1200),
  language: z.enum(["pl", "en"]),
});

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const telegramKey = process.env["TELEGRAM_API_KEY"];
    const chatId = process.env["TELEGRAM_CHAT_ID"];

    if (!lovableKey || !telegramKey || !chatId) {
      throw new Error("Telegram is not connected yet");
    }

    const text = [
      "<b>New website inquiry</b>",
      `<b>Name:</b> ${escapeHtml(data.name)}`,
      `<b>Phone:</b> ${escapeHtml(data.phone)}`,
      data.vehicle ? `<b>Vehicle:</b> ${escapeHtml(data.vehicle)}` : undefined,
      `<b>Request:</b> ${escapeHtml(data.request)}`,
      `<b>Language:</b> ${data.language.toUpperCase()}`,
    ].filter(Boolean).join("\n");

    const response = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": telegramKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });

    const body = await response.text();
    if (!response.ok) {
      console.error(`Telegram request failed [${response.status}]: ${body}`);
      throw new Error(`Telegram request failed [${response.status}]: ${body}`);
    }
    const result = JSON.parse(body) as { ok?: boolean; error?: string };
    if (!result.ok) throw new Error(result.error ?? "Telegram rejected the message");
    return { ok: true };
  });

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}