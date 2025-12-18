"use client";

import { useEffect, useState } from "react";
import { loadState } from "@/components/storage";

export function ProgressBadge({ slug }: { slug: string }) {
  const [status, setStatus] = useState<"unreviewed" | "in_progress" | "done">("unreviewed");

  useEffect(() => {
    const st = loadState();
    const s = st.tools?.[slug]?.status || "unreviewed";
    setStatus(s);
  }, [slug]);

  const label = status === "done" ? "✅ Done" : status === "in_progress" ? "🟡 In progress" : "⬜ Unreviewed";
  return <div className="pill" style={{opacity: 0.9}}>{label}</div>;
}
