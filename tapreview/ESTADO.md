# Estado del proyecto — TapReview™ (pna0bd-j1.myshopify.com)

- Tienda: pna0bd-j1.myshopify.com
- Panel: https://admin.shopify.com/store/pna0bd-j1
- Carpeta: /home/user/Zamarripa/tapreview
- Tema base: Dawn (descargado 2026-08-11, vía git clone de Shopify/dawn)
- Entorno: Node v22.22.2, Shopify CLI 4.6.1 — OK (contenedor remoto en la nube)
- Cuenta conectada: bygiorgo2@gmail.com
- Última publicación: (pendiente — tema en preview, esperando OK del usuario para publicar en vivo)
- Tema de trabajo (no publicado): "TapReview (Claude)" — ID 153640992856
  - Previsualización: https://pna0bd-j1.myshopify.com?preview_theme_id=153640992856
  - Editor: https://pna0bd-j1.myshopify.com/admin/themes/153640992856/editor

## Notas técnicas del entorno (importante para continuar la sesión)
- Esta sesión corre en un contenedor remoto (Claude Code on the web), no en el
  ordenador del usuario. El entorno tenía bloqueado por política de red el
  acceso a Shopify; el usuario lo desbloqueó desde la configuración del
  entorno en claude.ai/code (añadió shopify.com, accounts.shopify.com,
  *.myshopify.com, admin.shopify.com, cdn.shopify.com).
- Los comandos `shopify` y los scripts .mjs que hacen fetch necesitan
  `NODE_USE_ENV_PROXY=1` en el entorno para respetar el proxy de salida
  (si no, dan HTTP 403 aunque el dominio esté permitido). SIEMPRE anteponer
  `NODE_USE_ENV_PROXY=1` a estos comandos en esta sesión.
- El login del tema (`shopify theme list`) usa flujo de código de dispositivo:
  funciona pegando el enlace que imprime la consola.
- El login de datos (`shopify store auth`) usa un redirect a
  `http://127.0.0.1:PUERTO/auth/callback` que NO es alcanzable desde el
  navegador del usuario (está en su propio ordenador). Solución que funcionó:
  el usuario abre la URL de autorización, la página final falla al cargar
  pero la barra de direcciones muestra la URL de callback con `code=...`;
  el usuario pega esa URL aquí y se repite la petición con `curl` contra
  `127.0.0.1:PUERTO` dentro de este contenedor (donde sí está escuchando el
  CLI). Así se completa el login sin que el usuario tenga que instalar nada.
- Se creó un `xdg-open` falso en
  `/tmp/.../scratchpad/bin/xdg-open` (en el PATH) para que el CLI no falle
  al intentar abrir un navegador que no existe en este contenedor.
- Sesión de datos (`store auth`) autorizada con scopes:
  read_products,write_products,read_files,write_files.
- Token de `store auth` caduca en ~24h — si falla con 401, repetir el mismo
  proceso de login (device code / callback manual).

## Producto leído (sondeo fase 1)
- Producto elegido (el más completo, ACTIVO, con inventario real):
  - id: gid://shopify/Product/8922706772056
  - handle: hilo-programmable-nfc-215-square-for-google-review-card-nfc-station-table-13-56mhz-qr-code-editable-standing-card
  - título actual (a mejorar): "TapReview™ Placa inteligente para opiniones en Google"
  - Qué es: placa/tarjeta cuadrada de 12x12cm con chip NFC + código QR. El
    cliente acerca el celular (NFC) o escanea el QR y se le abre directo el
    cuadro de reseña de Google (también hay variantes para Facebook e
    Instagram). Pensado para negocios locales (restaurantes, salones,
    tiendas) que quieren conseguir más reseñas de 5 estrellas sin fricción.
  - Variantes: Google Blanco, Google Negro, Facebook, Instagram — $349 c/u,
    40 en inventario total.
  - Fotos descargadas en `fotos-producto/` (8 fotos, producto-1.jpg a
    producto-8.jpg): muestran el diseño frontal/trasero, el gesto de tap NFC,
    el QR, y la pantalla de reseña de Google abriéndose en el celular.
  - Hay un SEGUNDO producto duplicado (gid://shopify/Product/8922679967832,
    inventario 0, no disponible para venta) que parece un resto de una
    importación — se ignora, no se toca.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión + sondeo de producto
