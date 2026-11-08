/* =========================================================================
   Lerninhalte: 10 Themen der Checkliste (verbindliches Inhaltsverzeichnis)
   Quelle: Checkliste 1. LK-Klausur + Natura Kursstufe Biologie BW (Klett), S. 12–41
   Kennzeichnung:  BOOK()  = Inhalt aus dem Schulbuch (mit Seite)
                   EXTRA() = ergänzende Erklärung (nicht im Buch)
                   CLASS() = aus dem Unterricht / Arbeitsblättern
                   MISSING() = in den Materialien nicht (eindeutig) enthalten
   ========================================================================= */
(function () {
  const box = (cls, title, html) => `<div class="box ${cls}"><div class="box-title">${title}</div>${html}</div>`;
  const BOOK = (p, html) => box('book', `📖 Schulbuch S. ${p}`, html);
  const EXTRA = (html) => box('extra', '➕ Ergänzung (nicht im Buch)', html);
  const CLASS = (html) => box('note', '✏️ Aus dem Unterricht', html);
  const MISSING = (html) => box('missing', '⚠️ Hinweis zu den Materialien', html);
  const WARN = (html) => box('warn', '⚡ Merke', html);
  const fig = (id, cap) => `<div data-figure="${id}" data-caption="${cap}"></div>`;

  window.BIO = window.BIO || {};
  BIO.helpers = { BOOK, EXTRA, CLASS, MISSING, WARN, fig };

  BIO.topics = [
  /* ===================================================================== 1 */
  {
    id: 't1', nr: 1, title: 'Aufbau von Aminosäuren und Peptidbindung', pages: '12',
    short: 'α-Aminosäuren, funktionelle Gruppen, Kondensation zur Peptidbindung',
    goals: [
      { id: 't1g1', text: 'Die chemische Grundstruktur einer α-Aminosäure darstellen und Aminogruppe, Carboxylgruppe, H-Atom sowie variablen Rest am zentralen α-C-Atom zuordnen.' },
      { id: 't1g2', text: 'Die Bildung einer Peptidbindung zwischen zwei Aminosäuren durch eine Kondensationsreaktion herleiten und zeichnerisch darstellen.' }
    ],
    terms: ['Peptid', 'Aminogruppe', 'Carboxylgruppe', 'Peptidbindung', 'Grundstruktur der Aminosäuren'],
    labs: ['aminoacid', 'peptide'],
    sheet: {
      intro: `
<p>Proteine sind die „Alleskönner“ der Zelle: Keine andere Stoffklasse übernimmt so viele verschiedene Aufgaben. Sie bilden Gerüste (Kollagen, Keratin, Spinnenseide), schützen (Antikörper, Toxine), bewegen (Actin, Myosin), transportieren (Hämoglobin, Tunnelproteine, Ionenpumpen in der Membran), katalysieren (Enzyme), regulieren (Hormone wie Insulin) und nehmen Informationen auf (Rezeptoren).</p>
<p>All diese Proteine sind aus denselben <b>20 verschiedenen Aminosäuren</b> aufgebaut. Wer verstehen will, wie Proteine ihre Form und damit ihre Funktion bekommen – und später, wie Enzyme, Membranproteine und Rezeptoren arbeiten –, muss deshalb zuerst den Bau einer Aminosäure und die Verknüpfung über die Peptidbindung beherrschen. Thema 1 ist damit das Fundament für fast alle weiteren Themen.</p>
${BOOK('12', '<p>Tabelle „Vielfalt der Proteinfunktionen“ (B2), Strukturformel einer α-Aminosäure (B3) und Bildung einer Peptidbindung (B4).</p>')}`,
      explain: `
<h3>Die Grundstruktur einer α-Aminosäure</h3>
<p>Jede Aminosäure besitzt zwei funktionelle Gruppen: eine <b>Aminogruppe</b> (–NH<sub>2</sub>) und eine <b>Carboxylgruppe</b> (–COOH; im Buch „Carboxygruppe“ – beide Namen sind korrekt). In Proteinen kommen ausschließlich <b>α-Aminosäuren</b> vor. Bei ihnen sitzt die Aminogruppe an genau dem Kohlenstoffatom, an das auch die Carboxylgruppe gebunden ist. Dieses zentrale C-Atom heißt <b>α-C-Atom</b>.</p>
<p>Das α-C-Atom ist vierbindig und trägt vier verschiedene Bindungspartner:</p>
<ol>
  <li>die <b>Aminogruppe</b> –NH<sub>2</sub> (N mit zwei H-Atomen),</li>
  <li>die <b>Carboxylgruppe</b> –COOH (C mit doppelt gebundenem O und einer OH-Gruppe),</li>
  <li>ein <b>Wasserstoffatom</b> (H),</li>
  <li>den <b>variablen Rest R</b> (Seitenkette).</li>
</ol>
<p>Die ersten drei Partner sind bei allen 20 Aminosäuren gleich – das ist die <b>Grundstruktur der Aminosäuren</b>. Die Aminosäuren unterscheiden sich <i>nur</i> im Rest R. Nach den Eigenschaften der Reste unterscheidet man <b>hydrophile</b> und <b>hydrophobe</b> sowie <b>saure</b> und <b>basische</b> Aminosäuren. Diese Eigenschaften der Reste entscheiden später darüber, welche Wechselwirkungen in einem Protein möglich sind (→ Thema 2).</p>
${CLASS('<p>Im Unterricht wurde ein Dipeptid aus <b>Cystein</b> und <b>Glycin</b> gezeichnet. Cystein trägt als Rest –CH<sub>2</sub>–SH (eine <b>Thiolgruppe</b>, wichtig für Disulfidbrücken, Thema 2), Glycin hat als Rest nur ein H-Atom (H<sub>2</sub>N–CH<sub>2</sub>–COOH).</p>')}

<h3>Peptide und Proteine</h3>
<p>In Peptiden und Proteinen sind Aminosäuren zu <b>unverzweigten Ketten</b> verknüpft. Ketten mit weniger als ca. 100 Aminosäuren nennt man <b>Peptide</b>, längere Ketten <b>Proteine</b>; die meisten Proteine bestehen aus 100 bis 600 Aminosäuren. Weil an jeder Position eine von 20 Aminosäuren stehen kann, gibt es für eine Kette aus n Aminosäuren 20<sup>n</sup> mögliche Reihenfolgen – bei 300 Aminosäuren also 20<sup>300</sup>, eine unvorstellbar große Zahl. Das erklärt die enorme Vielfalt der Proteine.</p>

<h3>Die Peptidbindung</h3>
<p>Die Verknüpfung zweier Aminosäuren entsteht, wenn die <b>Carboxylgruppe der einen Aminosäure</b> mit der <b>Aminogruppe der nächsten Aminosäure</b> reagiert. Dabei wird aus der OH-Gruppe der Carboxylgruppe und einem H-Atom der Aminogruppe ein <b>Wassermolekül abgespalten</b>. Eine Reaktion, bei der zwei Moleküle unter Abspaltung von Wasser verknüpft werden, heißt <b>Kondensationsreaktion</b>.</p>
<p>Die neu entstandene Bindung zwischen dem C-Atom der ehemaligen Carboxylgruppe und dem N-Atom der ehemaligen Aminogruppe ist die <b>Peptidbindung</b>. Die Atomgruppe –CO–NH– (also C=O und N–H gemeinsam) nennt man <b>Peptidgruppe</b>. Das entstandene <b>Dipeptid</b> besitzt an einem Ende wieder eine freie Aminogruppe und am anderen Ende eine freie Carboxylgruppe – deshalb können immer weitere Aminosäuren angehängt werden.</p>
${EXTRA('<p>Die Umkehrung der Kondensation ist die <b>Hydrolyse</b>: Unter Aufnahme von Wasser wird die Peptidbindung wieder gespalten (z. B. bei der Verdauung von Proteinen). Den Begriff Hydrolyse verwendet das Buch bei Fetten (S. 14) und Lactose (S. 26).</p>')}`,
      termdefs: [
        ['α-Aminosäure', 'Aminosäure, bei der Amino- und Carboxylgruppe am selben (α-)C-Atom gebunden sind; Baustein der Proteine.'],
        ['α-C-Atom', 'Zentrales C-Atom einer α-Aminosäure; trägt Aminogruppe, Carboxylgruppe, H-Atom und Rest R.'],
        ['Aminogruppe', 'Funktionelle Gruppe –NH₂; liegt im Protein am Kettenanfang (N-Ende) frei vor.'],
        ['Carboxylgruppe (Carboxygruppe)', 'Funktionelle Gruppe –COOH; liegt am Kettenende (C-Ende) frei vor.'],
        ['Rest R (Seitenkette)', 'Variabler Teil der Aminosäure; unterscheidet die 20 Aminosäuren (hydrophil/hydrophob, sauer/basisch).'],
        ['Grundstruktur der Aminosäuren', 'Bei allen Aminosäuren gleicher Teil: α-C-Atom mit Aminogruppe, Carboxylgruppe und H-Atom.'],
        ['Kondensationsreaktion', 'Verknüpfung zweier Moleküle unter Abspaltung von Wasser (H₂O).'],
        ['Peptidbindung', 'Kovalente Bindung zwischen dem C-Atom der Carboxylgruppe der einen und dem N-Atom der Aminogruppe der nächsten Aminosäure.'],
        ['Peptidgruppe', 'Atomgruppe –CO–NH– aus C=O und N–H an der Peptidbindung.'],
        ['Peptid', 'Kette aus weniger als ca. 100 über Peptidbindungen verknüpften Aminosäuren (Dipeptid = 2 Aminosäuren).'],
        ['Protein', 'Unverzweigtes Makromolekül aus meist 100–600 Aminosäuren.']
      ],
      mechanism: `
<h3>Bildung einer Peptidbindung – Schritt für Schritt (so zeichnest du sie)</h3>
<ol class="steps">
  <li><b>Zwei Aminosäuren nebeneinander zeichnen:</b> Aminosäure 1 links, Aminosäure 2 rechts. Die Carboxylgruppe von AS 1 zeigt zur Aminogruppe von AS 2. Reste als R<sub>1</sub> und R<sub>2</sub> beschriften.</li>
  <li><b>Reagierende Atome markieren:</b> die OH-Gruppe der Carboxylgruppe (AS 1) und ein H-Atom der Aminogruppe (AS 2) einkreisen.</li>
  <li><b>Reaktionspfeil</b> mit „Kondensation“ beschriften und <b>„+ H<sub>2</sub>O“</b> als abgespaltenes Produkt notieren.</li>
  <li><b>Dipeptid zeichnen:</b> C der ehemaligen Carboxylgruppe ist jetzt direkt mit dem N der ehemaligen Aminogruppe verbunden: –C(=O)–N(H)–.</li>
  <li><b>Beschriften:</b> Peptidgruppe (C=O und N–H) einkreisen, die C–N-Bindung als <b>Peptidbindung</b> kennzeichnen, freie Aminogruppe (N-Ende) und freie Carboxylgruppe (C-Ende) markieren.</li>
</ol>
${fig('peptide', 'Interaktiv: Kondensation zweier Aminosäuren zum Dipeptid (Schritte durchklicken)')}`,
      connections: `
<p><b>Warum ist der Bau so wichtig?</b> Die Peptidbindungen bilden das immer gleiche „Rückgrat“ der Kette (–N–C<sub>α</sub>–C–N–C<sub>α</sub>–C–). Die Reste R ragen seitlich heraus. Daraus folgen zwei Dinge für Thema 2:</p>
<ul>
  <li>Die <b>Peptidgruppen</b> (C=O und N–H) des Rückgrats können Wasserstoffbrücken miteinander bilden → <b>Sekundärstruktur</b>.</li>
  <li>Die <b>Reste</b> mit ihren unterschiedlichen Eigenschaften (geladen, polar, unpolar, –SH) wechselwirken miteinander → <b>Tertiär- und Quartärstruktur</b>.</li>
</ul>
<p>Die Reihenfolge der Aminosäuren ist also nicht nur „Zufall“, sondern legt fest, welche Wechselwirkungen später möglich sind – und damit die Raumstruktur und Funktion (Struktur-Funktions-Zusammenhang). Das gilt für Enzyme (aktives Zentrum, Thema 6) ebenso wie für Membranproteine (Thema 3/4).</p>
<p><b>Die Reihenfolge ist gerichtet:</b> Das Dipeptid Cys–Gly (Cystein mit freier Aminogruppe) ist ein anderes Molekül als Gly–Cys. Die Kette wird immer vom N-Ende zum C-Ende gelesen.</p>`,
      figures: [['aminoacid', 'Interaktiv: α-Aminosäure – tippe auf die Gruppen'], ['peptide', 'Peptidbindung durch Kondensation']],
      exam: [
        'Strukturformel einer α-Aminosäure fehlerfrei zeichnen (H<sub>2</sub>N–C<sub>α</sub>H(R)–COOH) und alle vier Bindungspartner des α-C-Atoms beschriften.',
        'Erklären, warum es „α“-Aminosäure heißt (beide funktionellen Gruppen am selben C-Atom).',
        'Kondensationsreaktion vollständig zeichnen: abgespaltene Atome markieren, H<sub>2</sub>O als Produkt angeben, Peptidbindung und Peptidgruppe kennzeichnen.',
        'Begriffe Peptid / Protein / Dipeptid unterscheiden; Zahl möglicher Sequenzen mit 20<sup>n</sup> berechnen (z. B. 7 AS → 20<sup>7</sup> ≈ 1,28 · 10<sup>9</sup>).',
        'Dipeptid aus zwei vorgegebenen Aminosäuren (z. B. Cystein + Glycin) zeichnen.'
      ],
      errors: [
        ['Die Peptidbindung verbindet zwei Aminogruppen (oder zwei Carboxylgruppen).', 'Sie verbindet immer die Carboxylgruppe der einen mit der Aminogruppe der nächsten Aminosäure.'],
        ['Bei der Peptidbindung wird Wasser aufgenommen.', 'Wasser wird abgespalten (Kondensation). Wasseraufnahme = Hydrolyse (Spaltung).'],
        ['Der Rest R ist an der Peptidbindung beteiligt.', 'R ragt seitlich aus der Kette heraus und ist nicht an der Peptidbindung beteiligt.'],
        ['Die Peptidbindung ist die gesamte Gruppe –CO–NH–.', 'Die Gruppe heißt Peptidgruppe; die Peptidbindung ist die C–N-Bindung darin.'],
        ['„Ch₂“ oder fehlende H-Atome in der Strukturformel.', 'Elementsymbole korrekt schreiben (CH₂) und die Vierbindigkeit von C prüfen.'],
        ['Strukturformeln vertauscht beschriftet (aus deinem Aufschrieb: H₂N–CH₂–COOH als „Cystein“).', 'H₂N–CH₂–COOH ist Glycin (Rest = H). Cystein hat den Rest –CH₂–SH (Thiolgruppe).']
      ],
      summary: [
        'α-Aminosäure: α-C-Atom mit Aminogruppe (–NH₂), Carboxylgruppe (–COOH), H-Atom und Rest R.',
        '20 Aminosäuren, unterschieden nur im Rest (hydrophil/hydrophob, sauer/basisch).',
        'Peptidbindung: Carboxylgruppe AS 1 + Aminogruppe AS 2 → Kondensation, H₂O wird abgespalten.',
        'Peptidgruppe –CO–NH–; Kette hat N-Ende (freie Aminogruppe) und C-Ende (freie Carboxylgruppe).',
        'Peptid < ca. 100 AS; Protein meist 100–600 AS; 20ⁿ mögliche Sequenzen.'
      ],
      selfcheck: [
        ['Nenne die vier Bindungspartner des α-C-Atoms.', 'Aminogruppe (–NH₂), Carboxylgruppe (–COOH), H-Atom, Rest R.'],
        ['Welche Atome bilden das abgespaltene Wassermolekül bei der Peptidbindung?', 'Die OH-Gruppe aus der Carboxylgruppe der ersten AS und ein H-Atom aus der Aminogruppe der zweiten AS.'],
        ['Wie viele Peptide aus 7 Aminosäuren sind theoretisch möglich?', '20⁷ = 1 280 000 000 (≈ 1,28 Milliarden).'],
        ['Worin unterscheiden sich die 20 Aminosäuren?', 'Nur im Rest R (Seitenkette).']
      ]
    }
  },

  /* ===================================================================== 2 */
  {
    id: 't2', nr: 2, title: 'Strukturebenen der Proteine', pages: '13',
    short: 'Primär-, Sekundär-, Tertiär-, Quartärstruktur und ihre Bindungen',
    goals: [
      { id: 't2g1', text: 'Ausgehend von der Aminosäuresequenz erklären, wie sich Primär-, Sekundär-, Tertiär- und Quartärstruktur eines Proteins ausbilden.' },
      { id: 't2g2', text: 'Die Bedeutung der Wechselwirkungen zwischen den Peptidgruppen sowie zwischen den Aminosäureresten für die Entstehung der räumlichen Strukturen erläutern.' }
    ],
    terms: ['Primärstruktur', 'Sekundärstruktur', 'α-Helix', 'β-Faltblatt', 'Tertiärstruktur', 'Quartärstruktur', 'Wasserstoffbrückenbindungen', 'Kovalente Bindungen', 'Disulfidbrücken'],
    labs: ['protein'],
    sheet: {
      intro: `
<p>Eine Aminosäurekette ist kein „gerader Faden“: Sie faltet sich zu einer ganz bestimmten räumlichen Form. Erst diese Raumstruktur macht ein Protein funktionsfähig – ein Enzym braucht z. B. ein passend geformtes aktives Zentrum, Hämoglobin eine Anordnung, die Sauerstoff binden kann. Man beschreibt den Aufbau in vier <b>Strukturebenen</b>, die aufeinander aufbauen. Entscheidend ist: <b>Alle höheren Ebenen ergeben sich aus der Primärstruktur</b>, also der Aminosäuresequenz.</p>
${BOOK('13', '<p>Primärstruktur (B5), Sekundärstruktur als Atom- und Bändermodell (B6), Wechselwirkungen zwischen Aminosäureresten und Tertiärstruktur (B7), Quartärstruktur des Hämoglobins (B8).</p>')}`,
      explain: `
<h3>1. Primärstruktur – die Reihenfolge</h3>
<p>Die <b>Primärstruktur</b> ist die Reihenfolge der Aminosäuren (<b>Aminosäuresequenz</b>). Die Aminosäuren sind über <b>Peptidbindungen</b> – also <b>kovalente Bindungen</b> – verknüpft. Die Kette beginnt mit der Aminosäure, deren Aminogruppe frei ist (<b>N-Ende</b>), und endet mit der Aminosäure mit freier Carboxylgruppe (<b>C-Ende</b>). Von der Primärstruktur hängen alle weiteren Strukturen ab.</p>

<h3>2. Sekundärstruktur – Wasserstoffbrücken im Rückgrat</h3>
<p>Zwischen den <b>Peptidgruppen</b> derselben Kette können <b>Wasserstoffbrückenbindungen</b> entstehen: Das partiell positive H-Atom einer N–H-Gruppe wird vom partiell negativen O-Atom einer C=O-Gruppe angezogen. Dadurch nimmt die Kette regelmäßige räumliche Formen an. Die meisten Wasserstoffbrücken innerhalb derselben Kette sind in zwei Formen möglich:</p>
<ul>
  <li><b>α-Helix:</b> Die Kette windet sich schraubenförmig. Die H-Brücken verbinden Peptidgruppen übereinanderliegender Windungen. Die Aminosäurereste ragen jeweils <b>nach außen</b>.</li>
  <li><b>β-Faltblatt:</b> Abschnitte der Kette liegen zickzackförmig gefaltet nebeneinander; H-Brücken verbinden die benachbarten Abschnitte. Die Reste ragen <b>abwechselnd zur einen und zur anderen Seite</b> des Faltblatts.</li>
</ul>
<p>Die Sekundärstruktur wird also <b>nicht</b> durch die Reste, sondern durch das Rückgrat (die Peptidgruppen) gebildet.</p>

<h3>3. Tertiärstruktur – Wechselwirkungen zwischen den Resten</h3>
<p>Die nach außen ragenden Reste können mit weit entfernten Resten derselben Kette in Wechselwirkung treten. So entsteht eine zusätzliche, verknäulte dreidimensionale Struktur – die <b>Tertiärstruktur</b>. Beteiligt sind:</p>
<div class="table-wrap"><table class="data">
<tr><th>Wechselwirkung</th><th>zwischen …</th><th>Art</th></tr>
<tr><td><b>Wasserstoffbrücken</b></td><td>polaren Resten (z. B. mit –OH, –NH<sub>2</sub>, C=O)</td><td>schwache Wechselwirkung</td></tr>
<tr><td><b>Ionenbindungen</b></td><td>entgegengesetzt geladenen Resten saurer (–COO<sup>−</sup>) und basischer (–NH<sub>3</sub><sup>+</sup>) Aminosäuren</td><td>elektrostatische Anziehung</td></tr>
<tr><td><b>Van-der-Waals-Kräfte</b></td><td>unpolaren (hydrophoben) Resten, z. B. Phenylalanin</td><td>schwache Wechselwirkung</td></tr>
<tr><td><b>Disulfidbrücken</b></td><td>den –SH-Gruppen zweier Cysteine → –S–S–</td><td><b>kovalente Bindung</b> (stabil)</td></tr>
</table></div>

<h3>4. Quartärstruktur – mehrere Ketten</h3>
<p>Manche Proteine bestehen aus <b>mehreren Polypeptidketten</b> (Untereinheiten). Ihre räumliche Anordnung zueinander ist die <b>Quartärstruktur</b>. Sie wird durch dieselben Wechselwirkungen zusammengehalten wie die Tertiärstruktur – jetzt zwischen Resten verschiedener Ketten. Beispiel: <b>Hämoglobin</b> besteht aus vier Proteinketten (Globin) mit je einer <b>Häm-Gruppe</b>; erst diese Anordnung ermöglicht den Sauerstofftransport.</p>
${EXTRA('<p>In wässriger Umgebung lagern sich hydrophobe Reste meist im Inneren des Proteins zusammen, hydrophile Reste zeigen nach außen zum Wasser. Das erklärt, warum viele Proteine eine kompakte, kugelige Form haben.</p>')}`,
      termdefs: [
        ['Primärstruktur', 'Aminosäuresequenz (Reihenfolge) der Kette; Verknüpfung durch Peptidbindungen; vom N- zum C-Ende.'],
        ['N-Ende / C-Ende', 'Kettenanfang mit freier Aminogruppe / Kettenende mit freier Carboxylgruppe.'],
        ['Sekundärstruktur', 'Regelmäßige räumliche Faltung durch H-Brücken zwischen Peptidgruppen derselben Kette (α-Helix, β-Faltblatt).'],
        ['α-Helix', 'Schraubenförmige Sekundärstruktur; H-Brücken zwischen Windungen; Reste zeigen nach außen.'],
        ['β-Faltblatt', 'Zickzackförmig gefaltete, nebeneinanderliegende Kettenabschnitte; H-Brücken zwischen den Abschnitten; Reste abwechselnd nach oben/unten.'],
        ['Tertiärstruktur', 'Dreidimensionale Gesamtfaltung einer Kette durch Wechselwirkungen zwischen den Resten.'],
        ['Quartärstruktur', 'Räumliche Anordnung mehrerer Polypeptidketten zu einem Proteinkomplex (z. B. Hämoglobin).'],
        ['Wasserstoffbrückenbindung', 'Anziehung zwischen einem partiell positiven H-Atom (an N oder O) und einem partiell negativen O- bzw. N-Atom.'],
        ['Kovalente Bindung', 'Atombindung durch gemeinsames Elektronenpaar; im Protein: Peptidbindungen und Disulfidbrücken.'],
        ['Disulfidbrücke', 'Kovalente –S–S–-Bindung zwischen den Thiolgruppen (–SH) zweier Cystein-Reste.'],
        ['Ionenbindung', 'Anziehung zwischen entgegengesetzt geladenen Resten (sauer: –COO⁻, basisch: –NH₃⁺).'],
        ['Van-der-Waals-Kräfte', 'Schwache Anziehungskräfte zwischen unpolaren (hydrophoben) Resten.']
      ],
      mechanism: `
<h3>Von der Sequenz zur funktionsfähigen Raumstruktur</h3>
<ol class="steps">
  <li><b>Primärstruktur:</b> Aminosäuren werden über Peptidbindungen (kovalent) zu einer Kette verknüpft. Die Sequenz legt fest, welche Reste an welcher Stelle sitzen.</li>
  <li><b>Sekundärstruktur:</b> Benachbarte Peptidgruppen des Rückgrats bilden H-Brücken → Abschnitte falten sich zu α-Helices oder β-Faltblättern.</li>
  <li><b>Tertiärstruktur:</b> Die Reste weit entfernter Abschnitte treten über H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte und Disulfidbrücken in Wechselwirkung → Kette verknäult sich zu einer spezifischen 3D-Form.</li>
  <li><b>Quartärstruktur</b> (nur bei mehreren Ketten): Mehrere gefaltete Ketten lagern sich über dieselben Wechselwirkungen zusammen.</li>
  <li><b>Funktion:</b> Die entstandene Raumstruktur (z. B. aktives Zentrum, Bindestelle) bestimmt die Funktion.</li>
</ol>
${fig('protein', 'Interaktiv: Strukturebenen eines Proteins – Ebene wählen und Bindungen antippen')}`,
      connections: `
<p><b>Struktur bestimmt Funktion:</b> Weil die Raumstruktur aus der Sequenz folgt, kann schon der Austausch <i>einer</i> Aminosäure die Faltung verändern – besonders, wenn sie im aktiven Zentrum eines Enzyms liegt (Buch S. 27, Aufgabe 4). Umgekehrt erklärt die Vielzahl schwacher Wechselwirkungen (H-Brücken, Ionenbindungen, Van-der-Waals), warum Proteine empfindlich auf Temperatur und pH reagieren: Diese Wechselwirkungen können durch starke Molekülschwingungen oder veränderte Ladungen gelöst werden → <b>Denaturierung</b> (Thema 9). Die kovalenten Peptidbindungen bleiben dabei erhalten – die Primärstruktur wird nicht zerstört.</p>
<p><b>Stabilität:</b> Viele Disulfidbrücken und Ionenbindungen machen ein Protein besonders stabil – z. B. die hitzestabile Taq-Polymerase thermophiler Bakterien (Buch S. 37, Thema 9).</p>`,
      figures: [['protein', 'Strukturebenen eines Proteins']],
      exam: [
        'Alle vier Strukturebenen definieren und in der richtigen Reihenfolge aus der Sequenz herleiten.',
        'Für jede Ebene angeben, welche Bindung/Wechselwirkung beteiligt ist und zwischen welchen Gruppen (Peptidgruppen vs. Reste).',
        'α-Helix und β-Faltblatt vergleichen (Form, Lage der H-Brücken, Lage der Reste).',
        'Kovalente (Peptidbindung, Disulfidbrücke) und nicht-kovalente Wechselwirkungen unterscheiden.',
        'Begründen, warum der Austausch einer Aminosäure die Funktion verändern kann.'
      ],
      errors: [
        ['Die Sekundärstruktur entsteht durch Wechselwirkungen zwischen den Resten.', 'Durch H-Brücken zwischen den Peptidgruppen des Rückgrats. Die Reste sind für die Tertiärstruktur entscheidend.'],
        ['Disulfidbrücken sind Wasserstoffbrücken.', 'Disulfidbrücken sind kovalente –S–S–-Bindungen zwischen zwei Cystein-Resten.'],
        ['Jedes Protein hat eine Quartärstruktur.', 'Nur Proteine aus mehreren Polypeptidketten (z. B. Hämoglobin).'],
        ['Die Primärstruktur beschreibt die räumliche Form.', 'Sie beschreibt nur die Reihenfolge der Aminosäuren.'],
        ['Bei der Denaturierung werden die Peptidbindungen gespalten.', 'Es werden die Wechselwirkungen der Raumstruktur gelöst; die Primärstruktur bleibt erhalten.']
      ],
      summary: [
        'Primär: Sequenz; Peptidbindungen (kovalent); N-Ende → C-Ende.',
        'Sekundär: H-Brücken zwischen Peptidgruppen → α-Helix (Reste außen) und β-Faltblatt (Reste abwechselnd).',
        'Tertiär: Wechselwirkungen zwischen Resten → H-Brücken, Ionenbindungen, Van-der-Waals, Disulfidbrücken (kovalent).',
        'Quartär: mehrere Ketten (z. B. Hämoglobin: 4 Ketten + Häm-Gruppen).',
        'Sequenz → Faltung → Raumstruktur → Funktion.'
      ],
      selfcheck: [
        ['Welche Gruppen bilden die H-Brücken der Sekundärstruktur?', 'Die Peptidgruppen (C=O und N–H) des Rückgrats derselben Kette.'],
        ['Welche Bindung der Tertiärstruktur ist kovalent?', 'Die Disulfidbrücke (–S–S–) zwischen zwei Cysteinen.'],
        ['Woran erkennt man eine Quartärstruktur?', 'Das Protein besteht aus mehreren Polypeptidketten (Untereinheiten).'],
        ['Wo liegen die Reste bei α-Helix und β-Faltblatt?', 'α-Helix: nach außen; β-Faltblatt: abwechselnd zu beiden Seiten.']
      ]
    }
  },

  /* ===================================================================== 3 */
  {
    id: 't3', nr: 3, title: 'Phospholipide und Aufbau der Biomembran', pages: '14–15',
    short: 'Lipide, Phospholipide, Doppelschicht, Flüssig-Mosaik-Modell',
    goals: [
      { id: 't3g1', text: 'Die Eigenschaften von Phospholipiden kennen und daraus die Entstehung und den Aufbau einer Phospholipid-Doppelschicht ableiten.' },
      { id: 't3g2', text: 'Das Modell einer Biomembran mit seinen wesentlichen Bestandteilen zeichnen und beschriften.' },
      { id: 't3g3', text: 'Die Struktur und Funktion der einzelnen Membranbestandteile erläutern.' }
    ],
    terms: ['Lipide', 'Fettmoleküle', 'Fettsäuren', 'Phospholipide', 'Biomembran', 'integrale Proteine', 'periphere Proteine', 'Zytoskelett', 'Kohlenhydrate'],
    labs: ['phospholipid', 'membrane'],
    sheet: {
      intro: `
<p>Jede Zelle ist von einer <b>Biomembran</b> (Zellmembran) umgeben, die das Zellinnere von der Umgebung trennt. Auch viele Organellen – z. B. Chloroplasten oder Dictyosomen – sind zum Cytoplasma hin von Biomembranen begrenzt. Membranen sind also die „Grenzen des Lebens“. Ihr Aufbau ergibt sich direkt aus den chemischen Eigenschaften ihrer Hauptbausteine, der <b>Phospholipide</b>, ergänzt durch Proteine und Kohlenhydrate. Wer die Biomembran zeichnen und erklären kann, versteht auch die Transportvorgänge (Thema 4 und 5).</p>
${BOOK('14–15', '<p>S. 14: Lipide, Fettmoleküle, Fettsäuren, Phospholipide (B1–B4). S. 15: Aufbau einer Biomembran (TEM-Bild B1, Modell B2).</p>')}
${BOOK('17–19 (Material/Extra)', '<p>Experimente zur Beweglichkeit von Membranproteinen, Fence-Modell und historische Entwicklung bis zum Flüssig-Mosaik-Modell. Die Checkliste nennt nur S. 14–15; das Flüssig-Mosaik-Modell wird im Buch auf S. 17–19 erläutert.</p>')}`,
      explain: `
<h3>Lipide und Fettmoleküle</h3>
<p><b>Lipide</b> sind hydrophobe Stoffe: Sie lösen sich gut in unpolaren (hydrophoben) Lösungsmitteln, in Wasser dagegen nicht oder nur sehr schlecht. Zu den Lipiden gehören die Fette. Ein <b>Fettmolekül</b> entsteht aus <b>Glycerin</b> (einem Alkohol mit drei OH-Gruppen) und <b>drei langkettigen Carbonsäuren</b>, die man <b>Fettsäuren</b> nennt (z. B. Ölsäure, Stearinsäure). Bei der <b>Veresterung</b> werden drei Wassermoleküle abgespalten; die Rückreaktion ist die <b>Hydrolyse</b>.</p>
<p>Man unterscheidet <b>gesättigte Fettsäuren</b> ohne Doppelbindungen im Kohlenwasserstoffrest (häufig wachsartig/fest) und <b>ungesättigte Fettsäuren</b> mit Doppelbindungen (bei Raumtemperatur flüssig). Fette dienen als wichtigster Energiespeicher und als Kälteschutz (z. B. bei Robben, Walen).</p>

<h3>Phospholipide – ein Molekül mit zwei „Gesichtern“</h3>
<p>Fette sind nur im Bereich der Esterbindungen schwache Dipole, die langen Kohlenwasserstoffreste sind völlig unpolar. Bei den <b>Phospholipiden</b>, den Hauptbestandteilen von Biomembranen, ist eine der drei Fettsäuren durch eine <b>Phosphatgruppe</b> ersetzt, an die zusätzlich ein weiterer Alkohol gebunden ist (beim Lecithin das Cholin). Dadurch hat das Molekül zwei Teile mit gegensätzlichem Lösungsverhalten:</p>
<ul>
  <li>einen <b>hydrophilen „Kopf“</b> (Glycerin–Phosphatgruppe–Cholin; polar/geladen) und</li>
  <li>zwei <b>hydrophobe „Schwänze“</b> (die beiden Fettsäurereste; unpolar).</li>
</ul>
${EXTRA('<p>Moleküle mit hydrophilem und hydrophobem Teil nennt man <b>amphiphil</b>.</p>')}

<h3>Wie entsteht daraus eine Doppelschicht?</h3>
<p>In wässriger Umgebung richten sich Phospholipide so aus, dass die hydrophilen Köpfe zum Wasser zeigen und die hydrophoben Schwänze vom Wasser weg und nebeneinander liegen:</p>
<ul>
  <li>An einer <b>Wasseroberfläche</b> bildet sich ein dünner <b>Phospholipidfilm</b> (Köpfe ins Wasser, Schwänze zur Luft).</li>
  <li>Beim Schütteln entstehen fein verteilte Tröpfchen, die <b>Micellen</b> (Köpfe außen, Schwänze innen).</li>
  <li>Ist auf <b>beiden Seiten Wasser</b> – wie innen (Cytoplasma) und außen (extrazellulärer Raum) bei einer Zelle –, lagern sich zwei Schichten so zusammen, dass die Schwänze einander zugewandt im Inneren liegen und die Köpfe nach außen zu beiden wässrigen Seiten zeigen: die <b>Lipiddoppelschicht</b> (Phospholipid-Doppelschicht).</li>
</ul>
<p>Die Doppelschicht bildet sich also „von selbst“ aus den Eigenschaften der Moleküle. Sie bestimmt Membraneigenschaften wie <b>Stabilität und Flexibilität</b>; ihr hydrophobes Inneres ist für die meisten geladenen und größeren Teilchen eine Barriere (→ Thema 4).</p>

<h3>Bestandteile der Biomembran</h3>
<p>Lichtmikroskopisch ist die Membran wegen des geringen Auflösungsvermögens kaum erforschbar; erst die <b>Elektronenmikroskopie</b> zeigte ihren Aufbau. Die Bausteine sind hauptsächlich <b>Phospholipide</b> und <b>Proteine</b>, dazu <b>Kohlenhydrate</b>:</p>
<div class="table-wrap"><table class="data">
<tr><th>Bestandteil</th><th>Struktur / Lage</th><th>Funktion</th></tr>
<tr><td><b>Phospholipide</b></td><td>Lipiddoppelschicht, Köpfe außen, Schwänze innen</td><td>Grundgerüst; Barriere; Stabilität und Flexibilität</td></tr>
<tr><td><b>integrale Proteine</b></td><td>durchspannen die Doppelschicht oder sind mit einem kleinen Teil darin verankert; hydrophober Anteil im Membraninneren; seitlich beweglich</td><td>Kanäle oder Carrier (Transport), z. B. auch Rezeptoren</td></tr>
<tr><td><b>periphere Proteine</b></td><td>der Membran auf- bzw. angelagert, an Phospholipide oder integrale Proteine gebunden</td><td>je nach Protein, z. B. Enzyme, Signalweiterleitung</td></tr>
<tr><td><b>Kohlenhydrate</b></td><td>Ketten nur auf der <b>Außenseite</b>, gebunden an Proteine (Glykoproteine) oder Lipide (Glykolipide)</td><td>bilden die <b>Glykokalyx</b> (Kohlenhydratmantel) → Erkennung von Zellen</td></tr>
<tr><td><b>Cholesterin</b></td><td>zwischen den Phospholipiden (tierische Zellen: bis 25 %)</td><td>verhindert, dass die Membran bei tiefen Temperaturen zu unbeweglich wird</td></tr>
<tr><td><b>Filamente des Cytoskeletts</b></td><td>Proteinfasern an der Innenseite (Cytoplasmaseite)</td><td>stabilisieren Membran und Zellform, verankern Proteine und schränken ihre Beweglichkeit ein</td></tr>
</table></div>

<h3>Das Flüssig-Mosaik-Modell und seine Weiterentwicklung</h3>
<p>Nach dem <b>Flüssig-Mosaik-Modell</b> (Singer und Nicolson, 1972) bilden Phospholipide eine flüssige Doppelschicht, in die Proteine wie ein Mosaik eingelagert sind; die Membranbestandteile sind beweglich – die Proteine „schwimmen wie Eisberge“ in der Lipidschicht. Belegt wurde dies durch das Zellfusionsexperiment von <b>Frye und Edidin</b> (1972): Rot und grün markierte Membranproteine zweier verschmolzener Zellen waren nach ca. 40 Minuten gleichmäßig durchmischt.</p>
<p>Spätere Experimente zeigten, dass das Modell nur eingeschränkt gilt: Beim <b>Fotobleichverfahren</b> (1999) kehrte die Fluoreszenz nur teilweise zurück – etwa die Hälfte der Proteine war unbeweglich. Das Cytoskelett verstärkt die Membran (Byers und Branton, 1985) und begrenzt wie ein Zaun den Bewegungsraum von Proteinen (<b>Fence-Modell</b>, Kusumi, 1996). Zudem gibt es Bereiche mit viel Cholesterin und Glykolipiden, die wie Flöße auf der Doppelschicht schwimmen („Lipid-Rafts-Modell“, Simons, 1997). So lässt sich erklären, warum z. B. die Glucose-Transportproteine von Darmzellen auf der Seite des Darmlumens bleiben.</p>
${BOOK('17–19', '<p>Historische Stationen: Overton (1899), Langmuir (1917, Monolayer), Gorter & Grendel (1925, Bilayer), Danielli & Davson (1935, Sandwich-Modell), Robertson (1959, Einheitsmembran), Singer & Nicolson (1972, Flüssig-Mosaik-Modell).</p>')}`,
      termdefs: [
        ['Lipide', 'Hydrophobe Stoffe; gut löslich in unpolaren Lösungsmitteln, kaum in Wasser.'],
        ['Fettmolekül', 'Ester aus Glycerin und drei Fettsäuren (Triglycerid); entsteht durch Veresterung unter Abspaltung von 3 H₂O.'],
        ['Fettsäuren', 'Langkettige Carbonsäuren; gesättigt (ohne C=C-Doppelbindungen) oder ungesättigt (mit Doppelbindungen).'],
        ['Phospholipid', 'Lipid, bei dem eine Fettsäure durch eine Phosphatgruppe (+ z. B. Cholin) ersetzt ist; hydrophiler Kopf, zwei hydrophobe Schwänze.'],
        ['Micelle', 'Kugelförmige Anordnung von Lipiden in Wasser: hydrophile Köpfe außen, hydrophobe Schwänze innen.'],
        ['Lipiddoppelschicht', 'Zwei Phospholipidschichten, Schwänze einander zugewandt, Köpfe zu beiden wässrigen Seiten; Grundstruktur jeder Biomembran.'],
        ['Biomembran', 'Hülle von Zellen und Organellen aus Lipiddoppelschicht mit Proteinen und (außen) Kohlenhydraten.'],
        ['integrale Proteine', 'In die Lipiddoppelschicht eingelagerte Proteine (oft durchspannend); z. B. Kanäle, Carrier, Rezeptoren.'],
        ['periphere Proteine', 'Der Membran angelagerte Proteine, gebunden an Phospholipide oder integrale Proteine.'],
        ['Kohlenhydrate (Membran)', 'Kohlenhydratketten auf der Außenseite an Proteinen/Lipiden; bilden die Glykokalyx zur Zellerkennung.'],
        ['Glykokalyx', 'Kohlenhydratmantel auf der Außenseite der Zellmembran; dient der Erkennung von Zellen.'],
        ['Cholesterin', 'Lipid zwischen den Phospholipiden (tierische Membranen); hält die Membran bei Kälte beweglich.'],
        ['Zytoskelett (Cytoskelett)', 'Netz aus Proteinfilamenten im Cytoplasma; an der Membraninnenseite stabilisierend und verankernd.'],
        ['Flüssig-Mosaik-Modell', 'Membranmodell (Singer & Nicolson 1972): flüssige Lipiddoppelschicht mit beweglichen, mosaikartig eingelagerten Proteinen.']
      ],
      mechanism: `
<h3>Die Biomembran zeichnen – so gehst du vor</h3>
<ol class="steps">
  <li><b>Orientierung festlegen:</b> oben „extrazellulärer Raum“, unten „Cytoplasma“ beschriften.</li>
  <li><b>Doppelschicht zeichnen:</b> zwei Reihen Kreise (hydrophile Köpfe) – obere Reihe außen, untere Reihe innen; dazwischen je zwei Striche pro Kopf (hydrophobe Schwänze), die Schwänze beider Schichten zeigen zueinander.</li>
  <li><b>Integrale Proteine</b> als große Formen einzeichnen, die die Doppelschicht durchspannen; eines davon mit Kanal (zwei Hälften mit Spalt) = <b>Kanalprotein</b>; eines nur teilweise eingelagert.</li>
  <li><b>Peripheres Protein</b> an der Innen- oder Außenseite an ein integrales Protein/an Köpfe anlagern.</li>
  <li><b>Kohlenhydratketten</b> (z. B. Sechsecke) <b>nur außen</b> an Proteine und Lipide zeichnen.</li>
  <li><b>Cholesterin</b> als kleines Molekül zwischen den Schwänzen, <b>Cytoskelett-Filamente</b> als Fasern unterhalb der Membran.</li>
  <li><b>Alles beschriften</b> und mit Klammer „Lipiddoppelschicht“ markieren.</li>
</ol>
${fig('membrane', 'Interaktiv: Modell einer Biomembran – Bestandteil antippen für Struktur und Funktion')}
${fig('phospholipid', 'Interaktiv: Phospholipide in Wasser – Film, Micelle, Doppelschicht')}`,
      connections: `
<p><b>Struktur ⇄ Eigenschaft ⇄ Funktion:</b> Weil das Innere der Doppelschicht hydrophob ist, können nur kleine, ungeladene Teilchen (O<sub>2</sub>, CO<sub>2</sub>) frei hindurchdiffundieren. Ionen und größere polare Moleküle brauchen <b>integrale Proteine</b> (Kanäle, Carrier) – das ist die Grundlage aller Transportvorgänge (Thema 4). Dass integrale Proteine die Membran durchspannen können, liegt an ihrem hydrophoben Mittelteil (hydrophobe Aminosäurereste, Thema 1/2), der im hydrophoben Membraninneren „gerne“ liegt, während hydrophile Bereiche zu den wässrigen Seiten ragen.</p>
<p>Die <b>Fluidität</b> der Doppelschicht ermöglicht, dass Membranen sich einstülpen, abschnüren und verschmelzen können – Voraussetzung für Endo- und Exozytose und den Membranfluss (Thema 5). Kohlenhydrate der Glykokalyx und Rezeptorproteine ermöglichen Erkennung und Signalaufnahme.</p>`,
      figures: [['phospholipid', 'Phospholipide in Wasser'], ['membrane', 'Modell einer Biomembran']],
      exam: [
        'Bau eines Phospholipids zeichnen/beschreiben (Glycerin, 2 Fettsäurereste, Phosphatgruppe + Cholin) und hydrophilen/hydrophoben Teil zuordnen.',
        'Aus den Eigenschaften der Phospholipide begründen, warum in wässriger Umgebung eine Doppelschicht entsteht.',
        'Biomembran-Modell mit allen Bestandteilen zeichnen und beschriften (siehe Schritte oben).',
        'Funktion jedes Bestandteils erläutern (Tabelle).',
        'Integrale und periphere Proteine unterscheiden; Lage der Kohlenhydrate (nur außen) begründen.',
        'Flüssig-Mosaik-Modell erklären und seine Grenzen (Fence-Modell, Fotobleich-Experiment) nennen.'
      ],
      errors: [
        ['Die hydrophilen Köpfe zeigen ins Membraninnere.', 'Die hydrophoben Schwänze liegen innen; die Köpfe zeigen zu den wässrigen Seiten.'],
        ['Kohlenhydrate sitzen auf beiden Seiten der Membran.', 'Nur auf der Außenseite (Glykokalyx).'],
        ['Periphere Proteine durchspannen die Membran.', 'Das tun (viele) integrale Proteine; periphere sind nur angelagert.'],
        ['Das Cytoskelett liegt außerhalb der Zelle.', 'Die Filamente liegen an der Innenseite (Cytoplasma).'],
        ['Fettsäuren und Fette sind dasselbe.', 'Fettsäuren sind Bausteine; ein Fett = Glycerin + 3 Fettsäuren.'],
        ['Alle Membranproteine sind frei beweglich.', 'Laut Fotobleichexperiment nur ein Teil; das Cytoskelett schränkt die Bewegung ein (Fence-Modell).']
      ],
      summary: [
        'Lipide sind hydrophob; Fett = Glycerin + 3 Fettsäuren (Veresterung, –3 H₂O).',
        'Phospholipid: hydrophiler Kopf (Phosphatgruppe + Cholin) + 2 hydrophobe Schwänze.',
        'In Wasser: Film, Micelle, Doppelschicht – Köpfe immer zum Wasser.',
        'Biomembran: Lipiddoppelschicht + integrale/periphere Proteine + Kohlenhydrate (außen, Glykokalyx) + Cholesterin + Cytoskelett (innen).',
        'Flüssig-Mosaik-Modell: bewegliche Bestandteile; eingeschränkt durch Cytoskelett (Fence-Modell).'
      ],
      selfcheck: [
        ['Warum lagern sich Phospholipide in Wasser zu einer Doppelschicht zusammen?', 'Köpfe hydrophil → zum Wasser; Schwänze hydrophob → vom Wasser weg, einander zugewandt. Bei Wasser auf beiden Seiten ergibt das zwei Schichten.'],
        ['Welche Aufgabe hat Cholesterin in der Membran?', 'Es verhindert, dass die Membran bei tiefen Temperaturen zu unbeweglich wird.'],
        ['Wozu dient die Glykokalyx?', 'Zur Erkennung von Zellen.'],
        ['Welche Beobachtung widerspricht einem uneingeschränkten Flüssig-Mosaik-Modell?', 'Beim Fotobleichexperiment kehrte die Fluoreszenz nur zu ca. 50 % zurück → ein Teil der Proteine ist unbeweglich.']
      ]
    }
  },

  /* ===================================================================== 4 */
  {
    id: 't4', nr: 4, title: 'Transportvorgänge durch Biomembranen', pages: '20–21',
    short: 'Passiver/aktiver Transport, Symport/Antiport, Glucose aus dem Darm',
    goals: [
      { id: 't4g1', text: 'Unterschiedliche Transportmechanismen durch Biomembranen erklären und zwischen passiven und aktiven Vorgängen unterscheiden.' },
      { id: 't4g2', text: 'Die Transportrichtung in Abhängigkeit von Konzentrationsunterschieden erläutern und begründen, wann Energie in Form von ATP benötigt wird.' },
      { id: 't4g3', text: 'Komplexere Transportvorgänge, z. B. den Glucosetransport aus dem Darm ins Blut, schrittweise erklären.' }
    ],
    terms: ['Einfache Diffusion', 'kanalvermittelte Diffusion', 'carriervermittelte Diffusion', 'primär aktiver Transport', 'sekundär aktiver Transport', 'Symport', 'Antiport'],
    labs: ['transport', 'glucose'],
    sheet: {
      intro: `
<p>Zellen leben, indem sie Stoffe mit ihrer Umgebung austauschen: Nährstoffe wie Zucker müssen hinein, Abbauprodukte hinaus. Die Zellmembran wirkt dabei als <b>kontrollierende Barriere</b>: Reine Lipidmembranen sind für viele Teilchen kaum durchlässig. Mithilfe von <b>Membrantransportproteinen</b> kann die Barriere aber gezielt überwunden und die Transportrichtung festgelegt werden. Entscheidend für jede Klausuraufgabe ist die Frage: <i>Läuft der Transport mit oder gegen das Konzentrationsgefälle – und woher kommt gegebenenfalls die Energie?</i></p>
${BOOK('20–21', '<p>Übersicht passiver und aktiver Membrantransport (B1), Glucosetransport aus dem Darm ins Blut (B2), Messdaten zur Glucosebindung am Symporter (B3).</p>')}`,
      explain: `
<h3>Warum Teilchen überhaupt wandern: Diffusion</h3>
<p>Gelöste Teilchen (Moleküle, Ionen) sind in <b>ständiger, ungerichteter Bewegung</b> (Brownsche Molekularbewegung). Dabei diffundieren – rein statistisch – mehr Teilchen vom Ort hoher zum Ort niedriger Konzentration als umgekehrt. So entsteht ein <b>Nettotransport entlang des Konzentrationsgefälles</b>, bis die Konzentrationen ausgeglichen sind. Daraus folgt:</p>
<ol>
  <li>Transport zum Ort <b>niedrigerer</b> Konzentration („bergab“): <b>keine Energie</b> nötig → <b>passiver Transport</b>.</li>
  <li>Transport zum Ort <b>höherer</b> Konzentration, also <b>gegen das Konzentrationsgefälle</b> („bergauf“, z. B. zur Speicherung): <b>Energie</b> nötig, meist in Form von <b>ATP</b> → <b>aktiver Transport</b>.</li>
</ol>

<h3>Passiver Transport</h3>
<ul>
  <li><b>Einfache Diffusion:</b> Kleine, ungeladene Teilchen wie O<sub>2</sub> und CO<sub>2</sub> diffundieren ungehindert direkt durch die Lipiddoppelschicht. Auch Wasser kommt so hindurch – aber nur sehr langsam und ineffektiv.</li>
  <li><b>Erleichterte Diffusion</b> – mithilfe von Membrantransportproteinen, aber weiterhin entlang des Gefälles:
    <ul>
      <li><b>Kanalvermittelte Diffusion:</b> <b>Kanalproteine</b> bilden eine Pore. Viele Kanäle können sich öffnen und schließen; ein geöffneter Kanal lässt nur eine bestimmte Teilchensorte durch – entscheidend sind <b>Größe und Ladung</b>. Beispiel: <b>Aquaporine</b>, ständig geöffnete, hochselektive Wasserkanäle für schnellen Wassertransport.</li>
      <li><b>Carriervermittelte Diffusion:</b> <b>Carrier</b> (Transporter) besitzen <b>Bindungsstellen</b> für ein bestimmtes Molekül oder Ion; nur dieses wird transportiert. Beispiel: Glucose-Carrier in der Darmzelle (Richtung Blut).</li>
    </ul></li>
</ul>

<h3>Aktiver Transport</h3>
<p>Hier werden Teilchen von Bereichen niedriger zu Bereichen hoher Konzentration transportiert. Dazu gehören der Transport über <b>Vesikel</b> (Endo-/Exozytose, Thema 5) und über <b>Pumpen</b>. Einige Transportproteine befördern zwei Teilchensorten gleichzeitig:</p>
<ul>
  <li><b>Symport:</b> beide Teilchen in die <b>gleiche</b> Richtung.</li>
  <li><b>Antiport:</b> die Teilchen in <b>entgegengesetzte</b> Richtungen.</li>
</ul>
<p>Man unterscheidet nach der Energiequelle:</p>
<ul>
  <li><b>Primär aktiver Transport:</b> Die Energie stammt <b>direkt</b> aus energiereichen Molekülen wie <b>ATP</b> (ATP → ADP + P). Beispiel: Natrium-Kalium-Ionenpumpe (Antiport).</li>
  <li><b>Sekundär aktiver Transport:</b> Die Energiequelle ist nur <b>indirekt</b> beteiligt. Der Transport eines Teilchens <b>entlang</b> seines Konzentrationsgefälles (z. B. Na<sup>+</sup> strömt in die Zelle) wird <b>gekoppelt</b> mit dem Transport eines anderen Teilchens <b>gegen</b> sein Gefälle (z. B. Glucose). Das Gefälle des ersten Teilchens muss vorher durch eine primär aktive Pumpe unter ATP-Verbrauch aufgebaut worden sein.</li>
</ul>
${EXTRA('<p>Die Natrium-Kalium-Pumpe befördert pro ATP drei Na<sup>+</sup> nach außen und zwei K<sup>+</sup> nach innen. Transportproteine, die nur eine Teilchensorte transportieren, heißen <b>Uniporter</b>.</p>')}

<h3>Komplexer Transport: Glucose aus dem Darm ins Blut</h3>
<p>Im Darmlumen ist die Glucosekonzentration <b>niedriger</b> als in den Darmepithelzellen. Glucose muss also zunächst <b>gegen</b> ihr Konzentrationsgefälle in die Zelle – und danach ins Blut. Dafür arbeiten <b>drei Transporter</b> zusammen:</p>
<ol class="steps">
  <li><b>Na<sup>+</sup>-K<sup>+</sup>-Ionenpumpe</b> (Seite zum extrazellulären Raum/Blut): pumpt unter <b>ATP-Verbrauch</b> Na<sup>+</sup> aus der Zelle und K<sup>+</sup> hinein (<b>primär aktiver Transport, Antiport</b>). Ergebnis: Die Na<sup>+</sup>-Konzentration in der Darmzelle bleibt ständig <b>niedrig</b>.</li>
  <li><b>Na<sup>+</sup>-Glucose-Symporter</b> (Seite zum Darmlumen): Na<sup>+</sup> strömt entlang seines Gefälles (Lumen hoch → Zelle niedrig) in die Zelle und nimmt dabei Glucose <b>gegen</b> deren Gefälle mit (<b>sekundär aktiver Transport, Symport</b>).</li>
  <li><b>Glucose-Carrier</b> (Seite zur Gewebsflüssigkeit): Glucose ist jetzt in der Zelle hoch konzentriert und verlässt sie entlang ihres Gefälles in die Gewebsflüssigkeit (<b>carriervermittelte erleichterte Diffusion</b>, passiv). Über die Blutbahn wird sie im Körper verteilt.</li>
</ol>
<p><b>Messdaten (B3):</b> Mit Natrium-Ionen liegt die Bindungswahrscheinlichkeit von Glucose am Symporter bei etwa 9 %, ohne Natrium-Ionen nur bei etwa 1 %. → Glucose wird nur dann effektiv gebunden und transportiert, wenn auch Na<sup>+</sup> bindet – ein Beleg für den <b>gekoppelten</b> Transport.</p>`,
      termdefs: [
        ['Konzentrationsgefälle (-gradient)', 'Unterschied der Konzentration eines Stoffes zwischen zwei Bereichen; passiver Transport läuft „bergab“.'],
        ['Passiver Transport', 'Transport entlang des Konzentrationsgefälles (hoch → niedrig) ohne Energieaufwand.'],
        ['Aktiver Transport', 'Transport gegen das Konzentrationsgefälle (niedrig → hoch) unter Energieaufwand (meist ATP).'],
        ['Einfache Diffusion', 'Passiver Transport kleiner, ungeladener Teilchen (O₂, CO₂) direkt durch die Lipiddoppelschicht.'],
        ['Erleichterte Diffusion', 'Passiver Transport mithilfe von Membranproteinen (Kanäle oder Carrier).'],
        ['Kanalvermittelte Diffusion', 'Erleichterte Diffusion durch eine Pore eines Kanalproteins; selektiv nach Größe und Ladung (z. B. Aquaporine).'],
        ['Carriervermittelte Diffusion', 'Erleichterte Diffusion durch einen Carrier mit spezifischer Bindungsstelle für ein Molekül/Ion.'],
        ['Carrier (Transporter)', 'Membrantransportprotein mit Bindungsstelle für ein bestimmtes Teilchen.'],
        ['Primär aktiver Transport', 'Aktiver Transport, bei dem die Energie direkt aus ATP stammt (z. B. Na⁺-K⁺-Pumpe).'],
        ['Sekundär aktiver Transport', 'Aktiver Transport, angetrieben durch das Gefälle eines zweiten Teilchens (z. B. Na⁺), das primär aktiv aufgebaut wurde.'],
        ['Symport', 'Gleichzeitiger Transport zweier Teilchensorten in die gleiche Richtung.'],
        ['Antiport', 'Gleichzeitiger Transport zweier Teilchensorten in entgegengesetzte Richtungen.'],
        ['Aquaporine', 'Ständig geöffnete, hochselektive Wasserkanäle.']
      ],
      mechanism: `
<h3>Entscheidungsweg für jede Transportaufgabe</h3>
<ol class="steps">
  <li><b>Wo ist die Konzentration höher?</b> Transport hoch → niedrig = passiv; niedrig → hoch = aktiv.</li>
  <li><b>Kann das Teilchen durch die Lipiddoppelschicht?</b> Klein & ungeladen → einfache Diffusion. Sonst Transportprotein nötig.</li>
  <li><b>Passiv mit Protein:</b> Pore → kanalvermittelt; spezifische Bindungsstelle → carriervermittelt.</li>
  <li><b>Aktiv:</b> ATP direkt am Transporter → primär aktiv. Kopplung an ein zweites Teilchen, das „bergab“ fließt → sekundär aktiv.</li>
  <li><b>Zwei Teilchen gleichzeitig?</b> Gleiche Richtung → Symport; entgegengesetzt → Antiport.</li>
</ol>
${fig('transport', 'Interaktive Simulation: Transportmechanismen (Mechanismus wählen, Teilchen beobachten)')}
${fig('glucose', 'Schrittweise: Glucosetransport aus dem Darm ins Blut')}`,
      connections: `
<p><b>Warum drei Transporter für Glucose?</b> Jeder Teilschritt hat andere Bedingungen: Die Aufnahme aus dem Lumen läuft gegen das Glucosegefälle und braucht deshalb eine Energiequelle (Na<sup>+</sup>-Gefälle → Symporter). Dieses Na<sup>+</sup>-Gefälle würde ohne Pumpe schnell zusammenbrechen, weil ständig Na<sup>+</sup> einströmt → die ATP-verbrauchende Pumpe hält es aufrecht. Die Abgabe ins Blut läuft entlang des Gefälles und kann daher passiv über einen Carrier erfolgen. Dass die Transporter auf verschiedenen Zellseiten bleiben, erklärt das Fence-Modell (Thema 3).</p>
<p><b>Verbindung zur Energie:</b> Auch sekundär aktiver Transport kostet letztlich ATP – nur nicht am Symporter selbst, sondern an der Pumpe, die den Na<sup>+</sup>-Gradienten aufbaut.</p>
${CLASS('<p>Arbeitsblatt „Schwierigkeiten bei der Nährstoff-Resorption“: Die meisten Nahrungsbestandteile (z. B. Aminosäuren, Vitamine, Mineralstoffe) gelangen per Carrier durch erleichterte Diffusion in die Darmzellen; Wasser über Aquaporine. Ausnahme ist Glucose (sekundär aktiv), weil sie in den Zellen höher konzentriert ist als im Lumen.</p>')}`,
      figures: [['transport', 'Membrantransport'], ['glucose', 'Glucosetransport']],
      exam: [
        'Alle Transportarten in einer Übersicht (passiv: einfach/kanal/carrier; aktiv: primär/sekundär, Vesikel) erklären und zuordnen.',
        'Transportrichtung immer mit der Konzentration begründen; Energiebedarf ableiten.',
        'Symport vs. Antiport an Beispielen (Na⁺-Glucose-Symporter, Na⁺-K⁺-Pumpe).',
        'Glucosetransport Darm → Blut mit allen drei Transportern, Konzentrationen und Transportarten erklären (Reihenfolge: Pumpe → Symporter → Carrier).',
        'Messdaten B3 (9 % vs. 1 %) auswerten und als Beleg für Kopplung deuten.'
      ],
      errors: [
        ['Sekundär aktiver Transport braucht keine Energie.', 'Er nutzt das Na⁺-Gefälle, das primär aktiv unter ATP-Verbrauch aufgebaut wird – Energie wird also indirekt benötigt.'],
        ['Glucose diffundiert passiv aus dem Darm in die Darmzelle.', 'Sie wird gegen ihr Gefälle sekundär aktiv über den Na⁺-Glucose-Symporter aufgenommen.'],
        ['Erleichterte Diffusion benötigt ATP.', 'Sie ist passiv – das Protein „erleichtert“ nur den Durchtritt.'],
        ['Symport = entgegengesetzte Richtung.', 'Symport = gleiche Richtung; Antiport = entgegengesetzt.'],
        ['Aktiver Transport braucht immer direkt ATP (aus deinem Aufschrieb).', 'Nur primär aktiver Transport nutzt ATP direkt; sekundär aktiver Transport nutzt einen Ionengradienten.'],
        ['„Na⁺ möchte wieder in die Zelle.“ (aus deinem Aufschrieb)', 'Teilchen „wollen“ nichts: Na⁺ diffundiert aufgrund der ungerichteten Teilchenbewegung netto entlang seines Konzentrationsgefälles in die Zelle.']
      ],
      summary: [
        'Passiv = entlang des Gefälles, ohne Energie: einfache Diffusion, kanal- und carriervermittelte Diffusion.',
        'Aktiv = gegen das Gefälle, mit Energie: Pumpen, Vesikel.',
        'Primär aktiv: direkt ATP. Sekundär aktiv: gekoppelt an das Gefälle eines zweiten Teilchens.',
        'Symport = gleiche Richtung, Antiport = entgegengesetzt.',
        'Glucose: Na⁺-K⁺-Pumpe (primär aktiv, Antiport) → Na⁺-Glucose-Symporter (sekundär aktiv) → Glucose-Carrier (erleichterte Diffusion) ins Blut.'
      ],
      selfcheck: [
        ['Woran erkennst du, ob ein Transport aktiv ist?', 'Er verläuft gegen das Konzentrationsgefälle (niedrig → hoch) und braucht Energie.'],
        ['Welche Rolle spielt die Na⁺-K⁺-Pumpe beim Glucosetransport?', 'Sie hält die Na⁺-Konzentration in der Zelle niedrig (ATP-Verbrauch) und erhält so das Na⁺-Gefälle, das den Symporter antreibt.'],
        ['Warum ist der Glucoseaustritt ins Blut passiv?', 'Glucose ist in der Zelle höher konzentriert als in der Gewebsflüssigkeit → Transport entlang des Gefälles über einen Carrier.'],
        ['Was zeigt der Versuch in B3?', 'Ohne Na⁺ bindet Glucose kaum (≈1 % statt ≈9 %) → Glucosetransport ist an Na⁺ gekoppelt.']
      ]
    }
  },

  /* ===================================================================== 5 */
  {
    id: 't5', nr: 5, title: 'Endozytose, Exozytose und Membranfluss', pages: '22–23',
    short: 'Vesikeltransport, rezeptorvermittelte Endozytose von Eisen, Insulin',
    goals: [
      { id: 't5g1', text: 'Endozytose und Exozytose anhand geeigneter Beispiele darstellen und erläutern.' },
      { id: 't5g2', text: 'Am Beispiel der rezeptorvermittelten Endozytose von Eisenionen die einzelnen Schritte der Stoffaufnahme erklären.' },
      { id: 't5g3', text: 'Die Bedeutung von Rezeptoren, Membranabschnürung, Membranfluss und pH-Wert-Veränderungen herausarbeiten.' }
    ],
    terms: ['Endozytose', 'Exozytose', 'Rezeptor', 'rezeptorvermittelte Endozytose', 'Membranabschnürung', 'Membranfluss', 'pH-Wert'],
    labs: ['endocytosis', 'exocytosis'],
    sheet: {
      intro: `
<p>Zellen sind in viele membranbegrenzte Reaktionsräume gegliedert (<b>Kompartimentierung</b>). Zwischen diesen Kompartimenten – und zwischen Zelle und Umgebung – müssen Stoffe ausgetauscht werden: Nährstoffe hinein, Stoffwechselprodukte wie Hormone hinaus. Große Teilchen oder ganze Portionen von Stoffen passen durch keinen Kanal und keinen Carrier. Sie werden in <b>Vesikeln</b> (Membranbläschen) transportiert. Diese Vorgänge sind nur möglich, weil Biomembranen flüssig und beweglich sind (Thema 3).</p>
${BOOK('22', '<p>Transport über Vesikel: Kompartimentierung, Endo- und Exozytose, rezeptorvermittelte Endozytose von Eisen-Ionen (B1).</p>')}
${BOOK('23 (Material)', '<p>„Membran im Fluss“: Synthese und Freisetzung von Insulin (B1), Wirkungsweise von Insulin auf Körperzellen (B2).</p>')}`,
      explain: `
<h3>Kompartimentierung</h3>
<p>In Zellen laufen viele Reaktionen gleichzeitig ab, die sich gegenseitig stören würden. Membranbegrenzte Kompartimente (Organellen, Vesikel/Endosomen) trennen diese Reaktionen voneinander. In einem Kompartiment kann so z. B. ein <b>bestimmter pH-Wert</b> oder eine bestimmte Stoffkonzentration aufrechterhalten werden – genau das nutzt die Zelle bei der Eisenaufnahme.</p>

<h3>Exozytose – Stoffe hinaus</h3>
<p>Bei der <b>Exozytose</b> verschmilzt ein Vesikel mit der Zellmembran und gibt seinen Inhalt in den extrazellulären Raum ab. Die Vesikelmembran wird dabei Teil der Zellmembran.</p>
<p><b>Beispiel Insulin</b> (B1 S. 23): In den β-Zellen der Bauchspeicheldrüse gelangt die Information für Insulin als mRNA vom Zellkern zu Ribosomen am rauen ER. Dort entsteht das <b>Prohormon</b> (Vorstufe). Es wird in einem Vesikel zum <b>Golgi-Apparat</b> transportiert und dort zum <b>aktiven Hormon</b> umgebaut. Vom Golgi-Apparat schnürt sich ein Vesikel ab, in dem Insulin mit einem stabilisierenden Protein vorliegt. Dieses Vesikel verschmilzt mit der Zellmembran (<b>Exozytose</b>); Insulin gelangt über Lymphe und Kapillarwand ins Blutplasma und zum Bestimmungsort.</p>

<h3>Endozytose – Stoffe hinein</h3>
<p>Die <b>Endozytose</b> ist der umgekehrte Vorgang: Die Zellmembran stülpt sich nach innen ein, umschließt Stoffe und wird als Bläschen (Vesikel) <b>abgeschnürt</b>. Vesikeltransport zählt zum <b>aktiven Transport</b> (Buch B1, S. 20).</p>

<h3>Rezeptorvermittelte Endozytose</h3>
<p>Bei der <b>rezeptorvermittelten Endozytose</b> erfolgt die Einschnürung erst, nachdem das aufzunehmende Teilchen an ein bestimmtes Membranprotein gebunden hat – nach dem <b>Schlüssel-Schloss-Prinzip</b>. Diese Membranproteine heißen <b>Rezeptoren</b>. Je nach Rezeptor werden nur ganz bestimmte Teilchen eingeschlossen. Auf der Cytoplasmaseite des entstehenden Vesikels lagert sich das Protein <b>Clathrin</b> an und stabilisiert es. So können sogar Stoffe aufgenommen werden, die <b>nur in sehr geringer Konzentration</b> vorliegen – z. B. Eisen-Ionen.</p>

<h3>Beispiel: Aufnahme von Eisen-Ionen</h3>
<p>Eisen-Ionen gelangen über das Darmepithel ins Blut und werden von dort durch rezeptorvermittelte Endozytose in Körperzellen aufgenommen. Sie sind lebenswichtig für die Funktion vieler Proteine und für den Sauerstofftransport der roten Blutzellen.</p>
<ol class="steps">
  <li><b>Bindung an Transferrin:</b> Im Blut (pH 7,4) bindet das frei schwimmende Protein <b>Transferrin (Tf)</b> die Eisen-Ionen.</li>
  <li><b>Bindung an den Rezeptor:</b> Nur mit Eisen beladenes Transferrin bindet an den <b>Transferrin-Rezeptor (TfR)</b> der Zellmembran.</li>
  <li><b>Einstülpung:</b> Die Membran stülpt sich an dieser Stelle ein; auf der Cytoplasmaseite lagert sich Clathrin an („clathrin coated pit“).</li>
  <li><b>Abschnürung:</b> Das Membranstück wird als Vesikel abgeschnürt („clathrin coated vesicle“).</li>
  <li><b>Clathrin löst sich ab:</b> Die Clathrinhülle zerfällt; es entsteht ein Vesikel (Endosom).</li>
  <li><b>Ansäuerung:</b> Im Vesikel sinkt der pH-Wert auf ca. <b>5,5</b>. Dadurch lösen sich die Eisen-Ionen vom Transferrin und gelangen über ein Membranprotein ins Cytoplasma.</li>
  <li><b>Recycling:</b> Das Vesikel mit Rezeptor und eisenfreiem Transferrin kehrt zur Zellmembran zurück und verschmilzt mit ihr. Transferrin wird wieder ins Blut abgegeben, der Rezeptor steht erneut zur Verfügung.</li>
</ol>
${MISSING('<p>In der Buchabbildung (B1 S. 22) ist das Protein in der Vesikelmembran, das die Ansäuerung bewirkt, ebenso wie das Protein, über das die Eisen-Ionen ins Cytoplasma gelangen, <b>nicht beschriftet</b>. Die Schritte 5–7 sind aus der Abbildung abgeleitet, der Buchtext beschreibt nur die Schritte 1–4 ausführlich.</p>')}
${EXTRA('<p>Die Ansäuerung erfolgt durch eine <b>Protonenpumpe</b> (H<sup>+</sup>-ATPase), die unter ATP-Verbrauch H<sup>+</sup>-Ionen in das Vesikel pumpt. Bei saurem pH sinkt die Affinität des Transferrins zu Eisen stark – deshalb wird Eisen freigesetzt.</p>')}

<h3>Membranfluss</h3>
<p>Durch Endo- und Exozytose ist die Membran ständig „im Fluss“: Membranmaterial wird bei der Endozytose von der Zellmembran entnommen und bei der Exozytose wieder eingefügt; Vesikel wandern zwischen ER, Golgi-Apparat und Zellmembran. <b>Beispiel Insulinwirkung</b> (B2 S. 23): In Körperzellen liegen große Speichervesikel, deren Membran viele Glucose-Transportproteine enthält.</p>
<ol class="steps">
  <li>Insulin bindet außen an einen <b>Rezeptor</b> der Zellmembran.</li>
  <li>Im Zellinneren wird dadurch ein Signalprotein unter ATP-Verbrauch phosphoryliert.</li>
  <li>Das phosphorylierte Signalprotein bewirkt indirekt, dass sich vom großen Speichervesikel <b>kleine Vesikel abschnüren</b>, in deren Membran Glucose-Transportproteine sitzen.</li>
  <li>Diese Vesikel wandern zur Zellmembran und <b>verschmelzen</b> mit ihr → viele Glucose-Transporter in der Zellmembran.</li>
  <li>Glucose strömt in die Zelle.</li>
  <li>Transportproteine werden durch Endozytose wieder aufgenommen und mit dem Speichervesikel vereinigt (Recycling).</li>
</ol>
<p>Durch diesen <b>Membranfluss</b> wird die Glucoseaufnahme bis zu <b>50-fach</b> erhöht.</p>`,
      termdefs: [
        ['Kompartimentierung', 'Gliederung der Zelle in membranbegrenzte Reaktionsräume mit eigenen Bedingungen (z. B. pH-Wert).'],
        ['Vesikel', 'Kleines, von einer Membran umschlossenes Bläschen zum Stofftransport.'],
        ['Exozytose', 'Vesikel verschmilzt mit der Zellmembran und gibt seinen Inhalt nach außen ab (z. B. Insulin).'],
        ['Endozytose', 'Zellmembran stülpt sich ein und schnürt Stoffe als Vesikel nach innen ab.'],
        ['Rezeptor', 'Membranprotein, das ein bestimmtes Teilchen nach dem Schlüssel-Schloss-Prinzip bindet.'],
        ['Rezeptorvermittelte Endozytose', 'Endozytose, bei der die Einschnürung erst nach Bindung des Teilchens an einen Rezeptor erfolgt; hochselektiv.'],
        ['Clathrin', 'Protein, das sich auf der Cytoplasmaseite des Vesikels anlagert und es stabilisiert.'],
        ['Transferrin (Tf)', 'Bluteiweiß, das Eisen-Ionen bindet und transportiert.'],
        ['Transferrin-Rezeptor (TfR)', 'Rezeptor der Zellmembran, der nur eisenbeladenes Transferrin bindet.'],
        ['Membranabschnürung', 'Ablösen eines eingestülpten Membranabschnitts als geschlossenes Vesikel.'],
        ['Membranfluss', 'Ständiger Austausch von Membranmaterial zwischen Zellmembran, Vesikeln und Organellen durch Endo- und Exozytose.'],
        ['pH-Wert', 'Maß für die Konzentration an Oxonium-Ionen (H₃O⁺); kleiner pH = saurer.']
      ],
      mechanism: `
${fig('endocytosis', 'Interaktiv: Rezeptorvermittelte Endozytose von Eisen-Ionen – Schritt für Schritt')}
${fig('exocytosis', 'Interaktiv: Exozytose (Insulin) und Membranfluss (Insulinwirkung)')}`,
      connections: `
<h3>Bedeutung der einzelnen Faktoren</h3>
<ul>
  <li><b>Rezeptoren:</b> sorgen für <b>Selektivität</b> (Schlüssel-Schloss-Prinzip: nur beladenes Tf wird gebunden) und für eine <b>Anreicherung</b>: Weil viele Teilchen an Rezeptoren gesammelt werden, bevor die Einschnürung erfolgt, lohnt sich die Aufnahme auch bei sehr geringer Konzentration.</li>
  <li><b>Membranabschnürung:</b> Der Stoff wird aufgenommen, ohne dass die Membran „ein Loch“ bekommt – die Membran bleibt geschlossen, der Stoff bleibt in einem eigenen Kompartiment (Vesikel).</li>
  <li><b>pH-Wert-Veränderung:</b> Nur im sauren Milieu (pH 5,5) löst sich Eisen vom Transferrin. Ohne Ansäuerung bliebe Eisen gebunden und gelangte nicht ins Cytoplasma. Möglich ist das, weil das Vesikel ein abgeschlossenes Kompartiment ist.</li>
  <li><b>Membranfluss:</b> Membran, Rezeptoren und Transferrin werden recycelt. Endozytose verkleinert, Exozytose vergrößert die Zellmembran – zusammen bleibt die Zellgröße im Gleichgewicht. Bei der Insulinwirkung kann die Zelle durch Membranfluss die Zahl der Transporter in der Membran rasch verändern.</li>
</ul>
<p><b>Verbindung zu Thema 9:</b> Der pH-Wert verändert Ladungen in Proteinen – dasselbe Prinzip, das beim Transferrin die Eisenbindung löst, erklärt die pH-Abhängigkeit von Enzymen.</p>
${CLASS('<p>Zu „Membran im Fluss“ (S. 23 Nr. 3): Ohne Insulin wird die Signalkette nicht ausgelöst, kaum Glucose-Transporter gelangen in die Membran → Zellen nehmen trotz hoher Blutglucose wenig Glucose auf → weniger Glucose für die Zellatmung → weniger ATP → Leistungsabfall (z. B. Muskulatur).</p>')}`,
      figures: [['endocytosis', 'Endozytose von Eisen'], ['exocytosis', 'Exozytose und Membranfluss']],
      exam: [
        'Endo- und Exozytose definieren und je ein Beispiel ausführlich erläutern (Eisenaufnahme; Insulinsekretion).',
        'Rezeptorvermittelte Endozytose von Eisen in allen Schritten (Tf, TfR, Clathrin, Abschnürung, pH 5,5, Freisetzung, Recycling).',
        'Begründen, warum die pH-Senkung im Vesikel notwendig ist (Buch S. 22, Aufgabe 1).',
        'Begründen, warum rezeptorvermittelte Endozytose bei Stoffen geringer Konzentration vorteilhaft ist (Aufgabe 2).',
        'Membranfluss am Beispiel der Insulinwirkung erklären; Leistungsabfall bei Insulinmangel auf zellulärer Ebene begründen.'
      ],
      errors: [
        ['Endozytose ist passiver Transport.', 'Vesikeltransport gehört zum aktiven Transport (Buch B1 S. 20).'],
        ['Eisen schwimmt frei im Blut und diffundiert in die Zelle.', 'Eisen ist an Transferrin gebunden und wird rezeptorvermittelt aufgenommen.'],
        ['Im Vesikel steigt der pH-Wert.', 'Er sinkt (saurer): von 7,4 im Blut auf ca. 5,5 im Vesikel.'],
        ['Clathrin liegt im Vesikelinneren.', 'Clathrin liegt auf der Außenseite des Vesikels (Cytoplasmaseite).'],
        ['Rezeptor und Transferrin werden in der Zelle abgebaut.', 'Sie werden recycelt (Rückkehr zur Membran, Tf zurück ins Blut).'],
        ['Bei der Exozytose „platzt“ das Vesikel.', 'Die Vesikelmembran verschmilzt mit der Zellmembran.']
      ],
      summary: [
        'Exozytose: Vesikel verschmilzt mit Zellmembran → Inhalt nach außen (Insulin: ER → Golgi → Vesikel → Exozytose).',
        'Endozytose: Einstülpung + Abschnürung → Vesikel nach innen.',
        'Rezeptorvermittelt: erst Bindung an Rezeptor (Schlüssel-Schloss), dann Einschnürung; Clathrin stabilisiert.',
        'Eisen: Tf bindet Fe → TfR → coated pit → coated vesicle → Clathrin ab → pH 5,5 löst Fe → Fe ins Cytoplasma → Recycling.',
        'Membranfluss: ständiger Austausch von Membranmaterial; Insulin erhöht so die Glucoseaufnahme bis 50-fach.'
      ],
      selfcheck: [
        ['Warum ist die pH-Senkung im Vesikel nötig?', 'Nur im sauren Milieu lösen sich die Eisen-Ionen vom Transferrin und können ins Cytoplasma gelangen.'],
        ['Warum ist rezeptorvermittelte Endozytose bei geringen Konzentrationen vorteilhaft?', 'Rezeptoren binden gezielt nur das gewünschte Teilchen und sammeln es an, bevor abgeschnürt wird → effiziente, selektive Aufnahme.'],
        ['Was bedeutet Membranfluss?', 'Membranmaterial wird ständig durch Endo- und Exozytose zwischen Zellmembran und Vesikeln/Organellen ausgetauscht.'],
        ['Welche Rolle spielt Clathrin?', 'Es lagert sich auf der Cytoplasmaseite an und stabilisiert das entstehende Vesikel.']
      ]
    }
  },

  /* ===================================================================== 6 */
  {
    id: 't6', nr: 6, title: 'Struktur und Wirkungsweise von Enzymen', pages: '26–27',
    short: 'Aktivierungsenergie, aktives Zentrum, katalytischer Zyklus, Cofaktoren',
    goals: [
      { id: 't6g1', text: 'Aufbau und Wirkungsweise von Enzymen erklären und erläutern, wie sie die Aktivierungsenergie einer chemischen Reaktion herabsetzen.' },
      { id: 't6g2', text: 'Einen katalytischen Zyklus mit Enzym, Substrat, Enzym-Substrat-Komplex und Produkt skizzieren und erläutern.' },
      { id: 't6g3', text: 'Die Bedeutung von Kofaktoren erklären und zwischen vorübergehend gebundenen Cosubstraten und fest gebundenen prosthetischen Gruppen unterscheiden.' }
    ],
    terms: ['Aktivierungsenergie', 'Enzym-Substrat-Komplex', 'aktives Zentrum', 'katalytischer Zyklus', 'Kofaktoren', 'Cosubstrat', 'prosthetische Gruppe'],
    labs: ['catalysis'],
    sheet: {
      intro: `
<p>Stoffwechselreaktionen würden bei Körpertemperatur ohne Hilfe so langsam ablaufen, dass Leben unmöglich wäre. <b>Enzyme</b> sind <b>Biokatalysatoren</b>: Sie beschleunigen bestimmte Reaktionen, ohne selbst verbraucht zu werden. Fast alle Enzyme sind Proteine – ihre Funktion folgt daher direkt aus ihrer Raumstruktur (Thema 2). Leitbeispiel im Buch ist die <b>Lactase</b>, die Milchzucker (Lactose) spaltet; fehlt sie, ist man lactoseintolerant.</p>
${BOOK('26–27', '<p>Katalytischer Zyklus der Lactase (B1), Energiediagramm exergonischer Reaktionen (B2), Substrat im aktiven Zentrum der Lactase (B3), enzymkatalysierte Reaktion mit Cosubstrat (B4).</p>')}`,
      explain: `
<h3>Warum Reaktionen Aktivierungsenergie brauchen</h3>
<p>Bei der Verdauung wird das Disaccharid <b>Lactose</b> durch das Enzym Lactase unter Anlagerung eines Wassermoleküls (<b>Hydrolyse</b>) in die Monosaccharide <b>Glucose</b> und <b>Galactose</b> gespalten. Ohne Enzym läuft diese Reaktion bei Körpertemperatur nur extrem langsam ab: In einer Zeitspanne reagieren nur sehr wenige Moleküle. Der Grund: Um bestehende Bindungen zu spalten, müssen die Ausgangsstoffe zuerst „aktiviert“ werden – sie brauchen die <b>Aktivierungsenergie</b>. Bei Körpertemperatur besitzen nur wenige Moleküle so viel Energie.</p>

<h3>Wie Enzyme die Aktivierungsenergie herabsetzen</h3>
<p>Enzyme liefern <b>keine</b> Energie. Sie erhöhen die Reaktionsgeschwindigkeit, indem sie durch die Bildung eines <b>Enzym-Substrat-Komplexes</b> die Aktivierungsenergie <b>herabsetzen</b>. Dieser Komplex ist ein <b>Übergangszustand</b> aus Enzym und gebundenem Substrat ([A···E···B] statt [A···B]). Er ermöglicht die Spaltung von Bindungen bei geringerer Energiezufuhr. Je geringer die Aktivierungsenergie, desto höher der Anteil reaktionsfähiger Moleküle. Mit Lactase läuft die Reaktion bei Körpertemperatur etwa <b>10 000 000-fach schneller</b> ab.</p>
<p><b>Energiediagramm (B2):</b> y-Achse „Energiegehalt der Stoffe“, x-Achse „Reaktionsverlauf“. Die Substrate (A + B) liegen höher als die Produkte (C + D) → es wird Energie frei (exergonische Reaktion). Die Kurve ohne Enzym hat einen hohen „Berg“ (Übergangszustand), die Kurve mit Enzym einen deutlich niedrigeren. <b>Ausgangs- und Endniveau bleiben gleich</b> – das Enzym verändert nur die Höhe des Berges, nicht die frei werdende Energie.</p>

<h3>Das aktive Zentrum</h3>
<p>Durch die räumliche Struktur des Enzymmoleküls entsteht eine taschenförmige Vertiefung, das <b>aktive Zentrum</b>. Dort liegen bestimmte Aminosäurereste in einer bestimmten Anordnung. Sie treten über <b>Ionenbindungen, Wasserstoffbrücken, Dipol-Dipol- oder Van-der-Waals-Kräfte</b> mit dem Substratmolekül in Wechselwirkung. Dadurch werden Bindungen im Substrat gelockert; in diesem Übergangszustand können sie schon bei Raum- bzw. Körpertemperatur gebrochen werden, und das Wassermolekül kann sich anlagern. Eine enzymkatalysierte Reaktion wird begünstigt, indem</p>
<ul>
  <li>zwei Substratmoleküle in eine passende räumliche Ausrichtung zueinander gebracht werden,</li>
  <li>in Substratmolekülen Ladungen erzeugt oder verschoben werden (reaktionsbereiter),</li>
  <li>Substratmoleküle mechanisch verbogen werden, sodass Bindungen instabiler werden.</li>
</ul>

<h3>Der katalytische Zyklus</h3>
<p>Ein Enzym durchläuft immer wieder denselben Kreislauf: Es bindet das Substrat im aktiven Zentrum (<b>Enzym-Substrat-Komplex</b>), das Substrat reagiert im Übergangszustand bei niedriger Aktivierungsenergie zu den Produkten, die Produkte haben eine <b>geringere Affinität</b> zum Enzym als das Substrat und lösen sich ab. Das Enzym geht <b>unverändert</b> aus der Reaktion hervor und kann ein neues Substratmolekül binden. Weil Enzyme nicht verbraucht werden, sind sie schon in <b>geringen Mengen</b> wirksam.</p>

<h3>Bestandteile von Enzymen: Cofaktoren</h3>
<p>Neben dem Proteinanteil können Enzyme eine zusätzliche Komponente enthalten, den <b>Cofaktor</b> (Kofaktor). Proteinanteil (<b>Apoenzym</b>) und Cofaktor bilden zusammen das funktionsfähige <b>Holoenzym</b> (Beschriftung in B4).</p>
<ul>
  <li><b>Anorganische Cofaktoren:</b> Metall-Ionen wie Eisen-, Kupfer- oder Mangan-Ionen (aus der Nahrung). Sie sind fest an das Enzym gebunden und stabilisieren den Übergangszustand im Enzym-Substrat-Komplex.</li>
  <li><b>Organische Cofaktoren = Coenzyme.</b> Man unterscheidet:
    <ul>
      <li><b>Prosthetische Gruppe:</b> Coenzym, das als <b>ständiger Bestandteil fest</b> an das Enzym gebunden ist.</li>
      <li><b>Cosubstrat:</b> Coenzym, das nur <b>kurzfristig (vorübergehend)</b> gebunden ist. Es verändert bei der Reaktion seine Molekülstruktur, weil es Wasserstoff-Ionen, Elektronen oder chemische Gruppen an das Substrat abgibt bzw. von ihm aufnimmt. Nach der Reaktion wird es freigesetzt und in einer <b>Folgereaktion</b> (an einem anderen Enzym) <b>regeneriert</b>. Beispiel: NAD<sup>+</sup> bei der Alkoholdehydrogenase (Buch S. 33).</li>
    </ul></li>
</ul>
${EXTRA('<p>Beispiel für eine prosthetische Gruppe: die <b>Häm-Gruppe</b> im Enzym Katalase (die Häm-Gruppe kennst du aus dem Hämoglobin, Thema 2). Enzyme verändern außerdem nicht die Lage des chemischen Gleichgewichts, sondern nur, wie schnell es sich einstellt.</p>')}`,
      termdefs: [
        ['Enzym', 'Biokatalysator (meist Protein), der eine bestimmte Reaktion beschleunigt, ohne verbraucht zu werden.'],
        ['Substrat', 'Ausgangsstoff, der vom Enzym umgesetzt wird (z. B. Lactose).'],
        ['Produkt', 'Stoff, der bei der enzymatischen Reaktion entsteht (z. B. Glucose und Galactose).'],
        ['Aktivierungsenergie', 'Energie, die zugeführt werden muss, damit die Ausgangsstoffe reagieren (Bindungen gespalten werden) können.'],
        ['Übergangszustand', 'Energiereichster, instabiler Zustand während der Reaktion; mit Enzym [A···E···B] energieärmer als ohne [A···B].'],
        ['Aktives Zentrum', 'Taschenförmige Vertiefung des Enzyms, in der Aminosäurereste das Substrat binden und umsetzen.'],
        ['Enzym-Substrat-Komplex', 'Vorübergehende Verbindung aus Enzym und im aktiven Zentrum gebundenem Substrat; Übergangszustand mit niedriger Aktivierungsenergie.'],
        ['Katalytischer Zyklus', 'Kreislauf: Enzym + Substrat → Enzym-Substrat-Komplex → Enzym + Produkt(e); Enzym unverändert.'],
        ['Hydrolyse', 'Spaltung einer Bindung unter Anlagerung von Wasser.'],
        ['Kofaktor (Cofaktor)', 'Nicht-Protein-Bestandteil eines Enzyms: Metall-Ion oder organisches Coenzym.'],
        ['Apoenzym / Holoenzym', 'Proteinanteil des Enzyms / funktionsfähiges Enzym aus Apoenzym + Cofaktor.'],
        ['Coenzym', 'Organischer Cofaktor (prosthetische Gruppe oder Cosubstrat).'],
        ['Prosthetische Gruppe', 'Coenzym, das als ständiger Bestandteil fest an das Enzym gebunden ist.'],
        ['Cosubstrat', 'Coenzym, das nur vorübergehend gebunden wird, sich bei der Reaktion verändert und in einer Folgereaktion regeneriert wird (z. B. NAD⁺).']
      ],
      mechanism: `
<h3>Katalytischer Zyklus skizzieren – Checkliste</h3>
<ol class="steps">
  <li><b>Enzym</b> mit taschenförmigem <b>aktivem Zentrum</b> zeichnen und beschriften.</li>
  <li><b>Substrat</b> (z. B. Lactose = zwei verbundene Sechsringe) zeichnen; passt in das aktive Zentrum.</li>
  <li><b>Enzym-Substrat-Komplex:</b> Substrat im aktiven Zentrum gebunden; gelockerte Bindung andeuten; ggf. H<sub>2</sub>O hinzufügen.</li>
  <li><b>Produkte</b> (Glucose + Galactose) lösen sich ab (geringere Affinität).</li>
  <li><b>Enzym unverändert</b> → Pfeil zurück zum Anfang (Kreislauf schließen!).</li>
</ol>
${fig('catalysis', 'Interaktiv: Katalytischer Zyklus, Energiediagramm und Cosubstrat')}`,
      connections: `
<p><b>Struktur → Funktion:</b> Das aktive Zentrum entsteht erst durch die korrekte Tertiärstruktur (Thema 2). Wird eine Aminosäure im aktiven Zentrum ausgetauscht, können Ladungen, H-Brücken oder die Form fehlen → Substrat bindet nicht mehr oder wird nicht umgesetzt (Buch S. 27, Aufgabe 4). Dasselbe erklärt, warum Hitze und extreme pH-Werte Enzyme inaktivieren (Thema 9) und warum Hemmstoffe wirken (Thema 10).</p>
<p><b>Energie → Geschwindigkeit:</b> Je niedriger die Aktivierungsenergie, desto mehr Moleküle reagieren pro Zeit. Wie viele Substratmoleküle ein Enzym pro Sekunde umsetzt, beschreibt die Wechselzahl k<sub>cat</sub> (Thema 8).</p>
${CLASS('<p>Im Unterricht: „Stoffwechselreaktionen laufen meist nicht spontan ab“. Präziser: Sie würden bei Körpertemperatur viel zu langsam ablaufen. Enzyme machen sie schnell genug – ob eine Reaktion grundsätzlich Energie freisetzt (exergonisch ist), ändern sie nicht.</p>')}`,
      figures: [['catalysis', 'Katalytischer Zyklus und Energiediagramm']],
      exam: [
        'Energiediagramm mit und ohne Enzym zeichnen und vollständig beschriften (Achsen, Substrate, Produkte, Übergangszustände, beide Aktivierungsenergien, frei werdende Energie).',
        'Erklären, wie das aktive Zentrum die Aktivierungsenergie senkt (Wechselwirkungen, Lockerung von Bindungen, Ausrichtung, Ladungsverschiebung, Verbiegen).',
        'Katalytischen Zyklus der Lactase skizzieren und erläutern.',
        'Begründen, warum geringe Enzymmengen ausreichen (Enzym wird nicht verbraucht).',
        'Cofaktoren einteilen; prosthetische Gruppe und Cosubstrat abgrenzen (fest/ständig vs. vorübergehend, verändert, regeneriert).'
      ],
      errors: [
        ['Enzyme liefern die Aktivierungsenergie.', 'Enzyme setzen die Aktivierungsenergie herab; sie liefern keine Energie.'],
        ['Enzyme verändern die Energie von Substrat und Produkt.', 'Anfangs- und Endniveau bleiben gleich; nur der Übergangszustand ist energieärmer.'],
        ['Enzyme werden bei der Reaktion verbraucht.', 'Sie gehen unverändert hervor und werden wiederverwendet.'],
        ['Cosubstrat und prosthetische Gruppe sind dasselbe.', 'Prosthetische Gruppe: fest, ständig. Cosubstrat: vorübergehend gebunden, verändert, regeneriert.'],
        ['Enzyme machen Reaktionen „spontan“ möglich (aus deinem Aufschrieb).', 'Enzyme beschleunigen Reaktionen, die grundsätzlich ablaufen können; sie ändern nicht, ob Energie frei wird.'],
        ['Im Energiediagramm steht „Enzym-Substrat-Komplex“ am höheren Gipfel.', 'Der Enzym-Substrat-Komplex gehört zum niedrigeren Gipfel der Kurve mit Enzym.']
      ],
      summary: [
        'Enzyme = Biokatalysatoren (meist Proteine), werden nicht verbraucht.',
        'Sie senken die Aktivierungsenergie durch Bildung des Enzym-Substrat-Komplexes (Übergangszustand).',
        'Aktives Zentrum: Tasche mit spezifisch angeordneten Aminosäureresten (Ionenbindungen, H-Brücken, Dipol-Dipol, Van-der-Waals).',
        'Zyklus: E + S → ES → E + P; Enzym unverändert.',
        'Cofaktoren: Metall-Ionen oder Coenzyme; prosthetische Gruppe (fest) vs. Cosubstrat (vorübergehend, regeneriert).'
      ],
      selfcheck: [
        ['Warum läuft die Lactose-Spaltung ohne Enzym bei Körpertemperatur kaum ab?', 'Nur sehr wenige Moleküle besitzen die nötige Aktivierungsenergie.'],
        ['Was passiert im aktiven Zentrum mit dem Substrat?', 'Es wird über Wechselwirkungen gebunden; Bindungen werden gelockert, sodass sie bei geringer Energiezufuhr brechen.'],
        ['Warum lösen sich die Produkte vom Enzym?', 'Sie haben eine geringere Affinität zum Enzym als das Substrat.'],
        ['Woran erkennst du ein Cosubstrat?', 'Es ist nur kurzfristig gebunden, verändert seine Struktur (gibt z. B. H⁺/Elektronen ab oder nimmt sie auf) und wird in einer Folgereaktion regeneriert.']
      ]
    }
  },

  /* ===================================================================== 7 */
  {
    id: 't7', nr: 7, title: 'Substrat- und Wirkungsspezifität von Enzymen', pages: '28–29',
    short: 'Schlüssel-Schloss-Prinzip, Induced-Fit, substrat- und wirkungsspezifisch',
    goals: [
      { id: 't7g1', text: 'Das Schlüssel-Schloss-Prinzip und das Induced-Fit-Modell erläutern.' },
      { id: 't7g2', text: 'Beide Modelle hinsichtlich der Bindung eines Substrates an das aktive Zentrum vergleichen.' },
      { id: 't7g3', text: 'Erklären, weshalb Enzyme substrat- und wirkungsspezifisch sind.' }
    ],
    terms: ['Enzym-Substrat-Komplex', 'Schlüssel-Schloss-Prinzip', 'Induced-Fit-Modell', 'substratspezifisch', 'wirkungsspezifisch'],
    labs: ['inducedfit'],
    sheet: {
      intro: `
<p>In einem einzigen Kompartiment – z. B. einem Mitochondrium – laufen viele Stoffwechselreaktionen gleichzeitig ab. Damit trotzdem keine Unordnung entsteht, muss jedes Enzym genau „sein“ Substrat erkennen und genau „seine“ Reaktion katalysieren. Diese zwei Eigenschaften heißen <b>Substratspezifität</b> und <b>Wirkungsspezifität</b>. Zwei Modelle beschreiben, wie Substrat und aktives Zentrum zusammenpassen: das <b>Schlüssel-Schloss-Prinzip</b> und das <b>Induced-Fit-Modell</b>.</p>
${BOOK('28', '<p>Substrat- und Wirkungsspezifität (B1), Induced-Fit-Modell (B2).</p>')}
${BOOK('29 (Praktikum)', '<p>Versuche zur Substratspezifität: Stärkeverdauung mit Amylase (Stärke vs. Cellulose) und Harnstoffabbau mit Urease (Harnstoff vs. Methylharnstoff).</p>')}`,
      explain: `
<h3>Substratspezifität</h3>
<p>Substratmoleküle unterscheiden sich in <b>Größe, Form und Ladungsverteilung</b>. Ob ein Molekül gebunden wird, hängt von der räumlichen Struktur des aktiven Zentrums ab. Nur wenn die Aminosäurereste im aktiven Zentrum räumlich so angeordnet sind, dass das Substrat gebunden werden kann, entsteht der für die Umwandlung notwendige <b>Enzym-Substrat-Komplex</b>. Bestimmte Substrate passen zu bestimmten Enzymen wie ein Schlüssel zum zugehörigen Schloss (<b>Schlüssel-Schloss-Prinzip</b>). Weil Enzyme nur die Reaktion passender Substrate katalysieren, nennt man sie <b>substratspezifisch</b>.</p>

<h3>Das Induced-Fit-Modell</h3>
<p>Häufig verändert erst die Bindung des Substrats die räumliche Struktur des Enzymmoleküls. Dadurch gelingt eine <b>gegenseitige optimale Ausrichtung</b> von Enzym und Substrat. Man spricht von einer <b>induzierten Passform</b> (engl. <i>induced fit</i>). Das aktive Zentrum ist also nicht starr, sondern flexibel und „schließt sich“ um das Substrat.</p>

<h3>Wirkungsspezifität</h3>
<p>Im aktiven Zentrum ermöglichen die Wechselwirkungen der Aminosäurereste mit dem Substrat eine ganz bestimmte chemische Umwandlung. Es entstehen <b>immer die gleichen Produkte</b>. Weil ein Enzym stets die gleiche Reaktion seines Substrats katalysiert, ist es <b>wirkungsspezifisch</b>. Beispiel: Lactase katalysiert nur die Spaltung von Lactose in Glucose und Galactose – keine andere Reaktion der Lactose.</p>

<h3>Vergleich der beiden Modelle</h3>
<div class="table-wrap"><table class="data">
<tr><th></th><th>Schlüssel-Schloss-Prinzip</th><th>Induced-Fit-Modell</th></tr>
<tr><td><b>Aktives Zentrum</b></td><td>starr, Form schon vor der Bindung komplementär zum Substrat</td><td>flexibel; passt sich bei der Bindung an</td></tr>
<tr><td><b>Bindung</b></td><td>Substrat „rastet ein“ wie ein Schlüssel</td><td>Bindung induziert eine Strukturänderung des Enzyms → gegenseitige optimale Ausrichtung</td></tr>
<tr><td><b>Gemeinsamkeit</b></td><td colspan="2">Beide erklären die Substratspezifität: Nur ein passendes Substrat bildet den Enzym-Substrat-Komplex.</td></tr>
<tr><td><b>Grenze</b></td><td>erklärt nicht, dass Enzyme ihre Form ändern</td><td>genaueres Modell der tatsächlichen Bindung</td></tr>
</table></div>
${EXTRA('<p>Beide sind <b>Modelle</b> – also bewusste Vereinfachungen (vgl. Buch S. 25 „Modelle zur Biokatalyse“). Das Schlüssel-Schloss-Prinzip ist nicht „falsch“, sondern einfacher; das Induced-Fit-Modell beschreibt die Beweglichkeit des Proteins realistischer. Die Strukturänderung kann zusätzlich Bindungen im Substrat unter Spannung setzen und so die Reaktion erleichtern.</p>')}

<h3>Experimentelle Belege (Praktikum S. 29)</h3>
<ul>
  <li><b>Amylase</b> spaltet <b>Stärke</b> (Amylose) zu Zuckern (Benedict-Probe rot), aber <b>nicht Cellulose</b> (Filterpapier; Benedict bleibt blau) – obwohl beide aus Glucosebausteinen bestehen. Die Verknüpfung der Glucosebausteine ist unterschiedlich → nur Stärke passt ins aktive Zentrum.</li>
  <li><b>Urease</b> spaltet <b>Harnstoff</b> zu CO<sub>2</sub> und NH<sub>3</sub> (Ammoniak → alkalisch → Phenolphthalein wird pink), <b>Methylharnstoff</b> dagegen nicht (keine Färbung) – schon eine zusätzliche Methylgruppe verhindert die Bindung.</li>
</ul>`,
      termdefs: [
        ['Substratspezifität', 'Ein Enzym bindet und setzt nur Substrate um, die räumlich (Größe, Form, Ladung) zum aktiven Zentrum passen.'],
        ['substratspezifisch', 'Eigenschaft eines Enzyms, nur bestimmte (passende) Substrate umzusetzen.'],
        ['Wirkungsspezifität', 'Ein Enzym katalysiert stets dieselbe Reaktion seines Substrats → immer gleiche Produkte.'],
        ['wirkungsspezifisch', 'Eigenschaft eines Enzyms, nur eine bestimmte chemische Umwandlung zu katalysieren.'],
        ['Schlüssel-Schloss-Prinzip', 'Modell: Substrat passt wie ein Schlüssel in das starre, komplementär geformte aktive Zentrum.'],
        ['Induced-Fit-Modell', 'Modell der induzierten Passform: Die Substratbindung verändert die Raumstruktur des Enzyms → gegenseitige optimale Ausrichtung.'],
        ['Enzym-Substrat-Komplex', 'Entsteht nur, wenn das Substrat ins aktive Zentrum passt; Voraussetzung für die Umwandlung.']
      ],
      mechanism: `
<h3>Warum sind Enzyme spezifisch? – Begründungskette</h3>
<ol class="steps">
  <li>Die <b>Aminosäuresequenz</b> legt die Faltung fest (Thema 2).</li>
  <li>Die Faltung erzeugt ein <b>aktives Zentrum</b> mit einer bestimmten Form und bestimmten Aminosäureresten (Ladungen, H-Brücken-Partner, unpolare Bereiche).</li>
  <li><b>Substratspezifität:</b> Nur ein Substrat mit passender Größe, Form und Ladungsverteilung kann binden → Enzym-Substrat-Komplex.</li>
  <li><b>Wirkungsspezifität:</b> Die Reste im aktiven Zentrum wirken nur auf bestimmte Bindungen des Substrats → immer dieselbe Reaktion, dieselben Produkte.</li>
  <li><b>Folge:</b> Für jede Reaktion wird ein eigenes Enzym benötigt → im Körper gibt es mehrere Tausend verschiedene Enzyme; Stoffwechselreaktionen laufen trotz gleichzeitigem Ablauf geordnet ab.</li>
</ol>
${fig('inducedfit', 'Interaktiv: Schlüssel-Schloss-Prinzip vs. Induced-Fit und Spezifität')}`,
      connections: `
<p>Das Schlüssel-Schloss-Prinzip begegnet dir auch außerhalb der Enzyme: bei <b>Rezeptoren</b> (Transferrin am Transferrin-Rezeptor, Insulin am Insulinrezeptor, Thema 5), bei <b>Carriern</b> mit spezifischer Bindungsstelle (Thema 4) und bei Antikörpern. Auch die <b>kompetitive Hemmung</b> (Thema 10) beruht darauf: Ein Inhibitor, der dem Substrat ähnelt, „passt“ ebenfalls ins aktive Zentrum.</p>
${CLASS('<p>Arbeitsblatt „Was ein Enzym so alles kann“: Neben Substrat- und Wirkungsspezifität zeigt Bild C die <b>Gruppenspezifität</b>: Manche Enzyme setzen verschiedene Substrate um, die einen gleichen passenden Molekülteil besitzen (der Begriff steht nicht im Buch).</p>')}`,
      figures: [['inducedfit', 'Schlüssel-Schloss vs. Induced-Fit']],
      exam: [
        'Beide Modelle erläutern und in einer Tabelle vergleichen (starr vs. flexibel; Gemeinsamkeit: Substratspezifität).',
        'Substrat- und Wirkungsspezifität definieren und am Beispiel Lactase erklären.',
        'Spezifität molekular begründen (Größe, Form, Ladungsverteilung; Anordnung der Aminosäurereste).',
        'Begründen, warum es mehrere Tausend Enzyme im Körper gibt.',
        'Versuchsergebnisse (Amylase/Cellulose, Urease/Methylharnstoff) auswerten.',
        'Weitere Bereiche nennen, in denen das Schlüssel-Schloss-Prinzip gilt (Rezeptoren, Carrier, Antikörper).'
      ],
      errors: [
        ['Substratspezifität = ein Enzym katalysiert nur eine Reaktion.', 'Das ist Wirkungsspezifität. Substratspezifität = nur bestimmte Substrate werden gebunden.'],
        ['Beim Induced-Fit verändert nur das Substrat seine Form.', 'Vor allem das Enzym verändert seine Raumstruktur – es entsteht eine gegenseitige optimale Ausrichtung.'],
        ['Das Schlüssel-Schloss-Prinzip ist widerlegt und darf nicht verwendet werden.', 'Es ist ein vereinfachtes Modell, das die Substratspezifität gut erklärt.'],
        ['Aufgabe nur halb beantwortet (aus deinem AB „Was ein Enzym so alles kann“, Nr. 2).', 'Gefordert waren zusätzlich zwei weitere Bereiche im Körper, in denen das Prinzip gilt – z. B. Hormon–Rezeptor (Insulin), Transferrin–Transferrin-Rezeptor, Antikörper–Antigen.']
      ],
      summary: [
        'Substratspezifisch: nur passendes Substrat (Größe, Form, Ladung) bildet Enzym-Substrat-Komplex.',
        'Wirkungsspezifisch: immer dieselbe Reaktion → immer dieselben Produkte.',
        'Schlüssel-Schloss: starres, komplementäres aktives Zentrum.',
        'Induced-Fit: Bindung verändert Enzymstruktur → gegenseitige optimale Ausrichtung.',
        'Ursache: Anordnung der Aminosäurereste im aktiven Zentrum (aus der Raumstruktur).'
      ],
      selfcheck: [
        ['Warum spaltet Lactase nur Lactose?', 'Nur Lactose passt in Größe, Form und Ladungsverteilung ins aktive Zentrum (substratspezifisch); dort wird nur die Spaltung in Glucose + Galactose katalysiert (wirkungsspezifisch).'],
        ['Worin unterscheiden sich die beiden Modelle?', 'Schlüssel-Schloss: aktives Zentrum starr und schon passend. Induced-Fit: aktives Zentrum flexibel, Passform wird durch Bindung induziert.'],
        ['Warum gibt es Tausende Enzyme?', 'Jedes Enzym katalysiert wegen seiner Spezifität nur eine Reaktion bestimmter Substrate.'],
        ['Was zeigt der Urease-Versuch?', 'Urease spaltet Harnstoff, aber nicht Methylharnstoff → Substratspezifität.']
      ]
    }
  },

  /* ===================================================================== 8 */
  {
    id: 't8', nr: 8, title: 'Geschwindigkeit enzymkatalysierter Reaktionen', pages: '32–33',
    short: 'Michaelis-Menten-Kurve, vmax, ½vmax, KM, Wechselzahl kcat',
    goals: [
      { id: 't8g1', text: 'Den Zusammenhang zwischen Substratkonzentration und Reaktionsgeschwindigkeit unter Einbeziehung der Brownschen Molekularbewegung erklären und als Kurvendiagramm skizzieren.' },
      { id: 't8g2', text: 'vmax, ½ vmax und die Michaelis-Menten-Konstante KM im Diagramm kennzeichnen und auf molekularer Ebene erläutern (Brownsche Molekularbewegung, Wahrscheinlichkeit von Enzym-Substrat-Begegnungen).' },
      { id: 't8g3', text: 'Die Bedeutung der Wechselzahl kcat erklären.' }
    ],
    terms: ['Maximale Reaktionsgeschwindigkeit (vmax)', 'halbmaximale Reaktionsgeschwindigkeit (½ vmax)', 'Michaelis-Menten-Konstante (KM)', 'Wechselzahl (kcat)', 'Brownsche Molekularbewegung', 'Reaktionsgeschwindigkeit'],
    labs: ['michaelis'],
    sheet: {
      intro: `
<p>Enzymkatalysierte Reaktionen laufen nicht alle gleich schnell ab – und dieselbe Reaktion kann bei verschiedenen Menschen unterschiedlich schnell sein (z. B. der Alkoholabbau). Wie schnell eine Reaktion läuft, hängt u. a. von der Konzentration des Substrats ab. Der typische Kurvenverlauf – die <b>Michaelis-Menten-Kurve</b> – gehört zu den wichtigsten Klausurdiagrammen. Du musst ihn zeichnen, beschriften (v<sub>max</sub>, ½ v<sub>max</sub>, K<sub>M</sub>) und <b>auf Teilchenebene erklären</b> können.</p>
${BOOK('32–33', '<p>Drehtür-Modell (B1), Kenngrößen einiger Enzyme (B2), Substratkonzentration und Reaktionsgeschwindigkeit bei zwei Enzymkonzentrationen (B3), Isoenzyme beim Alkoholabbau (Randspalte).</p>')}`,
      explain: `
<h3>Reaktionsgeschwindigkeit</h3>
<p>Die Geschwindigkeit einer enzymkatalysierten Reaktion hängt ab von Art und Konzentration des Enzyms, der Substrate und den Umgebungsbedingungen (pH-Wert, Temperatur). Man bestimmt sie, indem man z. B. die <b>Zunahme der Produktkonzentration in einer bestimmten Zeitspanne</b> misst.</p>

<h3>Einfluss der Substratkonzentration – molekular erklärt</h3>
<p>Enzym- und Substratmoleküle sind in Lösung in <b>ständiger, ungerichteter Bewegung</b> (<b>Brownsche Molekularbewegung</b>). Ob ein Substratmolekül auf ein freies aktives Zentrum trifft, ist daher eine Frage der <b>Wahrscheinlichkeit</b>:</p>
<ul>
  <li><b>Niedrige Substratkonzentration:</b> Die Wahrscheinlichkeit, dass Enzym- und Substratmoleküle aufeinandertreffen und Enzym-Substrat-Komplexe bilden, ist gering. Viele aktive Zentren sind unbesetzt → geringe Geschwindigkeit. Erhöht man die Substratkonzentration, steigt die Geschwindigkeit <b>fast proportional</b> (steiler Anstieg), weil Begegnungen häufiger werden und aktive Zentren schneller wieder belegt werden.</li>
  <li><b>Mittlere Substratkonzentration:</b> Ein zunehmender Teil der aktiven Zentren ist besetzt; jede weitere Erhöhung bringt weniger Zuwachs → die Kurve flacht ab.</li>
  <li><b>Hohe Substratkonzentration (Substratüberschuss):</b> Es sind mehr Substratmoleküle vorhanden, als Enzyme binden können. Sobald ein Produkt das aktive Zentrum verlässt, wird sofort ein neues Substrat gebunden – alle Enzyme arbeiten an ihrer Kapazitätsgrenze (<b>Sättigung</b>). Eine weitere Erhöhung steigert die Geschwindigkeit nicht mehr: die <b>maximale Reaktionsgeschwindigkeit v<sub>max</sub></b> für die vorliegende Enzymkonzentration ist erreicht.</li>
</ul>
<p><b>Drehtür-Modell (B1):</b> Die Drehtüren sind die Enzyme, die Einkaufenden die Substratmoleküle. Bei wenigen Kunden drehen sich die Türen oft „leer“; bei vielen Kunden ist jede Tür voll ausgelastet, Kunden müssen warten – mehr Kunden erhöhen den Durchsatz nicht mehr (v<sub>max</sub>). Mehr Türen (= mehr Enzym) erhöhen dagegen v<sub>max</sub>.</p>
${EXTRA('<p>Der Begriff „Brownsche Molekularbewegung“ steht in der Checkliste; das Buch beschreibt dasselbe als „ständige, ungerichtete Bewegung“ gelöster Teilchen (S. 20) bzw. als Wahrscheinlichkeit des Aufeinandertreffens (S. 32). Benannt ist sie nach dem Botaniker Robert Brown, der die Zitterbewegung kleiner Teilchen beobachtete; Ursache sind die Stöße der sich thermisch bewegenden Moleküle.</p>')}

<h3>Michaelis-Menten-Konstante K<sub>M</sub></h3>
<p>Leonor Michaelis und Maud Menten erkannten 1913: Bei gleichbleibender Enzymkonzentration und steigender Substratkonzentration nähert sich die Geschwindigkeit einem Sättigungswert, v<sub>max</sub> – und zwar <b>asymptotisch</b>. Deshalb lässt sich kaum exakt bestimmen, ab welcher Substratkonzentration v<sub>max</sub> erreicht ist. Stattdessen ermittelt man grafisch die Substratkonzentration bei <b>halbmaximaler Geschwindigkeit (½ v<sub>max</sub>)</b>: die <b>Michaelis-Menten-Konstante K<sub>M</sub></b>.</p>
<ul>
  <li>K<sub>M</sub> ist eine <b>Substratkonzentration</b> (Einheit z. B. mol/l) – sie wird auf der <b>x-Achse</b> abgelesen.</li>
  <li>K<sub>M</sub> ist ein Kennzeichen der Enzym-Substrat-Wechselwirkung und ein Maß für die <b>Affinität</b> (Bindungsbestreben) des Enzyms zum Substrat.</li>
  <li><b>Je kleiner K<sub>M</sub>, desto größer die Affinität</b>, weil ½ v<sub>max</sub> schon bei geringer Substratkonzentration erreicht wird.</li>
  <li>K<sub>M</sub> ist <b>unabhängig von der Enzym- und Substratkonzentration</b>.</li>
</ul>
<p><b>Einfluss der Enzymkonzentration (B3):</b> Halbiert man die Enzymkonzentration (1 → 0,5 rel. Einheiten), entstehen weniger Enzym-Substrat-Komplexe: v<sub>max</sub> und damit auch ½ v<sub>max</sub> sind halb so groß. <b>K<sub>M</sub> bleibt aber gleich</b>.</p>
${EXTRA('<p>Molekular bedeutet ½ v<sub>max</sub>: Im Mittel ist die Hälfte der aktiven Zentren besetzt. Die Kurve folgt der Gleichung v = v<sub>max</sub> · [S] / (K<sub>M</sub> + [S]) – setzt man [S] = K<sub>M</sub> ein, ergibt sich genau v = ½ v<sub>max</sub>.</p>')}

<h3>Isoenzyme</h3>
<p>Enzyme, die die gleiche Reaktion katalysieren, aber eine unterschiedliche Aminosäuresequenz (und Tertiärstruktur) und damit <b>verschiedene K<sub>M</sub>-Werte</b> besitzen, heißen <b>Isoenzyme</b>. Beispiel Alkoholabbau: Mehrere Alkoholdehydrogenasen oxidieren mithilfe des Cosubstrats NAD<sup>+</sup> Ethanol zu Acetaldehyd. Die Aldehyddehydrogenase (ALDH) baut den giftigen Acetaldehyd weiter ab; sie kommt als ALDH1 im Cytoplasma (K<sub>M</sub> = 0,050 mmol/l) und als ALDH2 im Mitochondrium (K<sub>M</sub> = 0,001 mmol/l) vor. Ist die mitochondriale ALDH2 (höhere Affinität!) inaktiv, wird Acetaldehyd nicht schnell genug abgebaut.</p>

<h3>Wechselzahl k<sub>cat</sub></h3>
<p>Die <b>Wechselzahl k<sub>cat</sub></b> (im Buch k<sub>kat</sub>) ist ein Maß für die Aktivität eines Enzyms: Sie gibt an, <b>wie viele Substratmoleküle pro Sekunde an einem aktiven Zentrum eines Enzymmoleküls umgesetzt werden</b>, wenn die optimale Substratkonzentration vorliegt, also v<sub>max</sub> erreicht ist (Einheit s<sup>−1</sup>). Je größer die „Arbeitsgeschwindigkeit“, desto größer k<sub>cat</sub>. Sie hängt davon ab, wie leicht der Enzym-Substrat-Komplex gebildet wird und wie stark sich danach Enzym- und Produktmoleküle abstoßen.</p>
<div class="table-wrap"><table class="data">
<tr><th>Enzym</th><th>Substrat</th><th>K<sub>M</sub> (mol/l)</th><th>k<sub>cat</sub> (s<sup>−1</sup>)</th></tr>
<tr><td>Acetylcholinesterase</td><td>Acetylcholin</td><td>0,000095</td><td>14 000</td></tr>
<tr><td>Carboanhydrase</td><td>HCO<sub>3</sub><sup>−</sup> und H<sup>+</sup></td><td>0,026</td><td>400 000</td></tr>
<tr><td>Katalase</td><td>H<sub>2</sub>O<sub>2</sub></td><td>0,025</td><td>10 000 000</td></tr>
<tr><td>Urease</td><td>Harnstoff und Wasser</td><td>0,025</td><td>10 000</td></tr>
<tr><td>Lactase</td><td>Lactose und Wasser</td><td>0,004</td><td>200</td></tr>
</table></div>
<p class="small muted">Kenngrößen nach Buch S. 32 (B2). Höchste Affinität: Acetylcholinesterase (kleinster K<sub>M</sub>); höchste Arbeitsgeschwindigkeit: Katalase (größte Wechselzahl).</p>
${CLASS('<p>Zusammenhang v<sub>max</sub> und k<sub>cat</sub> (aus deinem Aufschrieb, korrekt): v<sub>max</sub> = k<sub>cat</sub> · Enzymkonzentration. v<sub>max</sub> gilt für den ganzen Ansatz, k<sub>cat</sub> für ein einzelnes Enzymmolekül.</p>')}`,
      termdefs: [
        ['Reaktionsgeschwindigkeit (v)', 'Umgesetzte Stoffmenge pro Zeit, z. B. gemessen als Zunahme der Produktkonzentration pro Zeitspanne.'],
        ['Brownsche Molekularbewegung', 'Ständige, ungerichtete (zufällige) Bewegung gelöster Teilchen; bestimmt die Wahrscheinlichkeit von Enzym-Substrat-Begegnungen.'],
        ['Sättigung', 'Alle aktiven Zentren sind (praktisch ständig) besetzt; weitere Substraterhöhung steigert v nicht.'],
        ['Maximale Reaktionsgeschwindigkeit (vmax)', 'Grenzwert der Geschwindigkeit bei Substratsättigung für eine gegebene Enzymkonzentration; wird asymptotisch angenähert.'],
        ['Halbmaximale Reaktionsgeschwindigkeit (½ vmax)', 'Halbe maximale Geschwindigkeit; dient zur Ermittlung von KM.'],
        ['Michaelis-Menten-Konstante (KM)', 'Substratkonzentration, bei der ½ vmax erreicht wird; Maß für die Affinität (kleiner KM = hohe Affinität); unabhängig von Enzym- und Substratkonzentration.'],
        ['Affinität', 'Bindungsbestreben zwischen Enzym und Substrat.'],
        ['Isoenzyme', 'Enzyme, die dieselbe Reaktion katalysieren, aber unterschiedliche Sequenz/Struktur und KM-Werte haben.'],
        ['Wechselzahl (kcat)', 'Anzahl der Substratmoleküle, die ein aktives Zentrum pro Sekunde bei Sättigung umsetzt (Einheit s⁻¹).']
      ],
      mechanism: `
<h3>Michaelis-Menten-Diagramm zeichnen</h3>
<ol class="steps">
  <li><b>Achsen:</b> x-Achse „Substratkonzentration c (bzw. [S])“, y-Achse „Reaktionsgeschwindigkeit v“ (mit Einheiten oder „rel. Einheiten“).</li>
  <li><b>Kurve:</b> beginnt im Ursprung, steigt zunächst steil und fast linear, flacht dann ab und nähert sich <b>asymptotisch</b> einer waagrechten Linie (kein Knick, kein Abfall!).</li>
  <li><b>v<sub>max</sub>:</b> gestrichelte waagrechte Linie, an die sich die Kurve annähert.</li>
  <li><b>½ v<sub>max</sub>:</b> gestrichelte waagrechte Linie auf halber Höhe von v<sub>max</sub> bis zur Kurve.</li>
  <li><b>K<sub>M</sub>:</b> vom Schnittpunkt mit der Kurve senkrecht nach unten zur x-Achse → dort K<sub>M</sub> eintragen.</li>
  <li><b>Bereiche erklären:</b> niedrig (wenige Begegnungen, fast linear), mittel (½ v<sub>max</sub> bei K<sub>M</sub>), hoch (Sättigung, v<sub>max</sub>).</li>
</ol>
${fig('michaelis', 'Interaktiv: Michaelis-Menten-Diagramm – Substratkonzentration, Enzymmenge und Affinität verändern')}`,
      connections: `
<p><b>Ursache-Wirkung:</b> Die Kurvenform ist eine direkte Folge davon, dass es nur eine begrenzte Zahl an Enzymmolekülen (aktiven Zentren) gibt und Begegnungen zufällig sind. Deshalb hängt v<sub>max</sub> von der Enzymmenge ab, K<sub>M</sub> dagegen nur von der Passung zwischen Enzym und Substrat (Thema 7) – genauer: von der Raumstruktur des aktiven Zentrums. Isoenzyme mit anderer Sequenz haben deshalb andere K<sub>M</sub>-Werte.</p>
<p><b>Ausblick:</b> In Thema 10 veränderst du diese Kurve durch Hemmstoffe: Kompetitive Hemmung verändert K<sub>M</sub>, nicht-kompetitive Hemmung v<sub>max</sub>. In Thema 9 beeinflussen Temperatur und pH v über die Molekülbewegung und die Struktur des Enzyms.</p>
${CLASS('<p>Drehtür-Analogie aus deinem Aufschrieb (korrekt): Drehtür = Enzym, Einkaufende = Substrat, Personen pro Sekunde durch eine Tür ≈ k<sub>cat</sub>, mehr Türen = mehr Enzymmoleküle = höheres v<sub>max</sub>.</p>')}`,
      figures: [['michaelis', 'Michaelis-Menten-Diagramm']],
      exam: [
        'Michaelis-Menten-Kurve korrekt zeichnen (asymptotisch!) und v<sub>max</sub>, ½ v<sub>max</sub>, K<sub>M</sub> einzeichnen.',
        'Kurvenverlauf in drei Bereichen mit Brownscher Molekularbewegung und Begegnungswahrscheinlichkeit erklären.',
        'K<sub>M</sub> als Affinitätsmaß deuten (kleiner K<sub>M</sub> = hohe Affinität) und Tabellenwerte auswerten.',
        'Einfluss der Enzymkonzentration auf v<sub>max</sub> und K<sub>M</sub> erklären (B3).',
        'Wechselzahl k<sub>cat</sub> definieren und Zusammenhang mit v<sub>max</sub> erläutern.',
        'Drehtür-Modell als Analogie nutzen; Isoenzyme (ALDH) und langsamen Alkoholabbau erklären.'
      ],
      errors: [
        ['K<sub>M</sub> wird auf der y-Achse abgelesen.', 'K<sub>M</sub> ist eine Substratkonzentration → x-Achse (bei ½ v<sub>max</sub>).'],
        ['Großer K<sub>M</sub> = hohe Affinität.', 'Umgekehrt: kleiner K<sub>M</sub> = hohe Affinität.'],
        ['Mehr Enzym verändert K<sub>M</sub>.', 'Mehr Enzym erhöht v<sub>max</sub>; K<sub>M</sub> bleibt gleich.'],
        ['Die Kurve erreicht v<sub>max</sub> mit einem Knick und bleibt dann waagrecht.', 'Sie nähert sich v<sub>max</sub> asymptotisch.'],
        ['„K<sub>M</sub>: die Substratkonzentration ist für jedes Enzym konstant“ (aus deinem Aufschrieb).', 'Präzise: K<sub>M</sub> ist für ein Enzym mit einem bestimmten Substrat eine charakteristische Konstante, unabhängig von Enzym- und Substratkonzentration.'],
        ['k<sub>cat</sub> = maximale Geschwindigkeit des Ansatzes.', 'k<sub>cat</sub> bezieht sich auf ein einzelnes aktives Zentrum (Substratmoleküle pro Sekunde); v<sub>max</sub> = k<sub>cat</sub> · Enzymkonzentration.']
      ],
      summary: [
        'Niedrige [S]: wenige Begegnungen (Brownsche Bewegung) → v steigt fast linear.',
        'Hohe [S]: alle aktiven Zentren besetzt → Sättigung, v nähert sich v<sub>max</sub> asymptotisch.',
        'K<sub>M</sub> = [S] bei ½ v<sub>max</sub>; kleiner K<sub>M</sub> = große Affinität; unabhängig von [E] und [S].',
        'Mehr Enzym → höheres v<sub>max</sub>, K<sub>M</sub> gleich.',
        'k<sub>cat</sub> = umgesetzte Substratmoleküle pro aktivem Zentrum und Sekunde bei Sättigung.'
      ],
      selfcheck: [
        ['Warum steigt v bei niedriger Substratkonzentration fast linear?', 'Viele aktive Zentren sind frei; jede Erhöhung von [S] erhöht die Wahrscheinlichkeit von Enzym-Substrat-Begegnungen proportional.'],
        ['Warum kann v nicht über v<sub>max</sub> steigen?', 'Alle Enzyme sind gesättigt; es gibt keine freien aktiven Zentren mehr.'],
        ['Welches Enzym in B2 hat die höchste Affinität?', 'Acetylcholinesterase (K<sub>M</sub> = 0,000095 mol/l, kleinster Wert).'],
        ['Was passiert bei halber Enzymkonzentration?', 'v<sub>max</sub> und ½ v<sub>max</sub> halbieren sich, K<sub>M</sub> bleibt gleich.']
      ]
    }
  },

  /* ===================================================================== 9 */
  {
    id: 't9', nr: 9, title: 'Einfluss von Temperatur und pH-Wert auf die Enzymaktivität', pages: '36–37',
    short: 'RGT-Regel, Temperaturoptimum, Denaturierung, thermophile Enzyme, pH-Optimum',
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
<p>Leben gibt es selbst in heißen Quellen mit über 80 °C – aber nur für speziell angepasste Lebewesen wie <b>thermophile Bakterien</b>; andere Bakterien überleben meist nur bis etwa 45 °C. Der Grund liegt in den Enzymen: Ihre Aktivität hängt stark von <b>Temperatur</b> und <b>pH-Wert</b> ab. Beide Faktoren wirken auf zwei Ebenen: auf die <b>Bewegung der Moleküle</b> (wie oft und wie heftig sie zusammenstoßen) und auf die <b>Raumstruktur des Enzyms</b> (ob das aktive Zentrum intakt bleibt).</p>
${BOOK('36–37', '<p>Temperatur und Enzymaktivität (B2), Temperaturabhängigkeit bei Eisfisch, Forelle und Mensch (B3), pH-Abhängigkeit von Pepsin, Speichel-Amylase, Lactase und Trypsin (B4), Enzymdenaturierung bei niedrigem pH-Wert (B5).</p>')}`,
      explain: `
<h3>Einfluss der Temperatur</h3>
<p>Generell erhöht eine Temperaturerhöhung die <b>Reaktionsgeschwindigkeit</b> chemischer Reaktionen: Die Moleküle schwingen stärker und bewegen sich schneller (<b>Brownsche Molekularbewegung</b> nimmt zu), sodass <b>Anzahl und Intensität der Zusammenstöße</b> steigen. Mehr Moleküle verfügen über die nötige <b>Aktivierungsenergie</b>. Als Faustregel gilt die <b>RGT-Regel</b> (Reaktionsgeschwindigkeits-Temperatur-Regel): Bei einer Temperaturerhöhung um 10 °C verdoppelt bis verdreifacht sich die Reaktionsgeschwindigkeit.</p>
<p>Bei enzymkatalysierten Reaktionen gilt die RGT-Regel aber nur bei <b>niedrigen Temperaturen</b> (Bereich I der Kurve). Ab einer bestimmten Temperatur, dem <b>Temperaturoptimum</b>, nimmt die Enzymaktivität <b>rapide ab</b> (Bereich II): Die Schwingungen im Enzymmolekül werden so stark, dass Wechselwirkungen, die die Raumstruktur stabilisieren (H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte), zerstört werden. Die Stabilität des Enzyms nimmt ab, das aktive Zentrum verändert seine Form, das Substrat kann nicht mehr gebunden werden – die Reaktion kommt zum Stillstand. Diese <b>irreversible</b> Veränderung der räumlichen Struktur heißt <b>Denaturierung</b>.</p>
<p><b>Kurvenform:</b> Die Temperaturkurve ist <b>asymmetrisch</b> – langsamer, exponentiell anmutender Anstieg bis zum Optimum, danach steiler Abfall.</p>

<h3>Temperaturoptimum als Angepasstheit</h3>
<p>Das Temperaturoptimum ist <b>enzymspezifisch</b>. Beim Menschen liegt es bei vielen Enzymen um <b>ca. 37 °C</b> – eine Angepasstheit an die Körpertemperatur. Wechselwarme Organismen in kalter Umgebung besitzen Isoenzyme mit gleicher Substrat- und Wirkungsspezifität, aber <b>niedrigeren Temperaturoptima</b> (B3, Enzym Brenztraubensäurekinase: Eisfisch Optimum bei wenigen °C, Forelle um 15 °C, Mensch um 35–37 °C).</p>

<h3>Thermophile Enzyme</h3>
<p>Lebewesen an extremen Standorten wie heißen Quellen besitzen Enzyme mit hoher Stabilität, z. B. die <b>Taq-Polymerase</b> aus dem Bakterium <i>Thermus aquaticus</i>, die noch bei 95 °C aktiv ist. Ihre Raumstruktur wird durch eine hohe Anzahl an <b>Disulfidbrücken und Ionenbindungen</b> stabilisiert. <b>Thermophile Enzyme</b> sind für Forschung und Industrie interessant (z. B. Waschmittelenzyme).</p>

<h3>Einfluss des pH-Werts</h3>
<p>Der <b>pH-Wert</b> ist ein Maß für die Konzentration an Oxonium-Ionen (H<sub>3</sub>O<sup>+</sup>): Je höher diese Konzentration, desto saurer die Lösung (pH &lt; 7). Eine Änderung des pH-Werts kann bewirken, dass <b>ionisierbare Molekülgruppen</b> im aktiven Zentrum ihre <b>Ladung ändern</b> (z. B. –COO<sup>−</sup> nimmt im Sauren ein H<sup>+</sup> auf und wird zu ungeladenem –COOH; –NH<sub>2</sub> wird zu –NH<sub>3</sub><sup>+</sup>). Da die Substratbindung von passenden Ladungen abhängt, verändert sich die Aktivität. Je nachdem, welche Aminosäurereste ein Enzym im aktiven Zentrum besitzt, gibt es einen bestimmten pH-Wert maximaler Aktivität, das <b>pH-Optimum</b>.</p>
<p><b>Extreme pH-Werte</b> führen zur <b>Denaturierung</b>: Wechselwirkungen, die Sekundär- und Tertiärstruktur stabilisieren (v. a. Ionenbindungen und H-Brücken), werden zerstört (B5). Die Raumstruktur kann sich dabei <b>reversibel oder irreversibel</b> verändern.</p>
<div class="table-wrap"><table class="data">
<tr><th>Enzym</th><th>Wirkort</th><th>pH-Optimum (ca.)</th></tr>
<tr><td>Pepsin (Protease)</td><td>Magen</td><td>2</td></tr>
<tr><td>Speichel-Amylase</td><td>Mund (Stärkeabbau)</td><td>7</td></tr>
<tr><td>Lactase</td><td>Dünndarm</td><td>≈ 7 (laut Abb. B4)</td></tr>
<tr><td>Trypsin (Protease)</td><td>Dünndarm</td><td>≈ 8 (laut Abb. B4)</td></tr>
</table></div>
<p>Die pH-Optima zeigen <b>Angepasstheiten an den Wirkort</b>: Die Speichel-Amylase wird im Magen bei pH 1–2 denaturiert und inaktiviert, während Pepsin genau dort optimal arbeitet.</p>
${MISSING('<p>Das Arbeitsblatt zur Lactaseaktivität nennt für Lactase im Dünndarm einen pH-Wert von 8–9, die Buchabbildung B4 (S. 37) zeigt das Optimum bei etwa pH 7. Richte dich in Aufgaben immer nach den dort gegebenen Materialien.</p>')}
${EXTRA('<p>Niedrige Temperaturen <b>denaturieren</b> Enzyme in der Regel nicht – die Moleküle bewegen sich nur langsamer, die Aktivität ist gering, steigt beim Erwärmen aber wieder an (reversibel). Hitze-Denaturierung ist dagegen meist irreversibel.</p>')}`,
      termdefs: [
        ['RGT-Regel', 'Reaktionsgeschwindigkeits-Temperatur-Regel: +10 °C → 2- bis 3-fache Reaktionsgeschwindigkeit; bei Enzymen nur unterhalb des Optimums.'],
        ['Temperaturoptimum', 'Temperatur maximaler Enzymaktivität; enzymspezifisch (Mensch oft ≈ 37 °C).'],
        ['Denaturierung', 'Veränderung der Raumstruktur eines Proteins durch Zerstörung stabilisierender Wechselwirkungen (Hitze, extreme pH-Werte); Enzym verliert Aktivität; bei Hitze meist irreversibel.'],
        ['thermophile Enzyme', 'Hitzestabile Enzyme wärmeliebender Organismen (z. B. Taq-Polymerase, aktiv bei 95 °C); stabilisiert durch viele Disulfidbrücken und Ionenbindungen.'],
        ['pH-Wert', 'Maß für die Oxonium-Ionen-Konzentration; pH < 7 sauer, pH > 7 basisch.'],
        ['pH-Optimum', 'pH-Wert maximaler Enzymaktivität; abhängig von den ionisierbaren Resten im aktiven Zentrum.'],
        ['Brownsche Molekularbewegung', 'Ungerichtete Wärmebewegung der Teilchen; nimmt mit der Temperatur zu → mehr und heftigere Zusammenstöße.'],
        ['Aktivierungsenergie', 'Energie, die Moleküle zum Reagieren benötigen; bei höherer Temperatur besitzen mehr Moleküle diese Energie.'],
        ['Isoenzyme (Temperatur)', 'Enzyme gleicher Funktion mit unterschiedlichen Temperaturoptima (Angepasstheit an den Lebensraum).']
      ],
      mechanism: `
<h3>Temperatur- und pH-Kurven beschreiben und auswerten</h3>
<ol class="steps">
  <li><b>Achsen benennen:</b> x = Temperatur (°C) bzw. pH-Wert; y = Enzymaktivität bzw. Reaktionsgeschwindigkeit (rel. Einheiten).</li>
  <li><b>Verlauf beschreiben</b> (ohne Erklärung): „Mit steigender Temperatur nimmt die Aktivität zunächst langsam, dann immer stärker zu, erreicht bei ca. 40 °C ein Maximum und fällt danach steil ab; bei 50 °C ist sie null.“</li>
  <li><b>Kennwerte ablesen:</b> Optimum (x-Wert des Maximums), Bereich der Aktivität, ggf. Steigung (RGT überprüfen: Verdopplung pro 10 °C?).</li>
  <li><b>Molekular erklären:</b> Anstieg = mehr Bewegung, mehr Zusammenstöße, mehr Moleküle mit Aktivierungsenergie; Abfall = Denaturierung (Wechselwirkungen gelöst, aktives Zentrum verformt). pH: Ladungsänderung der Reste im aktiven Zentrum; Extremwerte → Denaturierung.</li>
  <li><b>Vergleichen/Deuten:</b> unterschiedliche Optima als Angepasstheit an Lebensraum bzw. Wirkort.</li>
</ol>
${fig('tempph', 'Interaktiv: Temperatur- und pH-Abhängigkeit der Enzymaktivität')}`,
      connections: `
<p><b>Zwei gegenläufige Effekte erklären die Temperaturkurve:</b> (1) Mehr Molekülbewegung → mehr erfolgreiche Enzym-Substrat-Begegnungen (Thema 8) → steigende Aktivität. (2) Mehr Schwingungen im Enzym → Wechselwirkungen der Tertiärstruktur (Thema 2) brechen → immer mehr Enzymmoleküle denaturieren. Unterhalb des Optimums überwiegt Effekt 1, oberhalb Effekt 2.</p>
<p><b>pH und Ladungen:</b> Im aktiven Zentrum binden Substrate u. a. über Ionenbindungen (Thema 6). Ändert sich die Ladung eines Restes, fehlt dieser „Haltepunkt“ – das gleiche Prinzip wie bei der Freisetzung von Eisen aus Transferrin bei pH 5,5 (Thema 5).</p>
${CLASS('<p>Arbeitsblatt „Einfluss von pH-Wert und Temperatur auf die Lactaseaktivität“ (GOD-Test): a (ohne Lactase) = 0 → Blindprobe/Kontrolle; b (pH 8, 37 °C) = hoher Glucosewert; c (87 °C) = 0, da denaturiert; d (17 °C) = geringer Wert (langsamere Molekülbewegung, RGT); e (pH 1) = 0, da denaturiert. Deine Einträge (0 / 5 / 0 / 1–3 / 0) sind fachlich stimmig.</p>')}`,
      figures: [['tempph', 'Temperatur- und pH-Abhängigkeit']],
      exam: [
        'Temperaturkurve zeichnen (asymmetrisch!) und Bereiche I (RGT) und II (Denaturierung) molekular erklären.',
        'RGT-Regel nennen und an Messwerten prüfen.',
        'Temperaturoptimum, pH-Optimum und Denaturierung definieren und erläutern.',
        'Temperaturkurven verschiedener Organismen (Eisfisch, Forelle, Mensch) als Angepasstheit deuten.',
        'pH-Kurven (Pepsin vs. Trypsin, Speichel-Amylase) vergleichen und mit dem Wirkort begründen.',
        'pH-Effekt molekular erklären: Ladungsänderung ionisierbarer Gruppen im aktiven Zentrum; Denaturierung bei Extremwerten.',
        'Thermophile Enzyme: Stabilität durch Disulfidbrücken und Ionenbindungen begründen.'
      ],
      errors: [
        ['Bei niedriger Temperatur werden Enzyme denaturiert.', 'Bei Kälte sind sie nur langsamer (weniger Bewegung). Denaturierung entsteht durch Hitze oder extreme pH-Werte.'],
        ['Die RGT-Regel gilt für die ganze Enzymkurve.', 'Nur unterhalb des Temperaturoptimums.'],
        ['Denaturierung = Spaltung des Enzyms in Aminosäuren.', 'Nur die Raumstruktur wird zerstört; die Peptidbindungen (Primärstruktur) bleiben erhalten.'],
        ['Alle Enzyme haben ihr Optimum bei 37 °C bzw. pH 7.', 'Optima sind enzymspezifisch (z. B. Pepsin pH 2, Taq-Polymerase sehr hohe Temperatur).'],
        ['Temperatur- und pH-Kurve sehen gleich aus.', 'Die Temperaturkurve ist asymmetrisch (steiler Abfall), pH-Kurven sind meist glockenförmig.']
      ],
      summary: [
        'Wärme → mehr Bewegung → mehr/heftigere Zusammenstöße → mehr Moleküle mit Aktivierungsenergie (RGT: +10 °C → ×2–3).',
        'Oberhalb des Temperaturoptimums: Wechselwirkungen brechen → Denaturierung (irreversibel) → steiler Abfall.',
        'Optima sind enzymspezifisch und Angepasstheiten (Mensch ≈ 37 °C; Eisfisch niedrig; thermophile Enzyme hoch).',
        'pH verändert Ladungen im aktiven Zentrum → pH-Optimum (Pepsin 2, Amylase 7, Trypsin ≈ 8).',
        'Extreme pH-Werte → Denaturierung (reversibel oder irreversibel).'
      ],
      selfcheck: [
        ['Warum fällt die Temperaturkurve oberhalb des Optimums steil ab?', 'Starke Molekülschwingungen zerstören die Wechselwirkungen der Raumstruktur → aktives Zentrum verformt → Denaturierung, kein Substrat wird mehr gebunden.'],
        ['Warum ist die Taq-Polymerase hitzestabil?', 'Ihre Raumstruktur ist durch viele Disulfidbrücken und Ionenbindungen stabilisiert.'],
        ['Warum arbeitet Speichel-Amylase im Magen nicht?', 'Bei pH 1–2 wird sie denaturiert; ihr Optimum liegt bei pH 7.'],
        ['Wie wirkt ein veränderter pH-Wert auf das aktive Zentrum?', 'Ionisierbare Gruppen ändern ihre Ladung → Substratbindung verändert; bei Extremen Denaturierung.']
      ]
    }
  },

  /* ===================================================================== 10 */
  {
    id: 't10', nr: 10, title: 'Hemmung enzymkatalysierter Reaktionen', pages: '40–41',
    short: 'Kompetitive / nicht-kompetitive (allosterische) Hemmung, reversibel vs. irreversibel',
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
<p>Enzyme können auf verschiedene Weise <b>gehemmt</b> werden. Man unterscheidet grundsätzlich <b>umkehrbare (reversible)</b> und <b>endgültige (irreversible)</b> Hemmung – und danach, <b>an welcher Stelle</b> des Enzyms der Hemmstoff (<b>Inhibitor</b>) bindet. Hemmung ist nicht nur „Störung“: Der Körper nutzt sie, um die Geschwindigkeit von Stoffwechselreaktionen zu regulieren, und die Medizin nutzt sie für Arzneimittel (Gicht, Antibiotika, Krebs). Umgekehrt erklären irreversible Hemmungen die Giftigkeit von Schwermetallen.</p>
${BOOK('40–41', '<p>Reaktionsgeschwindigkeit und kompetitive Hemmung (B1), Modell der kompetitiven Hemmung (B2), Modell der nicht-kompetitiven Hemmung (B3), Reaktionsgeschwindigkeit und nicht-kompetitive Hemmung (B4).</p>')}
${BOOK('44', '<p>Regulation durch allosterische Enzyme (allosterisches Zentrum, Aktivator/Inhibitor, Kooperativität, sigmoider Kurvenverlauf). Die Checkliste nennt „nicht-kompetitive / allosterische Hemmung“ gemeinsam.</p>')}`,
      explain: `
<h3>Kompetitive Hemmung</h3>
<p>Ähneln sich die chemischen Strukturen von Inhibitor und Substrat, <b>konkurrieren</b> beide um die Bindung an das <b>aktive Zentrum</b>. Solange ein Inhibitor gebunden ist, kann kein <b>Enzym-Substrat-Komplex</b> entstehen – dieses Enzymmolekül fällt vorübergehend aus. Der Inhibitor bindet <b>reversibel</b> und löst sich wieder.</p>
<ul>
  <li>Bei gleicher Substratkonzentration ist die Reaktion <b>langsamer</b>, weil insgesamt weniger aktive Zentren für das Substrat verfügbar sind.</li>
  <li><b>Erhöht man die Substratkonzentration</b> bei gleichbleibender Inhibitorkonzentration, steigt die Wahrscheinlichkeit, dass ein Substrat statt eines Inhibitors bindet; der reversibel gebundene Inhibitor wird verdrängt. Bei sehr hoher Substratkonzentration wird deshalb <b>v<sub>max</sub> trotzdem erreicht</b>.</li>
  <li><b>K<sub>M</sub> steigt:</b> Die Enzym-Substrat-Affinität ist in Anwesenheit des Inhibitors scheinbar geringer – man braucht mehr Substrat, um ½ v<sub>max</sub> zu erreichen.</li>
</ul>
<p><b>Beispiele:</b> <i>Gicht</i> – Harnsäurekristalle lagern sich in Gelenken ab. Harnsäure entsteht beim Abbau von Hypoxanthin durch das Enzym <b>Xanthinoxidase</b>. Das Medikament <b>Allopurinol</b> ähnelt strukturell dem Hypoxanthin, besetzt das aktive Zentrum und senkt so die Harnsäurebildung. <i>Sulfonamide</i> (Antibiotika) binden am aktiven Zentrum eines bakteriellen Enzyms → das eigentliche Substrat wird nicht umgesetzt, die Synthese nötiger Stoffe und damit das Bakterienwachstum unterbleibt.</p>

<h3>Nicht-kompetitive Hemmung</h3>
<p>Manche Inhibitoren sind dem Substrat <b>nicht ähnlich</b> und binden <b>außerhalb des aktiven Zentrums</b>. Dadurch verändert sich die <b>Raumstruktur</b> des Enzyms (auch die des aktiven Zentrums) – das Enzym ist inaktiviert. In manchen Fällen kann das Substrat noch binden, wird aber nicht umgesetzt. Da Substrat und Inhibitor <b>nicht um dieselbe Stelle konkurrieren</b>, heißt die Hemmung nicht-kompetitiv. Sie ist ebenfalls <b>reversibel</b>.</p>
<ul>
  <li><b>v<sub>max</sub> sinkt:</b> Ein Teil der Enzyme ist unabhängig von der Substratkonzentration funktionslos. Auch eine Erhöhung der Substratkonzentration kann das v<sub>max</sub> des ungehemmten Enzyms nicht erreichen.</li>
  <li><b>K<sub>M</sub> bleibt gleich:</b> Der Inhibitor senkt nur die Konzentration aktiver Enzyme; die Affinität der verbleibenden aktiven Enzyme zum Substrat ändert sich nicht.</li>
</ul>
<p><b>Medizin:</b> Bei bestimmten Leukämieformen spielen <b>Tyrosinkinasen</b> eine Rolle: Sie übertragen eine Phosphatgruppe von ATP auf den Tyrosinrest eines Proteins und setzen eine Signalkette in Gang, die zu fortwährender Zellteilung führt. Synthetische, passende Moleküle hemmen diese Enzyme nicht-kompetitiv.</p>

<h3>Allosterische Hemmung</h3>
<p>Das Buch beschreibt auf S. 44 <b>allosterische Enzyme</b>: Sie bestehen meist aus mehreren Untereinheiten. Jede Untereinheit besitzt neben dem aktiven Zentrum ein räumlich davon getrenntes <b>allosterisches Zentrum</b> (griech. <i>allos</i> = anders, <i>stereos</i> = räumlich) als Bindungsstelle für einen <b>Aktivator</b> oder <b>Inhibitor</b>. Das Enzym kann in einer aktiven und einer inaktiven Form vorliegen; ein Inhibitor am allosterischen Zentrum stabilisiert die <b>inaktive Form</b>, ein Aktivator (oder das Substrat) die aktive. Wegen der engen Verbindung der Untereinheiten ändern sie ihre Struktur gemeinsam (<b>Kooperativität</b>) – daraus ergibt sich ein <b>s-förmiger (sigmoider)</b> Kurvenverlauf statt der Hyperbel.</p>
${MISSING('<p>Die Checkliste fasst „nicht-kompetitive / allosterische Hemmung“ zusammen: Beide Male bindet der Inhibitor <b>außerhalb</b> des aktiven Zentrums und verändert die Raumstruktur. Das Buch behandelt sie auf verschiedenen Seiten (S. 40–41 bzw. S. 44, nicht auf der Checkliste). Für die Klausur gilt: Das Wirkprinzip (Bindung an anderer Stelle → Strukturänderung → v<sub>max</sub> sinkt, keine Konkurrenz) ist bei beiden gleich.</p>')}

<h3>Irreversible Hemmung</h3>
<p>Bei der <b>irreversiblen Hemmung</b> bindet das Inhibitormolekül <b>dauerhaft</b> an das aktive Zentrum und verhindert so die Bildung des Enzym-Substrat-Komplexes. Das Enzym ist dauerhaft funktionslos.</p>
<ul>
  <li><b>Penicillin</b> bindet irreversibel an das aktive Zentrum eines bakteriellen Enzyms, das die Zellwandbildung katalysiert → Bakterium kann sich nicht mehr teilen.</li>
  <li><b>Schwermetall-Ionen</b> (Blei, Quecksilber) binden an Thiol-Gruppen (–SH) von Enzymen und lösen sich wegen ihrer hohen Affinität nicht wieder → irreversibel. Liegt die SH-Gruppe im aktiven Zentrum, ist das Enzym dauerhaft funktionslos. Deshalb sollen z. B. alte Wasserleitungsrohre aus Blei ausgetauscht werden.</li>
</ul>

<h3>Bedeutung für die Regulation</h3>
<p>Reversible Hemmung erlaubt es, die Aktivität von Enzymen <b>je nach Bedarf zu drosseln und wieder freizugeben</b> – ohne das Enzym abzubauen. Zentrale Reaktionen von Stoffwechselwegen werden häufig über allosterische Enzyme reguliert (S. 44): Effektoren (Aktivatoren, Inhibitoren) schalten die Aktivität „an“ oder „aus“. Irreversible Hemmung eignet sich dagegen nicht zur Regulation, sondern schaltet Enzyme dauerhaft aus – das nutzt man bei Antibiotika, es ist aber auch die Ursache von Vergiftungen.</p>
${EXTRA('<p>Ein typisches Regulationsprinzip ist die <b>Endprodukthemmung</b> (negative Rückkopplung): Das Endprodukt eines Stoffwechselweges hemmt allosterisch das erste Enzym des Weges. Ist genug Produkt vorhanden, wird die Produktion gedrosselt; sinkt die Konzentration, löst sich der Inhibitor und die Produktion läuft wieder an. Irreversible Inhibitoren binden meist kovalent.</p>')}`,
      termdefs: [
        ['Inhibitor', 'Hemmstoff, der an ein Enzym bindet und dessen Aktivität verringert.'],
        ['reversibel', 'Umkehrbar: Der Inhibitor bindet nur vorübergehend und löst sich wieder; das Enzym wird wieder funktionsfähig.'],
        ['irreversible Hemmung', 'Inhibitor bindet dauerhaft (meist am aktiven Zentrum) → Enzym dauerhaft funktionslos (z. B. Penicillin, Blei).'],
        ['Kompetitive Hemmung', 'Substratähnlicher Inhibitor konkurriert reversibel mit dem Substrat um das aktive Zentrum; vmax gleich, KM steigt.'],
        ['Nicht-kompetitive Hemmung', 'Inhibitor (nicht substratähnlich) bindet außerhalb des aktiven Zentrums und verändert die Raumstruktur; vmax sinkt, KM gleich.'],
        ['Allosterische Hemmung', 'Inhibitor bindet am allosterischen Zentrum (getrennt vom aktiven Zentrum) und stabilisiert die inaktive Form des Enzyms.'],
        ['Allosterisches Zentrum', 'Vom aktiven Zentrum räumlich getrennte Bindungsstelle für Aktivatoren oder Inhibitoren.'],
        ['Kooperativität', 'Strukturänderung einer Untereinheit bewirkt gleichartige Änderungen in den anderen Untereinheiten (allosterische Enzyme; sigmoide Kurve).'],
        ['vmax (bei Hemmung)', 'Kompetitiv: unverändert (bei hoher [S] erreichbar). Nicht-kompetitiv: verringert.'],
        ['KM-Wert (bei Hemmung)', 'Kompetitiv: erhöht (scheinbar geringere Affinität). Nicht-kompetitiv: unverändert.'],
        ['Enzym-Substrat-Komplex', 'Wird bei kompetitiver Hemmung verhindert, solange der Inhibitor das aktive Zentrum besetzt.']
      ],
      mechanism: `
<h3>Vergleich auf einen Blick</h3>
<div class="table-wrap"><table class="data">
<tr><th></th><th>kompetitiv</th><th>nicht-kompetitiv / allosterisch</th></tr>
<tr><td><b>Inhibitor</b></td><td>dem Substrat strukturell ähnlich</td><td>dem Substrat <b>nicht</b> ähnlich</td></tr>
<tr><td><b>Bindungsstelle</b></td><td>aktives Zentrum</td><td>außerhalb des aktiven Zentrums (andere/allosterische Bindungsstelle)</td></tr>
<tr><td><b>Konkurrenz mit Substrat</b></td><td>ja</td><td>nein</td></tr>
<tr><td><b>Wirkung aufs Enzym</b></td><td>Struktur unverändert; aktives Zentrum blockiert</td><td>Raumstruktur (inkl. aktivem Zentrum) verändert → inaktiv</td></tr>
<tr><td><b>Mehr Substrat …</b></td><td>verdrängt Inhibitor, hebt Hemmung auf</td><td>hebt Hemmung nicht auf</td></tr>
<tr><td><b>v<sub>max</sub></b></td><td>unverändert (erst bei höherer [S] erreicht)</td><td>verringert</td></tr>
<tr><td><b>K<sub>M</sub></b></td><td>erhöht</td><td>unverändert</td></tr>
<tr><td><b>Reversibel?</b></td><td>ja</td><td>ja</td></tr>
<tr><td><b>Beispiel</b></td><td>Allopurinol (Gicht), Sulfonamide</td><td>Tyrosinkinase-Hemmer (Leukämie)</td></tr>
</table></div>

<h3>Diagramme skizzieren</h3>
<ol class="steps">
  <li>Ungehemmte Michaelis-Menten-Kurve zeichnen, v<sub>max</sub>, ½ v<sub>max</sub>, K<sub>M</sub> markieren.</li>
  <li><b>Kompetitiv:</b> zweite Kurve flacher ansteigend, rechts von der ersten, nähert sich <b>derselben</b> v<sub>max</sub>-Linie. ½ v<sub>max</sub> auf gleicher Höhe → K<sub>M</sub> (gehemmt) liegt <b>weiter rechts</b>.</li>
  <li><b>Nicht-kompetitiv:</b> zweite Kurve nähert sich einer <b>niedrigeren</b> v<sub>max</sub>. Eigenes ½ v<sub>max</sub> (halbe Höhe der <i>neuen</i> v<sub>max</sub>!) einzeichnen → K<sub>M</sub> liegt an <b>derselben</b> Stelle.</li>
  <li>Legende: „ohne Inhibitor“ / „mit Inhibitor (kompetitiv bzw. nicht-kompetitiv)“.</li>
</ol>
${fig('inhibition', 'Interaktiv: Kompetitive und nicht-kompetitive Hemmung – Modell und Diagramm')}`,
      connections: `
<p><b>Warum ändert sich bei der kompetitiven Hemmung K<sub>M</sub>, aber nicht v<sub>max</sub>?</b> Weil beide Moleküle um dasselbe aktive Zentrum konkurrieren, hängt der Ausgang vom Mengenverhältnis ab (Wahrscheinlichkeit der Begegnung, Thema 8). Viel Substrat „gewinnt“ → alle Enzyme arbeiten wieder → v<sub>max</sub>. Bei mittlerer Substratkonzentration „stört“ der Inhibitor → mehr Substrat nötig für ½ v<sub>max</sub> → K<sub>M</sub> ↑.</p>
<p><b>Warum ändert sich bei der nicht-kompetitiven Hemmung v<sub>max</sub>, aber nicht K<sub>M</sub>?</b> Gehemmte Enzyme sind „aus dem Spiel“, egal wie viel Substrat da ist – wie weniger Enzym (vgl. B3 S. 33: halbe Enzymmenge → halbes v<sub>max</sub>, gleiches K<sub>M</sub>). Die übrigen Enzyme sind unverändert, also gleiche Affinität.</p>
<p><b>Struktur-Funktion:</b> Nicht-kompetitive und allosterische Hemmung funktionieren nur, weil eine Bindung an einer Stelle die gesamte Raumstruktur eines Proteins verändern kann (Thema 2, Induced-Fit-Gedanke Thema 7).</p>`,
      figures: [['inhibition', 'Enzymhemmung']],
      exam: [
        'Beide Hemmtypen in einer Tabelle vergleichen (Inhibitorstruktur, Bindungsstelle, Konkurrenz, Wirkung von mehr Substrat, v<sub>max</sub>, K<sub>M</sub>).',
        'Modelle zeichnen: Enzym mit aktivem Zentrum + Substrat + Inhibitor (im aktiven Zentrum bzw. an anderer Bindungsstelle).',
        'v-c-Diagramme mit und ohne Inhibitor skizzieren; ½ v<sub>max</sub> und K<sub>M</sub> für jede Kurve korrekt einzeichnen.',
        'Änderungen von v<sub>max</sub> und K<sub>M</sub> molekular begründen.',
        'Reversible und irreversible Hemmung unterscheiden; Beispiele (Penicillin, Blei/Quecksilber) erklären.',
        'Medizinische Beispiele erklären: Gicht/Allopurinol, Sulfonamide, Tyrosinkinase-Hemmer; Stellung zu Bleirohren nehmen.',
        'Bedeutung der Hemmung für die Regulation (allosterische Enzyme, An-/Ausschalten) erläutern.'
      ],
      errors: [
        ['Der nicht-kompetitive Inhibitor passt zum aktiven Zentrum / ähnelt dem Substrat (aus deiner Vergleichstabelle).', 'Falsch: Er ist dem Substrat nicht ähnlich und bindet außerhalb des aktiven Zentrums an einer anderen Bindungsstelle.'],
        ['„Mehr Substrat ⇒ höherer K<sub>M</sub>“ (aus deiner Skizze).', 'Der K<sub>M</sub> steigt wegen des Inhibitors. Mehr Substrat verdrängt den Inhibitor und hebt die Hemmung auf; K<sub>M</sub> ist die Substratkonzentration, bei der ½ v<sub>max</sub> erreicht wird.'],
        ['Kompetitive Hemmung senkt v<sub>max</sub>.', 'v<sub>max</sub> bleibt gleich, wird aber erst bei höherer Substratkonzentration erreicht.'],
        ['Nicht-kompetitive Hemmung erhöht K<sub>M</sub>.', 'K<sub>M</sub> bleibt gleich; nur v<sub>max</sub> sinkt.'],
        ['Bei nicht-kompetitiver Hemmung wird ½ v<sub>max</sub> der ungehemmten Kurve verwendet.', 'Für jede Kurve die eigene halbe Maximalgeschwindigkeit einzeichnen.'],
        ['Irreversibel = nicht-kompetitiv.', 'Die nicht-kompetitive Hemmung ist (laut Buch) reversibel; irreversibel bedeutet dauerhafte Bindung (z. B. Penicillin am aktiven Zentrum).']
      ],
      summary: [
        'Kompetitiv: substratähnlicher Inhibitor im aktiven Zentrum, Konkurrenz, reversibel → v<sub>max</sub> gleich, K<sub>M</sub> ↑.',
        'Nicht-kompetitiv/allosterisch: Inhibitor außerhalb des aktiven Zentrums, Strukturänderung → v<sub>max</sub> ↓, K<sub>M</sub> gleich.',
        'Irreversibel: dauerhafte Bindung (Penicillin, Schwermetalle an SH-Gruppen).',
        'Mehr Substrat hebt nur die kompetitive Hemmung auf.',
        'Reversible/allosterische Hemmung ermöglicht Regulation (An-/Ausschalten nach Bedarf).'
      ],
      selfcheck: [
        ['Warum wird bei kompetitiver Hemmung v<sub>max</sub> trotzdem erreicht?', 'Bei sehr hoher Substratkonzentration verdrängt das Substrat den reversibel gebundenen Inhibitor; alle Enzyme arbeiten wieder.'],
        ['Warum bleibt K<sub>M</sub> bei nicht-kompetitiver Hemmung gleich?', 'Der Inhibitor verringert nur die Zahl aktiver Enzyme; die Affinität der verbleibenden Enzyme zum Substrat ist unverändert.'],
        ['Wie wirkt Allopurinol bei Gicht?', 'Es ähnelt Hypoxanthin, hemmt die Xanthinoxidase kompetitiv → weniger Harnsäure → weniger Kristalle.'],
        ['Warum sind Bleirohre problematisch?', 'Blei-Ionen binden irreversibel an SH-Gruppen von Enzymen → Enzyme dauerhaft funktionslos → Vergiftung.']
      ]
    }
  }
  ];

  BIO.topicById = Object.fromEntries(BIO.topics.map(t => [t.id, t]));
  BIO.goalById = {};
  BIO.topics.forEach(t => t.goals.forEach(g => { BIO.goalById[g.id] = Object.assign({ topic: t.id }, g); }));
})();
