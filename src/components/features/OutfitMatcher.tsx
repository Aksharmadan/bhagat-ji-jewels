"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Shirt } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface OutfitColor {
  id: string;
  name: string;
  hex: string;
  advisory: string;
  metalRecommendation: string;
  suggestedProducts: { name: string; slug: string; image: string; type: string }[];
}

const COLORS: OutfitColor[] = [
  {
    id: "ivory",
    name: "Ivory / Cream / Pastel Pink",
    hex: "#FDFBF7",
    advisory: "Contrasting gemstone settings look absolutely spectacular on ivory. Consider wearing necklaces with dark green Zambian emeralds, bright rubies, or classic rose gold diamond pieces to add focal points without clashing with the dress tone.",
    metalRecommendation: "Emerald-embedded Gold, Rose Gold, or Solitaire Diamonds",
    suggestedProducts: [
      { name: "Solitaire Diamond Ring", slug: "solitaire-diamond-ring", image: "/jewelry/bhagat/diamond-ring-2.jpg", type: "Diamond" },
      { name: "Emerald & Diamond Choker", slug: "emerald-diamond-choker", image: "/jewelry/bhagat/diamond-necklace.jpg", type: "Diamond" }
    ]
  },
  {
    id: "maroon",
    name: "Maroon / Crimson Red",
    hex: "#5A181C",
    advisory: "A traditional bridal favorite. Pure 22K gold, antique temple gold ornaments, or heavy kundan/polki jewelry sets complement deep red velvet and silk lehengas seamlessly. Avoid rose gold or platinum as they can get lost in the warmth of the outfit.",
    metalRecommendation: "22K Traditional Gold, Kundan, and Uncut Polki work",
    suggestedProducts: [
      { name: "Maharani Bridal Set", slug: "maharani-bridal-set", image: "/jewelry/bhagat/bridal-set.jpg", type: "Bridal" },
      { name: "Antique Temple Necklace", slug: "antique-temple-necklace", image: "/jewelry/bhagat/temple-gold.jpg", type: "Temple" }
    ]
  },
  {
    id: "emerald",
    name: "Emerald Green",
    hex: "#064E3B",
    advisory: "Deep greens work beautifully with certified brilliant-cut diamonds, white gold, or pure gold pieces. High-carat yellow gold creates a grand royal contrast, while platinum with diamonds provides a sleek modern style.",
    metalRecommendation: "Bright Yellow Gold, Platinum, and Solitaire Diamonds",
    suggestedProducts: [
      { name: "Royal Gold Necklace", slug: "royal-gold-necklace", image: "/jewelry/bhagat/gold-necklace.jpg", type: "Gold" },
      { name: "Platinum Diamond Ring", slug: "platinum-diamond-ring", image: "/jewelry/bhagat/platinum-ring.jpg", type: "Platinum" }
    ]
  },
  {
    id: "blue",
    name: "Royal Blue / Navy",
    hex: "#1E3A8A",
    advisory: "Royal blue commands high brilliance. Platinum, white gold, and certified diamond jewelry create a stellar stars-in-the-night visual effect. A pearl strand or diamond jhumka adds a softer, royal glow to high-neck blouses.",
    metalRecommendation: "White Gold, Platinum, and Brilliant-cut Diamonds",
    suggestedProducts: [
      { name: "Diamond Statement Necklace", slug: "diamond-statement-necklace", image: "/jewelry/bhagat/diamond-necklace.jpg", type: "Diamond" },
      { name: "Platinum Eternity Band", slug: "platinum-eternity-band", image: "/jewelry/bhagat/platinum-band.jpg", type: "Platinum" }
    ]
  },
  {
    id: "pink",
    name: "Pastel Mint / Lilac",
    hex: "#ECFDF5",
    advisory: "Soft pastel tones pair delightfully with delicate, minimalist diamond pieces, white gold, and pearl-drop earrings. Heavy jewelry might overwhelm these light, modern lehengas, so choose lightweight stackable pieces.",
    metalRecommendation: "Rose Gold, Minimalist White Gold, and Diamond Studs",
    suggestedProducts: [
      { name: "Rose Gold Diamond Studs", slug: "rose-gold-diamond-studs", image: "/jewelry/bhagat/earrings.jpg", type: "Diamond" },
      { name: "Classic Gold Bangles", slug: "classic-gold-bangles", image: "/jewelry/bhagat/gold-bangles.jpg", type: "Bangles" }
    ]
  }
];

export function OutfitMatcher() {
  const { t } = useTranslation();
  const [selectedColor, setSelectedColor] = useState<OutfitColor>(COLORS[0]);
  const colorLabels: Record<string, string> = {
    ivory: t("ivory"),
    maroon: t("maroon"),
    emerald: t("emeraldGreen"),
    blue: t("royalBlue"),
    pink: t("pastelMint"),
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="flex items-center gap-2">
        <Shirt className="h-5 w-5 text-gold" />
        <h3 className="font-display text-3xl tracking-wide text-text uppercase">{t("outfitConsultant")}</h3>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        {t("outfitConsultantDesc")}
      </p>

      {/* Color Selectors */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedColor(c)}
            className={`flex items-center gap-2 rounded-full border px-4.5 py-2 text-xs transition-all ${
              selectedColor.id === c.id
                ? "border-gold bg-gold/5 font-semibold text-gold"
                : "border-border hover:border-gold/30 text-text-muted"
            }`}
          >
            <span
              style={{ backgroundColor: c.hex }}
              className="h-4.5 w-4.5 rounded-full border border-black/10 shadow-sm"
            />
            <span>{colorLabels[c.id]}</span>
          </button>
        ))}
      </div>

      {/* Advisory & Recommendation Card */}
      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <Sparkles className="h-4.5 w-4.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">{t("bridalStylingAdvisory")}</span>
          </div>
          
          <div className="flex items-start gap-4">
            <span
              style={{ backgroundColor: selectedColor.hex }}
              className="h-12 w-12 shrink-0 rounded-xl border border-black/10 shadow-inner"
            />
            <div>
              <h4 className="font-display text-2xl text-text font-semibold">
                {colorLabels[selectedColor.id]} {t("styleGuide")}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-text-muted">{selectedColor.advisory}</p>
            </div>
          </div>

          <div className="rounded-lg bg-bg-card p-4 dark:bg-bg/40">
            <span className="text-[9px] uppercase font-bold tracking-wider text-text-muted">{t("bestSuitedJewelleryBase")}</span>
            <p className="font-semibold text-gold mt-1 text-sm">{selectedColor.metalRecommendation}</p>
          </div>
        </div>

        {/* Recommended Jewelry Items */}
        <div className="border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest block mb-4">{t("recommendedPieces")}</span>
          <div className="space-y-4">
            {selectedColor.suggestedProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/product/${p.slug}`}
                className="flex items-center gap-3.5 group rounded-lg border border-border bg-bg/50 p-2.5 hover:border-gold/40 hover:bg-bg transition-all"
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-md bg-bg-card">
                  <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-gold uppercase tracking-wider">{p.type}</span>
                  <h5 className="font-display text-lg text-text truncate group-hover:text-gold transition-colors">{p.name}</h5>
                </div>
                <ShoppingBag className="h-4.5 w-4.5 text-text-muted group-hover:text-gold transition-colors shrink-0" />
              </Link>
            ))}
          </div>

          <Link
            href="/collections"
            className="mt-5 inline-block text-[9.5px] uppercase font-bold tracking-widest text-text-muted hover:text-gold"
          >
            {t("browseEntireCollection")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
