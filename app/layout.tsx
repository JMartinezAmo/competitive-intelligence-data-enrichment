import "./globals.css";
import Link from "next/link";
import { HeaderActions } from "@/components/HeaderActions";

export const metadata = {
  title: "Competitive Intel",
  description: "Research viewer + comparison + validation checklist (localStorage).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="container">
          <div className="header">
            <div className="brand">
              <div className="brandTitle">Competitive Intel</div>
              <div className="brandSub">contenido primero · comparaciones · checklist (extra)</div>
            </div>
            <div className="nav">
              <Link className="pill" href="/">Dashboard</Link>
              <Link className="pill" href="/compare">Comparar</Link>
              <Link className="pill" href="/docs">Resumen</Link>
              <HeaderActions />
            </div>
          </div>
          {children}
          <div className="muted" style={{marginTop: 22}}>
            Si algo no aparece, normalmente es porque el CSV no tenía esa fila. Qué sorpresa.
          </div>
        </div>
      </body>
    </html>
  );
}
