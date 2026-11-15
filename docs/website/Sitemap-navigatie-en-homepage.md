# BESC website sitemap navigatie en homepage

Versie 1.1 — 14 november 2026. De structuur is uitgewerkt op 12 november; het vaste label is op 14 november aangepast naar ‘Nieuws & BESC-blog’.

Deze uitwerking legt de concrete ontwerpstructuur vast voor de volgende websiteontwikkelstap: zeven publieke hoofdrubrieken, één persoonlijke omgeving en een homepage die bezoekers naar creators, evenementen en de community leidt. Command Center beheert de inhoud, aanvragen en publicatie. De herkenbare BESC-stijl, licht en donker en de bestaande accountidentiteit blijven uitgangspunt.

Status: uitgewerkt op verzoek van Linda en bewaard als ontwikkelreferentie. Nieuwe groeperingen, paginanamen en nog niet bestaande routes zijn ontwerpkeuzes in dit voorstel. Dit is geen opdracht om ze al te bouwen, publiceren of activeren. Bestaande werkende routes blijven behouden; routeverwijzingen hieronder zijn geen verklaring dat de bijbehorende functie al beschikbaar is.

## 1 Hoofdnavigatie

De hoofdnavigatie heeft deze vaste volgorde:

**Over BESC · Creators · Esports & Gaming · Events · Community · Samenwerkingen · Media & Impact**

Home is bereikbaar via het BESC-logo. Mijn BESC staat als afzonderlijke accountknop in de header. Merch staat als aanvullende headerlink zodra de catalogus bruikbaar is. Contact staat in het submenu Over BESC en in de footer. Nieuws & BESC-blog staat onder Media & Impact en krijgt een eigen opvallend blok op de homepage.

### Header op brede schermen

De header bestaat uit twee rijen binnen dezelfde rustige vormgeving:

1. Bovenrij: origineel BESC-logo links; rechts Zoeken, Merch indien beschikbaar, Mijn BESC en de themakeuze Systeem/Licht/Donker.
2. Onderste rij: de zeven hoofdrubrieken. Elke rubriek heeft een overzichtspagina en een afzonderlijke knop voor het submenu. De overzichtslink blijft dus ook zonder submenu bereikbaar.

Zoeken is een zoekknop die een gelabeld zoekveld opent. Mijn BESC toont voor bezoekers de aanmeldmogelijkheid en voor aangemelde gebruikers hun persoonlijke overzicht. Een afzonderlijke, rustige optie in het accountmenu laat uitloggen toe. De accountknop kent geen interne Command Center-rechten toe.

De eerste ontwerpgrens voor deze brede header is 1280 CSS-px. Als de labels bij een grotere tekstmaat niet passen, schakelt de header eerder naar de compacte variant; er worden geen rubrieken afgekapt.

### Header op mobiel en tablet

Eén compacte rij met logo, Mijn BESC en een duidelijk gelabelde menuknop. Zoeken, Merch en themakeuze staan bovenaan het geopende menu. Daaronder staan dezelfde zeven rubrieken in dezelfde volgorde.

Het menu gebruikt uitklapbare groepen met een eigen link ‘Bekijk alles’. Een hele rij is geen verborgen hoveractie. Sluiten kan met de sluitknop en Escape; focus keert terug naar de menuknop. Er is geen tweede mobiele bodemnavigatie.

### Submenu’s

| Hoofdrubriek | Volgorde in het submenu |
| --- | --- |
| Over BESC | Overzicht, Missie en waarden, Ons verhaal, Team, De vzw, Steun BESC, Contact |
| Creators | Alle creators, Nu live indien bewezen beschikbaar, Creator aanmelden |
| Esports & Gaming | Overzicht, Esportsorganisaties, Gamingactiviteiten, Meedoen of samenwerken |
| Events | Komende events, Kalender, Voorbije events, Event voorstellen |
| Community | Community ontdekken, Aansluiten, BESC Streamteam, Vrijwilligers, Acties |
| Samenwerkingen | Alle samenwerkingen, Partners, Sponsors, Samenwerken met BESC, Samenwerking voorstellen |
| Media & Impact | Overzicht, Nieuws & BESC-blog, Fotoalbums, Video’s, Impact, Downloads en mediakit, Nieuwsbrief |

Filters zoals ‘Partners’ en ‘Sponsors’ leiden naar dezelfde organisatielijst met een filter. Ze krijgen geen tweede kopie van de profielen. Een bevestigd esportsprofiel verschijnt ook via de esportsingang, met dezelfde canonical detailpagina.

## 2 Volledige pagina hiërarchie

De boom geeft de bezoekersstructuur weer. Een logische onderpagina hoeft niet dezelfde URL-prefix te hebben als de rubriek: `/vrijwilligers` blijft bijvoorbeeld behouden onder Community, `/nieuws` onder Media & Impact en `/esports` onder Esports & Gaming. De bestaande technische media-doorvoer onder `/media/{public_media_id}` blijft gereserveerd voor bestanden; de nieuwe media-overzichtspagina gebruikt daarom `/media-en-impact`.

