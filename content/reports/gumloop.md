# Gumloop

## Sección 1: Product Intelligence

### 1.1 Arquitectura y stack técnico


Gumloop es una plataforma de scraping y automatización visual. Permite construir flujos (flows) usando nodos en un canvas. Su motor ejecuta scrapers y llamadas API sin necesidad de código. Los usuarios pueden traer sus claves de API y conectarlas con nodos AI. Está alojada en la nube; se puede ejecutar en VPC en el plan Enterprise. Incluye un agente AI llamado “Gummie” para acelerar la creación de scrapers.


### 1.2 Calidad de datos y métricas


La calidad depende de la configuración del scraper y de los servicios de terceros conectados. Gumloop no proporciona datos propios ni verificación de emails. Cada flujo puede usar validaciones personalizadas. La cobertura global está limitada sólo por las webs que se scrapean. No existen métricas de éxito.


### 1.3 Matriz de funcionalidades


Gumloop ofrece flujos visuales con nodos ilimitados, scrapers de web personalizados, API pública, importación/exportación masiva, webhooks y automatizaciones programadas. Carece de waterfall enrichment, signals y secuenciador de emails. Incluye funciones de colaboración (workspaces, permisos) y analítica de uso en plan Team. Cumple SOC2 y GDPR.


## Sección 2: API y capacidades de integración

### 2.1 API pública


Proporciona una API para crear y ejecutar flujos, con autenticación por token y soporte para BYO API keys. Los límites de tasa varían según plan: 2 flujos concurrentes en Free, 4 en Solo y 5 en Team【475557916958066†L23-L59】. Permite disparar webhooks y recibir resultados en JSON.


### 2.2 Integraciones nativas


Integraciones con Zapier, Make, n8n y Google Sheets para exportar datos. Los usuarios pueden conectar APIs propias (ej. Slack, Airtable) como nodos. No hay integraciones nativas con CRMs ni secuenciadores; estas se realizan mediante terceros.


### 2.3 Experiencia para desarrolladores


Documentación extensa con tutoriales y Gumloop University. La interfaz visual reduce la necesidad de código, pero los usuarios avanzados pueden escribir scripts en nodos personalizados. El changelog se publica en el blog y ofrecen un Slack de comunidad. No hay SDKs oficiales.


## Sección 3: Pricing y modelo de negocio

### 3.1 Niveles de precio


**Free**: 0 US$/mes, 2 000 créditos/mes, 1 asiento, 1 trigger activo y 2 ejecuciones concurrentes【475557916958066†L23-L59】. **Solo**: 37 US$/mes, 10 000+ créditos/mes, triggers ilimitados, 4 ejecuciones concurrentes, webhooks y soporte por email【475557916958066†L45-L60】. **Team**: 244 US$/mes, 60 000+ créditos/mes, 10 usuarios, 5 ejecuciones concurrentes, workspaces ilimitados y soporte en Slack【475557916958066†L65-L80】. **Enterprise**: precio personalizado con características de seguridad avanzadas (RBAC, SCIM, VPC, etc.)【475557916958066†L83-L101】.


### 3.2 Unit Economics


Un crédito equivale a la ejecución de un nodo o tarea. El coste por crédito en Solo es ~0,0037 US$, y en Team ~0,004 US$. Los créditos no se transfieren. La escalabilidad se basa en aumentar los créditos mensuales.


### 3.3 Estrategia de empaquetado


Gumloop ofrece niveles por tamaño con límites claros de créditos, triggers y usuarios. El modelo es freemium y self‑serve; la versión Enterprise agrega características de seguridad y soporte dedicado. No hay upsells de data; la monetización se centra en volumen de automatizaciones.


### 3.4 Señales de revenue


Gumloop tiene clientes como Webflow y Instacart. No ha anunciado financiación; se mantiene mediante ingresos recurrentes de suscripciones. Está expandiendo su base a equipos de marketing y operaciones.


## Sección 4: Go-to-Market Strategy

### 4.1 Posicionamiento y mensaje


Se posiciona como “easy to use AI web scraper tool”. El público objetivo son marketers y growth hackers que necesitan extraer datos de la web sin programar. En comparación con Databar, se centra en scraping, no en enriquecimiento.


### 4.2 Segmentos de cliente


Usuarios: freelancers, equipos de marketing y operaciones. Casos de uso: monitorización de precios, extracción de leads, automatización de flujos internos. No es específica para ventas.


### 4.3 Moat y defensibilidad


Su principal defensibilidad es la interfaz visual y la capacidad de crear flujos complejos sin código. Pero carece de datos propios o señales, por lo que su moat es 5/10. Herramientas como Clay o Databar podrían añadir un constructor visual y competir fácilmente.


## Sección 5: Weaknesses & Attack Vectors

### 5.1 Gaps de producto


No incluye enrichment waterfall ni verificación de datos; se limita a scraping. Los usuarios deben conectarlo con otras herramientas para prospección. La calidad del scraping depende de la estructura de las webs.


### 5.2 Vulnerabilidades de pricing


El plan Team es costoso (244 US$/mes) en comparación con competidores que ofrecen scraping y datos por menos. Además, los créditos no usados se pierden.


### 5.3 Soporte y onboarding


Soporte por email en Solo y Slack en Team; no hay SLA formal. Algunos usuarios reportan que la comunidad no siempre responde rápidamente.


### 5.4 Vulnerabilidades de posicionamiento


Al no dirigirse específicamente a GTM, es vulnerable a herramientas verticales que combinan scraping y enrichment. Además, la industria del scraping está sujeta a restricciones legales y bloqueos de sitios web.


## Sección 6: Roadmap Signals y movimientos futuros

### 6.1 Lanzamientos recientes


Han lanzado nodos de IA adicionales y la posibilidad de programar flujos. También añadieron soporte para credenciales compartidas y organización de workspaces.


### 6.2 Análisis de ofertas de empleo


Están contratando especialistas en DevRel y diseño de producto, lo que sugiere un enfoque en mejorar la UX y la adopción.


### 6.3 Señales de fundraising & M&A


No hay anuncios de financiación; se centra en crecimiento orgánico.


## Sección 7: Competitive Positioning Summary

### 7.1 Fortalezas


- Constructor visual intuitivo y nodos ilimitados.
- Plan gratuito generoso para probar la herramienta.
- Capacidad de BYO API keys y webhooks.
- Cumplimiento SOC2 y GDPR.


### 7.2 Debilidades


- Carece de datos propios y de funciones de enrichment.
- Coste elevado en planes de equipo.
- Dependencia de otros servicios para obtener leads y signals.
- Falta de integraciones nativas con CRMs y secuenciadores.


### 7.3 Oportunidades de diferenciación


Competidores pueden combinar scraping con enrichment y signals, ofrecer pricing más flexible y añadir integraciones GTM nativas para posicionarse mejor en el espacio de lead generation.
