import { StarIcon, TrophyIcon } from "@/components/Icons";
import type { ToolTier } from "@/lib/tools";

type Props = {
  tier: ToolTier;
  size?: "sm" | "md";
  showIcon?: boolean;
};

function getTierNumber(tier: ToolTier): number {
  return parseInt(tier.replace("Tier ", ""), 10);
}

function getTierLabel(tier: ToolTier): string {
  const n = getTierNumber(tier);
  switch (n) {
    case 1: return "Líderes";
    case 2: return "Secundarios";
    case 3: return "Nicho";
    default: return tier;
  }
}

export function TierBadge({ tier, size = "md", showIcon = true }: Props) {
  const n = getTierNumber(tier);
  const className = `tierBadge tierBadge--${n}`;

  const style = size === "sm" ? { padding: "2px 6px", fontSize: 10 } : undefined;

  return (
    <span className={className} style={style}>
      {showIcon && n === 1 && <TrophyIcon size={size === "sm" ? 10 : 12} />}
      {showIcon && n === 2 && <StarIcon size={size === "sm" ? 10 : 12} />}
      {tier}
    </span>
  );
}

export function TierBadgeWithLabel({ tier }: { tier: ToolTier }) {
  const n = getTierNumber(tier);
  const label = getTierLabel(tier);

  return (
    <span className={`tierBadge tierBadge--${n}`}>
      {n === 1 && <TrophyIcon size={12} />}
      {tier} - {label}
    </span>
  );
}
