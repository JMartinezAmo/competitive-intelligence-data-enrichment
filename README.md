# Competitive Intelligence Web (Vercel-ready)

Web interactiva para consumir y **comparar** el estudio competitivo. Incluye un checklist simple (extra) que se guarda en **localStorage**.

## Deploy en Vercel (GitHub)
1. Sube este repo a GitHub.
2. En Vercel: New Project → selecciona el repo → Deploy.

## Desarrollo local
```bash
npm i
npm run dev
```

## Contenido
- `content/reports/*.md` informes por herramienta
- `content/executive_summary.md` y `content/attack_strategy.md`
- `content/features_matrix.csv` y `content/pricing_comparison.csv`

## Checklist (extra)
Se guarda en `localStorage` con key `ci_review_v1`. Export/Import/Reset desde el header.
