/* =========================================================================
   App: Router, Dashboard, Lernzettel, Lexikon, Datensicherung
   ========================================================================= */
(function () {
  const { esc, $, $$, store, topicProgress, overallProgress, statusGroup, topicChip, fmtDate, toast } = BIO;
  const main = document.getElementById('main');

  /* ======================= Dashboard ======================= */
  function dashboard(main) {
    const st = store.state;
    const all = overallProgress();
    const ps = BIO.topics.map(t => ({ t, p: topicProgress(t.id) }));
    const mcDone = Object.keys(st.mc).length;
    const mcRight = Object.values(st.mc).filter(m => m.last).length;
    const errs = Object.values(st.errors);
    const due = BIO.cards.filter(BIO.cardDue).length;
    const goalsAll = BIO.topics.reduce((a, t) => a + t.goals.length, 0);
    const goalsDone = BIO.topics.reduce((a, t) => a + t.goals.filter(g => st.goals[g.id] === 'gelernt').length, 0);
    const openGoals = ps.flatMap(x => x.p.openGoals.map(g => ({ g, t: x.t, s: st.goals[g.id] || 'offen' })));

    // Empfehlungen
    const rec = [];
    const weakest = ps.slice().sort((a, b) => a.p.total - b.p.total)[0];
    if (weakest && weakest.p.total < 100) rec.push(`<li>📘 Schwächstes Thema: <a href="#/lernzettel/${weakest.t.id}"><b>${weakest.t.nr}. ${esc(weakest.t.title)}</b></a> (${weakest.p.total} %) – Lernzettel lesen und danach das <a href="#/uebungen/quiz?topic=${weakest.t.id}">Themenquiz</a> machen.</li>`);
    if (errs.length) rec.push(`<li>⚠️ ${errs.length} offene Fehler – <a href="#/uebungen/fehler">Fehlerliste wiederholen</a>.</li>`);
    if (due) rec.push(`<li>🗂 ${due} Karteikarten sind fällig – <a href="#/uebungen/karten">jetzt wiederholen</a>.</li>`);
    const unsure = ps.filter(x => x.p.status === 'unsicher');
    if (unsure.length) rec.push(`<li>❓ Als unsicher markiert: ${unsure.map(x => `<a href="#/lernzettel/${x.t.id}">Thema ${x.t.nr}</a>`).join(', ')}.</li>`);
    const unread = BIO.topics.filter(t => !st.read[t.id]);
    if (unread.length) rec.push(`<li>📖 Noch nicht gelesen: ${unread.slice(0, 5).map(t => `<a href="#/lernzettel/${t.id}">Thema ${t.nr}</a>`).join(', ')}${unread.length > 5 ? ' …' : ''}.</li>`);
    if (!st.exams.length && all >= 40) rec.push(`<li>⏱ Teste dich unter Klausurbedingungen im <a href="#/klausur">Klausurmodus</a>.</li>`);
    if (!rec.length) rec.push('<li>🎉 Sehr gut – alles im grünen Bereich. Mach zur Sicherheit eine Probeklausur.</li>');

    main.innerHTML = `<div class="page-head"><h1>Dashboard</h1><p>Dein Lernstand für die 1. LK-Klausur: Proteine, Biomembranen, Membrantransport und Enzyme. Alles wird automatisch in diesem Browser gespeichert.</p></div>
      ${BIO.storageOK() ? '' : '<div class="box warn"><div class="box-title">Speichern nicht möglich</div><p>Dein Browser blockiert LocalStorage (z. B. privater Modus). Dein Fortschritt geht beim Schließen verloren – nutze „Daten sichern“ zum Exportieren.</p></div>'}
      <div class="card"><div class="row" style="gap:24px;align-items:center">
        <div class="ring" style="--p:${all}"><div><div><b>${all} %</b><small>gesamt</small></div></div></div>
        <div class="grid grid-4" style="flex:1;min-width:260px">
          <div class="stat"><b>${goalsDone}/${goalsAll}</b><span>Lernziele gelernt</span></div>
          <div class="stat"><b>${mcRight}/${BIO.mc.length}</b><span>Quizfragen richtig (${mcDone} bearbeitet)</span></div>
          <div class="stat ${errs.length ? 'bad' : ''}"><b>${errs.length}</b><span>offene Fehler</span></div>
          <div class="stat ${due ? 'warn' : ''}"><b>${due}</b><span>fällige Karteikarten</span></div>
        </div></div></div>
      <div class="grid grid-2">
        <div class="card"><h2 style="margin-top:0">Empfehlungen</h2><ul class="mb0">${rec.join('')}</ul></div>
        <div class="card"><h2 style="margin-top:0">Letzte Probeklausuren</h2>${st.exams.length ? st.exams.slice(0, 5).map(e => `<div class="result-row"><span>${fmtDate(e.ts)} · ${e.count || '?'} Aufgaben</span><b>${e.score}/${e.max} P. (${BIO.pct(e.score, e.max)} %)</b></div>`).join('') : '<p class="muted">Noch keine Probeklausur geschrieben.</p>'}<div class="row mt"><a class="btn primary" href="#/klausur">Klausurmodus</a><a class="btn" href="#/uebungen/mix">Mischfragen</a></div></div>
      </div>
      <h2>Themen</h2>
      <div class="grid grid-2">${ps.map(({ t, p }) => `<div class="card topic-card" data-href="#/lernzettel/${t.id}" tabindex="0" role="link" aria-label="Thema ${t.nr}: ${esc(t.title)}">
          <div class="row"><span class="topic-num">${t.nr}</span><div style="flex:1"><h3>${esc(t.title)}</h3><p class="small muted mb0">${esc(t.short)} · S. ${t.pages}</p></div><b>${p.total} %</b></div>
          <div class="progress"><span style="width:${p.total}%"></span></div>
          <div class="row small muted"><span>Quiz ${p.mcRight}/${p.mcTotal}</span><span>Übungen ${p.exDone}/${p.exTotal}</span><span>Lernziele ${t.goals.length - p.openGoals.length}/${t.goals.length}</span>${p.errors ? `<span class="chip bad">${p.errors} Fehler</span>` : ''}</div>
          <div class="row">${statusGroup('topic', t.id, p.status)}<span class="spacer"></span><a class="btn small" href="#/uebungen/quiz?topic=${t.id}">Quiz</a></div>
        </div>`).join('')}</div>
      <h2>Offene Lernziele (${openGoals.length})</h2>
      <div class="card">${openGoals.length ? `<ul class="goal-list">${openGoals.slice(0, 12).map(o => `<li><span><a class="chip navy" href="#/lernzettel/${o.t.id}">Thema ${o.t.nr}</a> ${esc(o.g.text)}</span>${statusGroup('goal', o.g.id, o.s)}</li>`).join('')}</ul>${openGoals.length > 12 ? `<p class="small muted">… und ${openGoals.length - 12} weitere – siehe Lernzettel.</p>` : ''}` : '<p>🎉 Alle Lernziele als gelernt markiert.</p>'}</div>`;
    $$('.topic-card', main).forEach(c => {
      const go = (e) => { if (e.target.closest('a,button')) return; location.hash = c.dataset.href; };
      c.addEventListener('click', go);
      c.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target === c) go(e); });
    });
  }

  /* ======================= Lernzettel ======================= */
  const SECTIONS = [
    ['grundlagen', 'Grundlagen'], ['erklaerung', 'Ausführliche Erklärung'], ['begriffe', 'Wichtige Fachbegriffe'],
    ['mechanismen', 'Mechanismen und Abläufe'], ['zusammenhaenge', 'Zusammenhänge'], ['abbildungen', 'Abbildungen und Modelle'],
    ['klausur', 'Klausurrelevantes Wissen'], ['fehler', 'Typische Fehler'], ['zusammenfassung', 'Zusammenfassung'], ['selbstkontrolle', 'Selbstkontrolle']
  ];
  function sheetOverview(main) {
    const st = store.state;
    main.innerHTML = `<div class="page-head"><h1>Lernzettel</h1><p>Die 10 Themen folgen exakt der Checkliste. Jeder Lernzettel hat 10 Abschnitte – von den Grundlagen bis zur Selbstkontrolle. Inhalte stammen aus dem Schulbuch (Seitenangaben 📖); Ergänzungen sind mit ➕ gekennzeichnet.</p></div>
      <div class="grid grid-2">${BIO.topics.map(t => { const p = topicProgress(t.id); return `<a class="card topic-card" href="#/lernzettel/${t.id}"><div class="row"><span class="topic-num">${t.nr}</span><div style="flex:1"><h3>${esc(t.title)}</h3><p class="small muted mb0">${esc(t.short)}</p></div></div>
        <div class="row small"><span class="chip gray">S. ${t.pages}</span><span class="chip ${p.status === 'gelernt' ? 'ok' : p.status === 'unsicher' ? 'warn' : 'gray'}">${p.status}</span>${st.read[t.id] ? '<span class="chip ok">gelesen</span>' : ''}<span class="muted">${t.goals.length} Lernziele · ${t.terms.length} Fachbegriffe</span></div></a>`; }).join('')}</div>`;
  }
  function sheet(main, tid) {
    const t = BIO.topicById[tid];
    if (!t) return sheetOverview(main);
    const s = t.sheet, st = store.state;
    const idx = BIO.topics.indexOf(t), prev = BIO.topics[idx - 1], next = BIO.topics[idx + 1];
    const content = {
      grundlagen: `<div class="prose">${s.intro}</div>`,
      erklaerung: `<div class="prose">${s.explain}</div>`,
      begriffe: `<div class="table-wrap"><table class="data term-table"><thead><tr><th>Begriff</th><th>Bedeutung</th></tr></thead><tbody>${s.termdefs.map(d => `<tr><th scope="row">${d[0]}</th><td>${d[1]}</td></tr>`).join('')}</tbody></table></div>
        <p class="small muted">Begriffe der Checkliste: ${t.terms.map(x => `<a href="#/lexikon?q=${encodeURIComponent(x)}">${esc(x)}</a>`).join(' · ')}</p>`,
      mechanismen: `<div class="prose">${s.mechanism}</div>`,
      zusammenhaenge: `<div class="prose">${s.connections}</div>`,
      abbildungen: `<p class="muted small">Interaktive Modelle – tippe auf Bestandteile oder nutze die Schritt-Navigation.</p>${s.figures.map(f => `<div data-figure="${f[0]}" data-caption="${esc(f[1])}"></div>`).join('')}`,
      klausur: `<div class="box exam"><div class="box-title">🎯 Das musst du in der Klausur können</div><ul>${s.exam.map(x => `<li>${x}</li>`).join('')}</ul></div>`,
      fehler: `<ul class="err-list">${s.errors.map(e => `<li><div class="wrong">✗ ${e[0]}</div><div class="right">✓ ${e[1]}</div></li>`).join('')}</ul>`,
      zusammenfassung: `<ul>${s.summary.map(x => `<li>${x}</li>`).join('')}</ul>`,
      selbstkontrolle: `${s.selfcheck.map((q, i) => `<details class="selfcheck"><summary>${i + 1}. ${q[0]}</summary><div>${q[1]}</div></details>`).join('')}
        <div class="row mt"><a class="btn primary" href="#/uebungen/quiz?topic=${t.id}">Quiz zu Thema ${t.nr}</a><a class="btn" href="#/uebungen/karten?topic=${t.id}&mode=alle">Karteikarten</a><a class="btn" href="#/uebungen/offen?topic=${t.id}">Offene Fragen</a></div>`
    };
    main.innerHTML = `<div class="crumbs"><a href="#/lernzettel">Lernzettel</a> › Thema ${t.nr}</div>
      <div class="page-head"><div class="row"><span class="topic-num">${t.nr}</span><h1 class="mb0">${esc(t.title)}</h1></div><p>${esc(t.short)} · <span class="page-ref">📖 Schulbuch S. ${t.pages}</span></p>
        <div class="row"><span class="small muted">Thema:</span>${statusGroup('topic', t.id, st.topicStatus[t.id])}<span class="spacer"></span><button class="btn small ${st.read[t.id] ? 'ok' : ''}" data-a="read">${st.read[t.id] ? '✓ gelesen' : 'Als gelesen markieren'}</button><button class="btn small ghost" data-a="print">Drucken</button></div></div>
      <div class="card"><h2 style="margin-top:0">Lernziele</h2><ul class="goal-list">${t.goals.map(g => `<li><span>${esc(g.text)}</span>${statusGroup('goal', g.id, st.goals[g.id])}</li>`).join('')}</ul></div>
      <div class="sheet-layout"><article class="sheet">${SECTIONS.map((sec, i) => `<section class="card" id="sec-${sec[0]}"><h2><span class="sec-num">${i + 1}</span>${sec[1]}</h2>${content[sec[0]]}</section>`).join('')}</article>
        <nav class="toc card" aria-label="Inhalt">${SECTIONS.map((sec, i) => `<a href="#sec-${sec[0]}" data-sec="${sec[0]}">${i + 1}. ${sec[1]}</a>`).join('')}</nav></div>
      <div class="row mt">${prev ? `<a class="btn" href="#/lernzettel/${prev.id}">← Thema ${prev.nr}</a>` : ''}<span class="spacer"></span>${next ? `<a class="btn primary" href="#/lernzettel/${next.id}">Thema ${next.nr}: ${esc(next.title)} →</a>` : '<a class="btn primary" href="#/klausur">Zum Klausurmodus →</a>'}</div>`;
    BIO.mountFigures(main);
    // TOC-Links dürfen den Hash-Router nicht auslösen
    $$('.toc a', main).forEach(a => a.addEventListener('click', e => { e.preventDefault(); const el = document.getElementById('sec-' + a.dataset.sec); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));
    $('[data-a=read]', main).addEventListener('click', e => { store.markRead(t.id); e.target.textContent = '✓ gelesen'; e.target.classList.add('ok'); toast('Als gelesen markiert'); });
    $('[data-a=print]', main).addEventListener('click', () => { $$('details', main).forEach(d => d.open = true); window.print(); });
  }

  /* ======================= Lexikon ======================= */
  function lexikon(main, parts, q) {
    const term = q.q || '';
    main.innerHTML = `<div class="page-head"><h1>Lexikon</h1><p>${BIO.glossary.length} Fachbegriffe mit Definition, Erklärung, Themenbezug und Beispiel. ★ = Begriff der Checkliste.</p></div>
      <input class="search" type="search" id="lexQ" placeholder="Begriff suchen … (z. B. Michaelis, Carrier, Denaturierung)" value="${esc(term)}" aria-label="Lexikon durchsuchen">
      <div class="filter-bar mt"><select id="lexT">${BIO.topicOptions(q.topic || '')}</select><label class="toggle"><input type="checkbox" id="lexC"> nur Checklisten-Begriffe</label></div>
      <nav class="letter-nav" data-r="letters"></nav><div data-r="list"></div>`;
    const inp = $('#lexQ', main), sel = $('#lexT', main), chk = $('#lexC', main);
    const hl = (txt, n) => { const s = esc(BIO.stripTags(txt)); if (!n) return s; const re = new RegExp('(' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'); return s.replace(re, '<mark>$1</mark>'); };
    const first = g => g.term.replace(/^[^A-Za-zÄÖÜäöüα-ω]+/, '').charAt(0).toUpperCase().replace('Ä', 'A').replace('Ö', 'O').replace('Ü', 'U').replace(/[α-ω]/i, 'α');
    function draw() {
      const n = inp.value.trim(), nn = BIO.norm(n);
      const list = BIO.glossary.filter(g => (!sel.value || g.topic === sel.value) && (!chk.checked || g.check) &&
        (!nn || BIO.norm(g.term + ' ' + BIO.stripTags(g.def) + ' ' + BIO.stripTags(g.expl)).includes(nn)));
      list.sort((a, b) => { if (!nn) return 0; const A = BIO.norm(a.term).includes(nn) ? 0 : 1, B = BIO.norm(b.term).includes(nn) ? 0 : 1; return A - B; });
      const letters = [...new Set(list.map(first))];
      $('[data-r=letters]', main).innerHTML = n ? '' : letters.map(l => `<a href="#" data-l="${l}">${l}</a>`).join('');
      let lastL = '';
      $('[data-r=list]', main).innerHTML = list.length ? list.map(g => {
        const L = first(g), anchor = !n && L !== lastL ? ` id="lex-${L}"` : ''; lastL = L;
        const t = BIO.topicById[g.topic];
        return `<div class="card gloss-item"${anchor}><h3>${hl(g.term, n)}${g.check ? ' <span class="chip ok" title="Begriff der Checkliste">★ Checkliste</span>' : ''}${t ? topicChip(t.id) : ''}</h3><dl>
          <dt>Definition</dt><dd>${hl(g.def, n)}</dd><dt>Erklärung</dt><dd>${hl(g.expl, n)}</dd>
          <dt>Themenbezug</dt><dd>${t ? `<a href="#/lernzettel/${t.id}">Thema ${t.nr}: ${esc(t.title)}</a>` : '–'}</dd>
          <dt>Beispiel</dt><dd>${hl(g.ex, n)}</dd></dl></div>`;
      }).join('') : '<div class="card"><p>Kein Eintrag gefunden.</p></div>';
      $$('[data-l]', main).forEach(a => a.addEventListener('click', e => { e.preventDefault(); const el = document.getElementById('lex-' + a.dataset.l); if (el) el.scrollIntoView({ behavior: 'smooth' }); }));
    }
    let tmr;
    inp.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(() => { draw(); history.replaceState(null, '', '#/lexikon' + (inp.value.trim() ? '?q=' + encodeURIComponent(inp.value.trim()) : '')); }, 120); });
    sel.addEventListener('change', draw); chk.addEventListener('change', draw);
    draw();
    if (!term) inp.focus({ preventScroll: true });
  }

  /* ======================= Daten sichern ======================= */
  function daten(main) {
    const st = store.state;
    main.innerHTML = `<div class="page-head"><h1>Daten sichern &amp; wiederherstellen</h1><p>Dein Fortschritt liegt ausschließlich lokal in diesem Browser (LocalStorage, Schlüssel <code>bioLK.v1</code>). Nichts wird an einen Server gesendet.</p></div>
      <div class="grid grid-3">
        <div class="card"><h2 style="margin-top:0">Exportieren</h2><p>Lädt eine JSON-Datei mit deinem kompletten Fortschritt herunter – zum Sichern oder um auf einem anderen Gerät weiterzulernen.</p><button class="btn primary" data-a="export">Fortschritt exportieren</button></div>
        <div class="card"><h2 style="margin-top:0">Importieren</h2><p>Stellt einen exportierten Stand wieder her. <b>Achtung:</b> Der aktuelle Stand wird ersetzt.</p><label class="btn" for="impFile">Datei wählen …</label><input type="file" id="impFile" accept=".json,application/json" class="hidden"></div>
        <div class="card"><h2 style="margin-top:0">Zurücksetzen</h2><p>Löscht deinen gesamten Fortschritt in diesem Browser. Exportiere vorher, falls du ihn behalten willst.</p><button class="btn bad" data-a="reset">Alles zurücksetzen</button></div>
      </div>
      <div class="card"><h2 style="margin-top:0">Gespeicherter Stand</h2>
        <div class="result-row"><span>Angelegt</span><b>${fmtDate(st.created)}</b></div>
        <div class="result-row"><span>Zuletzt geändert</span><b>${fmtDate(st.updated)}</b></div>
        <div class="result-row"><span>Bearbeitete Quizfragen</span><b>${Object.keys(st.mc).length} / ${BIO.mc.length}</b></div>
        <div class="result-row"><span>Gelernte Karteikarten</span><b>${Object.keys(st.cards).length} / ${BIO.cards.length}</b></div>
        <div class="result-row"><span>Bearbeitete Übungen</span><b>${Object.keys(st.ex).length}</b></div>
        <div class="result-row"><span>Einträge in der Fehlerliste</span><b>${Object.keys(st.errors).length}</b></div>
        <div class="result-row"><span>Probeklausuren</span><b>${st.exams.length}</b></div>
        <div class="result-row"><span>Speicher verfügbar</span><b>${BIO.storageOK() ? 'ja' : 'nein (privater Modus?)'}</b></div></div>`;
    $('[data-a=export]', main).addEventListener('click', () => {
      const blob = new Blob([store.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bio-lk-fortschritt-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Export erstellt');
    });
    $('#impFile', main).addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try { store.importJSON(r.result); toast('Fortschritt wiederhergestellt ✓'); daten(main); }
        catch (err) { toast('Import fehlgeschlagen: ' + err.message, 3500); }
      };
      r.readAsText(f);
    });
    $('[data-a=reset]', main).addEventListener('click', () => {
      if (confirm('Wirklich den gesamten Lernfortschritt löschen? Das kann nicht rückgängig gemacht werden.')) { store.reset(); toast('Fortschritt zurückgesetzt'); daten(main); }
    });
  }

  /* ======================= Router ======================= */
  Object.assign(BIO.routes, {
    '': dashboard,
    lernzettel: (m, parts) => parts[1] ? sheet(m, parts[1]) : sheetOverview(m),
    lexikon,
    daten
  });
  function parseHash() {
    let h = location.hash.replace(/^#\/?/, '');
    const qi = h.indexOf('?');
    const qs = qi >= 0 ? h.slice(qi + 1) : '';
    if (qi >= 0) h = h.slice(0, qi);
    const parts = h.split('/').filter(Boolean).map(decodeURIComponent);
    const q = {};
    qs.split('&').filter(Boolean).forEach(p => { const [k, v] = p.split('='); try { q[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' ')); } catch (e) { q[k] = v; } });
    return { parts, q };
  }
  let current = '';
  function route() {
    // In-Page-Anker (#sec-…, #main) nicht als Route behandeln
    if (location.hash && !location.hash.startsWith('#/')) return;
    const { parts, q } = parseHash();
    const name = parts[0] || '';
    const fn = BIO.routes[name];
    current = name;
    $$('#sidebar a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === name));
    closeMenu();
    try {
      if (fn) fn(main, parts, q);
      else { main.innerHTML = `<div class="card"><h1>Seite nicht gefunden</h1><p>Diese Adresse gibt es nicht.</p><a class="btn primary" href="#/">Zum Dashboard</a></div>`; }
    } catch (e) {
      console.error(e);
      main.innerHTML = `<div class="card"><h1>Fehler beim Laden</h1><p>${esc(e.message)}</p><a class="btn primary" href="#/">Zum Dashboard</a></div>`;
    }
    const titles = { '': 'Dashboard', lernzettel: 'Lernzettel', uebungen: 'Übungen', labor: 'Bio-Labor', diagramme: 'Diagramm-Trainer', klausur: 'Klausurmodus', lexikon: 'Lexikon', daten: 'Daten sichern' };
    document.title = (titles[name] || 'Bio-LK') + ' · Bio-LK Lernplattform';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    main.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);

  // Dashboard live aktualisieren, wenn Status geändert wird
  document.addEventListener('bio:progress', () => {
    if (current === '' && !location.hash.replace(/^#\/?/, '')) {
      const y = window.scrollY; dashboard(main); window.scrollTo(0, y);
    }
  });

  /* ---- Mobiles Menü ---- */
  const menuBtn = $('#menuBtn'), sidebar = $('#sidebar'), scrim = $('#scrim');
  function closeMenu() { document.body.classList.remove('nav-open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  menuBtn.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  scrim.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  if (!location.hash) history.replaceState(null, '', '#/');
  route();
})();
