import Link from "next/link";
import { getTool, TOOLS } from "@/lib/tools";
import { readText } from "@/lib/fs";
import { mdToHtml } from "@/lib/markdown";
import { ComparePicker } from "@/components/ComparePicker";
import { ReviewPanel } from "@/components/ReviewPanel";
import { readFeatureRow, readPricingRow } from "@/lib/tables";

export async function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.slug }));
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) return <div className="card">Tool no encontrado.</div>;

  const md = await readText(tool.reportPath);
  const html = await mdToHtml(md);

  const features = await readFeatureRow(tool.name);
  const pricing = await readPricingRow(tool.name);

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:"span 12"}}>
        <div className="cardTitle">
          <div>
            <h1 className="h1">{tool.name}</h1>
            <div className="muted">{tool.tier} · {tool.vectors.join(" · ")}</div>
          </div>
          <div style={{display:"flex", gap:10, flexWrap:"wrap", justifyContent:"flex-end"}}>
            <ComparePicker slug={tool.slug} />
            {tool.website ? <a className="btn" href={tool.website} target="_blank" rel="noreferrer">Website</a> : null}
            <Link className="btn" href="/compare">Ir a Comparar</Link>
          </div>
        </div>
      </div>

      <div className="card markdown" style={{gridColumn:"span 8"}}>
        <h2 className="h2" style={{fontSize:16}}>Informe</h2>
        <div className="muted">Markdown del estudio renderizado (con citas tal cual).</div>
        <div style={{height:12}} />
        <div dangerouslySetInnerHTML={{__html: html}} />
      </div>

      <div className="card" style={{gridColumn:"span 4"}}>
        <h2 className="h2" style={{fontSize:16}}>Comparables</h2>
        <div className="muted">Extractos de los CSV para comparar rápido.</div>

        <div style={{height:12}} />
        <div className="card" style={{padding:12}}>
          <div className="muted">Features (row)</div>
          <pre style={{whiteSpace:"pre-wrap"}}>{features ?? "No row found en features_matrix.csv"}</pre>
        </div>

        <div style={{height:12}} />
        <div className="card" style={{padding:12}}>
          <div className="muted">Pricing (row)</div>
          <pre style={{whiteSpace:"pre-wrap"}}>{pricing ?? "No row found en pricing_comparison.csv"}</pre>
        </div>

        <div style={{height:12}} />
        <ReviewPanel slug={tool.slug} />
      </div>
    </div>
  );
}
