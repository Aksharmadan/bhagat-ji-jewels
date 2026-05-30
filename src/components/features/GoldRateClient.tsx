"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Info, LineChart, Sparkles, TrendingUp } from "lucide-react";

type Rates = {
  gold24K: number;
  gold22K: number;
  gold18K: number;
  silver: number;
  platinum: number;
  diamond: number;
};

type RateSnapshot = {
  timestamp: string;
  rates: Rates;
};

type PriceAlert = {
  id: string;
  name: string;
  phone: string;
  metal: keyof Rates;
  target: number;
  direction: "below" | "above";
  triggeredAt?: string;
  triggeredRate?: number;
};

const defaultRates: Rates = {
  gold24K: 0,
  gold22K: 0,
  gold18K: 0,
  silver: 0,
  platinum: 0,
  diamond: 0,
};

const metalOptions: Array<{ key: keyof Rates; label: string; unit: string; desc: string }> = [
  { key: "gold24K", label: "Gold 24K (Pure Gold)", unit: "gram", desc: "Used primarily for bullion coins and bar investments. 99.9% purity." },
  { key: "gold22K", label: "Gold 22K (Standard Gold)", unit: "gram", desc: "Standard purity for gold necklaces, jhumkas, and kangan suites. 91.6% purity." },
  { key: "gold18K", label: "Gold 18K (Ornamental)", unit: "gram", desc: "Commonly used for certified diamond engagement rings. 75.0% purity." },
  { key: "silver", label: "Sterling Silver 925", unit: "gram", desc: "Used for traditional anklets, silver coins, and contemporary rings." },
  { key: "platinum", label: "Platinum 950", unit: "gram", desc: "Elegant, durable silver-white metal popular for bands and daily rings." },
  { key: "diamond", label: "Solitaire Diamond (1ct benchmark)", unit: "carat", desc: "Representative benchmark for premium 1-carat certified natural diamonds." },
];

function formatRate(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

function RealtimeChart({ history, activeMetal }: { history: RateSnapshot[]; activeMetal: keyof Rates }) {
  const points = history.length > 1 ? history : [];
  const values = points.map((point) => point.rates[activeMetal]).filter(Number.isFinite);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const delta = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = points.length === 1 ? 0 : (index / (points.length - 1)) * 100;
      const y = 92 - ((point.rates[activeMetal] - min) / delta) * 76;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <div className="rounded-xl border border-border/80 bg-white p-5 shadow-sm dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text">
          <LineChart className="h-4 w-4 text-emerald-500" /> Real-Time Price Tracer
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-text-muted">{points.length} live samples</span>
      </div>
      <div className="h-64 rounded-lg border border-border/50 bg-bg-card/40 p-3">
        {points.length < 2 ? (
          <div className="grid h-full place-items-center text-center text-xs text-text-muted">
            Live chart is ready. It will draw as new market samples arrive.
          </div>
        ) : (
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="currentColor" className="text-border" strokeWidth="0.25" />
            ))}
            <path d={path} fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-text-muted">
        <span>{points[0] ? new Date(points[0].timestamp).toLocaleTimeString() : "waiting"}</span>
        <span>{points.at(-1) ? new Date(points.at(-1)!.timestamp).toLocaleTimeString() : "live"}</span>
      </div>
    </div>
  );
}

