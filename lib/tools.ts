export type ToolTier = "Tier 1" | "Tier 2" | "Tier 3";

export type Tool = {
  slug: string;
  name: string;
  tier: ToolTier;
  vectors: string[];
  website?: string;
  reportPath: string;
};

export const TOOLS: Tool[] = [
  { slug: "clay", name: "Clay", tier: "Tier 1", vectors: ["Orchestration leaders"], website: "https://clay.com", reportPath: "content/reports/clay.md" },
  { slug: "persana-ai", name: "Persana AI", tier: "Tier 1", vectors: ["Orchestration leaders"], website: "https://www.persana.ai", reportPath: "content/reports/persana-ai.md" },
  { slug: "freckle", name: "Freckle", tier: "Tier 1", vectors: ["Waterfall pioneers"], website: "https://freckle.ai", reportPath: "content/reports/freckle.md" },
  { slug: "bettercontact", name: "BetterContact", tier: "Tier 1", vectors: ["Waterfall pioneers"], website: "https://bettercontact.rocks", reportPath: "content/reports/bettercontact.md" },
  { slug: "11x-ai", name: "11x.ai", tier: "Tier 1", vectors: ["AI SDR category"], website: "https://www.11x.ai", reportPath: "content/reports/11x-ai.md" },

  { slug: "cargo", name: "Cargo", tier: "Tier 2", vectors: ["Orchestration leaders"], website: "https://cargo.so", reportPath: "content/reports/cargo.md" },
  { slug: "databar", name: "Databar.ai", tier: "Tier 2", vectors: ["Waterfall pioneers"], website: "https://databar.ai", reportPath: "content/reports/databar.md" },
  { slug: "landbase", name: "Landbase", tier: "Tier 2", vectors: ["AI SDR category"], website: "https://www.landbase.com", reportPath: "content/reports/landbase.md" },

  { slug: "gumloop", name: "Gumloop", tier: "Tier 3", vectors: ["Technical moats"], website: "https://www.gumloop.com", reportPath: "content/reports/gumloop.md" },
  { slug: "tapistro", name: "Tapistro", tier: "Tier 3", vectors: ["Technical moats"], website: "https://www.tapistro.com", reportPath: "content/reports/tapistro.md" },
];

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find(t => t.slug === slug);
}
