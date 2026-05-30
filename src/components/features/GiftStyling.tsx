"use client";

import { useState } from "react";
import { Gift, Heart, Send, Check } from "lucide-react";

interface Packaging {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const PACKAGES: Packaging[] = [
  { id: "velvet", name: "Velvet Crimson Box", description: "Deep crimson plush velvet box with gold lining and metal brass clasp.", price: "Complimentary on Gold/Diamond", image: "/jewelry/bhagat/gold-set.jpg" },
  { id: "walnut", name: "Carved Walnut Chest", description: "Solid dark walnut wood chest featuring intricate hand-carved heritage motifs.", price: "₹850 / Free above ₹2L", image: "/jewelry/bhagat/temple-gold.jpg" },
  { id: "brocade", name: "Brocade Silk Pouch", description: "Traditional Banarasi brocade silk pouch with golden drawstrings and beads.", price: "Complimentary on Silver", image: "/jewelry/bhagat/bridal-set.jpg" },
];

export function GiftStyling() {
  const [selectedPack, setSelectedPack] = useState<Packaging>(PACKAGES[0]);
  const [message, setMessage] = useState("");
  const [waxSeal, setWaxSeal] = useState(true);
  const [certCard, setCertCard] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleInquire = () => {
    const text = `Hi Bhagat Ji Jewels, I want to inquire about custom gifting options:
- Packaging: ${selectedPack.name}
- Gift Note: "${message || "None"}"
- Wax Seal: ${waxSeal ? "Yes" : "No"}
- Hallmark Certificate Card: ${certCard ? "Yes" : "No"}`;
    window.open(`https://wa.me/919412190300?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="flex items-center gap-2">
        <Gift className="h-5 w-5 text-gold" />
        <h3 className="font-display text-3xl tracking-wide text-text uppercase">Luxury Gifting & Packaging</h3>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        Select bespoke packaging details and compose personalized messages for wax-sealed scrolls.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Package Selector */}
        <div className="space-y-4">
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">1. Choose Gifting Box</label>
          <div className="space-y-3">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPack(pkg)}
                className={`w-full rounded-xl border p-4 text-left flex items-start justify-between gap-4 transition-all ${
                  selectedPack.id === pkg.id
                    ? "border-gold bg-gold/5 shadow-[0_4px_20px_rgba(212,175,55,0.1)]"
                    : "border-border hover:border-gold/30 hover:bg-bg/20"
                }`}
              >
                <div>
                  <h4 className="font-display text-lg text-text font-semibold">{pkg.name}</h4>
                  <p className="mt-1 text-xs text-text-muted leading-relaxed">{pkg.description}</p>
                  <span className="mt-2.5 inline-block text-[9px] font-bold uppercase tracking-wider text-gold">
                    {pkg.price}
                  </span>
                </div>
                <div className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                  selectedPack.id === pkg.id ? "bg-gold border-gold text-bg" : "border-border"
                }`}>
                  {selectedPack.id === pkg.id && <Check className="h-3 w-3 stroke-[3px]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Editor and visual preview */}
        <div className="space-y-5">
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">2. Wax-Sealed Gift scroll note</label>
          
          <div className="relative">
            <textarea
              placeholder="Type your gift note message here (e.g. 'To my dearest, on our 25th anniversary...')"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSubmitted(false);
              }}
              rows={3}
              className="w-full rounded-xl border border-border bg-bg-card p-4 text-xs text-text placeholder-text-muted/60 outline-none focus:border-gold resize-none dark:bg-bg"
            />
            <span className="absolute bottom-3 right-3 text-[9px] font-mono text-text-muted">
              {message.length} chars
            </span>
          </div>

          {/* Additional Options */}
          <div className="space-y-2 text-xs text-text-muted">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={waxSeal}
                onChange={(e) => setWaxSeal(e.target.checked)}
                className="rounded border-border text-gold focus:ring-gold"
              />
              <span>Seal parchment with Bhagat Ji royal gold wax seal</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={certCard}
                onChange={(e) => setCertCard(e.target.checked)}
                className="rounded border-border text-gold focus:ring-gold"
              />
              <span>Include luxury physical hallmark certificate card</span>
            </label>
          </div>

          {/* Parchment Preview */}
          <div className="rounded-xl border border-[#d8b070]/30 bg-[#fbf8ee] p-5 shadow-inner text-[#5b4510] relative dark:bg-[#1c1813] dark:text-[#ebd6b1] dark:border-border/30">
            <div className="absolute top-4 right-4 text-[9px] font-bold tracking-widest uppercase border border-current/30 px-2 py-0.5 opacity-60">
              Scroll Preview
            </div>
            <Heart className="h-5 w-5 opacity-40 mx-auto" />
            <p className="mt-3 text-center text-xs font-serif italic leading-relaxed min-h-[48px]">
              {message ? `"${message}"` : '"Your custom handwritten message will appear here..."'}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-current/10 pt-3 text-[9px] font-mono opacity-75">
              <span>Packaging: {selectedPack.name}</span>
              <span>{waxSeal ? "✓ Royal Wax Sealed" : "✓ Envelope Sealed"}</span>
            </div>
          </div>

          <button
            onClick={handleInquire}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gold py-3 text-center text-xs font-semibold tracking-wider text-bg uppercase transition-transform hover:-translate-y-0.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Customize Gifting Packaging</span>
          </button>
          {submitted && (
            <p className="text-center text-[10px] text-emerald-600 font-semibold dark:text-emerald-500">
              Gift request package summary sent to Whatsapp Concierge!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
