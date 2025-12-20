import Link from "next/link";
import type { Tool } from "@/lib/tools";
import type { ToolMetrics } from "@/lib/metrics";
import { TierBadge } from "@/components/ui/TierBadge";
import { VectorTags } from "@/components/ui/VectorTag";
import { FeatureScore } from "@/components/ui/FeatureScore";
import { PriceRange } from "@/components/ui/PriceDisplay";
import { ProgressBadge } from "@/components/ProgressBadge";
import { ToolLogo } from "@/components/ui/ToolLogo";
import { ExternalLinkIcon, ChevronRightIcon } from "@/components/Icons";

type Props = {
  tool: Tool;
  metrics?: ToolMetrics | null;
};

export function ToolCard({ tool, metrics }: Props) {
  return (
    <div className="toolCard">
      <div className="toolCard__header">
        <div style={{ display: "flex", gap: 12 }}>
          <ToolLogo website={tool.website} name={tool.name} size={40} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h3 className="toolCard__title">{tool.name}</h3>
              <TierBadge tier={tool.tier} size="sm" />
            </div>
            <div className="toolCard__meta">
              <VectorTags vectors={tool.vectors} />
            </div>
          </div>
        </div>
        <ProgressBadge slug={tool.slug} />
      </div>

      {metrics && (
        <div className="toolCard__stats">
          <div className="toolCard__stat">
            <span className="toolCard__statLabel">Features</span>
            <span className="toolCard__statValue">
              <FeatureScore
                count={metrics.featureCount}
                total={metrics.totalFeatures}
                size="sm"
              />
            </span>
          </div>
          <div className="toolCard__stat">
            <span className="toolCard__statLabel">Precio</span>
            <span className="toolCard__statValue">
              <PriceRange min={metrics.priceMin} max={metrics.priceMax} />
            </span>
          </div>
        </div>
      )}

      <div className="toolCard__actions">
        <Link className="btn" href={`/tool/${tool.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          Ver informe
          <ChevronRightIcon size={14} />
        </Link>
        <Link className="btn" href={`/compare?add=${tool.slug}`}>
          Comparar
        </Link>
        {tool.website && (
          <a
            className="btn"
            href={tool.website}
            target="_blank"
            rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            Web
            <ExternalLinkIcon size={12} />
          </a>
        )}
      </div>
    </div>
  );
}
