"use client";

import { Phone, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

export function MobileCTA() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-30 flex border-t border-border bg-bg/95 backdrop-blur-xl md:hidden">
      <a
        href={`tel:${BRAND.phones[0].replace(/\s/g, "")}`}
        className="flex flex-1 items-center justify-center gap-2 py-4 text-[10px] tracking-[0.2em] text-text uppercase"
      >
        <Phone className="h-4 w-4 text-gold" />
        Call
      </a>
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
