"use client";

import { useState } from "react";
import { Sparkles, Heart, Check, X, ShieldAlert, ChevronDown } from "lucide-react";

const CARE_SECTIONS = [
  {
    metal: "Gold Jewelry Care",
    tips: [
      "Avoid contact with household bleach, chlorine, or abrasive cleaning products.",
      "Clean with warm water, mild dish soap, and a soft-bristled baby toothbrush.",
      "Store individual pieces in separate soft cloth bags to prevent scratching.",
      "Bring your gold jewelry to our showrooms annually for professional ultrasonic cleaning."
    ]
  },
  {
    metal: "Diamond Care",
    tips: [
      "Diamonds are natural grease magnets; clean them regularly to maintain brilliance.",
      "Soak diamonds in a warm water solution with mild degreasing detergent.",
      "Gently scrub the back and sides of the diamond mountings where grease accumulates.",
      "Have the metal prongs inspected annually to ensure stones are held securely."
    ]
  },
  {
    metal: "Platinum Care",
    tips: [
      "Platinum is highly durable but can develop a patina (soft scratch-glow) over time.",
      "Clean using standard mild jewelry solutions and dry with a lint-free cloth.",
      "Store platinum separately from gold as it can scratch gold items easily.",
      "Bring to our showroom for professional polishing if you prefer a high-shine mirror finish."
    ]
  },
  {
    metal: "Sterling Silver Care",
    tips: [
      "Silver tarnishes when exposed to air and humidity; wear it regularly to slow this down.",
      "Store silver pieces in anti-tarnish airtight zip bags with silica gel packs.",
      "Clean minor tarnish using a specialized soft silver polishing cloth.",
      "Never expose silver to hot springs, swimming pools, or hair sprays."
    ]
  }
];

export function JewelryCareGuide() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Heart className="text-accent h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Jewelry Care Guide</h3>
      </div>

      <p className="text-xs text-text-muted leading-relaxed">
        Preserve the brilliance of your family treasures. Follow our master craftsman guidelines for handling and cleaning fine jewelry.
      </p>

      <div className="space-y-3">
        {CARE_SECTIONS.map((sec, idx) => (
          <div
            key={sec.metal}
            className="border border-border/85 rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              className="w-full flex justify-between items-center px-4 py-3 bg-neutral-50 dark:bg-neutral-800/40 text-xs font-semibold text-text uppercase tracking-wider"
            >
              <span>{sec.metal}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${activeIdx === idx ? "rotate-180 text-accent" : "text-text-muted"}`}
              />
            </button>
            
            {activeIdx === idx && (
              <div className="p-4 bg-white dark:bg-neutral-900 border-t border-border/60 space-y-3 animate-slide-down">
                {sec.tips.map((tip, tIdx) => (
                  <div key={tIdx} className="flex gap-2.5 items-start text-xs text-text-muted leading-relaxed">
                    <span className="h-4 w-4 shrink-0 rounded-full bg-accent/10 flex items-center justify-center text-accent text-[9px] font-bold">
                      {tIdx + 1}
                    </span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