```text
Home /
├── Over BESC /over-besc
│   ├── Missie en waarden /over-besc/missie-en-waarden
│   ├── Ons verhaal /over-besc/ons-verhaal
│   ├── Team /over-besc/team
│   ├── De vzw /over-besc/vzw
│   ├── Steun BESC /steun-besc
│   └── Contact /contact
├── Creators /creators
│   ├── Zoeken en filters op dezelfde overzichtspagina
│   ├── Nu live als filter op dezelfde overzichtspagina
│   ├── Creatorprofiel /creators/{slug}
│   └── Creator aanmelden /creators/aanmelden
├── Esports & Gaming /esports
│   ├── Esportsorganisaties als filter op /samenwerkingen
│   ├── Gamingactiviteiten /esports/activiteiten
│   └── Meedoen of samenwerken /esports/meedoen
├── Events /events
│   ├── Kalender als weergave van /events
│   ├── Voorbije events /events/archief
│   ├── Eventdetail /events/{slug}
│   │   └── Inschrijven /events/{slug}/inschrijven
│   └── Event voorstellen /events/voorstellen
├── Community /community
│   ├── Aansluiten /community/aansluiten
│   ├── BESC Streamteam /community/streamteam
│   ├── Vrijwilligers /vrijwilligers
│   │   ├── Vacatures /vrijwilligers/vacatures
│   │   └── Vacature /vrijwilligers/vacatures/{slug}
│   │       └── Aanmelden /vrijwilligers/vacatures/{slug}/aanmelden
│   └── Acties /community/acties
│       └── Actiedetail /community/acties/{slug}
│           └── Deelnemen /community/acties/{slug}/deelnemen
├── Samenwerkingen /samenwerkingen
│   ├── Partners en sponsors als afzonderlijke filters
│   ├── Organisatieprofiel /samenwerkingen/{slug}
│   ├── Samenwerken met BESC /samenwerkingen/samenwerken
│   └── Samenwerking voorstellen /samenwerken/aanvragen
├── Media & Impact /media-en-impact
│   ├── Nieuws & BESC-blog /nieuws
│   │   └── Artikel /nieuws/{slug}
│   ├── Fotoalbums /fotoalbums
│   │   └── Album /fotoalbums/{slug}
│   ├── Video’s /videos
│   │   └── Video /videos/{slug}
│   ├── Impact /impact
│   │   └── Jaaroverzicht /impact/{jaar}
│   ├── Downloads /downloads
│   │   └── Downloadinformatie /downloads/{slug}
│   ├── Mediakit /mediakit
│   └── Nieuwsbrief /nieuwsbrief
│       └── Archief /nieuwsbrief/archief
│           └── Editie /nieuwsbrief/archief/{slug}
├── Merch /merch
│   ├── Product en varianten /merch/{slug}
│   ├── Winkelmand /winkelmand
│   ├── Afrekenen /afrekenen
│   ├── Bestelbevestiging /bestelling/bevestiging
│   ├── Levering en retouren /merch/service
│   └── Verkoopvoorwaarden /merch/voorwaarden
├── Mijn BESC /mijn-besc
│   ├── Mijn profiel /mijn-besc/profiel
│   ├── Mijn aanvragen /mijn-besc/aanvragen
│   │   └── Aanvraag /mijn-besc/aanvragen/{id}
│   ├── Mijn deelnames /mijn-besc/deelnames
│   │   └── Deelname /mijn-besc/deelnames/{id}
│   ├── Mijn opdrachten /mijn-besc/opdrachten
│   │   └── Opdracht /mijn-besc/opdrachten/{id}
│   ├── Mijn koppelingen /mijn-besc/koppelingen
│   ├── Mijn toestemmingen /mijn-besc/toestemmingen
│   ├── Mijn bestellingen /mijn-besc/bestellingen
│   │   └── Bestelling /mijn-besc/bestellingen/{id}
│   ├── Bestanden en merkcentrum /mijn-besc/bestanden
│   └── Mijn organisatie /mijn-besc/organisatie
│       ├── Organisatieprofiel /mijn-besc/organisatie/profiel
│       ├── Campagnes /mijn-besc/organisatie/campagnes
│       │   └── Campagne /mijn-besc/organisatie/campagnes/{id}
│       ├── Opdrachten /mijn-besc/organisatie/opdrachten
│       │   ├── Opdracht /mijn-besc/organisatie/opdrachten/{id}
│       │   └── Opdracht indienen /mijn-besc/organisatie/opdrachten/nieuw
│       └── Rapportages /mijn-besc/organisatie/rapportages
│           └── Rapportage /mijn-besc/organisatie/rapportages/{id}
├── Zoeken /zoeken
├── Privacy /privacy
├── Cookies /cookies
├── Gebruiksvoorwaarden /voorwaarden
└── Toegankelijkheid /toegankelijkheid
```

