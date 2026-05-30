"use client";

import { useState } from "react";
import { Hammer, AlertCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

type MetalType = "gold" | "rose" | "white";
type GemType = "diamond" | "ruby" | "emerald" | "sapphire" | "topaz";
type CaratType = "1.0" | "1.5" | "2.0" | "2.5" | "3.0";
type SettingType = "solitaire" | "halo" | "three-stone";

export function CustomConfigurator() {
  const { t } = useTranslation();
  const [metal, setMetal] = useState<MetalType>("gold");
  const [gem, setGem] = useState<GemType>("diamond");
  const [carat, setCarat] = useState<CaratType>("1.5");
  const [setting, setSetting] = useState<SettingType>("solitaire");

  // Style configurations
  const getMetalColor = (type: MetalType) => {
    switch (type) {
      case "gold": return { band: "#d4af37", shine: "#f6e497" };
      case "rose": return { band: "#b76e79", shine: "#e8c3c8" };
      case "white": return { band: "#e5e5e5", shine: "#ffffff" };
    }
  };

  const getGemDetails = (type: GemType) => {
    switch (type) {
      case "diamond": return { color: "#e0f2fe", border: "#38bdf8", glow: "#7dd3fc", label: t("vvsDiamond") };
      case "ruby": return { color: "#fee2e2", border: "#f87171", glow: "#fca5a5", label: t("crimsonRuby") };
      case "emerald": return { color: "#dcfce7", border: "#4ade80", glow: "#86efac", label: t("zambianEmerald") };
      case "sapphire": return { color: "#e0f2fe", border: "#2563eb", glow: "#3b82f6", label: t("kashmirSapphire") };
      case "topaz": return { color: "#ecfeff", border: "#06b6d4", glow: "#22d3ee", label: t("blueTopaz") };
    }
  };

  const metalInfo = getMetalColor(metal);
  const gemInfo = getGemDetails(gem);

  const formatBespokeRequest = () => {
    const text = `Hi Bhagat Ji Jewels, I created a custom jewelry configuration using your Bespoke Builder:
- Metal: ${metal.toUpperCase()}
- Gemstone: ${gemInfo.label}
- Carat: ${carat} Carats
- Setting Style: ${setting.toUpperCase()}
I would love to get a quote and schedule a private design consultation.`;
    return `https://wa.me/919412190300?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Dynamic Jewelry Visualizer */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-bg-card/50 p-4 sm:p-8 shadow-inner dark:bg-bg/40 min-h-[320px] sm:min-h-[380px] relative overflow-hidden border border-border/40">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
          
          {/* Stylized Ring Vector */}
          <div className="relative h-[180px] w-[180px] sm:h-[240px] sm:w-[240px]">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]">
              {/* Ring Band */}
              <circle
                cx="100"
                cy="115"
                r="50"
                fill="none"
                stroke={metalInfo.band}
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="115"
                r="50"
                fill="none"
                stroke={metalInfo.shine}
                strokeWidth="3"
                strokeDasharray="20, 60"
              />

              {/* Side Diamonds (for Three-Stone Setting) */}
              {setting === "three-stone" && (
                <>
                  {/* Left stone */}
                  <polygon
                    points="75,60 83,52 87,60 79,68"
                    fill="#e0f2fe"
                    stroke="#38bdf8"
                    strokeWidth="1"
                  />
                  {/* Right stone */}
                  <polygon
                    points="125,60 117,52 113,60 121,68"
                    fill="#e0f2fe"
                    stroke="#38bdf8"
                    strokeWidth="1"
                  />
                  {/* Setting Prongs for side stones */}
                  <circle cx="75" cy="60" r="1.5" fill={metalInfo.band} />
                  <circle cx="125" cy="60" r="1.5" fill={metalInfo.band} />
                </>
              )}

              {/* Setting Halo Ring (for Halo Setting) */}
              {setting === "halo" && (
                <circle
                  cx="100"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeDasharray="4, 2"
                />
              )}

              {/* Main Gemstone - Styled Diamond Shape */}
              <polygon
                points="100,32 118,50 100,68 82,50"
                fill={gemInfo.color}
                stroke={gemInfo.border}
                strokeWidth="2"
                className="transition-all duration-300"
              />
              <polygon
                points="100,32 108,50 100,68 92,50"
                fill="#ffffff"
                opacity="0.35"
              />

              {/* Setting Prongs for Central Stone */}
              <circle cx="82" cy="50" r="2.5" fill={metalInfo.band} />
              <circle cx="118" cy="50" r="2.5" fill={metalInfo.band} />
              <circle cx="100" cy="32" r="2.5" fill={metalInfo.band} />
              <circle cx="100" cy="68" r="2.5" fill={metalInfo.band} />
            </svg>
          </div>

          <div className="mt-4 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
              {setting === "solitaire" ? t("solitaire") : setting === "halo" ? t("halo") : t("threeStone")} {t("setConfiguration")}
            </span>
            <h4 className="font-display text-2xl text-text mt-2">
              {carat}ct {gemInfo.label}
            </h4>
            <p className="text-xs text-text-muted mt-0.5">
              {t("setIn")} {metal === "gold" ? t("yellowGold18") : metal === "rose" ? t("roseGold18") : t("platinum950")}
            </p>
          </div>
        </div>

        {/* Customizer Controls Panel */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Hammer className="h-5 w-5 text-gold" />
            <h3 className="font-display text-3xl tracking-wide text-text uppercase">{t("bespokeCustomizer")}</h3>
          </div>
          <p className="text-sm text-text-muted">
            {t("bespokeCustomizerDesc")}
          </p>

          {/* Metal Selector */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">1. {t("selectMetalAlloy")}</label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {[
                { type: "gold", label: t("yellowGold18"), color: "bg-[#d4af37]" },
                { type: "rose", label: t("roseGold18"), color: "bg-[#b76e79]" },
                { type: "white", label: t("platinum950"), color: "bg-[#e5e5e5]" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setMetal(item.type as MetalType)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs transition-all ${
                    metal === item.type
                      ? "border-gold bg-gold/5 font-semibold text-gold"
                      : "border-border hover:border-gold/30 text-text-muted"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${item.color} border border-black/10`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gemstone Selector */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">2. {t("selectGemstone")}</label>
            <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { type: "diamond", label: t("vvsDiamond"), color: "bg-sky-100" },
                { type: "ruby", label: t("crimsonRuby"), color: "bg-red-500" },
                { type: "emerald", label: t("zambianEmerald"), color: "bg-emerald-500" },
                { type: "sapphire", label: t("kashmirSapphire"), color: "bg-blue-600" },
                { type: "topaz", label: t("blueTopaz"), color: "bg-cyan-400" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setGem(item.type as GemType)}
                  className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-xs transition-all ${
                    gem === item.type
                      ? "border-gold bg-gold/5 font-semibold text-gold"
                      : "border-border hover:border-gold/30 text-text-muted"
                  }`}
                >
                  <span className={`h-3 w-3 rotate-45 ${item.color} border border-black/10`} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Carat Selector */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">3. {t("caratWeight")}</label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {["1.0", "1.5", "2.0", "2.5", "3.0"].map((size) => (
                <button
                  key={size}
                  onClick={() => setCarat(size as CaratType)}
                  className={`rounded-lg border px-4 py-2 text-xs font-mono transition-all ${
                    carat === size
                      ? "border-gold bg-gold/5 font-semibold text-gold"
                      : "border-border hover:border-gold/30 text-text-muted"
                  }`}
                >
                  {size} {t("carats")}
                </button>
              ))}
            </div>
          </div>

          {/* Setting Selector */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">4. {t("settingStyle")}</label>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {[
                { type: "solitaire", label: t("solitaire") },
                { type: "halo", label: t("halo") },
                { type: "three-stone", label: t("threeStone") },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => setSetting(item.type as SettingType)}
                  className={`rounded-lg border px-4 py-2.5 text-xs transition-all ${
                    setting === item.type
                      ? "border-gold bg-gold/5 font-semibold text-gold"
                      : "border-border hover:border-gold/30 text-text-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing warning and WhatsApp Link */}
          <div className="rounded-lg bg-gold/5 border border-gold/20 p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-relaxed">
              {t("bespokeNotice")}
            </p>
          </div>

          <button
            onClick={() => window.open(formatBespokeRequest(), "_blank")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-xs font-semibold tracking-widest text-bg uppercase transition-transform hover:-translate-y-0.5"
          >
            <span>{t("inquireDesignQuote")}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