export function GoldRateClient() {
  const [rates, setRates] = useState<Rates>(defaultRates);
  const [history, setHistory] = useState<RateSnapshot[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [source, setSource] = useState("");
  const [activeMetal, setActiveMetal] = useState<keyof Rates>("gold22K");
  const [form, setForm] = useState({ name: "", phone: "", metal: "gold22K" as keyof Rates, target: "", direction: "below" as "below" | "above" });
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [status, setStatus] = useState("");

  const activeOption = useMemo(() => metalOptions.find((option) => option.key === activeMetal) ?? metalOptions[1], [activeMetal]);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch("/api/rates", { cache: "no-store" });
      const data = await response.json();
      if (data.rates) {
        setRates(data.rates);
        setUpdatedAt(data.updatedAt || "");
        setSource(data.source || "");
        if (Array.isArray(data.triggeredAlerts) && data.triggeredAlerts.length > 0) {
          setAlerts((current) => [...data.triggeredAlerts, ...current]);
          if ("Notification" in window && Notification.permission === "granted") {
            data.triggeredAlerts.forEach((alert: PriceAlert) => {
              new Notification("Bhagat Ji price alert", {
                body: `${metalOptions.find((item) => item.key === alert.metal)?.label} reached ₹${alert.triggeredRate}/g`,
              });
            });
          }
        }
      }

      const historyResponse = await fetch("/api/rates/history", { cache: "no-store" });
      const historyData = await historyResponse.json();
      if (Array.isArray(historyData.history)) setHistory(historyData.history);
    };

    fetchRates();
    const id = window.setInterval(fetchRates, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const submitAlert = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Saving alert...");
    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission();
    }

    const response = await fetch("/api/price-alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, target: Number(form.target) }),
    });
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || "Could not save alert.");
      return;
    }
    setAlerts((current) => [data.alert, ...current]);
    setStatus("Alert saved. Keep this site open to receive browser notifications when the target is reached.");
    setForm((current) => ({ ...current, target: "" }));
  };

  return (
    <div className="min-h-screen bg-bg pb-24 pt-[7.5rem] dark:bg-bg-dark lg:pt-[10.5rem]">
      <section className="border-b border-border bg-white px-6 py-12 text-center dark:bg-neutral-900">
        <span className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
          <Sparkles size={10} className="text-gold" /> Real-time metal pricing
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-text md:text-5xl">Live Gold, Silver & Metal Rates</h1>
        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-text-muted">
          Live spot-price tracer for gold, silver, platinum, and diamond benchmark estimates. Data refreshes every minute from the market endpoint.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1300px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="overflow-hidden rounded-xl border border-border/80 bg-white shadow-sm dark:bg-neutral-900">
            <div className="flex flex-col gap-2 border-b border-border/60 bg-neutral-50 p-4 dark:bg-neutral-900/60 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-text">
                <TrendingUp size={13} className="animate-pulse text-emerald-500" /> Live rates today
              </h3>
              <span className="text-[10px] font-medium uppercase text-text-muted">
                Updated {updatedAt ? new Date(updatedAt).toLocaleString() : "live"} · {source || "market source"}
              </span>
            </div>
            <div className="divide-y divide-border/60">
              {metalOptions.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveMetal(item.key)}
                  className={`flex w-full items-center justify-between gap-4 p-5 text-left transition-colors ${activeMetal === item.key ? "bg-gold/5" : "hover:bg-bg-card/50"}`}
                >
                  <span>
                    <span className="block text-sm font-bold uppercase tracking-wider text-text">{item.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-normal text-text-muted">{item.desc}</span>
                  </span>
                  <span className="shrink-0 text-right font-mono">
                    <span className="block text-xs text-text-muted">Per {item.unit}</span>
                    <span className="text-lg font-bold text-gold">₹{formatRate(rates[item.key])}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5 rounded-lg border border-accent/15 bg-accent/5 p-4 text-xs leading-relaxed text-text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-accent" />
            <p>Live rates are indicative spot-market benchmarks. Final showroom billing can include local duties, wastage, making charges, and GST.</p>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <RealtimeChart history={history} activeMetal={activeMetal} />

          <div className="rounded-xl border border-border/80 bg-white p-5 shadow-sm dark:bg-neutral-900">
            <div className="mb-4 flex items-center gap-2 border-b border-border/60 pb-3">
              <Bell className="h-4 w-4 text-gold" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-text">Set Price Alert</h3>
            </div>
            <form onSubmit={submitAlert} className="space-y-3">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className="w-full rounded border border-border bg-transparent px-3 py-2 text-xs text-text outline-none focus:border-accent" />
              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Mobile Number (WhatsApp)" className="w-full rounded border border-border bg-transparent px-3 py-2 text-xs text-text outline-none focus:border-accent" />
              <div className="grid gap-2 sm:grid-cols-3">
                <select value={form.metal} onChange={(e) => setForm({ ...form, metal: e.target.value as keyof Rates })} className="rounded border border-border bg-bg px-3 py-2 text-xs text-text outline-none focus:border-accent sm:col-span-1">
                  {metalOptions.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
                <select value={form.direction} onChange={(e) => setForm({ ...form, direction: e.target.value as "below" | "above" })} className="rounded border border-border bg-bg px-3 py-2 text-xs text-text outline-none focus:border-accent">
                  <option value="below">Falls below</option>
                  <option value="above">Rises above</option>
                </select>
                <input required type="number" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} placeholder="Target Rate" className="rounded border border-border bg-transparent px-3 py-2 text-xs text-text outline-none focus:border-accent" />
              </div>
              <button className="w-full rounded bg-gradient-to-r from-[#a8874c] via-[#c9a96e] to-[#e8d5a8] py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-950 shadow transition-transform hover:-translate-y-0.5">Set Alert</button>
            </form>
            {status && <p className="mt-3 text-xs text-text-muted">{status}</p>}
            {alerts.length > 0 && (
              <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
                {alerts.slice(0, 4).map((alert) => (
                  <div key={alert.id} className="rounded-lg bg-bg-card/50 p-3 text-[11px] text-text-muted">
                    {metalOptions.find((item) => item.key === alert.metal)?.label} {alert.direction} ₹{formatRate(alert.target)}
                    {alert.triggeredAt && <span className="ml-2 font-semibold text-emerald-600">Triggered at ₹{formatRate(alert.triggeredRate || 0)}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
