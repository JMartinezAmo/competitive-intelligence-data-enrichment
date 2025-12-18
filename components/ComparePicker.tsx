"use client";

import { loadState, saveState } from "@/components/storage";
import { useEffect, useState } from "react";

export function ComparePicker({ slug }: { slug: string }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const st = loadState();
    setAdded(st.compare.includes(slug));
  }, [slug]);

  function toggle() {
    const st = loadState();
    const next = st.compare.includes(slug)
      ? st.compare.filter(s => s !== slug)
      : [...st.compare, slug];
    saveState({ ...st, compare: next });
    setAdded(!added);
  }

  return (
    <button className="btn" onClick={toggle}>
      {added ? "Quitar de comparar" : "Añadir a comparar"}
    </button>
  );
}
