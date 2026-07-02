# BRIEFING PROJECTE INPROCODE: PANELL D'ADMINISTRACIÓ, VISUALITZACIÓ I GESTIÓ DE DADES

El projecte **Inprocode** pretén ser una aplicació web versàtil i adaptable per a la gestió de dades, visualització dinàmica i seguiment d'informació geo-referenciada, estadística i calendaritzada. L'objectiu és desenvolupar un **panell d'administració reutilitzable** per a qualsevol tipus de projecte, amb una estructura flexible i funcional, orientada a la productivitat, la visualització clara i l'anàlisi de la informació.

---

## OBJECTIU DE LA PLATAFORMA

Desenvolupar una plataforma web administradora que permeti a l’usuari gestionar de manera senzilla i intuïtiva grans volums de dades (CRUD), visualitzar-les en forma de taula amb filtres, cercadors i paginació, i accedir a seccions complementàries com mapes interactius, estadístiques i calendaris. La plataforma ha de ser escalable i adaptable segons el tipus de projecte i de dades.

## SERVEI ESPERAT

Una aplicació web privada i modular que ofereixi:

- Un panell central d'administració de dades amb CRUD complet.
- Visualització dels elements en format de taula amb cerca, filtres i paginació.
- Mòdul de mapa interactiu amb geo-localització dinàmica.
- Secció d’anàlisi estadística amb gràfiques descriptives.
- Gestor de calendari per a programació d’esdeveniments o gestió operativa.
- Disseny adaptable segons el context del negoci (productes, persones, imatges, etc.).

## NECESSITATS

### Problemes a resoldre

- Manca d’un panell universal i modular per a gestionar dades variades de forma eficient.
- Dificultat per consultar i filtrar grans conjunts de dades de manera intuïtiva.
- Absència de funcionalitats complementàries de mapa, estadístiques i calendari dins un mateix entorn.
- Falta d'una eina d'administració centralitzada, dinàmica i fàcilment reutilitzable.

### Públic objectiu

El projecte s’adreça a **equips tècnics, gestors de projectes, startups i organitzacions** que necessitin una eina digital de suport per gestionar i analitzar dades de qualsevol àmbit.

1. **Interessos:**
   - Centralitzar i gestionar la informació del seu negoci o projecte.
   - Visualitzar les dades de manera clara i estructurada.
   - Analitzar i planificar amb suport visual i estadístic.

2. **Necessitats:**
   - Tenir accés a un panell que permeti gestionar (crear, editar, eliminar) entitats de dades.
   - Consultar aquestes dades en forma de taula amb filtres i cercador.
   - Veure aquestes dades en un mapa segons les coordenades geogràfiques.
   - Fer anàlisi visual de les dades (estadístiques) i planificació d'esdeveniments (calendari).
   - Accedir de manera segura i personalitzada al panell.

### Requisits funcionals esperats

#### Secció 1: Gestor de dades (CRUD)

- Formulari de creació d’elements (amb camps dinàmics segons el projecte).
- Possibilitat d’editar i eliminar elements.
- Llistat en taula amb:
  - Filtratge per camps
  - Cercador per paraula clau
  - Paginació

#### Secció 2: Mapa interactiu

- Visualització dels elements del panell en un mapa dinàmic.
- Geo-localització a partir de coordenades (latitud/longitud).
- Interacció amb les dades (clic per obrir informació o enllaçar a la fitxa de l’element).

#### Secció 3: Estadístiques

- Gràfiques i estadístiques automàtiques basades en les dades disponibles.
- Possibilitat de segmentar segons paràmetres (ex: categories, dates, localitzacions...).
- Actualització dinàmica amb cada modificació de dades.

#### Secció 4: Calendari de gestió

- Vista de calendari mensual, setmanal o diària.
- Possibilitat d’afegir esdeveniments relacionats amb els elements gestionats.
- Gestió d’esdeveniments: crear, editar, eliminar, etiquetar per categories.

#### Autenticació i seguretat

- Accés restringit amb sistema d’autenticació (login).
- Gestió de rols d’usuari (admin, editor, lector – opcional).

### Requisits tècnics esperats

- Aplicació **SPA (Single Page Application)** amb React o Angular.
- Enfocament _mobile-first_ amb disseny intuïtiu
- Backend amb Node.js, Express i base de dades MongoDB o SQL.
- Sistema de rutes protegides.
- Arquitectura escalable i modular.
- API pròpia RESTful per la gestió de dades.
- Geolocalització mitjançant Google Maps, Leaflet o Mapbox.
- Generació automàtica de gràfiques amb Chart.js, D3.js o similar.
- Calendari basat en llibreries com FullCalendar o Day.js.
- Desplegament a entorn públic.

### Requisits de UX/UI esperats

El disseny ha de ser:

- Disseny net, intuïtiu i funcional.
- Interfície coherent amb panells clars i organització modular.
- Adaptació **mobile-first** per a ús en dispositius mòbils i escriptori.
- Compliment de les pautes **WCAG** d’accessibilitat.
- Indicadors visuals d’accions realitzades (modificacions, errors, èxits).
- Navegació jeràrquica clara: menú lateral o superior.
- Components reutilitzables i coherents en tota l’aplicació.
- Identitat visual neutra però personalitzable.
- Iconografia clara i universal
- Bons contrastos, etiquetes ARIA, navegació per teclat
- Flux coherent i orientat a objectius
- Sense punts de fricció innecessaris
