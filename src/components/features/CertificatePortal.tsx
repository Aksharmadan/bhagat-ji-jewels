"use client";

import { useState } from "react";
import { ShieldCheck, Search, Award, Check, AlertTriangle } from "lucide-react";

interface Certificate {
  id: string;
  type: "HUID" | "GIA" | "PT";
  purity: string;
  description: string;
  weight: string;
  hallmarkedDate: string;
  office: string;
  status: string;
}

const DATABASE: Record<string, Certificate> = {
  "HUID-916-G705": {
    id: "HUID-916-G705",
    type: "HUID",
    purity: "22K Yellow Gold (91.6% Pure)",
    description: "Royal Gold Necklace - Signature Collection",
    weight: "28.42 Grams",
    hallmarkedDate: "April 14, 2026",
    office: "Chandausi Hallmark Centre (U.P.)",
    status: "Verified Authentic",
  },
  "GIA-DIA-D991": {
    id: "GIA-DIA-D991",
    type: "GIA",
    purity: "VVS1 Clarity, Color D (Solitaire)",
    description: "Solitaire Engagement Ring - Brilliance Edit",
    weight: "1.52 Carats",
    hallmarkedDate: "March 22, 2026",
    office: "GIA Laboratory Mumbai",
    status: "Certified Authentic",
  },
  "HUID-916-B303": {
    id: "HUID-916-B303",
    type: "HUID",
    purity: "22K Gold (91.6% Pure)",
    description: "Maharani Bridal Set - Royal Bridal Collection",
    weight: "84.15 Grams",
    hallmarkedDate: "May 02, 2026",
    office: "Moradabad Assay Bureau",
    status: "Verified Authentic",
  },
  "PLAT-950-P112": {
    id: "PLAT-950-P112",
    type: "PT",
    purity: "Platinum PT950 (95% Pure)",
    description: "Platinum Wedding Band - Classic Platinum Collection",
    weight: "6.85 Grams",
    hallmarkedDate: "February 18, 2026",
    office: "Platinum Guild International Assayed",
    status: "Verified Authentic",
  },
};

export function CertificatePortal() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (DATABASE[cleanQuery]) {
      setResult(DATABASE[cleanQuery]);
    } else {
      setResult(null);
    }
    setSearched(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h3 className="font-display mt-4 text-3xl tracking-wide text-text uppercase">Purity Verification Portal</h3>
        <p className="mt-2 text-xs text-text-muted">
          Enter your BIS HUID Hallmark code or GIA Diamond Certificate number to verify product authenticity.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="e.g. HUID-916-G705, GIA-DIA-D991, HUID-916-B303"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-card py-3 pr-4 pl-11 text-xs uppercase tracking-wider text-text outline-none focus:border-gold dark:bg-bg"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-gold px-6 py-3 text-xs font-semibold tracking-widest text-bg uppercase hover:bg-gold-dark transition-colors"
          >
            Verify Purity
          </button>
        </form>

        <p className="mt-2 text-left text-[9px] text-text-muted">
          💡 Try scanning HUID codes: <span className="font-mono text-gold underline cursor-pointer" onClick={() => setQuery("HUID-916-G705")}>HUID-916-G705</span> or <span className="font-mono text-gold underline cursor-pointer" onClick={() => setQuery("GIA-DIA-D991")}>GIA-DIA-D991</span>
        </p>
      </div>

      {/* Verification Certificate Render */}
      {searched && (
        <div className="mt-8 border-t border-border pt-8">
          {result ? (
            <div className="mx-auto max-w-xl rounded-xl border border-gold/40 bg-bg-card/40 p-6 relative overflow-hidden dark:bg-bg/20">
              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 bg-gold/5 rounded-full" />
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-bold tracking-widest text-gold uppercase bg-gold/15 px-2.5 py-1 rounded-full">
                    {result.type} CERTIFIED
                  </span>
                  <h4 className="font-display text-2xl text-text mt-3">{result.description}</h4>
                </div>
                <Award className="h-10 w-10 text-gold" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Certificate ID</p>
                  <p className="font-mono font-semibold text-text mt-0.5">{result.id}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Purity / Grade</p>
                  <p className="font-semibold text-text mt-0.5">{result.purity}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Item Net Weight</p>
                  <p className="font-semibold text-text mt-0.5">{result.weight}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Verification Date</p>
                  <p className="font-semibold text-text mt-0.5">{result.hallmarkedDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] uppercase font-bold tracking-wider text-text-muted">Assaying Laboratory</p>
                  <p className="font-semibold text-text mt-0.5">{result.office}</p>
                </div>
              </div>

              {/* Verified seal */}
              <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs dark:text-emerald-500">
                  <Check className="h-4 w-4 stroke-[3px]" />
                  <span>{result.status}</span>
                </div>
                <span className="text-[9px] font-mono text-text-muted">Authorized by BIS India / GIA Lab</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center dark:bg-red-500/10">
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
              <h4 className="font-display text-xl text-text mt-3">Certificate Not Found</h4>
              <p className="text-xs text-text-muted mt-1">
                The certificate number `{query}` was not found in our digital record. Please check the spelling or get in touch with concierge.
              </p>
              <button
                onClick={() => window.open(`https://wa.me/919412190300?text=Hello,%20I%20want%20to%20verify%20certificate%20ID%20${query}`, "_blank")}
                className="mt-4 rounded border border-red-500/30 px-4 py-2 text-[10px] uppercase font-semibold tracking-wider text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                Contact Concierge Desk
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
