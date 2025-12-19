# Cognism

## Sección 1: Product Intelligence

### 1.1 Arquitectura y stack técnico

Cognism se presenta como una plataforma de datos B2B con un enfoque especial en el mercado europeo. Sus ofertas de empleo para ingenieros de datos muestran que utilizan **Apache Spark** y **AWS Glue** para construir pipelines de datos escalables y streaming. Las microservicios están escritos principalmente en **Scala** (frameworks Play y Pekko) y se despliegan en **ECS** o **EC2**; los servicios se comunican mediante una arquitectura basada en eventos con **Kafka**. La empresa usa **AWS** (S3, DynamoDB, Lambda, Step Functions) y data lakes como **Iceberg** o **Delta** para almacenar datos históricos.

La plataforma recolecta datos de múltiples fuentes públicas y privadas, los procesa mediante modelos de aprendizaje automático y los normaliza para deduplicar registros. Cognism ofrece un **Search API** que devuelve vistas previas de contactos, y un **Redeem API** que permite obtener todos los detalles; ambos endpoints usan autenticación bearer y admiten hasta **1000 registros por minuto**. La arquitectura apoya un motor de verificación telefónica que re‑verifica los números móviles cada 18 meses para mantener su precisión.

### 1.2 Calidad de datos y métricas

Cognism se diferencia por su cobertura en Europa y un fuerte cumplimiento normativo. El proveedor asegura que su base de datos ofrece **180 % más contactos del Reino Unido** y más del **250 %** en Francia y Alemania que sus competidores. Los números móviles verificados se dicen tres veces más efectivos que los genéricos para conectar con prospectos. La compañía afirma una precisión global del **98 %** y garantiza que las listas telefónicas se re‑verifican cada 18 meses. Su cobertura se extiende a EE. UU., EMEA y APAC, aunque las reseñas indican que la calidad en Asia es menor y que algunas entradas pueden estar desactualizadas.

### 1.3 Matriz de funcionalidades

Cognism ofrece varias herramientas que combinan búsqueda, enriquecimiento y señales:

- **Prospector:** motor de búsqueda para encontrar contactos por filtros de industria, cargo, tecnología o ubicación. Incluye filtros de exclusión de competidores y función "do‑not‑call" que respeta 13 listas de exclusión nacional.
- **Enrich:** permite enriquecer datos de forma instantánea o programada; se ofrece en tres modalidades: API, actualizaciones automáticas en el CRM y procesamiento de archivos CSV.
- **Chrome extension:** extrae datos de LinkedIn y sitios web de prospectos.
- **Phone‑verified data:** Cognism valida y reconfirma números móviles para aumentar el ratio de contacto; está disponible solo en los planes de nivel superior.
- **Intent signals:** integración con **Bombora** para identificar empresas con intención de compra; permite orientar campañas a leads con interés activo.
- **Compliance y privacidad:** posee certificaciones ISO 27001, ISO 27701 y SOC 2 Type II; respeta GDPR/CCPA y listas de exclusión nacional.

## Sección 2: API y capacidades de integración

### 2.1 API pública

Cognism proporciona dos principales endpoints: **Search API** y **Redeem API**. La **Search API** acepta filtros de búsqueda (cargo, país, industria, tamaño de empresa) y devuelve datos de vista previa; el límite es de **1 000 registros por minuto** y los resultados consumen créditos de previsualización. La **Redeem API** se utiliza para obtener todos los detalles de los contactos encontrados, consumiendo un crédito por contacto y respetando el mismo límite. La autenticación se realiza mediante token bearer y las respuestas son JSON. La API también incorpora indicadores de cumplimiento (por ejemplo, señales de consentimiento) y respeta los derechos de opt‑out.

### 2.2 Integraciones nativas

