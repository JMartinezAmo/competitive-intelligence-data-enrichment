import { parseCsv } from "./csv";
import { readText } from "./fs";

export type ToolMetrics = {
  featureCount: number;
  totalFeatures: number;
  priceMin: number;
  priceMax: number;
  priceTier: string;
};

// Cuenta features "Yes" para una herramienta
export function countFeatures(featureRow: string[], headers: string[]): { count: number; total: number } {
  let count = 0;
  let total = 0;

  // Skip first column (tool name)
  for (let i = 1; i < featureRow.length; i++) {
    const value = (featureRow[i] || "").trim().toLowerCase();
    total++;
    if (value === "yes" || value === "true") {
      count++;
    }
  }

  return { count, total };
}

// Extrae precio de string
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const str = priceStr.toLowerCase();
  if (str.includes("free") || str === "$0" || str === "0") return 0;
  if (str.includes("custom") || str.includes("contact")) return -1;

  const match = priceStr.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ""), 10);
  }
  return 0;
}

// Obtiene rango de precios para una herramienta del pricing CSV
export function getPriceRange(toolName: string, pricingRows: string[][], headers: string[]): { min: number; max: number; tier: string } {
  const toolColIdx = headers.findIndex(h => h.toLowerCase() === "tool");
  const priceColIdx = headers.findIndex(h => h.toLowerCase() === "price");
  const tierColIdx = headers.findIndex(h => h.toLowerCase() === "tier");

  const toolRows = pricingRows.filter(row =>
    row[toolColIdx]?.toLowerCase() === toolName.toLowerCase()
  );

  if (toolRows.length === 0) {
    return { min: 0, max: 0, tier: "Unknown" };
  }

  const prices = toolRows
    .map(row => parsePrice(row[priceColIdx] || ""))
    .filter(p => p >= 0);

  const tiers = toolRows.map(row => row[tierColIdx] || "").filter(Boolean);
  const proTier = tiers.find(t => t.toLowerCase().includes("pro")) ||
                  tiers.find(t => t.toLowerCase().includes("growth")) ||
                  tiers[Math.floor(tiers.length / 2)] ||
                  tiers[0] || "Standard";

  if (prices.length === 0) {
    return { min: 0, max: 0, tier: proTier };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    tier: proTier,
  };
}

// Carga métricas para todas las herramientas
export async function loadAllMetrics(): Promise<Map<string, ToolMetrics>> {
  const metrics = new Map<string, ToolMetrics>();

  try {
    const featuresText = await readText("content/features_matrix.csv");
    const pricingText = await readText("content/pricing_comparison.csv");

    const features = parseCsv(featuresText);
    const pricing = parseCsv(pricingText);

    const toolColIdx = features.headers.findIndex(h =>
      h.toLowerCase() === "tool" || h.toLowerCase() === "feature"
    );

    // Para cada fila de features (cada herramienta)
    for (const row of features.rows) {
      const toolName = row[0]; // Primera columna es el nombre de la feature, no tool
      // En este CSV las herramientas son columnas, no filas
    }

    // El CSV de features tiene las herramientas como columnas
    // headers = ["Feature", "Clay", "Persana AI", ...]
    for (let colIdx = 1; colIdx < features.headers.length; colIdx++) {
      const toolName = features.headers[colIdx];
      let yesCount = 0;
      let total = 0;

      for (const row of features.rows) {
        const value = (row[colIdx] || "").trim().toLowerCase();
        total++;
        if (value === "yes" || value === "true") {
          yesCount++;
        }
      }

      const priceRange = getPriceRange(toolName, pricing.rows, pricing.headers);

      metrics.set(toolName.toLowerCase(), {
        featureCount: yesCount,
        totalFeatures: total,
        priceMin: priceRange.min,
        priceMax: priceRange.max,
        priceTier: priceRange.tier,
      });
    }
  } catch (e) {
    console.error("Error loading metrics:", e);
  }

  return metrics;
}

// Obtiene métricas para una herramienta específica
export async function getToolMetrics(toolName: string): Promise<ToolMetrics | null> {
  const allMetrics = await loadAllMetrics();
  return allMetrics.get(toolName.toLowerCase()) || null;
}
