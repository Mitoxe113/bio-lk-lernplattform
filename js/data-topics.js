/* =========================================================================
   Lerninhalte: 10 Themen der Checkliste (verbindliches Inhaltsverzeichnis)
   Aufbau wie die Unterrichtsaufschriebe: Begriff – Erklärung, Abbildung mit
   Notizen daneben, kurze Listen. Grundlage: Checkliste, Natura Kursstufe
   S. 12–41 und die Aufschriebe aus dem Unterricht (gekennzeichnet).
   Buchabbildungen werden NICHT mitgeliefert (siehe book.js); ohne
   verknüpftes Buch erscheinen an ihrer Stelle eigene Zeichnungen.
   ========================================================================= */
(function () {
  const box = (cls, title, html) => `<div class="box ${cls}"><div class="box-title">${title}</div>${html}</div>`;
  const EXTRA = (html) => box('extra', 'Ergänzung (steht nicht im Buch)', html);
  const CLASS = (html) => box('note', 'Aus dem Unterricht', html);
  const NOTE = (html) => box('missing', 'Hinweis zum Material', html);
  const BF = (id) => `<div data-bookfig="${id}"></div>`;

  // Bausteine im Stil der Aufschriebe
  const mk = (txt, c) => `<span class="mk ${c || 't'}">${txt}</span>`;
  const D = (term, html, c) => `<div class="nrow"><div class="nterm">${mk(term, c)}</div><div class="ndef">${html}</div></div>`;
  const H = (txt) => `<h3 class="nh">${txt}</h3>`;
  const L = (arr) => `<ul class="dash">${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const OL = (arr) => `<ol class="nsteps">${arr.map(x => `<li>${x}</li>`).join('')}</ol>`;
  const FRAME = (arr) => `<div class="nframe"><ol>${arr.map(x => `<li>${x}</li>`).join('')}</ol></div>`;
  const FIG = (id, notes) => `<div class="figrow">${BF(id)}<div class="fignotes">${L(notes)}</div></div>`;
  const FIGS = (...ids) => `<div class="bookfigs">${ids.map(BF).join('')}</div>`;
  const CMP = (a, b) => `<div class="ncmp">${[a, b].map(x => `<div><h4>${mk(x[0], x[2] || 't')}</h4>${L(x[1])}</div>`).join('')}</div>`;
  const tree = (node) => `<li><span>${node[0]}</span>${node[1] ? `<ul>${node[1].map(tree).join('')}</ul>` : ''}</li>`;
  const TREE = (node) => `<div class="ntree-wrap"><ul class="ntree">${tree(node)}</ul></div>`;
  const U = ' <span class="tag u">Unterricht</span>';
  const E = ' <span class="tag e">Ergänzung</span>';

  // eigene Skizze: Exo- und Endocytose in drei Schritten (wie im Aufschrieb)
  function vesSketch(mode) {
    const ink = '#3b3a8f', pink = '#f6c1cf';
    const mem = (d) => `<path d="${d}" fill="none" stroke="${ink}" stroke-width="11" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${pink}" stroke-width="7" stroke-linecap="round"/>`;
    const dots = (pts) => pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="${ink}"/>`).join('');
    const ves = (cx) => `<circle cx="${cx}" cy="85" r="28" fill="#fff" stroke="${ink}" stroke-width="2"/>`;
    const txt = (x, y, s, a) => `<text x="${x}" y="${y}" font-size="13" fill="${ink}" text-anchor="${a || 'middle'}">${s}</text>`;
    let p;
    if (mode === 'exo') {
      p = [
        ves(62) + dots([[55, 78], [70, 84], [58, 95]]) + mem('M135,12 V158'),
        mem('M135,12 V50 C135,62 96,52 96,85 C96,118 135,108 135,120 V158') + dots([[114, 78], [120, 92], [110, 96]]),
        mem('M120,12 V158') + dots([[160, 70], [176, 88], [158, 104]])
      ];
    } else {
      p = [
        mem('M75,12 V158') + dots([[34, 70], [48, 88], [30, 104]]),
        mem('M75,12 V50 C75,62 114,52 114,85 C114,118 75,108 75,120 V158') + dots([[92, 78], [98, 92], [88, 96]]),
        mem('M75,12 V158') + ves(140) + dots([[133, 78], [148, 84], [136, 95]])
      ];
    }
    const lab = mode === 'exo' ? ['1. Vesikel', '2. Verschmelzung', '3. Abgabe'] : ['1. Teilchen außen', '2. Einstülpung', '3. Abschnürung'];
    const sides = mode === 'exo' ? ['Zellinneres', 'extrazellulärer Raum'] : ['extrazellulärer Raum', 'Zellinneres'];
    return `<figure class="sketch"><svg viewBox="0 0 600 200" role="img" aria-label="${mode === 'exo' ? 'Exocytose' : 'Endocytose'} in drei Schritten">${p.map((g, i) => `<g transform="translate(${i * 200},0)">${g}${txt(100, 186, lab[i])}</g>`).join('')}</svg><figcaption>eigene Skizze · links: ${sides[0]}, rechts: ${sides[1]}</figcaption></figure>`;
  }

  window.BIO = window.BIO || {};
  BIO.helpers = { EXTRA, CLASS, NOTE, BF, D, H, L };

  BIO.topics = [
  /* ===================================================================== 1 */
  {
    id: 't1', nr: 1, title: 'Aufbau von Aminosäuren und Peptidbindung', pages: '12',
    short: 'α-Aminosäuren und Peptidbindung',
    goals: [
      { id: 't1g1', text: 'Die chemische Grundstruktur einer α-Aminosäure darstellen und Aminogruppe, Carboxylgruppe, H-Atom sowie variablen Rest am zentralen α-C-Atom zuordnen.' },
      { id: 't1g2', text: 'Die Bildung einer Peptidbindung zwischen zwei Aminosäuren durch eine Kondensationsreaktion herleiten und zeichnerisch darstellen.' }
    ],
    terms: ['Peptid', 'Aminogruppe', 'Carboxylgruppe', 'Peptidbindung', 'Grundstruktur der Aminosäuren'],
    labs: ['aminoacid', 'peptide'],
    notes: `
${H('Grundstruktur von Aminosäuren')}
${FIG('s12-b3', [
  `${mk('Aminogruppe')} –NH<sub>2</sub>`,
  `${mk('Carboxygruppe', 'b')} –COOH (Checkliste: Carboxylgruppe)`,
  `${mk('Rest R', 'p')} – bei jeder Aminosäure anders`,
  'H-Atom',
  'alle vier sitzen am <b>α-C-Atom</b>'
])}
${D('α-Aminosäure', 'Jedes Protein besteht aus α-Aminosäuren. Alle haben die gleiche Grundstruktur, nur der Rest ist bei jeder Aminosäure anders. Lebewesen verwenden <b>20</b> Aminosäuren.')}
${D('Rest R', 'bestimmt die Eigenschaften: hydrophil oder hydrophob, sauer oder basisch (S. 12).', 'p')}
${H('Peptidbindung')}
${D('Kondensation', '–OH der Carboxygruppe und –H der Aminogruppe werden als <b>H<sub>2</sub>O abgespalten</b>.')}
${D('Peptidbindung', 'Danach verbinden sich das C-Atom der Carboxygruppe und das N-Atom der Aminogruppe: –CO–NH–. Die Peptidbindung sieht immer gleich aus, nur die Reste sind variabel.')}
${FIG('s12-b4', [
  'zwei Aminosäuren → <b>Dipeptid</b> + H<sub>2</sub>O',
  'links bleibt eine freie Aminogruppe (N-Ende)',
  'rechts bleibt eine freie Carboxygruppe (C-Ende)',
  'an der Bindung ist der Rest <b>nicht</b> beteiligt'
])}
${D('Peptid / Protein', 'Peptid: Kette unter ca. 100 Aminosäuren. Protein: meist 100–600 Aminosäuren (S. 12).')}
${D('Vielfalt', 'An jeder Stelle kann eine von 20 Aminosäuren stehen → 20<sup>n</sup> mögliche Ketten aus n Aminosäuren.')}
${D('Aufgaben der Proteine', 'Gerüst, Schutz, Bewegung, Transport, Katalyse, Regulation, Informationsaufnahme (S. 12, B2).')}
${BF('s12-b2')}
${CLASS('<p>Dipeptid aus Glycin und Cystein: Glycin hat als Rest nur ein H-Atom (H<sub>2</sub>N–CH<sub>2</sub>–COOH), Cystein den Rest –CH<sub>2</sub>–SH.</p>')}`,
    exam: [
      'Strukturformel einer α-Aminosäure zeichnen und die vier Bindungspartner des α-C-Atoms beschriften.',
      'Kondensation zweier Aminosäuren zeichnen: abgespaltene Atome markieren, H<sub>2</sub>O angeben, Peptidbindung kennzeichnen.',
      'Anzahl möglicher Peptide berechnen, z. B. 7 Aminosäuren: 20<sup>7</sup> (S. 13, Aufgabe 1).'
    ],
    draw: ['Zwei Aminosäuren nebeneinander zeichnen, Carboxygruppe von AS 1 neben Aminogruppe von AS 2.', 'OH und H einkreisen.', 'Pfeil mit „Kondensation“, Produkt H<sub>2</sub>O angeben.', 'Dipeptid zeichnen und die Peptidbindung –CO–NH– markieren.'],
    errors: [
      ['Bei der Peptidbindung wird Wasser aufgenommen.', 'Wasser wird abgespalten (Kondensation).'],
      ['Der Rest R ist an der Peptidbindung beteiligt.', 'Es reagieren nur Carboxy- und Aminogruppe.'],
      ['H₂N–CH₂–COOH ist Cystein.', 'Das ist Glycin (Rest = H). Cystein hat den Rest –CH₂–SH.', true],
      ['„Ch₂“', 'CH₂ – Elementsymbole korrekt schreiben.', true]
    ],
    selfcheck: [
      ['Nenne die vier Bindungspartner des α-C-Atoms.', 'Aminogruppe, Carboxygruppe, H-Atom, Rest R.'],
      ['Woraus entsteht das abgespaltene Wasser?', 'Aus der OH-Gruppe der Carboxygruppe und einem H-Atom der Aminogruppe.'],
      ['Wie viele Peptide aus 7 Aminosäuren sind möglich?', '20⁷ ≈ 1,28 · 10⁹'],
      ['Worin unterscheiden sich die Aminosäuren?', 'Nur im Rest R.']
    ]
  },

  /* ===================================================================== 2 */
  {
    id: 't2', nr: 2, title: 'Strukturebenen der Proteine', pages: '13',
    short: 'Primär-, Sekundär-, Tertiär- und Quartärstruktur',
    goals: [
      { id: 't2g1', text: 'Ausgehend von der Aminosäuresequenz erklären, wie sich Primär-, Sekundär-, Tertiär- und Quartärstruktur eines Proteins ausbilden.' },
      { id: 't2g2', text: 'Die Bedeutung der Wechselwirkungen zwischen den Peptidgruppen sowie zwischen den Aminosäureresten für die Entstehung der räumlichen Strukturen erläutern.' }
    ],
    terms: ['Primärstruktur', 'Sekundärstruktur', 'α-Helix', 'β-Faltblatt', 'Tertiärstruktur', 'Quartärstruktur', 'Wasserstoffbrückenbindungen', 'Kovalente Bindungen', 'Disulfidbrücken'],
    labs: ['protein'],
    notes: `
${D('Primärstruktur', 'Aminosäuren sind über Peptidbindungen zu einer Kette verbunden. Die Reihenfolge der Aminosäuren ist die <b>Aminosäuresequenz</b>. Anfang: N-Ende (freie Aminogruppe), Ende: C-Ende (freie Carboxygruppe).')}
${BF('s13-b5')}
${D('Sekundärstruktur', 'Die Kette faltet sich zu zwei Arten von geometrischen Strukturen. Grund: <b>Wasserstoffbrücken zwischen den Peptidgruppen</b> (C=O und N–H) des Rückgrats.')}
${CMP(['α-Helix (Spirale)', ['H-Brücken zwischen Peptidgruppen <b>innerhalb</b> eines Kettenabschnitts', 'schraubenförmig', 'Reste ragen nach außen']],
      ['β-Faltblatt', ['H-Brücken zwischen Peptidgruppen <b>nebeneinanderliegender</b> Kettenabschnitte', 'gefaltet wie ein Blatt', 'Reste abwechselnd nach oben und unten'], 'b'])}
${BF('s13-b6')}
${D('Tertiärstruktur', 'Vollständige dreidimensionale Form der Kette: ineinander verknäuelte Sekundärstrukturen. Das Knäuel entsteht durch Wechselwirkungen <b>zwischen den Resten</b> der Aminosäuren:')}
${FRAME(['Wasserstoffbrücken', 'Ionenbindungen', 'Van-der-Waals-Kräfte', 'Disulfidbrücken (–S–S– zwischen zwei Cystein-Resten, kovalent)'])}
${BF('s13-b7')}
${D('Quartärstruktur', 'Proteinkomplex aus mehreren Ketten mit jeweils eigener Tertiärstruktur. Beispiel <b>Hämoglobin</b>: vier Ketten mit je einer Häm-Gruppe → Sauerstofftransport.')}
${BF('s13-b8')}
${D('Struktur → Funktion', 'Die Raumstruktur bestimmt die Aufgabe des Proteins (S. 13). Wird sie zerstört, geht die Funktion verloren (Denaturierung, Thema 9). Die Primärstruktur bleibt dabei erhalten.', 'p')}
${EXTRA('<p><b>Kovalente Bindungen</b> (Begriff der Checkliste) sind Elektronenpaarbindungen. Im Protein sind die Peptidbindungen und die Disulfidbrücken kovalent und deutlich stabiler als H-Brücken, Ionenbindungen und Van-der-Waals-Kräfte.</p>')}`,
    exam: [
      'Die vier Strukturebenen definieren und jeweils die beteiligten Bindungen nennen (S. 13, Aufgabe 2).',
      'Unterscheiden: H-Brücken zwischen Peptidgruppen (Sekundärstruktur) und Wechselwirkungen zwischen Resten (Tertiärstruktur).',
      'Hämoglobin als Beispiel für eine Quartärstruktur erläutern.'
    ],
    errors: [
      ['β-Faltblatt: H-Brücken „zwischen Resten der Aminosäuren“.', 'Auch beim β-Faltblatt bilden sich die H-Brücken zwischen den Peptidgruppen (C=O und N–H), hier zwischen nebeneinanderliegenden Kettenabschnitten. Wechselwirkungen zwischen Resten gehören zur Tertiärstruktur.', true],
      ['α-Helix: H-Brücken „zwischen Aminogruppe und Carboxygruppe von Aminosäuren“.', 'In der Kette sind diese Gruppen schon in Peptidbindungen verbaut. Die H-Brücken bilden sich zwischen C=O und N–H der Peptidgruppen.', true],
      ['Disulfidbrücken sind Wasserstoffbrücken.', 'Disulfidbrücken sind kovalente S–S-Bindungen.'],
      ['Jedes Protein hat eine Quartärstruktur.', 'Nur Proteine aus mehreren Ketten.']
    ],
    selfcheck: [
      ['Welche Gruppen bilden die H-Brücken der Sekundärstruktur?', 'Die Peptidgruppen (C=O und N–H) des Rückgrats.'],
      ['Nenne die vier Wechselwirkungen der Tertiärstruktur.', 'H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte, Disulfidbrücken.'],
      ['Was versteht man unter Quartärstruktur?', 'Mehrere Proteinketten mit eigener Tertiärstruktur bilden einen Komplex, z. B. Hämoglobin.']
    ]
  },

  /* ===================================================================== 3 */
  {
    id: 't3', nr: 3, title: 'Phospholipide und Aufbau der Biomembran', pages: '14–15',
    short: 'Lipide, Phospholipide und Modell der Biomembran',
    goals: [
      { id: 't3g1', text: 'Die Eigenschaften von Phospholipiden kennen und daraus die Entstehung und den Aufbau einer Phospholipid-Doppelschicht ableiten.' },
      { id: 't3g2', text: 'Das Modell einer Biomembran mit seinen wesentlichen Bestandteilen zeichnen und beschriften.' },
      { id: 't3g3', text: 'Die Struktur und Funktion der einzelnen Membranbestandteile erläutern.' }
    ],
    terms: ['Lipide', 'Fettmoleküle', 'Fettsäuren', 'Phospholipide', 'Biomembran', 'integrale Proteine', 'periphere Proteine', 'Zytoskelett', 'Kohlenhydrate'],
    labs: ['phospholipid', 'membrane'],
    notes: `
${TREE(['<b>Lipide</b><br><small>hydrophobe Naturstoffe (stoßen Wasser ab)</small>', [['<b>Fettsäuren</b><br><small>Kohlenwasserstoffkette + Carboxygruppe</small>'], ['<b>Fette</b><br><small>3 Fettsäuren + 1 Glycerin</small>'], ['<b>Phospholipide</b><br><small>2 Fettsäuren + Glycerin + Phosphatgruppe</small>']]])}
${D('Fettsäure', 'Lange Kohlenwasserstoffkette mit Carboxygruppe (–COOH) am Ende. Gesättigt: ohne Doppelbindungen; ungesättigt: mit Doppelbindungen.')}
${D('Fett', 'Glycerin bindet über seine drei OH-Gruppen an die Carboxygruppen von drei Fettsäuren; dabei wird Wasser abgespalten. Rückreaktion: Hydrolyse. Fette sind Energiespeicher und Kälteschutz (z. B. bei Robben).')}
${BF('s14-b1')}
${H('Phospholipide')}
${D('Bausteine', '2 Fettsäuren, 1 Glycerin (C<sub>3</sub>H<sub>8</sub>O<sub>3</sub>), 1 Phosphatgruppe, 1 weiterer Rest an der Phosphatgruppe (beim Lecithin: Cholin).')}
${FIG('s14-b4', [
  `${mk('hydrophiler Kopf')}: Phosphatgruppe mit Rest (wasserliebend)`,
  `${mk('hydrophobe Schwänze', 'b')}: die beiden Fettsäurereste`,
  `amphiphil: Wasser wird zugleich angezogen und abgestoßen${U}`
])}
${D('Orientierung in Wasser', `${L(['Film an der Oberfläche: Köpfe im Wasser, Schwänze in die Luft', 'durch Schütteln: kugelförmige Tröpfchen (<b>Micellen</b>), Schwänze innen'])}`)}
${FIGS('s14-b2', 's14-b3')}
${H('Biomembran')}
${D('Warum eine Doppelschicht?', 'Wässrige Umgebung außerhalb der Zelle (extrazellulärer Raum) und innerhalb (Cytoplasma). Deshalb zeigen die Köpfe zu beiden Seiten zum Wasser, die Schwänze liegen innen zusammen.', 'p')}
${D('Lipiddoppelschicht', 'Bildet die Biomembran und grenzt die Zelle gegenüber dem extrazellulären Raum ab.')}
${FIG('s15-b2', [
  `${mk('integrales Protein')}: geht durch die Membran oder steckt darin; z. B. Kanal, Carrier, Rezeptor für Signale${U}`,
  `${mk('peripheres Protein', 'b')}: liegt an Lipiden oder Proteinen an, arbeitet z. B. als Enzym${U}`,
  `${mk('Kohlenhydratketten', 'p')}: nur außen; bilden den Kohlenhydratmantel (Glykokalyx), Zellen erkennen sich daran`,
  `${mk('Cholesterin')}: bis 25 % in tierischen Membranen; hält die Membran bei Kälte beweglich`,
  `${mk('Filamente des Cytoskeletts', 'b')}: innen; stabilisieren die Zelle, verankern Organellen, Transport${U}`
])}
${BF('s15-b1')}
${NOTE('<p>Was das Cytoskelett an der Membran leistet, zeigt S. 15 nur in der Abbildung; die Aufgaben oben stammen aus dem Unterricht.</p>')}`,
    exam: [
      'Unterschied zwischen Fettsäure und Fett erklären (S. 14, Aufgabe 1).',
      'Begründen, warum Phospholipide sich zum Aufbau von Membranen eignen (S. 14, Aufgabe 2).',
      'Erläutern, wie sich hydrophile und hydrophobe Anteile auf den Aufbau der Membran auswirken (S. 15, Aufgabe 2).',
      'Hypothese, warum manche Proteine die Membran durchspannen (S. 15, Aufgabe 3): Ihr hydrophober Mittelteil liegt im Inneren der Doppelschicht.',
      'Modell der Biomembran zeichnen und beschriften.'
    ],
    draw: ['Zwei Reihen Phospholipide: Köpfe außen, Schwänze innen.', 'Integrale Proteine (eines als Kanal) und ein peripheres Protein einzeichnen.', 'Kohlenhydratketten nur außen, Cholesterin zwischen die Lipide, Cytoskelett innen.', 'Extrazellulären Raum und Cytoplasma beschriften.'],
    errors: [
      ['Die Fettsäureschwänze zeigen zum Wasser.', 'Die hydrophilen Köpfe zeigen zum Wasser, die Schwänze nach innen.'],
      ['Kohlenhydrate liegen auf beiden Seiten der Membran.', 'Sie sitzen nur auf der Außenseite (Glykokalyx).'],
      ['Fett und Fettsäure sind dasselbe.', 'Ein Fett besteht aus Glycerin und drei Fettsäuren.']
    ],
    selfcheck: [
      ['Warum bilden Phospholipide im Wasser eine Doppelschicht?', 'Die hydrophoben Schwänze lagern sich zusammen, die hydrophilen Köpfe zeigen zum Wasser.'],
      ['Unterscheide integrale und periphere Proteine.', 'Integrale stecken in der Membran oder durchspannen sie; periphere liegen nur an.'],
      ['Welche Aufgabe haben die Kohlenhydratketten?', 'Erkennung von Zellen (Glykokalyx).']
    ]
  },

  /* ===================================================================== 4 */
  {
    id: 't4', nr: 4, title: 'Transportvorgänge durch Biomembranen', pages: '20–21',
    short: 'Passiver und aktiver Transport, Glucoseaufnahme im Darm',
    goals: [
      { id: 't4g1', text: 'Unterschiedliche Transportmechanismen durch Biomembranen erklären und zwischen passiven und aktiven Vorgängen unterscheiden.' },
      { id: 't4g2', text: 'Die Transportrichtung in Abhängigkeit von Konzentrationsunterschieden erläutern und begründen, wann Energie in Form von ATP benötigt wird.' },
      { id: 't4g3', text: 'Komplexere Transportvorgänge, z. B. den Glucosetransport aus dem Darm ins Blut, schrittweise erklären.' }
    ],
    terms: ['Einfache Diffusion', 'kanalvermittelte Diffusion', 'carriervermittelte Diffusion', 'primär aktiver Transport', 'sekundär aktiver Transport', 'Symport', 'Antiport'],
    labs: ['transport', 'glucose'],
    notes: `
${TREE(['<b>Membrantransport</b>', [
  ['<b>passiver Transport</b><br><small>mit dem Gefälle, kein ATP</small>', [['einfache Diffusion'], ['erleichterte Diffusion<br><small>Kanal / Carrier</small>']]],
  ['<b>aktiver Transport</b><br><small>gegen das Gefälle, Energie (ATP)</small>', [['Pumpen<br><small>primär / sekundär aktiv</small>'], ['Vesikel<br><small>Exo- / Endocytose → Thema 5</small>']]]
]])}
${BF('s20-b1')}
${H('Passiver Transport: von hoher zu niedriger Konzentration')}
${D('Einfache Diffusion', 'Kleine Moleküle wie Sauerstoff (O<sub>2</sub>) und Kohlenstoffdioxid (CO<sub>2</sub>) diffundieren ungehindert durch die Lipiddoppelschicht, <b>von hoher zu niedriger Konzentration</b>. Wasser nur langsam; schnell durch Wasserkanäle (Aquaporine).')}
${D('Erleichterte Diffusion', `Gleiches Prinzip (mit dem Gefälle), aber über Transportproteine:${L(['<b>kanalvermittelt:</b> für Ionen (Natrium, Kalium, Chlorid, Calcium); Kanal lässt nur eine Teilchensorte durch (Größe, Ladung)', '<b>carriervermittelt:</b> für größere Moleküle wie Glucose; der Carrier hat eine Bindungsstelle'])}`)}
${D('Uniport · Symport · Antiport', `${L([`Uniport: ein Stoff wird in eine Richtung transportiert${U}`, 'Symport: zwei Stoffe gleichzeitig in die gleiche Richtung', 'Antiport: zwei Stoffe gleichzeitig in entgegengesetzte Richtungen'])}`, 'b')}
${H('Aktiver Transport: gegen das Konzentrationsgefälle')}
${D('primär aktiver Transport', 'Ionenpumpen schleusen Ionen <b>gegen</b> das Konzentrationsgefälle durch die Membran (von niedrig zu hoch). Dafür brauchen sie direkt ATP. Beispiel: Natrium-Kalium-Pumpe (Na<sup>+</sup> hinaus, K<sup>+</sup> hinein).')}
${D('sekundär aktiver Transport', 'Stoffe werden ebenfalls gegen ihr Gefälle transportiert, ATP wird aber nur <b>indirekt</b> benötigt: gekoppelt an den <b>primär aktiven</b> Transport. Die Pumpe hält Na<sup>+</sup> in der Zelle niedrig; Na<sup>+</sup> diffundiert mit seinem Gefälle über ein Carrier-Protein zurück in die Zelle und nimmt dabei z. B. Glucose mit.', 'p')}
${H('Glucose aus dem Darm ins Blut')}
${FIG('s21-b2', [
  `${mk('Na<sup>+</sup>-Glucose-Symporter')} (Carrier, sekundär aktiv): Glucose aus dem Darmlumen in die Zelle, gegen ihr Gefälle, zusammen mit Na<sup>+</sup>`,
  `${mk('Ionenpumpe', 'b')} (primär aktiv, Antiport, ATP): Na<sup>+</sup> hinaus, K<sup>+</sup> hinein → Na<sup>+</sup> in der Zelle bleibt niedrig`,
  `${mk('Carrier', 'p')} (erleichterte Diffusion): Glucose verlässt die Zelle mit ihrem Gefälle und gelangt ins Blut`
])}
${D('Messdaten B3', 'Mit Na<sup>+</sup> bindet Glucose etwa neunmal häufiger an den Symporter (ca. 9 % statt ca. 1 %). Der Symporter arbeitet nur gekoppelt an Na<sup>+</sup> effektiv.')}
${BF('s21-b3')}
${CLASS('<p>Arbeitsblatt „Schwierigkeiten bei der Nährstoff-Resorption“: Viele Nährstoffe gelangen durch erleichterte Diffusion in die Darmzellen, Wasser über Aquaporine. Glucose wird sekundär aktiv aufgenommen, weil sie in der Zelle höher konzentriert ist als im Darmlumen.</p>')}`,
    exam: [
      'Aktiven und passiven Transport unterscheiden (S. 21, Aufgabe 1).',
      'Messdaten in B3 auswerten (S. 21, Aufgabe 2): Na<sup>+</sup> erhöht die Bindung der Glucose an den Symporter stark.',
      'Begründen, warum drei Transporter nötig sind (S. 21, Aufgabe 3).',
      'Glucosetransport schrittweise mit Fachbegriffen und Konzentrationsangaben beschreiben.'
    ],
    errors: [
      ['Einfache Diffusion: „von niedriger zu hoher Konzentration“.', 'Umgekehrt: Diffusion verläuft immer von hoher zu niedriger Konzentration. Von niedrig nach hoch geht nur aktiver Transport.', true],
      ['„Kohlenstoff (CO₂)“', 'CO₂ ist Kohlenstoffdioxid.', true],
      ['„Sekundärer Transport erfolgt in Kopplung mit dem sekundären Transport.“', 'Er ist an den primär aktiven Transport gekoppelt (Ionenpumpe, ATP).', true],
      ['Bei jedem aktiven Transport wird ATP direkt verbraucht.', 'Nur beim primär aktiven Transport. Beim sekundär aktiven Transport ist ATP nur indirekt beteiligt.', true],
      ['„Na⁺ möchte in die Zelle“', 'Sachlich formulieren: Na⁺ diffundiert mit seinem Konzentrationsgefälle in die Zelle.', true],
      ['Glucose gelangt per Pumpe ins Blut.', 'Sie verlässt die Darmzelle passiv über einen Carrier.']
    ],
    selfcheck: [
      ['Warum ist der Na⁺-Glucose-Symporter sekundär aktiv?', 'Er transportiert Glucose gegen ihr Gefälle; die Energie stammt aus dem Na⁺-Gefälle, das die ATP-getriebene Pumpe aufbaut.'],
      ['Welche Aufgabe hat die Natrium-Kalium-Pumpe beim Glucosetransport?', 'Sie hält die Na⁺-Konzentration in der Darmzelle niedrig.'],
      ['Wie gelangt Wasser schnell durch die Membran?', 'Durch Aquaporine.']
    ]
  },

  /* ===================================================================== 5 */
  {
    id: 't5', nr: 5, title: 'Endozytose, Exozytose und Membranfluss', pages: '22–23',
    short: 'Vesikeltransport, Eisenaufnahme, Insulin',
    goals: [
      { id: 't5g1', text: 'Endozytose und Exozytose anhand geeigneter Beispiele darstellen und erläutern.' },
      { id: 't5g2', text: 'Am Beispiel der rezeptorvermittelten Endozytose von Eisenionen die einzelnen Schritte der Stoffaufnahme erklären.' },
      { id: 't5g3', text: 'Die Bedeutung von Rezeptoren, Membranabschnürung, Membranfluss und pH-Wert-Veränderungen herausarbeiten.' }
    ],
    terms: ['Endozytose', 'Exozytose', 'Rezeptor', 'rezeptorvermittelte Endozytose', 'Membranabschnürung', 'Membranfluss', 'pH-Wert'],
    labs: ['endocytosis', 'exocytosis'],
    notes: `
${D('Exozytose', 'Ein Vesikel verschmilzt mit der Zellmembran und gibt seinen Inhalt in den extrazellulären Raum ab. Vesikel haben auch eine Lipiddoppelschicht und können deshalb mit der Zellmembran verschmelzen.')}
${vesSketch('exo')}
${D('Beispiel', 'Ausschüttung von Insulin durch die Zellen der Bauchspeicheldrüse.', 'b')}
${D('Endozytose', 'Die Zellmembran stülpt sich ein und schnürt sich als Vesikel ab (<b>Membranabschnürung</b>). So gelangen Stoffe ins Zellinnere.')}
${vesSketch('endo')}
${D('Beispiel', 'Aufnahme von Eisen durch Zellen.', 'b')}
${D('Membranfluss', `Über Vesikel wandert Membranmaterial zwischen Zellmembran und Kompartimenten. Bei der Endozytose wird Membranfläche abgebaut, bei der Exozytose nachgeliefert – im Gleichgewicht bleibt die Fläche der Zellmembran gleich${U}.`, 'p')}
${H('Rezeptorvermittelte Endozytose (Eisen)')}
${FIG('s22-b1', [
  `Eisen-Ionen sind für die Zelle lebensnotwendig`,
  `${mk('Transferrin')} (Transportprotein) bindet Eisen im Blut (pH 7,4)`,
  `der Eisen-Transferrin-Komplex bindet an den ${mk('Transferrinrezeptor', 'b')} → Signal`,
  `${mk('Clathrin', 'p')}-Hülle stabilisiert die Einstülpung (clathrin coated pit), das Vesikel löst sich und wandert in die Zelle`,
  'Clathrin löst sich ab',
  `Ionenpumpe pumpt H<sup>+</sup>-Ionen ins Vesikel → pH sinkt auf 5,5${U}`,
  'niedriger pH löst das Eisen vom Transferrin',
  `Eisen verlässt das Vesikel durch erleichterte Diffusion${U}`,
  'Vesikel wandert zurück zur Zellmembran (Exozytose); bei pH 7,4 löst sich Transferrin vom Rezeptor'
])}
${D('Rezeptor', 'Membranprotein, das einen bestimmten Stoff bindet. Erst nach der Bindung schnürt sich die Membran ein → gezielte Aufnahme, auch bei sehr geringer Konzentration.')}
${NOTE('<p>Der Buchtext beschreibt die Schritte bis zur Abschnürung. pH-Werte und Rückweg zeigt nur die Abbildung; wie die Ansäuerung entsteht (Ionenpumpe), stammt aus dem Unterricht.</p>')}
${H('Membranfluss am Beispiel Insulin (S. 23)')}
${D('Freisetzung', `${OL(['Insulin wird in den β-Zellen der Bauchspeicheldrüse am ER als Vorstufe gebildet.', 'Vesikel bringen es zum Golgi-Apparat.', 'Von dort gelangt es in Vesikeln zur Zellmembran → Exozytose ins Blut.'])}`)}
${BF('s23-b1')}
${D('Wirkung auf Körperzellen', `${OL(['Insulin bindet an einen Rezeptor → Signalkette.', 'Von einem Speichervesikel schnüren sich kleine Vesikel mit Glucose-Transportern ab.', 'Sie verschmelzen mit der Zellmembran → mehr Transporter in der Membran (<b>Membranfluss</b>), bis zu 50-fache Glucoseaufnahme.', 'Später werden die Transporter durch Endozytose wieder aufgenommen.'])}`)}
${BF('s23-b2')}`,
    exam: [
      'Notwendigkeit der pH-Wert-Änderung im Endocytosevesikel erklären (S. 22, Aufgabe 1).',
      'Begründen, warum rezeptorvermittelte Endocytose bei geringer Konzentration vorteilhaft ist (S. 22, Aufgabe 2).',
      'Synthese und Vesikeltransport von Insulin beschreiben (S. 23, Aufgabe 1).',
      'Glucoseaufnahme mithilfe von Insulin erläutern und den Begriff Membranfluss erklären (S. 23, Aufgaben 2 und 4).'
    ],
    errors: [
      ['„Ionenpumpe pumpt Wasserstoff in die Vesikel.“', 'Gepumpt werden H⁺-Ionen (Protonen), kein Wasserstoff. Mehr H⁺ bedeutet einen niedrigeren pH-Wert.', true],
      ['Endocytose: Vesikel verschmilzt mit der Zellmembran.', 'Das ist Exocytose. Bei der Endocytose stülpt sich die Membran ein und schnürt sich ab.'],
      ['Insulin gelangt selbst in die Zelle und transportiert Glucose.', 'Insulin bindet an einen Rezeptor und löst eine Signalkette aus. Dadurch kommen Glucose-Transporter in die Membran.']
    ],
    selfcheck: [
      ['Welche Rolle spielt der Rezeptor bei der Eisenaufnahme?', 'Er bindet das beladene Transferrin; erst dann wird das Vesikel gebildet.'],
      ['Warum muss der pH-Wert im Vesikel sinken?', 'Nur bei niedrigem pH löst sich das Eisen vom Transferrin.'],
      ['Was ist Membranfluss?', 'Membranmaterial wird über Vesikel zwischen Kompartimenten und Zellmembran ausgetauscht.']
    ]
  },

  /* ===================================================================== 6 */
  {
    id: 't6', nr: 6, title: 'Struktur und Wirkungsweise von Enzymen', pages: '26–27',
    short: 'Aktivierungsenergie, aktives Zentrum, Cofaktoren',
    goals: [
      { id: 't6g1', text: 'Aufbau und Wirkungsweise von Enzymen erklären und erläutern, wie sie die Aktivierungsenergie einer chemischen Reaktion herabsetzen.' },
      { id: 't6g2', text: 'Einen katalytischen Zyklus mit Enzym, Substrat, Enzym-Substrat-Komplex und Produkt skizzieren und erläutern.' },
      { id: 't6g3', text: 'Die Bedeutung von Kofaktoren erklären und zwischen vorübergehend gebundenen Cosubstraten und fest gebundenen prosthetischen Gruppen unterscheiden.' }
    ],
    terms: ['Aktivierungsenergie', 'Enzym-Substrat-Komplex', 'aktives Zentrum', 'katalytischer Zyklus', 'Kofaktoren', 'Cosubstrat', 'prosthetische Gruppe'],
    labs: ['catalysis'],
    notes: `
${FIG('s26-b1', [
  `${mk('aktives Zentrum')} = Ort der Katalyse (hier: Spaltung); bindet das Substrat`,
  'Substrat Lactose + Enzym → <b>Enzym-Substrat-Komplex</b>',
  'Produkte: Glucose + Galactose lösen sich ab',
  'das Enzym liegt unverändert vor → nächster Zyklus'
])}
${D('Enzym', 'Protein, das eine Reaktion beschleunigt (Biokatalysator). Es wird dabei nicht verbraucht, deshalb reichen geringe Mengen.')}
${D('Katalyse', 'Beschleunigung einer biochemischen Reaktion durch <b>Senkung der Aktivierungsenergie</b>. Eine geringe Aktivierungsenergie erleichtert das Lösen und Knüpfen chemischer Bindungen.')}
${H('Ablauf einer Katalyse')}
${FIG('s26-b2', [
  `${mk('Aktivierungsenergie')}: muss zugeführt werden, damit die Reaktion startet`,
  'mit Enzym kleiner (Übergangszustand über den Enzym-Substrat-Komplex)',
  'die frei werdende Energie ist mit und ohne Enzym <b>gleich</b>',
  'Enzyme liefern keine Energie'
])}
${D('Aktives Zentrum', 'Taschenförmige Vertiefung im Enzym. Aminosäurereste gehen mit dem Substrat Wechselwirkungen ein (Ionenbindungen, H-Brücken, Dipol-Dipol- und Van-der-Waals-Kräfte) und lockern Bindungen im Substrat.')}
${BF('s26-b3')}
${D('Katalytischer Zyklus', `${OL(['Enzym bindet Substrat → Enzym-Substrat-Komplex', 'Substrat reagiert bei niedriger Aktivierungsenergie', 'Produkte haben geringere Affinität und lösen sich', 'Enzym ist unverändert und bindet das nächste Substrat'])}`, 'b')}
${BF('s26-rand')}
${H('Cofaktoren')}
${D('Cofaktor', 'Oberbegriff für zusätzliche <b>Nicht-Protein-Komponenten</b> von Enzymen. Sie sind an das Enzym gebunden und unterstützen die Katalyse im aktiven Zentrum.')}
${TREE(['<b>Cofaktor</b>', [
  ['<b>anorganische Ionen</b><br><small>Metall-Ionen, z. B. Fe, Cu, Mn (Buch); Zn²⁺, Mg²⁺ (Unterricht)</small>'],
  ['<b>Coenzym</b><br><small>organisches Molekül</small>', [['<b>Cosubstrat</b><br><small>nur kurz (lose) gebunden, wird verändert, löst sich ab und wird regeneriert</small>'], ['<b>prosthetische Gruppe</b><br><small>dauerhaft fest gebunden, bleibt im Enzym</small>']]]
]])}
${BF('s27-b4')}
${D('Apoenzym / Holoenzym', 'Proteinteil allein / Proteinteil mit Cofaktor (Beschriftung in S. 27, B4).', 'p')}`,
    exam: [
      'Allgemeine Eigenschaften von Enzymen nennen (S. 27, Aufgabe 1).',
      'Erklären, warum mit Enzym weniger Aktivierungsenergie nötig ist (S. 27, Aufgabe 2).',
      'Begründen, warum geringe Enzymmengen ausreichen (S. 27, Aufgabe 3).',
      'Begründen, warum der Austausch einer Aminosäure im aktiven Zentrum die Funktion verändern kann (S. 27, Aufgabe 4).',
      'Prosthetische Gruppe und Cosubstrat unterscheiden.'
    ],
    draw: ['Enzym mit taschenförmigem aktiven Zentrum und passendes Substrat zeichnen.', 'Enzym-Substrat-Komplex zeichnen.', 'Produkte lösen sich, Pfeil zurück zum freien Enzym.', 'Enzym, Substrat, Enzym-Substrat-Komplex und Produkte beschriften.'],
    errors: [
      ['Coenzym = organische Moleküle „(Zucker, Aminosäuren …)“.', 'Coenzyme sind organische Nicht-Protein-Moleküle wie NAD⁺ (S. 33). Zucker oder einzelne Aminosäuren sind dafür keine Beispiele.', true],
      ['Cosubstrat „wird abgespalten“.', 'Genauer: Es ist nur kurz gebunden, wird bei der Reaktion verändert (nimmt z. B. H⁺-Ionen oder Elektronen auf), löst sich dann und wird in einer Folgereaktion regeneriert.', true],
      ['Enzyme liefern die Energie für die Reaktion.', 'Sie senken nur die Aktivierungsenergie.'],
      ['Reaktionen laufen ohne Enzym „nicht spontan“ ab.', 'Sie laufen viel langsamer ab. Die frei werdende Energie ändert das Enzym nicht.', true],
      ['Enzyme werden bei der Reaktion verbraucht.', 'Sie gehen unverändert aus der Reaktion hervor.']
    ],
    selfcheck: [
      ['Was zeigt das Energiediagramm (S. 26, B2)?', 'Mit Enzym ist die Aktivierungsenergie kleiner; die frei werdende Energie bleibt gleich.'],
      ['Warum lösen sich die Produkte vom Enzym?', 'Sie haben eine geringere Affinität zum Enzym als das Substrat.'],
      ['Unterscheide prosthetische Gruppe und Cosubstrat.', 'Prosthetische Gruppe: fest gebunden. Cosubstrat: kurzzeitig gebunden, wird verändert und regeneriert.']
    ]
  },

  /* ===================================================================== 7 */
  {
    id: 't7', nr: 7, title: 'Substrat- und Wirkungsspezifität von Enzymen', pages: '28–29',
    short: 'Schlüssel-Schloss-Prinzip und Induced-Fit-Modell',
    goals: [
      { id: 't7g1', text: 'Das Schlüssel-Schloss-Prinzip und das Induced-Fit-Modell erläutern.' },
      { id: 't7g2', text: 'Beide Modelle hinsichtlich der Bindung eines Substrates an das aktive Zentrum vergleichen.' },
      { id: 't7g3', text: 'Erklären, weshalb Enzyme substrat- und wirkungsspezifisch sind.' }
    ],
    terms: ['Enzym-Substrat-Komplex', 'Schlüssel-Schloss-Prinzip', 'Induced-Fit-Modell', 'substratspezifisch', 'wirkungsspezifisch'],
    labs: ['inducedfit'],
    notes: `
${D('substratspezifisch', 'Ein Enzym bindet im aktiven Zentrum nur ein bestimmtes Substrat, das in Größe, Form und Ladungsverteilung passt (z. B. Lactase nur Lactose).', 'p')}
${D('wirkungsspezifisch', 'Ein Enzym katalysiert mit dem Substrat nur eine ganz bestimmte Reaktion; es entstehen immer dieselben Produkte. Grund: die Aminosäurereste im aktiven Zentrum.')}
${D('zusammengefasst', 'Enzyme binden nur ein bestimmtes Substrat (<b>substratspezifisch</b>) und katalysieren nur eine bestimmte Reaktion (<b>wirkungsspezifisch</b>).', 'b')}
${BF('s28-b1')}
${H('Zwei Modelle für die Bindung zwischen Substrat und Enzym')}
${CMP(['Schlüssel-Schloss-Prinzip', ['Substrat (Schlüssel) passt genau zum aktiven Zentrum (Schloss)', 'starr, unveränderlich', 'perfekte Passform schon vor der Bindung', 'einfaches Einrasten, passive Aufnahme']],
      ['Induced-Fit-Modell', ['Substrat passt nicht von vornherein perfekt', 'bei der Bindung formt sich das aktive Zentrum um das Substrat', 'flexibel, anpassungsfähig; Konformationsänderung (Formänderung)', 'aktives Umschließen'], 'b'])}
${BF('s28-b2')}
${D('gemeinsam', 'In beiden Modellen bilden nur passende Substrate einen Enzym-Substrat-Komplex.', 'p')}
${CLASS('<p>Arbeitsblatt „Was ein Enzym so alles kann“: Bild C zeigt <b>Gruppenspezifität</b> – ein Enzym setzt verschiedene Substrate mit einem gleichen Molekülteil um. Der Begriff steht nicht im Buch.</p>')}`,
    exam: [
      'Induced-Fit-Modell und Schlüssel-Schloss-Prinzip vergleichen (S. 28, Aufgabe 1).',
      'Erklären, warum Lactase nur die Spaltung von Lactose katalysiert (S. 28, Aufgabe 2).',
      'Begründen, warum es im Körper mehrere Tausend Enzyme gibt (S. 28, Aufgabe 3).'
    ],
    errors: [
      ['Substrat- und Wirkungsspezifität sind dasselbe.', 'Substratspezifität: welches Substrat. Wirkungsspezifität: welche Reaktion.'],
      ['Beim Induced Fit passt jedes Substrat.', 'Auch hier passen nur geeignete Substrate. Die optimale Passform entsteht erst bei der Bindung.'],
      ['Aufgabe 2 des Arbeitsblatts ohne Beispiele aus anderen Bereichen des Körpers.', 'Die Aufgabe verlangt Beispiele – ergänzen.', true]
    ],
    selfcheck: [
      ['Was versteht man unter Wirkungsspezifität?', 'Ein Enzym katalysiert für sein Substrat immer dieselbe Reaktion.'],
      ['Worin unterscheidet sich das Induced-Fit-Modell vom Schlüssel-Schloss-Prinzip?', 'Die optimale Passform entsteht erst durch die Bindung des Substrats.']
    ]
  },

  /* ===================================================================== 8 */
  {
    id: 't8', nr: 8, title: 'Geschwindigkeit enzymkatalysierter Reaktionen', pages: '32–33',
    short: 'vmax, KM und Wechselzahl',
    goals: [
      { id: 't8g1', text: 'Den Zusammenhang zwischen Substratkonzentration und Reaktionsgeschwindigkeit unter Einbeziehung der Brownschen Molekularbewegung erklären und als Kurvendiagramm skizzieren.' },
      { id: 't8g2', text: 'vmax, ½ vmax und die Michaelis-Menten-Konstante KM im Diagramm kennzeichnen und auf molekularer Ebene erläutern (Brownsche Molekularbewegung, Wahrscheinlichkeit von Enzym-Substrat-Begegnungen).' },
      { id: 't8g3', text: 'Die Bedeutung der Wechselzahl kcat erklären.' }
    ],
    terms: ['Maximale Reaktionsgeschwindigkeit (vmax)', 'halbmaximale Reaktionsgeschwindigkeit (½ vmax)', 'Michaelis-Menten-Konstante (KM)', 'Wechselzahl (kcat)', 'Brownsche Molekularbewegung', 'Reaktionsgeschwindigkeit'],
    labs: ['michaelis'],
    notes: `
${FIG('s33-b3', [
  'x-Achse: Substratkonzentration c (Menge der Substrate), y-Achse: Reaktionsgeschwindigkeit v',
  'links: wenig Substrat, kaum ein Enzym ist besetzt',
  `rechts: alle Enzyme sind besetzt → ${mk('v<sub>max</sub>')}`,
  `bei ${mk('½ v<sub>max</sub>', 'b')} nach unten loten → ${mk('K<sub>M</sub>', 'p')}`,
  'halbe Enzymmenge → halbe v<sub>max</sub>, K<sub>M</sub> bleibt gleich'
])}
${D('Reaktionsgeschwindigkeit', 'Gibt an, wie viel Substrat pro Zeit umgesetzt bzw. wie viel Produkt pro Zeit gebildet wird.')}
${D('niedrige Substratkonzentration', 'Wenig Substrat, viele freie Enzyme: Die Wahrscheinlichkeit, dass ein Substratmolekül auf ein aktives Zentrum trifft und einen Enzym-Substrat-Komplex bildet, ist gering → v klein.', 'p')}
${D('steigende Substratkonzentration', 'Die Teilchen bewegen sich ständig ungerichtet (Brownsche Molekularbewegung). Mehr Substrat → häufigere Zusammenstöße, ein frei gewordenes aktives Zentrum wird schneller wieder besetzt → v steigt.')}
${D('v<sub>max</sub>', 'Maximale Reaktionsgeschwindigkeit: <b>alle aktiven Zentren sind ständig besetzt</b> (Sättigung). Mehr Substrat erhöht v nicht weiter.')}
${D('K<sub>M</sub>', 'Michaelis-Menten-Konstante = Substratkonzentration bei ½ v<sub>max</sub>. Kleine K<sub>M</sub> → hohe <b>Affinität</b>: Das Enzym bindet sein Substrat schon bei geringer Konzentration gut. K<sub>M</sub> hängt nicht von der Enzymkonzentration ab.', 'p')}
${D('Wechselzahl k<sub>cat</sub>', 'Gibt an, wie viele Substratmoleküle pro Sekunde an einem aktiven Zentrum in Produkte umgesetzt werden (bei v<sub>max</sub>). v<sub>max</sub> = k<sub>cat</sub> · Enzymkonzentration.')}
${BF('s32-b2')}
${D('Drehtür-Modell', `Drehtür = Enzym, Einkaufende = Substrat; Personen pro Sekunde und Tür ≈ k<sub>cat</sub>; mehr Türen → höhere v<sub>max</sub> (S. 32, B1)${U}.`, 'b')}
${BF('s32-b1')}
${D('Isoenzyme', 'Gleiche Reaktion, andere Aminosäuresequenz, andere K<sub>M</sub>. Beispiel Alkoholabbau: ALDH2 (Mitochondrium, K<sub>M</sub> = 0,001 mmol/l) und ALDH1 (Cytoplasma, K<sub>M</sub> = 0,050 mmol/l). Ist ALDH2 inaktiv, wird Acetaldehyd zu langsam abgebaut (Randspalte S. 33).')}
${EXTRA('<p>Den Begriff <b>Brownsche Molekularbewegung</b> nennt die Checkliste, das Buch beschreibt nur den Vorgang: Gelöste Teilchen sind in ständiger, ungerichteter Bewegung (S. 20).</p>')}`,
    exam: [
      'Aus Tabelle B2 das Enzym mit höchster Affinität (kleinste K<sub>M</sub>: Acetylcholinesterase) und mit höchster Arbeitsgeschwindigkeit (größte k<sub>cat</sub>: Katalase) nennen (S. 33, Aufgabe 1).',
      'Zusammenhang zwischen v<sub>max</sub> und k<sub>cat</sub> erläutern (S. 33, Aufgabe 2).',
      'Analogie zwischen Drehtür-Modell und Reaktionsgeschwindigkeit darstellen (S. 33, Aufgabe 3).',
      'Mögliche Ursachen eines langsamen Alkoholabbaus erläutern (S. 33, Aufgabe 4).'
    ],
    draw: ['Achsen: x = Substratkonzentration c, y = Reaktionsgeschwindigkeit v.', 'Kurve: zuerst steil, dann flacher, nähert sich einer Waagrechten.', 'v<sub>max</sub> als gestrichelte Linie.', '½ v<sub>max</sub> bis zur Kurve, dann nach unten loten: K<sub>M</sub>.'],
    errors: [
      ['Reaktionsgeschwindigkeit: „wie schnell die Substrate eine Bindung mit den Enzymen eingehen“.', 'Sie gibt an, wie viel Substrat pro Zeit umgesetzt (bzw. Produkt gebildet) wird – nicht nur gebunden.', true],
      ['v<sub>max</sub>: „alle Enzym-Substrat-Komplexe sind besetzt“.', 'Alle aktiven Zentren sind besetzt; ein Enzym-Substrat-Komplex ist selbst schon „besetzt“.', true],
      ['„Niedriger K<sub>M</sub>-Wert = Enzyme binden schneller.“', 'Niedriger K<sub>M</sub> bedeutet hohe Affinität: ½ v<sub>max</sub> wird schon bei geringer Substratkonzentration erreicht. Wie schnell umgesetzt wird, beschreibt k<sub>cat</sub>.', true],
      ['K<sub>M</sub> hängt von der Enzymkonzentration ab.', 'K<sub>M</sub> bleibt gleich; von der Enzymkonzentration hängt nur die erreichte v<sub>max</sub> ab (B3).', true],
      ['K<sub>M</sub> ist eine Geschwindigkeit.', 'K<sub>M</sub> ist eine Substratkonzentration.']
    ],
    selfcheck: [
      ['Warum steigt v bei hoher Substratkonzentration nicht weiter?', 'Alle aktiven Zentren sind ständig besetzt; es gibt mehr Substrat als freie Enzyme.'],
      ['Was passiert mit v<sub>max</sub> und K<sub>M</sub>, wenn man die Enzymkonzentration halbiert?', 'v<sub>max</sub> halbiert sich, K<sub>M</sub> bleibt gleich.'],
      ['Welches Enzym in B2 arbeitet am schnellsten?', 'Katalase (k<sub>cat</sub> = 10 000 000 s⁻¹).']
    ]
  },

  /* ===================================================================== 9 */
  {
    id: 't9', nr: 9, title: 'Einfluss von Temperatur und pH-Wert auf die Enzymaktivität', pages: '36–37',
    short: 'RGT-Regel, Temperaturoptimum, Denaturierung, pH-Optimum',
    goals: [
      { id: 't9g1', text: 'Erklären, weshalb unterschiedliche Temperaturen und pH-Werte die Reaktionsgeschwindigkeit enzymkatalysierter Reaktionen beeinflussen.' },
      { id: 't9g2', text: 'Die Bedeutung des Temperaturoptimums, des pH-Optimums und der Denaturierung erläutern.' },
      { id: 't9g3', text: 'Kurvendiagramme zur Abhängigkeit der Enzymaktivität von Temperatur bzw. pH-Wert beschreiben und auswerten.' },
      { id: 't9g4', text: 'Die dargestellten Kurvenverläufe auf molekularer Ebene erklären.' }
    ],
    terms: ['Reaktionsgeschwindigkeit', 'Aktivierungsenergie', 'Reaktionsgeschwindigkeits-Temperatur-Regel (RGT-Regel)', 'Temperaturoptimum', 'Denaturierung', 'thermophile Enzyme', 'pH-Optimum', 'Brownsche Molekularbewegung'],
    labs: ['tempph'],
    notes: `
${D('Temperaturoptimum', 'Die Temperatur, bei der ein Enzym seine höchste katalytische Aktivität hat. Enzymspezifisch; viele menschliche Enzyme: ca. 37 °C.')}
${D('Brownsche Molekularbewegung', 'Moleküle in einer Lösung bewegen sich umso schneller, je höher die Temperatur ist.', 'b')}
${D('Temperatur und Aktivierungsenergie', 'Bei höherer Temperatur stoßen die Moleküle häufiger und heftiger zusammen, deshalb <b>erreichen mehr Moleküle die Aktivierungsenergie</b>. Die Aktivierungsenergie selbst bleibt gleich.', 'p')}
${D('RGT-Regel', 'Reaktionsgeschwindigkeits-Temperatur-Regel: Je 10 °C Temperaturerhöhung verdoppelt bis verdreifacht sich die Reaktionsgeschwindigkeit. Bei Enzymen gilt das nur bis zum Optimum (Bereich I).')}
${FIG('s36-b2', [
  'Bereich I: Aktivität steigt nach der RGT-Regel',
  'Gipfel: Temperaturoptimum',
  'Bereich II: steiler Abfall → Denaturierung'
])}
${FIG('s36-b3', [
  'Enzym Brenztraubensäurekinase bei Eisfisch, Forelle und Mensch',
  'jedes Optimum passt zur Körper- bzw. Umgebungstemperatur → <b>Angepasstheit</b>',
  'gleiche Funktion, unterschiedliche Optima: Isoenzyme'
])}
${D('pH-Optimum', 'Der pH-Wert, bei dem ein Enzym seine höchste katalytische Aktivität zeigt. Angepasst an den Wirkort.')}
${FIG('s37-b4', [
  `${mk('Pepsin')}: Optimum ca. pH 2 (Magen)`,
  `${mk('Speichel-Amylase', 'b')}: ca. pH 7 (Mund)`,
  `${mk('Lactase, Trypsin', 'p')}: neutral bis leicht basisch (Darm)`
])}
${D('Denaturierung', 'Sowohl bei Erhöhung der Temperatur als auch des pH-Werts über das jeweilige Optimum hinaus wird die Enzymaktivität schnell schwächer und bricht schließlich zusammen → das Enzym ist nicht mehr funktionsfähig.', 'p')}
${D('Begründung', `Die Raumstruktur des Proteins (Sekundär- und Tertiärstruktur) wird zerstört, das aktive Zentrum passt nicht mehr.${L(['<b>Temperatur:</b> verstärkte Bewegung (Schwingungen) der Moleküle löst die Wechselwirkungen der Raumstruktur', '<b>pH-Wert:</b> zu viele oder zu wenige H<sup>+</sup>-Ionen verändern die Ladungen der Reste → Ionenbindungen und H-Brücken lösen sich', 'die Peptidbindungen (Primärstruktur) bleiben erhalten'])}`)}
${FIGS('s36-rand', 's37-b5')}
${D('Fieber', `Bei Fieber geht die Enzymaktivität zurück${U}.`, 'b')}
${D('thermophile Enzyme', 'Hitzeliebend, z. B. aus Bakterien in heißen Quellen. Beispiel Taq-Polymerase (<i>Thermus aquaticus</i>), noch bei 95 °C aktiv; stabil durch viele Disulfidbrücken und Ionenbindungen. Genutzt z. B. in Waschmitteln (S. 37).')}
${CLASS('<p>Arbeitsblatt Lactaseaktivität (Glucose-Teststreifen): a ohne Lactase = 0 (Blindprobe); b pH 8, 37 °C hoch; c 87 °C = 0 (denaturiert); d 17 °C gering (langsamere Bewegung); e pH 1 = 0 (denaturiert). Deine Werte 0 / hoch / 0 / 1–3 / 0 sind stimmig.</p>')}
${NOTE('<p>Das Arbeitsblatt nennt für Lactase pH 8–9, die Buchabbildung B4 zeigt das Optimum bei etwa pH 7. Richte dich in der Klausur nach dem dort gegebenen Material.</p>')}`,
    exam: [
      'Temperatureinfluss am Beispiel der Brenztraubensäurekinase der Forelle erläutern (S. 37, Aufgabe 1).',
      'Aktivitäten von Pepsin und Trypsin vergleichen (S. 37, Aufgabe 2).',
      'Wirksamkeit von Lactase-Präparaten im Magen bewerten (S. 37, Aufgabe 3): Bei pH 1–2 ist Lactase wenig aktiv bzw. denaturiert.',
      'Temperatur- und pH-Kurven beschreiben und molekular erklären.'
    ],
    errors: [
      ['„Aktivierungsenergie wird bei höherer Temperatur herabgesetzt.“', 'Falsch: Die Aktivierungsenergie bleibt gleich. Bei höherer Temperatur haben nur mehr Moleküle genug Energie, um sie zu überwinden. Herabgesetzt wird sie durch das Enzym.', true],
      ['Temperaturoptimum: „v<sub>max</sub> wird erreicht“.', 'Besser: höchste Enzymaktivität. v<sub>max</sub> ist der Sättigungswert bei hoher Substratkonzentration (Thema 8) und hängt selbst von der Temperatur ab.', true],
      ['pH: „Säuren brechen Bindungen auf“.', 'Genauer: Ein veränderter pH-Wert (sauer oder basisch) verändert die Ladungen der Reste; dadurch lösen sich Ionenbindungen und H-Brücken.', true],
      ['Bei Hitze werden die Peptidbindungen gespalten.', 'Die Wechselwirkungen der Raumstruktur werden zerstört; die Primärstruktur bleibt.'],
      ['Alle Enzyme haben ihr Optimum bei 37 °C.', 'Das Optimum ist enzymspezifisch und an Organismus bzw. Wirkort angepasst.']
    ],
    selfcheck: [
      ['Warum steigt die Aktivität bis zum Optimum?', 'Mehr Molekülbewegung führt zu mehr Zusammenstößen; mehr Moleküle erreichen die Aktivierungsenergie.'],
      ['Warum ist Speichel-Amylase im Magen inaktiv?', 'Bei pH 1–2 wird sie denaturiert.'],
      ['Wodurch sind thermophile Enzyme stabil?', 'Durch viele Disulfidbrücken und Ionenbindungen.']
    ]
  },

  /* ===================================================================== 10 */
  {
    id: 't10', nr: 10, title: 'Hemmung enzymkatalysierter Reaktionen', pages: '40–41',
    short: 'Kompetitive, nicht-kompetitive und irreversible Hemmung',
    goals: [
      { id: 't10g1', text: 'Erklären, weshalb unterschiedliche Formen der Enzymhemmung für die Regulation enzymkatalysierter Reaktionen im Körper von Bedeutung sind.' },
      { id: 't10g2', text: 'Die kompetitive und die nicht-kompetitive bzw. allosterische Hemmung hinsichtlich ihrer Wirkungsweise vergleichen.' },
      { id: 't10g3', text: 'Die jeweiligen Vorgänge anhand geeigneter Modelle erläutern.' },
      { id: 't10g4', text: 'Für beide Hemmungsarten ein Kurvendiagramm v in Abhängigkeit von c skizzieren und Reaktionsverläufe mit und ohne Inhibitor gegenüberstellen.' },
      { id: 't10g5', text: 'Unterschiede hinsichtlich vmax und KM erklären sowie reversible und irreversible Hemmungen unterscheiden.' }
    ],
    terms: ['Kompetitive Hemmung', 'reversibel', 'Enzym-Substrat-Komplex', 'nicht-kompetitive / allosterische Hemmung', 'vmax', 'KM-Wert', 'irreversible Hemmung'],
    labs: ['inhibition'],
    notes: `
${D('Inhibitor', 'Hemmstoff eines Enzyms.')}
${D('reversibel / irreversibel', 'Reversibel: Der Inhibitor löst sich wieder, das Enzym arbeitet danach normal. Irreversibel: dauerhafte Bindung, das Enzym bleibt funktionslos.', 'b')}
${H('Kompetitive Hemmung')}
${D('Prinzip', 'Der Inhibitor ist dem Substrat <b>strukturähnlich</b> und konkurriert mit ihm um das <b>aktive Zentrum</b>. Bindung reversibel. Ein Enzym mit Inhibitor bildet keinen Enzym-Substrat-Komplex.')}
${BF('s40-b2')}
${FIG('s40-b1', [
  'bei gleicher Substratkonzentration ist v kleiner',
  `${mk('K<sub>M</sub> steigt', 'p')}: Affinität scheinbar geringer`,
  `viel Substrat verdrängt den Inhibitor → ${mk('v<sub>max</sub> wird trotzdem erreicht')}`
])}
${D('Beispiel Gicht', 'Xanthinoxidase baut Hypoxanthin zu Harnsäure ab; Harnsäurekristalle lagern sich in Gelenken ab. Allopurinol ähnelt Hypoxanthin und hemmt das Enzym kompetitiv → weniger Harnsäure.', 'p')}
${BF('s40-rand')}
${D('Beispiel Sulfonamide', 'Antibiotika, die am aktiven Zentrum eines Bakterienenzyms binden → Wachstum der Bakterien gehemmt.', 'b')}
${H('Nicht-kompetitive Hemmung')}
${D('Prinzip', 'Der Inhibitor ist dem Substrat <b>nicht ähnlich</b> und bindet <b>außerhalb des aktiven Zentrums</b>. Dadurch ändert sich die Raumstruktur, das Enzym ist inaktiv. Substrat und Inhibitor konkurrieren nicht. Ebenfalls reversibel.')}
${BF('s41-b3')}
${FIG('s41-b4', [
  `${mk('v<sub>max</sub> sinkt', 'p')}, auch bei viel Substrat`,
  `${mk('K<sub>M</sub> bleibt gleich')}: die übrigen Enzyme haben dieselbe Affinität, nur ihre Zahl sinkt`
])}
${D('Beispiel', 'Tyrosinkinasen (Leukämie, Tumoren) übertragen eine Phosphatgruppe von ATP und lösen eine Signalkette zur Zellteilung aus; synthetische Hemmstoffe hemmen sie nicht-kompetitiv.', 'b')}
${CMP(['kompetitiv', ['substratähnlich', 'bindet am aktiven Zentrum', 'K<sub>M</sub> ↑, v<sub>max</sub> bleibt erreichbar', 'durch viel Substrat aufhebbar']],
      ['nicht-kompetitiv', ['nicht substratähnlich', 'bindet außerhalb, verändert die Raumstruktur', 'v<sub>max</sub> ↓, K<sub>M</sub> bleibt', 'durch Substrat nicht aufhebbar'], 'b'])}
${H('Irreversible Hemmung')}
${D('Prinzip', 'Der Inhibitor bindet <b>dauerhaft am aktiven Zentrum</b>; es entsteht kein Enzym-Substrat-Komplex mehr.')}
${D('Beispiele', `${L(['<b>Penicillin</b> bindet an ein Bakterienenzym für die Zellwandbildung → Bakterium kann sich nicht mehr teilen', '<b>Schwermetall-Ionen</b> (Blei, Quecksilber) binden an SH-Gruppen von Enzymen und lösen sich nicht wieder'])}`, 'p')}
${NOTE('<p>Die Checkliste sagt „nicht-kompetitive bzw. allosterische“ Hemmung, das Buch auf S. 40–41 nur „nicht-kompetitiv“. In beiden Fällen bindet der Inhibitor außerhalb des aktiven Zentrums und verändert die Raumstruktur.</p><p>Zur Regulation im Körper (Lernziel 1) enthalten S. 40–41 keine eigenen Beispiele.</p>')}
${EXTRA('<p>Regulation: Reversible Hemmung ist steuerbar – sinkt die Inhibitorkonzentration, arbeiten die Enzyme wieder. Häufiges Prinzip: Das Endprodukt eines Stoffwechselweges hemmt das erste Enzym dieses Weges.</p>')}`,
    exam: [
      'Kurvenverläufe in B1 und B4 beschreiben und erklären (S. 41, Aufgabe 1).',
      'Erklären, warum Gicht mit Allopurinol behandelt werden kann (S. 41, Aufgabe 2).',
      'Stellung nehmen zum Austausch bleihaltiger Wasserleitungen (S. 41, Aufgabe 3): Blei-Ionen hemmen Enzyme irreversibel.',
      'Kompetitive und nicht-kompetitive Hemmung tabellarisch vergleichen (Bindungsort, Ähnlichkeit zum Substrat, v<sub>max</sub>, K<sub>M</sub>).'
    ],
    draw: ['Kurve ohne Inhibitor mit v<sub>max</sub>, ½ v<sub>max</sub> und K<sub>M</sub>.', 'Kompetitiv: flacherer Anstieg, gleiche v<sub>max</sub>, K<sub>M</sub> nach rechts verschoben.', 'Nicht-kompetitiv: Kurve bleibt darunter, niedrigere v<sub>max</sub>, gleiche K<sub>M</sub>.'],
    errors: [
      ['Der nicht-kompetitive Inhibitor passt ins aktive Zentrum und ähnelt dem Substrat.', 'Er ähnelt dem Substrat nicht und bindet außerhalb des aktiven Zentrums.', true],
      ['„Mehr Substrat führt zu höherer K<sub>M</sub>.“', 'Der kompetitive Inhibitor erhöht K<sub>M</sub>. Mehr Substrat verdrängt den Inhibitor.', true],
      ['Bei kompetitiver Hemmung sinkt v<sub>max</sub>.', 'v<sub>max</sub> wird bei hoher Substratkonzentration trotzdem erreicht.'],
      ['Nicht-kompetitive Hemmung lässt sich durch mehr Substrat aufheben.', 'Nein, v<sub>max</sub> bleibt erniedrigt.']
    ],
    selfcheck: [
      ['Warum wird bei kompetitiver Hemmung v<sub>max</sub> trotzdem erreicht?', 'Bei hoher Substratkonzentration verdrängt das Substrat den Inhibitor.'],
      ['Warum bleibt K<sub>M</sub> bei nicht-kompetitiver Hemmung gleich?', 'Die übrigen aktiven Enzyme haben dieselbe Affinität; nur ihre Zahl sinkt.'],
      ['Wie wirken Blei-Ionen?', 'Sie binden irreversibel an SH-Gruppen von Enzymen.']
    ]
  }
  ];

  BIO.topicById = {};
  BIO.goalById = {};
  BIO.topics.forEach(t => {
    BIO.topicById[t.id] = t;
    t.goals.forEach(g => { BIO.goalById[g.id] = Object.assign({ topic: t.id }, g); });
  });
})();
