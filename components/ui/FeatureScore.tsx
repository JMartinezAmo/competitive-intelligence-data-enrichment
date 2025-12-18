type Props = {
  count: number;
  total: number;
  showBar?: boolean;
  size?: "sm" | "md";
};

export function FeatureScore({ count, total, showBar = true, size = "md" }: Props) {
  const percent = total > 0 ? Math.round((count / total) * 100) : 0;

  const barHeight = size === "sm" ? 4 : 6;
  const fontSize = size === "sm" ? 11 : 12;

  return (
    <div className="featureScore">
      {showBar && (
        <div className="featureScore__bar" style={{ height: barHeight }}>
          <div
            className="featureScore__fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
      <span className="featureScore__text" style={{ fontSize }}>
        {count}/{total}
      </span>
    </div>
  );
}

// Versión compacta sin barra
export function FeatureScoreCompact({ count, total }: { count: number; total: number }) {
  return (
    <span style={{ fontSize: 12, color: "var(--muted)" }}>
      <strong style={{ color: "var(--ok)" }}>{count}</strong>/{total}
    </span>
  );
}
