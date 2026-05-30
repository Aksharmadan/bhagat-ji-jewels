"use client";

import { useState } from "react";
import { Minus, Plus, Ruler, HelpCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export function RingSizeEstimator() {
  const { t } = useTranslation();
  const [diameter, setDiameter] = useState(16.5); // mm
  const minDiameter = 8.0;
  const maxDiameter = 23.0;

  const updateDiameter = (nextDiameter: number) => {
    const clamped = Math.min(maxDiameter, Math.max(minDiameter, nextDiameter));
    setDiameter(Number(clamped.toFixed(1)));
  };

  const getIndianSize = (diam: number) => {
    // Standard Indian Ring Sizes mapping diameter (mm) to size number
    if (diam < 12.0) return `${t("below")} 1`;
    if (diam >= 12.0 && diam < 12.5) return "1";
    if (diam >= 12.5 && diam < 13.0) return "2";
    if (diam >= 13.0 && diam < 13.5) return "3";
    if (diam >= 13.5 && diam < 14.3) return "4";
    if (diam < 14.3) return "Below 5";
    if (diam >= 14.3 && diam < 14.7) return `6 (${t("standardSmall")})`;
    if (diam >= 14.7 && diam < 15.1) return "7";
    if (diam >= 15.1 && diam < 15.5) return "8";
    if (diam >= 15.5 && diam < 15.9) return "9";
    if (diam >= 15.9 && diam < 16.3) return "10";
    if (diam >= 16.3 && diam < 16.7) return `11 (${t("standardMedium")})`;
    if (diam >= 16.7 && diam < 17.1) return "12";
    if (diam >= 17.1 && diam < 17.5) return "13";
    if (diam >= 17.5 && diam < 17.9) return "14";
    if (diam >= 17.9 && diam < 18.3) return "15";
    if (diam >= 18.3 && diam < 18.8) return `16 (${t("standardLarge")})`;
    if (diam >= 18.8 && diam < 19.2) return "17";
    if (diam >= 19.2 && diam < 19.6) return "18";
    if (diam >= 19.6 && diam < 20.0) return "19";
    if (diam >= 20.0 && diam < 20.4) return "20";
    if (diam >= 20.4 && diam < 20.8) return "21";
    if (diam >= 20.8 && diam < 21.2) return "22";
    if (diam >= 21.2 && diam < 21.6) return "23";
    if (diam >= 21.6 && diam < 22.0) return "24";
    return `25+ (${t("extraLarge")})`;
  };

  const circumference = (diameter * Math.PI).toFixed(1);
  const sizeLabel = getIndianSize(diameter);

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="flex items-center gap-2">
        <Ruler className="h-5 w-5 text-gold" />
        <h3 className="font-display text-3xl tracking-wide text-text uppercase">{t("screenRingSizer")}</h3>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        {t("ringSizerDesc")}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Interactive Circle Calibration Area */}
        <div className="flex flex-col items-center justify-center rounded-xl bg-bg-card/50 p-6 min-h-[300px] border border-border/40 relative dark:bg-bg/40">
          <div className="absolute top-3 left-3 text-[9px] font-bold text-gold uppercase tracking-widest bg-gold/10 px-2.5 py-0.5 rounded">
            {t("physicalRingPlacement")}
          </div>
          
          {/* Dynamic sizing circle */}
          <div className="relative flex items-center justify-center h-[200px] w-[200px]">
            {/* Outline Reference scale */}
            <div
              style={{
                width: `${diameter * 8}px`, // scale mm to pixels (approx 1mm = 8px on average screens)
                height: `${diameter * 8}px`,
              }}
              className="rounded-full border-[3px] border-dashed border-gold/75 bg-radial-gradient from-gold/5 to-gold/20 flex items-center justify-center transition-all duration-75 relative shadow-[0_0_30px_rgba(212,175,55,0.25)]"
            >
              <div className="absolute inset-0.5 rounded-full border border-gold/20" />
              {/* Diameter label in circle */}
              <span className="font-mono text-[10px] font-bold text-text bg-bg-elevated px-2 py-0.5 rounded shadow-sm">
                {diameter} mm
              </span>
            </div>
          </div>

          <p className="mt-2 text-center text-[10px] text-text-muted max-w-sm italic">
            {t("ringPlacementHelp")}
          </p>
        </div>

        {/* Ring size indicators and slider */}
        <div className="space-y-6">
          {/* Main Slider */}
          <div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>{t("adjustCircleDiameter")}</span>
              <span className="font-mono text-text font-bold">{diameter} mm</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateDiameter(diameter - 0.1)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-bg-elevated text-text shadow-sm transition-colors hover:border-gold hover:text-gold"
                aria-label="Decrease ring diameter"
              >
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="range"
                min={minDiameter}
                max={maxDiameter}
                step="0.1"
                value={diameter}
                onChange={(e) => updateDiameter(parseFloat(e.target.value))}
                className="w-full accent-gold"
              />
              <button
                type="button"
                onClick={() => updateDiameter(diameter + 0.1)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-bg-elevated text-text shadow-sm transition-colors hover:border-gold hover:text-gold"
                aria-label="Increase ring diameter"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-1 flex justify-between font-mono text-[9px] text-text-muted">
              <span>8.0 mm</span>
              <span>13.5 mm</span>
              <span>18.0 mm (Size 15)</span>
              <span>23.0 mm (Size 25)</span>
            </div>
          </div>

          {/* Size Readout Card */}
          <div className="rounded-xl border border-border bg-bg-card/30 p-5 dark:bg-bg/20">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{t("calculatedIndianSize")}</span>
                <p className="font-display text-4xl text-gold mt-1">{sizeLabel}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{t("innerDiameter")}</span>
                  <p className="font-mono font-semibold text-text mt-0.5">{diameter} mm</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">{t("innerCircumference")}</span>
                  <p className="font-mono font-semibold text-text mt-0.5">{circumference} mm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sizing Help Box */}
          <div className="rounded-lg bg-gold/5 p-4 border border-gold/10 flex gap-3">
            <HelpCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <div className="text-xs text-text-muted space-y-1">
              <p className="font-semibold text-text">{t("measureWithoutRing")}</p>
              <p>{t("measureWithoutRingDesc")}</p>
            </div>
          </div>

          <button
            onClick={() => window.open(`https://wa.me/919412190300?text=Hi%20Bhagat%20Ji%20Jewels,%20I%20estimate%20my%20ring%20size%20is%20Indian%20Size%20${sizeLabel}%20using%20your%20Sizer%20tool.%20I%20want%20to%20order%20a%20custom%20ring.`, "_blank")}
            className="w-full rounded-lg bg-gold py-3 text-center text-xs font-semibold tracking-wider text-bg uppercase transition-transform hover:-translate-y-0.5"
          >
            {t("orderRingSize")} {sizeLabel.split(" ")[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
