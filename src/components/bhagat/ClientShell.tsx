"use client";

import { useGsapScroll } from "@/hooks/useGsapScroll";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { MobileCTA } from "@/components/bhagat/MobileCTA";
import { QuickHelp } from "@/components/bhagat/QuickHelp";

export function ClientShell({ children }: { children: React.ReactNode }) {
  useGsapScroll();
  return (
    <>
      {children}
      <QuickHelp />
      <WhatsAppFloat />
      <MobileCTA />
    </>
  );
}