- [x] 2 Proyecto (Dawn descargado, fotos del producto descargadas)
- [x] 3 Diseño (propuesta confirmada por el usuario) + 3b Fotos IA (14 fotos generadas con gpt-image-2)
- [x] 4 Construcción (7 secciones propias + CSS/JS globales)
- [x] 5 Páginas (producto completo y asignado, header/footer, favicon)
- [ ] 6 Publicación (subido como borrador y auto-revisado; falta el OK del usuario para publicar en vivo)

## Decisiones de diseño (propuesta enviada, pendiente de confirmación del usuario)
- Público: dueños de negocios locales (restaurantes, salones, tiendas,
  consultorios) que quieren más reseñas de Google/Facebook/Instagram.
- Tono: tecnológico, profesional, orientado a resultados/conversión (no
  "tienda de moda"). Mensaje central: rápido, sin fricción, sube ingresos.
- Paleta: blanco limpio de base + azul vivo #4285F4 (heredado del propio
  producto/Google) como acento y botones + banda(s) en azul marino casi
  negro #0B0F19 para contraste tipo "tech".
- Tipografía: sans-serif geométrica grande y bold para titulares (estilo
  Inter/Sora), texto de apoyo más ligero.
- Fotos: son renders de proveedor, limpios y correctos para explicar el
  producto (tap NFC, QR, mockup de pantalla de reseña), pero con aire de
  catálogo genérico. Se ofreció generar fotos de ambiente con IA
  (opcional).
- Estructura de portada propuesta:
  1. Hero: tarjeta flotante + claim + CTA
  2. Banda de cifras (7-15% más ingresos, 44% más clientes, <10s)
  3. Cómo funciona en 3 pasos (con los iconos reales del producto)
  4. Elige tu color (blanco/negro) + variantes de red social
  5. Prueba social: carrusel estilo capturas de reseña real
  6. Para quién es (grid de tipos de negocio)
  7. CTA final + producto/precio/comprar

