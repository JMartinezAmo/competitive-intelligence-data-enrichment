import { FeatureIcon } from "@/components/ui/FeatureIcon";

type Props = {
  features: Record<string, string>;
};

function normalizeValue(value: string): "yes" | "no" | "partial" | "unknown" {
  const v = (value || "").trim().toLowerCase();
  if (v === "yes" || v === "true") return "yes";
  if (v === "no" || v === "false") return "no";
  if (v.includes("partial") || v.includes("limited")) return "partial";
  return "unknown";
}

export function FeatureChecklist({ features }: Props) {
  const entries = Object.entries(features);

  if (entries.length === 0) {
    return (
      <div className="muted" style={{ fontSize: 13, padding: 16 }}>
        No hay datos de features disponibles.
      </div>
    );
  }

  // Ordenar: primero Yes, luego Partial, luego Unknown, luego No
  const sortOrder = { yes: 0, partial: 1, unknown: 2, no: 3 };
  const sorted = entries.sort((a, b) => {
    const statusA = normalizeValue(a[1]);
    const statusB = normalizeValue(b[1]);
    return sortOrder[statusA] - sortOrder[statusB];
  });

  return (
    <div className="featureChecklist">
      {sorted.map(([feature, value]) => {
        const status = normalizeValue(value);
        return (
          <div key={feature} className={`featureChecklist__item featureChecklist__item--${status}`}>
            <FeatureIcon value={value} />
            <span style={{ flex: 1 }}>{feature}</span>
          </div>
        );
      })}
    </div>
  );
}
