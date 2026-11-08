/* =========================================================================
   Diagramm-Trainer: Michaelis-Menten, Temperatur, pH, Enzymhemmung
   Aufgabentypen: Achsen beschriften, Kurve zeichnen, Punkte markieren,
   Kurven erkennen/vergleichen (MC), beschreiben & molekular erklären (Text)
   ========================================================================= */
(function () {
  const { esc, $, $$, shuffle, store, topicChip, backLink, goalText, toast } = BIO;
  const cv = BIO.curves;
  const C = { teal: '#0d9488', navy: '#0f2a4a', orange: '#d97706', rose: '#be185d', blue: '#2563eb', gray: '#94a3b8' };

  /* ---------- Modelle ---------- */
  const KM = 2, VMAX = 1, KI = 1;
  const mmF = S => cv.mm(S, VMAX, KM);
  const compF = S => cv.comp(S, VMAX, KM, 1.5, KI);    // KM' = 5
  const nonF = S => cv.noncomp(S, VMAX, KM, 1, KI);    // vmax' = 0,5
  const tempF = T => cv.tempNorm(T, 37, 2.2);
  const pepF = p => cv.ph(p, 2, 1), tryF = p => cv.ph(p, 8, 1.1), amyF = p => cv.ph(p, 7, 1.1);

  const blankY = n => Array(n).fill('');
  const CH = {
    mm: { x: [0, 20], y: [0, 1.15], xticks: [0, 5, 10, 15, 20], yticks: [0, 0.5, 1], ytickLabels: blankY(3), xtickLabels: blankY(5) },
    temp: { x: [0, 80], y: [0, 1.15], xticks: [0, 10, 20, 30, 40, 50, 60, 70, 80], yticks: [0, 0.5, 1], ytickLabels: blankY(3) },
    ph: { x: [0, 14], y: [0, 1.15], xticks: [0, 2, 4, 6, 8, 10, 12, 14], yticks: [0, 0.5, 1], ytickLabels: blankY(3) }
  };

  /* ---------- Aufgabensätze ---------- */
  const SETS = {
    mm: {
      topic: 't8', title: 'Michaelis-Menten-Diagramm', icon: '', chart: 'mm',
      desc: 'Reaktionsgeschwindigkeit v in Abhängigkeit von der Substratkonzentration c(S) (Buch S. 33, B3).',
      tasks: [
        { id: 'achsen', type: 'axes', goal: 't8g1', title: 'Achsen beschriften', q: 'Beschrifte die Achsen des Diagramms zur Abhängigkeit der Reaktionsgeschwindigkeit von der Substratkonzentration.', curves: [[mmF, C.teal]],
          x: 'Substratkonzentration c(S)', y: 'Reaktionsgeschwindigkeit v', distract: ['Temperatur in °C', 'Zeit t', 'Enzymkonzentration c(E)', 'pH-Wert', 'Aktivierungsenergie EA'] },
        { id: 'zeichnen', type: 'draw', goal: 't8g1', title: 'Kurve skizzieren', q: 'Skizziere den Verlauf der Reaktionsgeschwindigkeit bei steigender Substratkonzentration (konstante Enzymmenge). Zeichne mit Finger oder Maus in einem Zug von links nach rechts.', model: mmF, from: 0, to: 20,
          hint: 'Typisch: zuerst nahezu linearer, steiler Anstieg, dann Abflachung und Annäherung an vmax (Sättigungskurve, Hyperbel).' },
        { id: 'punkte', type: 'mark', goal: 't8g2', title: 'vmax, ½ vmax und KM markieren', q: 'Markiere im Diagramm vmax, ½ vmax und die Michaelis-Menten-Konstante KM. Wähle zuerst den Begriff, tippe dann ins Diagramm.', curves: [[mmF, C.teal]],
          targets: [{ key: 'vmax', label: 'vmax', kind: 'h', v: VMAX, tol: 0.09 }, { key: 'half', label: '½ vmax', kind: 'h', v: VMAX / 2, tol: 0.07 }, { key: 'km', label: 'KM', kind: 'x', v: KM, tol: 0.9 }],
          expl: 'vmax ist der Grenzwert, dem sich die Kurve nähert (wird praktisch nie ganz erreicht). KM ist die Substratkonzentration, bei der v = ½ vmax ist.' },
        { id: 'erkennen', type: 'mc', goal: 't8g2', title: 'Enzyme vergleichen', q: 'Zwei Enzyme A und B setzen dasselbe Substrat um. Welche Aussage ist richtig?',
          curves: [[S => cv.mm(S, 1, 1), C.teal, 'A'], [S => cv.mm(S, 1, 6), C.orange, 'B']],
          options: ['Enzym A hat die kleinere KM und damit die höhere Affinität zum Substrat.', 'Enzym B hat die höhere Affinität, weil seine Kurve flacher ansteigt.', 'Enzym A hat die größere Wechselzahl, weil vmax größer ist.', 'Beide Enzyme haben dieselbe KM, weil sie dasselbe vmax erreichen.'],
          expl: 'Beide erreichen dasselbe vmax. A erreicht ½ vmax schon bei geringerer Substratkonzentration → kleinere KM → höhere Affinität.' },
        { id: 'erklaeren', type: 'text', goal: 't8g2', title: 'Kurvenverlauf molekular erklären', points: 6,
          q: 'Beschreibe den Kurvenverlauf des Michaelis-Menten-Diagramms und erkläre ihn auf molekularer Ebene (Brownsche Molekularbewegung).', curves: [[mmF, C.teal]],
          solution: '<p><b>Beschreibung:</b> Bei niedriger Substratkonzentration steigt v nahezu proportional an. Mit zunehmender c(S) wird der Anstieg flacher; die Kurve nähert sich asymptotisch einem Grenzwert vmax.</p><p><b>Erklärung:</b> Enzym- und Substratmoleküle bewegen sich ungerichtet (Brownsche Molekularbewegung). Je mehr Substratmoleküle vorhanden sind, desto wahrscheinlicher treffen sie auf ein freies aktives Zentrum – es bilden sich pro Zeit mehr Enzym-Substrat-Komplexe. Bei hoher c(S) sind fast alle aktiven Zentren besetzt (Sättigung); weitere Substratmoleküle müssen „warten“. v hängt dann nur noch von der Enzymmenge und der Wechselzahl ab → vmax. KM = c(S) bei ½ vmax: kleine KM bedeutet hohe Affinität.</p>',
          checklist: ['Anfangs steiler, fast linearer Anstieg', 'Abflachen und Annäherung an vmax (Sättigung)', 'Brownsche Molekularbewegung / zufällige Zusammenstöße', 'Mehr Substrat → mehr Enzym-Substrat-Komplexe pro Zeit', 'Bei vmax sind (fast) alle aktiven Zentren besetzt', 'KM = c(S) bei ½ vmax, Maß für die Affinität'] }
      ]
    },
    temp: {
      topic: 't9', title: 'Temperatur-Diagramm', icon: '', chart: 'temp',
      desc: 'Enzymaktivität in Abhängigkeit von der Temperatur: RGT-Regel und Denaturierung (Buch S. 36, B2 und B3).',
      tasks: [
        { id: 'achsen', type: 'axes', goal: 't9g3', title: 'Achsen beschriften', q: 'Beschrifte die Achsen des Diagramms.', curves: [[tempF, C.teal]],
          x: 'Temperatur in °C', y: 'Enzymaktivität (Reaktionsgeschwindigkeit)', distract: ['pH-Wert', 'Substratkonzentration c(S)', 'Zeit t', 'Energie', 'Inhibitorkonzentration'] },
        { id: 'zeichnen', type: 'draw', goal: 't9g3', title: 'Kurve eines menschlichen Enzyms skizzieren', q: 'Skizziere die Aktivität eines menschlichen Enzyms zwischen 0 °C und 80 °C. Zeichne in einem Zug von links nach rechts.', model: tempF, from: 0, to: 80,
          hint: 'Langsamer, exponentiell wirkender Anstieg (RGT-Regel) bis zum Optimum bei etwa 37 °C, danach steiler Abfall durch Denaturierung – die Kurve ist asymmetrisch.' },
        { id: 'punkte', type: 'mark', goal: 't9g2', title: 'Temperaturoptimum markieren', q: 'Markiere das Temperaturoptimum und den Bereich, ab dem die Denaturierung überwiegt (steiler Abfall).', curves: [[tempF, C.teal]],
          targets: [{ key: 'opt', label: 'Temperaturoptimum', kind: 'x', v: 37, tol: 4 }, { key: 'den', label: 'Kurve fällt auf ½ (Denaturierung)', kind: 'x', v: 0, tol: 4, calc: () => halfAfter(tempF, 37, 80) }],
          expl: 'Das Optimum liegt beim Maximum der Kurve (≈ 37 °C). Rechts davon überwiegt die Denaturierung, die Aktivität fällt innerhalb weniger Grad steil ab.' },
        { id: 'vergleich', type: 'mc', goal: 't9g3', title: 'Isoenzyme vergleichen', q: 'Die Kurven zeigen die Aktivität eines Enzyms aus Eisfisch (A), Forelle (B) und Mensch (C). Welche Aussage ist richtig?',
          curves: [[T => cv.tempNorm(T, 3, 2.2), C.blue, 'A'], [T => cv.tempNorm(T, 15, 2.2), C.orange, 'B'], [tempF, C.teal, 'C']],
          options: ['Die Temperaturoptima sind an die Lebensbedingungen des jeweiligen Organismus angepasst.', 'Beim Eisfisch ist das Enzym bei 37 °C besonders aktiv.', 'Alle drei Enzyme denaturieren erst oberhalb von 60 °C.', 'Die Kurven unterscheiden sich, weil die Enzyme verschiedene Substrate umsetzen.'],
          expl: 'Isoenzyme katalysieren dieselbe Reaktion, ihre Optima passen zur Umgebungs- bzw. Körpertemperatur (Buch S. 36, B3).' },
        { id: 'erklaeren', type: 'text', goal: 't9g4', title: 'Temperaturkurve molekular erklären', points: 6, q: 'Beschreibe den Verlauf der Temperaturkurve und erkläre ihn auf molekularer Ebene.', curves: [[tempF, C.teal]],
          solution: '<p><b>Beschreibung:</b> Mit steigender Temperatur nimmt die Aktivität zunächst zu (pro +10 °C etwa Verdopplung bis Verdreifachung), erreicht beim Temperaturoptimum ein Maximum und fällt danach steil auf null ab.</p><p><b>Erklärung:</b> Anstieg: Die Teilchen bewegen sich schneller, Zusammenstöße von Enzym und Substrat werden häufiger und energiereicher, mehr Moleküle erreichen die Aktivierungsenergie (RGT-Regel). Abfall: Bei zu hohen Temperaturen werden schwache Wechselwirkungen (Wasserstoffbrücken, Ionenbindungen, hydrophobe Wechselwirkungen) der Sekundär- und Tertiärstruktur gelöst – das Enzym denaturiert, das aktive Zentrum verliert seine Passform. Im Optimum ist das Verhältnis aus schneller Bewegung und intakter Struktur am günstigsten.</p>',
          checklist: ['Anstieg bis zum Optimum, danach steiler Abfall', 'RGT-Regel: +10 °C → 2- bis 3-fache Geschwindigkeit', 'Mehr/heftigere Zusammenstöße (Molekularbewegung)', 'Denaturierung: Raumstruktur geht verloren', 'Schwache Bindungen (H-Brücken, Ionenbindungen) werden gelöst', 'Aktives Zentrum passt nicht mehr zum Substrat'] }
      ]
    },
    ph: {
      topic: 't9', title: 'pH-Diagramm', icon: '', chart: 'ph',
      desc: 'Enzymaktivität in Abhängigkeit vom pH-Wert: pH-Optimum und Angepasstheit an den Wirkort (Buch S. 37, B4).',
      tasks: [
        { id: 'achsen', type: 'axes', goal: 't9g3', title: 'Achsen beschriften', q: 'Beschrifte die Achsen des Diagramms.', curves: [[amyF, C.teal]],
          x: 'pH-Wert', y: 'Enzymaktivität (Reaktionsgeschwindigkeit)', distract: ['Temperatur in °C', 'Substratkonzentration c(S)', 'Zeit t', 'Protonenzahl', 'Energie'] },
        { id: 'zeichnen', type: 'draw', goal: 't9g3', title: 'pH-Kurve der Speichel-Amylase', q: 'Skizziere die Aktivität der Speichel-Amylase (pH-Optimum ≈ 7) zwischen pH 2 und pH 12.', model: amyF, from: 2, to: 12,
          hint: 'Glockenförmige (annähernd symmetrische) Kurve mit Maximum beim pH-Optimum; zu beiden Seiten fällt die Aktivität ab.' },
        { id: 'punkte', type: 'mark', goal: 't9g2', title: 'pH-Optima markieren', q: 'Markiere die pH-Optima von Pepsin (Magen) und Trypsin (Dünndarm).', curves: [[pepF, C.rose, 'Pepsin'], [tryF, C.blue, 'Trypsin']],
          targets: [{ key: 'pep', label: 'Optimum Pepsin', kind: 'x', v: 2, tol: 0.7 }, { key: 'try', label: 'Optimum Trypsin', kind: 'x', v: 8, tol: 0.7 }],
          expl: 'Pepsin arbeitet im sauren Magensaft (pH ≈ 2), Trypsin im leicht basischen Dünndarm (pH ≈ 8).' },
        { id: 'vergleich', type: 'mc', goal: 't9g1', title: 'Speichel-Amylase im Magen', q: 'Speichel-Amylase gelangt mit dem Speisebrei in den Magen (pH 1–2). Was passiert?',
          curves: [[amyF, C.teal, 'Amylase'], [pepF, C.rose, 'Pepsin']],
          options: ['Sie verliert ihre Aktivität, weil ihre Raumstruktur durch den niedrigen pH-Wert verändert wird.', 'Sie wird aktiver, weil mehr H⁺-Ionen die Reaktion beschleunigen.', 'Sie arbeitet unverändert weiter, da Enzyme nicht verbraucht werden.', 'Sie wird zu Pepsin umgebaut.'],
          expl: 'Bei pH 1–2 werden Ladungen ionisierbarer Seitenketten verändert, Ionenbindungen und H-Brücken gelöst → Denaturierung, das aktive Zentrum passt nicht mehr.' },
        { id: 'erklaeren', type: 'text', goal: 't9g4', title: 'pH-Abhängigkeit molekular erklären', points: 5, q: 'Erkläre auf molekularer Ebene, weshalb Enzyme ein pH-Optimum haben.', curves: [[pepF, C.rose, 'Pepsin'], [tryF, C.blue, 'Trypsin']],
          solution: '<p>Viele Aminosäure-Seitenketten tragen ionisierbare Gruppen (z. B. –COOH/–COO⁻, –NH₂/–NH₃⁺). Der pH-Wert bestimmt, ob sie geladen sind. Beim pH-Optimum tragen die Gruppen im und am aktiven Zentrum genau die Ladungen, die für Substratbindung und Katalyse nötig sind, und die Raumstruktur ist stabil. Weicht der pH-Wert ab, ändern sich die Ladungen: Ionenbindungen und Wasserstoffbrücken der Tertiärstruktur werden gestört, das Substrat bindet schlechter, bei extremen Werten denaturiert das Enzym. Das pH-Optimum ist an den Wirkort angepasst (Pepsin pH 2 im Magen, Trypsin pH 8 im Dünndarm).</p>',
          checklist: ['Ionisierbare Seitenketten / Ladungen hängen vom pH ab', 'Im Optimum passende Ladungen im aktiven Zentrum', 'Abweichung stört Ionenbindungen und H-Brücken', 'Raumstruktur/aktives Zentrum verändert → Denaturierung', 'Angepasstheit an den Wirkort mit Beispiel'] }
      ]
    },
    hemmung: {
      topic: 't10', title: 'Enzymhemmung im Diagramm', icon: '', chart: 'mm',
      desc: 'v–c(S)-Diagramme mit und ohne Inhibitor: kompetitive und nicht-kompetitive Hemmung (Buch S. 40, B1 und S. 41, B4).',
      tasks: [
        { id: 'erkennen', type: 'mc', goal: 't10g4', title: 'Hemmtyp erkennen', q: 'Kurve A zeigt die Reaktion ohne Inhibitor. Welche Zuordnung ist richtig?',
          curves: [[mmF, C.teal, 'A'], [compF, C.orange, 'B'], [nonF, C.rose, 'C']],
          options: ['B: kompetitive Hemmung, C: nicht-kompetitive Hemmung', 'B: nicht-kompetitive Hemmung, C: kompetitive Hemmung', 'B und C: kompetitive Hemmung mit unterschiedlicher Inhibitorkonzentration', 'B: irreversible Hemmung, C: Substrathemmung'],
          expl: 'B erreicht bei hoher c(S) dasselbe vmax, braucht aber mehr Substrat (KM erhöht) → kompetitiv. C erreicht nur ein niedrigeres vmax bei gleicher KM → nicht-kompetitiv.' },
        { id: 'zeichnen-k', type: 'draw', goal: 't10g4', title: 'Kurve mit kompetitivem Inhibitor', q: 'Die gestrichelte Kurve zeigt die Reaktion ohne Inhibitor. Zeichne die Kurve mit kompetitivem Inhibitor ein.', model: compF, ref: mmF, from: 0, to: 20,
          hint: 'Flacherer Anstieg, aber bei sehr hoher Substratkonzentration Annäherung an dasselbe vmax – das Substrat verdrängt den Inhibitor.' },
        { id: 'zeichnen-n', type: 'draw', goal: 't10g4', title: 'Kurve mit nicht-kompetitivem Inhibitor', q: 'Die gestrichelte Kurve zeigt die Reaktion ohne Inhibitor. Zeichne die Kurve mit nicht-kompetitivem Inhibitor ein (Inhibitor besetzt die Hälfte der Enzyme).', model: nonF, ref: mmF, from: 0, to: 20,
          hint: 'Die Kurve verläuft unterhalb und erreicht nur ein erniedrigtes vmax (hier etwa die Hälfte); KM bleibt gleich.' },
        { id: 'punkte', type: 'mark', goal: 't10g5', title: 'vmax und KM mit Inhibitor', q: 'Markiere das vmax mit nicht-kompetitivem Inhibitor (Kurve C) und die scheinbare KM mit kompetitivem Inhibitor (Kurve B).',
          curves: [[mmF, C.teal, 'A'], [compF, C.orange, 'B'], [nonF, C.rose, 'C']],
          targets: [{ key: 'vmaxn', label: 'vmax von C', kind: 'h', v: 0.5, tol: 0.07 }, { key: 'kmc', label: 'KM von B', kind: 'x', v: KM * (1 + 1.5 / KI), tol: 1.3 }],
          expl: 'Nicht-kompetitiv: vmax sinkt (hier auf ½), da ein Teil der Enzyme ausfällt. Kompetitiv: Die scheinbare KM steigt (hier von 2 auf 5), da mehr Substrat nötig ist, um ½ vmax zu erreichen.' },
        { id: 'vergleich', type: 'text', goal: 't10g5', title: 'Hemmtypen vergleichen', points: 6, q: 'Vergleiche die kompetitive und die nicht-kompetitive Hemmung hinsichtlich Wirkungsweise, vmax und KM. Begründe die Kurvenverläufe.',
          curves: [[mmF, C.teal, 'ohne'], [compF, C.orange, 'kompetitiv'], [nonF, C.rose, 'nicht-kompetitiv']],
          solution: '<p><b>Kompetitiv:</b> Der Inhibitor ist dem Substrat strukturähnlich und konkurriert um das aktive Zentrum. Er wird reversibel gebunden, aber nicht umgesetzt. Bei hoher c(S) verdrängt das Substrat den Inhibitor → vmax bleibt gleich, die scheinbare KM steigt.</p><p><b>Nicht-kompetitiv/allosterisch:</b> Der Inhibitor bindet an eine andere Stelle (allosterisches Zentrum) und verändert die Raumstruktur des aktiven Zentrums. Er ist dem Substrat nicht ähnlich; mehr Substrat hebt die Hemmung nicht auf. Die gehemmten Enzyme fallen aus → vmax sinkt, KM bleibt gleich (die übrigen Enzyme arbeiten normal).</p>',
          checklist: ['Kompetitiv: Strukturähnlichkeit, Konkurrenz um aktives Zentrum', 'Kompetitiv: durch viel Substrat aufhebbar → vmax gleich', 'Kompetitiv: KM (scheinbar) erhöht', 'Nicht-kompetitiv: Bindung an allosterisches Zentrum, Formänderung', 'Nicht-kompetitiv: vmax erniedrigt', 'Nicht-kompetitiv: KM unverändert, Substrat hebt Hemmung nicht auf'] }
      ]
    }
  };
  function halfAfter(f, from, to) { for (let x = from; x <= to; x += 0.1) if (f(x) <= 0.5) return x; return to; }

  BIO.diagramSets = SETS;
  BIO.diagramTaskList = function () {
    const out = [];
    Object.keys(SETS).forEach(sid => SETS[sid].tasks.forEach(t => out.push({ key: sid + '-' + t.id, set: sid, topic: SETS[sid].topic, goal: t.goal, title: t.title, type: t.type, task: t })));
    return out;
  };

  /* ---------- Diagramm aufbauen ---------- */
  function makeChart(set, task, opts) {
    opts = opts || {};
    const base = CH[set.chart];
    const ch = BIO.chart.create(Object.assign({}, base, { xlabel: opts.noLabels ? '?' : axisLabel(set, 'x'), ylabel: opts.noLabels ? '?' : axisLabel(set, 'y') }));
    if (task.ref) ch.fn(task.ref, { color: C.gray, dash: '7 6', width: 2.5, layer: 'ref' });
    (task.curves || []).forEach(c => {
      ch.fn(c[0], { color: c[1] });
      if (c[2]) { const xs = labelX(set, c[0]); ch.text(xs, Math.min(1.08, c[0](xs)), c[2], { color: c[1], dy: -9, anchor: 'middle', layer: 'top' }); }
    });
    return ch;
  }
  function labelX(set, f) {
    const r = CH[set.chart].x;
    if (set.chart === 'mm') return r[0] + 0.85 * (r[1] - r[0]);
    let best = r[0], m = -1; for (let x = r[0]; x <= r[1]; x += (r[1] - r[0]) / 200) { const v = f(x); if (v > m) { m = v; best = x; } } return best;
  }
  function axisLabel(set, ax) {
    const a = set.tasks.find(t => t.type === 'axes');
    if (a) return a[ax];
    return ax === 'x' ? 'Substratkonzentration c(S)' : 'Reaktionsgeschwindigkeit v';
  }

  /* ---------- Aufgaben-Renderer: liefern {evaluate(), reveal()} ---------- */
  const R = {};
  R.axes = function (el, set, task) {
    const opts = shuffle([task.x, task.y].concat(task.distract));
    const ch = makeChart(set, task, { noLabels: true });
    el.innerHTML = `<div class="lab-stage" data-r="c"></div><div class="grid grid-2 mt">
      <label class="small"><b>x-Achse</b><select data-ax="x" style="width:100%;margin-top:4px"><option value="">– wählen –</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select></label>
      <label class="small"><b>y-Achse</b><select data-ax="y" style="width:100%;margin-top:4px"><option value="">– wählen –</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select></label></div>`;
    $('[data-r=c]', el).appendChild(ch.svg);
    $$('select', el).forEach(s => s.addEventListener('change', () => ch.setLabels($('[data-ax=x]', el).value || '?', $('[data-ax=y]', el).value || '?')));
    return {
      evaluate() {
        let s = 0; const d = [];
        ['x', 'y'].forEach(ax => { const sel = $(`[data-ax=${ax}]`, el), ok = sel.value === task[ax]; if (ok) s++; d.push(`${ax}-Achse: ${ok ? '✓' : `✗ richtig: <b>${esc(task[ax])}</b>`}`); });
        return { score: s, max: 2, detail: d.join('<br>') };
      },
      reveal() { $$('select', el).forEach(sel => { const ok = sel.value === task[sel.dataset.ax]; sel.classList.toggle('ok', ok); sel.classList.toggle('bad', !ok); }); ch.setLabels(task.x, task.y); }
    };
  };

  R.draw = function (el, set, task) {
    const ch = makeChart(set, task);
    ch.svg.classList.add('draw-area');
    el.innerHTML = `<div class="lab-stage" data-r="c"></div><div class="row mt"><button type="button" class="btn small ghost" data-a="clear">Zeichnung löschen</button><span class="small muted" data-r="st">Noch nichts gezeichnet.</span></div>`;
    $('[data-r=c]', el).appendChild(ch.svg);
    let pts = [], drawing = false;
    const xr = CH[set.chart].x, yr = CH[set.chart].y;
    function redraw() { ch.clear('user'); if (pts.length > 1) ch.pathPts(pts, { layer: 'user', color: C.navy }); $('[data-r=st]', el).textContent = pts.length > 1 ? 'Kurve gezeichnet – du kannst neu zeichnen.' : 'Noch nichts gezeichnet.'; }
    function add(ev) {
      const p = ch.svgPoint(ev);
      const x = BIO.clamp(ch.invX(p.x), xr[0], xr[1]), y = BIO.clamp(ch.invY(p.y), yr[0], yr[1]);
      pts.push([x, y]); redraw();
    }
    ch.svg.addEventListener('pointerdown', ev => { ev.preventDefault(); drawing = true; pts = []; try { ch.svg.setPointerCapture(ev.pointerId); } catch (e) { } add(ev); });
    ch.svg.addEventListener('pointermove', ev => { if (drawing) { ev.preventDefault(); add(ev); } });
    const end = () => { drawing = false; };
    ch.svg.addEventListener('pointerup', end); ch.svg.addEventListener('pointercancel', end); ch.svg.addEventListener('lostpointercapture', end);
    $('[data-a=clear]', el).addEventListener('click', () => { pts = []; redraw(); });
    return {
      evaluate() {
        const from = task.from, to = task.to;
        if (pts.length < 4) return { score: 0, max: 3, detail: 'Es wurde keine Kurve gezeichnet.' };
        const sorted = pts.slice().sort((a, b) => a[0] - b[0]);
        const minX = sorted[0][0], maxX = sorted[sorted.length - 1][0];
        const cover = (Math.min(maxX, to) - Math.max(minX, from)) / (to - from);
        const interp = x => { for (let i = 1; i < sorted.length; i++) if (sorted[i][0] >= x) { const a = sorted[i - 1], b = sorted[i]; const t = b[0] === a[0] ? 0 : (x - a[0]) / (b[0] - a[0]); return a[1] + t * (b[1] - a[1]); } return sorted[sorted.length - 1][1]; };
        let se = 0, n = 0;
        for (let i = 0; i <= 60; i++) { const x = from + (to - from) * i / 60; if (x < minX || x > maxX) continue; const d = interp(x) - task.model(x); se += d * d; n++; }
        const rms = n ? Math.sqrt(se / n) : 1;
        let score = rms < 0.09 ? 3 : rms < 0.15 ? 2 : rms < 0.24 ? 1 : 0;
        let msg = `Abweichung zur Modellkurve: ${(rms * 100).toFixed(0)} % der Achsenhöhe.`;
        if (cover < 0.6) { score = Math.min(score, 1); msg += ' Die Kurve deckt nicht den ganzen Bereich ab.'; }
        const verdict = ['Der Verlauf passt noch nicht.', 'Grundform teilweise erkennbar.', 'Gut – der Verlauf stimmt im Wesentlichen.', 'Verlauf getroffen.'][score];
        return { score, max: 3, detail: `${verdict} ${msg}<br><span class="small">${esc(task.hint)}</span>` };
      },
      reveal() { ch.fn(task.model, { color: C.teal, width: 3, dash: '2 0', layer: 'top', opacity: 0.85 }); ch.textPx(ch.opts.w - ch.opts.pad.r - 4, ch.opts.pad.t + 12, 'türkis = Modellkurve', { anchor: 'end', size: 12, color: C.teal, layer: 'top' }); }
    };
  };

  R.mark = function (el, set, task) {
    const ch = makeChart(set, task);
    ch.svg.classList.add('draw-area');
    const targets = task.targets.map(t => Object.assign({}, t, { v: t.calc ? t.calc() : t.v }));
    const marks = {};
    let active = targets[0].key;
    el.innerHTML = `<div class="label-bank" data-r="bank"></div><div class="lab-stage" data-r="c"></div><p class="small muted mt mb0">Ein erneuter Tipp verschiebt die Markierung des gewählten Begriffs.</p>`;
    $('[data-r=c]', el).appendChild(ch.svg);
    const xr = CH[set.chart].x, yr = CH[set.chart].y;
    function draw() {
      $('[data-r=bank]', el).innerHTML = targets.map(t => `<button type="button" class="label-chip ${active === t.key ? 'sel' : ''} ${marks[t.key] ? 'used' : ''}" data-k="${t.key}">${esc(t.label)}${marks[t.key] ? ' ✓' : ''}</button>`).join('');
      ch.clear('user');
      targets.forEach(t => {
        const m = marks[t.key]; if (!m) return;
        if (t.kind === 'h') { ch.hline(m[1], { layer: 'user', color: C.navy, dash: '5 4' }); ch.text(xr[0], m[1], esc(t.label), { layer: 'user', dx: 6, dy: -6, size: 12 }); }
        else { ch.vline(m[0], { layer: 'user', color: C.navy, dash: '5 4' }); ch.text(m[0], yr[0], esc(t.label), { layer: 'user', dx: 4, dy: -8, size: 12 }); }
      });
    }
    el.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) { active = b.dataset.k; draw(); } });
    ch.svg.addEventListener('pointerdown', ev => {
      const p = ch.svgPoint(ev); if (!ch.inPlot(p)) return;
      marks[active] = [BIO.clamp(ch.invX(p.x), xr[0], xr[1]), BIO.clamp(ch.invY(p.y), yr[0], yr[1])];
      const nxt = targets.find(t => !marks[t.key]); if (nxt) active = nxt.key;
      draw();
    });
    draw();
    return {
      evaluate() {
        let s = 0; const d = [];
        targets.forEach(t => {
          const m = marks[t.key]; const val = m ? (t.kind === 'h' ? m[1] : m[0]) : null;
          const ok = val != null && Math.abs(val - t.v) <= t.tol; if (ok) s++;
          d.push(`${esc(t.label)}: ${val == null ? '✗ nicht markiert' : ok ? '✓' : '✗ zu ungenau'}`);
        });
        return { score: s, max: targets.length, detail: d.join('<br>') + `<br><span class="small">${esc(task.expl)}</span>` };
      },
      reveal() {
        targets.forEach(t => {
          if (t.kind === 'h') { ch.hline(t.v, { layer: 'top', color: C.teal, dash: '3 3', width: 2 }); ch.text(xr[1], t.v, esc(t.label), { layer: 'top', anchor: 'end', dy: -5, size: 12, color: C.teal }); }
          else { ch.vline(t.v, { layer: 'top', color: C.teal, dash: '3 3', width: 2, to: yr[1] * 0.95 }); ch.text(t.v, yr[1] * 0.95, esc(t.label), { layer: 'top', anchor: 'middle', dy: -4, size: 12, color: C.teal }); }
        });
      }
    };
  };

  R.mc = function (el, set, task) {
    const ch = makeChart(set, task);
    const order = shuffle(task.options.map((o, i) => i));
    const name = 'mc-' + Math.random().toString(36).slice(2, 8);
    el.innerHTML = `<div class="lab-stage" data-r="c"></div><div class="options mt">${order.map((k, j) => `<label class="option"><input type="radio" name="${name}" value="${k}" class="hidden"><span class="key">${'ABCD'[j]}</span><span>${esc(task.options[k])}</span></label>`).join('')}</div>`;
    $('[data-r=c]', el).appendChild(ch.svg);
    $$('input', el).forEach(r => r.addEventListener('change', () => $$('.option', el).forEach(o => o.classList.toggle('picked', o.contains(r) && r.checked))));
    return {
      evaluate() { const r = $('input:checked', el); const ok = r && +r.value === 0; return { score: ok ? 1 : 0, max: 1, detail: (ok ? '✓ Richtig. ' : `✗ Richtig ist: <b>${esc(task.options[0])}</b> `) + esc(task.expl) }; },
      reveal() { $$('.option', el).forEach(o => { const v = +$('input', o).value; if (v === 0) o.classList.add('correct'); else if ($('input', o).checked) o.classList.add('wrong'); $('input', o).disabled = true; }); }
    };
  };

  R.text = function (el, set, task, key) {
    const saved = (store.state.open['diag:' + key] || {});
    const ch = task.curves ? makeChart(set, task) : null;
    el.innerHTML = `${ch ? '<div class="lab-stage" data-r="c"></div>' : ''}<textarea class="answer mt" placeholder="Deine Antwort …" aria-label="Deine Antwort">${esc(saved.text || '')}</textarea>
      <div data-r="sol" class="hidden"><div class="solution"><b>Musterlösung</b>${task.solution}</div><h3>Checkliste – was hast du erwähnt?</h3><ul class="check-list">${task.checklist.map((c, i) => `<li><input type="checkbox" id="${key}-c${i}"><label for="${key}-c${i}">${esc(c)}</label></li>`).join('')}</ul></div>`;
    if (ch) $('[data-r=c]', el).appendChild(ch.svg);
    const ta = $('textarea', el);
    ta.addEventListener('input', () => store.saveOpen('diag:' + key, { text: ta.value }));
    return {
      selfAssessed: true,
      evaluate() { const n = $$('.check-list input:checked', el).length; const pts = Math.round(task.points * n / task.checklist.length * 2) / 2; return { score: pts, max: task.points, detail: `Selbstbewertung: ${n} von ${task.checklist.length} Punkten der Checkliste erfüllt.` }; },
      reveal() { $('[data-r=sol]', el).classList.remove('hidden'); },
      answer() { return ta.value; }
    };
  };

  BIO.diagRender = function (el, setId, task, key) { return R[task.type](el, SETS[setId], task, key || (setId + '-' + task.id)); };

  /* ---------- Übungsseite ---------- */
  const TYPE_LABEL = { axes: 'Achsen beschriften', draw: 'Kurve zeichnen', mark: 'Punkte markieren', mc: 'Erkennen & vergleichen', text: 'Beschreiben & erklären' };
  function scoreChip(key) {
    const e = store.state.ex['diag:' + key];
    if (!e || !e.max) return '<span class="chip gray">offen</span>';
    const p = Math.round(100 * e.best / e.max);
    return `<span class="chip ${p >= 70 ? 'ok' : 'warn'}">${p} %</span>`;
  }
  function setPage(main, sid, tIdx) {
    const set = SETS[sid];
    const i = BIO.clamp(tIdx || 0, 0, set.tasks.length - 1);
    const task = set.tasks[i], key = sid + '-' + task.id;
    main.innerHTML = `${backLink('#/diagramme', 'Diagramm-Trainer')}
      <div class="page-head"><div class="row"><h1 class="mb0">${esc(set.title)}</h1>${topicChip(set.topic)}</div><p>${esc(set.desc)}</p></div>
      <div class="tabs" role="tablist">${set.tasks.map((t, k) => `<button type="button" class="${k === i ? 'on' : ''}" data-t="${k}">${k + 1}. ${esc(t.title)}</button>`).join('')}</div>
      <div class="card"><div class="ex-head"><div class="row"><span class="chip navy">${TYPE_LABEL[task.type]}</span>${scoreChip(key)}</div><span class="small muted">Aufgabe ${i + 1} von ${set.tasks.length}</span></div>
        <div class="q-text">${esc(task.q)}</div><p class="small muted"><b>Lernziel:</b> ${esc(goalText(task.goal))}</p>
        <div data-r="task"></div>
        <div class="row mt"><button type="button" class="btn primary" data-a="check">${task.type === 'text' ? 'Musterlösung & Selbstbewertung' : 'Prüfen'}</button><button type="button" class="btn ghost" data-a="again">Neu starten</button><span class="spacer"></span>${i + 1 < set.tasks.length ? `<button type="button" class="btn" data-t="${i + 1}">Nächste Aufgabe →</button>` : '<a class="btn" href="#/diagramme">Andere Diagramme</a>'}</div>
        <div data-r="fb"></div></div>`;
    const api = BIO.diagRender($('[data-r=task]', main), sid, task, key);
    $$('[data-t]', main).forEach(b => b.addEventListener('click', () => { history.replaceState(null, '', `#/diagramme/${sid}?t=${b.dataset.t}`); setPage(main, sid, +b.dataset.t); window.scrollTo(0, 0); }));
    $('[data-a=again]', main).addEventListener('click', () => setPage(main, sid, i));
    const fb = $('[data-r=fb]', main);
    $('[data-a=check]', main).addEventListener('click', e => {
      if (api.selfAssessed && e.target.dataset.stage !== 'save') {
        api.reveal();
        e.target.textContent = 'Bewertung speichern'; e.target.dataset.stage = 'save';
        fb.innerHTML = '<div class="feedback neutral"><b class="t">Vergleiche mit der Musterlösung</b>Hake ab, was du erwähnt hast, und speichere dann deine Bewertung.</div>';
        return;
      }
      const r = api.evaluate();
      if (!api.selfAssessed) api.reveal();
      store.recordError('diag', key, set.topic, r.score / r.max >= 0.7, task.goal);
      store.recordEx('diag:' + key, r.score, r.max);
      document.dispatchEvent(new CustomEvent('bio:progress'));
      fb.innerHTML = `<div class="feedback ${r.score / r.max >= 0.7 ? 'ok' : 'bad'}"><b class="t">${String(r.score).replace('.', ',')} von ${r.max} Punkten</b>${r.detail}</div>`;
      if (api.selfAssessed) toast('Bewertung gespeichert');
    });
  }
  function hub(main) {
    main.innerHTML = `<div class="page-head"><h1>Diagramm-Trainer</h1><p>Übe die vier klausurrelevanten Diagrammtypen: Achsen beschriften, Kurven zeichnen, Punkte markieren, Kurven erkennen und vergleichen sowie Verläufe beschreiben und molekular erklären. Zeichnen funktioniert mit Finger, Stift oder Maus.</p></div>
      <div class="grid grid-2">${Object.keys(SETS).map(sid => { const s = SETS[sid]; return `<a class="card hub-card" href="#/diagramme/${sid}"><div><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p><p class="row mt">${topicChip(s.topic)}${s.tasks.map(t => scoreChip(sid + '-' + t.id)).join('')}</p></div></a>`; }).join('')}</div>
      <div class="box note"><div class="box-title">Vorgehen bei Diagrammaufgaben</div><p>Diagramme immer in drei Schritten bearbeiten: <b>1. Beschreiben</b> (was zeigt die Kurve? Anstieg, Maximum, Abfall, Grenzwert), <b>2. Erklären</b> (molekulare Ursache: Molekularbewegung, aktives Zentrum, Denaturierung, Hemmung), <b>3. Vergleichen/Bewerten</b> (Unterschiede zwischen Kurven mit Fachbegriffen benennen).</p></div>`;
  }
  BIO.routes.diagramme = function (main, parts, q) {
    const sid = parts[1];
    if (sid && SETS[sid]) return setPage(main, sid, q.t ? +q.t : 0);
    hub(main);
  };
})();
