"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop;
        const height = doc.scrollHeight - doc.clientHeight;
        const progress = height > 0 ? scrollTop / height : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    const doc = document.documentElement;
    const height = doc.scrollHeight - doc.clientHeight;
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${height > 0 ? doc.scrollTop / height : 0})`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-[51] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light will-change-transform"
      />
    </div>
  );
}
