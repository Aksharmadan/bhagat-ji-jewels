"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black-luxury"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="noise-overlay absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div
              className="absolute inset-0 blur-3xl"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
              }}
            />
            <Image
              src="/logo.png"
              alt="BHAGAT JI JEWELS"
              width={160}
              height={160}
              className="relative z-10 drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]"
              priority
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs tracking-[0.5em] text-royal-gold/80 uppercase"
            >
              Since 1960
            </motion.p>
          </motion.div>
          <motion.div
            className="absolute bottom-20 h-px w-48 overflow-hidden bg-royal-gold/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-royal-gold"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
