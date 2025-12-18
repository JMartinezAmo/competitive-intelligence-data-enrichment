"use client";

import { LS_KEY, loadState, saveState } from "@/components/storage";
import { useEffect, useState } from "react";

export function HeaderActions() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  function exportJson() {
    const state = loadState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ci-review-state.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importJson(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text);
    saveState({ tools: parsed.tools || {}, compare: parsed.compare || [] });
    window.location.reload();
  }

  function reset() {
    window.localStorage.removeItem(LS_KEY);
    window.location.reload();
  }

  if (!ready) return null;

  return (
    <div style={{display:"flex", gap:10, alignItems:"center"}}>
      <button className="btn" onClick={exportJson}>Export</button>
      <label className="btn">
        Import
        <input
          hidden
          type="file"
          accept="application/json"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importJson(f);
            e.currentTarget.value = "";
          }}
        />
      </label>
      <button className="btn btnDanger" onClick={reset}>Reset</button>
    </div>
  );
}
