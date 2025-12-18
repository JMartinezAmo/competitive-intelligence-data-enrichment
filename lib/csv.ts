export type CsvTable = { headers: string[]; rows: string[][] };

export function parseCsv(raw: string): CsvTable {
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length);
  const rows: string[][] = [];
  for (const line of lines) {
    const out: string[] = [];
    let cur = "";
    let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') inQ = !inQ;
      else if (ch === "," && !inQ) { out.push(cur); cur = ""; }
      else cur += ch;
    }
    out.push(cur);
    rows.push(out.map(s => s.trim().replace(/^"|"$/g, "")));
  }
  const headers = rows[0] ?? [];
  return { headers, rows: rows.slice(1) };
}
