"use client";

import { useState } from "react";
import { Coins, HelpCircle, Check, ArrowRight } from "lucide-react";
import { inquireProduct } from "@/lib/actions";

export function DigitalGoldWidget() {
  const [amount, setAmount] = useState<number>(5000);
  const liveGoldRate24K = 7850; // live 24K rate from constants

  const grams = (amount / liveGoldRate24K).toFixed(4);

  const handleInquire = () => {
    const msg = `Hi Bhagat Ji Jewels, I want to purchase ₹${amount.toLocaleString("en-IN")} of 24K Digital Gold (approx. ${grams}g) under your vault accumulation. Please guide me.`;
    inquireProduct(msg);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Coins className="text-gold h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Accumulation Calculator</h3>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <div className="flex justify-between items-center text-xs text-text-muted uppercase font-bold">
            <span>Investment Amount</span>
            <span className="font-mono text-sm text-text">₹{amount.toLocaleString("en-IN")}</span>
          </div>
          
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full accent-accent mt-3"
          />
          <div className="flex justify-between text-[9px] text-text-muted font-mono mt-1">
            <span>₹100</span>
            <span>₹50,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        {/* Custom manual amount input */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-full pl-7 pr-4 py-2 border border-border rounded text-sm text-text bg-transparent font-mono outline-none focus:border-accent"
          />
        </div>

        {/* Live conversion display */}
        <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-lg p-5 border border-border/40 space-y-3">
          <div className="flex justify-between text-xs text-text-muted">
            <span>Live 24K Rate:</span>
            <span className="font-mono font-semibold text-text">₹{liveGoldRate24K}/g</span>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Accumulated Purity:</span>
            <span className="font-semibold text-text">99.9% 24K Pure Gold</span>
          </div>
          <div className="h-px bg-border/60" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs font-semibold text-text">Estimated Grams:</span>
            <span className="font-display text-2xl font-bold text-gold font-mono">{grams}g</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleInquire}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors shadow"
        >
          Initiate Accumulation <ArrowRight size={13} />
        </button>

        <p className="text-[10px] text-center text-text-muted leading-relaxed">
          *Accumulated gold is backed 1:1 by physical 24K gold stored in secure bank-grade vaults. Redeemable at showrooms.
        </p>
      </div>
    </div>
  );
}
