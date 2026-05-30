"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { submitInquiry, bookVisit, openWhatsApp } from "@/lib/actions";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", productSlug: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent, type: "inquiry" | "appointment" = "inquiry") => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const payload = { ...form };
      await submitInquiry({ ...payload, type });
      setStatus("success");
      openWhatsApp(
        `Namaste. I submitted an inquiry on the website.\nName: ${payload.name}\nPhone: ${payload.phone}${payload.message ? `\nMessage: ${payload.message}` : ""}`
      );
      setForm({ name: "", phone: "", email: "", message: "", productSlug: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
        <div data-reveal>
          <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase">Concierge</p>
          <h2 className="font-display mt-4 text-4xl text-text md:text-5xl">Begin Your Journey</h2>
          <p className="mt-6 max-w-md text-text-muted">
            Speak with our team for a private viewing, custom design guidance, availability,
            and styling for the occasion you are dressing for.
          </p>

          <div className="mt-10 space-y-4">
            {BRAND.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-gold"
              >
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-lg">{phone}</span>
              </a>
            ))}
            <button
              onClick={bookVisit}
              className="flex w-full items-center gap-4 border border-border p-5 text-left transition-colors hover:border-gold"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </button>
            <div className="flex gap-4 border border-border p-5 text-text-muted">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <p className="text-sm leading-relaxed">{BRAND.address.full}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <Clock className="h-5 w-5 text-gold" />
              {BRAND.hours}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => handleSubmit(e, "inquiry")}
          className="border border-border bg-bg-elevated p-8 md:p-10"
          data-reveal
        >
          {status === "success" ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-gold">Thank you.</p>
              <p className="mt-4 text-text-muted">Our team will reach you shortly.</p>
              <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-8">
                <span>Send Another</span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  required
                  placeholder="Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-b border-border bg-transparent py-3 text-text placeholder:text-text-muted focus:border-gold focus:outline-none"
                />
                <input
                  required
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border-b border-border bg-transparent py-3 text-text placeholder:text-text-muted focus:border-gold focus:outline-none"
                />
              </div>
              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-6 w-full border-b border-border bg-transparent py-3 text-text placeholder:text-text-muted focus:border-gold focus:outline-none"
              />
              <textarea
                rows={4}
                placeholder="Your vision..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-6 w-full resize-none border-b border-border bg-transparent py-3 text-text placeholder:text-text-muted focus:border-gold focus:outline-none"
              />
              {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              <div className="mt-8 flex flex-wrap gap-4">
                <button type="submit" disabled={status === "loading"} className="btn-gold disabled:opacity-50">
                  {status === "loading" ? "Sending..." : "Send Inquiry"}
                </button>
                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={(e) => handleSubmit(e as unknown as React.FormEvent, "appointment")}
                  className="btn-outline disabled:opacity-50"
                >
                  <span>Book Appointment</span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