## Secciones creadas
- `sections/mt-hero.liquid` — banner ancho a sangre (imagen `assets/mt-hero-banner.jpg` generada con IA), capa oscura semitransparente editable, título/subtítulo/CTAs/confianza.
- `sections/mt-cifras.liquid` — banda oscura con 3-4 cifras animadas (count-up al hacer scroll).
- `sections/mt-como-funciona.liquid` — 3 pasos, un bloque por paso, una foto IA específica por bloque (`mt-paso-1/2/3.jpg`).
- `sections/mt-colores.liquid` — comparador blanco/negro, 2 bloques, fotos IA `mt-color-blanco.jpg` / `mt-color-negro.jpg`.
- `sections/mt-resenas.liquid` — carrusel de testimonios (texto en bloques editables, sin texto quemado en imagen; avatar con inicial o foto opcional).
- `sections/mt-para-quien.liquid` — grid de 4 tipos de negocio con iconos SVG inline (select editable).
- `sections/mt-cta-final.liquid` — cierre con producto real (precio dinámico) enlazado a la ficha.
- `sections/mt-producto.liquid` — página de producto completa: galería real del catálogo, variantes dinámicas (JS probado con Playwright: cambia precio/id y el "Añadir al carrito" funciona de verdad), características, descripción rica, qué incluye.
- `sections/footer.liquid` (reescrita) + `sections/footer-group.json` — footer propio con marca, navegación, legal y pagos.
- `assets/mt-styles.css` / `assets/mt-scripts.js` — tokens de diseño, reveals de scroll, contador animado, carrusel, tilt 3D, lógica de variantes y galería. **Importante**: el `<script>` que carga `mt-scripts.js` va en `layout/theme.liquid` (se me olvidó la primera vez — sin él, ninguna animación funciona; ya está corregido y verificado).
- `templates/index.json` — portada con las 7 secciones en orden.
- `templates/product.mt.json` — plantilla de producto (`principal` + `como-funciona` + `resenas`), sufijo `mt` ya asignado al producto vía Admin API.
- `layout/theme.liquid` — favicon (`mt-favicon.png`) + carga global de `mt-scripts.js`.
- `config/settings_data.json` — esquemas de color (azul #3d7bfb / marino #0a1420), tipografía (Poppins títulos / Work Sans cuerpo), radios redondeados en botones/tarjetas — aplicado también a carrito/búsqueda nativos de Dawn.

## Fotos generadas con IA (gpt-image-2, coste aprox. bajo, quedan detalladas por si se regeneran)
Todas en `assets/`, mismo set de luz/mármol/fondo azul marino para que combinen entre sí:
`mt-hero-banner.jpg` (calidad high, 1536x1024), `mt-paso-1.jpg`, `mt-paso-2.jpg`, `mt-paso-3.jpg`,
`mt-color-blanco.jpg`, `mt-color-negro.jpg`, `mt-cta-producto.jpg`, `mt-favicon.png` (todas medium/high, 1024x1024 salvo indicado).

## Auto-revisión realizada (fase 6)
- Usada `shopify theme dev` + Playwright (Chromium headless, con `--no-sandbox`) para capturar la portada y
  la página de producto por secciones (el acceso de red saliente de Chromium a internet externo está bloqueado
  en este contenedor, así que la revisión visual se hizo contra `http://127.0.0.1:9292`, no en el dominio público).
- Encontrados y corregidos 2 bugs reales antes de enseñar nada al usuario:
  1. Faltaba la etiqueta `<script>` de `mt-scripts.js` en `theme.liquid` — nada de lo que dependía de JS
     (reveals, contador, carrusel, variantes) funcionaba. Corregido.
  2. Icono de "Salones y barberías" (tijeras) mal dibujado, salía como una X. Corregido.
  3. Títulos de columna del footer invisibles (heredaban mal el color por una regla de Dawn que targetea
     `h3` directamente). Corregido con `color: inherit` explícito.
- Probado funcionalmente con Playwright: cambio de variante actualiza precio/id, y "Añadir al carrito"
  agrega de verdad el producto correcto al carrito real de la tienda.
- 4º bug encontrado y corregido: el título del hero se veía casi invisible (texto oscuro sobre fondo
  oscuro). Causa: mi propia regla `.mt-section h1, .mt-section h2, .mt-section h3, .mt-eyebrow, .mt-h2,
  .mt-h3 { color: inherit; }` (añadida para arreglar el bug del footer) tenía MÁS especificidad CSS que
  `.mt-hero-titulo { color: #fff; }` (selector descendiente `.mt-section h2` vs una sola clase), así que
  ganaba y el título heredaba el color oscuro global del body. Arreglado añadiendo la clase `mt-oscuro` a
  la sección del hero (mismo patrón que ya usa `mt-cta-final`), para que el color claro se herede de un
  ancestro más cercano. Ojo con este patrón si se añaden más títulos blancos sobre fondo oscuro en el
  futuro: o llevan la clase `mt-oscuro` en su sección, o su regla de color necesita más especificidad que
  `.mt-section h2`.
- Push final limpio (sin errores) al tema de trabajo "TapReview (Claude)" — ID 153640992856.

## Pendiente / para el usuario
- **Publicar en vivo**: el tema está en borrador, a la espera de que el usuario confirme el diseño desde
  la previsualización para publicarlo (`shopify theme publish`).
- **Páginas legales de texto libre** (Aviso legal y Política de cookies): no son nativas de Shopify y esta
  sesión no pidió permiso de escritura de contenido (`write_content`), así que no se crearon automáticamente.
  Privacidad, Términos, Devoluciones y Envíos SÍ son nativas y ya están enlazadas en el footer (se rellenan
  en Panel → Configuración → Políticas). Se le dará al usuario el texto de Aviso legal/Cookies para pegar en
  Panel → Contenido → Páginas, en 3 pasos.
- **Logo real en el header**: por ahora el header muestra el nombre de la tienda en texto (Dawn necesita
  subir el logo a Contenido/Archivos, algo que solo puede hacerse con permisos de contenido). El favicon
  (icono "TR") sí quedó puesto automáticamente.
- Redes sociales del footer (Instagram/Facebook/TikTok) se muestran solo si el usuario las configura en
  Tema → Ajustes del tema → Redes sociales (están vacías por defecto, es normal que no se vean iconos aún).
