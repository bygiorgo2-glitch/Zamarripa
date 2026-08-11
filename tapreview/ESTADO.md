# Estado del proyecto — TapReview™ (pna0bd-j1.myshopify.com)

- Tienda: pna0bd-j1.myshopify.com
- Panel: https://admin.shopify.com/store/pna0bd-j1
- Carpeta: /home/user/Zamarripa/tapreview
- Tema base: Dawn (descargado 2026-08-11, vía git clone de Shopify/dawn)
- Entorno: Node v22.22.2, Shopify CLI 4.6.1 — OK (contenedor remoto en la nube)
- Cuenta conectada: bygiorgo2@gmail.com
- Última publicación: (pendiente)
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
- [ ] 3 Diseño (mensaje 2 al usuario — propuesta de estilo, pendiente de enviar)
- [ ] 4 Construcción
- [ ] 5 Páginas
- [ ] 6 Publicación

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
(pendiente)