De operationele shop, nieuwsbriefinschrijving en nog niet aangesloten accountfuncties komen pas in het zichtbare menu als hun volledige keten bruikbaar is. De sitemap reserveert hun bestemming, zonder nu een betaalproces, abonnement, koppeling of formulier te activeren.

### Pagina’s met één gezamenlijke bron

| Gegevens | Eén detailpagina | Andere ingangen |
| --- | --- | --- |
| Creator | `/creators/{slug}` | Creatorzoeker, streamteam, eigen deelname aan een event als publicatie daarvan is toegestaan |
| Organisatie | `/samenwerkingen/{slug}` | Partners, sponsors, esportsorganisaties en eventpartners |
| Event | `/events/{slug}` | Kalender, komende events, archief, communityactie met gekoppeld event |
| Nieuwsartikel | `/nieuws/{slug}` | Homepage, categorie, mediaoverzicht en zoekresultaat |
| Download | `/downloads/{slug}` | Artikel, mediakit, event of campagne; privébestanden blijven achter de accountgrens |

Geen aparte `/partners/{slug}`, `/sponsors/{slug}` of tweede esportsdetailpagina maken voor dezelfde organisatie. Jaaroverzichten verwijzen naar bestaande event- en nieuwsdetails. Een campagne kan een eigen actiepagina nodig hebben, maar kopieert niet het event of een privébriefing.

### Reserve voor programma’s

Deze onderdelen staan buiten de actieve sitemap en buiten de navigatie totdat doel, inhoud, doelgroep en beheer bevestigd zijn:

| Onderdeel | Voorziene plek bij latere uitwerking |
| --- | --- |
| Academy | Onder Creators, met een programmaoverzicht en beoordeelde leerinhoud |
| NEXT UP | Onder Creators, met vastgestelde selectie- en deelnamevoorwaarden |
| Originals | Onder Media & Impact, met een overzicht en pagina per reeks of productie |
| Cares | Onder Community, met onderbouwde acties en verwijzingen naar bevestigde impact |
| Toernooien | Onder Esports & Gaming, met verwijzingen naar de bijbehorende eventdetails |

Er worden nu geen publieke reserveroutes of ‘binnenkort’-pagina’s aangemaakt. De namen worden geen claims dat de programma’s al bestaan.

De vaste zichtbare naam is **Nieuws & BESC-blog**: in submenu, overzichtstitel, homepageblok, footer en broodkruimels. De bestaande BESC-blog en te behouden artikelen blijven expliciet onderdeel van deze rubriek. De routes `/nieuws` en `/nieuws/{slug}` blijven behouden.

## 3 Inhoud en hoofdactie per rubriek

| Pagina | Opbouw | Hoofdactie |
| --- | --- | --- |
| Over BESC | Korte introductie; missie en waarden; geschiedenis; team; vzw; manieren om mee te doen | Ontdek de community |
| Creators | Introductie; naamzoeker; filters platform, taal en categorie; resultaatcount; profielkaarten | Ontdek de creators |
| Creatorprofiel | Naam en avatar; bio; toegestane platformlinks; bevestigde badges; optionele actuele live-status; publicatiecontact | Bekijk het kanaal |
| Creator aanmelden | Voorwaarden en uitleg beoordeling; accountcontrole; minimale profielgegevens; toestemming; bevestigde ontvangst | Dien je profiel in |
| Esports & Gaming | Bevestigde positionering; organisaties; actuele gamingactiviteiten; deelname en samenwerking | Bekijk de organisaties |
| Events | Komend programma; lijst/kalenderkeuze; filters type/periode; archieflink | Bekijk een event |
| Eventdetail | Titel en beeld; datum, tijd, locatie, prijs indien bevestigd; programma; bereikbaarheid; toegankelijkheidsinformatie; inschrijfstatus | Inschrijven, alleen indien beschikbaar |
| Community | Wat de community biedt; gedragsverwachtingen; aansluiten; streamteam; vrijwilligers; actuele acties | Sluit je aan |
| Vrijwilligers | Uitleg; taken en verwachtingen; bevestigde vacatures; aanmeldprocedure | Bekijk de vacatures |
| Vacature | Taken; gevraagde beschikbaarheid; voorwaarden; sluitingsmoment; opvolgprocedure | Meld je aan |
| Samenwerkingen | Uitleg samenwerkingstypen; filter; bevestigde organisaties; voorstelprocedure | Stel een samenwerking voor |
| Organisatieprofiel | Origineel logo; goedgekeurde beschrijving; afzonderlijk bevestigde rollen; links; gepubliceerde projecten | Bekijk de samenwerking |
| Media & Impact | Nieuws & BESC-blog; albums; video’s; bevestigde impact; downloads; nieuwsbrief | Lees de verhalen |
| Artikel | Titel; intro; auteur en datum; hoofdbeeld met rechteninformatie; artikel; bijlagen; verwante inhoud | Bekijk gerelateerde inhoud |
| Fotoalbum | Eventcontext; datum; fotoselectie met alt/credit; teruglink naar event; contact voor een afbeeldingsvraag | Bekijk de foto’s |
| Video | Titel; context; stilstaand voorbeeld; bewuste afspeelactie; beschikbare ondertitels en beschrijving | Bekijk de video |
| Impact | Bevestigde projecten en cijfers met periode, bron en betekenis; verwijzingen naar verhalen en jaaroverzichten | Bekijk een jaaroverzicht |
| Downloads en mediakit | Categorie; voorbeeld; naam, versie, formaat en grootte; gebruiksvoorwaarden en zichtbaarheid | Download het toegestane bestand |
| Nieuwsbrief | Inhoud en frequentie zodra vastgesteld; minimale inschrijving; bevestiging; openbare edities; uitschrijven | Schrijf je in |
| Merch | Productkaarten; varianten; actuele beschikbaarheid; leverancier/service-informatie | Bekijk een product |
| Contact | Juiste contactroute; contactgegevens; eigen formulier indien aangesloten; informatie over opvolging | Verstuur je bericht |
| Steun BESC | Bevestigde manieren om te helpen, vrijwilliger te worden of samen te werken; financiële steun alleen met geregelde afhandeling | Kies hoe je wilt helpen |

