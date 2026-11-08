# Bio-LK Lernplattform

Lernseite für die **1. LK-Klausur Biologie (Baden-Württemberg, Kursstufe)**: Biomoleküle, Biomembranen, Membrantransport und Enzyme. Die Checkliste der Klausur ist das Inhaltsverzeichnis, jeder Punkt hat einen eigenen Lernzettel. Grundlage ist das Schulbuch (S. 12–41) mit Seitenangaben.

**Online:** https://mitoxe113.github.io/bio-lk-lernplattform/

## Starten

### Variante 1: online
Die Adresse oben im Browser öffnen. Das funktioniert auch auf Handy und Tablet.

### Variante 2: lokal
Python 3 wird benötigt. Im Projektordner ausführen:

```bash
python -m http.server 8000
```

Danach im Browser **http://localhost:8000** öffnen. Unter Windows heißt der Befehl eventuell `py -m http.server 8000` oder `python3 -m http.server 8000`.

Die Seite lädt nichts aus dem Internet: keine CDNs, keine externen Schriften, keine APIs. Per Doppelklick auf `index.html` läuft fast alles, aber die Buchabbildungen brauchen den Server (siehe unten).

## Abbildungen aus dem Buch

Die Lernzettel zeigen die passenden Abbildungen direkt aus dem Schulbuch, zum Beispiel S. 13, B5 (Strukturebenen) oder S. 41, B4 (Hemmung im Diagramm). Das Buch ist urheberrechtlich geschützt und darf nicht auf eine öffentliche Seite kopiert werden. Deshalb enthält dieses Repository **keine Bilder aus dem Buch**, sondern nur Seitenzahlen und Bildausschnitte (Koordinaten).

So werden die Abbildungen sichtbar:
1. Menü **„Daten sichern“** → **„Schulbuch verknüpfen“** → **„Buch-PDF auswählen“**, oder direkt auf einen Platzhalter im Lernzettel tippen.
2. Die eigene PDF-Datei des Buchs auswählen.

Die Datei wird nur im Browser des eigenen Geräts gespeichert (IndexedDB) und nirgends hochgeladen. Danach schneidet die Seite die Abbildungen beim Anzeigen selbst aus der Datei aus. Ein Tipp auf eine Abbildung vergrößert sie, dort lässt sich auch die ganze Buchseite einblenden.

Gut zu wissen:
- Das Verknüpfen ist **pro Gerät und Browser** einmal nötig. Auf dem Handy muss die PDF also auf dem Handy liegen.
- Die Seiten werden direkt aus der Datei gelesen, die PDF wird dafür nicht komplett in den Speicher geladen.
- Lokal funktioniert das nur über `http://localhost:8000`, nicht per Doppelklick (`file://`).
- Ohne verknüpftes Buch erscheinen an diesen Stellen die eigenen Zeichnungen bzw. interaktiven Modelle. Wo es keine eigene Zeichnung gibt, bleibt die Stelle leer; die Seitenangabe steht im Text.

## Inhalte

| Bereich | Inhalt |
|---|---|
| **Übersicht** | Fortschritt gesamt und pro Thema, Quiz-Statistik, offene Fehler, fällige Karteikarten, offene Lernziele |
| **Lernzettel** | 10 Themen, aufgebaut wie die Unterrichtsaufschriebe: Begriff links, Erklärung rechts, Abbildungen mit Notizen daneben, Übersichten als Baum oder Vergleich. Darunter: Für die Klausur, Fehler und Korrekturen (auch zu den eigenen Aufschrieben), Selbstkontrolle. Jedes Lernziel lässt sich als gelernt, unsicher oder offen markieren. |
| **Übungen** | 83 Multiple-Choice-Fragen, 77 Karteikarten (Leitner-System), Lückentexte, Zuordnung, Reihenfolge, Beschriften, 24 offene Klausurfragen mit Musterlösung und Selbstbewertung, Fehlerliste, Mischtraining |
| **Bio-Labor** | 14 interaktive Modelle: Aminosäure, Peptidbindung, Proteinstruktur, Phospholipide, Biomembran, Transport, Glucose-Resorption, Endo- und Exozytose, Katalyse, Schlüssel-Schloss/Induced Fit, Michaelis-Menten, Temperatur/pH, Hemmung |
| **Diagramm-Trainer** | Substratkonzentration, Temperatur, pH und Hemmung: Achsen beschriften, Kurven zeichnen, Punkte markieren, Kurven vergleichen, Verläufe erklären |
| **Klausurmodus** | Themen, Schwierigkeit und Umfang wählen. Aufgaben ohne Sofort-Lösung, am Ende Auswertung mit Punkten, Musterlösungen und nicht beherrschten Lernzielen |
| **Lexikon** | 95 Fachbegriffe mit Suche; jeder Eintrag hat Definition, Erklärung, Themenbezug und Beispiel |

