/**
 * Referencia de mercado (ejemplo en CLP). En producción: API por ciudad.
 */
window.TRABAJO_DATA = {
  CATEGORIAS: [
    { id: "jardinero", label: "Jardinero / jardinería" },
    { id: "plomero", label: "Plomero" },
    { id: "electricista", label: "Electricista" },
    { id: "limpieza", label: "Limpieza del hogar" },
    { id: "pintor", label: "Pintor" },
    { id: "carpintero", label: "Carpintero" },
    { id: "otro", label: "Otro oficio" },
  ],
  FRECUENCIAS: [
    { id: "unica", label: "Solo una vez" },
    { id: "semana1", label: "1 vez por semana" },
    { id: "semana2", label: "2 veces por semana" },
    { id: "mes1", label: "1 vez al mes" },
  ],
  TABLA_PRECIOS: {
    jardinero: {
      unica: { min: 28000, avg: 42000 },
      semana1: { min: 22000, avg: 32000 },
      semana2: { min: 40000, avg: 55000 },
      mes1: { min: 85000, avg: 110000 },
    },
    plomero: {
      unica: { min: 35000, avg: 55000 },
      semana1: { min: 45000, avg: 65000 },
      semana2: { min: 80000, avg: 110000 },
      mes1: { min: 120000, avg: 160000 },
    },
    electricista: {
      unica: { min: 40000, avg: 65000 },
      semana1: { min: 50000, avg: 75000 },
      semana2: { min: 90000, avg: 125000 },
      mes1: { min: 140000, avg: 190000 },
    },
    limpieza: {
      unica: { min: 25000, avg: 38000 },
      semana1: { min: 30000, avg: 42000 },
      semana2: { min: 55000, avg: 72000 },
      mes1: { min: 70000, avg: 95000 },
    },
    pintor: {
      unica: { min: 45000, avg: 70000 },
      semana1: { min: 60000, avg: 85000 },
      semana2: { min: 110000, avg: 150000 },
      mes1: { min: 160000, avg: 220000 },
    },
    carpintero: {
      unica: { min: 40000, avg: 65000 },
      semana1: { min: 55000, avg: 80000 },
      semana2: { min: 100000, avg: 140000 },
      mes1: { min: 150000, avg: 200000 },
    },
    otro: {
      unica: { min: 30000, avg: 45000 },
      semana1: { min: 35000, avg: 50000 },
      semana2: { min: 60000, avg: 85000 },
      mes1: { min: 90000, avg: 120000 },
    },
  },
  obtenerPreciosSugeridos(categoriaId, frecuenciaId) {
    const cat = this.TABLA_PRECIOS[categoriaId] || this.TABLA_PRECIOS.otro;
    const row = cat[frecuenciaId] || cat.unica;
    return { min: row.min, avg: row.avg };
  },
  formatMoney(n) {
    return new Intl.NumberFormat("es-419", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(n);
  },
  labelCategoria(id) {
    const c = this.CATEGORIAS.find((x) => x.id === id);
    return c ? c.label : id;
  },
  labelFrecuencia(id) {
    const f = this.FRECUENCIAS.find((x) => x.id === id);
    return f ? f.label : id;
  },
};
