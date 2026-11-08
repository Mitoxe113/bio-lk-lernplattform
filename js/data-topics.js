/* =========================================================================
   Lerninhalte: 10 Themen der Checkliste (verbindliches Inhaltsverzeichnis)
   Grundlage: Checkliste 1. LK-Klausur, Natura Kursstufe (Klett) S. 12–41,
   Unterrichtsaufschriebe und Arbeitsblätter.
   Texte sind eigene Zusammenfassungen. Buchabbildungen werden NICHT
   mitgeliefert, sondern aus der eigenen PDF angezeigt (siehe book.js).
   ========================================================================= */
(function () {
  const box = (cls, title, html) => `<div class="box ${cls}"><div class="box-title">${title}</div>${html}</div>`;
  const EXTRA = (html) => box('extra', 'Ergänzung (steht nicht im Buch)', html);
  const CLASS = (html) => box('note', 'Aus dem Unterricht', html);
  const NOTE = (html) => box('missing', 'Hinweis zum Material', html);
  const BF = (id) => `<div data-bookfig="${id}"></div>`;

  window.BIO = window.BIO || {};
  BIO.helpers = { EXTRA, CLASS, NOTE, BF };

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
    sheet: {
      intro: `
<ul>
  <li>Proteine sind unverzweigte Makromoleküle aus Aminosäuren. Alle Lebewesen verwenden dieselben <b>20 Aminosäuren</b>.</li>
  <li>Die meisten Proteine bestehen aus 100 bis 600 Aminosäuren. Ketten unter ca. 100 Aminosäuren heißen <b>Peptide</b>.</li>
  <li>Proteine erfüllen sehr verschiedene Aufgaben: Gerüst, Schutz, Bewegung, Transport, Katalyse, Regulation und Informationsaufnahme (S. 12, B2).</li>
</ul>
${BF('s12-b2')}`,
      explain: `
<h3>Grundstruktur einer α-Aminosäure</h3>
<p>Am zentralen <b>α-C-Atom</b> sitzen vier Bindungspartner:</p>
<ul>
  <li>die <b>Aminogruppe</b> –NH<sub>2</sub>,</li>
  <li>die <b>Carboxylgruppe</b> –COOH (im Buch: Carboxygruppe),</li>
  <li>ein <b>H-Atom</b>,</li>
  <li>der variable <b>Rest R</b>.</li>
</ul>
<p>In Proteinen kommen nur α-Aminosäuren vor: Amino- und Carboxylgruppe hängen am selben C-Atom.</p>
<p>Die Aminosäuren unterscheiden sich nur im Rest. Nach dem Rest unterscheidet man <b>hydrophile</b> und <b>hydrophobe</b> sowie <b>saure</b> und <b>basische</b> Aminosäuren.</p>
${BF('s12-b3')}
<h3>Peptidbindung</h3>
<p>Die Carboxylgruppe der einen Aminosäure reagiert mit der Aminogruppe der nächsten. Dabei wird ein <b>Wassermolekül abgespalten</b>. Diese Reaktion heißt <b>Kondensationsreaktion</b>.</p>
<p>Die neue C–N-Bindung ist die <b>Peptidbindung</b>. In der Abbildung ist außerdem die <b>Peptidgruppe</b> (C=O und N–H) markiert.</p>
${BF('s12-b4')}
<p>Weil an jeder Stelle eine von 20 Aminosäuren stehen kann, gibt es für eine Kette aus n Aminosäuren 20<sup>n</sup> mögliche Reihenfolgen. Bei 300 Aminosäuren sind das 20<sup>300</sup>.</p>
${CLASS('<p>Im Unterricht wurde ein Dipeptid aus Cystein und Glycin gezeichnet.</p><ul><li>Glycin hat als Rest nur ein H-Atom: H<sub>2</sub>N–CH<sub>2</sub>–COOH.</li><li>Cystein hat den Rest –CH<sub>2</sub>–SH.</li></ul>')}`,
      termdefs: [
        ['α-Aminosäure', 'Amino- und Carboxylgruppe sitzen am selben C-Atom (α-C-Atom). Baustein der Proteine.'],
        ['Grundstruktur der Aminosäuren', 'Teil, der bei allen Aminosäuren gleich ist: α-C-Atom mit Aminogruppe, Carboxylgruppe und H-Atom.'],
        ['Aminogruppe', '–NH₂'],
        ['Carboxylgruppe', '–COOH (im Buch „Carboxygruppe“)'],
        ['Rest R', 'Variabler Teil, unterscheidet die 20 Aminosäuren'],
        ['Kondensationsreaktion', 'Verknüpfung zweier Moleküle unter Abspaltung von Wasser'],
        ['Peptidbindung', 'Bindung zwischen dem C-Atom der Carboxylgruppe und dem N-Atom der Aminogruppe der nächsten Aminosäure'],
        ['Peptid', 'Kette aus weniger als ca. 100 Aminosäuren'],
        ['Protein', 'Kette aus meist 100–600 Aminosäuren']
      ],
      mechanism: `
<h3>Peptidbindung zeichnen</h3>
<ol class="steps">
  <li>Zwei Aminosäuren nebeneinander zeichnen, die Carboxylgruppe von AS 1 neben der Aminogruppe von AS 2.</li>
  <li>OH der Carboxylgruppe und ein H der Aminogruppe markieren.</li>
  <li>Reaktionspfeil zeichnen, mit „Kondensation“ beschriften und H<sub>2</sub>O als Produkt angeben.</li>
  <li>Dipeptid zeichnen: –C(=O)–N(H)– verbindet die beiden Aminosäuren.</li>
  <li>Peptidbindung und Peptidgruppe beschriften. Links bleibt eine freie Aminogruppe, rechts eine freie Carboxylgruppe.</li>
</ol>`,
      connections: `
<p>Die Reihenfolge der Aminosäuren ist die Primärstruktur. Von ihr hängen alle weiteren Strukturebenen ab (Thema 2).</p>
<ul>
  <li>Die Peptidgruppen bilden H-Brücken: Sekundärstruktur.</li>
  <li>Die Reste treten miteinander in Wechselwirkung: Tertiärstruktur.</li>
</ul>`,
      figures: [['aminoacid', 'α-Aminosäure'], ['peptide', 'Peptidbindung durch Kondensation']],
      exam: [
        'Strukturformel einer α-Aminosäure zeichnen und die vier Bindungspartner des α-C-Atoms beschriften.',
        'Kondensation zweier Aminosäuren zeichnen: abgespaltene Atome markieren, H<sub>2</sub>O angeben, Peptidbindung kennzeichnen.',
        'Anzahl möglicher Peptide berechnen, z. B. 7 Aminosäuren: 20<sup>7</sup> (S. 13, Aufgabe 1).'
      ],
      errors: [
        ['Bei der Peptidbindung wird Wasser aufgenommen.', 'Wasser wird abgespalten (Kondensation).'],
        ['Der Rest R ist an der Peptidbindung beteiligt.', 'Es reagieren nur Carboxyl- und Aminogruppe.'],
        ['H₂N–CH₂–COOH ist Cystein (aus deinem Aufschrieb).', 'Das ist Glycin (Rest = H). Cystein hat den Rest –CH₂–SH.'],
        ['„Ch₂“ (aus deinem Aufschrieb)', 'CH₂ – Elementsymbole korrekt schreiben.']
      ],
      summary: [
        'α-C-Atom mit Aminogruppe, Carboxylgruppe, H-Atom und Rest R.',
        '20 Aminosäuren, die sich nur im Rest unterscheiden.',
        'Peptidbindung: Carboxylgruppe + Aminogruppe, H₂O wird abgespalten (Kondensation).',
        'Peptid: unter ca. 100 Aminosäuren; Protein: meist 100–600.'
      ],
      selfcheck: [
        ['Nenne die vier Bindungspartner des α-C-Atoms.', 'Aminogruppe, Carboxylgruppe, H-Atom, Rest R.'],
        ['Woraus entsteht das abgespaltene Wasser?', 'Aus der OH-Gruppe der Carboxylgruppe und einem H-Atom der Aminogruppe.'],
        ['Wie viele Peptide aus 7 Aminosäuren sind möglich?', '20⁷ ≈ 1,28 · 10⁹'],
        ['Worin unterscheiden sich die Aminosäuren?', 'Nur im Rest R.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Proteine sind Makromoleküle aus Aminosäuren.</li>
  <li>Ihre räumliche Struktur entsteht in vier Ebenen.</li>
  <li>Von der Struktur hängt die Aufgabe des Proteins ab (S. 13, Merksatz).</li>
</ul>`,
      explain: `
<h3>Primärstruktur</h3>
<p>Die Primärstruktur ist die Reihenfolge der Aminosäuren, die <b>Aminosäuresequenz</b>. Von ihr hängen alle weiteren Strukturen ab.</p>
<ul>
  <li><b>N-Ende:</b> Kettenanfang mit freier Aminogruppe.</li>
  <li><b>C-Ende:</b> Kettenende mit freier Carboxylgruppe.</li>
</ul>
${BF('s13-b5')}
<h3>Sekundärstruktur</h3>
<p>Zwischen den <b>Peptidgruppen</b> einer Kette entstehen <b>Wasserstoffbrücken</b>. So entstehen räumliche Faltungen. Die meisten H-Brücken liegen in zwei Strukturen vor:</p>
<ul>
  <li><b>α-Helix:</b> Die Reste ragen nach außen.</li>
  <li><b>β-Faltblatt:</b> Die Reste ragen abwechselnd zur einen und zur anderen Seite.</li>
</ul>
${BF('s13-b6')}
<h3>Tertiärstruktur</h3>
<p>Weiter entfernte Bereiche der Kette treten über ihre <b>Reste</b> in Wechselwirkung. Dabei entsteht eine verknäulte Struktur. Beteiligt sind:</p>
<ul>
  <li>Wasserstoffbrücken,</li>
  <li>Ionenbindungen,</li>
  <li>Van-der-Waals-Kräfte,</li>
  <li><b>Disulfidbrücken</b> (–S–S– zwischen zwei Cystein-Resten).</li>
</ul>
${BF('s13-b7')}
<h3>Quartärstruktur</h3>
<p>Manche Proteine bestehen aus mehreren Ketten. Deren Anordnung zueinander ist die Quartärstruktur.</p>
<p>Beispiel <b>Hämoglobin</b>: vier Ketten mit je einer <b>Häm-Gruppe</b>. Diese Struktur ermöglicht den Sauerstofftransport.</p>
${BF('s13-b8')}
${EXTRA('<p><b>Kovalente Bindungen</b> (Begriff der Checkliste) sind Elektronenpaarbindungen.</p><ul><li>Im Protein sind die Peptidbindungen und die Disulfidbrücken kovalent.</li><li>Sie sind deutlich stabiler als Wasserstoffbrücken, Ionenbindungen und Van-der-Waals-Kräfte.</li></ul>')}`,
      termdefs: [
        ['Primärstruktur', 'Aminosäuresequenz, vom N-Ende zum C-Ende'],
        ['Sekundärstruktur', 'Faltung durch H-Brücken zwischen den Peptidgruppen: α-Helix, β-Faltblatt'],
        ['α-Helix', 'Schraubenförmige Sekundärstruktur, Reste zeigen nach außen'],
        ['β-Faltblatt', 'Gefaltete, nebeneinanderliegende Abschnitte, Reste abwechselnd oben und unten'],
        ['Tertiärstruktur', 'Räumliche Struktur der ganzen Kette durch Wechselwirkungen der Reste'],
        ['Quartärstruktur', 'Anordnung mehrerer Ketten in einem Protein (z. B. Hämoglobin)'],
        ['Wasserstoffbrückenbindung', 'Anziehung zwischen einem H-Atom an N oder O und einem anderen N- oder O-Atom; Sekundär- und Tertiärstruktur'],
        ['Disulfidbrücke', 'Kovalente Bindung zwischen den S-Atomen zweier Cystein-Reste'],
        ['Kovalente Bindung', 'Elektronenpaarbindung (Ergänzung); im Protein Peptidbindung und Disulfidbrücke']
      ],
      mechanism: `
<ol class="steps">
  <li><b>Sequenz:</b> Aminosäuren über Peptidbindungen verknüpft (Primärstruktur).</li>
  <li><b>Peptidgruppen</b> bilden H-Brücken: α-Helix oder β-Faltblatt (Sekundärstruktur).</li>
  <li><b>Reste</b> bilden H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte und Disulfidbrücken: Knäuel (Tertiärstruktur).</li>
  <li>Bei mehreren Ketten: Anordnung der Ketten zueinander (Quartärstruktur).</li>
</ol>`,
      connections: `
<p>Die Raumstruktur bestimmt die Funktion. Bei Enzymen entsteht so das aktive Zentrum (Thema 6).</p>
<p>Wird die Raumstruktur zerstört, verliert das Protein seine Funktion (Denaturierung, Thema 9). Die Primärstruktur bleibt dabei erhalten.</p>`,
      figures: [['protein', 'Strukturebenen eines Proteins']],
      exam: [
        'Die vier Strukturebenen definieren und jeweils die beteiligten Bindungen nennen (S. 13, Aufgabe 2).',
        'Unterscheiden: H-Brücken zwischen Peptidgruppen (Sekundärstruktur) und Wechselwirkungen zwischen Resten (Tertiärstruktur).',
        'Hämoglobin als Beispiel für eine Quartärstruktur erläutern.'
      ],
      errors: [
        ['Die Sekundärstruktur entsteht durch Wechselwirkungen der Reste.', 'Sie entsteht durch H-Brücken zwischen den Peptidgruppen.'],
        ['Disulfidbrücken sind Wasserstoffbrücken.', 'Disulfidbrücken sind kovalente S–S-Bindungen.'],
        ['Jedes Protein hat eine Quartärstruktur.', 'Nur Proteine aus mehreren Ketten.']
      ],
      summary: [
        'Primär: Sequenz.',
        'Sekundär: H-Brücken zwischen Peptidgruppen, α-Helix und β-Faltblatt.',
        'Tertiär: Wechselwirkungen zwischen Resten, darunter Disulfidbrücken.',
        'Quartär: mehrere Ketten, z. B. Hämoglobin.'
      ],
      selfcheck: [
        ['Welche Gruppen bilden die H-Brücken der Sekundärstruktur?', 'Die Peptidgruppen (C=O und N–H) des Rückgrats.'],
        ['Nenne die Wechselwirkungen der Tertiärstruktur.', 'H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte, Disulfidbrücken.'],
        ['Was versteht man unter Quartärstruktur?', 'Die Anordnung mehrerer Proteinketten zueinander.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li><b>Lipide</b> sind hydrophob. Sie lösen sich gut in hydrophoben Lösungsmitteln, in Wasser kaum.</li>
  <li>Fette dienen als Energiespeicher und Kälteschutz.</li>
  <li>Phospholipide sind der Hauptbestandteil biologischer Membranen.</li>
  <li>Biomembranen grenzen Zellen und Organellen ab.</li>
</ul>`,
      explain: `
<h3>Fette</h3>
<p>Ein <b>Fettmolekül</b> entsteht aus Glycerin und drei <b>Fettsäuren</b> (langkettige Carbonsäuren). Dabei wird Wasser abgespalten. Die Rückreaktion ist die Hydrolyse.</p>
<ul>
  <li><b>Gesättigte Fettsäuren</b> haben keine Doppelbindungen. Fette aus ihnen sind bei Raumtemperatur häufig fest.</li>
  <li><b>Ungesättigte Fettsäuren</b> haben Doppelbindungen. Fette aus ihnen sind meist flüssig.</li>
</ul>
${BF('s14-b1')}
<h3>Phospholipide</h3>
<p>In einem Phospholipid ist eine der drei Fettsäuren durch eine <b>Phosphatgruppe</b> ersetzt. Beim Lecithin ist diese zusätzlich mit Cholin verestert.</p>
<ul>
  <li><b>Hydrophiler Kopf:</b> Phosphatgruppe mit Cholin.</li>
  <li><b>Hydrophobe Schwänze:</b> die beiden Fettsäurereste.</li>
</ul>
${BF('s14-b4')}
<p>Im Wasser ordnen sich Phospholipide so an, dass die Schwänze zusammenliegen und die Köpfe zum Wasser zeigen. Es entstehen ein Film an der Wasseroberfläche oder kleine Kugeln (<b>Micellen</b>).</p>
<div class="bookfigs">${BF('s14-b2')}${BF('s14-b3')}</div>
<h3>Aufbau der Biomembran</h3>
<p>Die Biomembran besteht vor allem aus Phospholipiden und Proteinen. Die Phospholipide bilden eine <b>Lipiddoppelschicht</b>:</p>
<ul>
  <li>Die hydrophoben Schwänze zeigen nach innen.</li>
  <li>Die hydrophilen Köpfe zeigen zum Wasser, nach außen und zum Cytoplasma.</li>
</ul>
<p>Sichtbar wurde dieser Aufbau erst mit dem Elektronenmikroskop.</p>
${BF('s15-b1')}
${BF('s15-b2')}
<h3>Bestandteile und ihre Aufgaben</h3>
<ul>
  <li><b>Integrale Proteine</b> durchspannen die Doppelschicht oder sind mit einem hydrophoben Teil darin verankert. Sie sind seitlich beweglich und dienen z. B. als Kanäle oder Carrier.</li>
  <li><b>Periphere Proteine</b> liegen an den Phospholipiden oder an integralen Proteinen an.</li>
  <li><b>Kohlenhydratketten</b> sitzen auf der Außenseite an Proteinen oder Lipiden. Sie bilden die <b>Glykokalyx</b>, die der Erkennung von Zellen dient.</li>
  <li><b>Cholesterin</b> macht in tierischen Membranen bis zu 25 % aus. Es verhindert, dass die Membran bei tiefen Temperaturen zu unbeweglich wird.</li>
  <li><b>Zytoskelett:</b> Filamente an der Innenseite der Membran (im Modell B2 eingezeichnet).</li>
</ul>
${NOTE('<p>Die Aufgabe des Zytoskeletts erklärt S. 15 nur über die Abbildung.</p><p>S. 18 („Ein Modell zur Beweglichkeit in der Membran“) zeigt, dass das Zytoskelett die Beweglichkeit der Membranproteine einschränkt (Fence-Modell). Dort fällt auch der Name Flüssig-Mosaik-Modell. Diese Seite steht nicht auf der Checkliste.</p>')}`,
      termdefs: [
        ['Lipide', 'Hydrophobe Stoffe: Fette, Phospholipide'],
        ['Fettmolekül', 'Glycerin, mit drei Fettsäuren verestert'],
        ['Fettsäuren', 'Langkettige Carbonsäuren; gesättigt (ohne Doppelbindungen) oder ungesättigt (mit Doppelbindungen)'],
        ['Phospholipide', 'Glycerin mit zwei Fettsäuren und einer Phosphatgruppe; hydrophiler Kopf, zwei hydrophobe Schwänze'],
        ['Micelle', 'Kugel aus Phospholipiden im Wasser, Schwänze innen'],
        ['Biomembran', 'Lipiddoppelschicht mit Proteinen und Kohlenhydraten'],
        ['Integrale Proteine', 'Durchspannen die Membran oder stecken mit einem Teil darin (Kanäle, Carrier)'],
        ['Periphere Proteine', 'An Phospholipiden oder integralen Proteinen angelagert'],
        ['Kohlenhydrate / Glykokalyx', 'Ketten auf der Außenseite; Erkennung von Zellen'],
        ['Cholesterin', 'Membranbestandteil tierischer Zellen; hält die Membran bei Kälte beweglich'],
        ['Zytoskelett', 'Filamente auf der Cytoplasmaseite der Membran']
      ],
      mechanism: `
<h3>Modell der Biomembran zeichnen</h3>
<ol class="steps">
  <li>Zwei Reihen Phospholipide zeichnen: Köpfe außen, Schwänze innen.</li>
  <li>Integrale Proteine einzeichnen: eines durchgehend, eines als Kanalprotein.</li>
  <li>Ein peripheres Protein an der Innenseite anlagern.</li>
  <li>Kohlenhydratketten auf der Außenseite an Protein und Lipid setzen.</li>
  <li>Cholesterin zwischen die Phospholipide zeichnen und Filamente des Zytoskeletts innen ergänzen.</li>
  <li>Extrazellulären Raum und Cytoplasma beschriften.</li>
</ol>`,
      connections: `
<p>Die hydrophobe Mitte der Membran lässt viele Teilchen nicht durch. Membranproteine überwinden diese Barriere gezielt (Thema 4).</p>
<p>Weil die Membran beweglich ist, können Vesikel abgeschnürt werden und mit der Membran verschmelzen (Thema 5).</p>`,
      figures: [['phospholipid', 'Phospholipide in Wasser'], ['membrane', 'Modell einer Biomembran']],
      exam: [
        'Unterschied zwischen Fettsäure und Fett erklären (S. 14, Aufgabe 1).',
        'Begründen, warum Phospholipide sich zum Aufbau von Membranen eignen (S. 14, Aufgabe 2).',
        'Erläutern, wie sich hydrophile und hydrophobe Anteile auf den Aufbau der Membran auswirken (S. 15, Aufgabe 2).',
        'Hypothese, warum manche Proteine die Membran durchspannen (S. 15, Aufgabe 3): Ihr hydrophober Mittelteil liegt im Inneren der Doppelschicht.',
        'Modell der Biomembran zeichnen und beschriften.'
      ],
      errors: [
        ['Die Fettsäureschwänze zeigen zum Wasser.', 'Die hydrophilen Köpfe zeigen zum Wasser, die Schwänze nach innen.'],
        ['Kohlenhydrate liegen auf beiden Seiten der Membran.', 'Sie sitzen auf der Außenseite (Glykokalyx).'],
        ['Fett und Fettsäure sind dasselbe.', 'Ein Fett besteht aus Glycerin und drei Fettsäuren.']
      ],
      summary: [
        'Fett: Glycerin und drei Fettsäuren.',
        'Phospholipid: zwei Fettsäuren und eine Phosphatgruppe, also hydrophiler Kopf und hydrophobe Schwänze.',
        'Im Wasser: Doppelschicht oder Micellen.',
        'Membran: Phospholipide, integrale und periphere Proteine, Kohlenhydrate außen, Cholesterin, Zytoskelett innen.'
      ],
      selfcheck: [
        ['Warum bilden Phospholipide im Wasser eine Doppelschicht?', 'Die hydrophoben Schwänze lagern sich zusammen, die hydrophilen Köpfe zeigen zum Wasser.'],
        ['Unterscheide integrale und periphere Proteine.', 'Integrale stecken in der Membran oder durchspannen sie; periphere liegen an.'],
        ['Welche Aufgabe hat die Glykokalyx?', 'Erkennung von Zellen.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Reine Lipidmembranen lassen viele Teilchen kaum durch.</li>
  <li><b>Membrantransportproteine</b> überwinden diese Barriere gezielt und legen die Transportrichtung fest.</li>
</ul>
${BF('s20-b1')}`,
      explain: `
<h3>Passiver Transport</h3>
<p>Gelöste Teilchen sind in ständiger, ungerichteter Bewegung. Dadurch wandern mehr Teilchen vom Ort hoher zum Ort niedriger Konzentration als umgekehrt. Transport in diese Richtung braucht <b>keine Energie</b>.</p>
<ul>
  <li><b>Einfache Diffusion:</b> Kleine Moleküle wie O<sub>2</sub> und CO<sub>2</sub> diffundieren direkt durch die Membran. Wasser gelangt so nur langsam hindurch; schnell und gezielt geht es durch die Wasserkanäle (<b>Aquaporine</b>).</li>
  <li><b>Kanalvermittelte Diffusion:</b> Ein geöffneter Kanal lässt nur eine bestimmte Teilchensorte durch. Entscheidend sind Größe und Ladung. Viele Kanäle können sich öffnen und schließen.</li>
  <li><b>Carriervermittelte Diffusion:</b> Der Carrier hat eine Bindungsstelle für ein bestimmtes Molekül oder Ion und transportiert nur dieses.</li>
</ul>
<h3>Aktiver Transport</h3>
<p>Transport entgegen dem Konzentrationsgefälle braucht Energie, meist in Form von ATP.</p>
<ul>
  <li><b>Primär aktiver Transport:</b> Die Energie stammt direkt aus ATP.</li>
  <li><b>Sekundär aktiver Transport:</b> ATP ist nur indirekt beteiligt. Der Transport ist an den Transport einer anderen Teilchensorte <i>mit</i> deren Gefälle gekoppelt.</li>
  <li><b>Symport:</b> Beide Teilchensorten wandern in dieselbe Richtung.</li>
  <li><b>Antiport:</b> Die Teilchensorten wandern in entgegengesetzte Richtungen.</li>
</ul>
<p>Auch der Transport über <b>Vesikel</b> (Exo- und Endocytose) zählt im Buch zum aktiven Transport (B1, Thema 5).</p>
<h3>Glucose aus dem Darm ins Blut</h3>
<p>Drei Transporter sind nötig (S. 21, B2):</p>
<ol>
  <li><b>Na<sup>+</sup>-Glucose-Symporter</b> (sekundär aktiv): Er nimmt Glucose aus dem Darmlumen in die Darmzelle auf, obwohl die Glucosekonzentration in der Zelle höher ist. Gekoppelt ist das an den Einstrom von Na<sup>+</sup>-Ionen mit ihrem Gefälle.</li>
  <li><b>Natrium-Kalium-Ionenpumpe</b> (primär aktiv, Antiport, ATP): Sie pumpt Na<sup>+</sup> aus der Zelle und K<sup>+</sup> hinein. So bleibt die Na<sup>+</sup>-Konzentration in der Zelle niedrig.</li>
  <li><b>Carrier</b> (carriervermittelte erleichterte Diffusion): Die Glucose verlässt die Zelle mit ihrem Gefälle in die Gewebsflüssigkeit und gelangt von dort ins Blut.</li>
</ol>
${BF('s21-b2')}
<p>B3 zeigt: Mit Na<sup>+</sup>-Ionen bindet Glucose etwa neunmal häufiger an den Symporter (ca. 9 % statt ca. 1 %). Der Symporter arbeitet also nur gekoppelt an Na<sup>+</sup> effektiv.</p>
${BF('s21-b3')}
${CLASS('<p>Arbeitsblatt „Schwierigkeiten bei der Nährstoff-Resorption“: Viele Nährstoffe gelangen durch erleichterte Diffusion in die Darmzellen, Wasser über Aquaporine. Glucose wird sekundär aktiv aufgenommen, weil sie in der Zelle höher konzentriert ist als im Darmlumen.</p>')}`,
      termdefs: [
        ['Einfache Diffusion', 'Teilchen diffundieren direkt durch die Lipiddoppelschicht, mit dem Gefälle (O₂, CO₂)'],
        ['Kanalvermittelte Diffusion', 'Durch einen Kanal, spezifisch nach Größe und Ladung, mit dem Gefälle'],
        ['Carriervermittelte Diffusion', 'Durch einen Carrier mit Bindungsstelle, mit dem Gefälle'],
        ['Aquaporine', 'Wasserkanäle'],
        ['Primär aktiver Transport', 'Gegen das Gefälle, Energie direkt aus ATP (Pumpe)'],
        ['Sekundär aktiver Transport', 'Gegen das Gefälle, gekoppelt an den Transport einer anderen Teilchensorte mit deren Gefälle'],
        ['Symport', 'Zwei Teilchensorten in dieselbe Richtung'],
        ['Antiport', 'Zwei Teilchensorten in entgegengesetzte Richtungen']
      ],
      mechanism: `
<h3>Entscheidungsweg</h3>
<ol class="steps">
  <li>Wandert der Stoff mit dem Konzentrationsgefälle? Dann ist der Transport passiv, also ohne Energie.</li>
  <li>Passiv und klein (O<sub>2</sub>, CO<sub>2</sub>): einfache Diffusion. Größer oder geladen: Kanal oder Carrier.</li>
  <li>Gegen das Gefälle: aktiver Transport. Energie direkt aus ATP bedeutet primär aktiv, Kopplung an ein anderes Gefälle bedeutet sekundär aktiv.</li>
  <li>Zwei Teilchensorten gleichzeitig: Symport bei gleicher Richtung, Antiport bei entgegengesetzter Richtung.</li>
</ol>`,
      connections: `
<p>Der sekundär aktive Symport funktioniert nur, solange die primär aktive Pumpe das Na<sup>+</sup>-Gefälle aufrechterhält. Deshalb braucht der Glucosetransport drei Transporter (S. 21, Aufgabe 3).</p>`,
      figures: [['transport', 'Membrantransport'], ['glucose', 'Glucosetransport']],
      exam: [
        'Aktiven und passiven Transport unterscheiden (S. 21, Aufgabe 1).',
        'Messdaten in B3 auswerten (S. 21, Aufgabe 2): Na<sup>+</sup> erhöht die Bindung der Glucose an den Symporter stark.',
        'Begründen, warum drei Transporter nötig sind (S. 21, Aufgabe 3).',
        'Glucosetransport schrittweise mit Fachbegriffen und Konzentrationsangaben beschreiben.'
      ],
      errors: [
        ['Bei jedem aktiven Transport wird ATP direkt verbraucht (aus deinem Aufschrieb).', 'Nur beim primär aktiven Transport. Beim sekundär aktiven Transport ist ATP nur indirekt beteiligt.'],
        ['Erleichterte Diffusion geht nur über Carrier (aus deinem Aufschrieb).', 'Auch über Kanäle (kanalvermittelte Diffusion).'],
        ['„Na⁺ möchte in die Zelle“ (aus deinem Aufschrieb)', 'Sachlich formulieren: Na⁺ diffundiert mit seinem Konzentrationsgefälle in die Zelle.'],
        ['Glucose gelangt per Pumpe ins Blut.', 'Sie verlässt die Darmzelle passiv über einen Carrier.']
      ],
      summary: [
        'Passiv, mit dem Gefälle, ohne Energie: einfache, kanalvermittelte und carriervermittelte Diffusion.',
        'Aktiv, gegen das Gefälle: primär aktiv (direkt ATP) oder sekundär aktiv (gekoppelt).',
        'Symport: gleiche Richtung; Antiport: entgegengesetzte Richtung.',
        'Glucose: Na⁺-Glucose-Symporter, dann Na⁺-K⁺-Pumpe, dann Carrier ins Blut.'
      ],
      selfcheck: [
        ['Warum ist der Na⁺-Glucose-Symporter sekundär aktiv?', 'Er transportiert Glucose gegen ihr Gefälle; die Energie stammt aus dem Na⁺-Gefälle, das die ATP-getriebene Pumpe aufbaut.'],
        ['Welche Aufgabe hat die Natrium-Kalium-Pumpe beim Glucosetransport?', 'Sie hält die Na⁺-Konzentration in der Darmzelle niedrig.'],
        ['Wie gelangt Wasser schnell durch die Membran?', 'Durch Aquaporine.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Zellen sind durch Membranen in <b>Kompartimente</b> gegliedert. Dadurch können Reaktionen getrennt ablaufen, z. B. bei unterschiedlichem pH-Wert.</li>
  <li>Zwischen den Kompartimenten und nach außen werden Stoffe häufig in <b>Vesikeln</b> transportiert.</li>
</ul>`,
      explain: `
<h3>Exocytose und Endocytose</h3>
<ul>
  <li><b>Exocytose:</b> Ein Vesikel verschmilzt mit der Zellmembran und gibt seinen Inhalt nach außen ab.</li>
  <li><b>Endocytose:</b> Die Zellmembran stülpt sich nach innen ein und schnürt sich als Vesikel ab (<b>Membranabschnürung</b>).</li>
</ul>
<h3>Rezeptorvermittelte Endocytose von Eisen</h3>
<p>Bei der rezeptorvermittelten Endocytose schnürt sich die Membran erst ein, wenn ein Stoff an ein Membranprotein gebunden hat, den <b>Rezeptor</b>. So werden gezielt bestimmte Teilchen aufgenommen, auch solche in sehr geringer Konzentration.</p>
<ol>
  <li>Im Blut bindet das Protein <b>Transferrin</b> Eisen-Ionen.</li>
  <li>Beladenes Transferrin bindet an den <b>Transferrinrezeptor</b> (TfR) der Zellmembran.</li>
  <li>Die Membran stülpt sich an dieser Stelle ein. <b>Clathrin</b> auf der Außenseite des Vesikels stabilisiert die Einstülpung. Das Vesikel wird abgeschnürt.</li>
  <li>Im Vesikel sinkt der pH-Wert von 7,4 (Blut) auf 5,5. Dadurch lösen sich die Eisen-Ionen vom Transferrin und gelangen ins Cytoplasma.</li>
  <li>Rezeptor und Transferrin kehren mit einem Vesikel zur Zellmembran zurück und werden durch Exocytose wieder eingebaut (laut Abbildung).</li>
</ol>
${BF('s22-b1')}
${NOTE('<p>Der Buchtext beschreibt die Schritte bis zur Abschnürung. Die pH-Werte und den Rückweg zeigt nur die Abbildung B1.</p><p>Wie die Ansäuerung im Vesikel entsteht, steht nicht im Buch.</p>')}
<h3>Membranfluss am Beispiel Insulin (S. 23)</h3>
<p><b>Synthese und Freisetzung (B1):</b></p>
<ol>
  <li>Insulin wird in den β-Zellen der Bauchspeicheldrüse am ER als Vorstufe (Prohormon) gebildet.</li>
  <li>Es wird in Vesikeln zum Golgi-Apparat transportiert.</li>
  <li>Von dort gelangt es in Vesikeln zur Zellmembran und wird durch Exocytose ins Blut abgegeben.</li>
</ol>
${BF('s23-b1')}
<p><b>Wirkung auf Körperzellen (B2):</b></p>
<ol>
  <li>Insulin bindet an einen Rezeptor. Über ein Signalprotein wird eine Signalkette ausgelöst.</li>
  <li>Daraufhin schnüren sich von einem großen Speichervesikel kleinere Vesikel ab. Sie tragen Transportproteine für Glucose.</li>
  <li>Diese Vesikel verschmelzen mit der Zellmembran. So gelangen die Transporter in die Zellmembran (<b>Membranfluss</b>).</li>
</ol>
<p>Dadurch steigt die Glucoseaufnahme bis auf das 50-Fache. Später werden die Transporter wieder durch Endocytose aufgenommen.</p>
${BF('s23-b2')}
${CLASS('<p>Zu S. 23, Aufgabe 3: Ohne Insulin werden kaum Glucose-Transporter in die Membran eingebaut. Die Zellen nehmen deshalb trotz hoher Blutglucose wenig Glucose auf. Ihnen steht weniger Energie zur Verfügung, die Leistung sinkt.</p>')}`,
      termdefs: [
        ['Exocytose', 'Vesikel verschmilzt mit der Zellmembran, der Inhalt gelangt nach außen'],
        ['Endocytose', 'Membran stülpt sich ein und schnürt sich als Vesikel ab'],
        ['Rezeptor', 'Membranprotein, das einen bestimmten Stoff bindet'],
        ['Rezeptorvermittelte Endocytose', 'Endocytose, die erst nach Bindung an einen Rezeptor einsetzt'],
        ['Membranabschnürung', 'Abtrennung eines Vesikels von einer Membran'],
        ['Membranfluss', 'Membranmaterial wandert über Vesikel zwischen Kompartimenten und Zellmembran (z. B. Glucose-Transporter bei Insulin)'],
        ['Transferrin', 'Protein im Blut, das Eisen-Ionen bindet'],
        ['Clathrin', 'Protein, das die Einstülpung bei der rezeptorvermittelten Endocytose stabilisiert'],
        ['pH-Wert', 'Im Vesikel sinkt er auf 5,5, dadurch löst sich das Eisen vom Transferrin']
      ],
      mechanism: `
<h3>Eisenaufnahme in Kurzform</h3>
<ol class="steps">
  <li>Transferrin bindet Fe im Blut (pH 7,4).</li>
  <li>Transferrin bindet an den Rezeptor (TfR).</li>
  <li>Die Membran stülpt sich mit Clathrin ein und schnürt ein Vesikel ab.</li>
  <li>Der pH im Vesikel sinkt auf 5,5, Fe wird frei.</li>
  <li>Rezeptor und Transferrin kehren zur Membran zurück.</li>
</ol>`,
      connections: `
<p>Rezeptoren machen die Aufnahme spezifisch und effizient (S. 22, Aufgabe 2). Der pH-Wechsel ist nötig, damit das Eisen in der Zelle frei wird (S. 22, Aufgabe 1).</p>
<p>Membranfluss verbindet Thema 3 (bewegliche Membran) mit Thema 4: Die Zahl der Transportproteine in der Membran wird über Vesikel reguliert.</p>`,
      figures: [['endocytosis', 'Rezeptorvermittelte Endocytose von Eisen'], ['exocytosis', 'Exocytose und Membranfluss']],
      exam: [
        'Notwendigkeit der pH-Wert-Änderung im Endocytosevesikel erklären (S. 22, Aufgabe 1).',
        'Begründen, warum rezeptorvermittelte Endocytose bei geringer Konzentration vorteilhaft ist (S. 22, Aufgabe 2).',
        'Synthese und Vesikeltransport von Insulin beschreiben (S. 23, Aufgabe 1).',
        'Glucoseaufnahme mithilfe von Insulin erläutern und den Begriff Membranfluss erklären (S. 23, Aufgaben 2 und 4).'
      ],
      errors: [
        ['Endocytose: Vesikel verschmilzt mit der Zellmembran.', 'Das ist Exocytose. Bei der Endocytose schnürt sich die Membran ein.'],
        ['Insulin gelangt selbst in die Zelle und transportiert Glucose.', 'Insulin bindet an einen Rezeptor und löst eine Signalkette aus. Dadurch kommen Glucose-Transporter in die Membran.']
      ],
      summary: [
        'Exocytose: Verschmelzen und Abgabe nach außen. Endocytose: Einstülpen und Abschnüren.',
        'Eisen: Transferrin, Rezeptor, Clathrin-Vesikel, pH-Abfall, Fe wird frei.',
        'Insulin: Exocytose aus β-Zellen. An Körperzellen bringt Membranfluss Glucose-Transporter in die Membran.'
      ],
      selfcheck: [
        ['Welche Rolle spielt der Rezeptor bei der Eisenaufnahme?', 'Er bindet das beladene Transferrin; erst dann wird das Vesikel gebildet.'],
        ['Warum sinkt der pH-Wert im Vesikel?', 'Damit sich das Eisen vom Transferrin löst.'],
        ['Was ist Membranfluss?', 'Membran wird über Vesikel zwischen Kompartimenten und Zellmembran ausgetauscht.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Enzyme sind Proteine, die Stoffwechselreaktionen beschleunigen.</li>
  <li>Beispiel im Buch: Das Enzym <b>Lactase</b> spaltet Milchzucker. Fehlt es, ist der Mensch lactoseintolerant.</li>
</ul>
${BF('s26-rand')}`,
      explain: `
<h3>Aktivierungsenergie</h3>
<p>Lactase spaltet Lactose unter Aufnahme von Wasser (<b>Hydrolyse</b>) in Glucose und Galactose. Ohne Enzym läuft diese Reaktion bei Körpertemperatur nur sehr langsam ab. Der Grund: Um bestehende Bindungen zu spalten, muss zuerst <b>Aktivierungsenergie</b> zugeführt werden.</p>
<ul>
  <li>Enzyme liefern keine Energie.</li>
  <li>Sie bilden mit dem Substrat einen <b>Enzym-Substrat-Komplex</b> und setzen so die Aktivierungsenergie herab.</li>
  <li>Je geringer die Aktivierungsenergie, desto mehr Moleküle reagieren. Mit Lactase läuft die Reaktion etwa 10 000 000-fach schneller.</li>
</ul>
${BF('s26-b2')}
<p>Im Energiediagramm ist die frei werdende Energie mit und ohne Enzym gleich groß. Nur die Aktivierungsenergie unterscheidet sich.</p>
<h3>Aktives Zentrum</h3>
<p>Das <b>aktive Zentrum</b> ist eine taschenförmige Vertiefung im Enzym. Dort liegen Aminosäurereste in einer bestimmten Anordnung. Sie gehen mit dem Substrat Wechselwirkungen ein:</p>
<ul>
  <li>Ionenbindungen,</li>
  <li>Wasserstoffbrücken,</li>
  <li>Dipol-Dipol- und Van-der-Waals-Kräfte.</li>
</ul>
<p>Dadurch werden Bindungen im Substrat gelockert.</p>
${BF('s26-b3')}
<p>Ein Enzym kann eine Reaktion auf drei Arten begünstigen:</p>
<ul>
  <li>Es richtet zwei Substrate passend zueinander aus.</li>
  <li>Es erzeugt oder verschiebt Ladungen im Substrat.</li>
  <li>Es verbiegt das Substrat mechanisch.</li>
</ul>
<h3>Katalytischer Zyklus</h3>
<ol>
  <li>Das Enzym bindet das Substrat: Enzym-Substrat-Komplex.</li>
  <li>Das Substrat geht in einen reaktionsfähigen Übergangszustand über und reagiert bei niedriger Aktivierungsenergie.</li>
  <li>Die Produkte haben eine geringere Affinität zum Enzym und lösen sich.</li>
  <li>Das Enzym liegt unverändert vor und kann das nächste Substrat binden.</li>
</ol>
<p>Enzyme werden also nicht verbraucht. Deshalb reichen geringe Mengen.</p>
${BF('s26-b1')}
<h3>Cofaktoren</h3>
<p>Manche Enzyme brauchen neben dem Proteinteil einen <b>Cofaktor</b>:</p>
<ul>
  <li><b>Anorganische Cofaktoren:</b> Metall-Ionen wie Eisen, Kupfer oder Mangan aus der Nahrung. Sie sind fest gebunden und stabilisieren den Übergangszustand.</li>
  <li><b>Coenzyme:</b> organische Cofaktoren. Davon gibt es zwei Arten:
    <ul>
      <li><b>Prosthetische Gruppe:</b> fest gebunden, ständiger Bestandteil des Enzyms.</li>
      <li><b>Cosubstrat:</b> nur kurzfristig gebunden. Es wird bei der Reaktion verändert, nimmt z. B. Wasserstoff-Ionen, Elektronen oder Gruppen auf oder gibt sie ab. Nach der Reaktion wird es frei und in einer Folgereaktion regeneriert.</li>
    </ul>
  </li>
</ul>
${BF('s27-b4')}
${CLASS('<p>Im Unterricht stand: „Stoffwechselreaktionen laufen nicht spontan ab.“</p><p>Genauer: Ohne Enzym laufen sie bei Körpertemperatur viel zu langsam ab. Das Enzym beschleunigt sie, ändert aber nicht die Energie, die bei der Reaktion frei wird (B2).</p>')}`,
      termdefs: [
        ['Aktivierungsenergie', 'Energie, die zugeführt werden muss, damit eine Reaktion startet'],
        ['Enzym-Substrat-Komplex', 'Enzym mit gebundenem Substrat; Übergangszustand mit geringerer Aktivierungsenergie'],
        ['Aktives Zentrum', 'Taschenförmige Vertiefung des Enzyms, in der das Substrat gebunden und umgesetzt wird'],
        ['Katalytischer Zyklus', 'Bindung, Umsetzung, Freisetzung der Produkte, freies Enzym'],
        ['Cofaktor', 'Zusätzliche Komponente eines Enzyms: Metall-Ion oder Coenzym'],
        ['Coenzym', 'Organischer Cofaktor: prosthetische Gruppe oder Cosubstrat'],
        ['Prosthetische Gruppe', 'Fest gebundenes Coenzym'],
        ['Cosubstrat', 'Kurzfristig gebundenes Coenzym; wird verändert und später regeneriert'],
        ['Apoenzym / Holoenzym', 'Proteinteil allein / Proteinteil mit Cofaktor (Beschriftung in B4)']
      ],
      mechanism: `
<h3>Katalytischer Zyklus zeichnen</h3>
<ol class="steps">
  <li>Enzym mit passendem aktiven Zentrum und Substrat zeichnen.</li>
  <li>Enzym-Substrat-Komplex zeichnen.</li>
  <li>Produkte lösen sich vom Enzym.</li>
  <li>Pfeil zurück zum freien Enzym zeichnen.</li>
  <li>Alles beschriften: Enzym, Substrat, Enzym-Substrat-Komplex, Produkte.</li>
</ol>`,
      connections: `
<p>Die Form des aktiven Zentrums ergibt sich aus der Tertiärstruktur (Thema 2). Deshalb sind Enzyme spezifisch (Thema 7).</p>
<p>Deshalb wirken sich auch Temperatur, pH-Wert und Hemmstoffe auf ihre Aktivität aus (Themen 9 und 10).</p>`,
      figures: [['catalysis', 'Katalytischer Zyklus und Energiediagramm']],
      exam: [
        'Allgemeine Eigenschaften von Enzymen nennen (S. 27, Aufgabe 1).',
        'Erklären, warum mit Enzym weniger Aktivierungsenergie nötig ist (S. 27, Aufgabe 2).',
        'Begründen, warum geringe Enzymmengen ausreichen (S. 27, Aufgabe 3).',
        'Begründen, warum der Austausch einer Aminosäure im aktiven Zentrum die Funktion verändern kann (S. 27, Aufgabe 4).',
        'Prosthetische Gruppe und Cosubstrat unterscheiden.'
      ],
      errors: [
        ['Enzyme liefern die Energie für die Reaktion.', 'Sie senken nur die Aktivierungsenergie.'],
        ['Reaktionen laufen ohne Enzym gar nicht ab / „nicht spontan“ (aus deinem Aufschrieb).', 'Sie laufen viel langsamer ab. Die frei werdende Energie ändert das Enzym nicht.'],
        ['Enzyme werden bei der Reaktion verbraucht.', 'Sie gehen unverändert aus der Reaktion hervor.'],
        ['Ein Cosubstrat ist fest gebunden.', 'Fest gebunden ist die prosthetische Gruppe. Das Cosubstrat ist nur kurz gebunden.']
      ],
      summary: [
        'Enzyme senken die Aktivierungsenergie über den Enzym-Substrat-Komplex.',
        'Aktives Zentrum: Tasche mit Aminosäureresten, die das Substrat binden und Bindungen lockern.',
        'Zyklus: E + S, dann ES, dann E + P. Das Enzym wird nicht verbraucht.',
        'Cofaktoren: Metall-Ionen oder Coenzyme (prosthetische Gruppe fest, Cosubstrat kurzzeitig).'
      ],
      selfcheck: [
        ['Was zeigt das Energiediagramm (S. 26, B2)?', 'Mit Enzym ist die Aktivierungsenergie kleiner; die frei werdende Energie bleibt gleich.'],
        ['Warum lösen sich die Produkte vom Enzym?', 'Sie haben eine geringere Affinität zum Enzym als das Substrat.'],
        ['Unterscheide prosthetische Gruppe und Cosubstrat.', 'Prosthetische Gruppe: fest gebunden. Cosubstrat: kurzzeitig gebunden, wird verändert und regeneriert.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>In einem Kompartiment laufen viele Reaktionen gleichzeitig ab.</li>
  <li>Dass sie geordnet ablaufen, liegt an den passenden Wechselwirkungen zwischen Enzym und Substrat.</li>
</ul>`,
      explain: `
<h3>Substratspezifität</h3>
<p>Substrate unterscheiden sich in Größe, Form und Ladungsverteilung. Ein Substrat wird nur gebunden, wenn es zur Struktur des aktiven Zentrums passt. Nur dann entsteht der Enzym-Substrat-Komplex.</p>
<p>Das Bild dazu ist das <b>Schlüssel-Schloss-Prinzip</b>: Das Substrat passt zum Enzym wie ein Schlüssel zum Schloss. Enzyme katalysieren deshalb nur die Reaktion passender Substrate, sie sind <b>substratspezifisch</b>.</p>
<h3>Wirkungsspezifität</h3>
<p>Ein Substrat könnte grundsätzlich unterschiedlich umgesetzt werden. Das Enzym katalysiert aber stets dieselbe Reaktion, es entstehen immer dieselben Produkte. Enzyme sind also <b>wirkungsspezifisch</b>. Grund sind die Wechselwirkungen der Aminosäurereste im aktiven Zentrum.</p>
${BF('s28-b1')}
<h3>Induced-Fit-Modell</h3>
<p>Häufig verändert erst die Bindung des Substrats die Struktur des Enzyms so, dass beide optimal zueinander passen. Diese induzierte Passform heißt <b>induced fit</b>.</p>
${BF('s28-b2')}
<h3>Vergleich der beiden Modelle</h3>
<div class="table-wrap"><table class="data"><thead><tr><th></th><th>Schlüssel-Schloss-Prinzip</th><th>Induced-Fit-Modell</th></tr></thead><tbody>
<tr><th>Aktives Zentrum</th><td>passt schon vor der Bindung</td><td>passt sich bei der Bindung an</td></tr>
<tr><th>Enzym</th><td>starr dargestellt</td><td>Struktur verändert sich</td></tr>
<tr><th>Gemeinsam</th><td colspan="2">Nur passende Substrate bilden einen Enzym-Substrat-Komplex.</td></tr>
</tbody></table></div>
${CLASS('<p>Arbeitsblatt „Was ein Enzym so alles kann“: Bild C zeigt <b>Gruppenspezifität</b>. Ein Enzym setzt dabei verschiedene Substrate um, die einen gleichen Molekülteil besitzen. Der Begriff steht nicht im Buch.</p><p>In deinem Aufschrieb fehlen bei Nr. 2 noch die verlangten Beispiele aus anderen Bereichen des Körpers.</p>')}`,
      termdefs: [
        ['Substratspezifität', 'Ein Enzym setzt nur Substrate um, die zum aktiven Zentrum passen'],
        ['Wirkungsspezifität', 'Ein Enzym katalysiert für sein Substrat immer dieselbe Reaktion'],
        ['Schlüssel-Schloss-Prinzip', 'Substrat passt zum aktiven Zentrum wie Schlüssel zu Schloss'],
        ['Induced-Fit-Modell', 'Die Bindung des Substrats verändert die Struktur des Enzyms, sodass beide optimal passen'],
        ['Enzym-Substrat-Komplex', 'Nur bei passendem Substrat gebildet']
      ],
      mechanism: `
<ol class="steps">
  <li>Ein Substrat erreicht das aktive Zentrum.</li>
  <li>Passen Größe, Form und Ladung nicht, entsteht kein Komplex und keine Reaktion.</li>
  <li>Passt das Substrat, entsteht der Enzym-Substrat-Komplex. Beim Induced Fit ändert sich dabei die Form des Enzyms.</li>
  <li>Die Reste im aktiven Zentrum lenken immer dieselbe Umwandlung: Wirkungsspezifität.</li>
</ol>`,
      connections: `
<p>Wegen der Spezifität braucht der Körper für seine vielen Reaktionen viele verschiedene Enzyme (S. 28, Aufgabe 3).</p>
<p>Die Spezifität beruht auf der Raumstruktur (Thema 2) und geht bei Denaturierung verloren (Thema 9).</p>`,
      figures: [['inducedfit', 'Schlüssel-Schloss-Prinzip und Induced Fit']],
      exam: [
        'Induced-Fit-Modell und Schlüssel-Schloss-Prinzip vergleichen (S. 28, Aufgabe 1).',
        'Erklären, warum Lactase nur die Spaltung von Lactose katalysiert (S. 28, Aufgabe 2).',
        'Begründen, warum es im Körper mehrere Tausend Enzyme gibt (S. 28, Aufgabe 3).'
      ],
      errors: [
        ['Substrat- und Wirkungsspezifität sind dasselbe.', 'Substratspezifität: welches Substrat. Wirkungsspezifität: welche Reaktion.'],
        ['Beim Induced Fit passt jedes Substrat.', 'Auch hier passen nur geeignete Substrate. Die Passform entsteht erst bei der Bindung.']
      ],
      summary: [
        'Substratspezifisch: nur passende Substrate (Größe, Form, Ladung).',
        'Wirkungsspezifisch: immer dieselbe Reaktion.',
        'Schlüssel-Schloss-Prinzip: passt von vornherein. Induced Fit: Passform entsteht bei der Bindung.'
      ],
      selfcheck: [
        ['Was versteht man unter Wirkungsspezifität?', 'Ein Enzym katalysiert für sein Substrat immer dieselbe Reaktion.'],
        ['Worin unterscheidet sich das Induced-Fit-Modell vom Schlüssel-Schloss-Prinzip?', 'Die optimale Passform entsteht erst durch die Bindung des Substrats.']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Die Geschwindigkeit einer enzymkatalysierten Reaktion hängt ab von:
    <ul>
      <li>Art und Konzentration des Enzyms,</li>
      <li>den Substraten,</li>
      <li>den Umgebungsbedingungen (pH-Wert, Temperatur).</li>
    </ul>
  </li>
  <li>Gemessen wird sie z. B. als Zunahme der Produktkonzentration pro Zeit.</li>
</ul>`,
      explain: `
<h3>Einfluss der Substratkonzentration</h3>
<ul>
  <li><b>Niedrige Substratkonzentration:</b> Enzym und Substrat treffen selten aufeinander. Die Reaktion ist langsam.</li>
  <li><b>Steigende Substratkonzentration:</b> Die Moleküle treffen häufiger zusammen, und ein frei gewordenes aktives Zentrum wird schneller wieder besetzt. Die Geschwindigkeit steigt.</li>
  <li><b>Hohe Substratkonzentration:</b> Ab einer bestimmten Konzentration steigt die Geschwindigkeit nicht weiter. Die <b>maximale Reaktionsgeschwindigkeit v<sub>max</sub></b> für diese Enzymkonzentration ist erreicht. Es gibt mehr Substrat als freie Enzyme.</li>
</ul>
<p>Das Buch veranschaulicht das mit einem Drehtür-Modell: Einkaufende warten vor den Türen (B1).</p>
${BF('s32-b1')}
${EXTRA('<p>Die Checkliste nennt die <b>Brownsche Molekularbewegung</b>. Das Buch beschreibt dasselbe ohne diesen Namen: Gelöste Teilchen sind in ständiger, ungerichteter Bewegung (S. 20). Wie oft Enzym und Substrat aufeinandertreffen, ist deshalb eine Frage der Wahrscheinlichkeit (S. 32).</p>')}
<h3>Michaelis-Menten-Konstante K<sub>M</sub></h3>
<p>Michaelis und Menten (1913) beschrieben die Kurve: Bei gleichbleibender Enzymkonzentration nähert sich v mit steigender Substratkonzentration einem Sättigungswert, v<sub>max</sub>. Weil die Kurve sich v<sub>max</sub> nur asymptotisch nähert, ist die genaue Substratkonzentration bei v<sub>max</sub> schwer zu bestimmen.</p>
<p>Man bestimmt deshalb grafisch die Substratkonzentration bei <b>½ v<sub>max</sub></b>. Das ist die <b>Michaelis-Menten-Konstante K<sub>M</sub></b>.</p>
${BF('s33-b3')}
<ul>
  <li>Die tatsächlich erreichte v<sub>max</sub> hängt von der Enzymkonzentration ab: weniger Enzym, niedrigere v<sub>max</sub> (B3).</li>
  <li><b>K<sub>M</sub> bleibt gleich.</b> K<sub>M</sub> ist ein Kennzeichen für ein Enzym-Substrat-Paar und unabhängig von Enzym- und Substratkonzentration.</li>
  <li>K<sub>M</sub> ist ein Maß für die <b>Affinität</b>: je kleiner K<sub>M</sub>, desto größer die Affinität, desto früher wird ½ v<sub>max</sub> erreicht.</li>
</ul>
<h3>Wechselzahl k<sub>cat</sub></h3>
<p>Die Wechselzahl k<sub>cat</sub> gibt an, wie viele Substratmoleküle pro Sekunde an einem aktiven Zentrum umgesetzt werden, wenn v<sub>max</sub> erreicht ist. Je größer k<sub>cat</sub>, desto höher die Arbeitsgeschwindigkeit des Enzyms. Sie hängt davon ab, wie leicht der Enzym-Substrat-Komplex entsteht und wie schnell die Produkte abgestoßen werden.</p>
${BF('s32-b2')}
<h3>Isoenzyme (Randspalte S. 33)</h3>
<p>Isoenzyme katalysieren dieselbe Reaktion, haben aber eine andere Aminosäuresequenz und damit unterschiedliche K<sub>M</sub>-Werte.</p>
<p>Beispiel <b>Aldehyddehydrogenase (ALDH)</b> beim Alkoholabbau:</p>
<ul>
  <li>ALDH2 im Mitochondrium: K<sub>M</sub> = 0,001 mmol/l, also hohe Affinität.</li>
  <li>ALDH1 im Cytoplasma: K<sub>M</sub> = 0,050 mmol/l.</li>
</ul>
<p>Ist ALDH2 inaktiv, wird giftiges Acetaldehyd zu langsam abgebaut.</p>
${CLASS('<p>Aus deinem Aufschrieb (korrekt):</p><ul><li>v<sub>max</sub> = k<sub>cat</sub> · Enzymkonzentration.</li><li>Drehtür = Enzym, Einkaufende = Substrat, Personen pro Sekunde und Tür ≈ k<sub>cat</sub>, mehr Türen bedeuten höheres v<sub>max</sub>.</li></ul>')}`,
      termdefs: [
        ['Reaktionsgeschwindigkeit', 'Umgesetzte Stoffmenge pro Zeit, z. B. Zunahme der Produktkonzentration'],
        ['v<sub>max</sub>', 'Maximale Reaktionsgeschwindigkeit bei gegebener Enzymkonzentration; alle aktiven Zentren sind ständig besetzt'],
        ['½ v<sub>max</sub>', 'Halbmaximale Reaktionsgeschwindigkeit; dient zur Bestimmung von K<sub>M</sub>'],
        ['K<sub>M</sub>', 'Substratkonzentration bei ½ v<sub>max</sub>; Maß für die Affinität, unabhängig von der Enzymkonzentration'],
        ['k<sub>cat</sub> (Wechselzahl)', 'Substratmoleküle pro Sekunde je aktivem Zentrum bei v<sub>max</sub>'],
        ['Affinität', 'Bindungsbestreben zwischen Enzym und Substrat'],
        ['Brownsche Molekularbewegung', 'Ständige, ungerichtete Bewegung gelöster Teilchen (Begriff nicht im Buch)'],
        ['Isoenzyme', 'Enzyme mit gleicher Funktion, aber anderer Sequenz und anderem K<sub>M</sub>']
      ],
      mechanism: `
<h3>Diagramm skizzieren</h3>
<ol class="steps">
  <li>Achsen beschriften: x = Substratkonzentration c, y = Reaktionsgeschwindigkeit v.</li>
  <li>Kurve zeichnen: zuerst steil, dann flacher werdend, Annäherung an eine waagrechte Linie.</li>
  <li>v<sub>max</sub> als gestrichelte waagrechte Linie eintragen.</li>
  <li>½ v<sub>max</sub> eintragen, bis zur Kurve und dann nach unten loten: K<sub>M</sub> auf der x-Achse.</li>
</ol>`,
      connections: `
<p>Bei konkurrierender Hemmung verschiebt sich K<sub>M</sub>, bei nicht-kompetitiver Hemmung sinkt v<sub>max</sub> (Thema 10). Das lässt sich nur mit diesem Diagramm erklären.</p>`,
      figures: [['michaelis', 'Michaelis-Menten-Diagramm']],
      exam: [
        'Aus Tabelle B2 das Enzym mit höchster Affinität (kleinste K<sub>M</sub>: Acetylcholinesterase) und mit höchster Arbeitsgeschwindigkeit (größte k<sub>cat</sub>: Katalase) nennen (S. 33, Aufgabe 1).',
        'Zusammenhang zwischen v<sub>max</sub> und k<sub>cat</sub> erläutern (S. 33, Aufgabe 2).',
        'Analogie zwischen Drehtür-Modell und Reaktionsgeschwindigkeit darstellen (S. 33, Aufgabe 3).',
        'Mögliche Ursachen eines langsamen Alkoholabbaus erläutern (S. 33, Aufgabe 4).',
        'Kurve skizzieren und v<sub>max</sub>, ½ v<sub>max</sub> und K<sub>M</sub> eintragen.'
      ],
      errors: [
        ['K<sub>M</sub> hängt von der Enzymkonzentration ab (aus deinem Aufschrieb).', 'K<sub>M</sub> bleibt gleich; von der Enzymkonzentration hängt nur die erreichte v<sub>max</sub> ab (B3).'],
        ['Große K<sub>M</sub> bedeutet hohe Affinität.', 'Kleine K<sub>M</sub> bedeutet hohe Affinität.'],
        ['K<sub>M</sub> ist eine Geschwindigkeit.', 'K<sub>M</sub> ist eine Substratkonzentration.']
      ],
      summary: [
        'Mehr Substrat bedeutet häufigere Begegnungen und höheres v, bis zur Sättigung bei v<sub>max</sub>.',
        'K<sub>M</sub> = c(S) bei ½ v<sub>max</sub>. Kleine K<sub>M</sub> bedeutet hohe Affinität. Unabhängig von der Enzymkonzentration.',
        'k<sub>cat</sub>: Umsätze pro Sekunde je aktivem Zentrum.'
      ],
      selfcheck: [
        ['Warum steigt v bei hoher Substratkonzentration nicht weiter?', 'Die aktiven Zentren sind ständig besetzt; es gibt mehr Substrat als freie Enzyme.'],
        ['Was passiert mit v<sub>max</sub> und K<sub>M</sub>, wenn man die Enzymkonzentration halbiert?', 'v<sub>max</sub> halbiert sich, K<sub>M</sub> bleibt gleich.'],
        ['Welches Enzym in B2 arbeitet am schnellsten?', 'Katalase (k<sub>cat</sub> = 10 000 000 s⁻¹).']
      ]
    }
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
    sheet: {
      intro: `
<ul>
  <li>Enzyme haben ein charakteristisches <b>Temperaturoptimum</b> und ein <b>pH-Optimum</b>.</li>
  <li>Außerhalb davon sinkt ihre Aktivität. Bei extremen Werten denaturieren sie.</li>
</ul>`,
      explain: `
<h3>Einfluss der Temperatur</h3>
<p>Höhere Temperatur bedeutet eine höhere Reaktionsgeschwindigkeit, denn:</p>
<ul>
  <li>Die Moleküle schwingen und bewegen sich stärker.</li>
  <li>Sie stoßen häufiger und heftiger zusammen.</li>
  <li>Mehr Moleküle erreichen die Aktivierungsenergie.</li>
</ul>
<p>Pro 10 °C verdoppelt bis verdreifacht sich die Geschwindigkeit. Das ist die <b>RGT-Regel</b> (Reaktionsgeschwindigkeits-Temperatur-Regel).</p>
<p>Bei Enzymen gilt die RGT-Regel nur bei niedrigeren Temperaturen (B2, Bereich I). Oberhalb des <b>Temperaturoptimums</b> nimmt die Aktivität schnell ab (Bereich II):</p>
<ul>
  <li>Die Schwingungen werden so stark, dass die Wechselwirkungen der Raumstruktur zerstört werden.</li>
  <li>Das aktive Zentrum verändert sich, das Substrat kann nicht mehr gebunden werden.</li>
</ul>
<p>Diese irreversible Veränderung der Raumstruktur heißt <b>Denaturierung</b>.</p>
<div class="bookfigs">${BF('s36-b2')}${BF('s36-rand')}</div>
<p>Das Temperaturoptimum ist enzymspezifisch. Viele Enzyme des Menschen haben ihr Optimum bei etwa 37 °C, angepasst an die Körpertemperatur.</p>
<p>Wechselwarme Organismen in kälterer Umgebung haben Enzyme mit gleicher Wirkungs- und Substratspezifität, aber niedrigerem Optimum (Isoenzyme). Beispiel B3: Eisfisch, Forelle, Mensch.</p>
${BF('s36-b3')}
<h3>Thermophile Enzyme</h3>
<p>Thermophile Bakterien leben z. B. in heißen Quellen über 80 °C. Die meisten Bakterien überleben höchstens 45 °C.</p>
<ul>
  <li>Beispiel: die <b>Taq-Polymerase</b> aus <i>Thermus aquaticus</i>, noch bei 95 °C aktiv.</li>
  <li>Ihre Raumstruktur ist durch viele Disulfidbrücken und Ionenbindungen stabilisiert.</li>
  <li>Thermophile Enzyme werden in Forschung und Industrie genutzt, z. B. in Waschmitteln.</li>
</ul>
<h3>Einfluss des pH-Werts</h3>
<p>Der pH-Wert ist ein Maß für die Konzentration an Oxonium-Ionen (H<sub>3</sub>O<sup>+</sup>). Ändert sich der pH-Wert, ändern ionisierbare Gruppen im aktiven Zentrum ihre Ladung. Die Aktivität verändert sich.</p>
<p>Je nach Anordnung der Aminosäurereste hat jedes Enzym ein <b>pH-Optimum</b>, angepasst an seinen Wirkort (B4):</p>
<ul>
  <li><b>Speichel-Amylase:</b> Optimum etwa pH 7 (Mund). Im Magen bei pH 1–2 wird sie denaturiert.</li>
  <li><b>Pepsin:</b> Protease mit Optimum bei pH 2 (Magen).</li>
  <li><b>Lactase und Trypsin</b> zeigen B4 im neutralen bis leicht basischen Bereich.</li>
</ul>
${BF('s37-b4')}
<p>Extreme pH-Werte zerstören die Wechselwirkungen der Sekundär- und Tertiärstruktur: Denaturierung. Die Raumstruktur kann sich dabei reversibel oder irreversibel verändern (B5).</p>
${BF('s37-b5')}
${CLASS('<p>Arbeitsblatt zur Lactaseaktivität (Glucose-Teststreifen):</p><ul><li>a (ohne Lactase) = 0: Blindprobe.</li><li>b (pH 8, 37 °C): hoher Wert.</li><li>c (87 °C) = 0: denaturiert.</li><li>d (17 °C): geringer Wert, weil sich die Moleküle langsamer bewegen.</li><li>e (pH 1) = 0: denaturiert.</li></ul><p>Deine Werte 0 / hoch / 0 / 1–3 / 0 sind stimmig.</p>')}
${NOTE('<p>Das Arbeitsblatt nennt für Lactase pH 8–9, die Buchabbildung B4 zeigt das Optimum bei etwa pH 7. Richte dich in der Klausur nach dem dort gegebenen Material.</p>')}`,
      termdefs: [
        ['RGT-Regel', '+10 °C bedeutet 2- bis 3-fache Reaktionsgeschwindigkeit'],
        ['Temperaturoptimum', 'Temperatur höchster Enzymaktivität; enzymspezifisch'],
        ['Denaturierung', 'Zerstörung der Raumstruktur (Sekundär- und Tertiärstruktur) durch Hitze oder extreme pH-Werte; Funktionsverlust'],
        ['Thermophile Enzyme', 'Hitzestabile Enzyme, z. B. Taq-Polymerase; viele Disulfidbrücken und Ionenbindungen'],
        ['pH-Wert', 'Maß für die Konzentration an Oxonium-Ionen'],
        ['pH-Optimum', 'pH-Wert höchster Enzymaktivität; an den Wirkort angepasst'],
        ['Isoenzyme', 'Gleiche Funktion, unterschiedliche Optima (z. B. Eisfisch, Forelle, Mensch)']
      ],
      mechanism: `
<h3>Temperaturkurve beschreiben und erklären</h3>
<ol class="steps">
  <li><b>Bereich I</b> (bis zum Optimum): Die Aktivität steigt. Stärkere Molekülbewegung führt zu mehr wirksamen Zusammenstößen (RGT-Regel).</li>
  <li><b>Optimum:</b> höchste Aktivität.</li>
  <li><b>Bereich II</b> (über dem Optimum): steiler Abfall. Die Raumstruktur wird zerstört, das aktive Zentrum passt nicht mehr (Denaturierung).</li>
</ol>
<h3>pH-Kurve</h3>
<ol class="steps">
  <li>Glockenförmige Kurve mit Maximum beim pH-Optimum.</li>
  <li>Abweichung vom Optimum: Ladungen im aktiven Zentrum ändern sich, die Bindung wird schlechter.</li>
  <li>Extreme Werte: Denaturierung.</li>
</ol>`,
      connections: `
<p>Die Ursache liegt immer in der Raumstruktur (Thema 2) und im aktiven Zentrum (Thema 6).</p>
<p>Temperatur und pH-Wert bestimmen deshalb, welche v<sub>max</sub> erreicht wird (Thema 8).</p>`,
      figures: [['tempph', 'Temperatur- und pH-Abhängigkeit']],
      exam: [
        'Temperatureinfluss am Beispiel der Brenztraubensäurekinase der Forelle erläutern (S. 37, Aufgabe 1).',
        'Aktivitäten von Pepsin und Trypsin vergleichen (S. 37, Aufgabe 2).',
        'Wirksamkeit von Lactase-Präparaten im Magen bewerten (S. 37, Aufgabe 3): Bei pH 1–2 ist Lactase wenig aktiv bzw. denaturiert.',
        'Temperatur- und pH-Kurven beschreiben und molekular erklären.'
      ],
      errors: [
        ['Bei Hitze werden die Peptidbindungen gespalten.', 'Die Wechselwirkungen der Raumstruktur werden zerstört; die Primärstruktur bleibt.'],
        ['Die Temperaturkurve ist symmetrisch.', 'Langsamer Anstieg, nach dem Optimum steiler Abfall.'],
        ['Alle Enzyme haben ihr Optimum bei 37 °C.', 'Das Optimum ist enzymspezifisch und an Organismus bzw. Wirkort angepasst.']
      ],
      summary: [
        'Temperatur: Anstieg nach der RGT-Regel bis zum Optimum, danach Denaturierung.',
        'pH: Ladungen im aktiven Zentrum; Optimum am Wirkort (Pepsin pH 2, Amylase pH 7).',
        'Denaturierung: Raumstruktur zerstört, aktives Zentrum passt nicht mehr.'
      ],
      selfcheck: [
        ['Warum steigt die Aktivität bis zum Optimum?', 'Mehr Molekülbewegung führt zu mehr Zusammenstößen; mehr Moleküle erreichen die Aktivierungsenergie.'],
        ['Warum ist Speichel-Amylase im Magen inaktiv?', 'Bei pH 1–2 wird sie denaturiert.'],
        ['Wodurch sind thermophile Enzyme stabil?', 'Durch viele Disulfidbrücken und Ionenbindungen.']
      ]
    }
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
    sheet: {
      intro: `
<p>Enzyme können umkehrbar (<b>reversibel</b>) oder endgültig (<b>irreversibel</b>) gehemmt werden. Entscheidend ist auch, wo der Hemmstoff (<b>Inhibitor</b>) bindet:</p>
<ul>
  <li>am aktiven Zentrum: kompetitive Hemmung,</li>
  <li>außerhalb davon: nicht-kompetitive Hemmung.</li>
</ul>`,
      explain: `
<h3>Kompetitive Hemmung</h3>
<p>Beispiel <b>Gicht</b>:</p>
<ul>
  <li>Harnsäurekristalle lagern sich in Gelenken ab.</li>
  <li>Harnsäure entsteht, wenn das Enzym <b>Xanthinoxidase</b> Hypoxanthin abbaut.</li>
  <li>Das Medikament <b>Allopurinol</b> ist dem Substrat Hypoxanthin strukturell ähnlich.</li>
</ul>
${BF('s40-rand')}
<p>Substrat und Inhibitor <b>konkurrieren um das aktive Zentrum</b>. Die Bindung ist reversibel. Ein Enzym mit gebundenem Inhibitor bildet keinen Enzym-Substrat-Komplex.</p>
${BF('s40-b2')}
<p>Folgen im Diagramm (B1):</p>
<ul>
  <li>Bei gleicher Substratkonzentration ist v kleiner.</li>
  <li><b>K<sub>M</sub> steigt</b>, weil die Affinität in Gegenwart des Inhibitors scheinbar geringer ist.</li>
  <li>Erhöht man die Substratkonzentration, verdrängt das Substrat den Inhibitor. Bei hoher Substratkonzentration wird <b>v<sub>max</sub> trotz Inhibitor erreicht</b>.</li>
</ul>
${BF('s40-b1')}
<p>Weiteres Beispiel: <b>Sulfonamide</b> (Antibiotika) binden am aktiven Zentrum eines Bakterienenzyms. Den Bakterien fehlen dann wichtige Stoffe, ihr Wachstum wird gehemmt.</p>
<h3>Nicht-kompetitive Hemmung</h3>
<p>Der Inhibitor ist dem Substrat <b>nicht ähnlich</b> und bindet <b>außerhalb des aktiven Zentrums</b>. Dadurch ändert sich die räumliche Struktur des Enzyms. Das Enzym ist inaktiv, manchmal kann das Substrat trotzdem noch binden. Substrat und Inhibitor konkurrieren nicht.</p>
${BF('s41-b3')}
<p>Folgen im Diagramm (B4):</p>
<ul>
  <li><b>v<sub>max</sub> sinkt</b>, auch bei hoher Substratkonzentration.</li>
  <li><b>K<sub>M</sub> bleibt gleich</b>: Der Inhibitor senkt nur die Zahl aktiver Enzyme, die Affinität der übrigen bleibt.</li>
  <li>Auch diese Hemmung ist reversibel.</li>
</ul>
${BF('s41-b4')}
<p><b>In der Medizin:</b> Bei einer Leukämieform und vielen Tumoren sind Tyrosinkinasen beteiligt. Sie übertragen eine Phosphatgruppe von ATP und lösen eine Signalkette zur Zellteilung aus. Synthetische Hemmstoffe hemmen sie nicht-kompetitiv.</p>
<h3>Irreversible Hemmung</h3>
<p>Der Inhibitor bindet <b>dauerhaft am aktiven Zentrum</b>. Es kann kein Enzym-Substrat-Komplex mehr entstehen.</p>
<ul>
  <li><b>Penicillin</b> bindet an ein Bakterienenzym für die Zellwandbildung. Das Bakterium kann sich nicht mehr teilen.</li>
  <li><b>Schwermetall-Ionen</b> (Blei, Quecksilber) binden an die SH-Gruppen von Enzymen und lösen sich nicht wieder. Liegt die SH-Gruppe im aktiven Zentrum, ist das Enzym dauerhaft funktionslos.</li>
</ul>
${NOTE('<p>Die Checkliste spricht von „nicht-kompetitiver bzw. allosterischer“ Hemmung. Das Buch verwendet auf S. 40–41 nur „nicht-kompetitiv“. In beiden Fällen bindet der Inhibitor außerhalb des aktiven Zentrums und verändert die Raumstruktur.</p><p>Zur Regulation im Körper (Lernziel 1) enthalten S. 40–41 keine eigenen Beispiele. Sie zeigen Hemmung in Medizin und Vergiftung.</p>')}
${EXTRA('<p>Regulation: Der Körper kann Stoffwechselwege über Hemmstoffe drosseln.</p><ul><li>Reversible Hemmung ist steuerbar: Sinkt die Inhibitorkonzentration, arbeiten die Enzyme wieder.</li><li>Ein häufiges Prinzip: Das Endprodukt eines Stoffwechselweges hemmt das erste Enzym dieses Weges.</li></ul>')}`,
      termdefs: [
        ['Inhibitor', 'Hemmstoff eines Enzyms'],
        ['Kompetitive Hemmung', 'Substratähnlicher Inhibitor konkurriert um das aktive Zentrum; K<sub>M</sub> steigt, v<sub>max</sub> bleibt erreichbar'],
        ['Nicht-kompetitive Hemmung', 'Inhibitor bindet außerhalb des aktiven Zentrums und verändert die Struktur; v<sub>max</sub> sinkt, K<sub>M</sub> bleibt'],
        ['Reversibel', 'Umkehrbar: Der Inhibitor löst sich wieder, das Enzym ist danach funktionsfähig'],
        ['Irreversible Hemmung', 'Inhibitor bindet dauerhaft am aktiven Zentrum (Penicillin, Schwermetall-Ionen)'],
        ['Allopurinol', 'Kompetitiver Hemmstoff der Xanthinoxidase (Gicht)']
      ],
      mechanism: `
<h3>Diagramme skizzieren</h3>
<ol class="steps">
  <li>Kurve ohne Inhibitor mit v<sub>max</sub>, ½ v<sub>max</sub> und K<sub>M</sub> zeichnen.</li>
  <li><b>Kompetitiv:</b> Die Kurve steigt flacher, erreicht bei hoher c(S) aber dasselbe v<sub>max</sub>. K<sub>M</sub> verschiebt sich nach rechts.</li>
  <li><b>Nicht-kompetitiv:</b> Die Kurve bleibt darunter und erreicht nur ein niedrigeres v<sub>max</sub>. Bei der Hälfte davon liegt dieselbe K<sub>M</sub>.</li>
</ol>`,
      connections: `
<p>Die Hemmtypen lassen sich nur über das Michaelis-Menten-Diagramm (Thema 8) und das aktive Zentrum (Themen 6 und 7) erklären.</p>`,
      figures: [['inhibition', 'Enzymhemmung']],
      exam: [
        'Kurvenverläufe in B1 und B4 beschreiben und erklären (S. 41, Aufgabe 1).',
        'Erklären, warum Gicht mit Allopurinol behandelt werden kann (S. 41, Aufgabe 2).',
        'Stellung nehmen zum Austausch bleihaltiger Wasserleitungen (S. 41, Aufgabe 3): Blei-Ionen hemmen Enzyme irreversibel.',
        'Kompetitive und nicht-kompetitive Hemmung tabellarisch vergleichen (Bindungsort, Ähnlichkeit zum Substrat, v<sub>max</sub>, K<sub>M</sub>).'
      ],
      errors: [
        ['Der nicht-kompetitive Inhibitor passt ins aktive Zentrum und ähnelt dem Substrat (aus deinem Aufschrieb).', 'Er ähnelt dem Substrat nicht und bindet außerhalb des aktiven Zentrums.'],
        ['„Mehr Substrat führt zu höherer K<sub>M</sub>“ (aus deinem Aufschrieb).', 'Der kompetitive Inhibitor erhöht K<sub>M</sub>. Mehr Substrat verdrängt den Inhibitor.'],
        ['Bei kompetitiver Hemmung sinkt v<sub>max</sub>.', 'v<sub>max</sub> wird bei hoher Substratkonzentration trotzdem erreicht.'],
        ['Nicht-kompetitive Hemmung lässt sich durch mehr Substrat aufheben.', 'Nein, v<sub>max</sub> bleibt erniedrigt.']
      ],
      summary: [
        'Kompetitiv: substratähnlich, am aktiven Zentrum, reversibel. K<sub>M</sub> steigt, v<sub>max</sub> bleibt.',
        'Nicht-kompetitiv: nicht ähnlich, bindet außerhalb, Strukturänderung, reversibel. v<sub>max</sub> sinkt, K<sub>M</sub> bleibt.',
        'Irreversibel: dauerhafte Bindung am aktiven Zentrum (Penicillin, Blei, Quecksilber).'
      ],
      selfcheck: [
        ['Warum wird bei kompetitiver Hemmung v<sub>max</sub> trotzdem erreicht?', 'Bei hoher Substratkonzentration verdrängt das Substrat den Inhibitor.'],
        ['Warum bleibt K<sub>M</sub> bei nicht-kompetitiver Hemmung gleich?', 'Die übrigen aktiven Enzyme haben dieselbe Affinität; nur ihre Zahl sinkt.'],
        ['Wie wirken Blei-Ionen?', 'Sie binden irreversibel an SH-Gruppen von Enzymen.']
      ]
    }
  }
  ];

  BIO.topicById = {};
  BIO.goalById = {};
  BIO.topics.forEach(t => {
    BIO.topicById[t.id] = t;
    t.goals.forEach(g => { BIO.goalById[g.id] = Object.assign({ topic: t.id }, g); });
  });
})();
