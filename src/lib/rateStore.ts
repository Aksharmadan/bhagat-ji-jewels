import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type RateSnapshot = {
  timestamp: string;
  rates: {
    gold24K: number;
    gold22K: number;
    gold18K: number;
    silver: number;
    platinum: number;
    diamond: number;
  };
};

export type PriceAlert = {
  id: string;
  name: string;
  phone: string;
  metal: keyof RateSnapshot["rates"];
  target: number;
  direction: "below" | "above";
  createdAt: string;
  triggeredAt?: string;
  triggeredRate?: number;
};

const dataDir = path.join(process.cwd(), "data", "runtime");
const historyPath = path.join(dataDir, "rate-history.json");
const alertsPath = path.join(dataDir, "price-alerts.json");

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureDataDir();
  await writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function appendRateSnapshot(snapshot: RateSnapshot) {
  const history = await readJson<RateSnapshot[]>(historyPath, []);
  const previous = history.at(-1);

  if (previous && Math.abs(new Date(snapshot.timestamp).getTime() - new Date(previous.timestamp).getTime()) < 30_000) {
    history[history.length - 1] = snapshot;
  } else {
    history.push(snapshot);
  }

  const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
  await writeJson(
    historyPath,
    history.filter((item) => new Date(item.timestamp).getTime() >= cutoff).slice(-1500)
  );
}

export async function getRateHistory() {
  return readJson<RateSnapshot[]>(historyPath, []);
}

export async function getPriceAlerts() {
  return readJson<PriceAlert[]>(alertsPath, []);
}

export async function savePriceAlert(alert: Omit<PriceAlert, "id" | "createdAt">) {
  const alerts = await getPriceAlerts();
  const nextAlert: PriceAlert = {
    ...alert,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  alerts.push(nextAlert);
  await writeJson(alertsPath, alerts);
  return nextAlert;
}

export async function checkPriceAlerts(snapshot: RateSnapshot) {
  const alerts = await getPriceAlerts();
  let changed = false;

  const checked = alerts.map((alert) => {
    if (alert.triggeredAt) return alert;

    const currentRate = snapshot.rates[alert.metal];
    const reached =
      alert.direction === "below"
        ? currentRate <= alert.target
        : currentRate >= alert.target;

    if (!reached) return alert;
    changed = true;
    return {
      ...alert,
      triggeredAt: snapshot.timestamp,
      triggeredRate: currentRate,
    };
  });

  if (changed) {
    await writeJson(alertsPath, checked);
  }

  return checked.filter((alert) => alert.triggeredAt === snapshot.timestamp);
}
