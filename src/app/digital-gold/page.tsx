import { Metadata } from "next";
import { Sparkles, Shield, RefreshCw, BadgePercent, CheckCircle2 } from "lucide-react";
import { DigitalGoldWidget } from "@/components/features/DigitalGoldWidget";

export const metadata: Metadata = {
  title: "24K Digital Gold | Bhagat Ji Jewels",
  description: "Securely accumulate 24K pure gold digitally starting from just ₹100. Redeem easily at any showroom.",
};

const benefits = [
  {
    title: "100% Secure & Insured",
    desc: "Every gram you accumulate is backed by physical gold stored in secure, fully insured bank-grade vaults.",
    icon: Shield,
  },
  {
    title: "Start Small: From ₹100",
    desc: "No need to save thousands. Build your gold reserves gradually with amounts that fit your monthly budget.",
    icon: BadgePercent,
  },
  {
    title: "Easy Showroom Redemption",
    desc: "Convert your accumulated grams into any hallmarked jewelry piece of your choice at our Moradabad or Chandausi showrooms.",
    icon: RefreshCw,
  },
];

export default function DigitalGoldPage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      {/* Title */}
      <section className="bg-white dark:bg-neutral-900 border-b border-border py-12 mb-12 text-center px-6">
        <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold flex justify-center items-center gap-1">
          <Sparkles size={10} className="text-gold" /> Digital vault accumulation
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mt-3">
          24K Digital Gold
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-xs text-text-muted leading-relaxed font-sans">
          Accumulate 99.9% pure physical gold systematically. Start with small fractions, build your digital reserves, and redeem as bridal sets, kadas, or coins.
        </p>
      </section>

      {/* Main content split: calculator & benefits */}
      <section className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        
        {/* Benefits column */}
        <div className="md:col-span-7 space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-text mb-4 uppercase tracking-wide">
              Secure Planned Prosperity
            </h2>
            <p className="text-xs text-text-muted leading-relaxed">
              Why wait to buy full gold ornaments? With Bhagat Ji Digital Gold, you lock in gold prices gram-by-gram and protect your family from market rate hikes.
            </p>
          </div>

          <div className="space-y-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 items-start bg-white dark:bg-neutral-900/60 p-5 rounded-lg border border-border/60">
                <div className="h-10 w-10 shrink-0 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                  <b.icon size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text uppercase tracking-wider">{b.title}</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple step checklist */}
          <div className="space-y-3 pt-4 border-t border-border/60">
            <h4 className="text-[11px] font-bold text-accent uppercase tracking-widest">How Redemption Works:</h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Save digital grams systematically
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Visit any of our 5 showrooms in UP/NCR
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#25D366]" /> Select your favorite bridal sets or chains and redeem grams 1:1
              </li>
            </ul>
          </div>
        </div>

        {/* Calculator Widget Column */}
        <div className="md:col-span-5">
          <DigitalGoldWidget />
        </div>

      </section>
    </div>
  );
}
