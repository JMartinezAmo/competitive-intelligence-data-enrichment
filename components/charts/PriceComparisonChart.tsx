"use client";

import { useMemo } from "react";
import { TOOLS } from "@/lib/tools";

type PriceData = {
  name: string;
  tier: string;
  minPrice: number;
  maxPrice: number;
  color: string;
};

type Props = {
  selectedSlugs: string[];
  pricingData: Map<string, { min: number; max: number }>;
  showMax?: boolean;
};

function getTierColor(tier: string): string {
  if (tier === "Tier 1") return "var(--tier1)";
  if (tier === "Tier 2") return "var(--tier2)";
  return "var(--tier3)";
}

function formatPrice(price: number): string {
  if (price === 0) return "Free";
  if (price < 0) return "Custom";
  return `$${price.toLocaleString()}`;
}

export function PriceComparisonChart({ selectedSlugs, pricingData, showMax = true }: Props) {
  const chartData = useMemo(() => {
    const data: PriceData[] = [];

    for (const slug of selectedSlugs) {
      const tool = TOOLS.find(t => t.slug === slug);
      if (!tool) continue;

      const pricing = pricingData.get(tool.name.toLowerCase());
      if (!pricing) continue;

      data.push({
        name: tool.name,
        tier: tool.tier,
        minPrice: pricing.min,
        maxPrice: pricing.max,
        color: getTierColor(tool.tier),
      });
    }

    // Ordenar por precio máximo descendente
    return data.sort((a, b) => b.maxPrice - a.maxPrice);
  }, [selectedSlugs, pricingData]);

  const maxValue = useMemo(() => {
    const prices = chartData.map(d => showMax ? d.maxPrice : d.minPrice);
    return Math.max(...prices, 100);
  }, [chartData, showMax]);

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="priceChart">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Comparación de Precios</div>
        <div className="muted" style={{ fontSize: 11 }}>
          Mostrando precio {showMax ? "máximo" : "mínimo"} por herramienta
        </div>
      </div>

      {chartData.map((item) => {
        const price = showMax ? item.maxPrice : item.minPrice;
        const percent = maxValue > 0 ? (price / maxValue) * 100 : 0;

        return (
          <div key={item.name} className="priceChart__row">
            <div className="priceChart__label" style={{ color: item.color }}>
              {item.name}
            </div>
            <div className="priceChart__bar">
              <div
                className="priceChart__fill"
                style={{
                  width: `${Math.max(percent, 2)}%`,
                  background: `linear-gradient(90deg, ${item.color}dd, ${item.color})`,
                }}
              >
                {percent > 30 && (
                  <span style={{ color: "var(--bg)", paddingRight: 8 }}>
                    {formatPrice(price)}
                  </span>
                )}
              </div>
            </div>
            <div className="priceChart__value">
              {percent <= 30 && formatPrice(price)}
              {item.minPrice !== item.maxPrice && (
                <span style={{ color: "var(--muted)", fontSize: 10 }}>/mo</span>
              )}
            </div>
          </div>
        );
      })}

      {/* Leyenda */}
      <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "var(--tier1)" }} />
          <span className="muted" style={{ fontSize: 11 }}>Tier 1</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "var(--tier2)" }} />
          <span className="muted" style={{ fontSize: 11 }}>Tier 2</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 12, height: 12, borderRadius: 2, background: "var(--tier3)" }} />
          <span className="muted" style={{ fontSize: 11 }}>Tier 3</span>
        </div>
      </div>
    </div>
  );
}
