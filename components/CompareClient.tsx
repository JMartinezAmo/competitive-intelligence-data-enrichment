"use client";

import { useEffect, useMemo, useState } from "react";
import type { CsvTable } from "@/lib/csv";
import { loadState, saveState } from "@/components/storage";
import { TOOLS } from "@/lib/tools";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { TierBadge } from "@/components/ui/TierBadge";
import { CheckIcon, BarChartIcon } from "@/components/Icons";
import { PriceComparisonChart } from "@/components/charts/PriceComparisonChart";
import { FeatureComparisonChart } from "@/components/charts/FeatureComparisonChart";

type Mode = "features" | "pricing";
type MetricsData = Record<string, { priceMin: number; priceMax: number; featureCount: number; totalFeatures: number }>;
function normalize(s: string) { return (s || "").trim().toLowerCase(); }

function findToolCol(headers: string[]) {
  const idx = headers.findIndex(h => normalize(h) === "tool" || normalize(h) === "name");
  return idx >= 0 ? idx : 0;
}

// Determina si un valor es de tipo feature (Yes/No/Partial)
function isFeatureValue(value: string): boolean {
  const v = normalize(value);
  return ["yes", "no", "partial", "limited", "unknown", "true", "false"].includes(v) ||
         v.includes("partial") || v.includes("limited");
}

// Agrupa herramientas por tier para el selector
function groupToolsByTier() {
  const groups = {
    "Tier 1": TOOLS.filter(t => t.tier === "Tier 1"),
    "Tier 2": TOOLS.filter(t => t.tier === "Tier 2"),
    "Tier 3": TOOLS.filter(t => t.tier === "Tier 3"),
  };
  return groups;
}

