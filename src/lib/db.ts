import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export type InquiryRecord = {
  id: string;
  type: "inquiry" | "appointment" | "newsletter";
  name: string;
  phone: string;
  email?: string;
  productSlug?: string;
  productName?: string;
  message?: string;
  createdAt: string;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function saveInquiry(
  input: Omit<InquiryRecord, "id" | "createdAt">
): Promise<InquiryRecord> {
  const records = await readJson<InquiryRecord[]>("inquiries.json", []);
  const record: InquiryRecord = {
    ...input,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  records.unshift(record);
  await writeJson("inquiries.json", records);
  return record;
}

export async function getInquiries(): Promise<InquiryRecord[]> {
  return readJson<InquiryRecord[]>("inquiries.json", []);
}
