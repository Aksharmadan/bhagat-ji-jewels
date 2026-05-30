"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function Heritage() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;
    gsap.to(imageRef.current, {
      y: -60,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <section id="heritage" ref={sectionRef} className="relative py-32 md:py-48">
      <div className="luxury-gradient absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Our Legacy"
          title="A Story Written in Gold"
          subtitle="Since 1960, three generations of the Anand family have upheld a sacred promise — purity, craftsmanship, and trust without compromise."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute -inset-4 border border-royal-gold/20" />
              <Image
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad5?w=800&q=80"
                alt="Master craftsman at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-luxury via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <p className="font-display text-6xl text-royal-gold">{BRAND.established}</p>
                <p className="text-xs tracking-[0.3em] text-ivory/60 uppercase">Year of Foundation</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            {[
              {
                title: "Generations of Trust",
                text: "What began as a humble goldsmith's atelier in Chandausi has blossomed into a heritage house cherished across India. Families return — not for transactions, but for traditions.",
              },
              {
                title: "Sacred Craftsmanship",
                text: "Every piece is shaped by master artisans who treat gold as divine. Hand-finished details, temple-inspired motifs, and meticulous stone setting define our signature.",
              },
              {
                title: "Purity Without Compromise",
                text: "BIS Hallmark certified. Transparent pricing. Ethical sourcing. When you wear Bhagat Ji, you wear a promise kept for over sixty years.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.15}>
                <div className="border-l-2 border-royal-gold/40 pl-8">
                  <h3 className="font-display mb-3 text-2xl text-ivory">{item.title}</h3>
                  <p className="leading-relaxed text-ivory/60">{item.text}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.4}>
              <p className="font-display text-xl italic text-champagne/80">
                &ldquo;We do not sell jewelry. We craft legacies worn forever.&rdquo;
              </p>
              <p className="mt-4 text-sm tracking-[0.2em] text-royal-gold uppercase">
                — {BRAND.owners.join(" & ")}, Proprietors
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