Filters op het creatoroverzicht bevatten geen volgersranglijst. Een profiel kan meerdere platformen hebben. Regio is optioneel en breed; exacte adressen en privécontactgegevens worden niet gepubliceerd. Publieke statistieken vragen een afzonderlijke inhoudelijke vrijgave en verschijnen niet vanzelf na een YouTube-koppeling.

## 4 Indeling van de homepage

De homepage beantwoordt in deze volgorde: wat is BESC, wat kan ik hier doen, wat gebeurt er binnenkort en hoe kan ik deelnemen? De volledige volgorde hieronder vormt de ontwerpvolgorde. Een voorwaardelijk blok zonder bruikbare inhoud vervalt; er blijft geen leeg vak of misleidende knop staan.

| Volgorde | Blok | Concrete inhoud en indeling | Doorklik |
| --- | --- | --- | --- |
| 1 | Header | Logo, hulpmiddelen en zeven hoofdrubrieken volgens hoofdstuk 1 | Alle hoofdrubrieken |
| 2 | Groot openingsblok | Eén sterke BESC-communityfoto met rustige tekstzone, of een rustige merkachtergrond als geen geschikt beeld is vrijgegeven; korte titel en maximaal twee zinnen introductie | Primair ‘Ontdek de community’; secundair ‘Bekijk de events’ |
| 3 | Kies jouw ingang | Drie compacte kaarten: ‘Ik ben creator’, ‘Ik zoek events’, ‘Ik wil samenwerken’ | `/creators`, `/events`, `/samenwerkingen/samenwerken` |
| 4 | Binnenkort bij BESC | Maximaal drie komende vrijgegeven events met datum, plaats en actuele inschrijfstatus | Eventdetail en ‘Alle events’ |
| 5 | Ontdek onze creators | Maximaal vier profielkaarten, geselecteerd door redactie of transparante roulatie; naam, avatar en platformen; livebadge uitsluitend bij actuele bewezen status | Creatorprofiel en ‘Alle creators’ |
| 6 | Nieuws & BESC-blog | Eén groter recent artikel en twee kleinere kaarten; categorie, datum, korte titel en voorbeeldbeeld | Artikel en ‘Alle nieuws en blogartikelen’ |
| 7 | Dit is BESC | Korte missie en drie bevestigde redenen om deel te nemen; bijvoorbeeld ontmoeten, samenwerken en groeien, als de redactie die tekst goedkeurt | Over BESC |
| 8 | Doe mee | Community en vrijwilligers; maximaal twee concrete ingangen, of één uitgelichte actuele actie met een duidelijke einddatum | Aansluiten, vacatures of actiedetail |
| 9 | Samenwerkingen | Maximaal zes goedgekeurde logo’s op rustige vlakken, met de juiste rolbenaming en link naar het organisatieprofiel | Samenwerkingen |
| 10 | Media en impact | Eén recent album of video en één bevestigde terugblik; cijfers alleen met periode, bron en correcte betekenis | Album, video of impact |
| 11 | Merch | Voorwaardelijk: maximaal drie beschikbare producten met actuele prijs en valuta, alleen als catalogus en bestemming bruikbaar zijn | Merch en productdetail |
| 12 | Nieuwsbrief | Compact blok met naam alleen indien nodig, e-mail, verwijzing naar privacy en uitleg dat bevestiging nodig is | Nieuwsbriefproces |
| 13 | Footer | Herhaalde navigatie, contact, officiële socials en beleidslinks | Zie hoofdstuk 5 |

