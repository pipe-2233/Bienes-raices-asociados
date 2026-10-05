# Bienes Raíces Asociados — sitio web

Sitio de una sola página para **Bienes Raíces Asociados**, inmobiliaria de Tuluá (Valle del Cauca) que vende lotes campestres y terrenos de inversión.

Hecho con HTML, CSS y JavaScript sin frameworks ni proceso de build. Se adapta a celular, tablet y computador, e incluye animaciones de aparición que se desactivan si el sistema pide reducir movimiento.

## Estructura

```
├── index.html            Página principal
├── 404.html              Página de error para Netlify
├── css/
│   └── styles.css        Estilos, animaciones y responsive
├── js/
│   └── main.js           Menú móvil, header, contadores y animaciones al hacer scroll
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

- **Proyectos:** cada tarjeta es un `<article class="card">` dentro de `#proyectos` en `index.html`.
- **WhatsApp:** buscar `573106544931` y reemplazar el número.
- **Colores y tipografías:** variables al inicio de `css/styles.css` (`--navy`, `--sun`, etc.).
- **Fotos:** reemplazar los archivos de `assets/img/` manteniendo el nombre.

## Puntos de quiebre

| Ancho | Diseño |
| --- | --- |
| > 1100 px | Escritorio: 3 columnas de proyectos, 4 razones |
| 961 – 1100 px | Laptop: 2 columnas |
| ≤ 960 px | Menú hamburguesa |
| ≤ 860 px | Tablet: secciones a una columna |
| ≤ 600 px | Celular: tarjetas en una columna, botón flotante de WhatsApp |

---
Contacto del cliente: WhatsApp 310 654 4931 · Instagram [@bienesraicessociedad](https://www.instagram.com/bienesraicessociedad/)
