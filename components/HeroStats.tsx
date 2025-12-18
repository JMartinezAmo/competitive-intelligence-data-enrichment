import type { Tool } from "@/lib/tools";
import { DollarIcon, BarChartIcon, GlobeIcon, ZapIcon } from "@/components/Icons";

type Props = {
  tool: Tool;
  featureCount: number;
  totalFeatures: number;
  priceRange: { min: number; max: number };
  hasApi: boolean;
};

function formatPrice(price: number): string {
  if (price === 0) return "Free";
  if (price < 0) return "Custom";
  return `$${price.toLocaleString()}`;
}

export function HeroStats({ tool, featureCount, totalFeatures, priceRange, hasApi }: Props) {
  const stats = [
    {
      icon: <DollarIcon size={24} />,
      value: priceRange.min === priceRange.max
        ? formatPrice(priceRange.min)
        : `${formatPrice(priceRange.min)} - ${formatPrice(priceRange.max)}`,
      label: "Rango de Precio",
      color: "var(--ok)",
    },
    {
      icon: <BarChartIcon size={24} />,
      value: `${featureCount}/${totalFeatures}`,
      label: "Features",
      color: "var(--info)",
    },
    {
      icon: <GlobeIcon size={24} />,
      value: hasApi ? "Pública" : "Limitada",
      label: "API",
      color: hasApi ? "var(--ok)" : "var(--warn)",
    },
    {
      icon: <ZapIcon size={24} />,
      value: tool.tier.replace("Tier ", ""),
      label: "Tier",
      color: tool.tier === "Tier 1" ? "var(--tier1)" : tool.tier === "Tier 2" ? "var(--tier2)" : "var(--tier3)",
    },
  ];

  return (
    <div className="statsGrid">
      {stats.map((stat, idx) => (
        <div key={idx} className="statCard">
          <div className="statCard__icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="statCard__value">{stat.value}</div>
          <div className="statCard__label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