### Vorm van het openingsblok

Op desktop krijgt de tekst circa de helft tot drie vijfde van het vlak, met beeld daarnaast of achter een gecontroleerde overlay. Op mobiel komt de tekst vóór het ondersteunende beeld. De titel is kort, in Bebas Neue; de intro en knoppen zijn in Montserrat. Rood draagt de hoofdactie, geel blijft een accent. Een geschikte bestaande penseelstreek mag het vlak markeren zonder de tekst te verstoren.

Er is één openingsbeeld: geen carrousel, automatisch wisselende campagne of video met automatisch geluid. De uiteindelijke titel, foto en introductietekst worden redactioneel gekozen; deze sitemap verzint geen officiële slogan.

Een bijzondere actie vervangt tijdelijk het openingsbeeld of blok 8 na inhoudelijke vrijgave; ze voegt geen extra bovenlaag toe. Op een afgeschermde DEV-versie blijft de websiteproef-aanduiding zichtbaar. De uiteindelijke publieke variant krijgt die interne testmelding niet.

### Gedrag bij ontbrekende inhoud

- Geen komende events: toon alleen een korte, eerlijke melding en een link naar het archief als dat inhoud bevat. Geen verzonnen datum of activiteit.
- Geen gepubliceerde creators: laat de profielkaarten weg; toon uitsluitend een creator-aanmeldroute als die werkelijk werkt.
- Geen artikelen, albums, partners of producten: het betreffende blok vervalt. Geen placeholderlogo’s, namaakreviews of voorbeeldproducten.
- Onbekende live-status: geen ‘offline’-label. Verberg het livefilter zolang de statusketen niet bruikbaar is; toon bij een profiel desgewenst een duidelijke niet-beschikbaarstatus.
- Storing in een bron: geen ‘er zijn geen events’-melding. Toon beschikbaarheidsfeedback. Geen oude of ingetrokken inhoud terugzetten als fallback.
- De nieuwsbriefstrook verschijnt pas als bevestigen en uitschrijven end-to-end werken.

## 5 Footer en aanvullende navigatie

De footer bevat vier compacte kolommen op desktop en uitklapbare of gewone gestapelde groepen op mobiel:

| Kolom | Links en inhoud |
| --- | --- |
| BESC | Korte goedgekeurde omschrijving, Over BESC, Team, De vzw, Contact |
| Ontdekken | Creators, Esports & Gaming, Events, Nieuws & BESC-blog |
| Meedoen | Community, Vrijwilligers, Samenwerken, Steun BESC, Merch indien beschikbaar |
| Media en volgen | Fotoalbums, Video’s, Mediakit, Nieuwsbrief; alleen bevestigde officiële sociale kanalen |

De onderste regel bevat privacy, cookies, gebruiksvoorwaarden, toegankelijkheid, cookievoorkeuren indien er een voorkeurenbeheer nodig is, en gecontroleerde vzw-gegevens. Verkoopvoorwaarden en levering/retouren zijn aanvullend zichtbaar bij de shop. Er wordt geen juridische conformiteitsclaim uit een standaardtekst afgeleid.

Op detailpagina’s staat onder de header een broodkruimel, bijvoorbeeld ‘Home › Media & Impact › Nieuws & BESC-blog › Artikeltitel’. De actuele locatie is zichtbaar en voor hulptechnologie gemarkeerd. ‘Terug naar overzicht’ blijft beschikbaar, ook wanneer iemand rechtstreeks op een detailpagina landt.

## 6 Mijn BESC en organisatieomgeving

Mijn BESC is één accountomgeving. Het overzicht toont alleen functies die voor de persoon daadwerkelijk beschikbaar zijn. Geen tweede account voor nieuwsbrief, streamerprofiel of partnerweergave aanmaken. Aanmelden geeft geen automatisch streamteamlidmaatschap, organisatiedelegatie of interne CC-rol.

### Persoonlijke startpagina

De vaste volgorde is: welkom en eigen profielstatus; acties die aandacht vragen; eerstvolgende bevestigde deelnames; eigen open aanvragen; toegewezen opdrachten; snelkoppelingen naar koppelingen, toestemmingen en bestanden. Geen privégegevens op de publieke homepage tonen.

De zij- of sectienavigatie bestaat uit Overzicht, Mijn profiel, Aanvragen, Deelnames, Opdrachten, Koppelingen, Toestemmingen en Bestanden. Bestellingen komt erbij zodra eigen verkoop werkt. Profielwijzigingen zijn voorstellen voor beoordeling; privécontactgegevens blijven gescheiden van de openbare profielvelden.

Mijn koppelingen toont per werkelijk aangesloten platform de accountstatus en toegestane handelingen. De YouTube-creatorkoppeling komt hier pas beschikbaar na afzonderlijke vrijgave. Een nog uitgeschakelde functie krijgt geen werkende of gesuggereerde verbindknop.

