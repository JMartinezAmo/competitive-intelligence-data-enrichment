"use client";

import { useMemo } from "react";
import { TOOLS } from "@/lib/tools";

type FeatureData = {
  name: string;
  tier: string;
  count: number;
  total: number;
  percent: number;
  color: string;
};

type Props = {
  selectedSlugs: string[];
  featureCounts: Map<string, { yes: number; total: number }>;
};

function getTierColor(tier: string): string {
  if (tier === "Tier 1") return "var(--tier1)";
  if (tier === "Tier 2") return "var(--tier2)";
  return "var(--tier3)";
}

export function FeatureComparisonChart({ selectedSlugs, featureCounts }: Props) {
  const chartData = useMemo(() => {
    const data: FeatureData[] = [];

    for (const slug of selectedSlugs) {
      const tool = TOOLS.find(t => t.slug === slug);
      if (!tool) continue;

      const counts = featureCounts.get(tool.name.toLowerCase());
      if (!counts) continue;

      const percent = counts.total > 0 ? (counts.yes / counts.total) * 100 : 0;

      data.push({
        name: tool.name,
        tier: tool.tier,
        count: counts.yes,
        total: counts.total,
        percent,
        color: getTierColor(tool.tier),
      });
    }

    // Ordenar por porcentaje descendente
    return data.sort((a, b) => b.percent - a.percent);
  }, [selectedSlugs, featureCounts]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="priceChart">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Comparación de Features</div>
        <div className="muted" style={{ fontSize: 11 }}>
          Porcentaje de features soportadas
        </div>
      </div>

      {chartData.map((item) => (
        <div key={item.name} className="priceChart__row">
          <div className="priceChart__label" style={{ color: item.color }}>
            {item.name}
          </div>
          <div className="priceChart__bar">
            <div
              className="priceChart__fill"
              style={{
                width: `${Math.max(item.percent, 2)}%`,
                background: `linear-gradient(90deg, var(--ok)aa, var(--ok))`,
              }}
            >
              {item.percent > 40 && (
                <span style={{ color: "var(--bg)", paddingRight: 8 }}>
                  {item.count}/{item.total}
                </span>
              )}
            </div>
          </div>
          <div className="priceChart__value">
            {item.percent <= 40 && `${item.count}/${item.total}`}
            <span style={{ color: "var(--muted)", fontSize: 10, marginLeft: 4 }}>
              ({Math.round(item.percent)}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
