import { readText } from "@/lib/fs";
import { parseCsv } from "@/lib/csv";

function normalize(s: string) {
  return (s || "").trim().toLowerCase();
}

function findToolCol(headers: string[]) {
  const idx = headers.findIndex(h => normalize(h) === "tool" || normalize(h) === "name");
  return idx >= 0 ? idx : 0;
}

// Tipo para features estructuradas
export type FeatureData = Record<string, string>;

// Tipo para pricing estructurado
export type PricingTier = {
  tier: string;
  price: string;
  credits: string;
  users: string;
  features: string;
};

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

// Obtiene features como objeto estructurado para una herramienta
export async function getFeatureData(toolName: string): Promise<FeatureData> {
  try {
    const raw = await readText("content/features_matrix.csv");
    const { headers, rows } = parseCsv(raw);

    // En este CSV, las herramientas son columnas y las features son filas
    // headers = ["Feature", "Clay", "Persana AI", ...]
    const toolColIdx = headers.findIndex(h => normalize(h) === normalize(toolName));

    if (toolColIdx < 0) return {};

    const features: FeatureData = {};
    for (const row of rows) {
      const featureName = row[0]; // Primera columna es el nombre de la feature
      const value = row[toolColIdx] || "Unknown";
      if (featureName) {
        features[featureName] = value;
      }
    }

    return features;
  } catch {
    return {};
  }
}

// Obtiene pricing como array de tiers para una herramienta
export async function getPricingTiers(toolName: string): Promise<PricingTier[]> {
  try {
    const raw = await readText("content/pricing_comparison.csv");
    const { headers, rows } = parseCsv(raw);

    const toolIdx = headers.findIndex(h => normalize(h) === "tool");
    const tierIdx = headers.findIndex(h => normalize(h) === "tier");
    const priceIdx = headers.findIndex(h => normalize(h) === "price");
    const creditsIdx = headers.findIndex(h => normalize(h).includes("credit"));
    const usersIdx = headers.findIndex(h => normalize(h).includes("user"));
    const featuresIdx = headers.findIndex(h => normalize(h).includes("feature") && !normalize(h).includes("key"));

    const toolRows = rows.filter(row =>
      normalize(row[toolIdx] || "") === normalize(toolName)
    );

    return toolRows.map(row => ({
      tier: row[tierIdx] || "",
      price: row[priceIdx] || "",
      credits: row[creditsIdx] || "",
      users: row[usersIdx] || "",
      features: row[featuresIdx] || "",
    }));
  } catch {
    return [];
  }
}

// Obtiene estadísticas resumidas para una herramienta
export async function getToolStats(toolName: string) {
  const features = await getFeatureData(toolName);
  const pricingTiers = await getPricingTiers(toolName);

  // Contar features
  let featureCount = 0;
  let totalFeatures = 0;
  for (const value of Object.values(features)) {
    totalFeatures++;
    const v = normalize(value);
    if (v === "yes" || v === "true") featureCount++;
  }

  // Calcular rango de precios
  const prices = pricingTiers
    .map(t => {
      const match = t.price.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, ""), 10) : -1;
    })
    .filter(p => p >= 0);

  const priceMin = prices.length > 0 ? Math.min(...prices) : 0;
  const priceMax = prices.length > 0 ? Math.max(...prices) : 0;

  // Verificar si tiene API pública
  const hasApi = normalize(features["Public API"] || "") === "yes";

  return {
    featureCount,
    totalFeatures,
    priceMin,
    priceMax,
    hasApi,
    features,
    pricingTiers,
  };
}
