"use client";

import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

export function MobileCTA() {
  const [callOpen, setCallOpen] = useState(false);

  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex border-t border-border bg-bg/95 backdrop-blur-xl md:hidden">
      {callOpen && (
        <div id="mobile-call-options" className="absolute right-3 bottom-[calc(100%+12px)] left-3 border border-border bg-bg-elevated p-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-text-muted">Choose Number</span>
            <button
              type="button"
              onClick={() => setCallOpen(false)}
              className="grid h-8 w-8 place-items-center text-text-muted transition-colors hover:text-text"
              aria-label="Close call options"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-2">
            {BRAND.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                onClick={() => setCallOpen(false)}
                className="flex items-center gap-3 border border-border bg-bg px-4 py-3 text-sm text-text transition-colors hover:border-gold"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>{phone}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setCallOpen((current) => !current)}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-[10px] tracking-[0.2em] text-text uppercase"
        aria-expanded={callOpen}
        aria-controls="mobile-call-options"
      >
        <Phone className="h-4 w-4 text-gold" />
        Call
      </button>
      <a
        href={formatWhatsAppLink(BRAND.whatsapp[0], "Namaste. I would like to book a private visit to BHAGAT JI JEWELS showroom in Chandausi.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 border-l border-border py-4 text-[10px] tracking-[0.2em] text-text uppercase"
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" />
        WhatsApp
      </a>
    </div>
  );
}
