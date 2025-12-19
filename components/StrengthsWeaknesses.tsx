"use client";

import { ThumbsUpIcon, ThumbsDownIcon } from "@/components/Icons";

type Props = {
  strengths: string[];
  weaknesses: string[];
};

export function StrengthsWeaknesses({ strengths, weaknesses }: Props) {
  if (strengths.length === 0 && weaknesses.length === 0) {
    return null;
  }

  return (
    <div className="grid" style={{ gap: 16 }}>
      {/* Fortalezas */}
      <div className="card" style={{ gridColumn: "span 6", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(54, 211, 153, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ThumbsUpIcon size={18} style={{ color: "var(--ok)" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Fortalezas</div>
            <div className="muted" style={{ fontSize: 11 }}>{strengths.length} puntos fuertes identificados</div>
          </div>
        </div>
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          {strengths.map((s, i) => (
            <li key={i} style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text)" }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Debilidades */}
      <div className="card" style={{ gridColumn: "span 6", padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(248, 113, 113, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <ThumbsDownIcon size={18} style={{ color: "var(--bad)" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Debilidades</div>
            <div className="muted" style={{ fontSize: 11 }}>{weaknesses.length} áreas de mejora</div>
          </div>
        </div>
        <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          {weaknesses.map((w, i) => (
            <li key={i} style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text)" }}>{w}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
