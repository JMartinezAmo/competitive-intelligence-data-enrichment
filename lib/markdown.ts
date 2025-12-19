import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function mdToHtml(md: string): Promise<string> {
  const out = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(md);
  return out.toString();
}

// Extrae secciones específicas de un markdown
export function extractSection(markdown: string, sectionTitle: string): string[] {
  const lines = markdown.split('\n');
  const items: string[] = [];
  let inSection = false;

  for (const line of lines) {
    // Detectar inicio de sección (### 7.1 Fortalezas o similar)
    if (line.includes(sectionTitle)) {
      inSection = true;
      continue;
    }

    // Detectar fin de sección (siguiente header ##)
    if (inSection && line.match(/^#{1,3}\s/)) {
      break;
    }

    // Extraer items de lista
    if (inSection && line.trim().startsWith('-')) {
      items.push(line.trim().replace(/^-\s*/, ''));
    }
  }

  return items;
}

export function extractStrengths(markdown: string): string[] {
  return extractSection(markdown, 'Fortalezas');
}

export function extractWeaknesses(markdown: string): string[] {
  return extractSection(markdown, 'Debilidades');
}

// Extrae un resumen corto del primer párrafo de la sección Product Intelligence
export function extractSummary(markdown: string): string {
  const match = markdown.match(/### 1\.1 Arquitectura.*?\n\n([^#]+)/s);
  if (match) {
    const firstParagraph = match[1].trim().split('\n\n')[0];
    // Limitar a ~200 caracteres
    return firstParagraph.length > 200
      ? firstParagraph.slice(0, 200) + '...'
      : firstParagraph;
  }
  return '';
}
