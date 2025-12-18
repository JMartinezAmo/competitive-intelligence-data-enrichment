"use client";

import { loadState, saveState } from "@/components/storage";
import { useEffect, useState } from "react";

export function ReviewPanel({ slug }: { slug: string }) {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"unreviewed" | "in_progress" | "done">("unreviewed");

  useEffect(() => {
    const st = loadState();
    setNotes(st.tools?.[slug]?.notes || "");
    setStatus(st.tools?.[slug]?.status || "unreviewed");
  }, [slug]);

  function persist(nextNotes: string, nextStatus: typeof status) {
    const st = loadState();
    saveState({
      ...st,
      tools: {
        ...st.tools,
        [slug]: { notes: nextNotes, status: nextStatus, updatedAt: Date.now() }
      }
    });
  }

  return (
    <div className="card" style={{padding:12}}>
      <div style={{display:"flex", justifyContent:"space-between", gap:10, alignItems:"center"}}>
        <div>
          <div style={{fontWeight:800}}>Checklist (extra)</div>
          <div className="muted">Notas y estado. Persistente en localStorage.</div>
        </div>
        <select
          className="select"
          value={status}
          onChange={(e) => {
            const v = e.target.value as typeof status;
            setStatus(v);
            persist(notes, v);
          }}
        >
          <option value="unreviewed">Sin revisar</option>
          <option value="in_progress">En progreso</option>
          <option value="done">Hecho</option>
        </select>
      </div>

      <div style={{height:10}} />
      <textarea
        value={notes}
        placeholder="Notas: qué has validado, dónde, credenciales, sorpresas, etc."
        onChange={(e) => {
          const v = e.target.value;
          setNotes(v);
          persist(v, status);
        }}
      />
      <div className="muted small" style={{marginTop:8}}>
        Consejo obvio: Exporta el estado desde el header para no depender del humor del navegador.
      </div>
    </div>
  );
}