Cognism se integra de forma nativa con **Salesforce**, **HubSpot**, **Pipedrive**, **Outreach**, **Salesloft**, **Microsoft Dynamics**, **Bullhorn** y **Zoho**, así como con herramientas de automatización mediante **Zapier**. La sincronización bidireccional permite actualizar el CRM con datos enriquecidos y crear automáticamente leads y contactos. Además, la plataforma se conecta con soluciones de engagement para permitir llamadas y secuencias desde un único flujo de trabajo.

### 2.3 Experiencia para desarrolladores

La documentación de la API es accesible bajo autenticación y ofrece ejemplos de llamadas. El uso de datos requiere un contrato y claves de acceso específicas. La empresa no ofrece SDK oficiales, pero la comunidad ha creado wrappers en Python y JavaScript. El portal de desarrolladores muestra estadísticas de uso y consumo de créditos.

## Sección 3: Pricing y modelo de negocio

### 3.1 Niveles de precio

El modelo de precios de Cognism es premium y se basa en licencias anuales y tarifas de acceso. El plan **Platinum** oscila entre **US$1 500 y US$10 000 anuales** por usuario, con una **tarifa de acceso de US$15 000** y un coste de **US$1 500 por usuario al año**, permitiendo un acceso a hasta **25 M de contactos**. El plan **Diamond** requiere una **tarifa de acceso de US$25 000** y un coste de **US$2 500 por usuario al año**; incluye móviles verificados, señales de intención y el conjunto completo de "Diamond Data". La empresa no ofrece un nivel gratuito, aunque suele proporcionar pruebas piloto y descuentos por volumen.

### 3.2 Unit Economics

En el plan Platinum, si un cliente paga US$15 000 + US$1 500 por usuario y accede a 25 M de contactos, el coste por contacto puede ser inferior a **US$0,001**. Sin embargo, la barrera de entrada es alta debido a las tarifas iniciales. Los usuarios pueden consumir créditos de previsualización diez veces mayores que sus créditos de redención, permitiendo evaluar listas antes de pagar.

### 3.3 Estrategia de empaquetado

Cognism se posiciona como proveedor premium con enfoque en cumplimiento y precisión. Sus paquetes agrupan acceso a la base de datos con servicios de verificación de móviles y señales de intención. La empresa vende principalmente a grandes cuentas mediante equipos de ventas consultivos y contrato anual. No existe nivel freemium, lo que refuerza la percepción de exclusividad y evita saturación de su base de datos.

### 3.4 Señales de revenue

Cognism cuenta con más de **4 000 clientes** a nivel mundial. Sus tarifas altas sugieren ingresos promedio por cliente significativos. La empresa ha recaudado capital en varias rondas y en 2022 adquirió la startup Mailtastic para ampliar su alcance en marketing. Las inversiones en verificación telefónica y en datos de intención indican que pretende consolidarse como un proveedor de inteligencia B2B premium.

## Sección 4: Go‑to‑Market Strategy

### 4.1 Posicionamiento y mensaje

Cognism se presenta como el "número uno en datos telefónicos verificados" para ventas B2B. Su mensaje enfatiza la **precisión del 98 %**, la cobertura superior en Europa y el cumplimiento riguroso de leyes de privacidad. Se posiciona contra Lusha y ZoomInfo destacando su ventaja en EMEA y su dedicación a los números móviles verificados. La integración con Bombora le permite ofrecer señales de intención que otros competidores no incluyen en el mismo paquete.

### 4.2 Segmentos de cliente

El buyer persona típico es una empresa B2B de tamaño medio a grande, especialmente aquellas que venden a mercados europeos. Los equipos de ventas que realizan llamadas outbound valoran los teléfonos verificados y la función do‑not‑call. También es atractiva para organizaciones que necesitan cumplir estrictamente con GDPR y requieren datos certificados.

### 4.3 Moat y defensibilidad

Cognism obtiene una puntuación de **8/10** en defensibilidad. Su diferenciador principal es su base de datos europea y la verificación manual de números móviles, que crea una barrera significativa para competidores. Las certificaciones ISO y el cumplimiento de 13 listas de exclusión también elevan su barrera regulatoria. Sin embargo, su alto coste y la falta de nivel freemium limitan la adopción masiva.