### Organisatietoegang

‘Mijn organisatie’ verschijnt alleen bij actuele, expliciete organisatietoegang. De huidige organisatie staat duidelijk bovenaan; een eventuele organisatiekeuze mag geen gegevens van een andere organisatie uitleveren.

De navigatie bevat Overzicht, Organisatieprofiel, Campagnes, Opdrachten en Rapportages. Een briefing indienen is een aanvraag aan BESC; het wordt geen automatisch aanvaarde opdracht. Rapportages zijn pas zichtbaar nadat ze voor die organisatie zijn vrijgegeven. Interne beoordeling, privénotities, gegevens van andere partners en beheerfuncties blijven in Command Center.

De bestaande `/portal`-omgeving blijft tijdens ontwikkeling bereikbaar via de huidige regels. Nieuwe Mijn BESC-pagina’s worden op bestaande functionaliteit aangesloten waar die bruikbaar is; er wordt geen vervangend portaal vanaf nul gebouwd en er vindt geen stilzwijgende verhuizing van bestaande gebruikers plaats.

## 7 Formulieren en hulppagina’s

| Ingang | Na geldige ontvangst | Terugvinden |
| --- | --- | --- |
| Contact | Ontvangstbevestiging op dezelfde formulierroute | Eigen aanvraag alleen als daar een passende accountbinding voor bestaat |
| Creator aanmelden | Bevestigde profielaanvraag | Mijn BESC › Aanvragen en Mijn profiel |
| Samenwerking voorstellen | Ontvangen samenwerkingsdossier | Mijn BESC › Aanvragen |
| Vacature aanmelden | Ontvangen sollicitatie | Mijn BESC › Aanvragen |
| Event voorstellen | Ontvangen voorstel, nog geen publicatie | Mijn BESC › Aanvragen |
| Eventinschrijving of actiedeelname | Aanvraag of bevestiging volgens de vastgestelde voorwaarden; verschil zichtbaar | Mijn BESC › Deelnames |
| Partneropdracht indienen | Ontvangen briefing, nog geen aanvaarding | Mijn organisatie › Opdrachten |
| Nieuwsbrief | Bevestigingsmail aangevraagd; abonnement pas bevestigd na de bevestigingsstap | Aparte bevestig-/uitschrijfroute |
| Merchbestelling | Alleen een bevestigde order na het daadwerkelijke bestelproces; betaalstatus apart | Mijn BESC › Bestellingen indien aan account gebonden |

Formulieren behouden de ingevulde gegevens bij een fout. Aanvragen krijgen geen succesmelding op basis van alleen een klik of verstuurd verzoek. Anonieme versus ingelogde intake wordt per bestaand contract gevolgd; deze structuur opent geen nieuwe anonieme schrijfmogelijkheid.

Aanmelden blijft `/login`. De bestaande Auth-callback, uitloggen, wachtwoordherstel en eventuele herstelschermen blijven technische systeempagina’s volgens de bestaande applicatie. Alleen relevante links verschijnen op de aanmeldpagina; ze staan niet in het publieke hoofdmenu. Een veilige terugkeer na aanmelden neemt de bezoeker terug naar de bedoelde toegestane handeling.

Daarnaast zijn er duidelijke schermen voor niet gevonden, tijdelijk niet beschikbaar, geen toegang, verlopen of ingetrokken inhoud en een gesloten inschrijving. Bevestigingen, accountpagina’s, zoekresultaten en systeemroutes horen niet in een publieke zoekmachine-sitemap.

## 8 Zoekfunctie en filters

De algemene zoekpagina `/zoeken` doorzoekt uitsluitend actuele openbare, vrijgegeven inhoud: pagina’s, nieuws, events, creators, organisaties, albums en downloadinformatie zodra die bronnen beschikbaar zijn. Ze doorzoekt geen privébestanden, contactgegevens, aanvragen, rapportages of Command Center-notities.

Resultaten tonen type, titel en korte context. Typefilters en paginering blijven via deelbare queryparameters bruikbaar. De URL kan bijvoorbeeld `/zoeken?q=streamen&type=nieuws` zijn. De zoekpagina wordt pas in de header opgenomen als de zoekfunctie werkt; een browserzoekveld is geen vervanging.

Het eventoverzicht gebruikt dezelfde gegevens voor lijst en kalender. Creatorfilters, livefilter en partnerrollen blijven queryfilters op de canonieke lijst; filtercombinaties maken geen aparte contentpagina’s. Filteren bewaart waar mogelijk de keuze bij terugkeer vanaf een detail.

## 9 Stijl en componenten

Het bestaande BESC-logo, zwart/rood/geel, Bebas Neue voor krachtige korte koppen en Montserrat voor leestekst blijven behouden. Definitieve merkmasters en officiële kleurwaarden worden vóór productie met het originele merkpakket vergeleken. De stijlgids bevat ontwerpwaarden, geen vrijgave om logo’s te herkleuren.

