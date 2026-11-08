/* =========================================================================
   Übungen: Multiple Choice, Karteikarten (Leitner), Lückentext, Zuordnung,
   Reihenfolge, Beschriften, offene Fragen, Fehlerliste, Mischtraining
   ========================================================================= */
(function () {
  const { esc, $, $$, shuffle, store, topicChip, levelTag, topicOptions, backLink, goalText, toast } = BIO;
  const KEYS = 'ABCDEFGH';

  function goalLine(gid) { const t = goalText(gid); return t ? `<p class="small muted mb0"><b>Lernziel:</b> ${esc(t)}</p>` : ''; }
  function scoreChip(key) {
    const e = store.state.ex[key];
    if (!e || !e.max) return '<span class="chip gray">noch offen</span>';
    const p = Math.round(100 * e.best / e.max);
    return `<span class="chip ${p >= 70 ? 'ok' : 'warn'}">bestes Ergebnis ${p} %</span>`;
  }
  function record(kind, item, score, max) {
    store.recordError(kind, item.id, item.topic, max ? score / max >= 0.7 : true, item.goal);
    store.recordEx(kind + ':' + item.id, score, max);
    document.dispatchEvent(new CustomEvent('bio:progress'));
  }
  function filterBar(q, extra) {
    return `<div class="filter-bar"><label class="small" for="fTopic"><b>Thema</b></label><select id="fTopic">${topicOptions(q.topic || '')}</select>${extra || ''}</div>`;
  }
  function hashWith(base, q) {
    const s = Object.keys(q).filter(k => q[k] !== '' && q[k] != null).map(k => `${k}=${encodeURIComponent(q[k])}`).join('&');
    return base + (s ? '?' + s : '');
  }
  function bindFilter(main, base, q) {
    const sel = $('#fTopic', main);
    if (sel) sel.addEventListener('change', () => { location.hash = hashWith(base, Object.assign({}, q, { topic: sel.value, id: '' })); });
  }

  /* ======================= Hub ======================= */
  function hub(main) {
    const errs = Object.keys(store.state.errors).length;
    const due = BIO.cards.filter(BIO.cardDue).length;
    const items = [
      ['quiz', '✔', 'Multiple Choice', `${BIO.mc.length} Fragen mit Feedback und Erklärung. Falsche Antworten werden automatisch wiederholt.`],
      ['karten', '🗂', 'Karteikarten', `${BIO.cards.length} Karten im Leitner-System · heute fällig: ${due}`],
      ['lueckentext', '✎', 'Lückentexte', `${BIO.cloze.length} Texte – Fachbegriffe einsetzen.`],
      ['zuordnung', '⇆', 'Zuordnung', `${BIO.matching.length} Aufgaben – Begriffe passend zuordnen.`],
      ['reihenfolge', '↕', 'Reihenfolge', `${BIO.ordering.length} Abläufe in die richtige Reihenfolge bringen.`],
      ['beschriften', '🏷', 'Beschriften', `${BIO.labeling.length} Abbildungen beschriften (antippen statt ziehen).`],
      ['offen', '📝', 'Offene Klausurfragen', `${BIO.open.length} Fragen mit Musterlösung, Checkliste und Selbstbewertung.`],
      ['mix', '🎲', 'Zufällige Mischfragen', '12 zufällige Fragen aus allen Themen.'],
      ['fehler', '⚠', 'Meine Fehlerliste', errs ? `${errs} Einträge – gezielt wiederholen.` : 'Noch keine Fehler gespeichert.']
    ];
    main.innerHTML = `<div class="page-head"><h1>Übungen</h1><p>Jede Aufgabe ist einem Thema und einem Lernziel der Checkliste zugeordnet. Dein Fortschritt wird automatisch gespeichert.</p></div>
      <div class="grid grid-3">${items.map(i => `<a class="card hub-card" href="#/uebungen/${i[0]}"><div class="hub-icon">${i[1]}</div><div><h3>${i[2]}</h3><p>${i[3]}</p></div></a>`).join('')}
      <a class="card hub-card" href="#/diagramme"><div class="hub-icon">📈</div><div><h3>Diagramme</h3><p>Achsen, Kurven zeichnen, Punkte markieren – im Diagramm-Trainer.</p></div></a></div>
      <h2>Gezielt ein Thema trainieren</h2>
      <div class="card"><ul class="goal-list">${BIO.topics.map(t => `<li><span><b>${t.nr}. ${esc(t.title)}</b></span><span class="row"><a class="btn small" href="#/uebungen/quiz?topic=${t.id}">Quiz</a><a class="btn small" href="#/uebungen/karten?topic=${t.id}">Karten</a><a class="btn small" href="#/uebungen/offen?topic=${t.id}">Offene Fragen</a></span></li>`).join('')}</ul></div>`;
  }

  /* ======================= Multiple Choice ======================= */
  function quiz(main, q, opts) {
    opts = opts || {};
    let pool = BIO.mc.slice();
    if (q.topic) pool = pool.filter(x => x.topic === q.topic);
    if (q.level) pool = pool.filter(x => String(x.level) === String(q.level));
    if (opts.errorsOnly || q.mode === 'fehler') { const keys = store.state.errors; pool = pool.filter(x => keys['mc:' + x.id]); }
    pool = shuffle(pool);
    if (opts.limit) pool = pool.slice(0, opts.limit);
    const title = opts.title || 'Multiple Choice';
    const head = `${backLink('#/uebungen', 'Übungen')}<div class="page-head"><h1>${title}</h1><p>${opts.sub || 'Wähle eine Antwort. Falsch beantwortete Fragen kommen am Ende der Runde noch einmal.'}</p></div>`;
    const filters = opts.noFilter ? '' : filterBar(q, `<select id="fLevel"><option value="">Alle Stufen</option>${[1, 2, 3].map(l => `<option value="${l}" ${String(q.level) === String(l) ? 'selected' : ''}>Stufe ${l} · ${BIO.levelLabel(l)}</option>`).join('')}</select><label class="toggle"><input type="checkbox" id="fErr" ${q.mode === 'fehler' ? 'checked' : ''}> nur meine Fehler</label>`);
    main.innerHTML = head + filters + `<div class="card" data-r="box"></div>`;
    if (!opts.noFilter) {
      bindFilter(main, '#/uebungen/quiz', q);
      $('#fLevel', main).addEventListener('change', e => { location.hash = hashWith('#/uebungen/quiz', Object.assign({}, q, { level: e.target.value })); });
      $('#fErr', main).addEventListener('change', e => { location.hash = hashWith('#/uebungen/quiz', Object.assign({}, q, { mode: e.target.checked ? 'fehler' : '' })); });
    }
    const box = $('[data-r=box]', main);
    if (!pool.length) { box.innerHTML = `<p>${q.mode === 'fehler' || opts.errorsOnly ? '🎉 Keine offenen Fehler in dieser Auswahl.' : 'Keine Fragen in dieser Auswahl.'}</p><a class="btn" href="#/uebungen/quiz">Alle Fragen</a>`; return; }
    const queue = pool.map(x => ({ q: x, retry: false }));
    let i = 0, right = 0, firstTry = 0;
    const wrongList = [];
    const total = pool.length;
    function show() {
      if (i >= queue.length) return finish();
      const it = queue[i], x = it.q;
      const order = shuffle(x.options.map((o, k) => k));
      box.innerHTML = `<div class="ex-head"><div class="row">${topicChip(x.topic)}${levelTag(x.level)}${it.retry ? '<span class="chip warn">Wiederholung</span>' : ''}</div><span class="small muted">Frage ${Math.min(i + 1, queue.length)} von ${queue.length}</span></div>
        <div class="progress mb0" style="margin-bottom:14px"><span style="width:${100 * i / queue.length}%"></span></div>
        <div class="q-text">${esc(x.q)}</div>
        <div class="options">${order.map((k, j) => `<button type="button" class="option" data-k="${k}"><span class="key">${KEYS[j]}</span><span>${esc(x.options[k])}</span></button>`).join('')}</div>
        <div data-r="fb"></div>`;
      const btns = $$('.option', box);
      btns.forEach(b => b.addEventListener('click', () => {
        const k = +b.dataset.k, ok = k === x.correct;
        btns.forEach(o => { o.disabled = true; if (+o.dataset.k === x.correct) o.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        store.recordMC(x, ok);
        if (ok) { right++; if (!it.retry) firstTry++; }
        else { if (!it.retry) { queue.push({ q: x, retry: true }); wrongList.push(x); } }
        $('[data-r=fb]', box).innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}"><b class="t">${ok ? '✓ Richtig!' : '✗ Leider falsch.'}</b>${esc(x.expl)}${!ok && !it.retry ? '<div class="small muted mt">Diese Frage kommt am Ende der Runde noch einmal.</div>' : ''}</div>
          ${goalLine(x.goal)}<div class="row mt"><span class="spacer"></span><button type="button" class="btn primary" data-a="next">${i + 1 < queue.length ? 'Weiter →' : 'Auswertung'}</button></div>`;
        $('[data-a=next]', box).focus();
        $('[data-a=next]', box).addEventListener('click', () => { i++; show(); });
        document.dispatchEvent(new CustomEvent('bio:progress'));
      }));
    }
    function finish() {
      const p = Math.round(100 * firstTry / total);
      box.innerHTML = `<h2 class="mb0" style="margin-top:0">Auswertung</h2>
        <div class="row mt"><span class="score-badge">${firstTry}<span class="small muted">/ ${total}</span></span><span class="muted">beim ersten Versuch richtig (${p} %)</span></div>
        ${wrongList.length ? `<h3>Falsch beantwortet</h3><ul>${wrongList.map(x => `<li>${esc(x.q)} <span class="small muted">→ ${esc(x.options[x.correct])}</span></li>`).join('')}</ul>` : '<p class="mt">🎉 Alles beim ersten Versuch richtig!</p>'}
        <div class="row mt"><button type="button" class="btn primary" data-a="again">Neue Runde</button>${wrongList.length ? '<a class="btn" href="#/uebungen/fehler">Zur Fehlerliste</a>' : ''}<a class="btn ghost" href="#/uebungen">Übersicht</a></div>`;
      $('[data-a=again]', box).addEventListener('click', () => quiz(main, q, opts));
    }
    show();
  }

  /* ======================= Karteikarten (Leitner) ======================= */
  function karten(main, q) {
    let pool = BIO.cards.slice();
    if (q.topic) pool = pool.filter(c => c.topic === q.topic);
    const mode = q.mode || 'faellig';
    const due = pool.filter(BIO.cardDue);
    const boxes = [1, 2, 3, 4, 5].map(b => pool.filter(c => (BIO.cardInfo(c).box || 1) === b).length);
    main.innerHTML = `${backLink('#/uebungen', 'Übungen')}<div class="page-head"><h1>Karteikarten</h1><p>Karte antippen zum Umdrehen, dann ehrlich bewerten. <b>Gewusst</b> → nächstes Fach; <b>Unsicher</b> → bleibt vorne; <b>Nicht gewusst</b> → zurück in Fach 1. Schwierige Karten kommen in derselben Runde noch einmal.</p></div>
      ${filterBar(q, `<select id="fMode"><option value="faellig" ${mode === 'faellig' ? 'selected' : ''}>Fällige Karten (${due.length})</option><option value="alle" ${mode === 'alle' ? 'selected' : ''}>Alle Karten (${pool.length})</option><option value="schwer" ${mode === 'schwer' ? 'selected' : ''}>Nur Fach 1–2</option></select>`)}
      <div class="card"><div class="row small"><b>Fächer:</b>${boxes.map((n, k) => `<span class="chip ${k >= 2 ? 'ok' : 'gray'}">Fach ${k + 1}: ${n}</span>`).join('')}<span class="muted">Wiederholung nach 0 / 1 / 3 / 7 / 14 Tagen</span></div></div>
      <div data-r="box"></div>`;
    bindFilter(main, '#/uebungen/karten', q);
    $('#fMode', main).addEventListener('change', e => { location.hash = hashWith('#/uebungen/karten', Object.assign({}, q, { mode: e.target.value })); });
    let list = mode === 'alle' ? pool : mode === 'schwer' ? pool.filter(c => (BIO.cardInfo(c).box || 1) <= 2) : due;
    list = shuffle(list);
    const box = $('[data-r=box]', main);
    if (!list.length) { box.innerHTML = `<div class="card"><p>🎉 Keine fälligen Karten in dieser Auswahl. Wähle „Alle Karten“, um trotzdem zu üben.</p></div>`; return; }
    const queue = list.slice();
    let i = 0, stats = { ok: 0, unsure: 0, no: 0 };
    function show() {
      if (i >= queue.length) {
        box.innerHTML = `<div class="card"><h2 style="margin-top:0">Runde beendet</h2><p>✓ Gewusst: <b>${stats.ok}</b> · ? Unsicher: <b>${stats.unsure}</b> · ✗ Nicht gewusst: <b>${stats.no}</b></p><div class="row"><button class="btn primary" data-a="again">Weiter üben</button><a class="btn ghost" href="#/uebungen">Übersicht</a></div></div>`;
        $('[data-a=again]', box).addEventListener('click', () => karten(main, q));
        return;
      }
      const c = queue[i], info = BIO.cardInfo(c);
      box.innerHTML = `<div class="ex-head"><div class="row">${topicChip(c.topic)}<span class="box-meter" title="Fach ${info.box || 1}">${[1, 2, 3, 4, 5].map(b => `<span class="${b <= (info.box || 1) ? 'on' : ''}"></span>`).join('')}</span></div><span class="small muted">Karte ${i + 1} von ${queue.length}</span></div>
        <div class="flashcard" tabindex="0" role="button" aria-label="Karte umdrehen"><div class="inner"><div class="face front">${esc(c.front)}<span class="hint">antippen zum Umdrehen</span></div><div class="face back"><div><div class="small muted" style="margin-bottom:6px">${esc(c.front)}</div>${esc(c.back)}</div></div></div></div>
        <div class="row hidden" data-r="rate" style="justify-content:center"><button class="btn ok" data-r="ok">✓ Gewusst</button><button class="btn warn" data-r="unsure">? Unsicher</button><button class="btn bad" data-r="no">✗ Nicht gewusst</button></div>`;
      const fc = $('.flashcard', box);
      const flip = () => { fc.classList.toggle('flipped'); $('[data-r=rate]', box).classList.remove('hidden'); };
      fc.addEventListener('click', flip);
      fc.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } });
      ['ok', 'unsure', 'no'].forEach(r => $(`[data-r=${r}]`, box).addEventListener('click', () => {
        store.rateCard(c, r); stats[r]++;
        if (r !== 'ok' && queue.filter(x => x === c).length < 3) queue.push(c);
        i++; show();
        document.dispatchEvent(new CustomEvent('bio:progress'));
      }));
    }
    show();
  }

  /* ======================= Listen-Seite für Aufgabentypen ======================= */
  function listPage(main, q, cfg) {
    let items = cfg.items.slice();
    if (q.topic) items = items.filter(x => x.topic === q.topic);
    const item = q.id ? cfg.items.find(x => x.id === q.id) : null;
    if (item) {
      const idx = items.indexOf(item);
      const next = items[idx + 1];
      main.innerHTML = `${backLink(hashWith('#/uebungen/' + cfg.route, { topic: q.topic }), cfg.title)}
        <div class="page-head"><div class="row">${topicChip(item.topic)}${item.level ? levelTag(item.level) : ''}</div><h1 class="mt">${esc(item.title || cfg.title)}</h1>${goalLine(item.goal)}</div>
        <div class="card" data-r="ex"></div>
        <div class="row">${next ? `<span class="spacer"></span><a class="btn" href="${hashWith('#/uebungen/' + cfg.route, { topic: q.topic, id: next.id })}">Nächste Aufgabe →</a>` : ''}</div>`;
      cfg.render($('[data-r=ex]', main), item);
      return;
    }
    main.innerHTML = `${backLink('#/uebungen', 'Übungen')}<div class="page-head"><h1>${cfg.title}</h1><p>${cfg.sub}</p></div>${filterBar(q)}
      <div class="grid grid-2">${items.map(x => `<a class="card hub-card" href="${hashWith('#/uebungen/' + cfg.route, { topic: q.topic, id: x.id })}"><div class="hub-icon">${cfg.icon}</div><div><h3>${esc(x.title || BIO.stripTags(x.q).slice(0, 90) + '…')}</h3><p class="row" style="margin-top:6px">${topicChip(x.topic)}${scoreChip(cfg.kind + ':' + x.id)}</p></div></a>`).join('') || '<p>Keine Aufgaben in dieser Auswahl.</p>'}</div>`;
    bindFilter(main, '#/uebungen/' + cfg.route, q);
  }

  /* ---- Lückentext ---- */
  function parseCloze(text) {
    const parts = [], answers = [];
    let last = 0;
    text.replace(/\{\{(.+?)\}\}/g, (m, a, off) => { parts.push(text.slice(last, off)); answers.push(a.split('|')); last = off + m.length; return m; });
    parts.push(text.slice(last));
    return { parts, answers };
  }
  function renderCloze(el, item) {
    const { parts, answers } = parseCloze(item.text);
    const bank = shuffle(answers.map(a => a[0]));
    el.innerHTML = `<div class="cloze-text">${parts.map((p, i) => esc(p) + (i < answers.length ? `<input type="text" data-i="${i}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${i + 1}" style="width:${Math.max(6, answers[i][0].length + 2)}ch">` : '')).join('')}</div>
      <details class="selfcheck"><summary>Wortspeicher anzeigen</summary><div class="wordbank">${bank.map(w => `<span>${esc(w)}</span>`).join('')}</div></details>
      <div class="row mt"><button class="btn primary" data-a="check">Prüfen</button><button class="btn" data-a="solve">Lösung zeigen</button><button class="btn ghost" data-a="reset">Zurücksetzen</button></div><div data-r="fb"></div>`;
    const inputs = $$('input', el);
    inputs.forEach(inp => inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); const n = inputs[+inp.dataset.i + 1]; if (n) n.focus(); else $('[data-a=check]', el).click(); } }));
    $('[data-a=check]', el).addEventListener('click', () => {
      let ok = 0;
      inputs.forEach(inp => {
        const a = answers[+inp.dataset.i], good = a.some(x => BIO.norm(x) === BIO.norm(inp.value));
        inp.classList.toggle('ok', good); inp.classList.toggle('bad', !good);
        const s = inp.nextElementSibling && inp.nextElementSibling.classList && inp.nextElementSibling.classList.contains('cloze-sol') ? inp.nextElementSibling : null;
        if (s) s.remove();
        if (!good) inp.insertAdjacentHTML('afterend', `<span class="cloze-sol">${esc(a[0])}</span>`);
        if (good) ok++;
      });
      record('cloze', item, ok, inputs.length);
      $('[data-r=fb]', el).innerHTML = `<div class="feedback ${ok === inputs.length ? 'ok' : 'bad'}"><b class="t">${ok} von ${inputs.length} Lücken richtig</b>${ok === inputs.length ? 'Sehr gut!' : 'Die richtigen Begriffe stehen grün neben den Lücken.'}</div>`;
    });
    $('[data-a=solve]', el).addEventListener('click', () => { inputs.forEach(inp => { inp.value = answers[+inp.dataset.i][0]; inp.classList.remove('bad'); }); });
    $('[data-a=reset]', el).addEventListener('click', () => renderCloze(el, item));
  }

  /* ---- Zuordnung ---- */
  function renderMatch(el, item) {
    const rights = shuffle(item.pairs.map(p => p[1]));
    el.innerHTML = `<p class="small muted">Ordne jedem Begriff links die passende Aussage zu.</p>
      ${item.pairs.map((p, i) => `<div class="match-row"><div class="left">${esc(p[0])}</div><select data-i="${i}" aria-label="Zuordnung für ${esc(p[0])}"><option value="">– wählen –</option>${rights.map(r => `<option>${esc(r)}</option>`).join('')}</select></div>`).join('')}
      <div class="row mt"><button class="btn primary" data-a="check">Prüfen</button><button class="btn ghost" data-a="reset">Zurücksetzen</button></div><div data-r="fb"></div>`;
    $('[data-a=check]', el).addEventListener('click', () => {
      let ok = 0;
      $$('select', el).forEach(s => {
        const p = item.pairs[+s.dataset.i], good = s.value === p[1];
        s.classList.toggle('ok', good); s.classList.toggle('bad', !good);
        const row = s.closest('.match-row'); const old = $('.sol', row); if (old) old.remove();
        if (!good) row.insertAdjacentHTML('beforeend', `<div class="sol">✓ richtig: ${esc(p[1])}</div>`);
        if (good) ok++;
      });
      record('match', item, ok, item.pairs.length);
      $('[data-r=fb]', el).innerHTML = `<div class="feedback ${ok === item.pairs.length ? 'ok' : 'bad'}"><b class="t">${ok} von ${item.pairs.length} richtig zugeordnet</b></div>`;
    });
    $('[data-a=reset]', el).addEventListener('click', () => renderMatch(el, item));
  }

  /* ---- Reihenfolge ---- */
  function renderOrder(el, item) {
    let order = shuffle(item.steps.map((s, i) => i));
    if (order.every((v, i) => v === i)) order.reverse();
    function draw(checked) {
      el.innerHTML = `<p class="small muted">Bringe die Schritte mit ▲ ▼ in die richtige Reihenfolge.</p>
        <ol class="order-list">${order.map((k, pos) => `<li class="${checked ? (k === pos ? 'ok' : 'bad') : ''}"><span class="pos">${pos + 1}</span><span class="txt">${esc(item.steps[k])}</span><span class="mv"><button type="button" data-up="${pos}" aria-label="nach oben" ${pos === 0 ? 'disabled' : ''}>▲</button><button type="button" data-dn="${pos}" aria-label="nach unten" ${pos === order.length - 1 ? 'disabled' : ''}>▼</button></span></li>`).join('')}</ol>
        <div class="row mt"><button class="btn primary" data-a="check">Prüfen</button><button class="btn" data-a="solve">Lösung zeigen</button><button class="btn ghost" data-a="reset">Neu mischen</button></div><div data-r="fb"></div>`;
      $$('[data-up]', el).forEach(b => b.addEventListener('click', () => { const p = +b.dataset.up; [order[p - 1], order[p]] = [order[p], order[p - 1]]; draw(false); el.querySelectorAll('[data-up]')[p - 1] && el.querySelectorAll('[data-up]')[Math.max(0, p - 1)].focus(); }));
      $$('[data-dn]', el).forEach(b => b.addEventListener('click', () => { const p = +b.dataset.dn; [order[p + 1], order[p]] = [order[p], order[p + 1]]; draw(false); const nb = el.querySelectorAll('[data-dn]')[p + 1]; if (nb) nb.focus(); }));
      $('[data-a=check]', el).addEventListener('click', () => {
        const ok = order.filter((k, pos) => k === pos).length;
        record('order', item, ok, order.length);
        draw(true);
        $('[data-r=fb]', el).innerHTML = `<div class="feedback ${ok === order.length ? 'ok' : 'bad'}"><b class="t">${ok} von ${order.length} Schritten an der richtigen Position</b>${ok === order.length ? 'Perfekt!' : 'Rot markierte Schritte stehen noch falsch.'}</div>`;
      });
      $('[data-a=solve]', el).addEventListener('click', () => { order = item.steps.map((s, i) => i); draw(true); });
      $('[data-a=reset]', el).addEventListener('click', () => renderOrder(el, item));
    }
    draw(false);
  }

  /* ---- Beschriften ---- */
  function renderLabel(el, item) {
    const fig = BIO.figures[item.figure];
    const slots = fig.slots;
    const assign = {}; // slotIndex -> labelIndex
    const labels = shuffle(slots.map((s, i) => i));
    let selected = null;
    function svgWithSlots() {
      const marks = slots.map((s, i) => `<g class="slot" data-slot="${i}" tabindex="0"><circle cx="${s.x}" cy="${s.y}" r="13"/><text class="num" x="${s.x}" y="${s.y}">${i + 1}</text></g>`).join('');
      return `<svg viewBox="${fig.viewBox}" class="model" role="img" aria-label="${esc(fig.title)}">${fig.render({ bare: true })}${marks}</svg>`;
    }
    el.innerHTML = `<p class="small muted">1. Begriff antippen · 2. Nummer im Bild oder in der Liste antippen. Erneutes Antippen einer Nummer entfernt die Zuordnung.</p>
      <div class="lab-stage">${svgWithSlots()}</div>
      <div class="label-bank" data-r="bank"></div>
      <ul class="slot-list" data-r="list"></ul>
      <div class="row mt"><button class="btn primary" data-a="check">Prüfen</button><button class="btn" data-a="solve">Lösung zeigen</button><button class="btn ghost" data-a="reset">Zurücksetzen</button></div><div data-r="fb"></div>`;
    function refresh(checked) {
      const used = new Set(Object.values(assign));
      $('[data-r=bank]', el).innerHTML = labels.map(li => `<button type="button" class="label-chip ${selected === li ? 'sel' : ''} ${used.has(li) ? 'used' : ''}" data-l="${li}">${esc(slots[li].label)}</button>`).join('');
      $('[data-r=list]', el).innerHTML = slots.map((s, i) => {
        const v = assign[i];
        const cls = checked ? (v === i ? 'ok' : 'bad') : (v != null ? 'filled' : '');
        return `<li class="${cls}" data-slot="${i}"><b>${i + 1}</b><span class="val">${v != null ? esc(slots[v].label) : ''}</span>${checked && v !== i ? `<span class="small" style="color:var(--ok);margin-left:auto">→ ${esc(s.label)}</span>` : ''}</li>`;
      }).join('');
      $$('.slot', el).forEach(g => {
        const i = +g.dataset.slot, v = assign[i];
        g.classList.toggle('filled', v != null && !checked);
        g.classList.toggle('ok', !!checked && v === i);
        g.classList.toggle('bad', !!checked && v !== i);
      });
    }
    function put(i) {
      if (selected == null) { if (assign[i] != null) { delete assign[i]; refresh(); } else toast('Wähle zuerst einen Begriff.'); return; }
      Object.keys(assign).forEach(k => { if (assign[k] === selected) delete assign[k]; });
      assign[i] = selected; selected = null; refresh();
    }
    el.addEventListener('click', e => {
      const chip = e.target.closest('.label-chip');
      if (chip) { const l = +chip.dataset.l; selected = selected === l ? null : l; refresh(); return; }
      const s = e.target.closest('[data-slot]');
      if (s) put(+s.dataset.slot);
    });
    el.addEventListener('keydown', e => { const s = e.target.closest('.slot'); if (s && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); put(+s.dataset.slot); } });
    $('[data-a=check]', el).addEventListener('click', () => {
      const ok = slots.filter((s, i) => assign[i] === i).length;
      record('label', item, ok, slots.length);
      refresh(true);
      $('[data-r=fb]', el).innerHTML = `<div class="feedback ${ok === slots.length ? 'ok' : 'bad'}"><b class="t">${ok} von ${slots.length} richtig beschriftet</b></div>`;
    });
    $('[data-a=solve]', el).addEventListener('click', () => { slots.forEach((s, i) => { assign[i] = i; }); refresh(true); });
    $('[data-a=reset]', el).addEventListener('click', () => renderLabel(el, item));
    refresh();
  }

  /* ---- Offene Fragen ---- */
  function renderOpen(el, item) {
    const saved = store.state.open[item.id] || {};
    el.innerHTML = `<div class="q-text">${esc(item.q)}</div><p class="small muted">${item.points} Punkte · Schreibe deine Antwort (wird lokal gespeichert), dann vergleiche mit der Musterlösung.</p>
      <textarea class="answer" aria-label="Deine Antwort" placeholder="Deine Antwort …">${esc(saved.text || '')}</textarea>
      <div class="row mt"><button class="btn primary" data-a="sol">Musterlösung &amp; Selbstbewertung</button></div>
      <div data-r="sol" class="hidden"><div class="solution"><b>Musterlösung</b>${item.solution}</div>
        <h3>Checkliste – was hast du erwähnt?</h3><ul class="check-list">${item.checklist.map((c, i) => `<li><input type="checkbox" id="${item.id}-c${i}" data-i="${i}" ${(saved.checks || []).includes(i) ? 'checked' : ''}><label for="${item.id}-c${i}">${esc(c)}</label></li>`).join('')}</ul>
        <div class="row"><span class="score-badge" data-r="pts">0</span><span class="muted">/ ${item.points} Punkte (Selbstbewertung)</span><span class="spacer"></span><button class="btn navy" data-a="save">Bewertung speichern</button></div></div>`;
    const ta = $('textarea', el);
    ta.addEventListener('input', () => store.saveOpen(item.id, { text: ta.value }));
    const pts = () => { const n = $$('.check-list input:checked', el).length; return Math.round(item.points * n / item.checklist.length * 2) / 2; };
    const upd = () => { $('[data-r=pts]', el).textContent = String(pts()).replace('.', ','); };
    $$('.check-list input', el).forEach(c => c.addEventListener('change', upd));
    $('[data-a=sol]', el).addEventListener('click', () => { $('[data-r=sol]', el).classList.remove('hidden'); upd(); });
    $('[data-a=save]', el).addEventListener('click', () => {
      const checks = $$('.check-list input:checked', el).map(c => +c.dataset.i);
      store.saveOpen(item.id, { checks, points: pts(), max: item.points });
      record('open', item, pts(), item.points);
      toast(`Gespeichert: ${String(pts()).replace('.', ',')} / ${item.points} Punkte`);
    });
    if (saved.checks) { $('[data-r=sol]', el).classList.remove('hidden'); upd(); }
  }

  /* ======================= Fehlerliste ======================= */
  function fehler(main) {
    const errs = Object.entries(store.state.errors).sort((a, b) => (b[1].count - a[1].count) || (b[1].ts - a[1].ts));
    const label = { mc: 'Quizfrage', card: 'Karteikarte', cloze: 'Lückentext', match: 'Zuordnung', order: 'Reihenfolge', label: 'Beschriften', open: 'Offene Frage', diag: 'Diagramm', exam: 'Klausurfrage' };
    const find = (type, id) => {
      if (type === 'mc' || type === 'exam') { const x = BIO.mc.find(m => m.id === id); return x ? [x.q, '#/uebungen/quiz?mode=fehler' + (x.topic ? '&topic=' + x.topic : '')] : null; }
      if (type === 'card') { const x = BIO.cards.find(c => c.id === id); return x ? [x.front + ' – ' + x.back, '#/uebungen/karten?mode=schwer&topic=' + x.topic] : null; }
      const map = { cloze: ['cloze', 'lueckentext'], match: ['matching', 'zuordnung'], order: ['ordering', 'reihenfolge'], label: ['labeling', 'beschriften'], open: ['open', 'offen'] };
      if (map[type]) { const x = BIO[map[type][0]].find(e => e.id === id); return x ? [x.title || BIO.stripTags(x.q), `#/uebungen/${map[type][1]}?id=${x.id}`] : null; }
      if (type === 'diag') return ['Diagrammaufgabe', '#/diagramme/' + id.split('-')[0]];
      return null;
    };
    const rows = errs.map(([key, e]) => { const f = find(e.type, e.id); return f ? { key, e, text: f[0], href: f[1] } : null; }).filter(Boolean);
    const mcCount = rows.filter(r => r.e.type === 'mc').length;
    main.innerHTML = `${backLink('#/uebungen', 'Übungen')}<div class="page-head"><h1>Meine Fehlerliste</h1><p>Alles, was du zuletzt falsch beantwortet oder als „nicht gewusst“ bewertet hast. Ein Eintrag verschwindet automatisch, sobald du die Aufgabe richtig löst.</p></div>
      ${rows.length ? `<div class="row" style="margin-bottom:14px">${mcCount ? `<a class="btn primary" href="#/uebungen/quiz?mode=fehler">Alle ${mcCount} Quizfehler wiederholen</a>` : ''}<a class="btn" href="#/uebungen/karten?mode=schwer">Schwierige Karten üben</a></div>
      <div class="card"><ul class="goal-list">${rows.map(r => `<li><span><span class="row" style="gap:6px;margin-bottom:4px">${topicChip(r.e.topic)}<span class="chip gray">${label[r.e.type] || r.e.type}</span><span class="chip bad">${r.e.count}× falsch</span></span>${esc(r.text)}</span><span class="row"><a class="btn small" href="${r.href}">Üben</a><button class="btn small ghost" data-del="${esc(r.key)}" title="Aus Liste entfernen">✕</button></span></li>`).join('')}</ul></div>`
      : '<div class="card"><p>🎉 Deine Fehlerliste ist leer. Übe weiter – falsche Antworten landen automatisch hier.</p><a class="btn primary" href="#/uebungen/mix">Mischfragen starten</a></div>'}`;
    $$('[data-del]', main).forEach(b => b.addEventListener('click', () => { store.removeError(b.dataset.del); fehler(main); }));
  }

  /* ======================= Routen ======================= */
  const cfgs = {
    lueckentext: { route: 'lueckentext', kind: 'cloze', title: 'Lückentexte', sub: 'Setze die fehlenden Fachbegriffe ein. Groß-/Kleinschreibung ist egal.', icon: '✎', get items() { return BIO.cloze; }, render: renderCloze },
    zuordnung: { route: 'zuordnung', kind: 'match', title: 'Zuordnung', sub: 'Ordne Begriffe und Aussagen richtig zu.', icon: '⇆', get items() { return BIO.matching; }, render: renderMatch },
    reihenfolge: { route: 'reihenfolge', kind: 'order', title: 'Reihenfolge', sub: 'Bringe Abläufe in die richtige Reihenfolge.', icon: '↕', get items() { return BIO.ordering; }, render: renderOrder },
    beschriften: { route: 'beschriften', kind: 'label', title: 'Beschriften', sub: 'Beschrifte Abbildungen – erst Begriff, dann Nummer antippen.', icon: '🏷', get items() { return BIO.labeling; }, render: renderLabel },
    offen: { route: 'offen', kind: 'open', title: 'Offene Klausurfragen', sub: 'Antwort formulieren, mit Musterlösung vergleichen, selbst bewerten.', icon: '📝', get items() { return BIO.open; }, render: renderOpen }
  };
  BIO.routes.uebungen = function (main, parts, q) {
    const sub = parts[1];
    if (!sub) return hub(main);
    if (sub === 'quiz') return quiz(main, q);
    if (sub === 'mix') return quiz(main, {}, { limit: 12, noFilter: true, title: 'Zufällige Mischfragen', sub: '12 zufällige Fragen aus allen 10 Themen. Falsche Antworten kommen am Ende noch einmal.' });
    if (sub === 'karten') return karten(main, q);
    if (sub === 'fehler') return fehler(main);
    if (cfgs[sub]) return listPage(main, q, cfgs[sub]);
    hub(main);
  };
  BIO.ex = { renderCloze, renderMatch, renderOrder, renderLabel, renderOpen, quiz };
})();
