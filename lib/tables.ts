import { readText } from "@/lib/fs";
import { parseCsv } from "@/lib/csv";

function normalize(s: string) {
  return (s || "").trim().toLowerCase();
}

function findToolCol(headers: string[]) {
  const idx = headers.findIndex(h => normalize(h) === "tool" || normalize(h) === "name");
  return idx >= 0 ? idx : 0;
}

export async function readFeatureRow(toolName: string): Promise<string | null> {
  try {
    const raw = await readText("content/features_matrix.csv");
    const { headers, rows } = parseCsv(raw);
    const toolCol = findToolCol(headers);
    const row = rows.find(r => normalize(r[toolCol]) === normalize(toolName));
    if (!row) return null;
    const pairs = headers.map((h, i) => `${h}: ${row[i] ?? ""}`);
    return pairs.join("\n");
  } catch {
    return null;
  }
}

export async function readPricingRow(toolName: string): Promise<string | null> {
  try {
    const raw = await readText("content/pricing_comparison.csv");
    const { headers, rows } = parseCsv(raw);
    const toolCol = findToolCol(headers);
    const row = rows.find(r => normalize(r[toolCol]) === normalize(toolName));
    if (!row) return null;
    const pairs = headers.map((h, i) => `${h}: ${row[i] ?? ""}`);
    return pairs.join("\n");
  } catch {
    return null;
  }
}
