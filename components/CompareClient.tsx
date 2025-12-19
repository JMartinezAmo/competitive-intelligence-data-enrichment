"use client";

import { useEffect, useMemo, useState } from "react";
import type { CsvTable } from "@/lib/csv";
import { loadState, saveState } from "@/components/storage";
import { TOOLS } from "@/lib/tools";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { TierBadge } from "@/components/ui/TierBadge";
import { Tooltip, TIER_EXPLANATIONS, VECTOR_EXPLANATIONS } from "@/components/ui/Tooltip";
import { CheckIcon, BarChartIcon, InfoIcon } from "@/components/Icons";
import { PriceComparisonChart } from "@/components/charts/PriceComparisonChart";
import { FeatureComparisonChart } from "@/components/charts/FeatureComparisonChart";

type Mode = "features" | "pricing";
type MetricsData = Record<string, { priceMin: number; priceMax: number; featureCount: number; totalFeatures: number }>;

function normalize(s: string) { return (s || "").trim().toLowerCase(); }

// Agrupa herramientas por tier para el selector
function groupToolsByTier() {
  return {
    "Tier 1": TOOLS.filter(t => t.tier === "Tier 1"),
    "Tier 2": TOOLS.filter(t => t.tier === "Tier 2"),
    "Tier 3": TOOLS.filter(t => t.tier === "Tier 3"),
  };
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
      next = (st.compare || []).filter(s => !tierSlugs.includes(s));
    } else {
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

  // Get selected tool names
  const selectedNames = useMemo(() => {
    return selected
      .map(slug => TOOLS.find(t => t.slug === slug)?.name)
      .filter(Boolean) as string[];
  }, [selected]);

  // Para features: transponer la tabla (features como filas, tools como columnas)
  const featureComparisonData = useMemo(() => {
    if (mode !== "features" || selectedNames.length === 0) return null;

    const headers = features.headers; // [Feature, Tool1, Tool2, ...]
    const featureColIdx = headers.findIndex(h => normalize(h) === "feature");

    // Encontrar índices de las columnas de herramientas seleccionadas
    const toolIndices = selectedNames.map(name => {
      const idx = headers.findIndex(h => normalize(h) === normalize(name));
      return { name, idx };
    }).filter(t => t.idx >= 0);

    if (toolIndices.length === 0) return null;

    // Extraer datos
    const rows = features.rows.map(row => {
      const featureName = row[featureColIdx] || row[0];
      const values: Record<string, string> = {};
      toolIndices.forEach(({ name, idx }) => {
        values[name] = row[idx] || "";
      });
      return { feature: featureName, values };
    });

    return { tools: toolIndices.map(t => t.name), rows };
  }, [features, mode, selectedNames]);

  // Para pricing: filtrar filas por herramientas seleccionadas
  const pricingComparisonData = useMemo(() => {
    if (mode !== "pricing" || selectedNames.length === 0) return null;

    const toolColIdx = pricing.headers.findIndex(h => normalize(h) === "tool");
    const allowedTools = new Set(selectedNames.map(normalize));

    const filteredRows = pricing.rows.filter(row => {
      const toolName = normalize(row[toolColIdx] || "");
      return allowedTools.has(toolName);
    });

    return { headers: pricing.headers, rows: filteredRows };
  }, [pricing, mode, selectedNames]);

  return (
    <div>
      {/* Guía de ayuda */}
      <div className="card" style={{ padding: 16, marginBottom: 16, background: "linear-gradient(135deg, var(--panel) 0%, var(--card) 100%)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <InfoIcon size={20} style={{ color: "var(--info)", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Cómo usar el comparador</div>
            <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
              1. Selecciona las herramientas que quieres comparar usando los botones de abajo<br/>
              2. Usa las pestañas <strong>Features</strong> / <strong>Pricing</strong> para cambiar la vista<br/>
              3. Los gráficos muestran un resumen visual de precios y funcionalidades
            </div>
          </div>
        </div>
      </div>

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

        <div className="muted" style={{ fontSize: 13 }}>
          <strong style={{ color: "var(--text)" }}>{selected.length}</strong> herramientas seleccionadas
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

      {/* Selector de herramientas por tier con tooltips */}
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

          return (
            <div key={tier} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <Tooltip content={TIER_EXPLANATIONS[tier]}>
                  <TierBadge tier={tier} size="sm" showIcon={false} />
                </Tooltip>
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
                    <Tooltip
                      key={t.slug}
                      content={
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.name}</div>
                          <div style={{ color: "var(--muted)" }}>
                            {t.vectors.map(v => VECTOR_EXPLANATIONS[v as keyof typeof VECTOR_EXPLANATIONS] || v).join(" | ")}
                          </div>
                        </div>
                      }
                      position="bottom"
                    >
                      <button
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
                    </Tooltip>
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

      {/* Tabla de comparación de FEATURES - herramientas como columnas */}
      {mode === "features" && (
        <>
          {featureComparisonData && featureComparisonData.tools.length > 0 ? (
            <div className="tableWrap" style={{ maxHeight: "60vh" }}>
              <table className="compareTable">
                <thead>
                  <tr>
                    <th style={{ minWidth: 200, textAlign: "left" }}>Feature</th>
                    {featureComparisonData.tools.map(toolName => {
                      const tool = TOOLS.find(t => t.name === toolName);
                      return (
                        <th key={toolName} style={{ minWidth: 100 }}>
                          <div className="compareTable__toolHeader">
                            {tool && <TierBadge tier={tool.tier} size="sm" showIcon={false} />}
                            <span className="compareTable__toolName">{toolName}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {featureComparisonData.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ textAlign: "left", fontWeight: 500 }}>{row.feature}</td>
                      {featureComparisonData.tools.map(toolName => (
                        <td key={toolName}>
                          <FeatureIcon value={row.values[toolName]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="emptyState">
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Selecciona herramientas para comparar</div>
              <div className="muted">Usa los botones de arriba para elegir qué herramientas quieres comparar lado a lado</div>
            </div>
          )}

          {/* Leyenda */}
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
        </>
      )}

      {/* Tabla de comparación de PRICING */}
      {mode === "pricing" && (
        <>
          {pricingComparisonData && pricingComparisonData.rows.length > 0 ? (
            <div className="tableWrap" style={{ maxHeight: "60vh" }}>
              <table className="compareTable">
                <thead>
                  <tr>
                    {pricingComparisonData.headers.map((h, idx) => (
                      <th key={idx} style={{ textAlign: idx === 0 ? "left" : "center" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricingComparisonData.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} style={{ textAlign: cellIdx === 0 ? "left" : "center" }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="emptyState">
              <div style={{ fontSize: 48, marginBottom: 16 }}>💰</div>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Selecciona herramientas para ver precios</div>
              <div className="muted">Usa los botones de arriba para elegir qué herramientas quieres comparar</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
