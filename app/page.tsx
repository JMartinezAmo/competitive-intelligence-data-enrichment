import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { ProgressBadge } from "@/components/ProgressBadge";

export default function Page() {
  return (
    <div className="grid">
      <div className="card" style={{gridColumn: "span 12"}}>
        <div className="cardTitle">
          <div>
            <h1 className="h1">Dashboard</h1>
            <div className="muted">
              El core es el estudio. Aquí lo navegas por herramienta y en <span className="kbd">Comparar</span> lo pones a pelear en tablas.
            </div>
          </div>
        </div>
      </div>

      {TOOLS.map(t => (
        <div key={t.slug} className="card" style={{gridColumn: "span 6"}}>
          <div className="cardTitle">
            <div>
              <div style={{display:"flex", gap:10, alignItems:"baseline", flexWrap:"wrap"}}>
                <h2 className="h2" style={{fontSize:16}}>{t.name}</h2>
                <span className="pill">{t.tier}</span>
              </div>
              <div className="muted">{t.vectors.join(" · ")}</div>
              {t.website ? <div className="small"><a href={t.website} target="_blank" rel="noreferrer">Website</a></div> : null}
            </div>
            <ProgressBadge slug={t.slug} />
          </div>

          <div style={{marginTop:12, display:"flex", gap:10, flexWrap:"wrap"}}>
            <Link className="btn" href={`/tool/${t.slug}`}>Abrir informe</Link>
            <Link className="btn" href={`/compare?add=${t.slug}`}>Añadir a comparar</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
