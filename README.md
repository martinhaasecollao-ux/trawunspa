# Trawun SPA (trawunspa.cl)

Prototipo web (celular y escritorio) que conecta **clientes** con **técnicos** por oficio: frecuencia del servicio, referencia de precio y oferta del cliente.

**Objetivo:** que al entrar a **https://www.trawunspa.cl/** se vea **esta web** (la que está en GitHub Pages), no otra redirección.

---

## Cómo dejar `www.trawunspa.cl` → esta web

### 1. GitHub (repo `trawunspa`)

1. **Settings → Pages**
2. **Build:** Branch `main`, carpeta **`/ (root)`**
3. **Custom domain:** escribí **`www.trawunspa.cl`** y guardá. GitHub lee el archivo **`CNAME`** del repo (ya está en el proyecto).
4. Esperá a que el chequeo DNS pase y se genere el certificado **HTTPS** (puede tardar minutos u horas).

### 2. DNS en NIC (o donde tengas el dominio `.cl`)

Para que **`www`** apunte a tu sitio en GitHub:

| Tipo   | Nombre / host | Valor / destino              |
|--------|---------------|------------------------------|
| CNAME  | `www`         | `martinhaasecollao-ux.github.io` |

**Importante:** si en algún momento configuraste una **redirección web** de `www.trawunspa.cl` a Instagram (u otra URL), **sacala o desactivala** en el panel del dominio. Si no, puede pelear con GitHub Pages.

No hace falta que el CNAME apunte a `github.io/trawunspa`: con **`usuario.github.io`** alcanza; GitHub usa el archivo `CNAME` del repo para saber qué sitio mostrar en `www.trawunspa.cl`.

### 3. Probar

- `https://martinhaasecollao-ux.github.io/trawunspa/` — URL de GitHub (siempre debería cargar la misma web).
- `https://www.trawunspa.cl/` — cuando el DNS y Pages estén bien, es **la misma app**, en tu dominio.

### 4. Solo `trawunspa.cl` (sin `www`)

En **Pages → Custom domain** podés activar que el apex redirija a `www`. En DNS del dominio raíz seguí la [guía oficial de GitHub para dominio apex](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

---

## Otro hosting

Si más adelante movés el sitio fuera de GitHub, cambiá el DNS según lo que indique el nuevo proveedor. Las rutas del proyecto usan **`/`** como raíz, adecuado para `https://www.trawunspa.cl/`.
