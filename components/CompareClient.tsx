"use client";

import { useEffect, useMemo, useState } from "react";
import type { CsvTable } from "@/lib/csv";
import { loadState, saveState } from "@/components/storage";
import { TOOLS } from "@/lib/tools";

type Mode = "features" | "pricing";
function normalize(s: string) { return (s || "").trim().toLowerCase(); }

function findToolCol(headers: string[]) {
  const idx = headers.findIndex(h => normalize(h) === "tool" || normalize(h) === "name");
  return idx >= 0 ? idx : 0;
}

export function CompareClient({ features, pricing }: { features: CsvTable; pricing: CsvTable }) {
  const [mode, setMode] = useState<Mode>("features");
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

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

  return (
    <div>
      <div style={{display:"flex", gap:10, alignItems:"center", flexWrap:"wrap"}}>
        <button className="btn" onClick={() => setMode("features")} style={{opacity: mode==="features"?1:0.7}}>Features</button>
        <button className="btn" onClick={() => setMode("pricing")} style={{opacity: mode==="pricing"?1:0.7}}>Pricing</button>
        <input
          className="input"
          placeholder="Filtrar columnas (ej: webhook, GDPR, API...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{maxWidth: 420}}
        />
        <div className="muted">Seleccionadas: {selected.length || 0}</div>
      </div>

      <div style={{height:12}} />

      <div className="card" style={{padding:12}}>
        <div style={{fontWeight:800, marginBottom:8}}>Selector</div>
        <div className="muted" style={{marginBottom:10}}>Esto controla la tabla (persistente en localStorage).</div>
        <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
          {TOOLS.map(t => {
            const on = selected.includes(t.slug);
            return (
              <button key={t.slug} className="pill" onClick={() => toggle(t.slug)} style={{opacity: on ? 1 : 0.6}}>
                {on ? "✅ " : ""}{t.name}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{height:12}} />

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              {visibleHeaders.map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, idx) => (
              <tr key={idx}>
                {visibleIdx.map(i => <td key={i}>{r[i] ?? ""}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="muted small" style={{marginTop:10}}>
        MVP: render directo del CSV. Si quieres normalización “de verdad” (✅/❌, $/crédito calculado, etc.) lo añadimos en el parseo.
      </div>
    </div>
  );
}
