/* =========================================================================
   Kern: Speicherung (LocalStorage), Hilfsfunktionen, Fortschritt
   ========================================================================= */
(function () {
  const KEY = 'bioLK.v1';
  const DAY = 86400000;

  const defaults = () => ({
    version: 1,
    topicStatus: {},  // t1: 'gelernt' | 'unsicher' | 'offen'
    goals: {},        // t1g1: 'gelernt' | 'unsicher' | 'offen'
    mc: {},           // id: {right, wrong, last(bool), ts}
    cards: {},        // id: {box 1..5, last ts, seen}
    ex: {},           // key: {score, max, best, ts}
    errors: {},       // key: {type, id, topic, count, ts}
    open: {},         // id: {text, points, max, ts}
    read: {},         // t1: {ts}
    exams: [],        // [{ts, score, max, topics, level, wrongGoals}]
    created: Date.now(),
    updated: Date.now()
  });

  let storageOK = true;
  let state = defaults();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = Object.assign(defaults(), parsed);
      }
    } catch (e) { storageOK = false; state = defaults(); }
  }

  let saveTimer = null;
  function save() {
    state.updated = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      flashSaved(true);
    } catch (e) { storageOK = false; flashSaved(false); }
  }
  function saveSoon() { clearTimeout(saveTimer); saveTimer = setTimeout(save, 250); }

  function flashSaved(ok) {
    const el = document.getElementById('savedIndicator');
    if (!el) return;
    el.textContent = ok ? '● gespeichert' : '● Speichern nicht möglich';
    el.style.opacity = 1;
    clearTimeout(flashSaved.t);
    flashSaved.t = setTimeout(() => { el.style.opacity = .85; }, 900);
  }

  /* ---------- Hilfsfunktionen ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const pct = (a, b) => b ? Math.round(100 * a / b) : 0;
  function fmtDate(ts) {
    try { return new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch (e) { return String(ts); }
  }
  function toast(msg, ms) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove('show'), ms || 2200);
  }
  // Normalisierung für Texteingaben (Lückentext)
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[­]/g, '')
      .replace(/ß/g, 'ss')
      .replace(/[‐‑–—]/g, '-')
      .replace(/\s+/g, ' ')
      .replace(/[.,;:!?„“"']/g, '')
      .trim();
  }
  function stripTags(html) { return String(html || '').replace(/<[^>]*>/g, ''); }
  function topicTitle(tid) { const t = BIO.topicById[tid]; return t ? `${t.nr}. ${t.title}` : tid; }
  function topicChip(tid) { const t = BIO.topicById[tid]; return t ? `<a class="chip navy" href="#/lernzettel/${t.id}" title="${esc(t.title)}">Thema ${t.nr}</a>` : ''; }
  function levelLabel(l) { return ['', 'Grundlagen', 'Anwendung', 'Transfer'][l] || ''; }
  function levelTag(l) { return l ? `<span class="level level-${l}">Stufe ${l} · ${levelLabel(l)}</span>` : ''; }
  function topicOptions(sel, allLabel) {
    return `<option value="">${allLabel || 'Alle Themen'}</option>` + BIO.topics.map(t => `<option value="${t.id}" ${sel === t.id ? 'selected' : ''}>${t.nr}. ${esc(t.title)}</option>`).join('');
  }
  function backLink(href, label) { return `<a class="back-link" href="${href}">← ${esc(label || 'Zurück')}</a>`; }
  function goalText(gid) { const g = BIO.goalById[gid]; return g ? g.text : ''; }

  /* ---------- Aufzeichnungen ---------- */
  const store = {
    get state() { return state; },
    setTopicStatus(tid, s) { state.topicStatus[tid] = s; save(); },
    setGoal(gid, s) { state.goals[gid] = s; save(); },
    markRead(tid) { state.read[tid] = { ts: Date.now() }; save(); },
    recordMC(q, correct) {
      const r = state.mc[q.id] || { right: 0, wrong: 0 };
      if (correct) r.right++; else r.wrong++;
      r.last = !!correct; r.ts = Date.now();
      state.mc[q.id] = r;
      this.recordError('mc', q.id, q.topic, correct, q.goal);
      save();
    },
    // Fehlerliste: falsch → eintragen; richtig → austragen
    recordError(type, id, topic, correct, goal) {
      const key = type + ':' + id;
      if (correct) { delete state.errors[key]; }
      else {
        const e = state.errors[key] || { type, id, topic, goal, count: 0 };
        e.count++; e.ts = Date.now(); e.goal = goal || e.goal;
        state.errors[key] = e;
      }
    },
    recordEx(key, score, max, meta) {
      const prev = state.ex[key] || {};
      state.ex[key] = Object.assign({}, meta || {}, { score, max, best: Math.max(prev.best || 0, score), ts: Date.now() });
      save();
    },
    rateCard(card, rating) { // 'ok' | 'unsure' | 'no'
      const c = state.cards[card.id] || { box: 1, seen: 0 };
      if (rating === 'ok') c.box = Math.min(5, (c.box || 1) + 1);
      else if (rating === 'no') c.box = 1;
      else c.box = Math.max(1, Math.min(c.box || 1, 2));
      c.last = Date.now(); c.seen = (c.seen || 0) + 1; c.rating = rating;
      state.cards[card.id] = c;
      this.recordError('card', card.id, card.topic, rating === 'ok');
      save();
    },
    saveOpen(id, data) { state.open[id] = Object.assign(state.open[id] || {}, data, { ts: Date.now() }); saveSoon(); },
    addExam(rec) { state.exams.unshift(rec); state.exams = state.exams.slice(0, 30); save(); },
    removeError(key) { delete state.errors[key]; save(); },
    exportJSON() { return JSON.stringify(Object.assign({ app: 'bio-lk-lernplattform', exported: new Date().toISOString() }, state), null, 2); },
    importJSON(text) {
      const data = JSON.parse(text);
      if (!data || typeof data !== 'object' || (!data.mc && !data.goals && !data.cards)) throw new Error('Keine gültige Fortschrittsdatei.');
      const clean = defaults();
      Object.keys(clean).forEach(k => { if (data[k] !== undefined && typeof data[k] === typeof clean[k]) clean[k] = data[k]; });
      state = clean; save();
    },
    reset() { state = defaults(); save(); }
  };

  /* ---------- Leitner-Karteikasten ---------- */
  const BOX_DAYS = [0, 0, 1, 3, 7, 14]; // Index = Fach
  function cardInfo(card) { return state.cards[card.id] || { box: 1, seen: 0 }; }
  function cardDue(card) {
    const c = state.cards[card.id];
    if (!c || !c.last) return true;
    return Date.now() - c.last >= BOX_DAYS[c.box || 1] * DAY;
  }

  /* ---------- Fortschritt ---------- */
  const STATUS_VAL = { gelernt: 1, unsicher: 0.5, offen: 0 };
  function exItemsForTopic(tid) {
    const keys = [];
    (BIO.cloze || []).filter(x => x.topic === tid).forEach(x => keys.push('cloze:' + x.id));
    (BIO.matching || []).filter(x => x.topic === tid).forEach(x => keys.push('match:' + x.id));
    (BIO.ordering || []).filter(x => x.topic === tid).forEach(x => keys.push('order:' + x.id));
    (BIO.labeling || []).filter(x => x.topic === tid).forEach(x => keys.push('label:' + x.id));
    (BIO.open || []).filter(x => x.topic === tid).forEach(x => keys.push('open:' + x.id));
    (BIO.diagramTaskList ? BIO.diagramTaskList() : []).filter(x => x.topic === tid).forEach(x => keys.push('diag:' + x.key));
    return keys;
  }
  function topicProgress(tid) {
    const t = BIO.topicById[tid];
    const goals = t.goals.map(g => STATUS_VAL[state.goals[g.id]] || 0);
    const goalP = goals.length ? goals.reduce((a, b) => a + b, 0) / goals.length : 0;
    const mcs = (BIO.mc || []).filter(q => q.topic === tid);
    const mcRight = mcs.filter(q => state.mc[q.id] && state.mc[q.id].last).length;
    const mcDone = mcs.filter(q => state.mc[q.id]).length;
    const mcP = mcs.length ? mcRight / mcs.length : 0;
    const cards = (BIO.cards || []).filter(c => c.topic === tid);
    const cardP = cards.length ? cards.filter(c => (state.cards[c.id] || {}).box >= 3).length / cards.length : 0;
    const exKeys = exItemsForTopic(tid);
    const exDone = exKeys.filter(k => { const e = state.ex[k]; return e && e.max && e.best / e.max >= 0.7; }).length;
    const exP = exKeys.length ? exDone / exKeys.length : 0;
    const status = state.topicStatus[tid] || 'offen';
    let total = 0.35 * goalP + 0.25 * mcP + 0.2 * cardP + 0.2 * exP;
    if (status === 'gelernt') total = Math.max(total, 0.15 + total);
    total = Math.min(1, total);
    return {
      total: Math.round(total * 100), goalP, mcP, cardP, exP,
      mcRight, mcDone, mcTotal: mcs.length, cardsTotal: cards.length,
      exDone, exTotal: exKeys.length, status,
      openGoals: t.goals.filter(g => (state.goals[g.id] || 'offen') !== 'gelernt'),
      errors: Object.values(state.errors).filter(e => e.topic === tid).length
    };
  }
  function overallProgress() {
    const ps = BIO.topics.map(t => topicProgress(t.id).total);
    return Math.round(ps.reduce((a, b) => a + b, 0) / ps.length);
  }

  /* ---------- Status-Gruppe (gelernt/unsicher/offen) ---------- */
  function statusGroup(kind, id, current) {
    const cur = current || 'offen';
    return `<div class="status-group" data-kind="${kind}" data-id="${id}" role="group" aria-label="Status">` +
      ['gelernt', 'unsicher', 'offen'].map(s => `<button type="button" data-s="${s}" class="${cur === s ? 'on' : ''}" aria-pressed="${cur === s}">${s}</button>`).join('') +
      `</div>`;
  }
  // Globale Delegation für Status-Gruppen
  document.addEventListener('click', (ev) => {
    const b = ev.target.closest('.status-group button');
    if (!b) return;
    ev.preventDefault(); ev.stopPropagation();
    const g = b.parentElement;
    const s = b.dataset.s;
    if (g.dataset.kind === 'topic') store.setTopicStatus(g.dataset.id, s);
    else store.setGoal(g.dataset.id, s);
    g.querySelectorAll('button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    document.dispatchEvent(new CustomEvent('bio:progress'));
  }, true);

  load();

  window.BIO = window.BIO || {};
  Object.assign(BIO, {
    store, esc, $, $$, shuffle, clamp, pct, fmtDate, toast, norm, stripTags,
    topicTitle, topicChip, levelTag, levelLabel, topicOptions, backLink, goalText,
    cardInfo, cardDue, BOX_DAYS, topicProgress, overallProgress, statusGroup,
    storageOK: () => storageOK, routes: {}
  });
})();
