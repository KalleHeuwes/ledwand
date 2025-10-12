# Copilot Instructions für das Angular-Projekt `ledwand`

## Architekturüberblick
- **Framework:** Angular 16, mit Material Design Komponenten (`mat-card`, `mat-raised-button` etc.)
- **Struktur:**
  - Hauptlogik im Verzeichnis `src/app/`
  - Komponenten sind in eigenen Unterordnern organisiert (z.B. `historie`, `aufstellung`, `spieler-liste`)
  - Services liegen unter `src/app/services/`
  - Models/Enums unter `src/app/models/` und `src/app/enums/`
  - Assets (CSV, Bilder, Sounds) unter `src/assets/`
- **Navigation:** Die Ansicht wird oft über die Variable `selectedView` gesteuert (z.B. in `historie.component.html`). Komponenten werden per `*ngIf` dynamisch eingeblendet.

## Workflows & Befehle
- **Entwicklung:**
  - Start: `ng serve` (Standardport: 4200)
  - Extern erreichbar: `ng serve --host 0.0.0.0`
- **Build:**
  - `ng build` erzeugt Artefakte im `dist/`-Verzeichnis
- **Tests:**
  - Unit-Tests: `ng test` (Karma)
  - End-to-End: `ng e2e` (falls eingerichtet)
- **Code-Generierung:**
  - Komponente: `ng g c <pfad/komponentenname>`
  - Service: `ng g s <pfad/servicename>`
- **GIT:**
  - Standard: `git add .; git commit -m "<msg>"; git push -f origin master; git pull -f origin master`
  - Alternativ: `GitPush <msg>`, `GitPull` (CMD-Skripte)

## Projektkonventionen & Muster
- **Komponenten:**
  - HTML und CSS sind meist getrennt, Logik in `.ts`-Dateien
  - Datenfluss oft über Input-Properties (z.B. `[csvPath]`)
  - Navigation/Ansicht über `selectedView` und Methoden wie `onAction()`
- **Services:**
  - Liegen in `services/`, werden per Dependency Injection genutzt
  - Beispiel: `configuration.service.ts`, `spieltags-config.service.ts`
- **Assets:**
  - CSV-Dateien für Konfiguration und Datenimport
  - Bilder/Sounds für UI-Elemente

## Integration & externe Abhängigkeiten
- **Material Design:**
  - Nutze Angular Material Komponenten (`mat-card`, `mat-raised-button` etc.)
- **Zeitpicker:**
  - `ngx-mat-timepicker` ist installiert (`npm i --save ngx-mat-timepicker`)

## Wichtige Dateien/Verzeichnisse
- `src/app/historie/historie.component.html` – Beispiel für dynamische Navigation und Karten-UI
- `src/app/services/` – zentrale Services
- `src/app/models/` – Datenmodelle
- `src/assets/` – CSV-Daten, Bilder, Sounds
- `README.md` – weitere Workflows und Befehle

## Beispiel für Navigation
```html
<div *ngIf="selectedView === 'menu'">
  <mat-card (click)="onAction('historisch')">...</mat-card>
  <mat-card (click)="onAction('admin')">...</mat-card>
  <!-- weitere Karten -->
</div>
<app-historie-admin *ngIf="selectedView === 'admin'"></app-historie-admin>
```

---
**Feedback:** Bitte gib Bescheid, falls wichtige Workflows, Konventionen oder Integrationen fehlen oder unklar sind.