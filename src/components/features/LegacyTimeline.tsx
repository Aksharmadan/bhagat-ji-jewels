"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Award, History } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "1960",
    title: "The Foundational Spark",
    subtitle: "Chandausi, Uttar Pradesh",
    description: "Shri Bhagat Ji establishes a modest metalcraft atelier, quickly earning repute for unmatched honesty, meticulous weight calculations, and pure gold alloys.",
    highlight: "First brick-and-mortar showroom opened, catering to local wedding families.",
  },
  {
    year: "1985",
    title: "Regional Ceremonial Acclaim",
    subtitle: "Curated Bridal Ornaments",
    description: "The brand shifts focus to heavy, hand-crafted temple collections and kundan sets, becoming the default wedding jeweler for families across Western UP.",
    highlight: "Employed 20+ master goldsmiths (karigars) to protect dying filigree arts.",
  },
  {
    year: "2005",
    title: "A New Standard of Trust",
    subtitle: "Certified Purity Revolution",
    description: "Bhagat Ji Jewels becomes an early adopter of the Government of India's BIS Hallmarking framework, enforcing certified 22K (916) standards on all showroom catalog inventory.",
    highlight: "Pioneered GIA/IGI certified diamond distributions in regional markets.",
  },
  {
    year: "2018",
    title: "Bespoke Concierge Desks",
    subtitle: "Private Design Consultation",
    description: "Transitioning to a private shopping environment, launching customized styling and private bridal suite matching sessions by appointment.",
    highlight: "Launched online catalog for digital discovery and remote WhatsApp consultations.",
  },
  {
    year: "2026",
    title: "Next-Gen Luxury Retail",
    subtitle: "Digital Virtual Mirrors & Soundscapes",
    description: "Blending luxury heritage with modern interfaces. Introducing live metal calculators, virtual webcam try-on tools, and interactive sizing portals.",
    highlight: "First digital flagship launched, merging 66 years of trust with modern UX.",
  },
];

export function LegacyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = MILESTONES[activeIndex];

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-8 shadow-xl dark:bg-bg-elevated">
      <div className="flex items-center gap-2">
        <History className="h-5 w-5 text-gold" />
        <h3 className="font-display text-3xl tracking-wide text-text uppercase">Our Legacy Journey</h3>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        Explore the history of Bhagat Ji Jewels - preserving purity and art since 1960.
      </p>

      {/* Horizontal Year Nav Bar */}
      <div className="mt-8 flex border-b border-border/80 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex w-full justify-between min-w-[500px]">
          {MILESTONES.map((m, i) => (
            <button
              key={m.year}
              onClick={() => setActiveIndex(i)}
              className={`relative pb-3 text-center flex-1 transition-all ${
                activeIndex === i
                  ? "font-display text-xl font-bold text-gold"
                  : "text-xs font-semibold text-text-muted hover:text-text"
              }`}
            >
              <span>{m.year}</span>
              {activeIndex === i && (
                <motion.div
                  layoutId="activeTimelineBar"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Slide Display */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.year}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:grid-cols-[0.4fr_1.6fr] md:items-center"
          >
            {/* Year Stamp */}
            <div className="flex flex-col items-center justify-center rounded-xl bg-gold/5 p-6 border border-gold/15 text-center">
              <span className="text-[10px] font-bold tracking-widest text-gold uppercase">Established</span>
              <span className="font-display text-5xl font-bold text-gold mt-1">{active.year}</span>
              <Calendar className="h-5 w-5 text-gold mt-3 opacity-60" />
            </div>

            {/* Description Details */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{active.subtitle}</span>
                <h4 className="font-display text-3xl text-text mt-1">{active.title}</h4>
              </div>
              
              <p className="text-xs leading-relaxed text-text-muted">{active.description}</p>
              
              {/* Highlight Ribbon */}
              <div className="flex items-center gap-3 rounded-lg bg-bg-card p-4 dark:bg-bg/50 border border-border/40">
                <Award className="h-5 w-5 text-gold shrink-0" />
                <p className="text-[11.5px] font-medium text-text-muted">{active.highlight}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-between border-t border-border pt-5">
        <button
          onClick={() => setActiveIndex((idx) => Math.max(0, idx - 1))}
          disabled={activeIndex === 0}
          className="text-[10px] uppercase font-bold tracking-widest text-text-muted hover:text-gold disabled:opacity-40 disabled:hover:text-text-muted"
        >
          ← Previous
        </button>
        <span className="text-[10px] font-mono text-text-muted">Step {activeIndex + 1} of {MILESTONES.length}</span>
        <button
          onClick={() => setActiveIndex((idx) => Math.min(MILESTONES.length - 1, idx + 1))}
          disabled={activeIndex === MILESTONES.length - 1}
          className="text-[10px] uppercase font-bold tracking-widest text-text-muted hover:text-gold disabled:opacity-40 disabled:hover:text-text-muted"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
