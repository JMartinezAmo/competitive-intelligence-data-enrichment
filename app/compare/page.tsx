import { readText } from "@/lib/fs";
import { parseCsv } from "@/lib/csv";
import { CompareClient } from "@/components/CompareClient";

export default async function ComparePage() {
  const featuresRaw = await readText("content/features_matrix.csv");
  const pricingRaw = await readText("content/pricing_comparison.csv");
  const features = parseCsv(featuresRaw);
  const pricing = parseCsv(pricingRaw);

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:"span 12"}}>
        <h1 className="h1">Comparar</h1>
        <div className="muted">Selector de herramientas + tabla filtrable de columnas.</div>
      </div>
      <div className="card" style={{gridColumn:"span 12"}}>
        <CompareClient features={features} pricing={pricing} />
      </div>
    </div>
  );
}
