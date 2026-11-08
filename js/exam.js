/* =========================================================================
   Klausurmodus: Themen & Schwierigkeit wählen, gemischte Aufgaben ohne
   Sofort-Lösung, Auswertung mit Punkten, Fehlern, Musterlösungen, Lernzielen
   ========================================================================= */
(function () {
  const { esc, $, $$, shuffle, store, topicChip, levelTag, backLink, goalText, fmtDate, pct } = BIO;
  let session = null; // laufende Klausur (nur im Speicher)

  function setup(main) {
    const last = store.state.exams;
    main.innerHTML = `<div class="page-head"><h1>Klausurmodus</h1><p>Teste dich wie in der echten Klausur: gemischte Aufgaben (Multiple Choice, Zuordnung, offene Fragen, Diagramme), <b>keine Lösungen während der Bearbeitung</b>. Am Ende siehst du Punkte, Fehler, Musterlösungen und nicht beherrschte Lernziele.</p></div>
      <div class="card"><h2 style="margin-top:0">1. Themen</h2>
        <div class="row" style="margin-bottom:10px"><button type="button" class="btn small" data-a="all">Alle</button><button type="button" class="btn small ghost" data-a="none">Keine</button></div>
        <div class="grid grid-2">${BIO.topics.map(t => `<label class="toggle"><input type="checkbox" name="tp" value="${t.id}" checked> ${t.nr}. ${esc(t.title)}</label>`).join('')}</div>
        <h2>2. Schwierigkeit</h2>
        <div class="row" role="radiogroup">${[['mix', 'Gemischt'], ['1', 'Stufe 1 · Grundlagen'], ['2', 'Stufe 2 · Anwendung'], ['3', 'Stufe 3 · Transfer']].map((l, i) => `<label class="toggle"><input type="radio" name="lvl" value="${l[0]}" ${i === 0 ? 'checked' : ''}> ${l[1]}</label>`).join('')}</div>
        <h2>3. Umfang</h2>
        <div class="row">${[[8, 'kurz (8 Aufgaben)'], [14, 'mittel (14 Aufgaben)'], [20, 'lang (20 Aufgaben)']].map((l, i) => `<label class="toggle"><input type="radio" name="len" value="${l[0]}" ${i === 1 ? 'checked' : ''}> ${l[1]}</label>`).join('')}</div>
        <label class="toggle mt"><input type="checkbox" id="exTimer" checked> Zeit anzeigen (Richtwert: 3 min pro Aufgabe)</label>
        <div class="row mt"><button type="button" class="btn primary" data-a="start">Klausur starten</button><span class="small muted" data-r="msg"></span></div></div>
      <h2>Bisherige Ergebnisse</h2>
      <div class="card">${last.length ? last.slice(0, 10).map(e => `<div class="result-row"><span>${fmtDate(e.ts)} · ${e.count} Aufgaben · ${e.topics.length === BIO.topics.length ? 'alle Themen' : 'Themen ' + e.topics.map(t => BIO.topicById[t] ? BIO.topicById[t].nr : t).join(', ')}</span><b>${String(e.score).replace('.', ',')}/${e.max} P. · ${pct(e.score, e.max)} %${e.grade != null ? ` · ${e.grade} NP` : ''}</b></div>`).join('') : '<p class="muted">Noch keine Probeklausur geschrieben.</p>'}</div>`;
    $('[data-a=all]', main).addEventListener('click', () => $$('[name=tp]', main).forEach(c => c.checked = true));
    $('[data-a=none]', main).addEventListener('click', () => $$('[name=tp]', main).forEach(c => c.checked = false));
    $('[data-a=start]', main).addEventListener('click', () => {
      const topics = $$('[name=tp]:checked', main).map(c => c.value);
      if (!topics.length) { $('[data-r=msg]', main).textContent = 'Bitte mindestens ein Thema wählen.'; return; }
      const lvl = $('[name=lvl]:checked', main).value, len = +$('[name=len]:checked', main).value;
      session = build(topics, lvl, len, $('#exTimer', main).checked);
      if (!session.items.length) { $('[data-r=msg]', main).textContent = 'Für diese Auswahl gibt es keine Aufgaben.'; return; }
      location.hash = '#/klausur/laufend';
    });
  }

  /* ---------- Aufgaben zusammenstellen ---------- */
  function build(topics, lvl, len, timer) {
    const inT = x => topics.includes(x.topic);
    const lvOK = x => lvl === 'mix' || !x.level || String(x.level) === lvl;
    // Verteilung: ~50 % MC, ~15 % Zuordnung, ~20 % offen, ~15 % Diagramm
    const mc = shuffle(BIO.mc.filter(x => inT(x) && lvOK(x)));
    const mt = shuffle(BIO.matching.filter(inT));
    const op = shuffle(BIO.open.filter(x => inT(x) && lvOK(x)));
    const dg = shuffle(BIO.diagramTaskList().filter(x => inT(x) && ['mark', 'draw', 'mc', 'axes'].includes(x.type)));
    const want = { open: Math.round(len * 0.2), match: Math.round(len * 0.15), diag: Math.round(len * 0.15) };
    const items = [];
    op.slice(0, want.open).forEach(x => items.push({ kind: 'open', x }));
    mt.slice(0, want.match).forEach(x => items.push({ kind: 'match', x }));
    dg.slice(0, want.diag).forEach(x => items.push({ kind: 'diag', x }));
    // Rest mit MC auffüllen, Themen möglichst gleichmäßig
    const byTopic = {}; mc.forEach(q => (byTopic[q.topic] = byTopic[q.topic] || []).push(q));
    const tks = shuffle(Object.keys(byTopic));
    let guard = 0;
    while (items.length < len && guard++ < 500) {
      const t = tks[guard % tks.length]; if (!t) break;
      const q = byTopic[t].shift(); if (q) items.push({ kind: 'mc', x: q });
      if (tks.every(k => !byTopic[k].length)) break;
    }
    // falls zu wenige MC: mit offenen/Diagramm auffüllen
    op.slice(want.open).concat([]).forEach(x => { if (items.length < len) items.push({ kind: 'open', x }); });
    dg.slice(want.diag).forEach(x => { if (items.length < len) items.push({ kind: 'diag', x }); });
    const ordered = shuffle(items.filter(i => i.kind === 'mc' || i.kind === 'match' || i.kind === 'diag')).concat(items.filter(i => i.kind === 'open'));
    return { topics, lvl, timer, items: ordered.map(it => Object.assign(it, { answer: null })), start: Date.now(), idx: 0 };
  }

  /* ---------- Bearbeitung ---------- */
  function points(it) {
    if (it.kind === 'mc') return 1;
    if (it.kind === 'match') return it.x.pairs.length >= 5 ? 3 : 2;
    if (it.kind === 'open') return it.x.points;
    if (it.kind === 'diag') return it.x.type === 'draw' ? 3 : it.x.type === 'mark' ? it.x.task.targets.length : it.x.type === 'axes' ? 2 : 1;
    return 1;
  }
  const KIND = { mc: 'Multiple Choice', match: 'Zuordnung', open: 'Offene Aufgabe', diag: 'Diagramm' };

  function run(main) {
    if (!session) { location.hash = '#/klausur'; return; }
    const s = session;
    const total = s.items.reduce((a, it) => a + points(it), 0);
    main.innerHTML = `<div class="page-head"><div class="row"><h1 class="mb0">Probeklausur</h1><span class="spacer"></span>${s.timer ? `<span class="timer" data-r="timer">00:00</span><span class="small muted">/ ~${s.items.length * 3} min</span>` : ''}</div><p>${s.items.length} Aufgaben · ${total} Punkte · Lösungen gibt es erst bei der Abgabe.</p></div>
      <div class="card" data-r="q"></div>
      <div class="exam-nav"><div class="row"><button type="button" class="btn" data-a="prev">← Zurück</button><div class="step-dots" data-r="dots"></div><span class="spacer"></span><button type="button" class="btn" data-a="next">Weiter →</button><button type="button" class="btn primary" data-a="submit">Abgeben</button></div></div>`;
    const qEl = $('[data-r=q]', main);
    const apis = s.apis = s.apis || {};
    function dots() {
      $('[data-r=dots]', main).innerHTML = s.items.map((it, k) => `<button type="button" class="${k === s.idx ? 'on' : ''} ${answered(it, k) ? 'done' : ''}" data-go="${k}" aria-label="Aufgabe ${k + 1}" title="Aufgabe ${k + 1}">${k + 1}</button>`).join('');
    }
    function answered(it, k) {
      if (it.kind === 'mc') return it.answer != null;
      if (it.kind === 'match') return it.answer && it.answer.some(Boolean);
      if (it.kind === 'open') return !!(it.answer && it.answer.trim());
      return !!it.touched;
    }
    // Eingaben aus der aktuellen Ansicht übernehmen
    function collect() {
      const it = s.items[s.idx];
      if (it.kind === 'match') it.answer = $$('select', qEl).map(x => x.value);
      if (it.kind === 'open') { const ta = $('textarea', qEl); if (ta) it.answer = ta.value; }
    }
    function show() {
      const it = s.items[s.idx], x = it.x, p = points(it);
      const meta = `<div class="q-meta">${topicChip(x.topic)}<span class="chip gray">${KIND[it.kind]}</span>${x.level ? levelTag(x.level) : ''}<span class="chip">${p} P.</span><span class="spacer"></span><span class="small muted">Aufgabe ${s.idx + 1} / ${s.items.length}</span></div>`;
      if (it.kind === 'mc') {
        it.order = it.order || shuffle(x.options.map((o, i) => i));
        qEl.innerHTML = meta + `<div class="q-text">${esc(x.q)}</div><div class="options">${it.order.map((k, j) => `<button type="button" class="option ${it.answer === k ? 'picked' : ''}" data-k="${k}"><span class="key">${'ABCDEFG'[j]}</span><span>${esc(x.options[k])}</span></button>`).join('')}</div>`;
        $$('.option', qEl).forEach(b => b.addEventListener('click', () => { it.answer = +b.dataset.k; $$('.option', qEl).forEach(o => o.classList.toggle('picked', o === b)); dots(); }));
      } else if (it.kind === 'match') {
        it.rights = it.rights || shuffle(x.pairs.map(pp => pp[1]));
        const a = it.answer || [];
        qEl.innerHTML = meta + `<div class="q-text">${esc(x.title)}</div><p class="small muted">Ordne jedem Begriff die passende Aussage zu.</p>${x.pairs.map((pp, i) => `<div class="match-row"><div class="left">${esc(pp[0])}</div><select data-i="${i}"><option value="">– wählen –</option>${it.rights.map(r => `<option ${a[i] === r ? 'selected' : ''}>${esc(r)}</option>`).join('')}</select></div>`).join('')}`;
        $$('select', qEl).forEach(sel => sel.addEventListener('change', () => { collect(); dots(); }));
      } else if (it.kind === 'open') {
        qEl.innerHTML = meta + `<div class="q-text">${esc(x.q)}</div><textarea class="answer" placeholder="Deine Antwort …" aria-label="Deine Antwort">${esc(it.answer || '')}</textarea><p class="small muted">Offene Aufgaben bewertest du nach der Abgabe selbst anhand von Musterlösung und Checkliste.</p>`;
        $('textarea', qEl).addEventListener('input', e => { it.answer = e.target.value; dots(); });
      } else if (it.kind === 'diag') {
        it.touchedNow = false;
        qEl.innerHTML = meta + `<div class="q-text">${esc(x.task.q)}</div>${it.result ? '<p class="small muted">Bereits bearbeitet – deine Antwort ist gespeichert. Wenn du hier erneut zeichnest/markierst, wird sie ersetzt.</p>' : ''}<div data-r="d"></div>`;
        // Diagramm-Aufgaben behalten ihren Zustand nur solange sie angezeigt werden → Ergebnis beim Verlassen sichern
        const api = BIO.diagRender($('[data-r=d]', qEl), x.set, x.task, 'exam-' + x.key);
        apis[s.idx] = api;
        $('[data-r=d]', qEl).addEventListener('pointerdown', () => { it.touched = it.touchedNow = true; setTimeout(dots, 0); });
        $('[data-r=d]', qEl).addEventListener('change', () => { it.touched = it.touchedNow = true; dots(); });
      }
      $('[data-a=prev]', main).disabled = s.idx === 0;
      $('[data-a=next]', main).disabled = s.idx === s.items.length - 1;
      dots();
    }
    function leave() {
      collect();
      const it = s.items[s.idx];
      if (it.kind === 'diag' && apis[s.idx] && it.touchedNow) { it.result = apis[s.idx].evaluate(); it.snapshot = $('[data-r=d]', qEl).innerHTML; }
    }
    function go(k) { leave(); s.idx = BIO.clamp(k, 0, s.items.length - 1); show(); window.scrollTo(0, 0); }
    $('[data-a=prev]', main).addEventListener('click', () => go(s.idx - 1));
    $('[data-a=next]', main).addEventListener('click', () => go(s.idx + 1));
    $('[data-r=dots]', main).addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) go(+b.dataset.go); });
    $('[data-a=submit]', main).addEventListener('click', () => {
      leave();
      const open = s.items.filter((it, k) => !answered(it, k)).length;
      if (open && !confirm(`${open} Aufgabe(n) sind noch unbearbeitet. Trotzdem abgeben?`)) return;
      s.end = Date.now();
      location.hash = '#/klausur/ergebnis';
    });
    if (s.timer) {
      const tEl = $('[data-r=timer]', main);
      const tick = () => {
        if (!tEl.isConnected) return clearInterval(iv);
        const sec = Math.floor((Date.now() - s.start) / 1000);
        tEl.textContent = String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0');
        tEl.style.color = sec > s.items.length * 180 ? 'var(--bad)' : '';
      };
      const iv = setInterval(tick, 1000); tick();
    }
    show();
  }

  /* ---------- Auswertung ---------- */
  function result(main) {
    if (!session || !session.end) { location.hash = '#/klausur'; return; }
    const s = session;
    s.items.forEach(it => {
      it.max = points(it);
      if (it.kind === 'mc') { it.score = it.answer === it.x.correct ? 1 : 0; }
      else if (it.kind === 'match') { const a = it.answer || []; const ok = it.x.pairs.filter((pp, i) => a[i] === pp[1]).length; it.score = Math.round(it.max * ok / it.x.pairs.length * 2) / 2; it.ok = ok; }
      else if (it.kind === 'diag') { const r = it.result || { score: 0, max: it.max, detail: 'Nicht bearbeitet.' }; it.score = Math.round(it.max * r.score / (r.max || 1) * 2) / 2; it.detail = r.detail; }
      else if (it.kind === 'open') { it.score = it.self != null ? it.self : 0; }
    });
    function render() {
      const max = s.items.reduce((a, it) => a + it.max, 0);
      const score = s.items.reduce((a, it) => a + (it.score || 0), 0);
      const p = pct(score, max);
      const np = notenpunkte(score / max);
      const openPending = s.items.filter(it => it.kind === 'open' && it.self == null).length;
      const wrongGoals = [...new Set(s.items.filter(it => it.score / it.max < 0.7).map(it => it.x.goal).filter(Boolean))];
      const mins = Math.round((s.end - s.start) / 60000);
      main.innerHTML = `${backLink('#/klausur', 'Klausurmodus')}<div class="page-head"><h1>Auswertung</h1><p>Bearbeitungszeit: ${mins} min · ${s.items.length} Aufgaben</p></div>
        <div class="card"><div class="row" style="gap:24px"><div class="ring" style="--p:${p}"><div><div><b>${p} %</b><small>${String(score).replace('.', ',')}/${max} P.</small></div></div></div>
          <div style="flex:1;min-width:220px"><p class="mb0"><b>Orientierung:</b> ca. <b>${np} Notenpunkte</b> <span class="small muted">(Richtwert nach üblicher Oberstufen-Tabelle, ersetzt keine Lehrerbewertung)</span></p>
          ${openPending ? `<div class="box warn mt"><div class="box-title">Noch ${openPending} offene Aufgabe(n) selbst bewerten</div><p class="mb0">Hake unten bei den offenen Aufgaben ab, was du erwähnt hast – das Ergebnis aktualisiert sich.</p></div>` : ''}
          <div class="row mt"><button type="button" class="btn primary" data-a="save" ${s.saved ? 'disabled' : ''}>${s.saved ? '✓ Ergebnis gespeichert' : 'Ergebnis speichern'}</button><a class="btn" href="#/klausur">Neue Klausur</a><a class="btn ghost" href="#/uebungen/fehler">Fehlerliste</a></div></div></div></div>
        <h2>Nicht beherrschte Lernziele (${wrongGoals.length})</h2>
        <div class="card">${wrongGoals.length ? `<ul class="goal-list">${wrongGoals.map(g => { const go = BIO.goalById[g]; return `<li><span>${go ? `<a class="chip navy" href="#/lernzettel/${go.topic}">Thema ${BIO.topicById[go.topic].nr}</a> ` : ''}${esc(goalText(g))}</span>${BIO.statusGroup('goal', g, store.state.goals[g])}</li>`; }).join('')}</ul>` : '<p>🎉 Alle geprüften Lernziele beherrscht.</p>'}</div>
        <h2>Alle Aufgaben mit Lösungen</h2>
        <div class="card">${s.items.map((it, k) => itemResult(it, k)).join('')}</div>`;
      $$('[data-self]', main).forEach(box => {
        const k = +box.dataset.self, it = s.items[k];
        $$('input', box).forEach(c => c.addEventListener('change', () => {
          const n = $$('input:checked', box).length;
          it.self = Math.round(it.x.points * n / it.x.checklist.length * 2) / 2; it.score = it.self;
          it.checks = $$('input', box).map(c2 => c2.checked);
          const y = window.scrollY; render(); window.scrollTo(0, y);
        }));
      });
      const sv = $('[data-a=save]', main);
      if (sv) sv.addEventListener('click', () => {
        s.items.forEach(it => {
          const ok = it.score / it.max >= 0.7;
          if (it.kind === 'mc') store.recordMC(it.x, ok);
          else if (it.kind === 'match') { store.recordError('match', it.x.id, it.x.topic, ok, it.x.goal); store.recordEx('match:' + it.x.id, it.score, it.max); }
          else if (it.kind === 'open' && it.self != null) { store.recordError('open', it.x.id, it.x.topic, ok, it.x.goal); store.recordEx('open:' + it.x.id, it.score, it.max); }
          else if (it.kind === 'diag') { store.recordError('diag', it.x.key, it.x.topic, ok, it.x.goal); store.recordEx('diag:' + it.x.key, it.score, it.max); }
        });
        store.addExam({ ts: s.end, score, max, count: s.items.length, topics: s.topics, level: s.lvl, grade: np, wrongGoals });
        s.saved = true; BIO.toast('Ergebnis gespeichert – Fehler wurden in deine Fehlerliste übernommen.');
        document.dispatchEvent(new CustomEvent('bio:progress'));
        const y = window.scrollY; render(); window.scrollTo(0, y);
      });
    }
    render();
  }
  function notenpunkte(f) {
    const t = [0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65, 0.60, 0.55, 0.50, 0.45, 0.40, 0.33, 0.27, 0.20];
    for (let i = 0; i < t.length; i++) if (f >= t[i]) return 15 - i;
    return 0;
  }
  function itemResult(it, k) {
    const x = it.x, full = it.score >= it.max, part = it.score > 0;
    const head = `<div class="q-meta">${topicChip(x.topic)}<span class="chip gray">${KIND[it.kind]}</span><span class="chip ${it.kind === 'open' && it.self == null ? 'warn' : full ? 'ok' : part ? 'warn' : 'bad'}">${it.kind === 'open' && it.self == null ? 'selbst bewerten' : String(it.score).replace('.', ',') + ' / ' + it.max + ' P.'}</span><span class="spacer"></span><span class="small muted">Aufgabe ${k + 1}</span></div>`;
    let body = '';
    if (it.kind === 'mc') {
      body = `<div class="q-text">${esc(x.q)}</div><div class="options">${(it.order || x.options.map((o, i) => i)).map(i => `<div class="option ${i === x.correct ? 'correct' : it.answer === i ? 'wrong' : ''}"><span>${esc(x.options[i])}</span></div>`).join('')}</div>${it.answer == null ? '<p class="small" style="color:var(--bad)">Nicht beantwortet.</p>' : ''}<div class="feedback neutral"><b class="t">Erklärung</b>${esc(x.expl)}</div>`;
    } else if (it.kind === 'match') {
      const a = it.answer || [];
      body = `<div class="q-text">${esc(x.title)}</div>${x.pairs.map((pp, i) => `<div class="result-row"><span>${esc(pp[0])}</span><span>${a[i] === pp[1] ? `<span style="color:var(--ok)">✓ ${esc(pp[1])}</span>` : `<span style="color:var(--bad)">✗ ${esc(a[i] || '–')}</span><br><span class="small">richtig: ${esc(pp[1])}</span>`}</span></div>`).join('')}`;
    } else if (it.kind === 'open') {
      body = `<div class="q-text">${esc(x.q)}</div><div class="box"><div class="box-title">Deine Antwort</div><p class="mb0" style="white-space:pre-wrap">${esc(it.answer || '– keine Antwort –')}</p></div><div class="solution"><b>Musterlösung</b>${x.solution}</div>
        <h3>Selbstbewertung – was hast du erwähnt?</h3><ul class="check-list" data-self="${k}">${x.checklist.map((c, i) => `<li><input type="checkbox" id="ex${k}c${i}" ${(it.checks || [])[i] ? 'checked' : ''}><label for="ex${k}c${i}">${esc(c)}</label></li>`).join('')}</ul>`;
    } else if (it.kind === 'diag') {
      body = `<div class="q-text">${esc(x.task.q)}</div><div class="feedback neutral"><b class="t">Bewertung</b>${it.detail || ''}</div>${x.task.hint ? `<p class="small">${esc(x.task.hint)}</p>` : ''}<p><a class="btn small" href="#/diagramme/${x.set}?t=${BIO.diagramSets[x.set].tasks.indexOf(x.task)}">Im Diagramm-Trainer üben</a></p>`;
    }
    const g = x.goal ? `<p class="small muted mb0"><b>Lernziel:</b> ${esc(goalText(x.goal))}</p>` : '';
    return `<div class="exam-q">${head}${body}${g}</div>`;
  }

  BIO.routes.klausur = function (main, parts) {
    if (parts[1] === 'laufend') return run(main);
    if (parts[1] === 'ergebnis') return result(main);
    setup(main);
  };
  window.addEventListener('beforeunload', e => { if (session && !session.end && location.hash.indexOf('#/klausur/laufend') === 0) { e.preventDefault(); e.returnValue = ''; } });
})();
