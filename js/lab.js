/* =========================================================================
   Interaktives Bio-Labor: 14 Modelle (SVG), einbettbar in Lernzettel
   ========================================================================= */
(function () {
  const M = BIO.models, C = M.C, T = M.T, esc = BIO.esc;

  /* ---------- Gerüst-Helfer ---------- */
  function frame(el, o) {
    el.innerHTML = `<div class="lab-wrap">
      <div><div class="lab-stage">${o.tabs ? `<div class="tabs" data-r="tabs">${o.tabs.map((t, i) => `<button type="button" data-tab="${i}" class="${i === 0 ? 'on' : ''}">${t}</button>`).join('')}</div>` : ''}<div data-r="stage">${o.stage || ''}</div></div>
      <div data-r="controls">${o.controls || ''}</div></div>
      <div class="info-panel" data-r="info">${o.info || ''}</div></div>`;
    const r = n => el.querySelector(`[data-r="${n}"]`);
    const api = {
      stage: r('stage'), controls: r('controls'), infoEl: r('info'),
      info(title, html) { api.infoEl.innerHTML = `<h3>${title}</h3>${html || ''}`; },
      onTab(fn) {
        const tabs = r('tabs'); if (!tabs) return;
        tabs.addEventListener('click', e => {
          const b = e.target.closest('button[data-tab]'); if (!b) return;
          tabs.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
          fn(+b.dataset.tab);
        });
      }
    };
    return api;
  }
  function stepper(container, n, go, labels) {
    let i = 0;
    container.innerHTML = `<div class="step-nav"><button type="button" class="btn small" data-a="prev">← Zurück</button>
      <div class="step-dots">${Array.from({ length: n }, (_, k) => `<button type="button" data-k="${k}" title="${labels ? esc(labels[k]) : 'Schritt ' + (k + 1)}">${k + 1}</button>`).join('')}</div>
      <button type="button" class="btn small primary" data-a="next">Weiter →</button></div>`;
    const set = k => {
      i = Math.max(0, Math.min(n - 1, k));
      container.querySelectorAll('.step-dots button').forEach((b, j) => b.classList.toggle('on', j === i));
      container.querySelector('[data-a=prev]').disabled = i === 0;
      container.querySelector('[data-a=next]').disabled = i === n - 1;
      go(i);
    };
    container.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'prev') set(i - 1);
      else if (b.dataset.a === 'next') set(i + 1);
      else if (b.dataset.k != null) set(+b.dataset.k);
    });
    set(0);
    return { set, get: () => i };
  }
  function bindParts(svgRoot, parts, ui, onPick) {
    svgRoot.addEventListener('click', e => {
      const p = e.target.closest('[data-part]'); if (!p) return;
      const key = p.dataset.part;
      if (onPick && onPick(key, p) === false) return;
      svgRoot.querySelectorAll('[data-part].active').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      if (parts && parts[key]) ui.info(parts[key][0], `<p>${parts[key][1]}</p>`);
    });
  }
  function highlight(svgRoot, keys) {
    svgRoot.querySelectorAll('[data-part]').forEach(p => {
      const on = keys.includes(p.dataset.part);
      p.classList.toggle('active', on);
    });
  }
  function slider(id, label, min, max, step, val, unit) {
    return `<div class="slider-row"><label for="${id}">${label}</label><input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output for="${id}">${val}${unit || ''}</output></div>`;
  }
  let sid = 0;
  const uidp = p => p + '-' + (++sid);
  const alive = el => el && el.isConnected;
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function animate(dur, fn, done, el) {
    const t0 = performance.now();
    function f(now) {
      if (el && !alive(el)) return;
      const t = Math.min(1, (now - t0) / dur);
      fn(ease(t));
      if (t < 1) requestAnimationFrame(f); else if (done) done();
    }
    requestAnimationFrame(f);
  }
  function quizParts(ui, svg, fig) {
    const keys = Object.keys(fig.parts || {});
    const box = document.createElement('div');
    box.className = 'mt';
    box.innerHTML = `<div class="row"><button type="button" class="btn small navy" data-a="quiz">🎯 Teste dich: Teil finden</button><span class="small muted" data-r="q"></span></div>`;
    ui.controls.appendChild(box);
    let target = null, score = 0, tries = 0;
    box.querySelector('[data-a=quiz]').addEventListener('click', () => {
      target = keys[Math.floor(Math.random() * keys.length)];
      box.querySelector('[data-r=q]').innerHTML = `Tippe auf: <b>${fig.parts[target][0]}</b>`;
    });
    return (key) => {
      if (!target) return true;
      tries++;
      if (key === target) { score++; BIO.toast(`✓ Richtig! (${score}/${tries})`); }
      else { BIO.toast(`✗ Das war: ${fig.parts[key] ? fig.parts[key][0] : key}`); highlight(svg, [target]); }
      box.querySelector('[data-r=q]').innerHTML = `Ergebnis: ${score}/${tries} – nochmal auf „Teste dich“ tippen.`;
      target = null;
      return true;
    };
  }
  function partsLab(el, figId, intro) {
    const fig = BIO.figures[figId];
    const ui = frame(el, { stage: M.svgFor(figId), info: `<h3>${fig.title}</h3>${intro}<p class="small muted">Tippe auf einen Bestandteil im Modell.</p>` });
    const svg = ui.stage.querySelector('svg');
    const q = quizParts(ui, svg, fig);
    bindParts(svg, fig.parts, ui, (k) => { q(k); });
    return { ui, svg };
  }

  /* =================================================================== */
  const labs = {};

  /* ---- 1 Aminosäure ---- */
  labs.aminoacid = {
    title: 'α-Aminosäure', topic: 't1', icon: '⬡',
    desc: 'Grundstruktur einer α-Aminosäure erkunden, Reste vergleichen.',
    mount(el) {
      const { ui, svg } = partsLab(el, 'aminoacid', '<p>Alle 20 Aminosäuren haben dieselbe Grundstruktur – sie unterscheiden sich nur im Rest R.</p>');
      const rests = [
        ['R (allgemein)', 'R', 'variabler Rest'],
        ['Glycin', 'H', 'kleinster Rest (nur ein H-Atom)'],
        ['Alanin', 'CH₃', 'unpolar → hydrophob'],
        ['Phenylalanin', 'CH₂–C₆H₅', 'unpolar (Ring) → hydrophob'],
        ['Serin', 'CH₂–OH', 'polar → hydrophil'],
        ['Cystein', 'CH₂–SH', 'Thiolgruppe → Disulfidbrücken'],
        ['Asparaginsäure', 'CH₂–COO⁻', 'sauer (negativ geladen)'],
        ['Lysin', '(CH₂)₄–NH₃⁺', 'basisch (positiv geladen)']
      ];
      const box = document.createElement('div');
      box.className = 'card flat mt';
      box.innerHTML = `<label class="small" for="${uidp('rs')}"><b>Rest austauschen</b> <span class="muted">(Beispiele – Ergänzung, Buch nennt nur die Einteilung)</span></label>
        <div class="row mt"><select class="filter" style="padding:8px;border-radius:9px;border:1px solid var(--line-2);min-height:40px">${rests.map((r, i) => `<option value="${i}">${r[0]}</option>`).join('')}</select><span class="small" data-r="rinfo"></span></div>`;
      ui.controls.prepend(box);
      const sel = box.querySelector('select');
      sel.addEventListener('change', () => {
        const r = rests[+sel.value];
        const g = svg.querySelector('[data-part=rest]');
        const txt = g.querySelector('text'), rect = g.querySelector('rect');
        txt.textContent = r[1];
        const w = Math.max(60, r[1].length * 15 + 16);
        rect.setAttribute('width', w); rect.setAttribute('x', 260 - w / 2);
        txt.setAttribute('font-size', r[1].length > 4 ? 20 : 26);
        box.querySelector('[data-r=rinfo]').innerHTML = `<b>${r[0]}</b>: ${r[2]}`;
      });
    }
  };

  /* ---- 2 Peptidbindung ---- */
  labs.peptide = {
    title: 'Peptidbindung (Kondensation)', topic: 't1', icon: '⛓',
    desc: 'Schrittweise: zwei Aminosäuren verknüpfen sich unter Wasserabspaltung.',
    mount(el) {
      const b = (x1, y1, x2, y2, c, w) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || C.navy}" stroke-width="${w || 2.4}"/>`;
      const svg = `<svg viewBox="0 0 680 300" class="model">
        <g>${T(52, 160, 'H₂N', { size: 22 })}${b(78, 152, 116, 152)}${T(134, 160, 'C', { size: 22 })}${b(134, 132, 134, 106)}${T(134, 100, 'H', { size: 20 })}${b(134, 170, 134, 200)}${T(134, 224, 'R₁', { size: 20, fill: C.teal })}
          ${b(148, 152, 206, 152)}${T(220, 160, 'C', { size: 22 })}${b(216, 132, 216, 104)}${b(224, 132, 224, 104)}${T(220, 96, 'O', { size: 20 })}${T(124, 40, 'Aminosäure 1', { size: 13, fill: C.muted })}</g>
        <g data-r="oh" class="fade">${b(234, 152, 252, 152)}<g data-r="ohhl" class="fade" opacity="0"><ellipse cx="272" cy="152" rx="24" ry="18" fill="#fee2e2" stroke="${C.red}" stroke-dasharray="4 3"/></g>${T(272, 160, 'OH', { size: 20 })}</g>
        <g data-r="as2" style="transition:transform .8s ease">
          <g data-r="hn" class="fade">${b(296, 152, 306, 152)}<g data-r="hhl" class="fade" opacity="0"><ellipse cx="288" cy="152" rx="15" ry="16" fill="#fee2e2" stroke="${C.red}" stroke-dasharray="4 3"/></g>${T(288, 160, 'H', { size: 20 })}</g>
          ${T(318, 160, 'N', { size: 22 })}${b(318, 170, 318, 198)}${T(318, 222, 'H', { size: 20 })}${b(332, 152, 374, 152)}${T(392, 160, 'C', { size: 22 })}${b(392, 132, 392, 106)}${T(392, 100, 'H', { size: 20 })}${b(392, 170, 392, 200)}${T(392, 224, 'R₂', { size: 20, fill: C.teal })}${b(406, 152, 450, 152)}${T(486, 160, 'COOH', { size: 22 })}
          ${T(400, 40, 'Aminosäure 2', { size: 13, fill: C.muted })}</g>
        <g data-r="bond" class="fade" opacity="0">${b(234, 152, 302, 152, C.red, 4)}<rect x="206" y="80" width="126" height="160" rx="12" fill="none" stroke="${C.teal}" stroke-width="2" stroke-dasharray="6 4"/>${T(270, 72, 'Peptidgruppe', { size: 13, fill: C.teal })}${T(268, 272, 'Peptidbindung', { size: 13, fill: C.red })}</g>
        <g data-r="water" class="fade" opacity="0" style="transition:opacity .5s, transform .8s; transform: translate(0px, 0px)"><circle cx="300" cy="262" r="26" fill="#dbeafe" stroke="${C.blue}"/>${T(300, 268, 'H₂O', { size: 17, fill: C.blue })}</g>
        <g data-r="ends" class="fade" opacity="0">${T(52, 196, 'N-Ende', { size: 12, fill: C.muted })}${T(486, 196, 'C-Ende', { size: 12, fill: C.muted })}</g>
      </svg>`;
      const steps = [
        ['Zwei Aminosäuren', 'Zwei α-Aminosäuren liegen nebeneinander. Die <b>Carboxylgruppe</b> von Aminosäure 1 zeigt zur <b>Aminogruppe</b> von Aminosäure 2.'],
        ['Reagierende Gruppen', 'Die <b>OH-Gruppe</b> der Carboxylgruppe (AS 1) und ein <b>H-Atom</b> der Aminogruppe (AS 2) reagieren miteinander (rot markiert).'],
        ['Wasser wird abgespalten', 'Aus OH und H entsteht ein <b>Wassermolekül</b>, das abgespalten wird. Eine solche Reaktion heißt <b>Kondensationsreaktion</b>.'],
        ['Dipeptid', 'Zwischen dem C-Atom der ehemaligen Carboxylgruppe und dem N-Atom der ehemaligen Aminogruppe entsteht die <b>Peptidbindung</b> (rot). C=O und N–H bilden zusammen die <b>Peptidgruppe</b>. Das Dipeptid hat ein freies <b>N-Ende</b> und ein freies <b>C-Ende</b> – weitere Aminosäuren können angehängt werden.']
      ];
      const ui = frame(el, { stage: svg });
      const s = ui.stage;
      const g = n => s.querySelector(`[data-r="${n}"]`);
      stepper(ui.controls, steps.length, i => {
        ui.info(`Schritt ${i + 1}: ${steps[i][0]}`, `<p>${steps[i][1]}</p>${i === 3 ? '<p class="small muted">Merke: Die Reste R₁ und R₂ sind an der Peptidbindung nicht beteiligt. Umkehrung (Spaltung unter Wasseraufnahme) = Hydrolyse.</p>' : ''}`);
        g('as2').style.transform = i >= 3 ? 'translate(0px,0px)' : 'translate(70px,0px)';
        g('ohhl').setAttribute('opacity', i >= 1 && i < 3 ? 1 : 0);
        g('hhl').setAttribute('opacity', i >= 1 && i < 3 ? 1 : 0);
        g('oh').setAttribute('opacity', i >= 3 ? 0 : 1);
        g('hn').setAttribute('opacity', i >= 3 ? 0 : 1);
        g('water').setAttribute('opacity', i >= 2 ? 1 : 0);
        g('bond').setAttribute('opacity', i >= 3 ? 1 : 0);
        g('ends').setAttribute('opacity', i >= 3 ? 1 : 0);
      }, steps.map(x => x[0]));
    }
  };

  /* ---- 3 Proteinstruktur ---- */
  function primarySVG() {
    const aa = [['Gly', '#e2e8f0'], ['Cys', '#fde68a'], ['Ala', '#e2e8f0'], ['Ser', '#ccfbf1'], ['Lys', '#bfdbfe'], ['Glu', '#fecaca'], ['Phe', '#e2e8f0'], ['Cys', '#fde68a'], ['Val', '#e2e8f0']];
    let s = '', prev = null;
    aa.forEach((a, i) => {
      const x = 90 + i * 58, y = 110 + Math.sin(i * 0.9) * 26;
      if (prev) s += `<line x1="${prev[0]}" y1="${prev[1]}" x2="${x}" y2="${y}" stroke="${C.navy3}" stroke-width="4"/>`;
      prev = [x, y];
    });
    aa.forEach((a, i) => {
      const x = 90 + i * 58, y = 110 + Math.sin(i * 0.9) * 26;
      s += `<circle cx="${x}" cy="${y}" r="22" fill="${a[1]}" stroke="${C.navy3}" stroke-width="2"/>${T(x, y + 5, a[0], { size: 13 })}`;
    });
    return `<svg viewBox="0 0 640 230" class="model">${T(34, 104, 'H₂N–', { size: 14, fill: C.muted })}${T(34, 124, 'N-Ende', { size: 11, fill: C.muted })}${s}${T(612, 158, '–COOH', { size: 14, fill: C.muted })}${T(612, 178, 'C-Ende', { size: 11, fill: C.muted })}
      ${T(320, 210, 'Reihenfolge der Aminosäuren = Aminosäuresequenz (verknüpft über Peptidbindungen)', { size: 13, fill: C.navy2 })}</svg>`;
  }
  function secondarySVG() {
    let helix = '';
    for (let i = 0; i < 7; i++) helix += `<ellipse cx="${60 + i * 26}" cy="150" rx="15" ry="44" fill="none" stroke="${C.teal}" stroke-width="4.5"/>`;
    let hb = '';
    for (let i = 0; i < 6; i++) hb += `<line x1="${64 + i * 26}" y1="116" x2="${80 + i * 26}" y2="184" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 3"/>`;
    const zig = (y, dir) => { let d = `M370,${y}`; for (let i = 1; i <= 8; i++) d += ` L${370 + i * 28},${y + (i % 2 ? -10 : 10)}`; return `<path d="${d}" fill="none" stroke="#b45309" stroke-width="4" marker-end="url(#zz${dir})"/>`; };
    let sh = '';
    [90, 150, 210].forEach((y, k) => { sh += zig(y, k % 2); });
    for (let i = 0; i <= 8; i += 2) sh += `<line x1="${370 + i * 28}" y1="${100}" x2="${370 + i * 28}" y2="${140}" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 3"/><line x1="${370 + i * 28}" y1="${160}" x2="${370 + i * 28}" y2="${200}" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 3"/>`;
    let rs = '';
    for (let i = 1; i <= 7; i += 2) rs += `<circle cx="${370 + i * 28}" cy="${62}" r="6" fill="${C.teal}"/><line x1="${370 + i * 28}" y1="68" x2="${370 + i * 28}" y2="80" stroke="${C.teal}" stroke-width="2"/>`;
    for (let i = 2; i <= 8; i += 2) rs += `<circle cx="${370 + i * 28}" cy="${238}" r="6" fill="${C.muted}"/><line x1="${370 + i * 28}" y1="220" x2="${370 + i * 28}" y2="232" stroke="${C.muted}" stroke-width="2"/>`;
    return `<svg viewBox="0 0 640 300" class="model"><defs>${M.arrowDefs('zz0', '#b45309')}${M.arrowDefs('zz1', '#b45309')}</defs>
      <g data-part="helix">${helix}${hb}<rect class="hl" x="30" y="90" width="236" height="122" rx="14" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
      <g data-part="sheet">${sh}${rs}<rect class="hl" x="356" y="44" width="262" height="206" rx="14" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
      ${T(148, 70, 'α-Helix', { size: 15, fill: C.teal })}${T(490, 280, 'β-Faltblatt', { size: 15, fill: '#b45309' })}${T(148, 240, 'rot gestrichelt: Wasserstoffbrücken', { size: 12, fill: C.red })}${T(600, 66, 'Reste oben', { size: 11, fill: C.teal, anchor: 'end' })}${T(600, 256, 'Reste unten', { size: 11, fill: C.muted, anchor: 'end' })}</svg>`;
  }
  function quaternarySVG() {
    const blob = (x, y, c, s, lab) => `<path d="M${x - 60},${y} C${x - 64},${y - 46} ${x - 20},${y - 60} ${x + 10},${y - 54} C${x + 54},${y - 48} ${x + 66},${y - 10} ${x + 58},${y + 22} C${x + 50},${y + 56} ${x - 10},${y + 60} ${x - 34},${y + 46} C${x - 56},${y + 34} ${x - 58},${y + 16} ${x - 60},${y}Z" fill="${c}" stroke="${s}" stroke-width="2"/>
      <rect x="${x - 10}" y="${y - 10}" width="20" height="20" rx="3" fill="#fecaca" stroke="${C.red}" stroke-width="2"/>${T(x, y + 5, 'Fe', { size: 10, fill: C.red })}${T(x, y + 40, lab, { size: 13 })}`;
    return `<svg viewBox="0 0 640 320" class="model">${blob(250, 100, '#bfdbfe', C.blue, 'Kette 1')}${blob(380, 104, '#fbcfe8', '#be185d', 'Kette 2')}${blob(252, 222, '#fbcfe8', '#be185d', 'Kette 3')}${blob(384, 220, '#bfdbfe', C.blue, 'Kette 4')}
      ${T(560, 120, 'Häm-Gruppe', { size: 13, fill: C.red })}<line x1="520" y1="116" x2="400" y2="106" stroke="${C.red}" stroke-width="1.4"/>
      ${T(320, 306, 'Hämoglobin: 4 Proteinketten mit je einer Häm-Gruppe (O₂-Bindung)', { size: 13, fill: C.navy2 })}</svg>`;
  }
  labs.protein = {
    title: 'Strukturebenen der Proteine', topic: 't2', icon: '🧬',
    desc: 'Primär-, Sekundär-, Tertiär- und Quartärstruktur mit ihren Bindungen.',
    mount(el) {
      const ui = frame(el, { tabs: ['Primär', 'Sekundär', 'Tertiär', 'Quartär'] });
      const sec = {
        helix: ['α-Helix', 'Die Kette windet sich schraubenförmig. Wasserstoffbrücken entstehen zwischen den Peptidgruppen (C=O und N–H) übereinanderliegender Windungen. Die Reste zeigen nach außen.'],
        sheet: ['β-Faltblatt', 'Zickzackförmig gefaltete Abschnitte liegen nebeneinander, H-Brücken verbinden Peptidgruppen benachbarter Abschnitte. Die Reste zeigen abwechselnd zur einen und zur anderen Seite.']
      };
      const show = i => {
        if (i === 0) {
          ui.stage.innerHTML = primarySVG();
          ui.info('Primärstruktur', `<p>Die <b>Reihenfolge der Aminosäuren</b> (Aminosäuresequenz). Verknüpfung über <b>Peptidbindungen</b> (kovalent). Die Kette beginnt mit dem N-Ende (freie Aminogruppe) und endet mit dem C-Ende (freie Carboxylgruppe).</p><p><b>Von der Primärstruktur hängen alle weiteren Strukturen ab.</b></p>
            <div class="legend"><span><i style="background:#94a3b8;height:10px;width:10px;border-radius:50%"></i>unpolar</span><span><i style="background:#14b8a6;height:10px;width:10px;border-radius:50%"></i>polar</span><span><i style="background:#ef4444;height:10px;width:10px;border-radius:50%"></i>sauer</span><span><i style="background:#3b82f6;height:10px;width:10px;border-radius:50%"></i>basisch</span><span><i style="background:#eab308;height:10px;width:10px;border-radius:50%"></i>Cystein (–SH)</span></div>`);
        } else if (i === 1) {
          ui.stage.innerHTML = secondarySVG();
          ui.info('Sekundärstruktur', `<p>Durch <b>Wasserstoffbrücken zwischen den Peptidgruppen</b> derselben Kette entstehen regelmäßige Strukturen. Tippe auf α-Helix oder β-Faltblatt.</p><p class="small muted">Die Reste sind hier <b>nicht</b> beteiligt – nur das Rückgrat.</p>`);
          bindParts(ui.stage.querySelector('svg'), sec, ui);
        } else if (i === 2) {
          ui.stage.innerHTML = M.svgFor('tertiary');
          ui.info('Tertiärstruktur', `<p>Die Reste weit entfernter Abschnitte treten miteinander in Wechselwirkung – die Kette faltet sich zu einer bestimmten 3D-Struktur. Tippe auf die Wechselwirkungen.</p>`);
          bindParts(ui.stage.querySelector('svg'), BIO.figures.tertiary.parts, ui);
        } else {
          ui.stage.innerHTML = quaternarySVG();
          ui.info('Quartärstruktur', `<p>Mehrere Polypeptidketten lagern sich zu einem Komplex zusammen. Zusammengehalten durch dieselben Wechselwirkungen wie die Tertiärstruktur (H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte, Disulfidbrücken).</p><p><b>Beispiel Hämoglobin:</b> 4 Proteinketten mit je einer Häm-Gruppe → Sauerstofftransport (Buch S. 13, B8).</p>`);
        }
      };
      ui.onTab(show); show(0);
    }
  };

  /* ---- 4 Phospholipide in Wasser ---- */
  labs.phospholipid = {
    title: 'Phospholipide in Wasser', topic: 't3', icon: '💧',
    desc: 'Vom Molekül zum Film, zur Micelle und zur Doppelschicht.',
    mount(el) {
      const ui = frame(el, { tabs: ['Molekül', 'Wasseroberfläche', 'Micelle', 'Doppelschicht'] });
      const water = (y, h) => `<rect x="0" y="${y}" width="640" height="${h}" fill="#dbeafe" opacity=".6"/>`;
      const views = [
        () => [M.svgFor('phospholipid'), 'Bau eines Phospholipids', '<p>Eine der drei Fettsäuren eines Fetts ist durch eine <b>Phosphatgruppe</b> ersetzt, an die zusätzlich ein Alkohol (z. B. <b>Cholin</b> beim Lecithin) gebunden ist.</p><ul><li><b>hydrophiler Kopf:</b> Glycerin–Phosphatgruppe–Cholin (polar/geladen)</li><li><b>zwei hydrophobe Schwänze:</b> Fettsäurereste (unpolar); ein Knick = Doppelbindung (ungesättigt)</li></ul>'],
        () => { let s = ''; for (let x = 30; x <= 610; x += 22) s += M.pl(x, 180, -1, 40); return [`<svg viewBox="0 0 640 320" class="model">${water(180, 140)}${s}${T(20, 40, 'Luft', { anchor: 'start', fill: C.muted })}${T(20, 300, 'Wasser', { anchor: 'start', fill: C.blue })}</svg>`, 'Film an der Wasseroberfläche', '<p>An der Grenzfläche Wasser/Luft richten sich die Moleküle aus: <b>Köpfe ins Wasser</b>, <b>Schwänze zur Luft</b> (weg vom Wasser). Es entsteht ein dünner Phospholipidfilm (Buch S. 14).</p>']; },
        () => { let s = ''; const n = 18, R = 78, cx = 320, cy = 160; for (let i = 0; i < n; i++) { const a = i / n * 2 * Math.PI; s += M.plRot(cx + R * Math.cos(a), cy + R * Math.sin(a), a * 180 / Math.PI + 90, 34); } return [`<svg viewBox="0 0 640 320" class="model">${water(0, 320)}${s}${T(20, 300, 'Wasser', { anchor: 'start', fill: C.blue })}</svg>`, 'Micelle', '<p>Beim Schütteln entstehen fein verteilte Tröpfchen: <b>Micellen</b>. Die hydrophilen Köpfe zeigen nach außen zum Wasser, die hydrophoben Schwänze liegen innen, geschützt vor dem Wasser.</p>']; },
        () => { let s = ''; for (let x = 30; x <= 610; x += 22) { s += M.pl(x, 110, 1, 40) + M.pl(x, 210, -1, 40); } return [`<svg viewBox="0 0 640 320" class="model">${water(0, 102)}${water(218, 102)}${s}<rect x="0" y="122" width="640" height="76" fill="#fef9c3" opacity=".35"/>${T(630, 165, 'hydrophob', { anchor: 'end', size: 13, fill: '#a16207' })}${T(20, 40, 'Wasser (z. B. extrazellulär)', { anchor: 'start', fill: C.blue })}${T(20, 300, 'Wasser (z. B. Cytoplasma)', { anchor: 'start', fill: C.blue })}</svg>`, 'Lipiddoppelschicht', '<p>Ist auf <b>beiden Seiten Wasser</b>, lagern sich zwei Schichten zusammen: Die Schwänze zeigen einander zu und bilden ein hydrophobes Inneres, die Köpfe zeigen zu beiden wässrigen Seiten.</p><p>Das ist die Grundstruktur jeder <b>Biomembran</b>. Sie entsteht von selbst aus den Eigenschaften der Moleküle. Ihr hydrophobes Inneres ist eine Barriere für Ionen und größere polare Teilchen.</p>']; }
      ];
      const show = i => { const v = views[i](); ui.stage.innerHTML = v[0]; ui.info(v[1], v[2]); };
      ui.onTab(show); show(0);
    }
  };

  /* ---- 5 Biomembran ---- */
  labs.membrane = {
    title: 'Biomembran', topic: 't3', icon: '🧫',
    desc: 'Flüssig-Mosaik-Modell: alle Bestandteile antippen, Struktur und Funktion lesen.',
    mount(el) {
      partsLab(el, 'membrane', '<p>Nach dem <b>Flüssig-Mosaik-Modell</b> (Singer & Nicolson 1972) bilden Phospholipide eine flüssige Doppelschicht, in die Proteine mosaikartig eingelagert sind. Das Cytoskelett schränkt die Beweglichkeit ein (Fence-Modell).</p>');
    }
  };

  /* ---- 6 Membrantransport: Teilchensimulation ---- */
  labs.transport = {
    title: 'Membrantransport-Simulation', topic: 't4', icon: '⇄',
    desc: 'Einfache, kanal- und carriervermittelte Diffusion, primär aktiv, Symport und Antiport live.',
    mount(el) {
      const modes = [
        { k: 'simple', t: 'Einfache Diffusion' }, { k: 'channel', t: 'Kanal' }, { k: 'carrier', t: 'Carrier' },
        { k: 'primary', t: 'Primär aktiv' }, { k: 'symport', t: 'Symport' }, { k: 'antiport', t: 'Antiport' }
      ];
      const ui = frame(el, { tabs: modes.map(m => m.t) });
      const W = 640, H = 380, ML = 296, MR = 344, GY0 = 168, GY1 = 232;
      const species = {
        o2: { name: 'O₂', color: '#38bdf8', r: 6 }, ion: { name: 'Na⁺', color: C.orange, r: 6.5 }, k: { name: 'K⁺', color: '#7c3aed', r: 6.5 },
        glc: { name: 'Glucose', color: C.blue, r: 7.5 }, x: { name: 'Teilchen', color: C.teal, r: 7 }
      };
      let mode = 'simple', parts = [], running = true, atp = 0, flux = {}, gate = {}, opts = { ionOnly: false, open: true };
      const info = {
        simple: ['Einfache Diffusion (passiv)', 'Kleine, ungeladene Teilchen wie <b>O₂</b> und <b>CO₂</b> diffundieren direkt durch die Lipiddoppelschicht – <b>ohne Transportprotein</b> und <b>ohne Energie</b>. Durch die ungerichtete Teilchenbewegung wandern netto mehr Teilchen von der höheren zur niedrigeren Konzentration, bis die Konzentrationen ausgeglichen sind.<br><span class="small muted">Schalte auf „Ion“ um: Geladene Teilchen kommen nicht durch das hydrophobe Membraninnere.</span>'],
        channel: ['Kanalvermittelte Diffusion (passiv)', 'Ein <b>Kanalprotein</b> bildet eine Pore. Nur Teilchen passender <b>Größe und Ladung</b> gelangen hindurch – entlang des Konzentrationsgefälles, ohne Energie. Viele Kanäle können sich öffnen und schließen (Schalter unten). Beispiel: Aquaporine für Wasser.'],
        carrier: ['Carriervermittelte Diffusion (passiv)', 'Ein <b>Carrier</b> besitzt eine spezifische <b>Bindungsstelle</b>. Das Teilchen bindet, der Carrier ändert seine Form und gibt es auf der anderen Seite frei. Der Transport läuft nur entlang des Gefälles (passiv). Weil Carrier Zeit brauchen, ist der Transport begrenzt (Sättigung). Beispiel: Glucose-Carrier.'],
        primary: ['Primär aktiver Transport', 'Eine <b>Pumpe</b> transportiert Teilchen <b>gegen</b> ihr Konzentrationsgefälle (hier von außen nach innen, wo die Konzentration höher ist). Die Energie stammt <b>direkt aus ATP</b> (ATP → ADP + P). Teilchen von der anderen Seite werden nicht zurücktransportiert.'],
        symport: ['Symport (sekundär aktiv)', '<b>Na⁺</b> (orange) strömt entlang seines Gefälles (außen hoch → innen niedrig) in die Zelle und nimmt <b>Glucose</b> (blau) <b>gegen</b> deren Gefälle mit – beide in die <b>gleiche Richtung</b>. Der Transporter arbeitet nur, wenn beide gebunden sind. Energiequelle ist das Na⁺-Gefälle (indirekt ATP, da eine Pumpe es aufbaut).'],
        antiport: ['Antiport: Na⁺-K⁺-Ionenpumpe (primär aktiv)', 'Die Pumpe befördert <b>Na⁺ nach außen</b> und <b>K⁺ nach innen</b> – in <b>entgegengesetzte Richtungen</b>, jeweils gegen das Gefälle. Pro Durchgang wird ein ATP verbraucht. <span class="small muted">Ergänzung: 3 Na⁺ hinaus, 2 K⁺ hinein.</span>']
      };
      function rnd(a, b) { return a + Math.random() * (b - a); }
      function add(sp, side, n) {
        for (let i = 0; i < n; i++) parts.push({ sp, x: side === 'L' ? rnd(16, ML - 14) : rnd(MR + 14, W - 16), y: rnd(56, H - 16), vx: rnd(-1, 1), vy: rnd(-1, 1), hold: 0 });
      }
      function setup() {
        parts = []; atp = 0; flux = {}; gate = { busy: 0, load: [], phase: 'na' };
        const nL = +el.querySelector('[data-r=nl]').value, nR = +el.querySelector('[data-r=nr]').value;
        if (mode === 'simple') { add(opts.ionOnly ? 'ion' : 'o2', 'L', nL); add(opts.ionOnly ? 'ion' : 'o2', 'R', nR); }
        else if (mode === 'channel') { add('k', 'L', nL); add('k', 'R', nR); }
        else if (mode === 'carrier') { add('glc', 'L', nL); add('glc', 'R', nR); }
        else if (mode === 'primary') { add('x', 'L', Math.round(nL / 2)); add('x', 'R', nR); }
        else if (mode === 'symport') { add('ion', 'L', nL); add('ion', 'R', 4); add('glc', 'L', 6); add('glc', 'R', nR); }
        else if (mode === 'antiport') { add('ion', 'L', 18); add('ion', 'R', 12); add('k', 'L', 6); add('k', 'R', 18); }
        draw(true);
      }
      function memSVG() {
        let s = `<rect x="0" y="0" width="${ML}" height="${H}" fill="#f0f9ff"/><rect x="${MR}" y="0" width="${W - MR}" height="${H}" fill="#f8fafc"/>`;
        const gateOpen = mode !== 'simple';
        for (let y = 50; y < H; y += 14) {
          if (gateOpen && y > GY0 - 14 && y < GY1 + 6) continue;
          s += `<circle cx="${ML + 6}" cy="${y}" r="5.5" fill="${C.head}"/><circle cx="${MR - 6}" cy="${y}" r="5.5" fill="${C.head}"/><line x1="${ML + 12}" y1="${y}" x2="${MR - 12}" y2="${y}" stroke="${C.tail}" stroke-width="1.6"/>`;
        }
        if (mode === 'channel') s += `<rect x="${ML - 2}" y="${GY0 - 18}" width="${MR - ML + 4}" height="26" rx="8" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/><rect x="${ML - 2}" y="${GY1 - 8}" width="${MR - ML + 4}" height="26" rx="8" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/><rect data-r="lid" x="${ML - 4}" y="${GY0 + 8}" width="8" height="${GY1 - GY0 - 16}" rx="3" fill="${C.protS}" opacity="${opts.open ? 0 : 1}"/>`;
        else if (mode !== 'simple') {
          const col = mode === 'primary' || mode === 'antiport' ? ['#ede9fe', '#7c3aed'] : [C.prot, C.protS];
          s += `<rect data-r="gate" x="${ML - 4}" y="${GY0 - 18}" width="${MR - ML + 8}" height="${GY1 - GY0 + 36}" rx="16" fill="${col[0]}" stroke="${col[1]}" stroke-width="2.4"/>`;
          if (mode === 'primary' || mode === 'antiport') s += T((ML + MR) / 2, GY1 + 40, 'ATP', { size: 12, fill: '#7c3aed' });
        }
        s += T(16, 24, 'außen (extrazellulär)', { anchor: 'start', size: 13, fill: C.muted }) + T(W - 16, 24, 'innen (Cytoplasma)', { anchor: 'end', size: 13, fill: C.muted });
        return s;
      }
      function draw(full) {
        if (full) {
          ui.stage.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="model" data-r="sim"><g data-r="mem">${memSVG()}</g><g data-r="pp"></g><g data-r="hud"></g></svg>`;
          const pp = ui.stage.querySelector('[data-r=pp]');
          parts.forEach(p => { const s = species[p.sp]; p.el = BIO.svgEl('circle', { r: s.r, fill: s.color, stroke: '#fff', 'stroke-width': 1.5 }, pp); });
        }
        parts.forEach(p => { p.el.setAttribute('cx', p.x.toFixed(1)); p.el.setAttribute('cy', p.y.toFixed(1)); p.el.setAttribute('opacity', p.hold > 0 ? 0.55 : 1); });
      }
      function counts() {
        const c = {};
        parts.forEach(p => { c[p.sp] = c[p.sp] || { L: 0, R: 0 }; c[p.sp][p.x < (ML + MR) / 2 ? 'L' : 'R']++; });
        return c;
      }
      function tryPass(p, fromLeft) {
        const inGate = p.y > GY0 && p.y < GY1;
        if (mode === 'simple') return p.sp === 'o2' && Math.random() < 0.5;
        if (mode === 'channel') return opts.open && inGate;
        if (!inGate) return false;
        if (mode === 'carrier') { if (gate.busy) return false; gate.busy = 34; p.hold = 34; p.dest = fromLeft ? 'R' : 'L'; return 'hold'; }
        if (mode === 'primary') { if (!fromLeft || gate.busy) return false; gate.busy = 30; p.hold = 30; p.dest = 'R'; atp++; return 'hold'; }
        if (mode === 'symport') {
          if (!fromLeft || gate.busy) return false;
          if (gate.load.find(q => q.sp === p.sp)) return false;
          gate.load.push(p); p.hold = 9999; p.dest = 'R';
          if (gate.load.length === 2) { gate.busy = 30; gate.load.forEach(q => { q.hold = 30; }); gate.load = []; }
          return 'hold';
        }
        if (mode === 'antiport') {
          if (gate.busy) return false;
          if (gate.phase === 'na' && p.sp === 'ion' && !fromLeft) { gate.load.push(p); p.hold = 9999; p.dest = 'L'; if (gate.load.length === 3) { gate.busy = 30; atp++; gate.load.forEach(q => { q.hold = 30; }); gate.load = []; gate.phase = 'k'; } return 'hold'; }
          if (gate.phase === 'k' && p.sp === 'k' && fromLeft) { gate.load.push(p); p.hold = 9999; p.dest = 'R'; if (gate.load.length === 2) { gate.busy = 30; gate.load.forEach(q => { q.hold = 30; }); gate.load = []; gate.phase = 'na'; } return 'hold'; }
          return false;
        }
        return false;
      }
      function step() {
        if (gate.busy > 0) gate.busy--;
        parts.forEach(p => {
          if (p.hold > 0) {
            p.x = lerp(p.x, (ML + MR) / 2, 0.3); p.y = lerp(p.y, (GY0 + GY1) / 2 + (p.sp === 'glc' ? 12 : p.sp === 'k' ? -12 : 0), 0.3);
            if (p.hold < 9999) p.hold--;
            if (p.hold === 0) {
              p.x = p.dest === 'R' ? MR + 10 : ML - 10; p.vx = p.dest === 'R' ? 1.5 : -1.5;
              flux[p.sp] = (flux[p.sp] || 0) + (p.dest === 'R' ? 1 : -1);
            }
            return;
          }
          p.vx += rnd(-0.45, 0.45); p.vy += rnd(-0.45, 0.45);
          const sp = Math.hypot(p.vx, p.vy), max = 2.4;
          if (sp > max) { p.vx *= max / sp; p.vy *= max / sp; }
          let nx = p.x + p.vx, ny = p.y + p.vy;
          if (ny < 46 || ny > H - 8) { p.vy *= -1; ny = p.y; }
          const left = p.x < (ML + MR) / 2;
          if (left) {
            if (nx < 8) { p.vx *= -1; nx = p.x; }
            if (nx > ML - 6) {
              const r = tryPass(p, true);
              if (r === true) { nx = MR + 8; flux[p.sp] = (flux[p.sp] || 0) + 1; }
              else if (r === 'hold') return;
              else { p.vx = -Math.abs(p.vx); nx = p.x; }
            }
          } else {
            if (nx > W - 8) { p.vx *= -1; nx = p.x; }
            if (nx < MR + 6) {
              const r = tryPass(p, false);
              if (r === true) { nx = ML - 8; flux[p.sp] = (flux[p.sp] || 0) - 1; }
              else if (r === 'hold') return;
              else { p.vx = Math.abs(p.vx); nx = p.x; }
            }
          }
          p.x = nx; p.y = ny;
        });
      }
      let frameN = 0;
      function hud() {
        const c = counts();
        const rows = Object.keys(c).map(k => {
          const s = species[k], tot = c[k].L + c[k].R || 1;
          return `<div class="row small" style="gap:8px;margin:4px 0"><span style="width:70px;color:${s.color};font-weight:700">${s.name}</span>
            <span style="flex:1"><div class="progress"><span style="width:${100 * c[k].L / tot}%;background:${s.color}"></span></div></span>
            <span class="nowrap">außen ${c[k].L} · innen ${c[k].R}</span></div>`;
        }).join('');
        const net = Object.keys(flux).map(k => `${species[k].name}: ${flux[k] > 0 ? '+' : ''}${flux[k]} nach innen`).join(' · ');
        const hudEl = ui.infoEl.querySelector('[data-r=live]');
        if (hudEl) hudEl.innerHTML = rows + `<p class="small muted mt">Netto-Transport: ${net || '–'}${mode === 'primary' || mode === 'antiport' ? ` · <b>ATP verbraucht: ${atp}</b>` : ''}</p><p class="small muted">Balken = Anteil der Teilchen außen.</p>`;
        const lid = ui.stage.querySelector('[data-r=lid]'); if (lid) lid.setAttribute('opacity', opts.open ? 0 : 1);
      }
      function loop() {
        if (!alive(el)) return;
        if (running) { step(); draw(false); if (++frameN % 10 === 0) hud(); }
        requestAnimationFrame(loop);
      }
      ui.controls.innerHTML = `<div class="card flat mt">
        ${slider(uidp('nl'), 'Teilchen außen', 0, 40, 1, 30).replace('<input', '<input data-r="nl"')}
        ${slider(uidp('nr'), 'Teilchen innen', 0, 40, 1, 6).replace('<input', '<input data-r="nr"')}
        <div class="row mt"><button type="button" class="btn small navy" data-a="run">⏸ Pause</button><button type="button" class="btn small" data-a="reset">↺ Neu starten</button>
        <label class="toggle hidden" data-r="ionT"><input type="checkbox" data-r="ion"> Ion (Na⁺) statt O₂</label>
        <label class="toggle hidden" data-r="openT"><input type="checkbox" data-r="open" checked> Kanal geöffnet</label></div></div>`;
      ui.controls.querySelectorAll('input[type=range]').forEach(r => r.addEventListener('input', () => { r.nextElementSibling.textContent = r.value; }));
      ui.controls.querySelectorAll('input[type=range]').forEach(r => r.addEventListener('change', setup));
      ui.controls.querySelector('[data-a=run]').addEventListener('click', e => { running = !running; e.currentTarget.textContent = running ? '⏸ Pause' : '▶ Start'; });
      ui.controls.querySelector('[data-a=reset]').addEventListener('click', setup);
      ui.controls.querySelector('[data-r=ion]').addEventListener('change', e => { opts.ionOnly = e.target.checked; setup(); });
      ui.controls.querySelector('[data-r=open]').addEventListener('change', e => { opts.open = e.target.checked; hud(); });
      function setMode(i) {
        mode = modes[i].k;
        ui.controls.querySelector('[data-r=ionT]').classList.toggle('hidden', mode !== 'simple');
        ui.controls.querySelector('[data-r=openT]').classList.toggle('hidden', mode !== 'channel');
        const nl = ui.controls.querySelector('[data-r=nl]'), nr = ui.controls.querySelector('[data-r=nr]');
        if (mode === 'primary') { nl.value = 16; nr.value = 20; } else if (mode === 'symport') { nl.value = 26; nr.value = 14; } else { nl.value = 30; nr.value = 6; }
        nl.nextElementSibling.textContent = nl.value; nr.nextElementSibling.textContent = nr.value;
        const passive = ['simple', 'channel', 'carrier'].includes(mode);
        ui.info(info[mode][0], `<p><span class="chip ${passive ? 'ok' : 'warn'}">${passive ? 'passiv – ohne Energie' : 'aktiv – mit Energie'}</span></p><p>${info[mode][1]}</p><div data-r="live"></div>`);
        setup();
      }
      ui.onTab(setMode); setMode(0);
      requestAnimationFrame(loop);
    }
  };

  /* ---- 7 Glucosetransport ---- */
  labs.glucose = {
    title: 'Glucose: Darm → Blut', topic: 't4', icon: '🍬',
    desc: 'Drei Transporter arbeiten zusammen – Schritt für Schritt.',
    mount(el) {
      const fig = BIO.figures.glucose;
      const ui = frame(el, { stage: M.svgFor('glucose') });
      const svg = ui.stage.querySelector('svg');
      bindParts(svg, fig.parts, ui);
      const steps = [
        [[], 'Ausgangslage: Konzentrationen', '<p>Im <b>Darmlumen</b> ist die Glucosekonzentration <b>niedriger</b> als in der Darmepithelzelle. Glucose muss also zunächst <b>gegen</b> ihr Konzentrationsgefälle in die Zelle. Na⁺ ist im Lumen hoch und in der Zelle niedrig konzentriert.</p>'],
        [['pump'], '1. Na⁺-K⁺-Ionenpumpe', '<p>Auf der Seite zur Gewebsflüssigkeit pumpt sie unter <b>ATP-Verbrauch</b> Na⁺ aus der Zelle und K⁺ hinein: <b>primär aktiver Transport, Antiport</b>. So bleibt die Na⁺-Konzentration in der Zelle ständig niedrig.</p>'],
        [['symport'], '2. Na⁺-Glucose-Symporter', '<p>Na⁺ strömt entlang seines Gefälles aus dem Lumen in die Zelle und nimmt dabei Glucose <b>gegen</b> deren Gefälle mit: <b>sekundär aktiver Transport, Symport</b>. Die Energie stammt aus dem Na⁺-Gefälle, das die Pumpe aufgebaut hat.</p>'],
        [['carrier'], '3. Glucose-Carrier', '<p>Glucose ist jetzt in der Zelle höher konzentriert als in der Gewebsflüssigkeit. Sie verlässt die Zelle <b>passiv</b> entlang ihres Gefälles über einen Carrier: <b>carriervermittelte (erleichterte) Diffusion</b>. Über die Blutbahn wird sie verteilt.</p>'],
        [['symport'], 'Messdaten (Buch S. 21, B3)', `<p>Bindungswahrscheinlichkeit von Glucose am Symporter:</p>
          <div class="small"><div class="row"><span style="width:90px">mit Na⁺</span><span style="flex:1"><div class="progress big"><span style="width:90%"></span></div></span><b>≈ 9 %</b></div>
          <div class="row mt"><span style="width:90px">ohne Na⁺</span><span style="flex:1"><div class="progress big"><span style="width:10%"></span></div></span><b>≈ 1 %</b></div></div>
          <p class="mt"><b>Deutung:</b> Glucose wird nur dann effektiv gebunden und transportiert, wenn auch Na⁺ bindet → der Glucosetransport ist an den Na⁺-Transport <b>gekoppelt</b>.</p>`]
      ];
      stepper(ui.controls, steps.length, i => { highlight(svg, steps[i][0]); ui.info(steps[i][1], steps[i][2]); }, steps.map(s => s[1]));
    }
  };

  /* ---- 8 Endozytose von Eisen ---- */
  labs.endocytosis = {
    title: 'Rezeptorvermittelte Endozytose', topic: 't5', icon: '🫧',
    desc: 'Aufnahme von Eisen-Ionen über Transferrin und Rezeptor in 7 Schritten.',
    mount(el) {
      const fig = BIO.figures.endocytosis;
      const ui = frame(el, { stage: M.svgFor('endocytosis') });
      const svg = ui.stage.querySelector('svg');
      const legend = document.createElement('div');
      legend.className = 'legend mt';
      legend.innerHTML = `<span><i style="background:${C.red};width:10px;height:10px;border-radius:50%"></i>Eisen-Ionen</span><span><i style="background:#fbbf24;height:10px"></i>Transferrin</span><span><i style="background:${C.prot};height:10px"></i>Rezeptor</span><span><i style="background:#7c3aed"></i>Clathrin</span>`;
      ui.stage.appendChild(legend);
      stepper(ui.controls, fig.steps.length, i => {
        svg.querySelectorAll('[data-step]').forEach(g => { const n = +g.dataset.step - 1; g.setAttribute('opacity', n === i ? 1 : n < i ? 0.35 : 0.08); });
        ui.info(`Schritt ${i + 1}: ${fig.steps[i][0]}`, `<p>${fig.steps[i][1]}</p>${i === 5 ? '<div class="box warn"><div class="box-title">⚡ Warum ist die pH-Senkung nötig?</div><p>Nur im sauren Milieu löst sich Eisen vom Transferrin. Möglich ist das, weil das Vesikel ein abgeschlossenes Kompartiment ist.</p></div>' : ''}${i === 6 ? '<p class="small muted">Vorteil bei geringen Konzentrationen: Rezeptoren binden gezielt und reichern Tf-Fe an, bevor abgeschnürt wird.</p>' : ''}`);
      }, fig.steps.map(s => s[0]));
    }
  };

  /* ---- 9 Exozytose & Membranfluss ---- */
  function insulinSynthSVG() {
    const id = M.nextId('ex');
    const st = (n, s) => `<g data-step="${n}" class="fade">${s}</g>`;
    const dots = (cx, cy, c) => [[-6, -4], [5, -5], [0, 5], [-4, 4], [6, 3]].map(d => `<circle cx="${cx + d[0]}" cy="${cy + d[1]}" r="2.6" fill="${c || C.teal}"/>`).join('');
    let er = ''; [0, 1, 2].forEach(k => { er += `<path d="M${214 + k * 16},84 C${262 + k * 16},110 ${262 + k * 16},230 ${214 + k * 16},256" fill="none" stroke="${C.navy3}" stroke-width="5"/>`; for (let j = 0; j < 7; j++) { const t = j / 6, x = 214 + k * 16 + 40 * Math.sin(t * Math.PI) - 4, y = 84 + 172 * t; er += `<circle cx="${x}" cy="${y}" r="3" fill="${C.navy}"/>`; } });
    let golgi = ''; [0, 1, 2, 3].forEach(k => { golgi += `<path d="M${380 + k * 13},${108 + k * 4} C${414 + k * 13},${140} ${414 + k * 13},${200} ${380 + k * 13},${232 - k * 4}" fill="none" stroke="#a16207" stroke-width="6" stroke-linecap="round"/>`; });
    return `<svg viewBox="0 0 760 340" class="model"><defs>${M.arrowDefs(id, C.navy)}</defs>
      <rect x="8" y="16" width="652" height="308" rx="26" fill="#f8fafc"/><rect x="660" y="0" width="100" height="340" fill="#fef2f2"/>
      <path d="M660,0 L660,140 M660,200 L660,340" stroke="${C.head}" stroke-width="12"/>
      <circle cx="96" cy="170" r="60" fill="#e0e7ff" stroke="${C.navy3}" stroke-width="2"/>${T(96, 176, 'Zellkern', { size: 13 })}
      ${T(710, 30, 'Lymphe /', { size: 12, fill: C.red })}${T(710, 46, 'Blut', { size: 12, fill: C.red })}
      ${st(1, `<path d="M150,160 q10,-10 18,0 t18,0 t18,0" fill="none" stroke="${C.red}" stroke-width="2.4"/>${T(176, 146, 'mRNA', { size: 11, fill: C.red })}${er}${T(250, 290, 'raues ER', { size: 12 })}${dots(268, 176, '#a78bfa')}${T(272, 150, 'Prohormon', { size: 11, fill: '#7c3aed' })}`)}
      ${st(2, `<circle cx="330" cy="200" r="15" fill="#fff" stroke="${C.head}" stroke-width="3"/>${dots(330, 200, '#a78bfa')}<path d="M300,206 L360,196" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/>`)}
      ${st(3, `${golgi}${T(410, 262, 'Golgi-Apparat', { size: 12 })}<circle cx="512" cy="150" r="20" fill="#fff" stroke="${C.head}" stroke-width="3"/>${dots(512, 150)}<rect x="504" y="156" width="7" height="7" fill="#7c3aed"/><path d="M450,160 L486,154" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/>${T(512, 120, 'Insulin + stabil. Protein', { size: 11, fill: C.teal })}`)}
      ${st(4, `<path d="M660,140 C626,140 620,200 660,200" fill="#fff" stroke="${C.head}" stroke-width="6"/>${dots(650, 170)}<path d="M540,160 L620,166" stroke="${C.navy}" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#${id})"/>${T(600, 236, 'Exozytose', { size: 12, fill: C.teal })}`)}
      ${st(5, `${dots(692, 150)}${dots(716, 210)}${dots(700, 270)}<path d="M720,226 L720,316" stroke="${C.red}" stroke-width="1.8" marker-end="url(#${id})"/>${T(710, 334, 'zum Ziel', { size: 11, fill: C.red })}`)}
    </svg>`;
  }
  function insulinActionSVG() {
    const id = M.nextId('ia');
    const st = (n, s) => `<g data-step="${n}" class="fade">${s}</g>`;
    const tr = (x, y, rot) => `<rect x="${x - 5}" y="${y - 9}" width="10" height="18" rx="3" fill="${C.prot}" stroke="${C.protS}" stroke-width="1.5" transform="rotate(${rot || 0} ${x} ${y})"/>`;
    let stor = ''; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; stor += tr(350 + 92 * Math.cos(a), 262 + 52 * Math.sin(a), a * 180 / Math.PI + 90); }
    const glc = (x, y) => `<polygon points="${M.hex(x, y, 8)}" fill="#bfdbfe" stroke="${C.blue}" stroke-width="1.5"/>`;
    return `<svg viewBox="0 0 760 360" class="model"><defs>${M.arrowDefs(id, C.navy)}${M.arrowDefs(id + 'b', C.blue)}</defs>
      <rect x="0" y="0" width="760" height="78" fill="#fef2f2"/>${T(12, 22, 'Blut', { anchor: 'start', size: 12, fill: C.red })}${T(12, 350, 'Körperzelle (z. B. Muskelzelle)', { anchor: 'start', size: 12, fill: C.muted })}
      <path d="M0,84 L530,84 M590,84 L760,84" stroke="${C.head}" stroke-width="12"/>
      <ellipse cx="350" cy="262" rx="92" ry="52" fill="#fff" stroke="${C.head}" stroke-width="5"/>${stor}${T(350, 266, 'Speichervesikel', { size: 12 })}
      ${st(1, `<rect x="100" y="64" width="20" height="54" rx="6" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/><circle cx="110" cy="52" r="10" fill="${C.teal}"/>${T(150, 46, 'Insulin', { size: 12, fill: C.teal, anchor: 'start' })}${T(150, 112, 'Rezeptor', { size: 12, anchor: 'start' })}`)}
      ${st(2, `<path d="M116,124 L144,154" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/><ellipse cx="160" cy="178" rx="30" ry="18" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/><circle cx="184" cy="166" r="8" fill="#fde68a" stroke="${C.orange}"/>${T(184, 170, 'P', { size: 10 })}${T(160, 216, 'ATP → ADP + P', { size: 11, fill: '#7c3aed' })}`)}
      ${st(3, `<path d="M190,184 C240,200 260,210 270,224" stroke="${C.navy}" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#${id})"/><circle cx="470" cy="196" r="17" fill="#fff" stroke="${C.head}" stroke-width="4"/>${tr(470, 180, 0)}<path d="M430,232 L456,210" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/>`)}
      ${st(4, `<path d="M530,84 C534,120 586,120 590,84" fill="none" stroke="${C.head}" stroke-width="6"/>${tr(560, 84, 0)}<path d="M486,182 L536,124" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/>`)}
      ${st(5, `${glc(560, 30)}${glc(600, 44)}${glc(636, 28)}<path d="M560,42 L560,146" stroke="${C.blue}" stroke-width="2" marker-end="url(#${id}b)"/>${tr(628, 84, 0)}<path d="M628,52 L628,146" stroke="${C.blue}" stroke-width="2" marker-end="url(#${id}b)"/>`)}
      ${st(6, `<circle cx="690" cy="150" r="17" fill="#fff" stroke="${C.head}" stroke-width="4"/>${tr(690, 134, 0)}<path d="M690,92 L690,128" stroke="${C.navy}" stroke-width="1.4"/><path d="M676,166 C620,240 520,262 448,262" fill="none" stroke="${C.navy}" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#${id})"/>${T(706, 196, 'Endozytose', { size: 11, anchor: 'start' })}`)}
    </svg>`;
  }
  labs.exocytosis = {
    title: 'Exozytose & Membranfluss', topic: 't5', icon: '📦',
    desc: 'Insulin-Freisetzung (Exozytose) und Insulinwirkung durch Membranfluss.',
    mount(el) {
      const ui = frame(el, { tabs: ['Exozytose: Insulin', 'Membranfluss: Insulinwirkung'] });
      const sets = [
        { svg: insulinSynthSVG, steps: [
          ['Synthese am rauen ER', 'Die Information für Insulin gelangt als mRNA vom Zellkern zu Ribosomen am rauen ER. Dort entsteht die Vorstufe, das <b>Prohormon</b> (β-Zellen der Bauchspeicheldrüse).'],
          ['Transport zum Golgi-Apparat', 'Das Prohormon wird in einem <b>Vesikel</b> zum Golgi-Apparat transportiert.'],
          ['Umbau im Golgi-Apparat', 'Im Golgi-Apparat wird es zum <b>aktiven Hormon</b> umgebaut. Ein Vesikel schnürt sich ab, in dem Insulin mit einem <b>stabilisierenden Protein</b> vorliegt.'],
          ['Exozytose', 'Das Vesikel <b>verschmilzt mit der Zellmembran</b> und gibt seinen Inhalt nach außen ab. Die Vesikelmembran wird Teil der Zellmembran.'],
          ['Abtransport', 'Insulin gelangt über Lymphe und Kapillarwand ins Blutplasma und zum Bestimmungsort (Körperzellen).']
        ] },
        { svg: insulinActionSVG, steps: [
          ['Insulin bindet am Rezeptor', 'Insulin bindet außen an einen <b>Rezeptor</b> der Zellmembran (Schlüssel-Schloss-Prinzip).'],
          ['Signal im Zellinneren', 'Im Zellinneren wird ein Signalprotein unter ATP-Verbrauch <b>phosphoryliert</b> (ATP → ADP + P).'],
          ['Abschnürung kleiner Vesikel', 'Das phosphorylierte Signalprotein bewirkt indirekt, dass sich vom großen <b>Speichervesikel</b> kleine Vesikel abschnüren, in deren Membran <b>Glucose-Transportproteine</b> sitzen.'],
          ['Verschmelzung mit der Zellmembran', 'Die kleinen Vesikel wandern zur Zellmembran und <b>verschmelzen</b> mit ihr. Die Transporter sind jetzt in der Zellmembran.'],
          ['Glucose strömt ein', 'Über die zusätzlichen Transporter strömt Glucose in die Zelle. Durch diesen <b>Membranfluss</b> steigt die Glucoseaufnahme bis zum <b>50-Fachen</b>.'],
          ['Recycling durch Endozytose', 'Die Transportproteine werden durch <b>Endozytose</b> wieder aufgenommen und mit dem Speichervesikel vereinigt.']
        ] }
      ];
      const show = k => {
        const s = sets[k];
        ui.stage.innerHTML = s.svg();
        ui.controls.innerHTML = '';
        const box = document.createElement('div'); ui.controls.appendChild(box);
        const svg = ui.stage.querySelector('svg');
        stepper(box, s.steps.length, i => {
          svg.querySelectorAll('[data-step]').forEach(g => { const n = +g.dataset.step - 1; g.setAttribute('opacity', n === i ? 1 : n < i ? 0.4 : 0.07); });
          ui.info(`Schritt ${i + 1}: ${s.steps[i][0]}`, `<p>${s.steps[i][1]}</p><p class="small muted">Buch S. 23 (Material „Membran im Fluss“), ${k === 0 ? 'B1' : 'B2'}.</p>`);
        }, s.steps.map(x => x[0]));
      };
      ui.onTab(show); show(0);
    }
  };

  /* ---- 10 Katalyse ---- */
  function cofactorSVG() {
    const id = M.nextId('cf');
    const E = (x, y, c) => `<path d="${M.enzymePath(x, y, 22, 26, 58, 40)}" fill="${c || C.prot}" stroke="${C.protS}" stroke-width="2"/>`;
    return `<svg viewBox="0 0 680 360" class="model"><defs>${M.arrowDefs(id, C.navy)}</defs>
      ${T(340, 24, 'Apoenzym + Cofaktor = Holoenzym', { size: 15, fill: C.navy })}
      ${E(90, 92)}${T(90, 142, 'Apoenzym', { size: 12 })}${T(90, 156, '(Proteinanteil)', { size: 11, fill: C.muted })}
      ${T(170, 96, '+', { size: 24 })}<circle cx="226" cy="90" r="14" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/>${T(226, 142, 'Cofaktor', { size: 12 })}
      ${T(286, 96, '=', { size: 24 })}${E(380, 92)}<circle cx="380" cy="68" r="12" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/>${T(380, 142, 'Holoenzym', { size: 12 })}
      <line x1="10" y1="176" x2="670" y2="176" stroke="#e2e8f0"/>
      ${T(340, 200, 'Cosubstrat: vorübergehend gebunden, verändert, regeneriert', { size: 14, fill: C.navy })}
      ${E(160, 280)}${T(160, 324, 'Enzym E1', { size: 12 })}${T(120, 232, 'S1', { size: 12, fill: C.blue })}${T(200, 232, 'P1', { size: 12, fill: C.green })}
      ${E(520, 280)}${T(520, 324, 'Enzym E2', { size: 12 })}${T(480, 232, 'S2', { size: 12, fill: C.blue })}${T(560, 232, 'P2', { size: 12, fill: C.green })}
      <circle cx="340" cy="236" r="14" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/>${T(340, 240, 'Co', { size: 10 })}${T(340, 222, 'Cosubstrat', { size: 11, anchor: 'middle', fill: C.orange, style: 'transform: translateY(-14px)' })}
      <circle cx="340" cy="318" r="14" fill="#fecaca" stroke="${C.red}" stroke-width="2"/>${T(340, 322, 'Co*', { size: 10 })}${T(340, 350, 'verändertes Cosubstrat', { size: 11, fill: C.red })}
      <path d="M196,262 C250,300 290,316 320,318" fill="none" stroke="${C.navy}" stroke-width="1.8" marker-end="url(#${id})"/>
      <path d="M360,318 C400,316 440,300 486,266" fill="none" stroke="${C.navy}" stroke-width="1.8" marker-end="url(#${id})"/>
      <path d="M486,254 C440,238 400,236 358,236" fill="none" stroke="${C.navy}" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#${id})"/>
      <path d="M322,236 C280,238 240,244 198,256" fill="none" stroke="${C.navy}" stroke-width="1.8" marker-end="url(#${id})"/>
      ${T(430, 230, 'Regeneration', { size: 11, fill: C.teal })}
    </svg>`;
  }
  labs.catalysis = {
    title: 'Enzymkatalyse', topic: 't6', icon: '⚙',
    desc: 'Katalytischer Zyklus, Energiediagramm mit/ohne Enzym und Cofaktoren.',
    mount(el) {
      const ui = frame(el, { tabs: ['Katalytischer Zyklus', 'Energiediagramm', 'Cofaktoren'] });
      const show = k => {
        ui.controls.innerHTML = '';
        if (k === 0) {
          ui.stage.innerHTML = M.svgFor('cycle');
          const svg = ui.stage.querySelector('svg');
          const steps = [
            [['e1'], 'Enzym und Substrat', 'Das Enzym (Lactase) besitzt eine taschenförmige Vertiefung, das <b>aktive Zentrum</b>. Das Substrat Lactose passt hinein.'],
            [['es'], 'Enzym-Substrat-Komplex', 'Das Substrat wird im aktiven Zentrum gebunden: Aminosäurereste treten über Ionenbindungen, H-Brücken, Dipol-Dipol- und Van-der-Waals-Kräfte mit ihm in Wechselwirkung. Bindungen im Substrat werden <b>gelockert</b>; ein Wassermolekül lagert sich an (Hydrolyse). Dieser Übergangszustand hat eine <b>niedrigere Aktivierungsenergie</b>.'],
            [['prod'], 'Produkte lösen sich', 'Es entstehen Glucose und Galactose. Die Produkte haben eine <b>geringere Affinität</b> zum Enzym als das Substrat und lösen sich ab.'],
            [['e2'], 'Enzym unverändert', 'Das Enzym geht <b>unverändert</b> aus der Reaktion hervor und kann sofort ein neues Substrat binden. Deshalb genügen schon <b>geringe Enzymmengen</b>.']
          ];
          const box = document.createElement('div'); ui.controls.appendChild(box);
          stepper(box, 4, i => {
            svg.querySelectorAll('[data-part]').forEach(g => g.setAttribute('opacity', steps[i][0].includes(g.dataset.part) ? 1 : 0.3));
            ui.info(`${i + 1}. ${steps[i][1]}`, `<p>${steps[i][2]}</p>`);
          }, steps.map(s => s[1]));
        } else if (k === 1) {
          ui.stage.innerHTML = M.svgFor('energy');
          const svg = ui.stage.querySelector('svg');
          ui.controls.innerHTML = `<div class="row mt"><label class="toggle"><input type="checkbox" data-r="en" checked> Kurve mit Enzym zeigen</label></div>`;
          const tealEls = () => Array.from(svg.querySelectorAll('[stroke="#0d9488"], text[fill="#0d9488"]'));
          ui.controls.querySelector('[data-r=en]').addEventListener('change', e => tealEls().forEach(x => x.style.opacity = e.target.checked ? 1 : 0));
          ui.info('Energiediagramm', `<p>Die Substrate (A + B) müssen erst die <b>Aktivierungsenergie</b> aufnehmen, um den Übergangszustand zu erreichen. Das Enzym bildet mit dem Substrat einen Enzym-Substrat-Komplex [A···E···B] – einen Übergangszustand mit <b>niedrigerer</b> Aktivierungsenergie.</p>
            <ul><li>Mehr Moleküle sind reaktionsfähig → Reaktion bei Körpertemperatur bis ca. 10 000 000-fach schneller (Lactase).</li><li><b>Anfangs- und Endniveau bleiben gleich</b> – die frei werdende Energie (exergonisch) ändert sich nicht.</li><li>Enzyme liefern keine Energie.</li></ul>`);
        } else {
          ui.stage.innerHTML = cofactorSVG();
          ui.info('Cofaktoren', `<p>Viele Enzyme brauchen neben dem Proteinanteil (<b>Apoenzym</b>) einen <b>Cofaktor</b>. Zusammen ergeben sie das funktionsfähige <b>Holoenzym</b>.</p>
            <ul><li><b>Metall-Ionen</b> (Fe, Cu, Mn aus der Nahrung): fest gebunden, stabilisieren den Übergangszustand.</li><li><b>Coenzyme</b> (organisch):<ul><li><b>prosthetische Gruppe</b> – ständig und fest gebunden</li><li><b>Cosubstrat</b> – nur vorübergehend gebunden; gibt H⁺, Elektronen oder Gruppen ab bzw. nimmt sie auf, verändert sich (Co*) und wird von einem zweiten Enzym (E2) <b>regeneriert</b>. Beispiel: NAD⁺ (Alkoholdehydrogenase).</li></ul></li></ul>`);
        }
      };
      ui.onTab(show); show(0);
    }
  };

  /* ---- 11 Schlüssel-Schloss / Induced Fit ---- */
  labs.inducedfit = {
    title: 'Schlüssel-Schloss vs. Induced Fit', topic: 't7', icon: '🔑',
    desc: 'Substrate testen, Passform beobachten, Spezifität verstehen.',
    mount(el) {
      const ui = frame(el, { tabs: ['Schlüssel-Schloss-Prinzip', 'Induced-Fit-Modell'] });
      const lockEnzyme = `<path d="M100,170 Q100,150 120,150 L188,150 L220,204 L252,150 L320,150 Q340,150 340,170 L340,268 Q340,288 320,288 L120,288 Q100,288 100,268 Z" fill="${C.prot}" stroke="${C.protS}" stroke-width="2.4"/>${T(222, 192, '−', { size: 22, fill: C.red })}${T(220, 262, 'Enzym (aktives Zentrum starr)', { size: 13 })}`;
      const subs = {
        fit: { name: 'passendes Substrat', svg: `<polygon points="190,0 220,52 250,0" fill="#fde68a" stroke="${C.orange}" stroke-width="2.4"/>${T(220, 22, '+', { size: 18, fill: C.blue })}`, fits: true },
        shape: { name: 'falsche Form', svg: `<rect x="194" y="0" width="52" height="40" rx="4" fill="#fbcfe8" stroke="#be185d" stroke-width="2.4"/>`, fits: false, why: 'Die Form passt nicht in das aktive Zentrum – kein Enzym-Substrat-Komplex.' },
        charge: { name: 'falsche Ladung', svg: `<polygon points="190,0 220,52 250,0" fill="#e9d5ff" stroke="#7c3aed" stroke-width="2.4"/>${T(220, 24, '−', { size: 20, fill: C.red })}`, fits: false, why: 'Die Form würde passen, aber gleiche Ladungen stoßen sich ab – keine Bindung.' }
      };
      function lock() {
        ui.stage.innerHTML = `<svg viewBox="0 0 440 310" class="model">${lockEnzyme}<g data-r="sub" transform="translate(0,30)">${subs.fit.svg}</g></svg>`;
        ui.controls.innerHTML = `<div class="row mt">${Object.keys(subs).map(k => `<button type="button" class="btn small" data-s="${k}">${subs[k].name}</button>`).join('')}</div>`;
        ui.info('Schlüssel-Schloss-Prinzip', '<p>Substratmoleküle unterscheiden sich in <b>Größe, Form und Ladungsverteilung</b>. Nur ein Substrat, das räumlich zum <b>starren</b> aktiven Zentrum passt, bildet den Enzym-Substrat-Komplex – wie ein Schlüssel im passenden Schloss. Enzyme sind deshalb <b>substratspezifisch</b>.</p><p class="small muted">Wähle ein Substrat aus.</p>');
        const g = ui.stage.querySelector('[data-r=sub]');
        ui.controls.onclick = e => {
          const b = e.target.closest('[data-s]'); if (!b) return;
          const s = subs[b.dataset.s];
          g.innerHTML = s.svg;
          const target = s.fits ? 150 : (b.dataset.s === 'shape' ? 108 : 112);
          animate(900, t => g.setAttribute('transform', `translate(0,${lerp(20, target, t)})`), () => {
            if (s.fits) ui.info('✓ Enzym-Substrat-Komplex', '<p>Das Substrat passt in Form und Ladung (+ zu −) genau in das aktive Zentrum. Der <b>Enzym-Substrat-Komplex</b> entsteht, die Reaktion kann ablaufen.</p>');
            else { ui.info('✗ Keine Bindung', `<p>${s.why}</p><p>→ Das Enzym ist <b>substratspezifisch</b>.</p>`); animate(500, t => g.setAttribute('transform', `translate(0,${lerp(target, 30, t)})`), null, el); }
          }, el);
        };
      }
      function fit() {
        ui.stage.innerHTML = `<svg viewBox="0 0 440 310" class="model"><path data-r="enz" d="${M.enzymePath(220, 230, 44, 30, 120, 70)}" fill="${C.prot}" stroke="${C.protS}" stroke-width="2.4"/>
          <g data-r="sub"><ellipse cx="220" cy="0" rx="26" ry="18" fill="#fde68a" stroke="${C.orange}" stroke-width="2.4"/>${T(220, 5, 'S', { size: 14 })}</g>
          <g data-r="prod" opacity="0"><path d="M194,0 a26,18 0 0,1 26,-18 v36 a26,18 0 0,1 -26,-18z" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/><path d="M246,0 a26,18 0 0,0 -26,-18 v36 a26,18 0 0,0 26,-18z" fill="#bfdbfe" stroke="${C.blue}" stroke-width="2"/></g>
          ${T(220, 296, 'Enzym (aktives Zentrum flexibel)', { size: 13 })}</svg>`;
        ui.controls.innerHTML = `<div class="row mt"><button type="button" class="btn small primary" data-a="go">▶ Substrat binden</button><button type="button" class="btn small" data-a="react">Reaktion &amp; Ablösung</button><button type="button" class="btn small" data-a="reset">↺</button></div>`;
        const enz = ui.stage.querySelector('[data-r=enz]'), sub = ui.stage.querySelector('[data-r=sub]'), prod = ui.stage.querySelector('[data-r=prod]');
        const setE = (mouth, depth) => enz.setAttribute('d', M.enzymePath(220, 230, mouth, depth, 120, 70));
        sub.setAttribute('transform', 'translate(0,60)');
        let state = 0;
        ui.info('Induced-Fit-Modell', '<p>Das aktive Zentrum ist <b>nicht starr</b>. Erst die Bindung des Substrats verändert die räumliche Struktur des Enzyms – es entsteht eine <b>gegenseitige optimale Ausrichtung</b> (induzierte Passform).</p><p class="small muted">Starte die Animation.</p>');
        ui.controls.onclick = e => {
          const a = (e.target.closest('[data-a]') || {}).dataset; if (!a) return;
          if (a.a === 'go' && state === 0) {
            state = 1;
            animate(1300, t => { sub.setAttribute('transform', `translate(0,${lerp(60, 196, t)})`); if (t > .55) { const u = (t - .55) / .45; setE(lerp(44, 27, u), lerp(30, 42, u)); } }, () => {
              ui.info('Induzierte Passform', '<p>Das Substrat hat sich gebunden; dabei hat sich das aktive Zentrum um das Substrat <b>geschlossen</b>. Erst jetzt passen Enzym und Substrat optimal zueinander – Bindungen im Substrat werden gelockert.</p>');
            }, el);
          } else if (a.a === 'react' && state === 1) {
            state = 2;
            sub.setAttribute('opacity', 0); prod.setAttribute('opacity', 1);
            animate(1200, t => { prod.setAttribute('transform', `translate(0,${lerp(196, 50, t)})`); setE(lerp(27, 44, t), lerp(42, 30, t)); prod.children[0].setAttribute('transform', `translate(${-50 * t},0)`); prod.children[1].setAttribute('transform', `translate(${50 * t},0)`); }, () => {
              ui.info('Wirkungsspezifität', '<p>Im aktiven Zentrum wird immer <b>dieselbe Reaktion</b> katalysiert – es entstehen immer dieselben Produkte: Das Enzym ist <b>wirkungsspezifisch</b>. Danach nimmt das Enzym seine Ausgangsform wieder ein (katalytischer Zyklus).</p>');
            }, el);
          } else if (a.a === 'reset') { fit(); }
        };
      }
      ui.onTab(k => k === 0 ? lock() : fit()); lock();
    }
  };

  /* ---- 12 Michaelis-Menten ---- */
  function enzymeIcons(n, fracS, fracI, inhibType) {
    let s = '';
    const nS = Math.round(n * fracS), nI = Math.round(n * (fracI || 0));
    for (let i = 0; i < n; i++) {
      const x = 34 + (i % 10) * 56, y = 36 + Math.floor(i / 10) * 64;
      const isI = i >= n - nI, isS = !isI && i < nS;
      const deformed = isI && inhibType === 'noncomp';
      s += `<path d="${M.enzymePath(x, y + 10, deformed ? 10 : 11, deformed ? 8 : 14, 22, 18)}" fill="${isI ? '#e2e8f0' : C.prot}" stroke="${isI ? C.muted : C.protS}" stroke-width="1.5"/>`;
      if (isS) s += `<circle cx="${x}" cy="${y + 2}" r="7" fill="#fde68a" stroke="${C.orange}" stroke-width="1.5"/>`;
      if (isI && inhibType === 'comp') s += `<circle cx="${x}" cy="${y + 2}" r="7" fill="#fecaca" stroke="${C.red}" stroke-width="1.5"/>`;
      if (isI && inhibType === 'noncomp') s += `<rect x="${x + 14}" y="${y + 12}" width="11" height="11" rx="2" fill="#fecaca" stroke="${C.red}" stroke-width="1.5"/>`;
      if (isI && inhibType === 'irr') s += `<circle cx="${x}" cy="${y + 2}" r="7" fill="${C.red}" stroke="#7f1d1d" stroke-width="1.5"/>`;
    }
    const rows = Math.ceil(n / 10);
    return `<svg viewBox="0 0 580 ${rows * 64 + 10}" class="model">${s}</svg>`;
  }
  labs.michaelis = {
    title: 'Michaelis-Menten-Kinetik', topic: 't8', icon: '📈',
    desc: 'Substratkonzentration, Enzymmenge und Affinität verändern – vmax, ½vmax, KM.',
    mount(el) {
      const ui = frame(el, {});
      const ids = { s: uidp('s'), e: uidp('e'), k: uidp('k') };
      ui.controls.innerHTML = `<div class="card flat mt">${slider(ids.s, 'Substratkonz. c(S)', 0, 10, 0.1, 1.5)}${slider(ids.e, 'Enzymkonzentration', 0.25, 1.5, 0.05, 1)}${slider(ids.k, 'K<sub>M</sub> (Affinität)', 0.3, 4, 0.1, 1.5)}
        <label class="toggle"><input type="checkbox" data-r="cmp"> Vergleich: halbe Enzymkonzentration (Buch S. 33, B3)</label>
        <p class="small muted mb0">Unten: Enzymmoleküle – gelb = aktives Zentrum besetzt.</p><div data-r="icons"></div></div>`;
      const ch = BIO.chart.create({ x: [0, 10], y: [0, 1.6], xticks: [0, 2, 4, 6, 8, 10], yticks: [0, 0.5, 1, 1.5], xlabel: 'Substratkonzentration c(S) in rel. Einheiten', ylabel: 'Reaktionsgeschwindigkeit v' });
      ui.stage.appendChild(ch.svg);
      const g = id => el.querySelector('#' + id);
      function upd() {
        const S = +g(ids.s).value, E = +g(ids.e).value, K = +g(ids.k).value, vmax = E;
        [ids.s, ids.e, ids.k].forEach(id => { g(id).nextElementSibling.textContent = String(g(id).value).replace('.', ','); });
        ch.clear('curves'); ch.clear('marks');
        if (el.querySelector('[data-r=cmp]').checked) ch.fn(x => BIO.curves.mm(x, vmax / 2, K), { color: '#94a3b8', dash: '7 5', width: 2.5 });
        ch.fn(x => BIO.curves.mm(x, vmax, K));
        ch.hline(vmax); ch.text(10, vmax, 'v<tspan font-size="10" dy="3">max</tspan>', { dx: -4, dy: -6, anchor: 'end' });
        ch.hline(vmax / 2, { to: K }); ch.vline(K, { to: vmax / 2 });
        ch.text(0, vmax / 2, '½ v<tspan font-size="10" dy="3">max</tspan>', { dx: 6, dy: -6 });
        ch.text(K, 0, 'K<tspan font-size="10" dy="3">M</tspan>', { dy: -8, dx: 4, color: C.teal });
        const v = BIO.curves.mm(S, vmax, K);
        ch.vline(S, { to: v, color: C.orange, dash: '3 3' });
        ch.point(S, v, { color: C.orange });
        const frac = S / (K + S);
        el.querySelector('[data-r=icons]').innerHTML = enzymeIcons(20, frac);
        let region;
        if (S < 0.6 * K) region = '<b>Niedrige Substratkonzentration:</b> Wegen der ungerichteten Brownschen Molekularbewegung treffen Enzym und Substrat selten aufeinander. Viele aktive Zentren sind frei. Mehr Substrat → mehr Begegnungen → v steigt fast proportional.';
        else if (S < 3 * K) region = '<b>Mittlerer Bereich:</b> Ein zunehmender Teil der aktiven Zentren ist besetzt; weitere Substraterhöhung bringt immer weniger Zuwachs – die Kurve flacht ab. Bei c(S) = K<sub>M</sub> ist ½ v<sub>max</sub> erreicht (im Mittel die Hälfte der aktiven Zentren besetzt).';
        else region = '<b>Sättigung:</b> Fast alle aktiven Zentren sind besetzt; sobald ein Produkt das aktive Zentrum verlässt, bindet sofort ein neues Substrat. Mehr Substrat erhöht v kaum noch – v nähert sich asymptotisch v<sub>max</sub>.';
        ui.info('Michaelis-Menten-Diagramm', `<p>${region}</p>
          <div class="grid grid-2 small" style="gap:8px"><div class="stat"><b>${(100 * frac).toFixed(0)} %</b><span>aktive Zentren besetzt</span></div><div class="stat"><b>${v.toFixed(2).replace('.', ',')}</b><span>v (v<sub>max</sub> = ${vmax.toFixed(2).replace('.', ',')})</span></div></div>
          <ul class="small mt"><li><b>Enzymkonzentration ↑</b> → v<sub>max</sub> ↑, K<sub>M</sub> bleibt gleich.</li><li><b>K<sub>M</sub> klein</b> → hohe Affinität: ½ v<sub>max</sub> schon bei wenig Substrat.</li><li>K<sub>M</sub> wird auf der <b>x-Achse</b> abgelesen.</li></ul>`);
      }
      el.addEventListener('input', e => { if (e.target.matches('input')) upd(); });
      upd();
    }
  };

  /* ---- 13 Temperatur & pH ---- */
  labs.tempph = {
    title: 'Temperatur & pH-Wert', topic: 't9', icon: '🌡',
    desc: 'RGT-Regel, Optimum, Denaturierung – für verschiedene Organismen und Enzyme.',
    mount(el) {
      const ui = frame(el, { tabs: ['Temperatur', 'pH-Wert'] });
      const orgs = [['Mensch (≈ 37 °C)', 37, 'Viele menschliche Enzyme haben ihr Optimum um 37 °C – Angepasstheit an die Körpertemperatur.'], ['Forelle (≈ 15 °C)', 15, 'Wechselwarmer Fisch: Isoenzym mit niedrigerem Optimum (Buch S. 36, B3).'], ['Eisfisch (≈ 3 °C)', 3, 'Lebt in sehr kaltem Wasser: Enzym mit sehr niedrigem Optimum (Buch S. 36, B3).'], ['thermophiles Bakterium (Modell ≈ 80 °C)', 80, 'Thermophile Enzyme (z. B. Taq-Polymerase, bei 95 °C noch aktiv) sind durch viele Disulfidbrücken und Ionenbindungen stabilisiert. Optimum hier als Modellwert (Ergänzung).']];
      const enz = [['Pepsin (Magen)', 2, '#be185d'], ['Speichel-Amylase (Mund)', 7, C.teal], ['Lactase (Dünndarm)', 7, C.orange], ['Trypsin (Dünndarm)', 8, C.blue]];
      function enzymeState(denat, slow) {
        const p = denat < 0.5 ? M.enzymePath(70, 60, 18, 22, 46, 34) : 'M24,60 C34,30 50,86 66,50 S96,80 110,44 S128,70 120,80';
        return `<svg viewBox="0 0 140 110" style="width:140px">${denat < 0.5 ? `<path d="${p}" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>` : `<path d="${p}" fill="none" stroke="${C.muted}" stroke-width="5" stroke-linecap="round"/>`}
          ${T(70, 104, denat < 0.5 ? (slow ? 'intakt, langsam' : 'intakt') : 'denaturiert', { size: 12, fill: denat < 0.5 ? C.teal : C.red })}</svg>`;
      }
      function temp() {
        const sid = uidp('t'), oid = uidp('o');
        ui.controls.innerHTML = `<div class="card flat mt"><div class="row"><label class="small" for="${oid}"><b>Organismus</b></label><select id="${oid}" style="padding:8px;border-radius:9px;border:1px solid var(--line-2);min-height:40px;max-width:100%">${orgs.map((o, i) => `<option value="${i}">${o[0]}</option>`).join('')}</select></div>${slider(sid, 'Temperatur', 0, 100, 1, 30, ' °C')}</div>`;
        const ch = BIO.chart.create({ x: [0, 100], y: [0, 1.15], xticks: [0, 20, 40, 60, 80, 100], yticks: [0, 0.5, 1], xlabel: 'Temperatur in °C', ylabel: 'Enzymaktivität (rel.)' });
        ui.stage.innerHTML = ''; ui.stage.appendChild(ch.svg);
        const upd = () => {
          const o = orgs[+el.querySelector('#' + oid).value], T0 = +el.querySelector('#' + sid).value;
          el.querySelector('#' + sid).nextElementSibling.textContent = T0 + ' °C';
          const opt = o[1], f = t => BIO.curves.tempNorm(t, opt, 2.2);
          ch.clear('curves'); ch.clear('marks'); ch.clear('area');
          ch.rect(0, opt, { color: '#ecfeff' }); ch.rect(opt, 100, { color: '#fef2f2' });
          orgs.forEach(x => { if (x !== o) ch.fn(t => BIO.curves.tempNorm(t, x[1], 2.2), { color: '#cbd5e1', width: 1.5 }); });
          ch.fn(f);
          ch.vline(opt, { to: 1 }); ch.text(opt, 1, 'Optimum', { dy: -8, anchor: 'middle' });
          const v = f(T0); ch.point(T0, v, { color: C.orange });
          const denat = T0 > opt + 3 ? Math.min(1, (T0 - opt - 3) / 6) : 0;
          const ratio = f(T0 + 10) / Math.max(1e-6, v);
          let txt;
          if (T0 <= opt - 2) txt = `<p><b>Bereich I (RGT-Regel):</b> Mit steigender Temperatur schwingen und bewegen sich die Moleküle stärker – Anzahl und Intensität der Zusammenstöße nehmen zu, mehr Moleküle erreichen die Aktivierungsenergie. Faustregel: +10 °C → 2- bis 3-fache Geschwindigkeit.</p>${T0 + 10 <= opt ? `<p class="small">Modell: von ${T0} auf ${T0 + 10} °C steigt die Aktivität auf das <b>${ratio.toFixed(1).replace('.', ',')}-Fache</b>.</p>` : ''}`;
          else if (T0 <= opt + 3) txt = '<p><b>Temperaturoptimum:</b> Höchste Aktivität. Die Molekülbewegung ist hoch, das Enzym aber noch weitgehend intakt.</p>';
          else txt = '<p><b>Bereich II (Denaturierung):</b> Die Schwingungen im Enzym werden so stark, dass Wechselwirkungen der Raumstruktur (H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte) zerstört werden. Das aktive Zentrum verformt sich, Substrat wird nicht mehr gebunden – <b>irreversible</b> Denaturierung → steiler Abfall.</p>';
          ui.info(`${T0} °C – Aktivität ${(v * 100).toFixed(0)} %`, `<div class="row">${enzymeState(denat, T0 < opt - 15)}<p class="small mb0" style="flex:1">${o[2]}</p></div>${txt}`);
        };
        el.querySelector('#' + oid).addEventListener('change', upd);
        el.querySelector('#' + sid).addEventListener('input', upd);
        upd();
      }
      function ph() {
        const sid = uidp('p'), eid = uidp('e');
        ui.controls.innerHTML = `<div class="card flat mt"><div class="row"><label class="small" for="${eid}"><b>Enzym</b></label><select id="${eid}" style="padding:8px;border-radius:9px;border:1px solid var(--line-2);min-height:40px;max-width:100%">${enz.map((o, i) => `<option value="${i}">${o[0]} – Optimum ≈ ${o[1]}</option>`).join('')}</select></div>${slider(sid, 'pH-Wert', 0, 14, 0.1, 7)}</div>`;
        const ch = BIO.chart.create({ x: [0, 14], y: [0, 1.15], xticks: [0, 2, 4, 6, 8, 10, 12, 14], yticks: [0, 0.5, 1], xlabel: 'pH-Wert', ylabel: 'Enzymaktivität (rel.)' });
        ui.stage.innerHTML = ''; ui.stage.appendChild(ch.svg);
        const upd = () => {
          const k = +el.querySelector('#' + eid).value, e = enz[k], p = +el.querySelector('#' + sid).value;
          el.querySelector('#' + sid).nextElementSibling.textContent = p.toFixed(1).replace('.', ',');
          ch.clear('curves'); ch.clear('marks');
          enz.forEach((x, i) => ch.fn(t => BIO.curves.ph(t, x[1], 1.2), { color: i === k ? x[2] : '#e2e8f0', width: i === k ? 3.2 : 1.6 }));
          const v = BIO.curves.ph(p, e[1], 1.2);
          ch.point(p, v, { color: C.navy });
          const d = p - e[1];
          let txt;
          if (Math.abs(d) < 0.6) txt = '<p><b>pH-Optimum:</b> Die ionisierbaren Gruppen im aktiven Zentrum tragen genau die Ladungen, die für die Substratbindung nötig sind.</p>';
          else if (Math.abs(d) < 2.6) txt = `<p><b>Ladungsänderung:</b> ${d < 0 ? 'Mehr H₃O⁺-Ionen: Gruppen nehmen H⁺ auf (z. B. –COO⁻ → –COOH, ungeladen).' : 'Weniger H₃O⁺-Ionen: Gruppen geben H⁺ ab (z. B. –NH₃⁺ → –NH₂, ungeladen).'} Ladungen im aktiven Zentrum ändern sich → Substrat wird schlechter gebunden → Aktivität sinkt.</p>`;
          else txt = '<p><b>Extremer pH-Wert → Denaturierung:</b> Wechselwirkungen der Sekundär- und Tertiärstruktur (v. a. Ionenbindungen, H-Brücken) werden zerstört (Buch S. 37, B5). Die Raumstruktur kann sich reversibel oder irreversibel verändern.</p>';
          ui.info(`${e[0]} bei pH ${p.toFixed(1).replace('.', ',')}`, `<p><span class="chip">Aktivität ${(v * 100).toFixed(0)} %</span></p>${txt}<p class="small muted">Angepasstheit an den Wirkort: Pepsin arbeitet im sauren Magen (pH ≈ 2); Speichel-Amylase (pH 7) wird im Magen bei pH 1–2 denaturiert.</p>`);
        };
        el.querySelector('#' + eid).addEventListener('change', upd);
        el.querySelector('#' + sid).addEventListener('input', upd);
        upd();
      }
      ui.onTab(k => k === 0 ? temp() : ph()); temp();
    }
  };

  /* ---- 14 Hemmung ---- */
  labs.inhibition = {
    title: 'Enzymhemmung', topic: 't10', icon: '⛔',
    desc: 'Kompetitive, nicht-kompetitive (allosterische) und irreversible Hemmung.',
    mount(el) {
      const ui = frame(el, { tabs: ['Kompetitiv', 'Nicht-kompetitiv / allosterisch', 'Irreversibel'] });
      let mode = 0, dead = 0;
      const ids = { i: uidp('i'), s: uidp('s') };
      const KM = 1.2, Ki = 0.8;
      ui.controls.innerHTML = `<div class="card flat mt">${slider(ids.i, 'Inhibitorkonz.', 0, 3, 0.1, 1)}${slider(ids.s, 'Substratkonz.', 0, 12, 0.1, 3)}
        <div class="row" data-r="irr"><button type="button" class="btn small bad" data-a="add">+ Inhibitor zugeben</button><button type="button" class="btn small" data-a="wash">Inhibitor entfernen (auswaschen)</button></div>
        <p class="small muted mb0">Modell unten: türkis = aktiv, grau = gehemmt, gelb = Substrat, rot = Inhibitor.</p><div data-r="icons"></div></div>`;
      const ch = BIO.chart.create({ x: [0, 12], y: [0, 1.25], xticks: [0, 2, 4, 6, 8, 10, 12], yticks: [0, 0.5, 1], xlabel: 'Substratkonzentration c(S)', ylabel: 'Reaktionsgeschwindigkeit v' });
      ui.stage.appendChild(ch.svg);
      const leg = document.createElement('div'); leg.className = 'legend mt';
      leg.innerHTML = `<span><i style="background:${C.navy}"></i>ohne Inhibitor</span><span><i style="background:${C.teal}"></i>mit Inhibitor</span>`;
      ui.stage.appendChild(leg);
      const g = id => el.querySelector('#' + id);
      const texts = [
        ['Kompetitive Hemmung', '<p>Der Inhibitor ist dem Substrat <b>strukturell ähnlich</b> und konkurriert mit ihm um das <b>aktive Zentrum</b>. Solange er gebunden ist, entsteht kein Enzym-Substrat-Komplex. Die Bindung ist <b>reversibel</b>.</p><ul><li><b>K<sub>M</sub> steigt</b>: mehr Substrat nötig, um ½ v<sub>max</sub> zu erreichen (scheinbar geringere Affinität).</li><li><b>v<sub>max</sub> bleibt gleich</b>: Bei sehr hoher Substratkonzentration verdrängt das Substrat den Inhibitor.</li></ul><p class="small muted">Beispiel: Allopurinol hemmt die Xanthinoxidase (Gicht); Sulfonamide.</p>'],
        ['Nicht-kompetitive / allosterische Hemmung', '<p>Der Inhibitor ist dem Substrat <b>nicht ähnlich</b> und bindet <b>außerhalb des aktiven Zentrums</b> (allosterisch: am allosterischen Zentrum). Dadurch ändert sich die <b>Raumstruktur</b> des Enzyms einschließlich des aktiven Zentrums – das Enzym ist inaktiv. Keine Konkurrenz mit dem Substrat. Reversibel.</p><ul><li><b>v<sub>max</sub> sinkt</b>: Gehemmte Enzyme fallen aus – auch viel Substrat hilft nicht.</li><li><b>K<sub>M</sub> bleibt gleich</b>: Die übrigen aktiven Enzyme haben unveränderte Affinität.</li></ul><p class="small muted">Beispiel: Tyrosinkinase-Hemmer bei Leukämie.</p>'],
        ['Irreversible Hemmung', '<p>Der Inhibitor bindet <b>dauerhaft</b> (meist im aktiven Zentrum) – das Enzym ist endgültig funktionslos. Auswaschen hilft nicht, mehr Substrat auch nicht.</p><ul><li><b>Penicillin</b>: bindet irreversibel am aktiven Zentrum eines bakteriellen Enzyms der Zellwandbildung.</li><li><b>Blei-/Quecksilber-Ionen</b>: binden an SH-Gruppen von Enzymen und lösen sich nicht wieder → Gefahr durch alte Bleirohre.</li></ul><p class="small muted">Probiere: Inhibitor zugeben, dann auswaschen.</p>']
      ];
      function upd() {
        const I = +g(ids.i).value, S = +g(ids.s).value;
        [ids.i, ids.s].forEach(id => { g(id).nextElementSibling.textContent = String(g(id).value).replace('.', ','); });
        el.querySelector('[data-r=irr]').classList.toggle('hidden', mode !== 2);
        g(ids.i).closest('.slider-row').classList.toggle('hidden', mode === 2);
        ch.clear('curves'); ch.clear('marks');
        ch.fn(x => BIO.curves.mm(x, 1, KM), { color: C.navy });
        let f, vmaxI, kmI, fS, fI;
        if (mode === 0) {
          f = x => BIO.curves.comp(x, 1, KM, I, Ki); vmaxI = 1; kmI = KM * (1 + I / Ki);
          const D = KM + S + KM * I / Ki; fS = S / D; fI = (KM * I / Ki) / D;
        } else if (mode === 1) {
          f = x => BIO.curves.noncomp(x, 1, KM, I, Ki); vmaxI = 1 / (1 + I / Ki); kmI = KM;
          fI = (I / Ki) / (1 + I / Ki); fS = (1 - fI) * S / (KM + S);
        } else {
          f = x => BIO.curves.mm(x, 1 - dead, KM); vmaxI = 1 - dead; kmI = KM;
          fI = dead; fS = (1 - dead) * S / (KM + S);
        }
        ch.fn(f, { color: C.teal, dash: '9 5' });
        ch.hline(1, { color: '#94a3b8' }); if (Math.abs(vmaxI - 1) > 0.01) ch.hline(vmaxI, { color: C.teal });
        ch.hline(0.5, { to: KM, color: '#94a3b8' }); ch.vline(KM, { to: 0.5, color: '#94a3b8' });
        ch.text(KM, 0, 'K<tspan font-size="10" dy="3">M</tspan>', { dy: -8, dx: 4 });
        if (mode === 0 && kmI - KM > 0.05 && kmI < 12) { ch.hline(0.5, { from: KM, to: kmI, color: C.teal }); ch.vline(kmI, { to: 0.5, color: C.teal }); ch.text(kmI, 0, 'K<tspan font-size="10" dy="3">M</tspan>′', { dy: -8, dx: 4, color: C.teal }); }
        if (mode !== 0 && vmaxI < 0.98) { ch.hline(vmaxI / 2, { to: KM, color: C.teal }); }
        ch.text(12, 1, 'v<tspan font-size="10" dy="3">max</tspan>', { dx: -4, dy: -6, anchor: 'end' });
        ch.point(S, f(S), { color: C.orange });
        el.querySelector('[data-r=icons]').innerHTML = enzymeIcons(20, fS, fI, ['comp', 'noncomp', 'irr'][mode]);
        ui.info(texts[mode][0], `${texts[mode][1]}<div class="grid grid-2 small" style="gap:8px"><div class="stat"><b>${vmaxI.toFixed(2).replace('.', ',')}</b><span>v<sub>max</sub> gehemmt (ohne: 1,00)</span></div><div class="stat"><b>${kmI.toFixed(2).replace('.', ',')}</b><span>K<sub>M</sub> gehemmt (ohne: ${String(KM).replace('.', ',')})</span></div></div>`);
      }
      el.addEventListener('input', e => { if (e.target.matches('input[type=range]')) upd(); });
      ui.controls.addEventListener('click', e => {
        const a = (e.target.closest('[data-a]') || {}).dataset; if (!a || !a.a) return;
        if (a.a === 'add') { dead = Math.min(0.95, dead + (1 - dead) * 0.3); upd(); }
        if (a.a === 'wash') { BIO.toast(dead > 0 ? 'Irreversibel: Die gehemmten Enzyme bleiben funktionslos.' : 'Noch kein Inhibitor zugegeben.'); }
      });
      ui.onTab(k => { mode = k; if (k === 2) dead = 0; upd(); });
      upd();
    }
  };

  /* ---------- Reihenfolge / Metadaten ---------- */
  const order = ['aminoacid', 'peptide', 'protein', 'phospholipid', 'membrane', 'transport', 'glucose', 'endocytosis', 'exocytosis', 'catalysis', 'inducedfit', 'michaelis', 'tempph', 'inhibition'];
  BIO.labs = labs;
  BIO.labOrder = order;

  // Platzhalter <div data-figure="id"> in Lernzetteln hydrieren
  BIO.mountFigures = function (root) {
    root.querySelectorAll('[data-figure]').forEach(ph => {
      const id = ph.dataset.figure, lab = labs[id];
      if (!lab) return;
      const fig = document.createElement('figure');
      fig.className = 'figure';
      fig.innerHTML = `<div class="fig-body" style="display:block"></div><figcaption>${esc(ph.dataset.caption || lab.title)} · <a href="#/labor/${id}">Im Labor öffnen</a></figcaption>`;
      ph.replaceWith(fig);
      try { lab.mount(fig.querySelector('.fig-body')); } catch (e) { console.error(e); }
    });
  };

  /* ---------- Routen ---------- */
  BIO.routes.labor = function (main, parts) {
    const id = parts[1];
    if (id && labs[id]) {
      const lab = labs[id], t = BIO.topicById[lab.topic];
      const idx = order.indexOf(id);
      const prev = order[idx - 1], next = order[idx + 1];
      main.innerHTML = `${BIO.backLink('#/labor', 'Alle Modelle')}
        <div class="page-head"><div class="row"><h1 class="mb0">${lab.icon} ${esc(lab.title)}</h1>${BIO.topicChip(lab.topic)}</div><p>${esc(lab.desc)}</p></div>
        <div data-r="lab"></div>
        <div class="row mt">${prev ? `<a class="btn small" href="#/labor/${prev}">← ${esc(labs[prev].title)}</a>` : ''}<span class="spacer"></span><a class="btn small ghost" href="#/lernzettel/${t.id}">Lernzettel Thema ${t.nr}</a>${next ? `<a class="btn small" href="#/labor/${next}">${esc(labs[next].title)} →</a>` : ''}</div>`;
      lab.mount(main.querySelector('[data-r=lab]'));
      return;
    }
    main.innerHTML = `<div class="page-head"><h1>Bio-Labor</h1><p>Interaktive Modelle zu allen Themen. Tippe Bestandteile an, gehe Abläufe Schritt für Schritt durch und verändere Bedingungen mit Schiebereglern.</p></div>
      <div class="grid grid-3">${order.map(k => { const l = labs[k], t = BIO.topicById[l.topic]; return `<a class="card hub-card" href="#/labor/${k}"><div class="hub-icon">${l.icon}</div><div><h3>${esc(l.title)}</h3><p>${esc(l.desc)}</p><p class="mt"><span class="chip navy">Thema ${t.nr}</span></p></div></a>`; }).join('')}</div>`;
  };
})();
