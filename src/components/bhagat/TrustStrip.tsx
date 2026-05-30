"use client";

const ITEMS = [
  "BIS Hallmark Certified",
  "Trusted Since 1960",
  "Master Craftsmanship",
  "Custom Bespoke",
  "Transparent Inquiry",
  "Luxury Packaging",
  "Lifetime Relationship",
];

export function TrustStrip() {
  return (
    <section className="overflow-hidden border-y border-border py-6">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="mx-8 text-[11px] tracking-[0.35em] text-text-muted uppercase"
          >
            {item}
            <span className="mx-8 text-gold">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
