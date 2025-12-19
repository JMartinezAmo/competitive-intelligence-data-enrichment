import Link from "next/link";
import { getTool, TOOLS } from "@/lib/tools";
import { readText } from "@/lib/fs";
import { mdToHtml, extractStrengths, extractWeaknesses } from "@/lib/markdown";
import { ComparePicker } from "@/components/ComparePicker";
import { ReviewPanel } from "@/components/ReviewPanel";
import { getToolStats } from "@/lib/tables";
import { HeroStats } from "@/components/HeroStats";
import { FeatureChecklist } from "@/components/FeatureChecklist";
import { PricingTable } from "@/components/PricingTable";
import { StrengthsWeaknesses } from "@/components/StrengthsWeaknesses";
import { TierBadge } from "@/components/ui/TierBadge";
import { VectorTags } from "@/components/ui/VectorTag";
import { ExternalLinkIcon } from "@/components/Icons";

export async function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.slug }));
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) {
    return (
      <div className="card" style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 className="h1">Herramienta no encontrada</h1>
        <p className="muted">No existe una herramienta con el slug "{params.slug}"</p>
        <Link href="/" className="btn" style={{ marginTop: 16 }}>
          Volver al Dashboard
        </Link>
      </div>
    );
  }

  const md = await readText(tool.reportPath);
  const html = await mdToHtml(md);
  const stats = await getToolStats(tool.name);

  // Extract strengths and weaknesses from markdown
  const strengths = extractStrengths(md);
  const weaknesses = extractWeaknesses(md);

  return (
    <div>
      {/* Hero Header */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <h1 className="h1" style={{ fontSize: 24 }}>{tool.name}</h1>
              <TierBadge tier={tool.tier} />
            </div>
            <VectorTags vectors={tool.vectors} />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <ComparePicker slug={tool.slug} />
            {tool.website && (
              <a
                className="btn"
                href={tool.website}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                Website
                <ExternalLinkIcon size={14} />
              </a>
            )}
            <Link className="btn" href="/compare">Ir a Comparar</Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ marginTop: 20 }}>
          <HeroStats
            tool={tool}
            featureCount={stats.featureCount}
            totalFeatures={stats.totalFeatures}
            priceRange={{ min: stats.priceMin, max: stats.priceMax }}
            hasApi={stats.hasApi}
          />
        </div>
      </div>

      {/* Strengths & Weaknesses - Prominent Section */}
      <div style={{ marginBottom: 20 }}>
        <StrengthsWeaknesses strengths={strengths} weaknesses={weaknesses} />
      </div>

      {/* Main Content Grid */}
      <div className="grid">
        {/* Informe Markdown */}
        <div className="card markdown" style={{ gridColumn: "span 8" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h2 className="h2" style={{ fontSize: 16 }}>Informe Detallado</h2>
              <div className="muted" style={{ fontSize: 12 }}>Análisis completo de la herramienta</div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        {/* Sidebar */}
        <div style={{ gridColumn: "span 4", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Features Checklist */}
          <div className="card">
            <h3 className="h2" style={{ fontSize: 14, marginBottom: 4 }}>Features</h3>
            <div className="muted" style={{ fontSize: 11, marginBottom: 12 }}>
              {stats.featureCount}/{stats.totalFeatures} características soportadas
            </div>
            <FeatureChecklist features={stats.features} />
          </div>

          {/* Pricing Table */}
          <div className="card">
            <h3 className="h2" style={{ fontSize: 14, marginBottom: 4 }}>Planes de Precio</h3>
            <div className="muted" style={{ fontSize: 11, marginBottom: 12 }}>
              {stats.pricingTiers.length} opciones disponibles
            </div>
            <PricingTable tiers={stats.pricingTiers} />
          </div>

          {/* Review Panel */}
          <div className="card">
            <h3 className="h2" style={{ fontSize: 14, marginBottom: 12 }}>Panel de Revisión</h3>
            <ReviewPanel slug={tool.slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