export function CompareClient({
  features,
  pricing,
  metricsData = {},
}: {
  features: CsvTable;
  pricing: CsvTable;
  metricsData?: MetricsData;
}) {
  const [mode, setMode] = useState<Mode>("features");
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [showCharts, setShowCharts] = useState(true);

  const toolsByTier = useMemo(() => groupToolsByTier(), []);

  // Convertir metricsData a Maps para los gráficos
  const pricingDataMap = useMemo(() => {
    const map = new Map<string, { min: number; max: number }>();
    Object.entries(metricsData).forEach(([key, value]) => {
      map.set(key, { min: value.priceMin, max: value.priceMax });
    });
    return map;
  }, [metricsData]);

  const featureDataMap = useMemo(() => {
    const map = new Map<string, { yes: number; total: number }>();
    Object.entries(metricsData).forEach(([key, value]) => {
      map.set(key, { yes: value.featureCount, total: value.totalFeatures });
    });
    return map;
  }, [metricsData]);

  useEffect(() => {
    const st = loadState();
    setSelected(st.compare || []);
  }, []);

  function toggle(slug: string) {
    const st = loadState();
    const next = (st.compare || []).includes(slug)
      ? (st.compare || []).filter(s => s !== slug)
      : [...(st.compare || []), slug];
    saveState({ ...st, compare: next });
    setSelected(next);
  }

  function selectAllTier(tier: keyof typeof toolsByTier) {
    const st = loadState();
    const tierSlugs = toolsByTier[tier].map(t => t.slug);
    const allSelected = tierSlugs.every(slug => selected.includes(slug));

    let next: string[];
    if (allSelected) {
      // Deseleccionar todos del tier
      next = (st.compare || []).filter(s => !tierSlugs.includes(s));
    } else {
      // Seleccionar todos del tier
      const current = new Set(st.compare || []);
      tierSlugs.forEach(s => current.add(s));
      next = Array.from(current);
    }

    saveState({ ...st, compare: next });
    setSelected(next);
  }

  function clearAll() {
    const st = loadState();
    saveState({ ...st, compare: [] });
    setSelected([]);
  }

  const table = mode === "features" ? features : pricing;
  const toolCol = useMemo(() => findToolCol(table.headers), [table.headers]);

  const selectedNames = useMemo(() => {
    return selected
      .map(slug => TOOLS.find(t => t.slug === slug)?.name)
      .filter(Boolean) as string[];
  }, [selected]);

  const filteredRows = useMemo(() => {
    let rows = table.rows;
    if (selectedNames.length) {
      const allow = new Set(selectedNames.map(normalize));
      rows = rows.filter(r => allow.has(normalize(r[toolCol] || "")));
    }
    return rows;
  }, [table.rows, selectedNames, toolCol]);

  const visibleHeaders = useMemo(() => {
    const q = normalize(query);
    if (!q) return table.headers;
    return table.headers.filter((h, i) => i === toolCol || normalize(h).includes(q));
  }, [table.headers, query, toolCol]);

  const visibleIdx = useMemo(() => visibleHeaders.map(h => table.headers.indexOf(h)), [visibleHeaders, table.headers]);

  // Cuenta features por herramienta seleccionada (solo en modo features)
  const featureCounts = useMemo(() => {
    if (mode !== "features") return new Map<string, { yes: number; total: number }>();

    const counts = new Map<string, { yes: number; total: number }>();

    for (const row of filteredRows) {
      const toolName = row[toolCol];
      let yesCount = 0;
      let total = 0;

      for (let i = 0; i < row.length; i++) {
        if (i === toolCol) continue;
        const val = normalize(row[i] || "");
        if (isFeatureValue(row[i] || "")) {
          total++;
          if (val === "yes" || val === "true") yesCount++;
        }
      }

      counts.set(normalize(toolName), { yes: yesCount, total });
    }

    return counts;
  }, [filteredRows, toolCol, mode]);

  return (
    <div>
      {/* Header con controles */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            className="btn"
            onClick={() => setMode("features")}
            style={{
              background: mode === "features" ? "var(--info)" : undefined,
              color: mode === "features" ? "var(--bg)" : undefined,
              borderColor: mode === "features" ? "var(--info)" : undefined,
            }}
          >
            Features
          </button>
          <button
            className="btn"
            onClick={() => setMode("pricing")}
            style={{
              background: mode === "pricing" ? "var(--info)" : undefined,
              color: mode === "pricing" ? "var(--bg)" : undefined,
              borderColor: mode === "pricing" ? "var(--info)" : undefined,
            }}
          >
            Pricing
          </button>
        </div>

        <input
          className="input"
          placeholder="Filtrar columnas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 280, flex: 1 }}
        />

        <div className="muted" style={{ fontSize: 13 }}>
          <strong style={{ color: "var(--text)" }}>{selected.length}</strong> seleccionadas
        </div>

        {selected.length > 0 && (
          <button className="btn btnDanger" onClick={clearAll} style={{ fontSize: 12 }}>
            Limpiar
          </button>
        )}

        {selected.length >= 2 && (
          <button
            className="btn"
            onClick={() => setShowCharts(!showCharts)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: showCharts ? "var(--panel)" : undefined,
            }}
          >
            <BarChartIcon size={14} />
            {showCharts ? "Ocultar" : "Ver"} gráficos
          </button>
        )}
      </div>

      {/* Selector de herramientas por tier */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Selector de Herramientas</div>
            <div className="muted" style={{ fontSize: 12 }}>Haz clic en una herramienta o selecciona un tier completo</div>
          </div>
        </div>

        {(["Tier 1", "Tier 2", "Tier 3"] as const).map((tier) => {
          const tools = toolsByTier[tier];
          const allSelected = tools.every(t => selected.includes(t.slug));
          const someSelected = tools.some(t => selected.includes(t.slug));

          return (
            <div key={tier} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <TierBadge tier={tier} size="sm" showIcon={false} />
                <button
                  className="btn"
                  onClick={() => selectAllTier(tier)}
                  style={{ fontSize: 11, padding: "4px 8px" }}
                >
                  {allSelected ? "Deseleccionar" : "Seleccionar"} todos
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {tools.map(t => {
                  const on = selected.includes(t.slug);
                  return (
                    <button
                      key={t.slug}
                      className="pill"
                      onClick={() => toggle(t.slug)}
                      style={{
                        opacity: on ? 1 : 0.5,
                        borderColor: on ? "var(--ok)" : undefined,
                        background: on ? "rgba(54, 211, 153, 0.1)" : undefined,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {on && <CheckIcon size={12} />}
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráficos de comparación */}
      {showCharts && selected.length >= 2 && (
        <div className="grid" style={{ gap: 16, marginBottom: 16 }}>
          <div className="card" style={{ gridColumn: "span 6", padding: 16 }}>
            <PriceComparisonChart
              selectedSlugs={selected}
              pricingData={pricingDataMap}
              showMax={true}
            />
          </div>
          <div className="card" style={{ gridColumn: "span 6", padding: 16 }}>
            <FeatureComparisonChart
              selectedSlugs={selected}
              featureCounts={featureDataMap}
            />
          </div>
        </div>
      )}

      {/* Resumen de comparación (solo en modo features) */}
      {mode === "features" && selected.length > 0 && (
        <div className="card" style={{ padding: 16, marginBottom: 16, background: "var(--panel)" }}>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>Resumen de Features</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {Array.from(featureCounts.entries())
              .sort((a, b) => b[1].yes - a[1].yes)
              .map(([toolName, counts]) => {
                const tool = TOOLS.find(t => normalize(t.name) === toolName);
                return (
                  <div
                    key={toolName}
                    style={{
                      padding: "10px 14px",
                      background: "var(--card)",
                      borderRadius: 8,
                      border: "1px solid var(--line)",
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{tool?.name || toolName}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ok)" }}>
                      {counts.yes}<span style={{ color: "var(--muted)", fontSize: 14 }}>/{counts.total}</span>
                    </div>
                    <div className="muted" style={{ fontSize: 11 }}>features</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Tabla de comparación */}
      <div className="tableWrap" style={{ maxHeight: "60vh" }}>
        <table className="compareTable">
          <thead>
            <tr>
              {visibleHeaders.map((h, idx) => {
                // Buscar si este header corresponde a una herramienta para mostrar tier badge
                const tool = TOOLS.find(t => normalize(t.name) === normalize(h));
                return (
                  <th key={h}>
                    {tool ? (
                      <div className="compareTable__toolHeader">
                        <TierBadge tier={tool.tier} size="sm" showIcon={false} />
                        <span className="compareTable__toolName">{h}</span>
                      </div>
                    ) : (
                      h
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={visibleHeaders.length} style={{ textAlign: "center", padding: 40 }}>
                  <div className="emptyState" style={{ border: "none" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
                    <div className="muted">Selecciona herramientas para comparar</div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredRows.map((r, idx) => (
                <tr key={idx}>
                  {visibleIdx.map((i, colIdx) => {
                    const value = r[i] ?? "";
                    const isFirstCol = colIdx === 0;

                    // En modo features, mostrar iconos para valores Yes/No/Partial
                    if (mode === "features" && !isFirstCol && isFeatureValue(value)) {
                      return (
                        <td key={i}>
                          <FeatureIcon value={value} />
                        </td>
                      );
                    }

                    return (
                      <td key={i} style={{ textAlign: isFirstCol ? "left" : "center" }}>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      {mode === "features" && (
        <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FeatureIcon value="Yes" />
            <span className="muted" style={{ fontSize: 12 }}>Soportado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FeatureIcon value="Partial" />
            <span className="muted" style={{ fontSize: 12 }}>Parcial/Limitado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FeatureIcon value="No" />
            <span className="muted" style={{ fontSize: 12 }}>No soportado</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <FeatureIcon value="Unknown" />
            <span className="muted" style={{ fontSize: 12 }}>Desconocido</span>
          </div>
        </div>
      )}
    </div>
  );
}
