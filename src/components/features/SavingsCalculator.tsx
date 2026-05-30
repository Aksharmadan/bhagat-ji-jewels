"use client";

import { useState } from "react";
import { Calculator, ArrowRight, Gift } from "lucide-react";
import { inquireProduct } from "@/lib/actions";

export function SavingsCalculator() {
  const [monthly, setMonthly] = useState<number>(5000);
  const [tenure, setTenure] = useState<6 | 11>(11);

  // Bonus contributions
  const bonusPercent = tenure === 11 ? 0.75 : 0.30;
  const userPaid = monthly * tenure;
  const bonusAmount = monthly * bonusPercent;
  const maturityValue = userPaid + bonusAmount;

  const handleInquire = () => {
    const schemeName = tenure === 11 ? "11-Month Golden Accumulate" : "6-Month Royal Future";
    const msg = `Hi Bhagat Ji Jewels, I calculated a maturity value of ₹${maturityValue.toLocaleString("en-IN")} under your ${schemeName} Savings Scheme (Monthly: ₹${monthly.toLocaleString("en-IN")}). I want to enroll.`;
    inquireProduct(msg);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Gift className="text-gold h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">Maturity Planner</h3>
      </div>

      <div className="space-y-4">
        {/* Select Tenure */}
        <div>
          <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase mb-2 block">Choose Plan tenure</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTenure(11)}
              className={`py-2 text-center rounded border text-xs transition-all ${
                tenure === 11
                  ? "border-accent bg-accent/5 font-bold text-accent"
                  : "border-border text-text-muted hover:border-text"
              }`}
            >
              11 Months (75% Bonus)
            </button>
            <button
              onClick={() => setTenure(6)}
              className={`py-2 text-center rounded border text-xs transition-all ${
                tenure === 6
                  ? "border-accent bg-accent/5 font-bold text-accent"
                  : "border-border text-text-muted hover:border-text"
              }`}
            >
              6 Months (30% Bonus)
            </button>
          </div>
        </div>

        {/* Monthly installment */}
        <div>
          <div className="flex justify-between items-center text-xs text-text-muted uppercase font-bold">
            <span>Monthly Installment</span>
            <span className="font-mono text-sm text-text">₹{monthly.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={monthly}
            onChange={(e) => setMonthly(parseInt(e.target.value))}
            className="w-full accent-accent mt-3"
          />
          <div className="flex justify-between text-[9px] text-text-muted font-mono mt-1">
            <span>₹1,000</span>
            <span>₹25,000</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* Result Breakdown Card */}
        <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-lg p-5 border border-border/40 space-y-3">
          <div className="flex justify-between text-xs text-text-muted">
            <span>Installments Paid:</span>
            <span className="font-mono text-text">₹{userPaid.toLocaleString("en-IN")} ({tenure} months)</span>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Bhagat Ji Contribution:</span>
            <span className="font-mono text-emerald-500 font-semibold">+ ₹{bonusAmount.toLocaleString("en-IN")} (Bonus)</span>
          </div>
          <div className="h-px bg-border/60" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs font-semibold text-text">Maturity Discount Value:</span>
            <span className="font-display text-2xl font-bold text-gold font-mono">₹{maturityValue.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleInquire}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors shadow"
        >
          Enroll in Savings Plan <ArrowRight size={13} />
        </button>

        <p className="text-[10px] text-center text-text-muted leading-relaxed">
          *Discounts and maturity benefits are only redeemable against jewelry items at our showrooms. Not refundable as cash.
        </p>
      </div>
    </div>
  );
}
