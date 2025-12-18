export const LS_KEY = "ci_review_v1";

export type ReviewState = {
  tools: Record<string, {
    notes?: string;
    status?: "unreviewed" | "in_progress" | "done";
    updatedAt?: number;
  }>;
  compare: string[];
};

export function loadState(): ReviewState {
  if (typeof window === "undefined") return { tools: {}, compare: [] };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { tools: {}, compare: [] };
    const parsed = JSON.parse(raw);
    return { tools: parsed.tools || {}, compare: parsed.compare || [] };
  } catch {
    return { tools: {}, compare: [] };
  }
}

export function saveState(state: ReviewState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, JSON.stringify(state));
}
