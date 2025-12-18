# 11x.ai

## Sección 1: Product Intelligence

### 1.1 Arquitectura y stack técnico


11x.ai crea “digital workers” como Alice (AI SDR) y Julian (AI phone rep) que operan de manera autónoma sobre listas de contactos. Utiliza grandes modelos de lenguaje, procesamiento de señales y capacidades de multicanal (email, teléfono, LinkedIn). La plataforma es cloud‑native y se conecta al CRM para registrar actividades. Los agentes investigan prospectos, generan mensajes personalizados y gestionan secuencias. Es un sistema cerrado sin API pública documentada.


### 1.2 Calidad de datos y métricas


11x no proporciona su propia base de datos; se integra con proveedores externos y con el CRM del cliente. La calidad de los leads depende de las fuentes conectadas. Los usuarios indican que el enfoque en volumen produce mensajes genéricos y baja personalización. No hay métricas públicas de tasa de acierto. El sistema está optimizado para EE.UU. y requiere grandes listas para funcionar bien【1835808313976†L155-L162】.


### 1.3 Matriz de funcionalidades


Ofrece agentes autónomos para investigación, redacción y llamadas, señales de intención básicas, integración CRM bidireccional, secuenciador multicanal (email y teléfono), verificación de emails, dashboards y soporte de colaboración. Carece de API pública, extensión de Chrome y A/B testing nativo.


## Sección 2: API y capacidades de integración

### 2.1 API pública


No se publica una API REST estándar; las integraciones se realizan mediante conectores con Salesforce y HubSpot. Algunos usuarios mencionan que 11x puede exponer webhooks personalizados, pero esto no está documentado.


### 2.2 Integraciones nativas


Integración nativa con Salesforce y HubSpot para registro de actividades. No se mencionan integraciones con secuenciadores externos; el sistema utiliza su propio motor. Tampoco hay conectores con Zapier o Make.


### 2.3 Experiencia para desarrolladores


Dado que la plataforma se vende como servicio gestionado, el acceso de desarrolladores es limitado. No hay SDK ni Playground. La implementación se realiza a través del equipo de 11x; los usuarios no pueden personalizar agentes sin apoyo.


## Sección 3: Pricing y modelo de negocio

### 3.1 Niveles de precio


11x no publica sus precios; según análisis de terceros, el paquete base cuesta ~5 000 US$/mes con contrato anual【633511135304271†L540-L552】. Incluye 3 000 contactos mensuales y acceso a un agente (Alice o Julian). En algunos casos se han negociado precios de 1 230 US$/mes con descuento【633511135304271†L540-L552】. Los costes por contacto (~1,67 US$) son superiores a la media【633511135304271†L540-L552】.


### 3.2 Unit Economics


Con 5 000 US$ por 3 000 contactos, el coste por email es 1,67 US$. Los paquetes se venden con compromiso anual y no existen escalados basados en uso. Los hidden costs incluyen configuración, entrenamiento de agentes y soporte técnico, que pueden elevar el TCO.


### 3.3 Estrategia de empaquetado


11x ofrece un único paquete personalizado negociado en ventas asistidas. No hay free trial ni niveles transparentes. Esto obliga a contratos anuales y desalienta a pymes.


### 3.4 Señales de revenue


El newsletter Growth Unhinged informó que 11x alcanzó 2 M US$ en ARR en seis meses. La plataforma ha recaudado más de 50 M US$ en su Serie B【633511135304271†L701-L702】. Sin embargo, existen reportes de clientes que cancelan contratos por falta de ROI【1835808313976†L155-L162】.


## Sección 4: Go-to-Market Strategy

### 4.1 Posicionamiento y mensaje


11x se presenta como “AI digital worker” capaz de reemplazar a un SDR. Está dirigido a empresas que necesitan escalar outreach sin añadir personal. El mensaje apela a ejecutivos de ventas y CEOS que buscan automatización radical.


### 4.2 Segmentos de cliente


Se orienta a empresas mid‑market y enterprise con grandes listas de prospectos (10 000+). Sectores: SaaS, fintech. Casos de uso: outbound masivo y llamadas telefónicas automatizadas.


### 4.3 Moat y defensibilidad


La defensibilidad radica en sus agentes propietarios y en el modelo de “digital worker”. No obstante, la falta de transparencia y de API abierta limita la adopción. La dependencia de grandes listas reduce su eficacia en nichos. Moat ~5/10.


## Sección 5: Weaknesses & Attack Vectors

### 5.1 Gaps de producto


Mensajes percibidos como genéricos y spam, poca personalización【633511135304271†L612-L621】. Falta de control granular y ausencia de API. Usuarios informan problemas con la gestión de respuestas y baja tasa de conversión para listas pequeñas【633511135304271†L618-L624】.


### 5.2 Vulnerabilidades de pricing


Precio muy elevado con contrato anual y coste por contacto alto【633511135304271†L540-L552】. No hay planes de prueba ni paquetes para pymes. Otras herramientas como Persana ofrecen funcionalidades similares por una fracción del precio.


### 5.3 Soporte y onboarding


El modelo asiste al cliente en la configuración, pero no hay comunidad ni documentación abierta. Usuarios reportan falta de flexibilidad para modificar agentes. El soporte es controlado por el equipo de 11x y puede demorar.


### 5.4 Vulnerabilidades de posicionamiento


Al depender de listas masivas, 11x es menos útil para nichos. El alto costo reduce su penetración en SMB y startups. Cambios en normativas de privacidad o en APIs de correo podrían afectar su funcionamiento.


## Sección 6: Roadmap Signals y movimientos futuros

### 6.1 Lanzamientos recientes


En 2024 incorporaron llamadas telefónicas automáticas (Julian) y mejoras de generación de mensajes. No se conocen nuevas integraciones.


### 6.2 Análisis de ofertas de empleo


Actualmente contratan ingenieros de IA, expertos en audio y ventas empresariales, indicando expansión hacia llamadas y captura de voz.


### 6.3 Señales de fundraising & M&A


Recibieron una Serie B de 50 M US$【633511135304271†L701-L702】. Rumores apuntan a posibles adquisiciones de startups de datos para mejorar su base.


## Sección 7: Competitive Positioning Summary

### 7.1 Fortalezas


- Autonomía completa en outbound multicanal (email + llamadas).
- Agentes propietarios optimizados para grandes volúmenes.
- Integración con CRM para registro automático.
- Fuerte respaldo de inversionistas (Series B >50 M US$).


### 7.2 Debilidades


- Precios altos con contratos anuales.
- Falta de transparencia y ausencia de API.
- Poca personalización y problemas de deliverability.
- Exige grandes listas; no apto para nichos.


### 7.3 Oportunidades de diferenciación


Competidores pueden ofrecer agentes autónomos con precios accesibles y sin compromisos anuales. Añadir flexibilidad (edición de mensajes, control de respuestas) y señales de intención precisas puede atraer a clientes que consideran 11x demasiado costoso.
