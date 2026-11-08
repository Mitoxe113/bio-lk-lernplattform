/* =========================================================================
   Schulbuch-Abbildungen
   Die Seite enthält KEINE Bilder aus dem Buch. Sie speichert nur Seitenzahl
   und Ausschnitt (Anteile der Seite). Der Ausschnitt wird im Browser aus der
   PDF gerendert, die du selbst unter „Buch verknüpfen“ auswählst.
   Die PDF bleibt lokal (IndexedDB) und wird nirgendwohin hochgeladen.
   ========================================================================= */
(function () {
  const esc = (x) => BIO.esc(x);
  const PDF_OFFSET = 4;          // Buchseite N = PDF-Seite N + 4
  const EXPECTED_PAGES = 488;

  // [Buchseite, Bezeichnung im Buch, Bildunterschrift, [x0, y0, x1, y1] als Anteil der Seite]
  const F = {
    's12-b2': [12, 'B2', 'Vielfalt der Proteinfunktionen', [0.04, 0.605, 0.56, 0.95]],
    's12-b3': [12, 'B3', 'Struktur von α-Aminosäuren', [0.555, 0.475, 0.935, 0.59]],
    's12-b4': [12, 'B4', 'Bildung einer Peptidbindung', [0.555, 0.735, 0.945, 0.95]],
    's13-b5': [13, 'B5', 'Primärstruktur (vereinfacht)', [0.04, 0.085, 0.56, 0.23]],
    's13-b6': [13, 'B6', 'Sekundärstruktur', [0.04, 0.22, 0.585, 0.505]],
    's13-b7': [13, 'B7', 'Tertiärstruktur', [0.04, 0.495, 0.585, 0.77]],
    's13-b8': [13, 'B8', 'Quartärstruktur des Hämoglobins', [0.69, 0.745, 0.945, 0.92]],
    's14-b1': [14, 'B1', 'Bildung und Aufbau eines Fettmoleküls', [0.035, 0.075, 0.56, 0.295]],
    's14-b2': [14, 'B2', 'Phospholipid (Schema)', [0.565, 0.075, 0.705, 0.29]],
    's14-b3': [14, 'B3', 'Orientierung von Phospholipiden', [0.7, 0.075, 0.935, 0.29]],
    's14-b4': [14, 'B4', 'Phospholipid (Strukturformel)', [0.015, 0.375, 0.19, 0.76]],
    's15-b1': [15, 'B1', 'Biomembran (TEM-Aufnahme)', [0.045, 0.075, 0.375, 0.355]],
    's15-b2': [15, 'B2', 'Modell einer Biomembran', [0.37, 0.075, 0.965, 0.355]],
    's20-b1': [20, 'B1', 'Passiver und aktiver Membrantransport', [0.095, 0.085, 0.925, 0.43]],
    's21-b2': [21, 'B2', 'Glucosetransport aus dem Darm ins Blut (Schema)', [0.125, 0.08, 0.605, 0.35]],
    's21-b3': [21, 'B3', 'Glucosebindung am Symporter', [0.595, 0.08, 0.965, 0.35]],
    's22-b1': [22, 'B1', 'Endocytose und Exocytose', [0.195, 0.2, 0.51, 0.39]],
    's23-b1': [23, 'B1', 'Synthese und Freisetzung von Insulin', [0.085, 0.25, 0.935, 0.53]],
    's23-b2': [23, 'B2', 'Wirkungsweise von Insulin auf Körperzellen', [0.085, 0.54, 0.86, 0.79]],
    's26-b1': [26, 'B1', 'Katalytischer Zyklus des Enzyms Lactase', [0.195, 0.21, 0.57, 0.425]],
    's26-b2': [26, 'B2', 'Energiediagramm exergonischer Reaktionen', [0.555, 0.22, 0.945, 0.425]],
    's26-b3': [26, 'B3', 'Substratmolekül im aktiven Zentrum der Lactase', [0.555, 0.7, 0.925, 0.93]],
    's26-rand': [26, 'Randspalte', 'Bändermodell der Lactase', [0, 0.44, 0.195, 0.77]],
    's27-b4': [27, 'B4', 'Enzymkatalysierte Reaktion mit Cosubstrat', [0.045, 0.46, 0.605, 0.71]],
    's28-b1': [28, 'B1', 'Substratspezifität (links) und Wirkungsspezifität (rechts)', [0.025, 0.055, 0.955, 0.305]],
    's28-b2': [28, 'B2', 'Induced-Fit-Modell', [0.025, 0.64, 0.555, 0.82]],
    's32-b1': [32, 'B1', 'Drehtür-Modell zur Reaktionsgeschwindigkeit', [0.045, 0.19, 0.555, 0.37]],
    's32-b2': [32, 'B2', 'Kenngrößen einiger Enzyme', [0.045, 0.78, 0.925, 0.93]],
    's33-b3': [33, 'B3', 'Substratkonzentration und Reaktionsgeschwindigkeit', [0.075, 0.08, 0.605, 0.375]],
    's36-b2': [36, 'B2', 'Temperatur und Enzymaktivität', [0.195, 0.695, 0.505, 0.92]],
    's36-b3': [36, 'B3', 'Temperaturabhängigkeit einer Enzymreaktion', [0.555, 0.745, 0.905, 0.92]],
    's36-rand': [36, 'Randspalte', 'Denaturierung eines Enzyms', [0.025, 0.55, 0.195, 0.825]],
    's37-b4': [37, 'B4', 'pH-Wert-Abhängigkeit der Enzymaktivität', [0.215, 0.085, 0.605, 0.295]],
    's37-b5': [37, 'B5', 'Enzymdenaturierung bei niedrigem pH-Wert', [0.595, 0.085, 0.945, 0.295]],
    's40-b1': [40, 'B1', 'Reaktionsgeschwindigkeit und kompetitive Hemmung', [0.045, 0.085, 0.555, 0.325]],
    's40-b2': [40, 'B2', 'Modell der kompetitiven Hemmung', [0.555, 0.09, 0.955, 0.325]],
    's40-rand': [40, 'Randspalte', 'Hypoxanthin und Allopurinol', [0.045, 0.435, 0.205, 0.675]],
    's41-b3': [41, 'B3', 'Modell der nicht-kompetitiven Hemmung', [0.045, 0.08, 0.425, 0.325]],
    's41-b4': [41, 'B4', 'Reaktionsgeschwindigkeit und nicht-kompetitive Hemmung', [0.445, 0.08, 0.965, 0.325]]
  };
  const figs = {};
  Object.keys(F).forEach(id => { const f = F[id]; figs[id] = { id, page: f[0], label: f[1], caption: f[2], box: f[3] }; });

  /* ---------- Speicherung der PDF (IndexedDB) ---------- */
  const DB = 'bioLK-book', STORE = 'files';
  function idb() {
    return new Promise((res, rej) => {
      if (!window.indexedDB) return rej(new Error('IndexedDB nicht verfügbar'));
      const r = indexedDB.open(DB, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  async function dbGet(key) { const db = await idb(); return new Promise((res, rej) => { const q = db.transaction(STORE).objectStore(STORE).get(key); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); }
  async function dbPut(key, val) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).put(val, key); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }
  async function dbDel(key) { const db = await idb(); return new Promise((res, rej) => { const tx = db.transaction(STORE, 'readwrite'); tx.objectStore(STORE).delete(key); tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error); }); }

  /* ---------- pdf.js laden (lokal, kein CDN) ---------- */
  let libP = null, docP = null, info = null;
  function lib() {
    if (!libP) {
      const base = document.baseURI;
      libP = import(new URL('vendor/pdfjs/pdf.min.js', base).href).then(m => {
        m.GlobalWorkerOptions.workerSrc = new URL('vendor/pdfjs/pdf.worker.min.js', base).href;
        return m;
      });
    }
    return libP;
  }
  // Datei stückweise lesen, damit die große PDF nicht komplett in den Speicher muss
  async function openBlob(blob) {
    const pdfjs = await lib();
    const first = new Uint8Array(await blob.slice(0, Math.min(blob.size, 1 << 20)).arrayBuffer());
    const tr = new pdfjs.PDFDataRangeTransport(blob.size, first);
    tr.requestDataRange = (b, e) => { blob.slice(b, e).arrayBuffer().then(buf => tr.onDataRange(b, new Uint8Array(buf))); };
    return pdfjs.getDocument({ range: tr, length: blob.size, disableAutoFetch: true, disableStream: true, isEvalSupported: false }).promise;
  }
  function getDoc() {
    if (!docP) {
      docP = dbGet('book').then(rec => {
        if (!rec || !rec.blob) return null;
        info = { name: rec.name, size: rec.blob.size, pages: rec.pages, ts: rec.ts };
        return openBlob(rec.blob);
      }).catch(e => { console.warn('Buch konnte nicht geöffnet werden:', e); return null; });
    }
    return docP;
  }
  async function link(file) {
    const doc = await openBlob(file);
    const pages = doc.numPages;
    await dbPut('book', { blob: file, name: file.name, pages, ts: Date.now() });
    info = { name: file.name, size: file.size, pages, ts: Date.now() };
    docP = Promise.resolve(doc);
    pageCache.clear();
    return { pages, ok: pages === EXPECTED_PAGES };
  }
  async function unlink() { await dbDel('book'); docP = Promise.resolve(null); info = null; pageCache.clear(); }
  async function status() { const d = await getDoc(); return d ? Object.assign({ linked: true, ok: d.numPages === EXPECTED_PAGES }, info) : { linked: false }; }

  /* ---------- Ausschnitt rendern ---------- */
  const pageCache = new Map();
  function getPage(doc, bookPage) {
    const n = bookPage + PDF_OFFSET;
    if (!pageCache.has(n)) pageCache.set(n, doc.getPage(n));
    return pageCache.get(n);
  }
  async function renderCrop(canvas, fig, cssWidth, maxScale) {
    const doc = await getDoc();
    if (!doc) throw new Error('kein Buch');
    const page = await getPage(doc, fig.page);
    const base = page.getViewport({ scale: 1 });
    const [x0, y0, x1, y1] = fig.box;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cropW = (x1 - x0) * base.width, cropH = (y1 - y0) * base.height;
    const scale = Math.min(maxScale || 3, cssWidth * dpr / cropW);
    const vp = page.getViewport({ scale });
    canvas.width = Math.round(cropW * scale); canvas.height = Math.round(cropH * scale);
    canvas.style.aspectRatio = `${cropW} / ${cropH}`;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp, transform: [1, 0, 0, 1, -x0 * vp.width, -y0 * vp.height] }).promise;
  }
  async function renderPage(canvas, bookPage, cssWidth) {
    const doc = await getDoc();
    const page = await getPage(doc, bookPage);
    const base = page.getViewport({ scale: 1 });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vp = page.getViewport({ scale: Math.min(3, cssWidth * dpr / base.width) });
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  }

  /* ---------- Anzeige ---------- */
  const ref = f => `Buch S. ${f.page}, ${f.label}`;
  function placeholder(f) {
    return `<div class="bookfig-empty"><b>${esc(f.caption)}</b><span>${ref(f)}</span><button type="button" class="btn small" data-booklink>Buch verknüpfen, um die Abbildung hier zu sehen</button></div>`;
  }
  async function mount(root) {
    const els = Array.from(root.querySelectorAll('[data-bookfig]'));
    if (!els.length) return;
    const doc = await getDoc();
    for (const el of els) {
      const f = figs[el.dataset.bookfig];
      if (!f) { el.remove(); continue; }
      const fig = document.createElement('figure');
      fig.className = 'bookfig' + (el.dataset.size === 'small' ? ' small' : '');
      fig.dataset.id = f.id;
      fig.innerHTML = doc ? `<button type="button" class="bookfig-img" aria-label="${esc(f.caption)} vergrößern"><canvas></canvas></button><figcaption><span>${esc(f.caption)}</span><span class="src">${ref(f)}</span></figcaption>`
        : `${placeholder(f)}`;
      el.replaceWith(fig);
      if (doc) {
        const cv = fig.querySelector('canvas');
        const w = Math.max(240, fig.clientWidth || 600);
        renderCrop(cv, f, Math.min(w, 900)).catch(e => { fig.innerHTML = `<p class="small muted">Abbildung konnte nicht geladen werden (${esc(e.message)}).</p>`; });
      }
    }
  }

  // Vergrößern
  function open(id) {
    const f = figs[id]; if (!f) return;
    const ov = document.createElement('div');
    ov.className = 'lightbox';
    ov.innerHTML = `<div class="lightbox-inner" role="dialog" aria-modal="true" aria-label="${esc(f.caption)}">
      <div class="row"><b>${esc(f.caption)}</b><span class="muted small">${ref(f)}</span><span class="spacer"></span><button type="button" class="btn small" data-a="page">Ganze Seite</button><button type="button" class="btn small" data-a="close">Schließen</button></div>
      <div class="lightbox-body"><canvas></canvas></div></div>`;
    document.body.appendChild(ov);
    const cv = ov.querySelector('canvas'), body = ov.querySelector('.lightbox-body');
    const w = Math.min(body.clientWidth || window.innerWidth - 40, 1400);
    renderCrop(cv, f, w, 4);
    const close = () => { ov.remove(); document.removeEventListener('keydown', onKey); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    ov.addEventListener('click', e => { if (e.target === ov || e.target.closest('[data-a=close]')) close(); });
    ov.querySelector('[data-a=page]').addEventListener('click', e => {
      const showPage = e.target.textContent === 'Ganze Seite';
      e.target.textContent = showPage ? 'Nur Abbildung' : 'Ganze Seite';
      if (showPage) renderPage(cv, f.page, Math.min(body.clientWidth, 1000)); else renderCrop(cv, f, w, 4);
    });
  }

  // Dateiauswahl (von überall per [data-booklink])
  function pick() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'application/pdf,.pdf';
    inp.addEventListener('change', async () => {
      const file = inp.files[0]; if (!file) return;
      BIO.toast('Buch wird geöffnet …', 4000);
      try {
        const r = await link(file);
        BIO.toast(r.ok ? 'Buch verknüpft.' : `Verknüpft, aber die PDF hat ${r.pages} statt ${EXPECTED_PAGES} Seiten. Abbildungen können verschoben sein.`, 5000);
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      } catch (e) { BIO.toast('Die Datei konnte nicht als PDF gelesen werden.', 4000); console.warn(e); }
    });
    inp.click();
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-booklink]')) { e.preventDefault(); pick(); return; }
    const b = e.target.closest('.bookfig-img');
    if (b) open(b.closest('.bookfig').dataset.id);
  });

  // Abbildungen je Checklisten-Thema
  const topicFigs = {
    t1: ['s12-b3', 's12-b4', 's12-b2'],
    t2: ['s13-b5', 's13-b6', 's13-b7', 's13-b8'],
    t3: ['s14-b1', 's14-b4', 's14-b2', 's14-b3', 's15-b1', 's15-b2'],
    t4: ['s20-b1', 's21-b2', 's21-b3'],
    t5: ['s22-b1', 's23-b1', 's23-b2'],
    t6: ['s26-b1', 's26-b2', 's26-b3', 's26-rand', 's27-b4'],
    t7: ['s28-b1', 's28-b2'],
    t8: ['s32-b1', 's33-b3', 's32-b2'],
    t9: ['s36-b2', 's36-rand', 's36-b3', 's37-b4', 's37-b5'],
    t10: ['s40-b1', 's40-b2', 's41-b3', 's41-b4', 's40-rand']
  };
  BIO.book = { figs, topicFigs, mount, pick, link, unlink, status, ref, EXPECTED_PAGES };
  BIO.bf = (id, size) => `<div data-bookfig="${id}"${size ? ` data-size="${size}"` : ''}></div>`;
})();
