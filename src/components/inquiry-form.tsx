import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendInquiry } from "@/lib/contact.functions";
import { pick, useLanguage } from "@/lib/i18n";

export function InquiryForm() {
  const { language } = useLanguage();
  const send = useServerFn(sendInquiry);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    try {
      await send({ data: { name: String(values.get("name") ?? ""), phone: String(values.get("phone") ?? ""), vehicle: String(values.get("vehicle") ?? ""), request: String(values.get("request") ?? ""), language } });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return <form onSubmit={submit} className="rounded-lg bg-surface/70 p-5 ring-1 ring-foreground/10 backdrop-blur-md sm:p-7">
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="field-label">{pick(language, { pl: "Imię i nazwisko", en: "Name" })}<Input name="name" required minLength={2} /></label>
      <label className="field-label">{pick(language, { pl: "Telefon", en: "Phone" })}<Input name="phone" type="tel" required minLength={6} /></label>
    </div>
    <label className="field-label mt-4">{pick(language, { pl: "Samochód (marka, model, rok)", en: "Vehicle (make, model, year)" })}<Input name="vehicle" /></label>
    <label className="field-label mt-4">{pick(language, { pl: "Jakiej części szukasz?", en: "Which part do you need?" })}<Textarea name="request" required minLength={5} rows={4} /></label>
    <div className="mt-5 flex flex-wrap items-center gap-4"><Button variant="dark" type="submit" disabled={status === "sending"}><Send />{status === "sending" ? pick(language, { pl: "Wysyłanie…", en: "Sending…" }) : pick(language, { pl: "Wyślij zapytanie", en: "Send inquiry" })}</Button>{status === "sent" && <span className="flex items-center gap-2 text-sm font-semibold text-success"><CheckCircle2 size={17} />{pick(language, { pl: "Wiadomość wysłana", en: "Message sent" })}</span>}{status === "error" && <span className="text-sm font-semibold text-destructive">{pick(language, { pl: "Telegram nie jest jeszcze połączony.", en: "Telegram is not connected yet." })}</span>}</div>
  </form>;
}