Dezelfde structuur werkt in Systeem, Licht en Donker. Een donkere fotoheader kan ook in de lichte modus donker blijven. Achter tabellen en formulieren staan rustige vlakken. Componenten gebruiken gedeelde kleurrollen en herkenbare toestanden voor laden, fout, succes en uitgeschakeld.

Inhoudsvlakken volgen als ontwerpgrondslag maximaal circa 1200 px; langere artikelen circa 760 px. De indeling schakelt van meerkoloms op breed scherm naar één kolom op mobiel. Hero, kaarten en submenu’s krijgen voldoende ademruimte; essentiële informatie is niet uitsluitend bij hover zichtbaar.

Publieke downloadkaarten kunnen een goedgekeurd afbeeldingsvoorbeeld tonen. De op 11 november genoteerde wens voor afbeeldingpreview bij hover en extra linksoorten in een dossier is een apart Command Center-werkpunt. Deze sitemap voert dat niet uit. Een latere preview werkt ook met toetsenbord en op touch, bijvoorbeeld via focus en een expliciete voorbeeldknop.

## 10 Inhoudsbeheer en beschikbaarheid

Command Center beheert per pagina de titel, slug, samenvatting, tekst, beelden en rechteninformatie, taal, verantwoordelijke, revisie, navigatieplek en publicatie. Detailverzamelingen zoals nieuws, events, creators en organisaties gebruiken hun eigen bestaande inhoudsmodellen. Menu’s verwijzen naar deze bronnen; ze worden geen vrij veld voor willekeurige routes of een tweede feitenregister.

Concept, beoordeling, goedkeuring, publicatie en archivering blijven gescheiden. Een nieuwe revisie erft geen automatische publicatiegoedkeuring. Alleen actuele vrijgegeven velden verschijnen op de website. Intrekken stopt ook de bijbehorende navigatielink, kaarten en media volgens de bestaande publicatiegrens. Een lege oudergroep blijft niet zichtbaar zonder inhoudelijke bestemming.

Privacyteksten, financiële claims, partnerrollen, aantallen, testimonials en beelden worden niet opgevuld met verzonnen voorbeelden. De laatste notities over Gmail, Google Contacts en Drive horen bij de interne ecosysteemplanning; deze sitemap verandert die koppelingen of hun opslag niet.

## 11 Routebehoud en migratie

Behoud de bestaande routes `/`, `/nieuws`, `/nieuws/{slug}`, `/events`, `/events/{slug}`, `/creators`, `/creators/{slug}`, `/samenwerkingen`, `/samenwerkingen/{slug}`, `/esports`, `/vrijwilligers`, `/mijn-besc`, `/over-besc`, `/contact` en `/privacy`, plus de bestaande aanmeld- en intakepaden. Het pad `/samenwerken/aanvragen` blijft bewust behouden hoewel de menugroep ‘Samenwerkingen’ heet.

De sitemap is een bezoekershiërarchie. Ze schrijft geen implementatiewijziging aan bestandsdoorvoer, API’s of callbacks voor. De website ontvangt geen beheersleutels in de browser. Website en Command Center houden aparte repositories, builds en uitrol; de bot blijft afzonderlijk.

| Historische inhoud | Nieuwe bestemming in dit ontwerp |
| --- | --- |
| Oude homepage en geschiedenis | Home plus Over BESC › Ons verhaal |
| Het team | Over BESC › Team |
| Vacatures en vacatureformulier | Community › Vrijwilligers, met bestaande vacature- en aanmeldroutes |
| Samenwerkingen en esportslogo’s | Samenwerkingen; per organisatie de afzonderlijk bevestigde rol; esportsfilter gebruikt dezelfde bron |
| Blog en checklistpagina’s | Nieuws & BESC-blog; bijbehorende downloads onder Downloads |
| Eventkalender en evenementvoorstellen | Events; voorstelroute en archief |
| Historische streamathons en TwitchConpagina’s | Eventarchief; aanvullende verhalen bij Nieuws & BESC-blog en bevestigde resultaten bij Impact |
| Foto-album en Google Photos-verwijzingen | Fotoalbums, pas na overdracht van toegestane originele bestanden |
| Mediakit en Drive-downloadverwijzingen | Mediakit en Downloads met versie, rechten en zichtbaarheid |
| Nieuwsbriefformulier | Nieuwsbrief met bevestiging en uitschrijven; geen stilzwijgende abonnementsimport |
| Jersey en andere shopproducten | Merch, met bevestigd product, leverancier en afhandeling |
| Contact en privacy | Contact en Privacy na inhoudelijke controle |

Het register met 98 historische URL-records blijft de migratiecontrole. Elke oude URL krijgt een afzonderlijke bestemming, inhoudsbesluit en eventuele redirect. Deze globale bestemmingstabel voert geen import of redirect uit en vervangt geen beoordeling van de oude broninhoud.

