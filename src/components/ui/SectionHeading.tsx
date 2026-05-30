"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-4 text-xs tracking-[0.4em] text-royal-gold uppercase">
          {eyebrow}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 md:gap-6">
        {align === "center" && (
          <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-royal-gold/60 md:block" />
        )}
        <h2 className="font-display text-4xl font-light leading-tight text-ivory md:text-5xl lg:text-6xl">
          <span className="text-gradient-gold">{title}</span>
        </h2>
        {align === "center" && (
          <span className="hidden h-px w-12 bg-gradient-to-l from-transparent to-royal-gold/60 md:block" />
        )}
      </div>
      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory/60 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
