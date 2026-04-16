(function () {
  const D = window.TRABAJO_DATA;
  const LS_TECNICOS = "trabajun_tecnicos";
  const LS_SOLICITUDES = "trabajun_solicitudes";

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function id() {
    return "id_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
  }

  function showPage(pageId) {
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.toggle("active", p.id === "page-" + pageId);
    });
    window.scrollTo(0, 0);
  }

  function fillSelect(selectEl, items, placeholder) {
    selectEl.innerHTML = "";
    if (placeholder) {
      const o = document.createElement("option");
      o.value = "";
      o.textContent = placeholder;
      selectEl.appendChild(o);
    }
    items.forEach((item) => {
      const o = document.createElement("option");
      o.value = item.id;
      o.textContent = item.label;
      selectEl.appendChild(o);
    });
  }

  function updatePriceHint() {
    const cat = document.getElementById("sol-categoria").value;
    const freq = document.getElementById("sol-frecuencia").value;
    if (!cat || !freq) return;
    const { min, avg } = D.obtenerPreciosSugeridos(cat, freq);
    document.getElementById("hint-min").textContent = D.formatMoney(min);
    document.getElementById("hint-avg").textContent = D.formatMoney(avg);
    const input = document.getElementById("sol-oferta");
    input.min = String(min);
    input.placeholder = "Mínimo sugerido: " + D.formatMoney(min);
    if (!input.value || Number(input.value) < min) {
      input.value = String(avg);
    }
  }

  function renderMatches() {
    const solicitudes = loadJson(LS_SOLICITUDES, []);
    const tecnicos = loadJson(LS_TECNICOS, []);
    const list = document.getElementById("lista-matches");
    list.innerHTML = "";

    if (solicitudes.length === 0) {
      list.innerHTML =
        '<p class="empty-state">Aún no hay solicitudes. Crea una desde «Nueva solicitud».</p>';
      return;
    }

    const last = solicitudes[solicitudes.length - 1];
    const matches = tecnicos.filter((t) => {
      if (!t.categorias.includes(last.categoriaId)) return false;
      const pide = Number(last.oferta);
      const cobra = Number(t.precioPorVisita);
      return cobra <= pide;
    });

    const head = document.createElement("p");
    head.className = "subtitle";
    head.style.marginBottom = "1rem";
    head.innerHTML =
      "<strong>Última solicitud:</strong> " +
      D.labelCategoria(last.categoriaId) +
      " · " +
      D.labelFrecuencia(last.frecuenciaId) +
      " · Oferta " +
      D.formatMoney(last.oferta);
    list.appendChild(head);

    if (matches.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent =
        "No hay técnicos registrados que coincidan con esta categoría y acepten tu oferta. " +
        "Prueba subir la oferta o vuelve más tarde.";
      list.appendChild(empty);
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "list";
    matches
      .slice()
      .sort((a, b) => Number(a.precioPorVisita) - Number(b.precioPorVisita))
      .forEach((t) => {
        const li = document.createElement("li");
        li.innerHTML =
          "<strong>" +
          escapeHtml(t.nombre) +
          '</strong><span class="badge">Compatible</span>' +
          '<div class="meta">' +
          "Pide " +
          D.formatMoney(t.precioPorVisita) +
          " por visita · " +
          escapeHtml(t.zona || "Zona no indicada") +
          (t.nota ? " · " + escapeHtml(t.nota) : "") +
          "</div>";
        ul.appendChild(li);
      });
    list.appendChild(ul);
  }

  function renderSolicitudesTecnico() {
    const filtro = document.getElementById("tec-filtro-cat").value;
    const solicitudes = loadJson(LS_SOLICITUDES, []);
    const list = document.getElementById("lista-solicitudes-abiertas");
    list.innerHTML = "";

    const filtradas = filtro
      ? solicitudes.filter((s) => s.categoriaId === filtro)
      : solicitudes;

    if (filtradas.length === 0) {
      list.innerHTML =
        '<p class="empty-state">No hay solicitudes en esta categoría todavía.</p>';
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "list";
    filtradas
      .slice()
      .reverse()
      .forEach((s) => {
        const li = document.createElement("li");
        li.innerHTML =
          "<strong>" +
          D.labelCategoria(s.categoriaId) +
          "</strong>" +
          '<div class="meta">' +
          D.labelFrecuencia(s.frecuenciaId) +
          " · Oferta " +
          D.formatMoney(s.oferta) +
          (s.zona ? " · " + escapeHtml(s.zona) : "") +
          (s.detalles ? "<br>" + escapeHtml(s.detalles) : "") +
          "</div>";
        ul.appendChild(li);
      });
    list.appendChild(ul);
  }

  function escapeHtml(s) {
    if (!s) return "";
    const d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillSelect(
      document.getElementById("sol-categoria"),
      D.CATEGORIAS,
      "Elige oficio…"
    );
    fillSelect(
      document.getElementById("sol-frecuencia"),
      D.FRECUENCIAS,
      "Elige frecuencia…"
    );
    fillSelect(document.getElementById("tec-categoria-main"), D.CATEGORIAS, null);
    fillSelect(
      document.getElementById("tec-filtro-cat"),
      [{ id: "", label: "Todas las categorías" }, ...D.CATEGORIAS],
      null
    );

    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const page = this.getAttribute("data-nav");
        showPage(page);
        if (page === "matches") renderMatches();
        if (page === "tecnico") renderSolicitudesTecnico();
      });
    });

    document.getElementById("sol-categoria").addEventListener("change", updatePriceHint);
    document.getElementById("sol-frecuencia").addEventListener("change", updatePriceHint);

    document.getElementById("form-solicitud").addEventListener("submit", function (e) {
      e.preventDefault();
      const categoriaId = document.getElementById("sol-categoria").value;
      const frecuenciaId = document.getElementById("sol-frecuencia").value;
      const { min } = D.obtenerPreciosSugeridos(categoriaId, frecuenciaId);
      const oferta = Number(document.getElementById("sol-oferta").value);
      if (!categoriaId || !frecuenciaId) {
        alert("Elige oficio y frecuencia.");
        return;
      }
      if (oferta < min) {
        alert(
          "Tu oferta no puede ser menor al mínimo sugerido (" +
            D.formatMoney(min) +
            "). Puedes ofrecer más si quieres."
        );
        return;
      }
      const solicitudes = loadJson(LS_SOLICITUDES, []);
      solicitudes.push({
        id: id(),
        categoriaId,
        frecuenciaId,
        oferta,
        zona: document.getElementById("sol-zona").value.trim(),
        detalles: document.getElementById("sol-detalles").value.trim(),
        creado: new Date().toISOString(),
      });
      saveJson(LS_SOLICITUDES, solicitudes);
      showPage("matches");
      renderMatches();
    });

    document.getElementById("form-tecnico").addEventListener("submit", function (e) {
      e.preventDefault();
      const nombre = document.getElementById("tec-nombre").value.trim();
      const categoriaId = document.getElementById("tec-categoria-main").value;
      const precio = Number(document.getElementById("tec-precio").value);
      if (!nombre || !categoriaId || !precio || precio <= 0) {
        alert("Completa nombre, oficio principal y precio por visita.");
        return;
      }
      const extra = document.getElementById("tec-categorias-extra").value;
      const categorias = [categoriaId];
      extra
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((slug) => {
          if (D.CATEGORIAS.some((c) => c.id === slug) && !categorias.includes(slug)) {
            categorias.push(slug);
          }
        });

      const tecnicos = loadJson(LS_TECNICOS, []);
      tecnicos.push({
        id: id(),
        nombre,
        categorias,
        precioPorVisita: precio,
        zona: document.getElementById("tec-zona").value.trim(),
        nota: document.getElementById("tec-nota").value.trim(),
        creado: new Date().toISOString(),
      });
      saveJson(LS_TECNICOS, tecnicos);
      alert("¡Listo! Ya apareces en las búsquedas cuando un cliente ofrezca al menos tu precio.");
      this.reset();
      fillSelect(document.getElementById("tec-categoria-main"), D.CATEGORIAS, null);
    });

    document.getElementById("tec-filtro-cat").addEventListener("change", renderSolicitudesTecnico);

    document.getElementById("btn-demo-data").addEventListener("click", function () {
      if (!confirm("Cargar datos de ejemplo (reemplaza listas guardadas)?")) return;
      saveJson(LS_TECNICOS, [
        {
          id: id(),
          nombre: "Ana Ríos",
          categorias: ["jardinero"],
          precioPorVisita: 30000,
          zona: "Providencia",
          nota: "Podas, riego, abono.",
          creado: new Date().toISOString(),
        },
        {
          id: id(),
          nombre: "Luis Morales",
          categorias: ["jardinero", "limpieza"],
          precioPorVisita: 25000,
          zona: "Ñuñoa",
          nota: "",
          creado: new Date().toISOString(),
        },
      ]);
      saveJson(LS_SOLICITUDES, []);
      alert("Datos de ejemplo cargados. Crea una solicitud de jardinero para ver coincidencias.");
    });

    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("/sw.js").catch(function () {});
    }
  });
})();