Expliciete routes zoals `aanmelden`, `archief`, `voorstellen`, `samenwerken`, `nieuw`, `service` en `voorwaarden` worden voor hun toepasselijke verzamelingen gereserveerd, zodat dynamische slugs geen routeconflict veroorzaken. Detailpagina’s gebruiken hun eigen canonieke URL; interne aanvraag-ID’s zijn geen publieke profielen.

## 12 Ontwikkelvolgorde en zichtbare menu’s

| Stap | Concrete uitwerking | Voorwaarde om zichtbaar te worden |
| --- | --- | --- |
| 1 Structuur en shell | Header met twee rijen, compact menu, footer, broodkruimels, thema’s en inhoudelijke navigatieconfiguratie | Mobiel/toetsenbord/themecontrole; behoud bestaande sessie- en publicatiegrens |
| 2 Publieke basis | Home, Over BESC, Contact, Nieuws & BESC-blog, Events en benodigde beleidsinformatie | Actuele inhoud vrijgegeven; formulieren alleen wanneer hun keten gereed is; publieke opening blijft een afzonderlijk besluit |
| 3 Community en platformpresentatie | Creators, Streamteam, Esports, Samenwerkingen, Vrijwilligers, vacatures en Mijn BESC-ingangen | Bestaande toegangen en bouw hergebruikt; inhoud, toestemming en rollen gecontroleerd; geen automatische activering |
| 4 Media en redactionele verdieping | Albums, video’s, downloads, mediakit en bevestigde impact | Originele bestanden, rechten, credits, toegangsgrenzen en inhoud beschikbaar |
| 5 Operationele aanvullingen | Zoekfunctie, nieuwsbrief, volledige merchafhandeling, aanvullende deelnames en organisatieomgeving | Elke betrokken keten afzonderlijk end-to-end aanvaard; bestaande portaalfuncties hergebruikt |
| 6 Programma’s | Eventuele Academy, NEXT UP, Originals, Cares en toernooien | Afzonderlijke inhoudelijke beslissing; geen lege programmeeropdracht of programmabelofte |

Dit zijn afhankelijkheden binnen de websiteontwikkeling, geen wijziging van de huidige ecosysteemvolgorde of nieuwe deadlines. Er worden nu geen live gegevens toegevoegd, functies aangezet of website-/serverwijzigingen uitgevoerd.

### Controlelijst voor de websiteontwikkelstap

- Haal deze referentie op vóór pagina’s, navigatie of homepage verder worden gebouwd.
- Vergelijk de sitemap met de op dat moment bestaande routes en publicatiecontracten; documenteer afwijkingen in deze referentie.
- Koppel elke zichtbare link aan een werkende toegestane bestemming; geen lege placeholderpagina’s.
- Controleer hoofdmenu, compact menu, footer en broodkruimels op dezelfde namen en volgorde.
- Controleer login-terugkeer, eigen aanvragen en organisatierechten zonder persoonsgegevens publiek te maken.
- Controleer homepagevolgorde, ontbreken van inhoud, intrekking, storing en eventuele uitgeschakelde functies.
- Controleer beide thema’s, 320/390/768/1280/1440 CSS-px, tekstzoom, toetsenbord, focus en verminderde beweging.
- Gebruik geen verzonnen actuele cijfers, sponsors, evenementen, creators, prijzen of programma’s als opvulling.
- Laat publieke vindbaarheid, indexering, inhoudsmigratie en productieomschakeling afzonderlijk vrijgeven.

## 13 Bronnen en terugvinden

Deze uitwerking concretiseert de oorspronkelijke brede websitescope en stijlgids van 3 oktober, de F2-inhoudsafspraken, de F4-routevoorbereiding en Linda’s notitie van 11 november over de ontbrekende volledige indeling. Historische opleverdocumenten behouden hun eigen datum; dit ontwerp bewijst geen actuele activering van een websitefunctie.

- Oorspronkelijke scope: `D:/CODING/besc-website/docs/scope.md`.
- Stijlgids: `D:/CODING/besc-website/docs/stijlgids.md`.
- Historische inhoudsinventaris: `D:/CODING/besc-website/website-inhoud-2026-10-03/inventaris.md`.
- [Ontwikkelplanning vanaf pakket 9](Ontwikkelplanning-vanaf-pakket-9.md).
- [F2 website en inhoud](../f2/Website-en-inhoud.md).
- [F4 routes en bouwvolgorde](../f4/Routes-en-bouwvolgorde.md).
- [F4 afgebakende DEV-oplevering](../f4/Afronding-DEV-20261024.md).
- [F6 publieke websitevoorbereiding](../f6/Publieke-website-voorbereiding.md).

Terughaalopdracht voor een latere chat: **‘Haal de BESC-website sitemap van 12 november 2026 op en gebruik die als basis voor de websiteontwikkeling.’**