## Sección 5: Weaknesses & Attack Vectors

### 5.1 Gaps de producto

Cognism se enfoca en datos y no dispone de un secuenciador de correos ni de automatización avanzada. Su cobertura en APAC y LATAM es menor y algunos usuarios han reportado contactos desactualizados o con puestos incorrectos. La plataforma carece de una extensión de navegador tan robusta como la de Lusha.

### 5.2 Vulnerabilidades de pricing

El precio elevado y las tarifas de acceso iniciales limitan su mercado potencial a empresas con presupuestos altos. La falta de un nivel gratuito dificulta la prueba del producto. Los competidores pueden ofrecer planes más asequibles con coberturas aceptables para atraer a pymes.

### 5.3 Soporte y onboarding

Debido a la complejidad del producto, Cognism asigna un Customer Success Manager a cada nuevo cliente. Esto mejora la experiencia, pero puede hacer que la implementación sea lenta. Algunos usuarios mencionan que la configuración inicial requiere formación especializada y que la API no está disponible sin acuerdos de licencia.

### 5.4 Vulnerabilidades de posicionamiento

Al centrarse tanto en el mercado europeo, Cognism podría quedar fuera de consideración para empresas centradas en América del Norte. Además, su alta exigencia de precios puede abrir la puerta a competidores con ofertas "good enough". La percepción de exclusividad puede ser un arma de doble filo.

## Sección 6: Roadmap Signals y movimientos futuros

### 6.1 Lanzamientos recientes

En los últimos 12 meses Cognism ha mejorado su API de búsqueda y redención, permitiendo filtros más precisos y exportaciones masivas. Ha integrado señales de intención de Bombora en su prospector y ha lanzado funciones de verificación telefónica en tiempo real para sus clientes Diamond. También ha reforzado su cumplimiento añadiendo más listas de exclusión y actualizando certificaciones.

### 6.2 Análisis de ofertas de empleo

Las vacantes recientes buscan ingenieros de datos con experiencia en **Spark**, **AWS Glue**, microservicios en Scala y arquitecturas event‑driven. Esto sugiere que Cognism planea escalar su plataforma y mejorar sus pipelines en streaming. También contratan especialistas en protección de datos, lo que indica foco continuo en privacidad y cumplimiento.

### 6.3 Señales de fundraising & M&A

En 2021 la empresa recaudó una ronda Serie C y no ha anunciado nuevas rondas recientes. Sin embargo, adquirió la empresa Mailtastic para ampliar su oferta de marketing y existe rumor de nuevas adquisiciones para integrar señales de intención adicionales. La consolidación del mercado podría llevarla a ser objetivo de compra por un actor más grande.

## Sección 7: Competitive Positioning Summary

### 7.1 Fortalezas

- Cobertura líder en Europa con más de 180 % más contactos en el Reino Unido y 250 % en Francia y Alemania que la competencia.
- Verificación telefónica que garantiza móviles válidos, re‑verificados cada 18 meses.
- Precisión global del 98 % y certificaciones ISO/SOC.
- Integración con Bombora para señales de intención.
- Arquitectura moderna de microservicios en Scala y AWS.

### 7.2 Debilidades

- Altos precios y tarifas de acceso iniciales.
- Falta de secuenciador de correos y herramientas de engagement.
- Cobertura limitada en APAC y LATAM.
- No hay plan freemium ni versión de prueba abierta.

### 7.3 Oportunidades de diferenciación

- Ofrecer un plan de entrada o prueba gratuita para atraer pymes.
- Invertir en datos de Asia y Latinoamérica para ampliar su alcance.
- Desarrollar herramientas de engagement básicas o integraciones más profundas con secuenciadores.

### 7.4 Tier asignado

**Tier 2 (secundario)** – Cognism domina el segmento europeo y ofrece datos telefónicos verificados con gran precisión, pero su precio elevado y la falta de funcionalidades de engagement limitan su alcance global.
