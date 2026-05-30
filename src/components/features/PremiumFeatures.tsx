"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Camera,
  RotateCcw,
  Calendar,
  Headphones,
  ShoppingCart,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Recommendations",
    desc: "Personalized piece suggestions based on your style and occasion.",
    action: "Get Recommendations",
  },
  {
    icon: Camera,
    title: "Virtual Try-On",
    desc: "Preview how our necklaces and earrings complement you — powered by AR.",
    action: "Try Now",
  },
  {
    icon: RotateCcw,
    title: "360° Preview",
    desc: "Examine every facet, every curve — as if holding it in your hands.",
    action: "View in 360°",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    desc: "Reserve a private consultation at our Chandausi flagship.",
    action: "Book Now",
  },
  {
    icon: Headphones,
    title: "Luxury Concierge",
    desc: "Dedicated WhatsApp support for bespoke orders and inquiries.",
    action: "Connect",
  },
  {
    icon: ShoppingCart,
    title: "Premium Checkout",
    desc: "Secure, elegant purchase flow with luxury packaging included.",
    action: "Coming Soon",
  },
];

export function PremiumFeatures() {
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [tryOnActive, setTryOnActive] = useState(false);

  const handleAI = () => {
    const picks = [
      "Royal Heritage Necklace — perfect for formal celebrations",
      "Maharani Bridal Set — ideal for your wedding season",
      "Eternal Diamond Ring — timeless daily elegance",
    ];
    setAiResult(picks[Math.floor(Math.random() * picks.length)]);
  };

  return (
    <section className="border-y border-royal-gold/10 py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Innovation Meets Heritage"
          title="Premium Experiences"
          subtitle="World-class digital luxury — crafted for the modern patron."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="group glass-luxury h-full p-8 transition-all duration-500 hover:border-royal-gold/30">
                <f.icon className="mb-6 h-8 w-8 text-royal-gold" />
                <h3 className="font-display mb-3 text-xl text-ivory">{f.title}</h3>
                <p className="mb-6 text-sm text-ivory/50">{f.desc}</p>
                <button
                  onClick={() => {
                    if (f.title === "AI Recommendations") handleAI();
                    if (f.title === "Virtual Try-On") setTryOnActive(true);
                    if (f.title === "Appointment Booking")
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs tracking-[0.25em] text-royal-gold uppercase transition-colors hover:text-gold-light"
                >
                  {f.action} →
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {aiResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-luxury gold-border-glow mx-auto mt-12 max-w-xl p-8 text-center"
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-royal-gold" />
            <p className="text-xs tracking-[0.3em] text-royal-gold uppercase">AI Curator Suggests</p>
            <p className="font-display mt-4 text-xl text-ivory">{aiResult}</p>
          </motion.div>
        )}

        {tryOnActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black-luxury/95 p-6"
            onClick={() => setTryOnActive(false)}
          >
            <div
              className="glass-luxury max-w-md p-10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Camera className="mx-auto mb-6 h-12 w-12 text-royal-gold" />
              <h3 className="font-display text-2xl text-ivory">Virtual Try-On</h3>
              <p className="mt-4 text-sm text-ivory/60">
                Enable camera access on your device for the full AR experience. Visit our store
                for an in-person styling session with our master jewelers.
              </p>
              <button
                onClick={() => setTryOnActive(false)}
                className="mt-8 text-xs tracking-[0.3em] text-royal-gold uppercase"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
