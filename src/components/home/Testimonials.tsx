"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="relative py-32 md:py-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-12">
        <SectionHeading
          eyebrow="Voices of Trust"
          title="What Our Patrons Say"
          subtitle="Stories from families who have made Bhagat Ji part of their legacy."
        />

        <div className="relative">
          <Quote className="absolute -top-4 left-0 h-16 w-16 text-royal-gold/20" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="glass-luxury gold-border-glow px-8 py-12 text-center md:px-16 md:py-16"
            >
              <p className="font-display text-2xl leading-relaxed text-ivory/90 italic md:text-3xl">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-royal-gold text-royal-gold" />
                ))}
              </div>
              <footer className="mt-6">
                <cite className="not-italic">
                  <p className="font-display text-lg text-royal-gold">{t.name}</p>
                  <p className="text-sm text-ivory/50">{t.location}</p>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="flex h-12 w-12 items-center justify-center border border-royal-gold/30 text-royal-gold transition-colors hover:bg-royal-gold/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 transition-all ${i === index ? "w-8 bg-royal-gold" : "w-1.5 bg-royal-gold/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
              className="flex h-12 w-12 items-center justify-center border border-royal-gold/30 text-royal-gold transition-colors hover:bg-royal-gold/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
