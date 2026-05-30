"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";

export function HallmarkSeal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sticky Floating Seal */}
      <div className="fixed bottom-20 left-6 md:bottom-6 md:left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-bg shadow-[0_12px_36px_rgba(141,51,52,0.35)] hover:bg-gold-dark hover:shadow-2xl transition-all duration-300 border border-gold-light/20"
          aria-label="View BIS Hallmark Authenticity Details"
        >
          <ShieldCheck className="h-4.5 w-4.5 text-bg animate-pulse" />
          <span className="block">BIS Seal</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 ease-out whitespace-nowrap block">
            &nbsp;(916 Pure)
          </span>
        </button>
      </div>

      {/* Expanded Trust Card Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[120] flex items-end justify-start p-6 pointer-events-none">
            <div className="absolute inset-0 bg-black/35 backdrop-blur-sm pointer-events-auto" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-sm rounded-2xl border border-gold/30 bg-bg p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto dark:bg-bg-elevated dark:border-border"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-xl text-text font-bold uppercase tracking-wider">BIS Hallmark Trust</h4>
                  <p className="text-[9px] text-text-muted">Indian Standard Purity Certified since 1960</p>
                </div>
              </div>

              {/* Anatomy of Hallmark */}
              <div className="mt-5 space-y-4">
                <p className="text-xs text-text-muted leading-relaxed">
                  Every jewelry item created by Bhagat Ji Jewels carries the official **Govt. of India BIS Hallmark stamp**, comprising three visible laser marks:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      label: "1. BIS Standard Logo",
                      desc: "A triangular seal verifying that the jewelry has been assayed in an approved government center."
                    },
                    {
                      label: "2. Purity Fineness Grade",
                      desc: "For example, '22K916' representing 22-carat gold containing 91.6% pure gold alloy."
                    },
                    {
                      label: "3. 6-Digit Alphanumeric HUID",
                      desc: "A unique Hallmark Unique Identification identifier, allowing digital tracking of each specific piece."
                    }
                  ].map((mark) => (
                    <div key={mark.label} className="rounded-lg bg-bg-card/50 p-3 border border-border/40 dark:bg-bg/40">
                      <span className="text-[9.5px] font-bold text-gold uppercase tracking-wider block">{mark.label}</span>
                      <p className="text-[10.5px] text-text-muted mt-0.5 leading-relaxed">{mark.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-gold/5 p-3.5 border border-gold/10 text-[10px] text-text-muted">
                  <span className="font-bold text-text block">100% Return & Exchange Guarantee</span>
                  We offer absolute weight-for-weight exchange policies on all hallmarked gold items in our showrooms.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
