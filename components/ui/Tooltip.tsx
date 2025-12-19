"use client";

import { useState, ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [show, setShow] = useState(false);

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: 8 },
    bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8 },
    left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: 8 },
    right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: 8 },
  };

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          style={{
            position: "absolute",
            ...positionStyles[position],
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            color: "var(--text)",
            whiteSpace: "nowrap",
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            maxWidth: 280,
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}

// Definiciones de tooltips para el proyecto
export const TIER_EXPLANATIONS = {
  "Tier 1": "Herramientas líderes del mercado con funcionalidades completas y ecosistema maduro",
  "Tier 2": "Soluciones competitivas con buen balance precio-funcionalidad",
  "Tier 3": "Herramientas emergentes o especializadas en nichos específicos",
};

export const VECTOR_EXPLANATIONS = {
  "Orchestration leaders": "Plataformas que permiten orquestar flujos complejos conectando múltiples fuentes de datos y herramientas",
  "Waterfall pioneers": "Especialistas en enriquecimiento en cascada: prueban múltiples proveedores hasta encontrar datos válidos",
  "AI SDR category": "Soluciones con agentes de IA que automatizan tareas de SDR (prospección, emails, seguimiento)",
  "Technical moats": "Herramientas con ventajas técnicas únicas difíciles de replicar",
};
