"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { formatWhatsAppLink } from "@/lib/utils";

export function WhatsAppFloat() {
  const link = formatWhatsAppLink(
    BRAND.whatsapp[0],
    "Namaste. I would like to inquire about BHAGAT JI JEWELS collections."
  );

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: "spring" }}
      whileHover={{ scale: 1.08 }}
      className="fixed right-6 bottom-20 z-50 hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.35)] md:right-8 md:bottom-8"
      aria-label="WhatsApp Concierge"
    >
      <MessageCircle className="h-7 w-7 text-white" fill="white" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-royal-gold" />
      </span>
    </motion.a>
  );
}