### Herkunft der Inhalte

- **Buch S. …, B…**: steht so im Schulbuch.
- **Unterricht**: aus den eigenen Aufschrieben bzw. Arbeitsblättern.
- **Ergänzung (steht nicht im Buch)**: zusätzliches Wissen, klar gekennzeichnet und bewusst knapp gehalten.
- **Hinweis zum Material**: Stellen, an denen Buch, Checkliste und Unterricht nicht zusammenpassen oder etwas fehlt.

Die Texte sind selbst formuliert. Die interaktiven Modelle sind eigene, vereinfachte SVG-Zeichnungen und ersetzen nicht die Abbildungen im Buch.

## Speichern und Wiederherstellen

Der Fortschritt wird automatisch im **LocalStorage** des Browsers gespeichert, unter dem Schlüssel `bioLK.v1`. Gespeichert werden:
- Lernziel- und Themenstatus
- Quizantworten
- Karteikarten-Fächer
- Übungsergebnisse
- Fehlerliste
- Antworten auf offene Fragen
- Probeklausuren

Wichtig zu wissen:
- Der Speicher gilt **pro Browser und Gerät**. Wer den Browserverlauf bzw. die Websitedaten löscht, löscht auch den Fortschritt und das verknüpfte Buch.
- **Exportieren:** Menü „Daten sichern“ → „Fortschritt exportieren“. Das lädt eine JSON-Datei herunter. Das Buch ist darin nicht enthalten.
- **Importieren:** „Daten sichern“ → „Datei wählen …“. Der aktuelle Stand wird dabei ersetzt. So lässt sich auch auf einem anderen Gerät weiterlernen.
- **Zurücksetzen:** „Daten sichern“ → „Alles zurücksetzen“.

## Projektstruktur

```
index.html            Grundgerüst, Navigation
style.css             Design, responsiv
assets/icon.svg       Icon
js/data-topics.js     10 Themen: Lernziele, Fachbegriffe, Lernzettel-Inhalte
js/data-exercises.js  MC-Fragen, Karteikarten, Lückentexte, Zuordnung, Reihenfolge, Beschriften, offene Fragen
js/data-glossary.js   Lexikon
js/core.js            Speicher (LocalStorage), Hilfsfunktionen, Fortschrittsberechnung
js/book.js            Buch verknüpfen: Abbildungsverzeichnis (Seite + Ausschnitt), Anzeige aus der eigenen PDF
js/charts.js          SVG-Koordinatensysteme und Kurvenmodelle
js/models.js          SVG-Modelle (auch für Beschriftungsaufgaben)
js/lab.js             Interaktives Labor
js/exercises.js       Übungsbereich
js/diagrams.js        Diagramm-Trainer
js/exam.js            Klausurmodus
js/app.js             Router, Übersicht, Lernzettel, Lexikon, Datensicherung
vendor/pdfjs/         pdf.js 4.10.38 (Mozilla, Apache-2.0, siehe LICENSE) zum Anzeigen der PDF
```

Technik: HTML5, CSS3, Vanilla JavaScript, SVG, LocalStorage und IndexedDB. Es gibt keinen Build-Schritt. Die einzige Fremdbibliothek ist pdf.js; sie liegt im Repository und wird nicht aus dem Internet geladen.
