"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/constants";

export function MapSection() {
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3482.8!2d78.7828!3d28.4532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzExLjUiTiA3OMKwNDYnNTguMSJF!5e0!3m2!1sen!2sin!4v1700000000000";

  return (
    <section className="py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Find Us"
          title="Our Flagship Store"
          subtitle="In the heart of Chandausi — where heritage meets you."
        />

        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="glass-luxury gold-border-glow space-y-8 p-10">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-royal-gold" />
                <div>
                  <h3 className="font-display mb-2 text-xl text-ivory">Address</h3>
                  <p className="leading-relaxed text-ivory/60">{BRAND.address.full}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-6 w-6 shrink-0 text-royal-gold" />
                <div>
                  <h3 className="font-display mb-2 text-xl text-ivory">Hours</h3>
                  <p className="text-ivory/60">{BRAND.hours}</p>
                </div>
              </div>
              <a
                href={BRAND.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-[0.2em] text-royal-gold uppercase hover:underline"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="gold-border-glow relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[450px]">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full grayscale transition-all duration-700 hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BHAGAT JI JEWELS Location"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-royal-gold/20 ring-inset" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
