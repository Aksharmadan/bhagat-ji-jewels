"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const JewelryMotion = dynamic(
  () => import("@/components/bhagat/JewelryMotion").then((m) => m.JewelryMotion),
  { ssr: false }
);

export function MotionShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]">
          <JewelryMotion className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-elevated lg:to-bg-elevated" />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:py-20" data-reveal>
          <p className="text-[10px] tracking-[0.4em] text-gold uppercase">Craft in Motion</p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-text sm:text-4xl">
            Every piece designed to
            <span className="text-gradient-gold"> move with you.</span>
          </h2>
          <p className="mt-6 text-text-muted">
            Bangles that catch the light. Rings that hold promises. Diamonds that dance — all
            finished by master artisans at Bhagat Ji Jewels.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/collections" className="btn-gold">
              View All Jewellery
            </Link>
            <Link href="/#contact" className="btn-outline">
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
