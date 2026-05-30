"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section className="section-padding border-t border-border bg-bg-elevated/50">
      <div className="mx-auto max-w-[900px] px-6 text-center lg:px-10">
        <p className="text-[10px] tracking-[0.4em] text-text-muted uppercase" data-reveal>
          Patron Voices
        </p>
        <h2 className="font-display mt-4 text-4xl text-text md:text-5xl" data-reveal>
          Testimonials
        </h2>

        <div className="relative mt-16 min-h-[220px]">
          <span className="font-display absolute -top-8 left-1/2 -translate-x-1/2 text-8xl leading-none text-gold/10">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <p className="font-display text-xl leading-relaxed text-text/90 italic md:text-2xl">
                {t.text}
              </p>
              <footer className="mt-10">
                <cite className="not-italic">
                  <p className="text-sm tracking-[0.2em] text-gold uppercase">{t.name}</p>
                  <p className="mt-1 text-xs text-text-muted">{t.location}</p>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 transition-all ${i === index ? "w-10 bg-gold" : "w-1 bg-border"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
