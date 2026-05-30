"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost" | "ivory";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
}

const variants: Record<Variant, string> = {
  gold:
    "bg-gradient-to-r from-gold-dark via-royal-gold to-gold-light text-black-luxury font-medium shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]",
  outline:
    "border border-royal-gold/50 text-royal-gold bg-transparent hover:bg-royal-gold/10 hover:border-royal-gold",
  ghost: "text-ivory/80 hover:text-royal-gold bg-transparent",
  ivory: "bg-ivory/95 text-black-luxury hover:bg-ivory",
};

export function Button({
  children,
  href,
  onClick,
  variant = "gold",
  className,
  external,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 overflow-hidden px-8 py-4 text-xs tracking-[0.25em] uppercase transition-all duration-500",
    variants[variant],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "gold" && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
