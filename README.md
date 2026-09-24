# onepager-sites

Hosting-Repo für die vom **OnePager-Design-Agenten** (agent-hub) erzeugten Kundenseiten.
Gemeinsam genutzt von Dennis & Ogulcan (JaFa Systems).

## 🎪 Messe (Laptop & iPad)

Zum Vorzeigen unterwegs — der Agent-Hub läuft nur lokal und kann nicht mit.
**Diese eine Adresse eintippen, der Rest ist verlinkt:**

**➡️ https://dennis951.github.io/onepager-sites/messe/**

| Seite | Link | Was drin ist |
|---|---|---|
| So arbeiten wir | [/messe/agent-hub/](https://dennis951.github.io/onepager-sites/messe/agent-hub/) | klickbare Agent-Hub-Demo (Dashboard, CRM, PM, Automatisierung) |
| Leistungen | [/messe/leistungen/](https://dennis951.github.io/onepager-sites/messe/leistungen/) | sechs Leistungen, Ablauf, Betreuungsstufen — **ohne Preise** |
| Angebot | [/angebots-baukasten/](https://dennis951.github.io/onepager-sites/angebots-baukasten/) | Konfigurator mit Preisen, bewusst erst im Gespräch |

Hell- und Dunkelmodus schalten sich nach dem Gerät; der Knopf oben rechts überschreibt das.
Die Demo enthält **ausschließlich frei erfundene Betriebe** und ist als „Demo-Ansicht"
gekennzeichnet — echte Leads oder Kundendaten gehören dort nicht hinein.
Quellen: `messe/` in diesem Repo, Hintergrund in der KB unter
`marketing/marketing-overview.md`.

<!-- ONEPAGER-LIST:START -->
## Veröffentlichte OnePager (5)

- [Auto Detailing George](https://dennis951.github.io/onepager-sites/auto-detailing-george-ddqi29/) — Autoreinigung · veröffentlicht von Agent-Hub · 2026-07-07
- [La Lune](https://dennis951.github.io/onepager-sites/la-lune-ir5umy/) — Frühstücks-/Brunch-Café · veröffentlicht von Agent-Hub · 2026-06-25
- [Nana](https://dennis951.github.io/onepager-sites/nana-eguiz9/) — Café/Bistro (Brunch, Matcha & Eis) · veröffentlicht von Agent-Hub · 2026-06-25
- [Oki.la](https://dennis951.github.io/onepager-sites/oki-la-z2q9gr/) — Restaurant/Cafe · veröffentlicht von Agent-Hub · 2026-06-18
- [Salon Nicolai](https://dennis951.github.io/onepager-sites/salon-nicolai-fulpnw/) — Friseur · veröffentlicht von Agent-Hub · 2026-06-17
<!-- ONEPAGER-LIST:END -->

## Angebots-Baukasten

Interaktiver Kunden-Konfigurator im JaFa-Design (Basis-Website → Module → Betreuung →
Marketing/Wachstum, Live-Summe + druckbarer Ankreuz-Katalog):

**➡️ https://dennis951.github.io/onepager-sites/angebots-baukasten/**

Quelle/Pflege: `knowledge-base/angebots-konfigurator/index.html` (KB-Repo) — bei Änderungen die
Datei nach `angebots-baukasten/index.html` hierher re-kopieren und pushen. Alle Preise sind
unverbindliche „ab"-Richtwerte.

## Wie es funktioniert

- Jede veröffentlichte OnePage liegt unter `/<slug>/` (z. B. `/musterbau-a1b2c3/`) und wird über
  **GitHub Pages** ausgeliefert: `https://dennis951.github.io/onepager-sites/<slug>/`.
- `pages.json` (Repo-Root) ist der **gemeinsame Index** aller Seiten inkl. Kommentare. Der Agent-Hub
  liest/schreibt diese Datei und synchronisiert sie per `git pull`/`push` → beide sehen denselben Stand
  (bidirektional).
- Jede Seite enthält `<meta name="robots" content="noindex,nofollow">` und einen schwer erratbaren Slug,
  ist also per Link erreichbar, aber nicht über Suchmaschinen auffindbar.

## Nicht von Hand bearbeiten

Inhalt wird vom Agent-Hub (Reiter **OnePager**) gepflegt. `pages.json` nur in Ausnahmefällen manuell
anfassen — sonst drohen Merge-Konflikte beim nächsten Sync.
