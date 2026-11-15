# Websitepakketten 18–20 — lokale uitvoering

Deze uitvoering bouwt voort op website-main `3f270da` en de opgeslagen sitemap
van 12/14 november. Website, Command Center en Discordbot blijven afzonderlijke
repositories. Alleen de websitecode en lokale bewijsbestanden zijn gewijzigd.

## 18 — Navigatie en homepage

- Gedeelde header met zeven rubrieken in de vastgelegde volgorde, wanneer hun
  bestemming beschikbaar is. Overzichtslinks en submenu-knoppen zijn gescheiden.
- Compact menu onder 1280 px, sluiten met Escape en focusherstel; submenu's werken
  met klikken en toetsenbord. Zoeken heeft een echte resultatenpagina.
- Footer gebruikt dezelfde namen en beschikbare bestemmingen. Broodkruimels tonen
  de bezoekershiërarchie, met behoud van technische en bestaande publieke routes.
- Systeem/Licht/Donker, bestaande lokale lettertypen en het originele BESC-logo.
- Homepage: vrijgegeven introductie/beeld of rustige merkachtergrond; ingangen;
  komende events; maximaal vier creators; Nieuws & BESC-blog; introductietekst;
  meedoen; maximaal zes organisaties; beschikbare media-/impactingangen.
- Nieuws toont maximaal drie artikelen, met een groter eerste artikel. Creators
  worden uit de bestaande bronvolgorde gekozen, zonder volgersranglijst of
  verzonnen live-status. Rollen van organisaties blijven afzonderlijk benoemd.
- Een leeg optioneel blok vervalt. Een bronstoring wordt als storing getoond en
  herstelt geen oude gegevens. Er worden geen actuele feiten of slogans bedacht.

## 19 — Publieke pagina's en Nieuws & BESC-blog

- De bestaande pagina-, artikel-, event- en mediacontracten worden hergebruikt.
  Nieuwe informatieve pagina's worden uit het bestaande CMS gelezen; een niet
  vrijgegeven bestemming krijgt geen plaatsvervangende inhoud.
- De nieuwe routecatalogus koppelt de geneste bezoekersstructuur aan bestaande
  platte CMS-slugs. Bijvoorbeeld `/over-besc/team` leest de vrijgegeven CMS-pagina
  `team`; de bestaande platte `/team`-route blijft geldig. Bestaande vlakke taalroutes
  blijven behouden; de nieuwe samengestelde overzichten zijn voor nl-BE uitgewerkt.
- Overzichten en detailroutes voor fotoalbums, video's, impact, downloads en acties
  gebruiken actuele vrijgegeven CMS-pagina's. Een overzicht kan de bijbehorende
  gepubliceerde detailpagina's tonen. De huidige bron levert tekst, hero en links;
  er is geen nieuw galerij-, videoplayer- of PDF/ZIP-beheercontract toegevoegd.
  Zulke bronfuncties en originele bestanden blijven een afzonderlijke afhankelijkheid.
- `/nieuws` en `/nieuws/{slug}` behouden dezelfde artikelbron. De vaste naam is
  overal **Nieuws & BESC-blog**. Artikelen behouden de broninhoud, beschikbare
  publicatiedatum, afbeeldingen en credits. Onbekende auteurs/categorieën worden
  niet ingevuld en er komt geen tweede blogregister.
- Events krijgen lijst-/kalenderkeuze en een archief op basis van de huidige
  geladen bronpagina. De kalender gebruikt Belgische tijd en heeft een maandkeuze.
  Vervolgpagina's behouden de weergave. Paginering is geen volledige inventaris;
  dit is in de interface benoemd.
- Zoekresultaten komen uitsluitend uit vrijgegeven pagina's, nieuws, events en
  beschikbare profielpublicaties. Eigen aanvragen en andere accountgegevens zijn
  geen zoekbron. Bronnen zijn begrensd, onvolledigheid en storingen worden gemeld.
- Het historische register is opnieuw gebruikt: **98 URL-records**, waaronder
  **27 nieuws-/blogartikelen** en **38 archiefpagina's**. De lokale voorbereiding
  bewaart bronverwijzingen en hashes; alle import- en redirectakkoorden staan uit.
  Er is geen oude artikelinhoud ingevoerd, herschreven of gepubliceerd.

## 20 — Creators en Mijn BESC

- Bestaande creatorprofielen, platform-/taal-/disciplinefilters, eigen profiel-
  voorstellen, persoonlijke veldkeuze, intrekking en revisies blijven behouden.
- `Creator aanmelden` verwijst naar het bestaande profielvoorstel, met uitleg dat
  indienen, beoordelen en publiceren afzonderlijke stappen zijn.
- Mijn BESC krijgt een overzicht van de actuele eigen profielstatus, aandachtspunten,
  recente eigen aanvragen en organisatietoegang. Het bestaande volledige profiel-
  en toestemmingsscherm staat ook op `/mijn-besc/profiel`.
- Aanvragen en organisaties gebruiken de bestaande contracten en rechten. Het
  overzicht toont geen eigen functies waarvan de actuele toegang niet bevestigd is.
