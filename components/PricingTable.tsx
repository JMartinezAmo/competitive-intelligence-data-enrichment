import { CheckIcon } from "@/components/Icons";

type PricingTier = {
  tier: string;
  price: string;
  credits: string;
  users: string;
  features: string;
};

type Props = {
  tiers: PricingTier[];
  highlightTier?: string;
};

function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const str = priceStr.toLowerCase();
  if (str.includes("free") || str === "$0" || str === "0") return 0;
  if (str.includes("custom") || str.includes("contact")) return -1;

  const match = priceStr.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ""), 10);
  }
  return 0;
}

export function PricingTable({ tiers, highlightTier }: Props) {
  if (tiers.length === 0) {
    return (
      <div className="muted" style={{ fontSize: 13, padding: 16 }}>
        No hay datos de pricing disponibles.
      </div>
    );
  }

  // Detectar tier recomendado (Pro o el del medio)
  const recommendedTier = highlightTier ||
    tiers.find(t => t.tier.toLowerCase().includes("pro"))?.tier ||
    tiers.find(t => t.tier.toLowerCase().includes("growth"))?.tier ||
    tiers[Math.floor(tiers.length / 2)]?.tier;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {tiers.map((tier, idx) => {
        const isRecommended = tier.tier === recommendedTier;
        const price = parsePrice(tier.price);
        const isFree = price === 0;
        const isCustom = price < 0;

        return (
          <div
            key={idx}
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              border: isRecommended ? "2px solid var(--info)" : "1px solid var(--line)",
              background: isRecommended ? "rgba(96, 165, 250, 0.1)" : "var(--panel)",
              position: "relative",
            }}
          >
            {isRecommended && (
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: 10,
                  background: "var(--info)",
                  color: "var(--bg)",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 4,
                  textTransform: "uppercase",
                }}
              >
                Popular
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{tier.tier}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{tier.credits}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize: isFree ? 16 : 18,
                  fontWeight: 700,
                  color: isFree ? "var(--ok)" : isCustom ? "var(--muted)" : "var(--text)"
                }}>
                  {isFree ? "Gratis" : isCustom ? "Custom" : tier.price}
                </div>
              </div>
            </div>

            {tier.features && (
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                {tier.features}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Helper para parsear pricing rows del CSV
export function parsePricingRows(rows: string[][], headers: string[], toolName: string): PricingTier[] {
  const toolIdx = headers.findIndex(h => h.toLowerCase() === "tool");
  const tierIdx = headers.findIndex(h => h.toLowerCase() === "tier");
  const priceIdx = headers.findIndex(h => h.toLowerCase() === "price");
  const creditsIdx = headers.findIndex(h => h.toLowerCase().includes("credit"));
  const usersIdx = headers.findIndex(h => h.toLowerCase().includes("user"));
  const featuresIdx = headers.findIndex(h => h.toLowerCase().includes("feature"));

  return rows
    .filter(row => row[toolIdx]?.toLowerCase() === toolName.toLowerCase())
    .map(row => ({
      tier: row[tierIdx] || "",
      price: row[priceIdx] || "",
      credits: row[creditsIdx] || "",
      users: row[usersIdx] || "",
      features: row[featuresIdx] || "",
    }));
}
