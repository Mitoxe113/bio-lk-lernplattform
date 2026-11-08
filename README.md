# Bio-LK Lernplattform

Interaktive, offline-fähige Lernseite für die **1. LK-Klausur Biologie (Baden-Württemberg, Kursstufe)** zu den Themen Biomoleküle, Biomembranen, Membrantransport und Enzyme. Die Checkliste der Klausur dient als verbindliches Inhaltsverzeichnis: Jeder Punkt hat einen eigenen Lernzettel.

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

Die Seite lädt nichts aus dem Internet: keine CDNs, keine externen Schriften, keine APIs. `index.html` lässt sich zur Not auch direkt per Doppelklick öffnen.

## Inhalte

| Bereich | Inhalt |
|---|---|
| **Dashboard** | Fortschritt gesamt und pro Thema, Quiz-Statistik, offene Fehler, fällige Karteikarten, offene Lernziele, Empfehlungen |
| **Lernzettel** | 10 Themen mit je 10 Abschnitten: Grundlagen, Erklärung, Fachbegriffe, Mechanismen, Zusammenhänge, Abbildungen, Klausurwissen, typische Fehler, Zusammenfassung, Selbstkontrolle. Jedes Lernziel lässt sich als gelernt, unsicher oder offen markieren. |
| **Übungen** | Multiple Choice (rund 85 Fragen), Karteikarten im Leitner-System (rund 80), Lückentexte, Zuordnung, Reihenfolge, Beschriften, offene Klausurfragen mit Musterlösung und Selbstbewertung, Fehlerliste, Mischtraining |
| **Bio-Labor** | 14 interaktive SVG-Modelle: Aminosäure, Peptidbindung, Proteinstruktur, Phospholipid, Fluid-Mosaik, Transport, Glucose-Resorption, Endo- und Exozytose, Katalyse, Induced Fit, Michaelis-Menten, Temperatur/pH, Hemmung |
| **Diagramm-Trainer** | Michaelis-Menten, Temperatur, pH und Hemmung: Achsen beschriften, Kurven zeichnen, Punkte markieren, Kurven vergleichen, Verläufe erklären |
| **Klausurmodus** | Themen, Schwierigkeit und Umfang wählen. Aufgaben ohne Sofort-Lösung, am Ende Auswertung mit Punkten, Musterlösungen und nicht beherrschten Lernzielen. |
| **Lexikon** | rund 100 Fachbegriffe mit Suche; jeder Eintrag hat Definition, Erklärung, Themenbezug und Beispiel |

### Kennzeichnung der Inhalte

| Symbol | Bedeutung |
|---|---|
| 📖 | Inhalt aus dem Schulbuch, mit Seitenangabe |
| ✏️ | aus dem Unterricht bzw. den Arbeitsblättern |
| ➕ | Ergänzung, steht nicht im Buch |
| ⚠️ | Hinweis auf fehlende oder unklare Angaben in den Materialien |

Alle Texte sind selbst formuliert und alle Abbildungen selbst gezeichnete SVG-Grafiken. Aus dem Buch ist nichts kopiert.

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
- Der Speicher gilt **pro Browser und Gerät**. Wer den Browserverlauf bzw. die Websitedaten löscht, löscht auch den Fortschritt.
- **Exportieren:** Menü „Daten sichern“ → „Fortschritt exportieren“. Das lädt eine JSON-Datei herunter.
- **Importieren:** „Daten sichern“ → „Datei wählen …“. Der aktuelle Stand wird dabei ersetzt. So lässt sich auch auf einem anderen Gerät weiterlernen.
- **Zurücksetzen:** „Daten sichern“ → „Alles zurücksetzen“.

## Projektstruktur

```
index.html            Grundgerüst, Navigation
style.css             Design (Weiß / Navy / Türkis), responsiv
assets/icon.svg       Icon
js/data-topics.js     10 Themen: Lernziele, Fachbegriffe, Lernzettel-Inhalte
js/data-exercises.js  MC-Fragen, Karteikarten, Lückentexte, Zuordnung, Reihenfolge, Beschriften, offene Fragen
js/data-glossary.js   Lexikon
js/core.js            Speicher (LocalStorage), Hilfsfunktionen, Fortschrittsberechnung
js/charts.js          SVG-Koordinatensysteme und Kurvenmodelle
js/models.js          SVG-Abbildungen (auch für Beschriftungsaufgaben)
js/lab.js             Interaktives Labor
js/exercises.js       Übungsbereich
js/diagrams.js        Diagramm-Trainer
js/exam.js            Klausurmodus
js/app.js             Router, Dashboard, Lernzettel, Lexikon, Datensicherung
```

Technik: HTML5, CSS3, Vanilla JavaScript, SVG und LocalStorage. Es gibt keinen Build-Schritt und keine Abhängigkeiten.
