import { TOOLS, ToolTier } from "@/lib/tools";
import { loadAllMetrics } from "@/lib/metrics";
import { ToolCard } from "@/components/ToolCard";
import { TierHeader } from "@/components/TierHeader";

// Agrupa herramientas por tier
function groupByTier(tools: typeof TOOLS) {
  const groups: Record<ToolTier, typeof TOOLS> = {
    "Tier 1": [],
    "Tier 2": [],
    "Tier 3": [],
  };

  for (const tool of tools) {
    groups[tool.tier].push(tool);
  }

  return groups;
}

export default async function Page() {
  const metrics = await loadAllMetrics();
  const toolsByTier = groupByTier(TOOLS);

  return (
    <div>
      {/* Header del Dashboard */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h1 className="h1">Dashboard de Inteligencia Competitiva</h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Análisis de {TOOLS.length} herramientas de enriquecimiento de datos.
          Navega por tier, compara features y precios, o ve directamente a los informes detallados.
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div className="statCard" style={{ padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🏆</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{toolsByTier["Tier 1"].length}</div>
              <div className="muted" style={{ fontSize: 11 }}>LÍDERES</div>
            </div>
          </div>
          <div className="statCard" style={{ padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>⭐</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{toolsByTier["Tier 2"].length}</div>
              <div className="muted" style={{ fontSize: 11 }}>SECUNDARIOS</div>
            </div>
          </div>
          <div className="statCard" style={{ padding: "12px 20px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24 }}>🔧</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{toolsByTier["Tier 3"].length}</div>
              <div className="muted" style={{ fontSize: 11 }}>NICHO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Secciones por Tier */}
      {(["Tier 1", "Tier 2", "Tier 3"] as ToolTier[]).map((tier) => {
        const tools = toolsByTier[tier];
        if (tools.length === 0) return null;

        return (
          <section key={tier} className="tierSection">
            <TierHeader tier={tier} count={tools.length} />
            <div className="tierSection__grid">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  metrics={metrics.get(tool.name.toLowerCase()) || null}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
