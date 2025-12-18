import type { ToolTier } from "@/lib/tools";
import { TrophyIcon, StarIcon } from "@/components/Icons";

type Props = {
  tier: ToolTier;
  count: number;
};

function getTierInfo(tier: ToolTier) {
  switch (tier) {
    case "Tier 1":
      return {
        label: "Líderes del mercado",
        icon: <TrophyIcon size={18} />,
        color: "var(--tier1)",
      };
    case "Tier 2":
      return {
        label: "Competidores secundarios",
        icon: <StarIcon size={18} />,
        color: "var(--tier2)",
      };
    case "Tier 3":
      return {
        label: "Nichos técnicos",
        icon: null,
        color: "var(--tier3)",
      };
    default:
      return {
        label: "",
        icon: null,
        color: "var(--muted)",
      };
  }
}

export function TierHeader({ tier, count }: Props) {
  const { label, icon, color } = getTierInfo(tier);

  return (
    <div className="tierSection__header">
      <h2 className="tierSection__title" style={{ color }}>
        {icon}
        <span>{tier}</span>
        <span style={{ fontWeight: 400, color: "var(--muted)" }}>—</span>
        <span style={{ fontWeight: 400 }}>{label}</span>
      </h2>
      <span className="tierSection__count">
        {count} herramienta{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
