"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  showTagline?: boolean;
  animated?: boolean;
}

const sizes = {
  sm: { img: 48, text: "text-xs" },
  md: { img: 72, text: "text-sm" },
  lg: { img: 120, text: "text-base" },
  hero: { img: 200, text: "text-lg" },
};

export function Logo({ className, size = "md", showTagline = false, animated = true }: LogoProps) {
  const s = sizes[size];
  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
        whileHover: { scale: 1.02 },
      }
    : {};

  return (
    <Wrapper
      className={cn("group relative flex flex-col items-center", className)}
      {...wrapperProps}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src="/logo.png"
            alt="BHAGAT JI JEWELS"
            width={s.img}
            height={s.img}
            className="relative z-10 h-auto w-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]"
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <LogoFallback className="hidden" size={size} />
        </div>
      </div>
      {showTagline && (
        <p
          className={cn(
            "mt-3 tracking-[0.35em] text-royal-gold/80 uppercase",
            s.text
          )}
        >
          Where Heritage Becomes Luxury
        </p>
      )}
    </Wrapper>
  );
}

function LogoFallback({ className, size }: { className?: string; size: LogoProps["size"] }) {
  const dim = size === "hero" ? 180 : size === "lg" ? 100 : size === "md" ? 64 : 40;
  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      style={{ width: dim, height: dim }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7e7ce" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a68a2d" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" />
        <text
          x="60"
          y="72"
          textAnchor="middle"
          fill="url(#goldGrad)"
          fontSize="42"
          fontFamily="Georgia, serif"
          fontWeight="300"
        >
          BJ
        </text>
      </svg>
      <span className="mt-1 text-[8px] tracking-[0.3em] text-royal-gold">JEWELS</span>
    </div>
  );
}
