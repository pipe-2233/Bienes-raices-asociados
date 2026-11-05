# Bienes Raíces Asociados — sitio web

Sitio de una sola página para **Bienes Raíces Asociados**, inmobiliaria de Tuluá (Valle del Cauca) que vende lotes campestres y terrenos de inversión.

La página funciona como una vitrina de proyectos activos (al estilo de una tienda en línea): filtros por ubicación y tipo, búsqueda y orden por precio o área. Al tocar un proyecto se abre una ventana flotante con fotos, características, modos de financiación, ubicación y precio. El botón **Agenda tu cita** del encabezado arma el mensaje y lo envía por WhatsApp.

Hecho con HTML, CSS y JavaScript sin frameworks ni proceso de build. Se adapta a celular, tablet y computador, e incluye animaciones que se desactivan si el sistema pide reducir movimiento.

## Estructura

```
├── index.html            Página principal
├── 404.html              Página de error para Netlify
├── css/
│   └── styles.css        Estilos, animaciones y responsive
├── js/
│   ├── projects.js       Datos de los proyectos (aquí se agregan o editan)
│   └── main.js           Vitrina, filtros, ventanas flotantes, agenda y animaciones
├── assets/
│   ├── img/              Fotos de los proyectos e imagen para redes (og-image.jpg)
│   └── logo/             Logo, favicon e ícono para iPhone
├── netlify.toml          Configuración de despliegue y caché
└── robots.txt
```

## Verlo en local

Abre `index.html` en el navegador, o levanta un servidor simple:

```bash
npx serve .
# o
python -m http.server 8000
```

## Publicar en Netlify

1. En Netlify: **Add new site → Import an existing project → GitHub** y elige este repositorio.
2. Deja **Build command** vacío y **Publish directory** en `.` (ya viene en `netlify.toml`).
3. **Deploy**. Cada `git push` a `main` vuelve a publicar el sitio.

También se puede arrastrar la carpeta completa a [app.netlify.com/drop](https://app.netlify.com/drop).

## Editar contenido

- **Proyectos:** se editan en `js/projects.js`. Cada proyecto es un bloque `{ ... }` con precio, área, financiación, fotos, características y ubicación. Para agregar uno, copia un bloque, cambia el `id` y los datos, y pon sus fotos en `assets/img/`. La tarjeta, los filtros y la ventana de detalle se generan solos.
- **Enlace directo a un proyecto:** `https://tu-sitio.netlify.app/#p-samanes` abre la ficha de ese proyecto.
- **WhatsApp:** buscar `573106544931` y reemplazar el número.
- **Colores y tipografías:** variables al inicio de `css/styles.css` (`--navy`, `--sun`, etc.).
- **Después de editar CSS o JS:** sube el número de versión en `index.html` (`styles.css?v=3` → `?v=4`, igual en los `.js`) para que los celulares no muestren la versión anterior guardada.
- **Fotos:** reemplazar los archivos de `assets/img/` manteniendo el nombre.

## Puntos de quiebre

| Ancho | Diseño |
| --- | --- |
| > 960 px | PC y laptop: filtros en barra lateral, cuadrícula de proyectos, ficha flotante en dos columnas |
| ≤ 960 px | Tablet: menú hamburguesa, filtros desplegables y chips de ubicación |
| ≤ 720 px | La ficha y la agenda se abren como hoja inferior que se cierra deslizando hacia abajo |
| ≤ 600 px | Celular: proyectos en lista (foto a la izquierda) y botón flotante de WhatsApp |

---
Contacto del cliente: WhatsApp 310 654 4931 · Instagram [@bienesraicessociedad](https://www.instagram.com/bienesraicessociedad/)
