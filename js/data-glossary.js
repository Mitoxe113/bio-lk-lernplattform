/* =========================================================================
   Lexikon: Fachbegriffe der Checkliste (★) und wichtige Zusatzbegriffe
   ========================================================================= */
(function () {
  window.BIO = window.BIO || {};
  const G = [];
  const g = (term, topic, def, expl, ex, check) => G.push({ term, topic, def, expl, ex, check: !!check });

  // Thema 1
  g('Peptid', 't1', 'Kette aus weniger als ca. 100 über Peptidbindungen verknüpften Aminosäuren.', 'Längere Ketten (meist 100–600 Aminosäuren) heißen Proteine. Ein Dipeptid besteht aus zwei Aminosäuren.', 'Dipeptid Cys–Gly aus dem Unterricht.', true);
  g('Aminogruppe', 't1', 'Funktionelle Gruppe –NH₂.', 'Sitzt bei α-Aminosäuren am α-C-Atom; reagiert bei der Peptidbindung mit der Carboxylgruppe einer anderen Aminosäure. Am Kettenanfang (N-Ende) bleibt sie frei.', 'H₂N– in Glycin (H₂N–CH₂–COOH).', true);
  g('Carboxylgruppe', 't1', 'Funktionelle Gruppe –COOH (im Buch: Carboxygruppe).', 'Bei der Peptidbindung wird ihre OH-Gruppe als Teil eines Wassermoleküls abgespalten. Am Kettenende (C-Ende) bleibt sie frei.', '–COOH in jeder Aminosäure.', true);
  g('Peptidbindung', 't1', 'Kovalente C–N-Bindung zwischen der Carboxylgruppe einer und der Aminogruppe der nächsten Aminosäure.', 'Entsteht durch eine Kondensationsreaktion (H₂O wird abgespalten). C=O und N–H bilden zusammen die Peptidgruppe.', 'Gly + Ala → Gly–Ala + H₂O.', true);
  g('Grundstruktur der Aminosäuren', 't1', 'Bei allen Aminosäuren gleicher Bau: α-C-Atom mit Aminogruppe, Carboxylgruppe und H-Atom.', 'Nur der vierte Bindungspartner, der Rest R, unterscheidet die 20 Aminosäuren.', 'H₂N–CH(R)–COOH.', true);
  g('α-Aminosäure', 't1', 'Aminosäure, bei der Amino- und Carboxylgruppe am selben C-Atom (α-C-Atom) sitzen.', 'In Proteinen kommen nur α-Aminosäuren vor.', 'Alle 20 proteinogenen Aminosäuren.');
  g('α-C-Atom', 't1', 'Zentrales C-Atom einer α-Aminosäure.', 'Trägt vier verschiedene Bindungspartner: Aminogruppe, Carboxylgruppe, H-Atom, Rest R.', '—');
  g('Rest (Seitenkette)', 't1', 'Variabler Teil einer Aminosäure (R).', 'Unterscheidet die 20 Aminosäuren; kann hydrophil oder hydrophob, sauer oder basisch sein. Die Reste bestimmen die Tertiärstruktur.', 'Glycin: H; Cystein: –CH₂–SH.');
  g('Kondensationsreaktion', 't1', 'Verknüpfung zweier Moleküle unter Abspaltung von Wasser.', 'Gegenreaktion ist die Hydrolyse (Spaltung unter Wasseraufnahme).', 'Bildung der Peptidbindung; Veresterung bei Fetten.');
  g('Peptidgruppe', 't1', 'Atomgruppe –CO–NH– an der Peptidbindung.', 'Ihre C=O- und N–H-Gruppen bilden die Wasserstoffbrücken der Sekundärstruktur.', '—');
  g('Hydrolyse', 't6', 'Spaltung einer Bindung unter Anlagerung von Wasser.', 'Umkehrung der Kondensation; viele Verdauungsenzyme katalysieren Hydrolysen.', 'Lactose + H₂O → Glucose + Galactose (Lactase).');

  // Thema 2
  g('Primärstruktur', 't2', 'Aminosäuresequenz eines Proteins.', 'Verknüpfung durch Peptidbindungen; von ihr hängen alle höheren Strukturebenen ab. Gelesen vom N- zum C-Ende.', 'Gly–Cys–Ala–…', true);
  g('Sekundärstruktur', 't2', 'Regelmäßige räumliche Anordnung der Kette durch H-Brücken zwischen Peptidgruppen.', 'Die Reste sind nicht beteiligt. Zwei Formen: α-Helix und β-Faltblatt.', 'Helices in Keratin (Ergänzung).', true);
  g('α-Helix', 't2', 'Schraubenförmige Sekundärstruktur.', 'H-Brücken zwischen Peptidgruppen übereinanderliegender Windungen; die Reste zeigen nach außen.', '—', true);
  g('β-Faltblatt', 't2', 'Sekundärstruktur aus zickzackförmig gefalteten, nebeneinanderliegenden Kettenabschnitten.', 'H-Brücken zwischen benachbarten Abschnitten; Reste zeigen abwechselnd nach oben und unten.', 'Seide (Ergänzung).', true);
  g('Tertiärstruktur', 't2', 'Dreidimensionale Gesamtfaltung einer Polypeptidkette.', 'Entsteht durch Wechselwirkungen zwischen den Resten: H-Brücken, Ionenbindungen, Van-der-Waals-Kräfte, Disulfidbrücken.', 'Form des aktiven Zentrums eines Enzyms.', true);
  g('Quartärstruktur', 't2', 'Räumliche Anordnung mehrerer Polypeptidketten zu einem Protein.', 'Zusammengehalten durch dieselben Wechselwirkungen wie die Tertiärstruktur.', 'Hämoglobin: 4 Ketten mit je einer Häm-Gruppe.', true);
  g('Wasserstoffbrückenbindung', 't2', 'Anziehung zwischen einem partiell positiven H-Atom (an N oder O) und einem partiell negativen O- oder N-Atom.', 'Schwache, aber zahlreiche Wechselwirkung; bildet Sekundärstruktur (Peptidgruppen) und trägt zur Tertiärstruktur bei (Reste).', 'C=O ··· H–N in der α-Helix.', true);
  g('Kovalente Bindung', 't2', 'Atombindung durch gemeinsames Elektronenpaar.', 'Stabil; im Protein: Peptidbindungen (Primärstruktur) und Disulfidbrücken (Tertiär-/Quartärstruktur).', 'C–N der Peptidbindung.', true);
  g('Disulfidbrücke', 't2', 'Kovalente –S–S–-Bindung zwischen den Thiolgruppen zweier Cystein-Reste.', 'Stabilisiert die Raumstruktur besonders stark – thermophile Enzyme haben viele.', 'Taq-Polymerase.', true);
  g('Ionenbindung', 't2', 'Anziehung zwischen entgegengesetzt geladenen Resten.', 'Zwischen sauren (–COO⁻) und basischen (–NH₃⁺) Resten; empfindlich gegenüber pH-Änderungen.', '—');
  g('Van-der-Waals-Kräfte', 't2', 'Schwache Anziehungskräfte zwischen unpolaren Molekülteilen.', 'Halten hydrophobe Reste im Proteininneren zusammen.', 'Phenylalanin-Reste.');
  g('Hämoglobin', 't2', 'Sauerstofftransportierendes Protein der roten Blutzellen.', 'Beispiel einer Quartärstruktur: 4 Proteinketten mit je einer Häm-Gruppe, die O₂ bindet.', '—');

  // Thema 3
  g('Lipide', 't3', 'Hydrophobe Stoffe, gut löslich in unpolaren Lösungsmitteln, kaum in Wasser.', 'Dazu gehören Fette, Phospholipide und Cholesterin.', 'Fett, Lecithin.', true);
  g('Fettmolekül', 't3', 'Ester aus Glycerin und drei Fettsäuren.', 'Entsteht durch Veresterung (3 H₂O werden frei); Energiespeicher und Kälteschutz.', 'Speckschicht von Robben.', true);
  g('Fettsäuren', 't3', 'Langkettige Carbonsäuren.', 'Gesättigt: ohne C=C-Doppelbindungen; ungesättigt: mit Doppelbindungen (bei Raumtemperatur flüssig).', 'Stearinsäure (gesättigt), Ölsäure (ungesättigt).', true);
  g('Phospholipide', 't3', 'Lipide mit hydrophilem Kopf (Phosphatgruppe + z. B. Cholin) und zwei hydrophoben Fettsäure-Schwänzen.', 'Hauptbausteine von Biomembranen; bilden in Wasser Filme, Micellen oder Doppelschichten.', 'Lecithin.', true);
  g('Lipiddoppelschicht', 't3', 'Zwei Phospholipidschichten mit nach innen gerichteten Schwänzen.', 'Grundgerüst jeder Biomembran; Barriere für Ionen und größere polare Teilchen.', '—');
  g('Micelle', 't3', 'Kugelförmige Lipidanordnung in Wasser: Köpfe außen, Schwänze innen.', 'Entsteht z. B. beim Schütteln von Phospholipiden in Wasser.', '—');
  g('Biomembran', 't3', 'Hülle von Zellen und Organellen aus Lipiddoppelschicht, Proteinen und Kohlenhydraten.', 'Trennt Reaktionsräume (Kompartimentierung) und kontrolliert den Stoffaustausch.', 'Zellmembran.', true);
  g('Integrale Proteine', 't3', 'In die Lipiddoppelschicht eingelagerte, oft durchspannende Membranproteine.', 'Hydrophober Mittelteil im Membraninneren; Funktion z. B. als Kanal, Carrier oder Rezeptor.', 'Aquaporin, Na⁺-K⁺-Pumpe.', true);
  g('Periphere Proteine', 't3', 'Der Membran angelagerte Proteine.', 'An Phospholipide oder integrale Proteine gebunden; durchspannen die Membran nicht.', '—', true);
  g('Zytoskelett', 't3', 'Netz aus Proteinfilamenten im Cytoplasma.', 'An der Membraninnenseite stabilisiert es Membran und Zellform, verankert Proteine und begrenzt ihre Beweglichkeit (Fence-Modell).', '—', true);
  g('Kohlenhydrate (Membran)', 't3', 'Kohlenhydratketten auf der Außenseite der Membran, gebunden an Proteine oder Lipide.', 'Bilden die Glykokalyx, die der Zellerkennung dient.', 'Glykoproteine, Glykolipide.', true);
  g('Glykokalyx', 't3', 'Kohlenhydratmantel auf der Außenseite der Zellmembran.', 'Dient der Erkennung von Zellen.', '—');
  g('Cholesterin', 't3', 'Lipid zwischen den Phospholipiden tierischer Membranen (bis 25 %).', 'Verhindert, dass die Membran bei Kälte zu unbeweglich wird.', '—');
  g('Flüssig-Mosaik-Modell', 't3', 'Membranmodell von Singer und Nicolson (1972).', 'Flüssige Lipiddoppelschicht mit beweglichen, mosaikartig eingelagerten Proteinen. Gilt heute eingeschränkt (Fence-Modell, Lipid Rafts).', 'Zellfusionsexperiment von Frye und Edidin.');
  g('Fence-Modell', 't3', 'Modell, nach dem das Cytoskelett wie ein Zaun die Beweglichkeit von Membranproteinen begrenzt (Kusumi 1996).', 'Erklärt, warum ein Teil der Proteine unbeweglich ist und Transporter auf einer Zellseite bleiben.', 'Glucosetransporter der Darmzellen.');

  // Thema 4
  g('Einfache Diffusion', 't4', 'Passiver Transport direkt durch die Lipiddoppelschicht.', 'Nur kleine, ungeladene Teilchen; entlang des Konzentrationsgefälles ohne Energie.', 'O₂, CO₂.', true);
  g('Kanalvermittelte Diffusion', 't4', 'Erleichterte Diffusion durch die Pore eines Kanalproteins.', 'Selektiv nach Größe und Ladung; viele Kanäle öffnen und schließen; passiv.', 'Wasser durch Aquaporine.', true);
  g('Carriervermittelte Diffusion', 't4', 'Erleichterte Diffusion über einen Carrier mit spezifischer Bindungsstelle.', 'Passiv entlang des Gefälles; nur das passende Teilchen wird transportiert.', 'Glucose aus der Darmzelle ins Blut.', true);
  g('Primär aktiver Transport', 't4', 'Aktiver Transport, dessen Energie direkt aus ATP stammt.', 'Transport gegen das Konzentrationsgefälle durch Pumpen.', 'Na⁺-K⁺-Ionenpumpe.', true);
  g('Sekundär aktiver Transport', 't4', 'Aktiver Transport, der an den Transport eines zweiten Teilchens entlang dessen Gefälles gekoppelt ist.', 'Energie indirekt: Das Gefälle des zweiten Teilchens wurde primär aktiv (ATP) aufgebaut.', 'Na⁺-Glucose-Symporter.', true);
  g('Symport', 't4', 'Gleichzeitiger Transport zweier Teilchensorten in die gleiche Richtung.', '—', 'Na⁺ und Glucose in die Darmzelle.', true);
  g('Antiport', 't4', 'Gleichzeitiger Transport zweier Teilchensorten in entgegengesetzte Richtungen.', '—', 'Na⁺-K⁺-Pumpe: Na⁺ hinaus, K⁺ hinein.', true);
  g('Passiver Transport', 't4', 'Transport entlang des Konzentrationsgefälles ohne Energieaufwand.', 'Ergebnis der ungerichteten Teilchenbewegung.', 'Diffusion.');
  g('Aktiver Transport', 't4', 'Transport gegen das Konzentrationsgefälle unter Energieaufwand.', 'Energie meist aus ATP (primär) oder aus einem Ionengefälle (sekundär); auch Vesikeltransport.', 'Pumpen, Endozytose.');
  g('Konzentrationsgefälle', 't4', 'Unterschied der Konzentration eines Stoffes zwischen zwei Bereichen.', 'Bestimmt die Richtung des passiven Transports (hoch → niedrig).', '—');
  g('Carrier', 't4', 'Membrantransportprotein mit Bindungsstelle für ein bestimmtes Teilchen.', 'Ändert beim Transport seine Form; kann passiv oder (als Pumpe/Symporter) aktiv transportieren.', 'Glucose-Carrier.');
  g('Aquaporine', 't4', 'Ständig geöffnete, hochselektive Wasserkanäle.', 'Ermöglichen schnellen Wassertransport (kanalvermittelte Diffusion).', '—');
  g('Na⁺-K⁺-Ionenpumpe', 't4', 'Membranprotein, das unter ATP-Verbrauch Na⁺ aus der Zelle und K⁺ in die Zelle pumpt.', 'Primär aktiver Antiport; hält Na⁺ in der Zelle niedrig (Ergänzung: 3 Na⁺ / 2 K⁺ pro ATP).', 'Darmepithelzelle.');

  // Thema 5
  g('Endozytose', 't5', 'Aufnahme von Stoffen durch Einstülpung und Abschnürung der Zellmembran als Vesikel.', 'Vesikeltransport zählt zum aktiven Transport.', 'Aufnahme von Eisen-Ionen.', true);
  g('Exozytose', 't5', 'Abgabe von Stoffen, indem ein Vesikel mit der Zellmembran verschmilzt.', 'Die Vesikelmembran wird Teil der Zellmembran.', 'Freisetzung von Insulin.', true);
  g('Rezeptor', 't5', 'Membranprotein, das ein bestimmtes Teilchen nach dem Schlüssel-Schloss-Prinzip bindet.', 'Sorgt für Selektivität bei Signalaufnahme und Endozytose.', 'Transferrin-Rezeptor, Insulinrezeptor.', true);
  g('Rezeptorvermittelte Endozytose', 't5', 'Endozytose, bei der die Einschnürung erst nach Bindung des Teilchens an einen Rezeptor erfolgt.', 'Clathrin stabilisiert das Vesikel; selbst seltene Stoffe werden selektiv aufgenommen.', 'Eisenaufnahme über Transferrin.', true);
  g('Membranabschnürung', 't5', 'Ablösen eines eingestülpten Membranabschnitts als geschlossenes Vesikel.', 'Die Membran bleibt dabei geschlossen; der Stoff liegt in einem eigenen Kompartiment.', '„clathrin coated vesicle“.', true);
  g('Membranfluss', 't5', 'Ständiger Austausch von Membranmaterial zwischen Zellmembran, Vesikeln und Organellen.', 'Durch Endo- und Exozytose; ermöglicht z. B. rasche Änderung der Transporterzahl.', 'Insulin erhöht die Glucoseaufnahme bis 50-fach.', true);
  g('pH-Wert', 't5', 'Maß für die Konzentration an Oxonium-Ionen (H₃O⁺); pH < 7 sauer.', 'Bei der Eisenaufnahme sinkt der pH im Vesikel auf ca. 5,5; bei Enzymen bestimmt er Ladungen im aktiven Zentrum.', 'Blut 7,4; Magen 1–2.', true);
  g('Clathrin', 't5', 'Protein, das sich auf der Cytoplasmaseite einer Einstülpung anlagert.', 'Stabilisiert das entstehende Vesikel und löst sich danach ab.', '—');
  g('Transferrin', 't5', 'Bluteiweiß, das Eisen-Ionen bindet und transportiert.', 'Nur beladenes Transferrin bindet an den Transferrin-Rezeptor.', '—');
  g('Vesikel', 't5', 'Kleines membranumschlossenes Bläschen zum Stofftransport.', 'Entsteht durch Abschnürung; verschmilzt bei der Exozytose mit der Membran.', 'Endosom, Insulinvesikel.');
  g('Kompartimentierung', 't5', 'Gliederung der Zelle in membranbegrenzte Reaktionsräume.', 'Ermöglicht unterschiedliche Bedingungen (z. B. pH) in verschiedenen Räumen.', 'Saures Vesikel bei der Eisenaufnahme.');

  // Thema 6
  g('Enzym', 't6', 'Biokatalysator (meist Protein), der eine bestimmte Reaktion beschleunigt, ohne verbraucht zu werden.', 'Senkt die Aktivierungsenergie durch Bildung eines Enzym-Substrat-Komplexes.', 'Lactase.');
  g('Aktivierungsenergie', 't6', 'Energie, die zugeführt werden muss, damit Ausgangsstoffe reagieren können.', 'Enzyme setzen sie herab; höhere Temperatur erhöht den Anteil der Moleküle, die sie besitzen.', 'Lactosespaltung mit Lactase ca. 10⁷-fach schneller.', true);
  g('Enzym-Substrat-Komplex', 't6', 'Vorübergehende Verbindung aus Enzym und im aktiven Zentrum gebundenem Substrat.', 'Übergangszustand mit niedrigerer Aktivierungsenergie; entsteht nur bei passendem Substrat.', 'Lactase + Lactose.', true);
  g('Aktives Zentrum', 't6', 'Taschenförmige Vertiefung des Enzyms, in der das Substrat gebunden und umgesetzt wird.', 'Bestimmte Aminosäurereste wechselwirken mit dem Substrat (Ionenbindungen, H-Brücken, Dipol-Dipol, Van-der-Waals).', '—', true);
  g('Katalytischer Zyklus', 't6', 'Wiederkehrender Ablauf: Enzym + Substrat → Enzym-Substrat-Komplex → Enzym + Produkt.', 'Das Enzym geht unverändert hervor; deshalb genügen geringe Mengen.', 'Lactase-Zyklus (Buch S. 26, B1).', true);
  g('Kofaktoren', 't6', 'Nicht-Protein-Bestandteile von Enzymen.', 'Anorganisch (Metall-Ionen) oder organisch (Coenzyme: prosthetische Gruppe, Cosubstrat). Apoenzym + Cofaktor = Holoenzym.', 'Fe-, Cu-, Mn-Ionen.', true);
  g('Cosubstrat', 't6', 'Coenzym, das nur vorübergehend gebunden ist und sich bei der Reaktion verändert.', 'Gibt H⁺, Elektronen oder Gruppen ab bzw. nimmt sie auf; wird in einer Folgereaktion regeneriert.', 'NAD⁺ bei der Alkoholdehydrogenase.', true);
  g('Prosthetische Gruppe', 't6', 'Coenzym, das als ständiger Bestandteil fest an das Enzym gebunden ist.', 'Wird nicht abgegeben – Gegensatz zum Cosubstrat.', 'Häm-Gruppe der Katalase (Ergänzung).', true);
  g('Substrat', 't6', 'Ausgangsstoff einer enzymatischen Reaktion.', 'Wird im aktiven Zentrum gebunden und zu Produkten umgesetzt.', 'Lactose.');
  g('Apoenzym', 't6', 'Proteinanteil eines Enzyms.', 'Wird erst mit dem Cofaktor zum funktionsfähigen Holoenzym.', '—');
  g('Holoenzym', 't6', 'Funktionsfähiges Enzym aus Apoenzym und Cofaktor.', '—', '—');

  // Thema 7
  g('Schlüssel-Schloss-Prinzip', 't7', 'Modell: Das Substrat passt wie ein Schlüssel in das starre, komplementär geformte aktive Zentrum.', 'Erklärt die Substratspezifität; gilt auch für Rezeptoren und Carrier.', 'Transferrin am Transferrin-Rezeptor.', true);
  g('Induced-Fit-Modell', 't7', 'Modell der induzierten Passform: Die Substratbindung verändert die Raumstruktur des Enzyms.', 'Gegenseitige optimale Ausrichtung von Enzym und Substrat; aktives Zentrum flexibel.', '—', true);
  g('substratspezifisch', 't7', 'Ein Enzym setzt nur Substrate passender Größe, Form und Ladungsverteilung um.', 'Ursache: räumliche Anordnung der Aminosäurereste im aktiven Zentrum.', 'Urease spaltet Harnstoff, nicht Methylharnstoff.', true);
  g('wirkungsspezifisch', 't7', 'Ein Enzym katalysiert stets dieselbe Reaktion seines Substrats.', 'Es entstehen immer die gleichen Produkte.', 'Lactase: Lactose → Glucose + Galactose.', true);

  // Thema 8
  g('Maximale Reaktionsgeschwindigkeit (vmax)', 't8', 'Grenzwert der Reaktionsgeschwindigkeit bei Substratsättigung.', 'Hängt von der Enzymkonzentration ab; wird asymptotisch angenähert. vmax = kcat · c(Enzym).', 'Halbe Enzymmenge → halbes vmax.', true);
  g('Halbmaximale Reaktionsgeschwindigkeit (½ vmax)', 't8', 'Die Hälfte von vmax.', 'Die zugehörige Substratkonzentration ist KM. Molekular: im Mittel ist die Hälfte der aktiven Zentren besetzt (Ergänzung).', '—', true);
  g('Michaelis-Menten-Konstante (KM)', 't8', 'Substratkonzentration, bei der ½ vmax erreicht wird.', 'Maß für die Affinität (kleiner KM = große Affinität); unabhängig von Enzym- und Substratkonzentration; auf der x-Achse ablesen.', 'Acetylcholinesterase: KM = 0,000095 mol/l.', true);
  g('Wechselzahl (kcat)', 't8', 'Anzahl der Substratmoleküle, die ein aktives Zentrum pro Sekunde bei Sättigung umsetzt.', 'Maß für die Arbeitsgeschwindigkeit (s⁻¹).', 'Katalase: 10 000 000 s⁻¹.', true);
  g('Brownsche Molekularbewegung', 't8', 'Ständige, ungerichtete Bewegung gelöster Teilchen.', 'Bestimmt die Wahrscheinlichkeit von Enzym-Substrat-Begegnungen und damit die Diffusion; nimmt mit der Temperatur zu.', '—', true);
  g('Reaktionsgeschwindigkeit', 't8', 'Umgesetzte Stoffmenge pro Zeit.', 'Gemessen z. B. als Zunahme der Produktkonzentration pro Zeitspanne; abhängig von Enzym, Substrat, Temperatur und pH.', '—', true);
  g('Affinität', 't8', 'Bindungsbestreben zwischen Enzym und Substrat.', 'Wird durch KM beschrieben (klein = hoch).', '—');
  g('Isoenzyme', 't8', 'Enzyme, die dieselbe Reaktion katalysieren, aber unterschiedliche Sequenz/Struktur haben.', 'Daher unterschiedliche KM-Werte oder Temperaturoptima.', 'ALDH1 und ALDH2; Brenztraubensäurekinase bei Fisch und Mensch.');
  g('Sättigung', 't8', 'Zustand, in dem alle aktiven Zentren besetzt sind.', 'Mehr Substrat steigert die Geschwindigkeit dann nicht mehr.', 'Drehtür-Modell.');

  // Thema 9
  g('RGT-Regel', 't9', 'Reaktionsgeschwindigkeits-Temperatur-Regel: +10 °C → 2- bis 3-fache Reaktionsgeschwindigkeit.', 'Bei Enzymen nur unterhalb des Temperaturoptimums gültig.', '—', true);
  g('Temperaturoptimum', 't9', 'Temperatur, bei der ein Enzym die höchste Aktivität hat.', 'Enzymspezifisch; Angepasstheit an Körpertemperatur bzw. Lebensraum.', 'Mensch ≈ 37 °C.', true);
  g('Denaturierung', 't9', 'Veränderung der Raumstruktur eines Proteins durch Zerstörung stabilisierender Wechselwirkungen.', 'Durch Hitze (meist irreversibel) oder extreme pH-Werte (reversibel oder irreversibel); Enzym verliert Aktivität.', 'Gekochtes Ei (Ergänzung).', true);
  g('Thermophile Enzyme', 't9', 'Hitzestabile Enzyme wärmeliebender Organismen.', 'Viele Disulfidbrücken und Ionenbindungen stabilisieren die Raumstruktur; genutzt in Forschung und Industrie.', 'Taq-Polymerase (aktiv bei 95 °C).', true);
  g('pH-Optimum', 't9', 'pH-Wert, bei dem ein Enzym die höchste Aktivität hat.', 'Hängt von den ionisierbaren Resten im aktiven Zentrum ab; Angepasstheit an den Wirkort.', 'Pepsin ≈ 2, Speichel-Amylase 7.', true);

  // Thema 10
  g('Kompetitive Hemmung', 't10', 'Hemmung durch einen substratähnlichen Inhibitor, der mit dem Substrat um das aktive Zentrum konkurriert.', 'Reversibel; vmax unverändert (bei hoher c(S) erreichbar), KM erhöht.', 'Allopurinol, Sulfonamide.', true);
  g('reversibel', 't10', 'Umkehrbar.', 'Ein reversibler Inhibitor bindet nur vorübergehend und löst sich wieder.', 'Kompetitive und nicht-kompetitive Hemmung.', true);
  g('Nicht-kompetitive / allosterische Hemmung', 't10', 'Hemmung durch einen Inhibitor, der außerhalb des aktiven Zentrums (allosterisch: am allosterischen Zentrum) bindet und die Raumstruktur verändert.', 'Keine Konkurrenz mit dem Substrat; reversibel; vmax sinkt, KM bleibt gleich.', 'Tyrosinkinase-Hemmer bei Leukämie.', true);
  g('Irreversible Hemmung', 't10', 'Dauerhafte Bindung eines Inhibitors, die das Enzym endgültig funktionslos macht.', 'Nicht durch Substrat oder Auswaschen aufhebbar.', 'Penicillin; Blei- und Quecksilber-Ionen an SH-Gruppen.', true);
  g('Inhibitor', 't10', 'Hemmstoff, der die Aktivität eines Enzyms verringert.', 'Wirkung hängt von der Bindungsstelle ab (aktives Zentrum oder andere Stelle).', '—');
  g('Allosterisches Zentrum', 't10', 'Vom aktiven Zentrum räumlich getrennte Bindungsstelle für Aktivatoren oder Inhibitoren.', 'allos = anders, stereos = räumlich; Bindung verändert die Form des Enzyms (aktiv/inaktiv).', '—');
  g('Kooperativität', 't10', 'Gemeinsame Strukturänderung aller Untereinheiten eines allosterischen Enzyms.', 'Führt zu einem s-förmigen (sigmoiden) Kurvenverlauf.', '—');
  g('Endprodukthemmung', 't10', 'Ergänzung: Das Endprodukt eines Stoffwechselweges hemmt (meist allosterisch) das erste Enzym des Weges.', 'Negative Rückkopplung zur Regulation – nicht im Buch, als Beispiel für die Regulationsbedeutung.', '—');

  BIO.glossary = G.sort((a, b) => a.term.localeCompare(b.term, 'de'));
})();
