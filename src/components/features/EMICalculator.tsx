"use client";

import { useState } from "react";
import { Calculator, ArrowRight, ShieldCheck } from "lucide-react";
import { inquireProduct } from "@/lib/actions";

export function EMICalculator() {
  const [totalCost, setTotalCost] = useState<number>(100000);
  const [tenure, setTenure] = useState<number>(12); // months
  const interestRate = 12; // 12% annual interest

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const P = totalCost;
    const r = interestRate / 12 / 100;
    const n = tenure;
    
    if (r === 0) {
      return {
        monthly: P / n,
        interest: 0,
        total: P
      };
    }
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalInterest = emi * n - P;
    return {
      monthly: emi,
      interest: totalInterest,
      total: emi * n
    };
  };

  const emiDetails = calculateEMI();

  const handleInquire = () => {
    const msg = `Hi Bhagat Ji Jewels, I calculated a monthly EMI of ₹${emiDetails.monthly.toLocaleString("en-IN", { maximumFractionDigits: 0 })} for a total cost of ₹${totalCost.toLocaleString("en-IN")} over ${tenure} months. I want to inquire about payment options.`;
    inquireProduct(msg);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-border/80 rounded-xl p-6 shadow-lg max-w-md mx-auto space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-border/60">
        <Calculator className="text-gold h-5 w-5" />
        <h3 className="font-display text-xl font-bold text-text uppercase tracking-wide">EMI Estimator</h3>
      </div>

      <div className="space-y-4">
        {/* Total Cost slider */}
        <div>
          <div className="flex justify-between items-center text-xs text-text-muted uppercase font-bold">
            <span>Estimated Jewelry Value</span>
            <span className="font-mono text-sm text-text">₹{totalCost.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="20000"
            max="1000000"
            step="10000"
            value={totalCost}
            onChange={(e) => setTotalCost(parseInt(e.target.value))}
            className="w-full accent-accent mt-3"
          />
          <div className="flex justify-between text-[9px] text-text-muted font-mono mt-1">
            <span>₹20,000</span>
            <span>₹5,00,000</span>
            <span>₹10,00,000</span>
          </div>
        </div>

        {/* Tenure selection */}
        <div>
          <div className="flex justify-between items-center text-xs text-text-muted uppercase font-bold mb-2">
            <span>Tenure (Months)</span>
            <span className="font-mono text-sm text-text">{tenure} Months</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[3, 6, 12, 24].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setTenure(m)}
                className={`py-1.5 text-center rounded border text-xs font-semibold transition-all ${
                  tenure === m
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border text-text-muted hover:border-text"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-neutral-50 dark:bg-neutral-800/40 rounded-lg p-5 border border-border/40 space-y-3">
          <div className="flex justify-between text-xs text-text-muted">
            <span>EMI (per month):</span>
            <span className="font-mono font-bold text-text">₹{emiDetails.monthly.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Interest Rate:</span>
            <span className="font-mono text-text">{interestRate}% p.a. (Indicative)</span>
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>Interest Amount:</span>
            <span className="font-mono text-text">₹{emiDetails.interest.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="h-px bg-border/60" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-xs font-semibold text-text">Total Repayment Amount:</span>
            <span className="font-display text-xl font-bold text-gold font-mono">₹{emiDetails.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleInquire}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors shadow"
        >
          Check Partner Financing Options <ArrowRight size={13} />
        </button>

        <p className="text-[10px] text-center text-text-muted leading-relaxed">
          *EMI amounts are estimated and subject to bank approval. No-cost EMI options might be available under specific credit cards.
        </p>
      </div>
    </div>
  );
}
