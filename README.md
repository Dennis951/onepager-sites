# onepager-sites

Hosting-Repo für die vom **OnePager-Design-Agenten** (agent-hub) erzeugten Kundenseiten.
Gemeinsam genutzt von Dennis & Ogulcan (JaFa Systems).

<!-- ONEPAGER-LIST:START -->
## Veröffentlichte OnePager (0)

_Noch keine veröffentlichten OnePager._
<!-- ONEPAGER-LIST:END -->

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
