import { readText } from "@/lib/fs";
import { parseCsv } from "@/lib/csv";
import { CompareClient } from "@/components/CompareClient";
import { loadAllMetrics } from "@/lib/metrics";

export default async function ComparePage() {
  const featuresRaw = await readText("content/features_matrix.csv");
  const pricingRaw = await readText("content/pricing_comparison.csv");
  const features = parseCsv(featuresRaw);
  const pricing = parseCsv(pricingRaw);

  // Cargar métricas para gráficos
  const metrics = await loadAllMetrics();
  const metricsData: Record<string, { priceMin: number; priceMax: number; featureCount: number; totalFeatures: number }> = {};

  metrics.forEach((value, key) => {
    metricsData[key] = {
      priceMin: value.priceMin,
      priceMax: value.priceMax,
      featureCount: value.featureCount,
      totalFeatures: value.totalFeatures,
    };
  });

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <h1 className="h1">Comparador de Herramientas</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Selecciona herramientas para comparar sus features y precios lado a lado.
          Usa el filtro para buscar columnas específicas.
        </p>
      </div>
      <CompareClient features={features} pricing={pricing} metricsData={metricsData} />
    </div>
  );
}