- Het bestaande CC-portaal is lokaal teruggevonden op `/portal` en
  `/portal/toestemming`. Het bevat al opdrachten, voortgang, resultaten en
  doelgerichte toestemmingen. Een afzonderlijk standaard uitgeschakelde ingang
  kan Mijn BESC met dit portaal verbinden. Die geeft alleen een navigatieredirect
  naar de gecontroleerde CC-origin, zonder tokens, sleutels, account- of toegangs-ID.
  De gebruiker meldt zich daar zo nodig opnieuw aan met hetzelfde bestaande account;
  de bestaande portaalrechten blijven beslissend. Deze lokale codecontrole bewijst
  geen actuele portaaltoegang van een echte gebruiker.
- Deelnames, opdrachten, accountbestanden, YouTube-koppelingen en bestellingen
  worden niet als nieuwe eigen websitecontracten gebouwd. Waar het portaal al
  voorziet, blijft dat de bestaande omgeving. Er is geen vervangend portaal of
  tweede accountregistratie gemaakt.
- Aanmelden behoudt alleen een gecontroleerd intern terugkeeradres. Een aanmeldlink
  maakt geen nieuw account aan. De bestaande controle op de formulierherkomst,
  verzoek-ID's, revisies en persoonlijke bevestiging blijft behouden.

## Rechten, intrekking en standaardinstelling

```text
BESC_WEBSITE_EXPERIENCE_ENABLED=false
BESC_WEBSITE_EXISTING_PORTAL_ENABLED=false
```

De nieuwe presentatie is standaard uit. De bestaande websitefuncties en afzonderlijke
bronflags blijven de toegang bepalen; deze nieuwe flag activeert geen koppeling.
Anonieme productie gebruikt uitsluitend het bestaande publieke nieuws/event/pagina-
contract. De eigen profiel-/aanvraag-/organisatiecontracten worden daar niet hergebruikt.
Hun werking is hier in de bestaande afgeschermde DEV-context voorbereid en getest.

Leesroutes gebruiken `no-store`. Zichtbare regio's controleren hun bron opnieuw bij
focus, terugkeer, zichtbaarheid en periodiek. Offline, intrekking, onbekende schema's
en ontbrekende toegang verwijderen de betreffende gegevens. Header en footer mogen
de globale afscherming van een eigen profielscherm niet opheffen. Zonder JavaScript
blijven afgeschermde gegevens verborgen.

De publieke zoekmachine-sitemap, goedgekeurde productie-origins en indexeringsflags
zijn niet verruimd. Nieuwe zoek- en accountpagina's worden niet indexeerbaar gemaakt.
Er is geen analytics-, cookie-tracking-, nieuwsbrief- of merchketen toegevoegd.

## Verificatie en bewijsgrens

- Lokale model-/regressietests voor bronselectie, standaard-uit, paginering,
  conflicten, bronstoringen, eigen toegang, veilige terugkeer en bestaande contracten.
- Echte browserproeven met uitsluitend nagebootste Auth- en Command Center-antwoorden.
  Het testproces blokkeert overige externe netwerken.
- Schermbreedtes 320, 390, 768, 1280 en 1440 px, licht/donker, geen pagina-overloop,
  toetsenbord en automatische WCAG 2.0/2.1/2.2 AA-controle op de homepage.
- Bestaande browserproeven voor afscherming, intrekking en uitgeschakelde scripts.
- TypeScript en productiebouw met webpack. De reguliere container/CI installeert
  afhankelijkheden zelf; lokaal wordt de bestaande afhankelijkhedenmap hergebruikt.

Bewijs staat naast de checkout in `work/website-packages18-20-20261115/`. Schermafbeeldingen
bevatten uitsluitend gemarkeerde fictieve testinhoud; ze zijn geen goedgekeurde webcopy.

## Afzonderlijke vervolgstappen

1. Review van deze websitecommit en eventueel een concept-PR. Er is nog niet gepusht.
2. Broninhoud en mediarechten beoordelen; de 27 historische artikelen afzonderlijk
   toetsen op volledige tekst, auteur, oorspronkelijke datum, beelden, bijlagen en
   actualiteit. Pas daarna een concreet afgebakende import/redirect voorstellen.
3. Vóór activering controleren op bestaande slugs `aanmelden`, `archief`, `voorstellen`
   en `samenwerken`, omdat de nieuwe bezoekersingangen zulke woorden gebruiken.
   Ook de echte Auth-terugkeer-/aanmeldlinkconfiguratie controleren.
4. Productiecontracten voor profielpublicatie en de eigen omgeving, rijke media en
   niet aangesloten accountfuncties blijven afzonderlijk te beoordelen. De lokale
   DEV-proef bewijst geen anonieme productie-acceptatie.
5. Merge/imagebouw, inhoudsimport, activering, uitrol en publieke opening/indexering
   blijven afzonderlijke besluiten. Geen van deze acties is hier uitgevoerd.

Dit pakket bevat geen nieuwe databasewijziging en past geen migratie toe.
