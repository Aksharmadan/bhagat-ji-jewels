import { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Award, ShieldCheck, Heart, Users } from "lucide-react";
import { BRAND, BRAND_STORY } from "@/lib/constants";
import { LegacyTimeline } from "@/components/features/LegacyTimeline";

export const metadata: Metadata = {
  title: "Our Heritage & Story | Since 1960",
  description: "Learn about the legacy of Bhagat Ji Jewels. Serving pure gold, certified diamonds, and hand-carved heritage jewelry since 1960 in Chandausi.",
};

const principles = [
  {
    title: "100% Certified Purity",
    desc: "Every jewelry piece leaves our showroom with rigorous BIS Hallmark certification, ensuring absolute peace of mind for your generation.",
    icon: ShieldCheck,
  },
  {
    title: "Bespoke Artistry",
    desc: "We work with master artisans whose families have carved gold for kings. Every choker, kada, and bridal set is individually hand-detailed.",
    icon: Award,
  },
  {
    title: "Lifetime Relationships",
    desc: "Our bond with families goes beyond transactions. We offer life-long buyback policies and repair service support to protect your assets.",
    icon: Heart,
  },
];

export default function AboutHeritagePage() {
  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark pt-[7.5rem] pb-24 lg:pt-[10.5rem]">
      
      {/* Parallax Hero Banner */}
      <section className="relative h-[55vh] w-full overflow-hidden border-b border-border">
        <Image
          src="https://images.unsplash.com/photo-1601121143461-5415b4e6c4b8?w=1600&q=80"
          alt="Traditional Gold Craftsmanship"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white">
          <span className="text-[10px] tracking-[0.35em] text-gold uppercase font-bold mb-3 flex items-center gap-1.5 animate-pulse">
            <Sparkles size={11} /> Estd. 1960 Chandausi
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-wider">
            Our Heritage & Story
          </h1>
          <p className="mt-4 max-w-xl text-sm text-neutral-200 leading-relaxed font-sans">
            Where generations of trust meet world-class craftsmanship. Explore the legacy of the Anand family.
          </p>
        </div>
      </section>

      {/* Legacy Introduction */}
      <section className="max-w-[900px] mx-auto px-6 py-16 text-center space-y-6">
        <Users className="text-accent h-8 w-8 mx-auto" />
        <h2 className="font-display text-3xl font-bold text-text uppercase tracking-wide">
          Celebrating 66 Years of Trust
        </h2>
        <p className="text-sm text-text-muted leading-relaxed">
          {BRAND_STORY.intro} Today, under the leadership of Amit Anand and Vishal Anand, we continue to bridge the historic techniques of Indian goldsmiths with modern design precision.
        </p>
      </section>

      {/* Interactive Legacy Timeline */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 border-y border-border py-20 px-6">
        <div className="max-w-[1500px] mx-auto">
          <div className="mb-16 text-center">
            <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">Chronology</span>
            <h2 className="font-display text-3xl font-bold text-text mt-1.5">Milestones of Legacy</h2>
          </div>
          <LegacyTimeline />
        </div>
      </section>

      {/* Principles Grid */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold">Our Pillars</span>
          <h2 className="font-display text-3xl font-bold text-text mt-1.5">The Bhagat Ji Promise</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((p) => (
            <div key={p.title} className="bg-white dark:bg-neutral-900 border border-border/80 p-8 rounded-xl shadow-sm space-y-4 hover:border-accent hover:shadow-md transition-all duration-300">
              <div className="h-12 w-12 bg-accent/5 rounded-full flex items-center justify-center text-accent">
                <p.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-bold text-text uppercase tracking-wider">{p.title}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
