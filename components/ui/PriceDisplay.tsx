import { DollarIcon } from "@/components/Icons";

type Props = {
  price: number | string;
  period?: string;
  showBar?: boolean;
  maxPrice?: number;
};

function parsePrice(price: number | string): number {
  if (typeof price === "number") return price;

  // Extraer número del string (ej: "$720/mo" -> 720)
  const match = price.match(/[\d,]+/);
  if (match) {
    return parseInt(match[0].replace(/,/g, ""), 10);
  }
  return 0;
}

function formatPrice(price: number | string): string {
  if (typeof price === "string") {
    if (price.toLowerCase().includes("custom") || price.toLowerCase().includes("contact")) {
      return "Custom";
    }
    if (price.includes("$")) return price;
    return `$${price}`;
  }

  if (price === 0) return "Free";
  return `$${price.toLocaleString()}`;
}

export function PriceDisplay({ price, period = "/mo", showBar = false, maxPrice = 1000 }: Props) {
  const numericPrice = parsePrice(price);
  const formatted = formatPrice(price);
  const percent = maxPrice > 0 ? Math.min((numericPrice / maxPrice) * 100, 100) : 0;

  if (showBar) {
    return (
      <div className="priceBar">
        <DollarIcon size={14} style={{ color: "var(--muted)" }} />
        <div className="priceBar__track">
          <div className="priceBar__fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="priceBar__label">
          {formatted}{numericPrice > 0 && period}
        </span>
      </div>
    );
  }

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
      <DollarIcon size={14} style={{ color: "var(--ok)" }} />
      <strong>{formatted}</strong>
      {numericPrice > 0 && <span style={{ color: "var(--muted)", fontSize: 12 }}>{period}</span>}
    </span>
  );
}

// Para mostrar rango de precios
export function PriceRange({ min, max }: { min: number | string; max: number | string }) {
  const minFormatted = formatPrice(min);
  const maxFormatted = formatPrice(max);

  if (minFormatted === maxFormatted) {
    return <span>{minFormatted}</span>;
  }

  return (
    <span style={{ fontSize: 13 }}>
      {minFormatted} <span style={{ color: "var(--muted)" }}>→</span> {maxFormatted}
    </span>
  );
}
