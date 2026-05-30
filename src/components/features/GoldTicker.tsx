"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, X, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Rates {
  gold24K: number;
  gold22K: number;
  gold18K: number;
  silver: number;
  platinum: number;
  diamond: number;
}

export function GoldTicker() {
  const { t } = useTranslation();
  const [rates, setRates] = useState<Rates>({
    gold24K: 13765,
    gold22K: 12609,
    gold18K: 10324,
    silver: 231.44,
    platinum: 5937,
    diamond: 116325,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState<number>(10);
  const [metal, setMetal] = useState<keyof Rates>("gold22K");
  const [makingCharges, setMakingCharges] = useState<number>(12); // percent
  const [includeGST, setIncludeGST] = useState(true);
  const [rateMeta, setRateMeta] = useState({
    updatedAt: "",
    source: "",
    isFallback: false,
  });

  // Fetch live rates on mount and keep polling the live market endpoint.
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/rates", { cache: "no-store" });
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
          setRateMeta({
            updatedAt: data.updatedAt || "",
            source: data.source || "",
            isFallback: Boolean(data.isFallback),
          });
        }
      } catch (err) {
        console.error("Failed to fetch live rates:", err);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (metal === "diamond") {
      setWeight(1.0);
    } else {
      setWeight(10);
    }
  }, [metal]);

  const calculateEstimate = () => {
    const basePrice = rates[metal] * weight;
    const charges = basePrice * (makingCharges / 100);
    const subtotal = basePrice + charges;
    const gst = includeGST ? subtotal * 0.03 : 0; // 3% GST on jewellery in India
    return {
      base: basePrice,
      making: charges,
      gst: gst,
      total: subtotal + gst,
    };
  };

  const estimate = calculateEstimate();

  const getMetalLabel = (key: keyof Rates) => {
    switch (key) {
      case "gold24K": return t("gold24KLabel");
      case "gold22K": return t("gold22KLabel");
      case "gold18K": return t("gold18KLabel");
      case "silver": return t("silverLabel");
      case "platinum": return t("platinumLabel");
      case "diamond": return t("diamondLabel");
    }
  };

  const tickerItems = [
    [`24K ${t("gold")}`, `₹${rates.gold24K}/g`],
    [`22K ${t("gold")}`, `₹${rates.gold22K}/g`],
    [`18K ${t("gold")}`, `₹${rates.gold18K}/g`],
    [t("silver"), `₹${rates.silver}/g`],
    [t("platinum"), `₹${rates.platinum}/g`],
    [`${t("diamond")} (1ct)`, `₹${rates.diamond.toLocaleString("en-IN")}`],
  ];

  const handleResetRates = async () => {
    try {
      const res = await fetch("/api/rates");
      if (res.ok) {
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
          setRateMeta({
            updatedAt: data.updatedAt || "",
            source: data.source || "",
            isFallback: Boolean(data.isFallback),
          });
        }
      }
    } catch (err) {
      console.error("Failed to reset live rates:", err);
    }
  };

  return (
    <>
      {/* Ticker Bar */}
      <div className="relative z-50 w-full overflow-hidden border-b border-border bg-bg-elevated/70 py-2.5 backdrop-blur-md">
        <div className="flex items-center">
          <div className="animate-marquee flex whitespace-nowrap text-[11px] font-medium tracking-[0.15em] text-text-muted">
            <span className="mx-8 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("liveRates").toUpperCase()}{rateMeta.isFallback ? " (FALLBACK)" : ""}:
            </span>
            {tickerItems.map(([label, value]) => (
              <span key={`ticker-a-${label}`} className="mx-8 flex items-center gap-1.5">
                <span className="font-semibold text-gold">{label}:</span> {value}
              </span>
            ))}
            {/* Duplicate for infinite marquee */}
            <span className="mx-8 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t("liveRates").toUpperCase()}{rateMeta.isFallback ? " (FALLBACK)" : ""}:
            </span>
            {tickerItems.map(([label, value]) => (
              <span key={`ticker-b-${label}`} className="mx-8 flex items-center gap-1.5">
                <span className="font-semibold text-gold">{label}:</span> {value}
              </span>
            ))}
          </div>

          {/* Gradient fade mask + Solid button to prevent camouflage and overlapping */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-56 bg-gradient-to-l from-white via-white/95 to-transparent dark:from-neutral-950 dark:via-neutral-950/95 dark:to-transparent flex items-center justify-end pr-2 sm:pr-4 pointer-events-none">
            <button
              onClick={() => setIsOpen(true)}
              className="pointer-events-auto flex items-center justify-center gap-1.5 rounded-full bg-gold p-2 sm:px-4 sm:py-2 text-[10px] font-bold tracking-wider text-bg uppercase hover:bg-gold-dark hover:scale-105 transition-all duration-300 shadow-md"
              aria-label={t("rateCalculator")}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t("rateCalculator")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calculator Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[20px] border border-border bg-bg p-5 sm:p-7 shadow-[0_24px_70px_rgba(0,0,0,0.35)] dark:bg-bg-elevated"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors z-10"
                aria-label="Close Calculator"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-2xl tracking-wider text-text uppercase">{t("calculatorTitle")}</h3>
                </div>
                <button
                  onClick={handleResetRates}
                  className="text-[9px] font-bold tracking-widest text-accent hover:text-accent-hover uppercase underline underline-offset-2 shrink-0 mr-4"
                >
                  {t("resetToLive")}
                </button>
              </div>
              <p className="mt-2.5 text-xs text-text-muted">{t("calculatorSubtitle")}</p>
              <p className="mt-2 text-[10px] leading-relaxed text-text-muted">
                {t("liveSource")}: {rateMeta.source || "gold-api.com"} · {t("updated")}:{" "}
                {rateMeta.updatedAt ? new Date(rateMeta.updatedAt).toLocaleString() : "live"}
                <br />
                {t("indicativeRates")}
              </p>

              <div className="mt-6 space-y-5">
                {/* Select Metal */}
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">{t("selectMetal")}</label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:gap-3">
                    {(Object.keys(rates) as Array<keyof Rates>).map((key) => (
                      <div
                        key={key}
                        onClick={() => setMetal(key)}
                        className={`cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between ${
                          metal === key
                            ? "border-gold bg-gold/10 shadow-[0_4px_18px_rgba(201,169,110,0.12)]"
                            : "border-border hover:border-gold/30 bg-neutral-50/50 dark:bg-neutral-900/40"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100 truncate max-w-[82%]">{getMetalLabel(key)}</span>
                          <input
                            type="radio"
                            name="metal-type"
                            checked={metal === key}
                            onChange={() => setMetal(key)}
                            className="accent-gold h-3.5 w-3.5 cursor-pointer shrink-0"
                          />
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5 bg-white dark:bg-neutral-950 px-2.5 py-1.5 rounded-lg border border-border focus-within:border-gold transition-colors w-full shadow-inner">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono font-bold">₹</span>
                          <input
                            type="number"
                            value={rates[key]}
                            onClick={(e) => e.stopPropagation()} // don't trigger selection when editing rate
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setRates((prev) => ({ ...prev, [key]: val }));
                            }}
                            className="w-full text-xs font-bold text-neutral-900 dark:text-neutral-50 bg-transparent outline-none font-mono"
                          />
                          <span className="text-[9px] text-neutral-500 dark:text-neutral-400 font-sans font-bold">/{key === "diamond" ? "ct" : "g"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight Input */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-semibold tracking-widest text-text-muted uppercase">
                      {metal === "diamond" ? t("diamondWeight") : t("jewelryWeight")}
                    </label>
                    <span className="font-mono text-sm font-semibold text-text">{weight}{metal === "diamond" ? "ct" : "g"}</span>
                  </div>
                  <input
                    type="range"
                    min={metal === "diamond" ? "0.1" : "1"}
                    max={metal === "diamond" ? "15" : "150"}
                    step={metal === "diamond" ? "0.05" : "0.1"}
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-gold"
                  />
                  <div className="mt-1 flex justify-between text-[9px] text-text-muted font-mono">
                    <span>{metal === "diamond" ? "0.1ct" : "1g"}</span>
                    <span>{metal === "diamond" ? "5ct" : "50g"}</span>
                    <span>{metal === "diamond" ? "10ct" : "100g"}</span>
                    <span>{metal === "diamond" ? "15ct" : "150g"}</span>
                  </div>
                </div>

                {/* Making Charges */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-semibold tracking-widest text-text-muted uppercase">{t("makingCharges")}</label>
                    <span className="font-mono text-sm font-semibold text-text">{makingCharges}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={makingCharges}
                    onChange={(e) => setMakingCharges(parseInt(e.target.value))}
                    className="mt-2 w-full accent-gold"
                  />
                  <p className="mt-1 text-[9px] text-text-muted">{t("standardArtisan")}</p>
                </div>

                {/* GST and Breakdown */}
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <label className="flex items-center gap-2 text-xs text-text-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeGST}
                      onChange={(e) => setIncludeGST(e.target.checked)}
                      className="rounded border-border text-gold focus:ring-gold"
                    />
                    <span>{t("includeGST")}</span>
                  </label>
                </div>

                {/* Estimated Value Display */}
                <div className="rounded-xl bg-bg-card p-5 dark:bg-bg/50">
                  <div className="space-y-2 text-xs text-text-muted border-b border-border/60 pb-3">
                    <div className="flex justify-between">
                      <span>{metal === "diamond" ? t("diamondCostLabel") : t("metalCostLabel")} ({weight}{metal === "diamond" ? "ct" : "g"}):</span>
                      <span className="font-mono">₹{estimate.base.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("makingChargesLabel")} ({makingCharges}%):</span>
                      <span className="font-mono">₹{estimate.making.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                    </div>
                    {includeGST && (
                      <div className="flex justify-between">
                        <span>{t("gstLabel")}:</span>
                        <span className="font-mono">₹{estimate.gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-3 text-text">
                    <span className="font-semibold text-sm">{t("estimatedTotal")}:</span>
                    <span className="font-display text-2xl font-semibold text-gold font-mono">
                      ₹{estimate.total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}*
                    </span>
                  </div>
                  <p className="mt-2.5 text-center text-[9px] italic text-text-muted">
                    {t("calculatorDisclaimer")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      const unit = metal === "diamond" ? "ct" : "g";
                      const text = t("whatsappEstimateMessage")
                        .replace("{total}", estimate.total.toLocaleString("en-IN", { maximumFractionDigits: 0 }))
                        .replace("{weight}", weight.toString())
                        .replace("{unit}", unit)
                        .replace("{metal}", getMetalLabel(metal) || "");
                      window.open(`https://wa.me/919412190300?text=${encodeURIComponent(text)}`, "_blank");
                    }}
                    className="flex-1 rounded-lg bg-gold py-3 text-center text-xs font-semibold tracking-wider text-bg uppercase transition-transform hover:-translate-y-0.5"
                  >
                    {t("discussWhatsApp")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
