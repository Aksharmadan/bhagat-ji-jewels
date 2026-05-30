import { Metadata } from "next";
import { Sparkles, Calendar, Heart, ShieldCheck, CheckCircle2 } from "lucide-react";
import { SavingsCalculator } from "@/components/features/SavingsCalculator";

export const metadata: Metadata = {
  title: "Golden Harvest Savings Scheme | Bhagat Ji Jewels",
  description: "Plan your jewelry purchase with our 6 or 11-month savings scheme. Secure up to a 75% discount bonus on maturity.",
};

export default function GoldSavingsPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Title */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-12 mb-12 text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold flex justify-center items-center gap-1">
          <Sparkles size={10} className="text-gold" /> Planned prosperity schemes
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-3">
          Golden Harvest Savings
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xs text-text-muted leading-relaxed font-sans">
          Accumulate savings systematically for special milestones, anniversaries, or weddings. Receive guaranteed bonus discounts from Bhagat Ji Jewels at maturity.
        </p>
      </section>

      {/* Main split */}
      <section className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        
        {/* Scheme details column */}
        <div className="md:col-span-7 space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-text mb-4 uppercase tracking-wide">
              Smart Purchasing power
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Our savings schemes are designed to help families plan their wedding or festive purchases stress-free. By making fixed monthly installments, you build a jewelry fund and earn substantial bonus contributions from us.
            </p>
          </div>

          <div className="space-y-6">
            {/* Scheme 1 */}
            <div className="bg-white dark:bg-neutral-900/60 p-5 rounded-lg border border-border/60 space-y-2">
              <span className="inline-block bg-accent/10 text-accent rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                Signature 11-Month Scheme
              </span>
              <h3 className="text-base font-bold text-text uppercase tracking-wider">Golden Accumulate Scheme</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Contribute monthly for 11 months (minimum ₹2,000). Upon maturity in the 12th month, Bhagat Ji Jewels contributes **75% of one monthly installment** as a bonus discount.
              </p>
            </div>

            {/* Scheme 2 */}
            <div className="bg-white dark:bg-neutral-900/60 p-5 rounded-lg border border-border/60 space-y-2">
              <span className="inline-block bg-accent/10 text-accent rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                Short-Term 6-Month Scheme
              </span>
              <h3 className="text-base font-bold text-text uppercase tracking-wider">Royal Future Savings</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Contribute monthly for 6 months (minimum ₹5,000). Perfect for birthdays or upcoming festivals. Bhagat Ji Jewels contributes **30% of one monthly installment** as a bonus discount.
              </p>
            </div>
          </div>

          {/* Simple step checklist */}
          <div className="space-y-3 pt-4 border-t border-border/60">
            <h4 className="text-[11px] font-bold text-accent uppercase tracking-widest">Enrolment benefits:</h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Lock in gold rate option available for certain plans
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Absolute transparency in making charges at time of redemption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Flexible monthly contribution options
              </li>
            </ul>
          </div>
        </div>

        {/* Calculator Widget Column */}
        <div className="md:col-span-5">
          <SavingsCalculator />
        </div>

      </section>
    </div>
  );
}
