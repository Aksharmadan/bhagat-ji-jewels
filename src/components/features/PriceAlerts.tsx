"use client";

import { useState } from "react";
import { Bell, Mail, MessageSquare, ShieldCheck } from "lucide-react";

export function PriceAlerts() {
  const [metal, setMetal] = useState("gold22k");
  const [targetPrice, setTargetPrice] = useState("7100");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactInfo, setContactInfo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;
    
    // Simulate setting target alert
    setSubmitted(true);
  };

  const getMetalLabel = (val: string) => {
    if (val === "gold24k") return "24K Gold (Pure)";
    if (val === "gold22k") return "22K Gold (Standard)";
    return "Sterling Silver";
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated p-4 sm:p-8 shadow-xl dark:bg-bg-elevated">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-gold" />
        <h3 className="font-display text-3xl tracking-wide text-text uppercase">Gold Price Alerts</h3>
      </div>
      <p className="mt-1 text-xs text-text-muted">
        Get instant notifications via Email or WhatsApp when metal rates reach your target price.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center dark:bg-emerald-500/10">
          <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto" />
          <h4 className="font-display text-2xl text-text mt-3">Price Alert Configured</h4>
          <p className="text-xs text-text-muted mt-2">
            We will notify you at <span className="font-semibold text-text">{contactInfo}</span> as soon as{" "}
            <span className="font-semibold text-gold">{getMetalLabel(metal)}</span> reaches your target price of{" "}
            <span className="font-semibold text-gold">₹{targetPrice}/g</span>.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setContactInfo("");
            }}
            className="mt-5 rounded-lg border border-border bg-bg px-4 py-2 text-[10px] font-semibold tracking-wider text-text-muted uppercase hover:border-gold hover:text-gold transition-all"
          >
            Configure Another Alert
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Metal Select */}
            <div>
              <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Metal Type</label>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-bg-card px-3.5 py-3 text-xs text-text outline-none focus:border-gold dark:bg-bg"
              >
                <option value="gold24k">24K Gold (Pure)</option>
                <option value="gold22k">22K Gold (Standard)</option>
                <option value="silver">Sterling Silver</option>
              </select>
            </div>

            {/* Target Price */}
            <div>
              <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Target Price (Per Gram)</label>
              <div className="relative mt-2">
                <span className="absolute top-1/2 left-3.5 -translate-y-1/2 font-semibold text-xs text-text-muted">₹</span>
                <input
                  type="number"
                  placeholder="e.g. 7000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full rounded-lg border border-border bg-bg-card py-3 pr-4 pl-8 text-xs text-text outline-none focus:border-gold dark:bg-bg font-mono"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Method */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">Notification Channel</label>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setContactMethod("email")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-xs transition-all ${
                  contactMethod === "email"
                    ? "border-gold bg-gold/5 font-semibold text-gold"
                    : "border-border hover:border-gold/30 text-text-muted"
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={() => setContactMethod("whatsapp")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-xs transition-all ${
                  contactMethod === "whatsapp"
                    ? "border-gold bg-gold/5 font-semibold text-gold"
                    : "border-border hover:border-gold/30 text-text-muted"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Info input */}
          <div>
            <label className="text-[10px] font-bold tracking-widest text-text-muted uppercase">
              {contactMethod === "email" ? "Email Address" : "WhatsApp Number"}
            </label>
            <input
              type={contactMethod === "email" ? "email" : "tel"}
              placeholder={contactMethod === "email" ? "e.g. elegance@bhagat.com" : "e.g. +91 9412190300"}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg-card px-3.5 py-3 text-xs text-text outline-none focus:border-gold dark:bg-bg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-gold py-3 text-center text-xs font-semibold tracking-wider text-bg uppercase hover:bg-gold-dark transition-colors"
          >
            Set Price Notification Alert
          </button>
        </form>
      )}
    </div>
  );
}
