// data.js
// Rellena 'claims' con items verificables (cada claim = una cosa que validar).
// Estado se guarda en localStorage (ver app.js).

window.TOOLS = [
  {
    key: "clay",
    name: "Clay",
    tier: "Tier 1",
    tags: ["Orchestration", "Enrichment", "GTM"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "Arquitectura, fuentes de datos, waterfall/orchestration.", claims: [
        { id: "clay-pricing", text: "Validar pricing y definición exacta de crédito.", sources: [{ label: "Pricing oficial", url: "https://clay.com/pricing" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "Docs públicas, rate limits, integraciones nativas.", claims: [
        { id: "clay-api", text: "¿Hay API pública documentada? Guardar link y endpoints clave.", sources: [{ label: "Website", url: "https://clay.com" }] }
      ]},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "Tiers, unit economics, overages, descuentos.", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "Posicionamiento, buyer, casos de uso.", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "Críticas, riesgos regulatorios, dependencias.", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "Changelog, hiring, fundraising.", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "Strengths, weaknesses, oportunidad de diferenciación.", claims: []}
    ]
  },

  {
    key: "persana_ai",
    name: "Persana AI",
    tier: "Tier 1",
    tags: ["Orchestration", "AI agents", "Enrichment"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "persana-pricing", text: "Validar pricing y qué consume 1 crédito (attempt vs result).", sources: [{ label: "Website", url: "https://www.persana.ai" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "freckle",
    name: "Freckle",
    tier: "Tier 1",
    tags: ["Waterfall", "Email finding", "Enrichment"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "freckle-pricing", text: "Validar planes y créditos incluidos.", sources: [{ label: "Website", url: "https://www.freckle.ai" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "bettercontact",
    name: "BetterContact",
    tier: "Tier 1",
    tags: ["Waterfall", "Enrichment", "Verification"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "bettercontact-pricing", text: "Validar pricing y lógica de waterfall (configurable vs fijo).", sources: [{ label: "Website", url: "https://www.bettercontact.rocks" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "databar",
    name: "Databar.ai",
    tier: "Tier 2",
    tags: ["Waterfall", "Enrichment", "APIs"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "databar-pricing", text: "Validar pricing, límites y qué consume crédito.", sources: [{ label: "Website", url: "https://databar.ai" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "cargo",
    name: "Cargo",
    tier: "Tier 2",
    tags: ["Orchestration", "Workflows", "RevOps"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "cargo-pricing", text: "Validar pricing y packaging (usage vs seat).", sources: [{ label: "Website", url: "https://cargo.so" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "11x",
    name: "11x.ai",
    tier: "Tier 1",
    tags: ["AI SDR", "Autonomous outreach"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "11x-pricing", text: "Confirmar si pricing es público o solo por demo. Capturar rango real.", sources: [{ label: "Website", url: "https://www.11x.ai" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "landbase",
    name: "Landbase",
    tier: "Tier 2",
    tags: ["AI SDR", "Agentic GTM", "Signals"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "landbase-pricing", text: "Validar pricing real (starting around $3k/mo) y qué incluye.", sources: [{ label: "Website", url: "https://www.landbase.com" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "gumloop",
    name: "Gumloop",
    tier: "Tier 3",
    tags: ["Scraping", "Automation", "Flows"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "gumloop-pricing", text: "Validar pricing por créditos y qué es 1 crédito.", sources: [{ label: "Pricing oficial", url: "https://www.gumloop.com/pricing" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  },

  {
    key: "tapistro",
    name: "Tapistro",
    tier: "Tier 3",
    tags: ["Intent signals", "Orchestration", "Enrichment"],
    sections: [
      { id: "product", title: "SECCIÓN 1: Product Intelligence", hint: "", claims: [
        { id: "tapistro-pricing", text: "Validar pricing (si es público) y si es seat-based.", sources: [{ label: "Website", url: "https://www.tapistro.com" }] }
      ]},
      { id: "api", title: "SECCIÓN 2: API & Integrations", hint: "", claims: []},
      { id: "pricing", title: "SECCIÓN 3: Pricing & Business Model", hint: "", claims: []},
      { id: "gtm", title: "SECCIÓN 4: Go-To-Market Strategy", hint: "", claims: []},
      { id: "weak", title: "SECCIÓN 5: Weaknesses & Attack Vectors", hint: "", claims: []},
      { id: "roadmap", title: "SECCIÓN 6: Roadmap Signals & Future Moves", hint: "", claims: []},
      { id: "summary", title: "SECCIÓN 7: Competitive Positioning Summary", hint: "", claims: []}
    ]
  }
];
