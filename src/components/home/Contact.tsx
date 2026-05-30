"use client";

import { useState } from "react";
import { Phone, MessageCircle, Calendar, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative py-32 md:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Concierge"
          title="Begin Your Journey"
          subtitle="Private appointments, bespoke inquiries, and white-glove service await."
        />

        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              {BRAND.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="glass-luxury gold-border-glow flex items-center gap-6 p-6 transition-colors hover:border-royal-gold/40"
                >
                  <Phone className="h-6 w-6 text-royal-gold" />
                  <div>
                    <p className="text-xs tracking-[0.3em] text-ivory/50 uppercase">Call Us</p>
                    <p className="font-display text-xl text-ivory">{phone}</p>
                  </div>
                </a>
              ))}
              <a
                href={formatWhatsAppLink(BRAND.whatsapp[0], "Namaste. I would like to schedule a visit.")}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-luxury gold-border-glow flex items-center gap-6 p-6 transition-colors hover:border-royal-gold/40"
              >
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
                <div>
                  <p className="text-xs tracking-[0.3em] text-ivory/50 uppercase">WhatsApp Concierge</p>
                  <p className="font-display text-xl text-ivory">Instant Luxury Support</p>
                </div>
              </a>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button href="#contact">
                  <Calendar className="mr-2 inline h-4 w-4" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              className="glass-luxury gold-border-glow space-y-6 p-10"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              {submitted ? (
                <p className="py-12 text-center font-display text-2xl text-royal-gold">
                  Thank you. Our concierge will contact you shortly.
                </p>
              ) : (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Your Name"
                      className="border-b border-royal-gold/20 bg-transparent py-4 text-ivory placeholder:text-ivory/30 focus:border-royal-gold focus:outline-none"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="border-b border-royal-gold/20 bg-transparent py-4 text-ivory placeholder:text-ivory/30 focus:border-royal-gold focus:outline-none"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email (Optional)"
                    className="w-full border-b border-royal-gold/20 bg-transparent py-4 text-ivory placeholder:text-ivory/30 focus:border-royal-gold focus:outline-none"
                  />
                  <select className="w-full border-b border-royal-gold/20 bg-transparent py-4 text-ivory/60 focus:border-royal-gold focus:outline-none">
                    <option value="">Interest — Select Collection</option>
                    <option>Bridal Collection</option>
                    <option>Diamond Collection</option>
                    <option>Gold Jewelry</option>
                    <option>Custom Bespoke</option>
                  </select>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your vision..."
                    className="w-full resize-none border-b border-royal-gold/20 bg-transparent py-4 text-ivory placeholder:text-ivory/30 focus:border-royal-gold focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 bg-gradient-to-r from-gold-dark via-royal-gold to-gold-light py-4 text-xs tracking-[0.3em] text-black-luxury uppercase transition-opacity hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    Send Inquiry
                  </button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
