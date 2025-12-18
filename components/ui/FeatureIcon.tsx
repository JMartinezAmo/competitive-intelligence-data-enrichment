import { CheckIcon, XIcon, AlertIcon, HelpIcon } from "@/components/Icons";

type Props = {
  value: string | undefined | null;
  showLabel?: boolean;
};

type FeatureStatus = "yes" | "no" | "partial" | "unknown";

function normalizeValue(value: string | undefined | null): FeatureStatus {
  const v = (value || "").trim().toLowerCase();

  if (v === "yes" || v === "true" || v === "1") return "yes";
  if (v === "no" || v === "false" || v === "0") return "no";
  if (v === "partial" || v === "limited" || v.includes("partial") || v.includes("limited")) return "partial";

  return "unknown";
}

export function FeatureIcon({ value, showLabel = false }: Props) {
  const status = normalizeValue(value);

  const config = {
    yes: { icon: <CheckIcon size={14} />, label: "Sí", className: "featureIcon featureIcon--yes" },
    no: { icon: <XIcon size={14} />, label: "No", className: "featureIcon featureIcon--no" },
    partial: { icon: <AlertIcon size={14} />, label: "Parcial", className: "featureIcon featureIcon--partial" },
    unknown: { icon: <HelpIcon size={14} />, label: "?", className: "featureIcon featureIcon--unknown" },
  };

  const { icon, label, className } = config[status];

  if (showLabel) {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span className={className}>{icon}</span>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{label}</span>
      </span>
    );
  }

  return <span className={className} title={label}>{icon}</span>;
}

// Para usar en tablas, más compacto
export function FeatureCell({ value }: { value: string | undefined | null }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <FeatureIcon value={value} />
    </div>
  );
}
