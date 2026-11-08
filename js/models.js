/* =========================================================================
   SVG-Modelle (eigene Zeichnungen) – genutzt im Labor, in den Lernzetteln
   und in den Beschriftungsaufgaben. Jede Figur: viewBox, render(opts), slots.
   opts.bare = true blendet Beschriftungen aus, die abgefragt werden.
   ========================================================================= */
(function () {
  const C = {
    navy: '#0f2a4a', navy2: '#1d3b62', navy3: '#2c4f7c', teal: '#0d9488', teal2: '#14b8a6', tealL: '#ccfbf1',
    prot: '#99e6d8', protS: '#0d9488', peri: '#ddd6fe', periS: '#7c3aed', head: '#2c4f7c', tail: '#94a3b8',
    carb: '#f59e0b', chol: '#eab308', cyto: '#64748b', muted: '#5d6d82', red: '#dc2626', orange: '#ea580c', blue: '#2563eb', green: '#16a34a'
  };
  const hex = (cx, cy, r) => {
    let s = '';
    for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; s += (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1) + ' '; }
    return s.trim();
  };
  const T = (x, y, txt, a) => {
    a = a || {};
    return `<text x="${x}" y="${y}" font-size="${a.size || 15}" fill="${a.fill || C.navy}" text-anchor="${a.anchor || 'middle'}" font-weight="${a.weight || 600}"${a.cls ? ` class="${a.cls}"` : ''}${a.style ? ` style="${a.style}"` : ''}>${txt}</text>`;
  };
  // Phospholipid-Symbol: Kopf bei (x,y), dir=1 Schwänze nach unten, -1 nach oben; len = Schwanzlänge
  function pl(x, y, dir, len, cls) {
    len = len || 34; dir = dir || 1;
    const t0 = y + dir * 8, t1 = y + dir * (8 + len);
    return `<g${cls ? ` class="${cls}"` : ''}><path d="M${x - 3.5},${t0} L${x - 3.5},${t1}" stroke="${C.tail}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M${x + 3.5},${t0} L${x + 3.5},${y + dir * (8 + len * 0.45)} L${x + 6},${y + dir * (8 + len * 0.6)} L${x + 6},${t1}" fill="none" stroke="${C.tail}" stroke-width="2.2" stroke-linecap="round"/>` +
      `<circle cx="${x}" cy="${y}" r="8" fill="${C.head}"/></g>`;
  }
  // Phospholipid in beliebiger Richtung (für Micelle): Winkel in Grad (0 = Schwänze nach unten)
  function plRot(x, y, deg, len) { return `<g transform="translate(${x},${y}) rotate(${deg})">${pl(0, 0, 1, len || 30)}</g>`; }
  const hlRect = (x, y, w, h, r) => `<rect class="hl" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r == null ? 10 : r}" fill="#ccfbf1" stroke="${C.teal}" stroke-width="1.5"/>`;
  const arrowDefs = (id, color) => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${color || C.navy}"/></marker>`;
  let uid = 0;
  const nextId = (p) => (p || 'm') + (++uid);

  /* ---------------- Enzymform (für Katalyse/Induced Fit/Hemmung) ---------------- */
  // mouth: halbe Öffnungsbreite oben, depth: Tiefe der Tasche, w: halbe Breite des Enzyms
  function enzymePath(cx, cy, mouth, depth, w, h) {
    w = w || 70; h = h || 48; mouth = mouth || 26; depth = depth || 30;
    const top = cy - h * 0.55;
    const bot = top + depth;
    return `M${cx - w},${cy} C${cx - w},${top - 6} ${cx - mouth - 22},${top} ${cx - mouth},${top} ` +
      `C${cx - mouth + 2},${bot - 6} ${cx - mouth + 6},${bot} ${cx},${bot} ` +
      `C${cx + mouth - 6},${bot} ${cx + mouth - 2},${bot - 6} ${cx + mouth},${top} ` +
      `C${cx + mouth + 22},${top} ${cx + w},${top - 6} ${cx + w},${cy} ` +
      `C${cx + w},${cy + h} ${cx - w},${cy + h} ${cx - w},${cy} Z`;
  }
  function lactose(cx, cy, r, sep) {
    r = r || 12; sep = sep || 0;
    return `<g><polygon points="${hex(cx - r - sep, cy, r)}" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/>` +
      `<polygon points="${hex(cx + r + sep, cy, r)}" fill="#bfdbfe" stroke="${C.blue}" stroke-width="2"/>` +
      (sep < 1 ? `<circle cx="${cx}" cy="${cy}" r="2.6" fill="${C.navy}"/>` : '') + `</g>`;
  }

  /* =========================== Figuren =========================== */
  const F = {};

  /* ---- α-Aminosäure ---- */
  F.aminoacid = {
    title: 'Grundstruktur einer α-Aminosäure', viewBox: '0 0 520 290',
    render(o) {
      o = o || {};
      return `
<g data-part="amino">${hlRect(92, 122, 104, 54)}${T(150, 158, 'H₂N', { size: 26 })}</g>
<g data-part="hydrogen">${hlRect(238, 48, 44, 48)}${T(260, 82, 'H', { size: 26 })}</g>
<g data-part="rest">${hlRect(230, 206, 60, 52)}${T(260, 242, 'R', { size: 26, fill: C.teal })}</g>
<g data-part="carboxyl">${hlRect(326, 62, 128, 166)}${T(352, 158, 'C', { size: 26 })}${T(410, 96, 'O', { size: 26 })}${T(420, 214, 'OH', { size: 26 })}
  <line x1="364" y1="134" x2="396" y2="102" stroke="${C.navy}" stroke-width="2.4"/><line x1="371" y1="140" x2="403" y2="108" stroke="${C.navy}" stroke-width="2.4"/>
  <line x1="366" y1="162" x2="398" y2="194" stroke="${C.navy}" stroke-width="2.4"/></g>
<g data-part="alpha"><circle class="hl" cx="262" cy="149" r="24" fill="#ccfbf1" stroke="${C.teal}" stroke-width="1.5"/>${T(258, 158, 'C', { size: 26 })}${o.bare ? '' : T(276, 166, 'α', { size: 14, fill: C.teal })}</g>
<line x1="194" y1="149" x2="240" y2="149" stroke="${C.navy}" stroke-width="2.4"/>
<line x1="282" y1="149" x2="336" y2="149" stroke="${C.navy}" stroke-width="2.4"/>
<line x1="260" y1="96" x2="260" y2="128" stroke="${C.navy}" stroke-width="2.4"/>
<line x1="260" y1="170" x2="260" y2="210" stroke="${C.navy}" stroke-width="2.4"/>
${o.bare ? '' : T(150, 106, 'Aminogruppe', { size: 13, fill: C.muted }) + T(390, 250, 'Carboxylgruppe', { size: 13, fill: C.muted }) + T(260, 280, 'Rest (Seitenkette)', { size: 13, fill: C.muted })}`;
    },
    slots: [
      { key: 'amino', label: 'Aminogruppe', x: 110, y: 196 },
      { key: 'carboxyl', label: 'Carboxylgruppe', x: 470, y: 150 },
      { key: 'hydrogen', label: 'Wasserstoffatom', x: 306, y: 70 },
      { key: 'rest', label: 'Rest R (Seitenkette)', x: 312, y: 236 },
      { key: 'alpha', label: 'α-C-Atom', x: 222, y: 112 }
    ],
    parts: {
      amino: ['Aminogruppe (–NH₂)', 'Funktionelle Gruppe aus einem N-Atom und zwei H-Atomen. Bei der Peptidbindung reagiert sie mit der Carboxylgruppe einer anderen Aminosäure. Am Kettenanfang (N-Ende) bleibt sie frei.'],
      carboxyl: ['Carboxylgruppe (–COOH)', 'Auch „Carboxygruppe“ (Buch). C-Atom mit doppelt gebundenem O und einer OH-Gruppe. Bei der Peptidbindung wird die OH-Gruppe als Teil des Wassermoleküls abgespalten.'],
      hydrogen: ['Wasserstoffatom (H)', 'Dritter Bindungspartner des α-C-Atoms; bei allen Aminosäuren gleich.'],
      rest: ['Rest R (Seitenkette)', 'Der einzige variable Teil: Er unterscheidet die 20 Aminosäuren. Reste können hydrophil oder hydrophob, sauer oder basisch sein (z. B. Glycin: R = H; Cystein: R = –CH₂–SH).'],
      alpha: ['α-C-Atom', 'Zentrales C-Atom. Weil Amino- und Carboxylgruppe am selben C-Atom sitzen, spricht man von einer α-Aminosäure. Es trägt vier verschiedene Bindungspartner.']
    }
  };

  /* ---- Dipeptid ---- */
  F.dipeptide = {
    title: 'Dipeptid mit Peptidbindung', viewBox: '0 0 640 300',
    render(o) {
      o = o || {};
      const b = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.navy}" stroke-width="2.4"/>`;
      return `
<rect x="212" y="64" width="128" height="186" rx="12" fill="none" stroke="${C.teal}" stroke-width="2" stroke-dasharray="6 4"/>
${o.bare ? '' : T(276, 56, 'Peptidgruppe', { size: 13, fill: C.teal })}
${T(58, 160, 'H₂N', { size: 24 })}${b(86, 152, 128, 152)}
${T(148, 160, 'C', { size: 24 })}${b(148, 132, 148, 104)}${T(148, 98, 'H', { size: 22 })}${b(148, 170, 148, 202)}${T(148, 228, 'R₁', { size: 22, fill: C.teal })}
${b(162, 152, 222, 152)}
${T(236, 160, 'C', { size: 24 })}${b(232, 132, 232, 102)}${b(240, 132, 240, 102)}${T(236, 94, 'O', { size: 22 })}
<line x1="250" y1="152" x2="300" y2="152" stroke="${C.red}" stroke-width="4"/>
${T(316, 160, 'N', { size: 24 })}${b(316, 170, 316, 200)}${T(316, 224, 'H', { size: 22 })}
${b(330, 152, 380, 152)}
${T(398, 160, 'C', { size: 24 })}${b(398, 132, 398, 104)}${T(398, 98, 'H', { size: 22 })}${b(398, 170, 398, 202)}${T(398, 228, 'R₂', { size: 22, fill: C.teal })}
${b(412, 152, 470, 152)}
${T(508, 160, 'COOH', { size: 24 })}
${o.bare ? '' : T(276, 280, 'Peptidbindung (rot)', { size: 13, fill: C.red }) + T(58, 194, 'N-Ende', { size: 13, fill: C.muted }) + T(508, 194, 'C-Ende', { size: 13, fill: C.muted })}`;
    },
    slots: [
      { key: 'nend', label: 'Aminogruppe (N-Ende)', x: 58, y: 118 },
      { key: 'cend', label: 'Carboxylgruppe (C-Ende)', x: 508, y: 118 },
      { key: 'bond', label: 'Peptidbindung', x: 276, y: 178 },
      { key: 'group', label: 'Peptidgruppe', x: 350, y: 76 },
      { key: 'rest', label: 'Rest R', x: 178, y: 228 },
      { key: 'alpha', label: 'α-C-Atom', x: 176, y: 128 }
    ]
  };

  /* ---- Phospholipid-Molekül ---- */
  F.phospholipid = {
    title: 'Bau eines Phospholipids', viewBox: '0 0 460 400',
    render(o) {
      o = o || {};
      return `
<rect x="170" y="20" width="96" height="40" rx="10" fill="#bfdbfe" stroke="${C.blue}" stroke-width="2"/>${o.bare ? '' : T(218, 46, 'Cholin', { size: 14 })}
<line x1="218" y1="60" x2="218" y2="78" stroke="${C.navy}" stroke-width="3"/>
<circle cx="218" cy="102" r="24" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/>${T(218, 108, 'P', { size: 18 })}
<line x1="218" y1="126" x2="218" y2="144" stroke="${C.navy}" stroke-width="3"/>
<rect x="160" y="144" width="116" height="34" rx="8" fill="#e2e8f0" stroke="${C.navy3}" stroke-width="2"/>${o.bare ? '' : T(218, 167, 'Glycerin', { size: 14 })}
<path d="M186,178 L186,370" stroke="${C.tail}" stroke-width="12" stroke-linecap="round"/>
<path d="M250,178 L250,262 L272,290 L272,370" fill="none" stroke="${C.tail}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M140,14 L130,14 L130,182 L140,182" fill="none" stroke="${C.teal}" stroke-width="2.4"/>
<path d="M140,196 L130,196 L130,376 L140,376" fill="none" stroke="${C.muted}" stroke-width="2.4"/>
${o.bare ? '' : T(124, 100, 'hydrophiler Kopf', { size: 13, fill: C.teal, anchor: 'end' }) + T(124, 290, 'hydrophobe Schwänze', { size: 13, fill: C.muted, anchor: 'end' }) + T(300, 280, 'Doppelbindung', { size: 12, fill: C.muted, anchor: 'start' }) + T(300, 108, 'Phosphatgruppe', { size: 13, fill: C.orange, anchor: 'start' }) + T(300, 340, 'Fettsäurereste', { size: 13, fill: C.muted, anchor: 'start' })}`;
    },
    slots: [
      { key: 'cholin', label: 'Cholin', x: 296, y: 40 },
      { key: 'phosphat', label: 'Phosphatgruppe', x: 266, y: 92 },
      { key: 'glycerin', label: 'Glycerin', x: 300, y: 161 },
      { key: 'fa', label: 'Fettsäurerest', x: 214, y: 330 },
      { key: 'kopf', label: 'hydrophiler Kopf', x: 100, y: 98 },
      { key: 'schwanz', label: 'hydrophobe Schwänze', x: 100, y: 286 },
      { key: 'db', label: 'Doppelbindung (ungesättigt)', x: 300, y: 276 }
    ]
  };

  /* ---- Biomembran (Modell S. 15, B2) ---- */
  F.membrane = {
    title: 'Modell einer Biomembran', viewBox: '0 0 780 430',
    render(o) {
      o = o || {};
      const skipOuter = x => (x > 128 && x < 222) || (x > 368 && x < 462) || (x > 598 && x < 676) || x === 280 || x === 520 || x === 60;
      const skipInner = x => (x > 128 && x < 222) || (x > 368 && x < 462);
      let lip = '';
      for (let x = 20; x <= 740; x += 20) {
        if (!skipOuter(x)) lip += pl(x, 170, 1, 32);
        if (!skipInner(x)) lip += pl(x, 262, -1, 32);
      }
      const chain = (pts) => pts.map(p => `<polygon points="${hex(p[0], p[1], 8)}" fill="${C.carb}" stroke="#b45309" stroke-width="1.2"/>`).join('');
      return `
<rect x="0" y="0" width="780" height="150" fill="#f0f9ff"/><rect x="0" y="282" width="780" height="148" fill="#f8fafc"/>
${o.bare ? '' : T(16, 28, 'extrazellulärer Raum', { anchor: 'start', size: 14, fill: C.muted }) + T(16, 418, 'Cytoplasma', { anchor: 'start', size: 14, fill: C.muted })}
<g data-part="bilayer">${lip}<rect class="hl" x="8" y="156" width="764" height="120" rx="8" fill="none" stroke="${C.teal}" stroke-width="2.5"/></g>
<g data-part="lipid">${pl(60, 170, 1, 32)}<rect class="hl" x="46" y="156" width="28" height="56" rx="6" fill="none" stroke="${C.teal}" stroke-width="2.5"/></g>
<g data-part="cyto"><path d="M30,352 C120,330 200,372 300,350 S480,330 560,352 S700,372 760,348" fill="none" stroke="${C.cyto}" stroke-width="6" stroke-linecap="round"/>
  <path d="M40,378 C140,360 230,396 330,374 S520,356 600,378 S720,392 760,374" fill="none" stroke="${C.cyto}" stroke-width="5" stroke-linecap="round" opacity=".7"/>
  <line x1="176" y1="312" x2="176" y2="346" stroke="${C.cyto}" stroke-width="4"/>
  <path class="hl" d="M30,352 C120,330 200,372 300,350 S480,330 560,352 S700,372 760,348" fill="none" stroke="${C.teal2}" stroke-width="12" opacity="0" stroke-linecap="round"/></g>
<g data-part="integral"><path d="M150,118 C128,150 134,205 138,250 C141,292 158,314 178,312 C206,309 214,282 210,240 C206,192 216,150 202,120 C190,100 162,100 150,118Z" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  <path class="hl" d="M150,118 C128,150 134,205 138,250 C141,292 158,314 178,312 C206,309 214,282 210,240 C206,192 216,150 202,120 C190,100 162,100 150,118Z" fill="none" stroke="${C.navy}" stroke-width="3.5"/></g>
<g data-part="channel"><path d="M378,128 C368,170 370,250 380,300 L410,300 C414,250 414,170 410,128Z" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  <path d="M422,128 C418,170 418,250 422,300 L452,300 C462,250 464,170 454,128Z" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  <circle cx="416" cy="112" r="5" fill="${C.blue}"/><circle cx="416" cy="214" r="5" fill="${C.blue}"/><circle cx="416" cy="318" r="5" fill="${C.blue}"/>
  <path class="hl" d="M372,124 L460,124 L462,304 L372,304Z" fill="none" stroke="${C.navy}" stroke-width="3" rx="8"/></g>
<g data-part="peripheral"><ellipse cx="572" cy="294" rx="40" ry="20" fill="${C.peri}" stroke="${C.periS}" stroke-width="2"/>
  <ellipse class="hl" cx="572" cy="294" rx="45" ry="25" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g data-part="glycoprotein"><path d="M608,214 C600,180 604,140 618,124 C632,110 656,112 666,128 C676,148 672,188 664,214 Z" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  ${chain([[637, 104], [628, 88], [646, 74], [620, 70], [656, 58]])}
  <path class="hl" d="M600,218 L600,48 L672,48 L672,218 Z" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g data-part="carbs">${pl(320, 170, 1, 32)}${chain([[320, 150], [312, 134], [330, 120], [318, 104]])}
  <rect class="hl" x="300" y="92" width="40" height="122" rx="8" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g data-part="cholesterol"><g transform="translate(280,186)"><rect x="-5" y="-10" width="10" height="34" rx="3" fill="${C.chol}" stroke="#a16207"/><circle cx="0" cy="-14" r="4" fill="#a16207"/></g>
  <g transform="translate(520,186)"><rect x="-5" y="-10" width="10" height="34" rx="3" fill="${C.chol}" stroke="#a16207"/><circle cx="0" cy="-14" r="4" fill="#a16207"/></g>
  <rect class="hl" x="266" y="164" width="28" height="56" rx="6" fill="none" stroke="${C.navy}" stroke-width="2.5"/><rect class="hl" x="506" y="164" width="28" height="56" rx="6" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<path d="M770,160 L776,160 L776,272 L770,272" fill="none" stroke="${C.navy}" stroke-width="2"/>`;
    },
    slots: [
      { key: 'bilayer', label: 'Lipiddoppelschicht', x: 748, y: 216 },
      { key: 'lipid', label: 'Phospholipid (Lipidmolekül)', x: 60, y: 130 },
      { key: 'integral', label: 'integrales Protein', x: 176, y: 214 },
      { key: 'channel', label: 'Kanalprotein', x: 416, y: 160 },
      { key: 'peripheral', label: 'peripheres Protein', x: 572, y: 294 },
      { key: 'glycoprotein', label: 'Protein mit Kohlenhydratkette', x: 636, y: 168 },
      { key: 'carbs', label: 'Kohlenhydrate (Glykokalyx)', x: 356, y: 104 },
      { key: 'cholesterol', label: 'Cholesterin', x: 494, y: 140 },
      { key: 'cyto', label: 'Filamente des Cytoskeletts', x: 470, y: 400 },
      { key: 'out', label: 'extrazellulärer Raum', x: 110, y: 50 },
      { key: 'in', label: 'Cytoplasma', x: 110, y: 410 }
    ],
    parts: {
      bilayer: ['Lipiddoppelschicht', 'Zwei Schichten aus Phospholipiden: Die hydrophilen Köpfe zeigen zu den wässrigen Seiten (außen und innen), die hydrophoben Schwänze liegen einander zugewandt im Inneren. Sie ist das Grundgerüst der Membran, bestimmt Stabilität und Flexibilität und ist eine Barriere für geladene und größere polare Teilchen. (Buch S. 14–15)'],
      lipid: ['Phospholipid (Lipidmolekül)', 'Hydrophiler Kopf (Glycerin–Phosphatgruppe–Cholin) und zwei hydrophobe Fettsäure-Schwänze. Die Lipide sind innerhalb ihrer Schicht seitlich beweglich (flüssige Doppelschicht).'],
      integral: ['Integrales Protein', 'Durchspannt die Lipiddoppelschicht (oder ist teilweise eingelagert). Hydrophobe Bereiche liegen im Membraninneren, hydrophile ragen zu den wässrigen Seiten. Es ist seitlich beweglich, kann aber über Filamente am Cytoskelett verankert sein. Funktion z. B. als Carrier oder Rezeptor.'],
      channel: ['Integrales Kanalprotein', 'Bildet eine wassergefüllte Pore, durch die bestimmte Teilchen (selektiv nach Größe und Ladung) entlang ihres Konzentrationsgefälles diffundieren: kanalvermittelte (erleichterte) Diffusion. Viele Kanäle können öffnen und schließen; Aquaporine sind ständig offen.'],
      peripheral: ['Peripheres Protein', 'Der Membran nur angelagert – gebunden an Phospholipide oder integrale Proteine; durchspannt die Membran nicht. Funktion z. B. als Enzym oder in der Signalweiterleitung.'],
      glycoprotein: ['Protein mit Kohlenhydratkette (Glykoprotein)', 'Integrales Protein, das auf der Außenseite eine Kohlenhydratkette trägt. Kohlenhydratketten sind Teil der Glykokalyx und dienen der Zellerkennung.'],
      carbs: ['Kohlenhydrate (Glykolipid / Glykokalyx)', 'Kohlenhydratketten befinden sich nur auf der Außenseite der Membran, gebunden an Lipide (Glykolipide) oder Proteine (Glykoproteine). Zusammen bilden sie die Glykokalyx, die der Erkennung von Zellen dient.'],
      cholesterol: ['Cholesterin', 'Lipid zwischen den Phospholipiden (in tierischen Membranen bis 25 %). Es verhindert, dass die Membran bei tiefen Temperaturen zu unbeweglich wird.'],
      cyto: ['Filamente des Cytoskeletts', 'Proteinfasern an der Innenseite (Cytoplasmaseite), eingezeichnet im Membranmodell (Buch S. 15, B2).']
    }
  };

  /* ---- Energiediagramm ---- */
  F.energy = {
    title: 'Energiediagramm einer exergonischen Reaktion', viewBox: '0 0 600 360',
    render(o) {
      o = o || {};
      const id = nextId('ar');
      return `<defs>${arrowDefs(id, C.navy)}${arrowDefs(id + 't', C.teal)}${arrowDefs(id + 'r', C.red)}</defs>
<line x1="60" y1="320" x2="570" y2="320" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="60" y1="320" x2="60" y2="24" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
${o.bare ? '' : T(315, 350, 'Reaktionsverlauf', { size: 14 }) + `<text x="22" y="180" font-size="14" fill="${C.navy}" font-weight="600" text-anchor="middle" transform="rotate(-90 22 180)">Energiegehalt der Stoffe</text>`}
<path d="M80,200 L170,200 C230,200 240,60 290,60 C340,60 350,270 410,270 L540,270" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="M170,200 C230,200 245,140 290,140 C335,140 350,270 410,270" fill="none" stroke="${C.teal}" stroke-width="3" stroke-dasharray="8 5"/>
<line x1="170" y1="200" x2="500" y2="200" stroke="${C.muted}" stroke-dasharray="4 4"/>
<line x1="226" y1="60" x2="290" y2="60" stroke="${C.muted}" stroke-dasharray="4 4"/>
<line x1="290" y1="140" x2="340" y2="140" stroke="${C.muted}" stroke-dasharray="4 4"/>
<line x1="226" y1="198" x2="226" y2="64" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="340" y1="198" x2="340" y2="144" stroke="${C.teal}" stroke-width="2" marker-end="url(#${id}t)"/>
<line x1="490" y1="202" x2="490" y2="266" stroke="${C.red}" stroke-width="2" marker-end="url(#${id}r)"/>
${T(125, 192, 'A + B', { size: 14 })}${T(480, 290, 'C + D', { size: 14 })}${T(290, 50, '[A···B]', { size: 13 })}${T(290, 130, '[A···E···B]', { size: 13, fill: C.teal })}
${o.bare ? '' : T(220, 120, 'Aktivierungsenergie', { size: 12, anchor: 'end' }) + T(220, 135, 'ohne Enzym', { size: 12, anchor: 'end' }) + T(348, 176, 'mit Enzym', { size: 12, anchor: 'start', fill: C.teal }) + T(500, 236, 'frei werdende Energie', { size: 12, anchor: 'start', fill: C.red })}
<g class="legend-g"><line x1="390" y1="40" x2="420" y2="40" stroke="${C.navy}" stroke-width="3"/>${T(428, 45, 'ohne Enzym', { size: 12, anchor: 'start' })}<line x1="390" y1="62" x2="420" y2="62" stroke="${C.teal}" stroke-width="3" stroke-dasharray="8 5"/>${T(428, 67, 'mit Enzym', { size: 12, anchor: 'start' })}</g>`;
    },
    slots: [
      { key: 'eaohne', label: 'Aktivierungsenergie ohne Enzym', x: 200, y: 128 },
      { key: 'eamit', label: 'Aktivierungsenergie mit Enzym', x: 364, y: 170 },
      { key: 'es', label: 'Enzym-Substrat-Komplex (Übergangszustand)', x: 252, y: 152 },
      { key: 'sub', label: 'Substrate (Ausgangsstoffe)', x: 108, y: 226 },
      { key: 'prod', label: 'Produkte', x: 530, y: 296 },
      { key: 'dg', label: 'frei werdende Energie', x: 516, y: 234 },
      { key: 'x', label: 'Reaktionsverlauf', x: 315, y: 344 },
      { key: 'y', label: 'Energiegehalt der Stoffe', x: 26, y: 180 }
    ]
  };

  /* ---- Katalytischer Zyklus ---- */
  F.cycle = {
    title: 'Katalytischer Zyklus (Lactase)', viewBox: '0 0 640 400',
    render(o) {
      o = o || {};
      const id = nextId('cy');
      const E = (x, y) => `<path d="${enzymePath(x, y, 26, 30)}" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>`;
      return `<defs>${arrowDefs(id, C.navy)}</defs>
<g data-part="e1">${E(140, 120)}${lactose(140, 52, 12)}${o.bare ? '' : T(140, 160, 'Enzym', { size: 13 }) + T(140, 28, 'Substrat (Lactose)', { size: 13 })}</g>
<g data-part="es">${E(500, 120)}${lactose(500, 92, 12)}${T(540, 58, '+ H₂O', { size: 13, fill: C.blue })}${o.bare ? '' : T(500, 170, 'Enzym-Substrat-Komplex', { size: 13 })}</g>
<g data-part="prod">${E(500, 300)}<polygon points="${hex(468, 228, 12)}" fill="#fde68a" stroke="${C.orange}" stroke-width="2"/><polygon points="${hex(536, 222, 12)}" fill="#bfdbfe" stroke="${C.blue}" stroke-width="2"/>
  ${o.bare ? '' : T(470, 208, 'Galactose', { size: 12 }) + T(540, 202, 'Glucose', { size: 12 }) + T(500, 350, 'Produkte lösen sich ab', { size: 13 })}</g>
<g data-part="e2">${E(140, 300)}${o.bare ? '' : T(140, 350, 'Enzym unverändert', { size: 13 })}</g>
<path d="M230,90 C300,60 360,60 410,90" fill="none" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#${id})"/>
<path d="M580,170 C600,200 600,230 585,260" fill="none" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#${id})"/>
<path d="M410,320 C350,350 290,350 230,320" fill="none" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#${id})"/>
<path d="M70,260 C50,220 50,190 68,160" fill="none" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#${id})"/>
<circle cx="320" cy="200" r="46" fill="#f2fbfa" stroke="#cdeee9"/>${T(320, 196, 'katalytischer', { size: 12, fill: C.teal })}${T(320, 212, 'Zyklus', { size: 12, fill: C.teal })}`;
    },
    slots: [
      { key: 'enzym', label: 'Enzym', x: 82, y: 132 },
      { key: 'substrat', label: 'Substrat', x: 196, y: 44 },
      { key: 'az', label: 'aktives Zentrum', x: 186, y: 100 },
      { key: 'esk', label: 'Enzym-Substrat-Komplex', x: 440, y: 132 },
      { key: 'prod', label: 'Produkte', x: 590, y: 222 },
      { key: 'unv', label: 'unverändertes Enzym', x: 82, y: 312 }
    ]
  };

  /* ---- Proteinstruktur (Tertiär) ---- */
  F.tertiary = {
    title: 'Tertiärstruktur mit Wechselwirkungen', viewBox: '0 0 640 400',
    render(o) {
      o = o || {};
      let helix = '';
      for (let i = 0; i < 6; i++) helix += `<ellipse cx="${104 + i * 26}" cy="96" rx="15" ry="34" fill="none" stroke="${C.teal}" stroke-width="4"/>`;
      const arrowStrand = (x1, x2, y, dir) => {
        const a = dir > 0 ? `M${x1},${y - 9} L${x2 - 18},${y - 9} L${x2 - 18},${y - 17} L${x2},${y} L${x2 - 18},${y + 17} L${x2 - 18},${y + 9} L${x1},${y + 9}Z`
          : `M${x2},${y - 9} L${x1 + 18},${y - 9} L${x1 + 18},${y - 17} L${x1},${y} L${x1 + 18},${y + 17} L${x1 + 18},${y + 9} L${x2},${y + 9}Z`;
        return `<path d="${a}" fill="#fcd34d" stroke="#b45309" stroke-width="1.6"/>`;
      };
      const dash = (x1, y1, x2, y2, c) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || C.red}" stroke-width="2" stroke-dasharray="3 3"/>`;
      return `
${T(40, 102, 'N', { size: 15, fill: C.muted })}<path d="M52,96 L88,96" stroke="${C.navy3}" stroke-width="4" fill="none"/>
<g data-part="helix">${helix}${[0, 1, 2, 3, 4].map(i => dash(110 + i * 26, 70, 124 + i * 26, 122, C.red)).join('')}<rect class="hl" x="80" y="52" width="180" height="90" rx="12" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<path d="M248,96 C330,90 380,60 450,80 C540,105 560,180 520,220 C490,250 430,230 410,260 C390,295 450,330 400,350 C350,370 300,330 290,300 C280,270 270,250 250,250" fill="none" stroke="${C.navy3}" stroke-width="4"/>
<path d="M90,320 C70,320 60,300 70,285 M70,215 C55,230 56,250 72,250" fill="none" stroke="${C.navy3}" stroke-width="4"/>
<g data-part="sheet">${arrowStrand(80, 250, 215, 1)}${arrowStrand(80, 250, 250, -1)}${arrowStrand(80, 250, 285, 1)}${arrowStrand(80, 250, 320, -1)}
  ${[110, 150, 190, 230].map(x => dash(x, 224, x, 241, C.red) + dash(x, 259, x, 276, C.red) + dash(x, 294, x, 311, C.red)).join('')}
  <rect class="hl" x="70" y="192" width="190" height="150" rx="12" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<path d="M250,320 C270,340 260,370 230,372 L200,372" fill="none" stroke="${C.navy3}" stroke-width="4"/>${T(186, 377, 'C', { size: 15, fill: C.muted })}
<g data-part="ss"><circle cx="452" cy="82" r="6" fill="#facc15" stroke="#a16207"/><circle cx="452" cy="134" r="6" fill="#facc15" stroke="#a16207"/>
  <path d="M410,170 C430,150 470,140 470,134" fill="none" stroke="${C.navy3}" stroke-width="4"/>
  <line x1="452" y1="88" x2="452" y2="128" stroke="#a16207" stroke-width="4"/>${T(486, 114, 'S–S', { size: 14, fill: '#a16207', anchor: 'start' })}
  <rect class="hl" x="436" y="68" width="92" height="80" rx="10" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<g data-part="ionic">${T(536, 262, 'COO⁻', { size: 14, fill: C.red })}${T(536, 302, 'H₃N⁺', { size: 14, fill: C.blue })}<line x1="536" y1="268" x2="536" y2="286" stroke="${C.navy}" stroke-width="2" stroke-dasharray="2 3"/>
  <rect class="hl" x="500" y="244" width="74" height="66" rx="10" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<g data-part="hbond">${T(330, 196, 'O–H', { size: 14 })}${T(330, 234, 'O=C', { size: 14 })}<line x1="330" y1="202" x2="330" y2="218" stroke="${C.red}" stroke-width="2" stroke-dasharray="3 3"/>
  <rect class="hl" x="298" y="178" width="64" height="64" rx="10" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
<g data-part="vdw"><circle cx="372" cy="318" r="11" fill="#e2e8f0" stroke="${C.muted}"/><circle cx="394" cy="304" r="11" fill="#e2e8f0" stroke="${C.muted}"/><circle cx="392" cy="330" r="11" fill="#e2e8f0" stroke="${C.muted}"/>
  <rect class="hl" x="352" y="284" width="62" height="64" rx="10" fill="none" stroke="${C.navy}" stroke-width="2.5"/></g>
${o.bare ? '' : T(170, 40, 'α-Helix', { size: 13, fill: C.teal }) + T(165, 185, 'β-Faltblatt', { size: 13, fill: '#b45309' }) + T(486, 160, 'Disulfidbrücke', { size: 12, anchor: 'start' }) + T(582, 286, 'Ionenbindung', { size: 12, anchor: 'start' }) + T(330, 168, 'H-Brücke', { size: 12 }) + T(424, 360, 'Van-der-Waals', { size: 12, anchor: 'start' })}`;
    },
    slots: [
      { key: 'helix', label: 'α-Helix', x: 280, y: 60 },
      { key: 'sheet', label: 'β-Faltblatt', x: 270, y: 196 },
      { key: 'ss', label: 'Disulfidbrücke', x: 540, y: 90 },
      { key: 'ionic', label: 'Ionenbindung', x: 596, y: 262 },
      { key: 'hbond', label: 'Wasserstoffbrücke', x: 372, y: 196 },
      { key: 'vdw', label: 'Van-der-Waals-Kräfte', x: 432, y: 330 }
    ],
    parts: {
      helix: ['α-Helix (Sekundärstruktur)', 'Schraubenförmig gewundener Kettenabschnitt. Wasserstoffbrücken (rot gestrichelt) verbinden die Peptidgruppen übereinanderliegender Windungen; die Reste zeigen nach außen.'],
      sheet: ['β-Faltblatt (Sekundärstruktur)', 'Zickzackförmig gefaltete Kettenabschnitte liegen nebeneinander (Pfeile zeigen die Laufrichtung N → C). Wasserstoffbrücken zwischen den Peptidgruppen benachbarter Abschnitte; Reste zeigen abwechselnd nach oben und unten.'],
      ss: ['Disulfidbrücke (Tertiärstruktur)', 'Kovalente –S–S–-Bindung zwischen den Thiolgruppen (–SH) zweier Cystein-Reste. Sehr stabil – viele Disulfidbrücken machen Proteine hitzestabil (Taq-Polymerase).'],
      ionic: ['Ionenbindung (Tertiärstruktur)', 'Anziehung zwischen einem negativ geladenen Rest einer sauren Aminosäure (–COO⁻) und einem positiv geladenen Rest einer basischen Aminosäure (–NH₃⁺). pH-Änderungen können diese Ladungen verändern.'],
      hbond: ['Wasserstoffbrücke (Tertiärstruktur)', 'Zwischen polaren Resten: Ein partiell positives H-Atom wird von einem partiell negativen O- oder N-Atom angezogen.'],
      vdw: ['Van-der-Waals-Kräfte (Tertiärstruktur)', 'Schwache Anziehungskräfte zwischen unpolaren (hydrophoben) Resten, die sich im Inneren des Proteins zusammenlagern.']
    }
  };

  /* ---- Glucosetransport Darm → Blut ---- */
  F.glucose = {
    title: 'Glucosetransport aus dem Darm ins Blut', viewBox: '0 0 680 420',
    render(o) {
      o = o || {};
      const id = nextId('gl');
      const mem = (y) => { let s = ''; for (let x = 70; x <= 610; x += 16) s += `<circle cx="${x}" cy="${y - 6}" r="5" fill="${C.head}"/><circle cx="${x}" cy="${y + 6}" r="5" fill="${C.head}"/>`; return s; };
      return `<defs>${arrowDefs(id, C.navy)}${arrowDefs(id + 'o', C.orange)}${arrowDefs(id + 'b', C.blue)}${arrowDefs(id + 'p', '#7c3aed')}</defs>
<rect x="0" y="0" width="680" height="96" fill="#fff7ed"/><rect x="60" y="110" width="560" height="200" rx="18" fill="#f8fafc" stroke="#cbd5e1"/><rect x="0" y="330" width="680" height="90" fill="#fef2f2"/>
${o.bare ? '' : T(16, 26, 'Darmlumen', { anchor: 'start', size: 14, fill: '#9a3412' }) + T(16, 406, 'Gewebsflüssigkeit / Blut', { anchor: 'start', size: 14, fill: C.red }) + T(340, 210, 'Darmepithelzelle', { size: 14, fill: C.muted })}
<g>${mem(110)}</g><g>${mem(310)}</g>
<g data-part="symport"><rect x="170" y="90" width="64" height="42" rx="14" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  <line x1="190" y1="40" x2="190" y2="160" stroke="${C.orange}" stroke-width="3" marker-end="url(#${id}o)"/><line x1="214" y1="40" x2="214" y2="160" stroke="${C.blue}" stroke-width="3" marker-end="url(#${id}b)"/>
  ${T(190, 34, 'Na⁺', { size: 13, fill: C.orange })}${T(222, 34, 'Glc', { size: 13, fill: C.blue })}
  <rect class="hl" x="160" y="22" width="84" height="146" rx="12" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g data-part="pump"><rect x="200" y="290" width="76" height="42" rx="14" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>${T(238, 316, 'ATP', { size: 12, fill: '#7c3aed' })}
  <line x1="222" y1="262" x2="222" y2="380" stroke="${C.orange}" stroke-width="3" marker-end="url(#${id}o)"/><line x1="256" y1="380" x2="256" y2="262" stroke="#7c3aed" stroke-width="3" marker-end="url(#${id}p)"/>
  ${T(208, 398, 'Na⁺', { size: 13, fill: C.orange })}${T(268, 398, 'K⁺', { size: 13, fill: '#7c3aed' })}
  <rect class="hl" x="192" y="250" width="92" height="160" rx="12" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g data-part="carrier"><rect x="440" y="290" width="56" height="42" rx="14" fill="${C.prot}" stroke="${C.protS}" stroke-width="2"/>
  <line x1="468" y1="250" x2="468" y2="380" stroke="${C.blue}" stroke-width="3" marker-end="url(#${id}b)"/>${T(486, 398, 'Glc', { size: 13, fill: C.blue })}
  <rect class="hl" x="430" y="240" width="76" height="168" rx="12" fill="none" stroke="${C.navy}" stroke-width="3"/></g>
<g font-size="12">${T(560, 40, 'Na⁺ hoch · Glucose niedrig', { size: 12, fill: '#9a3412' })}${T(500, 150, 'Na⁺ niedrig · Glucose hoch', { size: 12, fill: C.muted })}${T(560, 360, 'Glucose niedriger als in der Zelle', { size: 12, fill: C.red })}</g>`;
    },
    slots: [
      { key: 'symport', label: 'Na⁺-Glucose-Symporter', x: 140, y: 110 },
      { key: 'pump', label: 'Na⁺-K⁺-Ionenpumpe', x: 168, y: 312 },
      { key: 'carrier', label: 'Glucose-Carrier', x: 530, y: 312 },
      { key: 'lumen', label: 'Darmlumen', x: 60, y: 60 },
      { key: 'zelle', label: 'Darmepithelzelle', x: 340, y: 240 },
      { key: 'blut', label: 'Gewebsflüssigkeit / Blut', x: 60, y: 370 }
    ],
    parts: {
      symport: ['Na⁺-Glucose-Symporter (sekundär aktiv)', 'Auf der Seite zum Darmlumen. Na⁺ strömt entlang seines Konzentrationsgefälles (Lumen hoch → Zelle niedrig) in die Zelle und nimmt Glucose gegen deren Gefälle mit – beide in die gleiche Richtung (Symport). Die Energie stammt indirekt aus dem Na⁺-Gefälle.'],
      pump: ['Na⁺-K⁺-Ionenpumpe (primär aktiv, Antiport)', 'Auf der Seite zur Gewebsflüssigkeit. Pumpt unter ATP-Verbrauch Na⁺ aus der Zelle und K⁺ hinein (entgegengesetzte Richtungen = Antiport). Dadurch bleibt die Na⁺-Konzentration in der Zelle niedrig – Voraussetzung für den Symporter. (Ergänzung: 3 Na⁺ hinaus, 2 K⁺ hinein pro ATP.)'],
      carrier: ['Glucose-Carrier (erleichterte Diffusion)', 'Glucose ist in der Zelle höher konzentriert als in der Gewebsflüssigkeit und verlässt die Zelle passiv entlang ihres Gefälles über einen Carrier (carriervermittelte Diffusion). Über das Blut wird sie im Körper verteilt.']
    }
  };

  /* ---- Rezeptorvermittelte Endozytose von Eisen (Übersicht in 7 Stationen) ---- */
  F.endocytosis = {
    title: 'Rezeptorvermittelte Endozytose von Eisen-Ionen', viewBox: '0 0 800 400',
    render(o) {
      o = o || {};
      const id = nextId('en');
      const fe = (x, y) => `<circle cx="${x}" cy="${y}" r="4.5" fill="${C.red}"/>`;
      const tf = (x, y, rot, loaded) => `<g transform="translate(${x},${y}) rotate(${rot || 0})"><path d="M-13,-6 C-13,-16 13,-16 13,-6 L13,4 L-13,4Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/>${loaded ? fe(-5, -7) + fe(5, -7) : ''}</g>`;
      const tfr = (x, y, rot) => `<g transform="translate(${x},${y}) rotate(${rot || 0})"><rect x="-4" y="-2" width="8" height="26" rx="3" fill="${C.prot}" stroke="${C.protS}" stroke-width="1.5"/><path d="M-11,-2 L-4,-10 M11,-2 L4,-10" stroke="${C.protS}" stroke-width="4" stroke-linecap="round"/></g>`;
      const clath = (cx, cy, r, n) => { let s = ''; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += `<path d="M${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} l${8 * Math.cos(a + .5)},${8 * Math.sin(a + .5)} l${8 * Math.cos(a - 1.2)},${8 * Math.sin(a - 1.2)}" fill="none" stroke="#7c3aed" stroke-width="2.4"/>`; } return s; };
      const ves = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f0f9ff" stroke="${C.head}" stroke-width="7"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#cbd5e1" stroke-width="2"/>`;
      const memPath = 'M0,120 L222,120 C236,120 238,196 270,198 C302,196 304,120 318,120 L662,120 C676,120 682,142 700,146 C718,142 724,120 738,120 L800,120';
      const st = (n, inner) => `<g data-step="${n}" class="fade">${inner}</g>`;
      return `<defs>${arrowDefs(id, C.navy)}${arrowDefs(id + 'r', C.red)}</defs>
<rect x="0" y="0" width="800" height="120" fill="#fef2f2"/>
${o.bare ? '' : T(12, 22, 'Blut (pH 7,4)', { anchor: 'start', size: 13, fill: C.red }) + T(12, 390, 'Cytoplasma', { anchor: 'start', size: 13, fill: C.muted })}
<g data-part="membrane"><path d="${memPath}" fill="none" stroke="${C.head}" stroke-width="12"/><path d="${memPath}" fill="none" stroke="#cbd5e1" stroke-width="3"/></g>
${st(1, `${fe(40, 50)}${fe(56, 74)}${fe(30, 86)}${tf(78, 56, 0, false)}${tf(108, 86, 0, true)}<path d="M60,40 C80,30 92,40 98,58" fill="none" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/>${T(70, 108, '1', { size: 13, fill: C.teal })}`)}
${st(2, `${tfr(168, 114)}${tf(168, 96, 0, true)}${T(168, 160, '2', { size: 13, fill: C.teal })}`)}
${st(3, `${tfr(246, 160, 26)}${tf(254, 146, 26, true)}${tfr(294, 160, -26)}${tf(286, 146, -26, true)}<path d="M228,150 C240,214 300,214 312,150" fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-dasharray="4 3"/>${T(270, 236, '3', { size: 13, fill: C.teal })}`)}
${st(4, `${ves(380, 250, 40)}${clath(380, 250, 46, 12)}${tfr(380, 232, 180)}${tf(380, 252, 0, true)}${T(380, 316, '4', { size: 13, fill: C.teal })}`)}
${st(5, `${ves(478, 266, 38)}${tfr(478, 250, 180)}${tf(478, 268, 0, true)}<path d="M520,220 l7,-5 l2,8" fill="none" stroke="#7c3aed" stroke-width="2.4"/><path d="M438,226 l-6,-6 l-2,7" fill="none" stroke="#7c3aed" stroke-width="2.4"/>${T(478, 328, '5', { size: 13, fill: C.teal })}`)}
${st(6, `${ves(590, 268, 42)}${tfr(590, 252, 180)}${tf(590, 272, 0, false)}${T(590, 294, 'pH 5,5', { size: 12, fill: C.red })}<rect x="626" y="244" width="14" height="22" rx="4" fill="${C.prot}" stroke="${C.protS}"/>${fe(644, 300)}${fe(662, 316)}<path d="M636,258 C652,270 660,286 664,300" fill="none" stroke="${C.red}" stroke-width="1.8" marker-end="url(#${id}r)"/>${T(560, 230, 'H⁺', { size: 12, fill: C.orange })}${T(590, 340, '6', { size: 13, fill: C.teal })}`)}
${st(7, `${tfr(700, 168, 180)}${tf(726, 70, -20, false)}<path d="M700,140 C704,110 712,92 720,84" fill="none" stroke="${C.navy}" stroke-width="1.6" marker-end="url(#${id})"/><path d="M640,240 C672,224 690,200 698,184" fill="none" stroke="${C.navy}" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#${id})"/>${T(744, 200, '7', { size: 13, fill: C.teal })}`)}`;
    },
    slots: [
      { key: 'fe', label: 'Eisen-Ionen', x: 30, y: 62 },
      { key: 'tf', label: 'Transferrin', x: 138, y: 78 },
      { key: 'tfr', label: 'Transferrin-Rezeptor', x: 196, y: 138 },
      { key: 'clathrin', label: 'Clathrin', x: 336, y: 196 },
      { key: 'acid', label: 'saures Vesikel (pH 5,5)', x: 560, y: 352 },
      { key: 'mem', label: 'Zellmembran', x: 420, y: 100 }
    ],
    steps: [
      ['Bindung an Transferrin', 'Im Blut (pH 7,4) bindet das frei schwimmende Protein <b>Transferrin (Tf)</b> Eisen-Ionen (Fe).'],
      ['Bindung an den Rezeptor', 'Nur mit Eisen <b>beladenes</b> Transferrin bindet an den <b>Transferrin-Rezeptor (TfR)</b> der Zellmembran – nach dem Schlüssel-Schloss-Prinzip.'],
      ['Einstülpung („coated pit“)', 'Die Membran stülpt sich an dieser Stelle ein. Auf der Cytoplasmaseite lagert sich <b>Clathrin</b> an (lila) und stabilisiert die Einstülpung.'],
      ['Abschnürung („coated vesicle“)', 'Das Membranstück wird als Vesikel <b>abgeschnürt</b>. Rezeptor und beladenes Transferrin sind jetzt im Vesikel; die Zellmembran bleibt geschlossen.'],
      ['Clathrin löst sich ab', 'Die Clathrinhülle zerfällt. Es bleibt ein Vesikel (Endosom) zurück.'],
      ['Ansäuerung – Eisen wird frei', 'Im Vesikel sinkt der pH-Wert auf ca. <b>5,5</b>. Dadurch lösen sich die Eisen-Ionen vom Transferrin und gelangen über ein Membranprotein ins Cytoplasma. <span class="small muted">Ergänzung: Die H⁺-Ionen werden durch eine Protonenpumpe (unter ATP-Verbrauch) in das Vesikel gepumpt – in der Buchabbildung nicht beschriftet.</span>'],
      ['Recycling', 'Das Vesikel mit Rezeptor und eisenfreiem Transferrin kehrt zur Zellmembran zurück und verschmilzt mit ihr (Exozytose). Transferrin wird ins Blut abgegeben, der Rezeptor steht erneut zur Verfügung.']
    ]
  };

  /* ---- Michaelis-Menten (Beschriftung) ---- */
  function mmPath(x0, y0, sx, sy, vmax, km, smax) {
    let d = '';
    for (let i = 0; i <= 100; i++) { const s = smax * i / 100; const v = vmax * s / (km + s); d += (i ? 'L' : 'M') + (x0 + s * sx).toFixed(1) + ',' + (y0 - v * sy).toFixed(1); }
    return d;
  }
  F.mm = {
    title: 'Michaelis-Menten-Diagramm', viewBox: '0 0 600 360',
    render(o) {
      o = o || {};
      const id = nextId('mm');
      const x0 = 70, y0 = 310, sx = 48, sy = 240; // S 0..10, v 0..1
      const km = 1.4, vmax = 1;
      const yv = y0 - vmax * sy, yh = y0 - 0.5 * sy, xk = x0 + km * sx;
      return `<defs>${arrowDefs(id, C.navy)}</defs>
<line x1="${x0}" y1="${y0}" x2="570" y2="${y0}" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="${x0}" y1="${y0}" x2="${x0}" y2="28" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="${x0}" y1="${yv}" x2="560" y2="${yv}" stroke="${C.muted}" stroke-dasharray="6 5" stroke-width="1.6"/>
<line x1="${x0}" y1="${yh}" x2="${xk}" y2="${yh}" stroke="${C.muted}" stroke-dasharray="6 5" stroke-width="1.6"/>
<line x1="${xk}" y1="${yh}" x2="${xk}" y2="${y0}" stroke="${C.muted}" stroke-dasharray="6 5" stroke-width="1.6"/>
<path d="${mmPath(x0, y0, sx, sy, vmax, km, 10)}" fill="none" stroke="${C.teal}" stroke-width="3.2"/>
${o.bare ? '' : T(x0 - 8, yv + 5, 'v<tspan font-size="10" dy="3">max</tspan>', { anchor: 'end', size: 14 }) + T(x0 - 8, yh + 5, '½ v<tspan font-size="10" dy="3">max</tspan>', { anchor: 'end', size: 14 }) + T(xk, y0 + 20, 'K<tspan font-size="10" dy="3">M</tspan>', { size: 14 }) + T(320, 350, 'Substratkonzentration c(S)', { size: 14 }) + `<text x="20" y="170" font-size="14" fill="${C.navy}" font-weight="600" text-anchor="middle" transform="rotate(-90 20 170)">Reaktionsgeschwindigkeit v</text>`}
<rect x="${x0 + 6 * sx}" y="${yv - 18}" width="${4 * sx}" height="${0.2 * sy}" fill="#ccfbf1" opacity=".5"/>
${o.bare ? '' : T(x0 + 8 * sx, yv + 36, 'Sättigung', { size: 12, fill: C.teal })}`;
    },
    slots: [
      { key: 'vmax', label: 'vmax', x: 40, y: 70 },
      { key: 'half', label: '½ vmax', x: 40, y: 190 },
      { key: 'km', label: 'KM', x: 137, y: 336 },
      { key: 'sat', label: 'Sättigungsbereich', x: 454, y: 120 },
      { key: 'x', label: 'Substratkonzentration', x: 330, y: 346 },
      { key: 'y', label: 'Reaktionsgeschwindigkeit', x: 20, y: 250 }
    ]
  };

  /* ---- Temperaturkurve (Beschriftung) ---- */
  F.tempcurve = {
    title: 'Enzymaktivität in Abhängigkeit von der Temperatur', viewBox: '0 0 600 360',
    render(o) {
      o = o || {};
      const id = nextId('tc');
      const x0 = 70, y0 = 310, sx = 8, sy = 250; // T 0..60
      let d = '';
      const f = BIO.curves ? (t) => BIO.curves.tempNorm(t, 40, 2.2) : (t) => 0;
      for (let i = 0; i <= 120; i++) { const t = 60 * i / 120; d += (i ? 'L' : 'M') + (x0 + t * sx).toFixed(1) + ',' + (y0 - f(t) * sy).toFixed(1); }
      const xo = x0 + 40 * sx;
      return `<defs>${arrowDefs(id, C.navy)}</defs>
<rect x="${x0}" y="40" width="${40 * sx}" height="${y0 - 40}" fill="#ecfeff" opacity=".7"/><rect x="${xo}" y="40" width="${20 * sx}" height="${y0 - 40}" fill="#fef2f2" opacity=".8"/>
<line x1="${x0}" y1="${y0}" x2="570" y2="${y0}" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="${x0}" y1="${y0}" x2="${x0}" y2="28" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
${[0, 10, 20, 30, 40, 50, 60].map(t => `<line x1="${x0 + t * sx}" y1="${y0}" x2="${x0 + t * sx}" y2="${y0 + 5}" stroke="${C.navy}"/>${T(x0 + t * sx, y0 + 20, t, { size: 12, fill: C.muted, weight: 400 })}`).join('')}
<line x1="${xo}" y1="${y0}" x2="${xo}" y2="${y0 - sy}" stroke="${C.muted}" stroke-dasharray="5 5"/>
<path d="${d}" fill="none" stroke="${C.teal}" stroke-width="3.2"/>
${o.bare ? '' : T(x0 + 18 * sx, 62, 'I: RGT-Regel', { size: 13, fill: C.teal }) + T(xo + 10 * sx, 62, 'II: Denaturierung', { size: 13, fill: C.red }) + T(xo, 32, 'Temperaturoptimum', { size: 12 }) + T(320, 350, 'Temperatur in °C', { size: 14 }) + `<text x="22" y="170" font-size="14" fill="${C.navy}" font-weight="600" text-anchor="middle" transform="rotate(-90 22 170)">Enzymaktivität</text>`}`;
    },
    slots: [
      { key: 'opt', label: 'Temperaturoptimum', x: 390, y: 40 },
      { key: 'rgt', label: 'Bereich der RGT-Regel', x: 214, y: 90 },
      { key: 'den', label: 'Denaturierung', x: 470, y: 90 },
      { key: 'x', label: 'Temperatur', x: 330, y: 346 },
      { key: 'y', label: 'Enzymaktivität', x: 22, y: 240 }
    ]
  };

  /* ---- Hemmung (Beschriftung) ---- */
  F.inhib = {
    title: 'Reaktionsgeschwindigkeit mit und ohne Inhibitor', viewBox: '0 0 620 380',
    render(o) {
      o = o || {};
      const id = nextId('ih');
      const x0 = 70, y0 = 330, sx = 46, sy = 260;
      const km = 1.2, Ki = 1, I = 1.2;
      const kmc = km * (1 + I / Ki), vn = 1 / (1 + I / Ki);
      const path = (vm, k) => mmPath(x0, y0, sx, sy, vm, k, 11);
      return `<defs>${arrowDefs(id, C.navy)}</defs>
<line x1="${x0}" y1="${y0}" x2="600" y2="${y0}" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="${x0}" y1="${y0}" x2="${x0}" y2="28" stroke="${C.navy}" stroke-width="2" marker-end="url(#${id})"/>
<line x1="${x0}" y1="${y0 - sy}" x2="590" y2="${y0 - sy}" stroke="${C.muted}" stroke-dasharray="6 5"/>
<line x1="${x0}" y1="${y0 - vn * sy}" x2="590" y2="${y0 - vn * sy}" stroke="${C.muted}" stroke-dasharray="6 5"/>
<line x1="${x0 + km * sx}" y1="${y0}" x2="${x0 + km * sx}" y2="${y0 - 0.5 * sy}" stroke="${C.muted}" stroke-dasharray="4 4"/>
<line x1="${x0 + kmc * sx}" y1="${y0}" x2="${x0 + kmc * sx}" y2="${y0 - 0.5 * sy}" stroke="${C.muted}" stroke-dasharray="4 4"/>
<path d="${path(1, km)}" fill="none" stroke="${C.navy}" stroke-width="3"/>
<path d="${path(1, kmc)}" fill="none" stroke="${C.teal}" stroke-width="3" stroke-dasharray="9 5"/>
<path d="${path(vn, km)}" fill="none" stroke="${C.orange}" stroke-width="3" stroke-dasharray="3 4"/>
${o.bare ? '' : T(560, y0 - sy - 8, 'ohne Inhibitor', { size: 12, anchor: 'end' }) + T(560, y0 - 0.86 * sy, 'kompetitiv', { size: 12, anchor: 'end', fill: C.teal }) + T(560, y0 - vn * sy + 18, 'nicht-kompetitiv', { size: 12, anchor: 'end', fill: C.orange }) + T(320, 370, 'Substratkonzentration c(S)', { size: 14 }) + `<text x="22" y="180" font-size="14" fill="${C.navy}" font-weight="600" text-anchor="middle" transform="rotate(-90 22 180)">Reaktionsgeschwindigkeit v</text>`}`;
    },
    slots: [
      { key: 'ohne', label: 'ohne Inhibitor', x: 230, y: 96 },
      { key: 'komp', label: 'mit kompetitivem Inhibitor', x: 330, y: 140 },
      { key: 'nk', label: 'mit nicht-kompetitivem Inhibitor', x: 400, y: 226 },
      { key: 'vmax', label: 'vmax (ohne / kompetitiv)', x: 40, y: 70 },
      { key: 'vmaxn', label: 'verringerte vmax', x: 40, y: 212 },
      { key: 'km', label: 'KM (ohne / nicht-kompetitiv)', x: 125, y: 352 },
      { key: 'kmc', label: 'erhöhter KM (kompetitiv)', x: 171, y: 296 }
    ]
  };

  /* ---------- Rendering-Helfer ---------- */
  function svgFor(id, opts) {
    const f = F[id];
    return `<svg viewBox="${f.viewBox}" class="model" role="img" aria-label="${f.title}">${f.render(opts || {})}</svg>`;
  }

  window.BIO = window.BIO || {};
  BIO.figures = F;
  BIO.models = { C, hex, T, pl, plRot, enzymePath, lactose, arrowDefs, svgFor, nextId, hlRect, mmPath };
})();
