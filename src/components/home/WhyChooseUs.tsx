"use client";

import { Shield, Award, Gem, Palette, Scale, Gift, HeartHandshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { TRUST_POINTS } from "@/lib/constants";

const ICONS = [Shield, Award, Gem, Palette, Scale, Gift, HeartHandshake];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="The Bhagat Ji Promise"
          title="Why Choose Us"
          subtitle="Seven pillars of trust that have defined our legacy since 1960."
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TRUST_POINTS.map((point, i) => {
            const Icon = ICONS[i] ?? Shield;
            return (
              <StaggerItem key={point.title}>
                <div className="group glass-luxury gold-border-glow h-full p-8 transition-all duration-500 hover:border-royal-gold/40">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center border border-royal-gold/30 transition-colors group-hover:bg-royal-gold/10">
                    <Icon className="h-6 w-6 text-royal-gold transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="font-display mb-3 text-xl text-ivory">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-ivory/50">{point.desc}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
