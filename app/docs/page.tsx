import { readText } from "@/lib/fs";
import { mdToHtml } from "@/lib/markdown";

export default async function DocsPage() {
  const exec = await readText("content/executive_summary.md");
  const attack = await readText("content/attack_strategy.md");
  const execHtml = await mdToHtml(exec);
  const attackHtml = await mdToHtml(attack);

  return (
    <div className="grid">
      <div className="card" style={{gridColumn:"span 12"}}>
        <h1 className="h1">Resumen</h1>
        <div className="muted">Executive summary + attack strategy.</div>
      </div>

      <div className="card markdown" style={{gridColumn:"span 12"}}>
        <h2 className="h2" style={{fontSize:16}}>Executive Summary</h2>
        <div dangerouslySetInnerHTML={{__html: execHtml}} />
      </div>

      <div className="card markdown" style={{gridColumn:"span 12"}}>
        <h2 className="h2" style={{fontSize:16}}>Attack Strategy</h2>
        <div dangerouslySetInnerHTML={{__html: attackHtml}} />
      </div>
    </div>
  );
}
