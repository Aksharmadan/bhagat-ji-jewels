"use client";

import { BRAND } from "@/lib/constants";
import { bookVisit } from "@/lib/actions";

export function VisitSection() {
  const embedUrl = BRAND.mapEmbed;

  return (
    <section id="visit" className="section-padding">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12" data-reveal>
          <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase">Flagship</p>
          <h2 className="font-display mt-3 text-4xl text-text md:text-5xl">Visit Our Sanctuary</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col justify-between border border-border p-8 lg:col-span-2" data-reveal>
            <div>
              <p className="text-sm leading-relaxed text-text-muted">{BRAND.address.full}</p>
              <p className="mt-2 text-xs text-gold">Near Brahma Bazar / Bank Road area · PIN 244412</p>
              <p className="mt-6 text-sm text-text-muted">{BRAND.hours}</p>
              <div className="mt-4 space-y-1">
                {BRAND.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-sm text-gold hover:underline">
                    {p}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={BRAND.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <span>Get Directions</span>
              </a>
              <button onClick={bookVisit} className="btn-gold">
                Book Visit
              </button>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden border border-border lg:col-span-3" data-reveal>
            <iframe
              src={embedUrl}
              className="absolute inset-0 h-full w-full grayscale transition-all duration-700 hover:grayscale-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Store location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
