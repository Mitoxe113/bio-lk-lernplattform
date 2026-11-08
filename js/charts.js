/* =========================================================================
   SVG-Diagrammhilfen und Kurvenmodelle (Enzymkinetik, Temperatur, pH)
   ========================================================================= */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) { if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]); }
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ---- Kurvenmodelle ---- */
  const curves = {
    // Michaelis-Menten
    mm: (S, vmax, km) => vmax * S / (km + S),
    // kompetitive Hemmung: KM scheinbar erhöht
    comp: (S, vmax, km, I, Ki) => vmax * S / (km * (1 + I / Ki) + S),
    // nicht-kompetitive Hemmung: vmax erniedrigt
    noncomp: (S, vmax, km, I, Ki) => (vmax / (1 + I / Ki)) * S / (km + S),
    // Temperatur: RGT-Anstieg × Denaturierung (Sigmoid)
    temp: (T, opt, q10) => {
      opt = opt == null ? 40 : opt; q10 = q10 || 2.2;
      const rgt = Math.pow(q10, (T - opt) / 10);
      const den = 1 / (1 + Math.exp((T - (opt + 4)) / 2.2));
      const norm = 1 / (1 + Math.exp(-4 / 2.2));
      return Math.max(0, rgt * den / norm);
    },
    // pH: Glockenkurve
    ph: (pH, opt, width) => Math.exp(-Math.pow(pH - opt, 2) / (2 * Math.pow(width || 1.1, 2)))
  };
  // Temperaturkurve auf Maximum 1 normieren
  curves.tempNorm = (T, opt, q10) => {
    let m = 0;
    for (let t = opt - 10; t <= opt + 10; t += 0.1) m = Math.max(m, curves.temp(t, opt, q10));
    return curves.temp(T, opt, q10) / m;
  };

  /**
   * Erstellt ein Koordinatensystem.
   * opts: {w,h,pad:{l,r,t,b}, x:[min,max], y:[min,max], xlabel, ylabel, xticks:[...], yticks:[...], xtickLabels, ytickLabels, noLabels, grid}
   */
  function create(opts) {
    const o = Object.assign({ w: 560, h: 360, pad: { l: 58, r: 22, t: 20, b: 52 }, x: [0, 10], y: [0, 1], grid: true }, opts);
    const p = o.pad;
    const svg = el('svg', { viewBox: `0 0 ${o.w} ${o.h}`, class: 'chart', role: 'img' });
    const X = v => p.l + (v - o.x[0]) / (o.x[1] - o.x[0]) * (o.w - p.l - p.r);
    const Y = v => o.h - p.b - (v - o.y[0]) / (o.y[1] - o.y[0]) * (o.h - p.t - p.b);
    const invX = px => o.x[0] + (px - p.l) / (o.w - p.l - p.r) * (o.x[1] - o.x[0]);
    const invY = py => o.y[0] + (o.h - p.b - py) / (o.h - p.t - p.b) * (o.y[1] - o.y[0]);
    const layers = {};
    const gGrid = el('g', { class: 'grid' }, svg);
    const gAxes = el('g', { class: 'axes' }, svg);
    ['area', 'ref', 'curves', 'marks', 'user', 'top'].forEach(n => { layers[n] = el('g', { class: 'layer-' + n }, svg); });

    // Raster und Ticks
    if (o.grid && o.yticks) o.yticks.forEach(v => el('line', { x1: X(o.x[0]), x2: X(o.x[1]), y1: Y(v), y2: Y(v), stroke: '#eef2f6' }, gGrid));
    if (o.grid && o.xticks) o.xticks.forEach(v => el('line', { x1: X(v), x2: X(v), y1: Y(o.y[0]), y2: Y(o.y[1]), stroke: '#f3f6f9' }, gGrid));
    // Achsen mit Pfeilen
    const ax = '#0f2a4a';
    el('line', { x1: X(o.x[0]), y1: Y(o.y[0]), x2: X(o.x[1]) + 10, y2: Y(o.y[0]), stroke: ax, 'stroke-width': 1.6 }, gAxes);
    el('line', { x1: X(o.x[0]), y1: Y(o.y[0]), x2: X(o.x[0]), y2: Y(o.y[1]) - 10, stroke: ax, 'stroke-width': 1.6 }, gAxes);
    el('path', { d: `M${X(o.x[1]) + 14},${Y(o.y[0])} l-9,-4.5 v9z`, fill: ax }, gAxes);
    el('path', { d: `M${X(o.x[0])},${Y(o.y[1]) - 14} l-4.5,9 h9z`, fill: ax }, gAxes);
    if (!o.noTicks) {
      (o.xticks || []).forEach((v, i) => {
        el('line', { x1: X(v), x2: X(v), y1: Y(o.y[0]), y2: Y(o.y[0]) + 5, stroke: ax }, gAxes);
        const t = el('text', { x: X(v), y: Y(o.y[0]) + 19, 'text-anchor': 'middle', 'font-size': 12, fill: '#5d6d82' }, gAxes);
        t.textContent = o.xtickLabels ? o.xtickLabels[i] : String(v).replace('.', ',');
      });
      (o.yticks || []).forEach((v, i) => {
        el('line', { x1: X(o.x[0]) - 5, x2: X(o.x[0]), y1: Y(v), y2: Y(v), stroke: ax }, gAxes);
        const t = el('text', { x: X(o.x[0]) - 9, y: Y(v) + 4, 'text-anchor': 'end', 'font-size': 12, fill: '#5d6d82' }, gAxes);
        t.textContent = o.ytickLabels ? o.ytickLabels[i] : String(v).replace('.', ',');
      });
    }
    const xl = el('text', { x: (X(o.x[0]) + X(o.x[1])) / 2, y: o.h - 10, 'text-anchor': 'middle', 'font-size': 13.5, fill: ax, 'font-weight': 600, class: 'xlabel' }, gAxes);
    const yl = el('text', { x: 16, y: (Y(o.y[0]) + Y(o.y[1])) / 2, 'text-anchor': 'middle', 'font-size': 13.5, fill: ax, 'font-weight': 600, transform: `rotate(-90 16 ${(Y(o.y[0]) + Y(o.y[1])) / 2})`, class: 'ylabel' }, gAxes);
    xl.textContent = o.xlabel || ''; yl.textContent = o.ylabel || '';

    const api = {
      svg, X, Y, invX, invY, opts: o, layers,
      setLabels(x, y) { xl.textContent = x; yl.textContent = y; },
      clear(layer) { const g = layers[layer || 'curves']; while (g.firstChild) g.removeChild(g.firstChild); },
      fn(f, a) {
        a = a || {};
        const from = a.from == null ? o.x[0] : a.from, to = a.to == null ? o.x[1] : a.to, n = a.n || 160;
        let d = '';
        for (let i = 0; i <= n; i++) {
          const xv = from + (to - from) * i / n;
          let yv = f(xv);
          yv = Math.max(o.y[0] - 0.02 * (o.y[1] - o.y[0]), Math.min(o.y[1] * 1.05, yv));
          d += (i ? 'L' : 'M') + X(xv).toFixed(1) + ',' + Y(yv).toFixed(1);
        }
        return el('path', { d, fill: 'none', stroke: a.color || '#0d9488', 'stroke-width': a.width || 3, 'stroke-dasharray': a.dash, 'stroke-linecap': 'round', opacity: a.opacity, class: a.cls }, layers[a.layer || 'curves']);
      },
      pathPts(pts, a) {
        a = a || {};
        const d = pts.map((pt, i) => (i ? 'L' : 'M') + X(pt[0]).toFixed(1) + ',' + Y(pt[1]).toFixed(1)).join('');
        return el('path', { d, fill: 'none', stroke: a.color || '#0f2a4a', 'stroke-width': a.width || 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': a.dash }, layers[a.layer || 'user']);
      },
      hline(yv, a) {
        a = a || {};
        return el('line', { x1: X(a.from == null ? o.x[0] : a.from), x2: X(a.to == null ? o.x[1] : a.to), y1: Y(yv), y2: Y(yv), stroke: a.color || '#5d6d82', 'stroke-width': a.width || 1.5, 'stroke-dasharray': a.dash || '6 5' }, layers[a.layer || 'marks']);
      },
      vline(xv, a) {
        a = a || {};
        return el('line', { x1: X(xv), x2: X(xv), y1: Y(a.from == null ? o.y[0] : a.from), y2: Y(a.to == null ? o.y[1] : a.to), stroke: a.color || '#5d6d82', 'stroke-width': a.width || 1.5, 'stroke-dasharray': a.dash || '6 5' }, layers[a.layer || 'marks']);
      },
      text(xv, yv, str, a) {
        a = a || {};
        const t = el('text', { x: X(xv) + (a.dx || 0), y: Y(yv) + (a.dy || 0), 'text-anchor': a.anchor || 'start', 'font-size': a.size || 13, fill: a.color || '#0f2a4a', 'font-weight': a.weight || 600 }, layers[a.layer || 'marks']);
        t.innerHTML = str;
        return t;
      },
      textPx(x, y, str, a) {
        a = a || {};
        const t = el('text', { x, y, 'text-anchor': a.anchor || 'start', 'font-size': a.size || 13, fill: a.color || '#0f2a4a', 'font-weight': a.weight || 600 }, layers[a.layer || 'marks']);
        t.innerHTML = str;
        return t;
      },
      point(xv, yv, a) {
        a = a || {};
        return el('circle', { cx: X(xv), cy: Y(yv), r: a.r || 6, fill: a.color || '#0f2a4a', stroke: '#fff', 'stroke-width': 2 }, layers[a.layer || 'marks']);
      },
      rect(x0, x1, a) {
        a = a || {};
        return el('rect', { x: X(x0), width: X(x1) - X(x0), y: Y(o.y[1]), height: Y(o.y[0]) - Y(o.y[1]), fill: a.color || '#e6f7f5', opacity: a.opacity || 0.6 }, layers.area);
      },
      // Pointer-Koordinaten (SVG-Pixel) aus Event
      svgPoint(ev) {
        const r = svg.getBoundingClientRect();
        return { x: (ev.clientX - r.left) / r.width * o.w, y: (ev.clientY - r.top) / r.height * o.h };
      },
      inPlot(pt) { return pt.x >= p.l - 4 && pt.x <= o.w - p.r + 4 && pt.y >= p.t - 4 && pt.y <= o.h - p.b + 4; }
    };
    return api;
  }

  window.BIO = window.BIO || {};
  BIO.svgEl = el;
  BIO.curves = curves;
  BIO.chart = { create };
})();
