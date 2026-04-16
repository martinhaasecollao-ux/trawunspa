# Trawun SPA (trawunspa.cl)

Prototipo web (celular y escritorio) que conecta **clientes** con **técnicos** por oficio: frecuencia del servicio, referencia de precio y oferta del cliente.

Sitio pensado para publicarse en **`https://www.trawunspa.cl/`** (HTTPS activa la PWA / instalación en el teléfono).

## Dominio www.trawunspa.cl

### Si usás GitHub Pages

1. Subí este repo a GitHub y activá **Pages** (rama `main`, carpeta raíz).
2. En el repo: **Settings → Pages → Custom domain** → `www.trawunspa.cl` (GitHub usa el archivo `CNAME`).
3. En tu proveedor DNS (donde compraste **trawunspa.cl**), creá un registro:
   - **Tipo:** `CNAME`
   - **Nombre / host:** `www`
   - **Valor / destino:** `TU_USUARIO.github.io` (reemplazá por tu usuario u organización de GitHub).

Para el dominio **sin** `www` (`trawunspa.cl`), en GitHub Pages conviene configurar redirección en la misma sección de Pages; en DNS del apex seguí la [documentación de GitHub para dominio raíz](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Si usás otro hosting (Netlify, Cloudflare Pages, cPanel, etc.)

Apuntá **`www.trawunspa.cl`** al servicio que te indiquen (CNAME o IP). Las rutas del proyecto usan **`/`** como raíz del sitio, adecuado para ese dominio.
