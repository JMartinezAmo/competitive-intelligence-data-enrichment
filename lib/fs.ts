import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readText(relPath: string): Promise<string> {
  const abs = path.join(process.cwd(), relPath);
  return await readFile(abs, "utf-8");
}
