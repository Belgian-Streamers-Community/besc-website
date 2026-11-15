# BESC Website

Afzonderlijke private repository voor de eigen BESC-website. Command Center blijft eigenaar van inhoud en publicatiewerkstromen; de Discordbot heeft zijn eigen repository.

F2-uitvoering is door Linda goedgekeurd op 22 oktober 2026; bouw en geïsoleerde tests zijn uitgevoerd. Live DEV-inrichting en acceptatie volgen gecontroleerd. De staginglocatie is website-dev.belgianstreamerscommunity.be op BESCSRVDEV. De bestaande publieke website blijft staan.

Het [F2-pakket](docs/f2/README.md) bevat scope, acht werkpakketten, contracten, 69 geplande acceptatieproeven en het uitvoeringsmandaat. De website-app is gebouwd en geïsoleerd getest; er is nog geen DEV-deploy uitgevoerd. Server-/DNS-toegang en de concrete testerbinding zijn nog te controleren.

Actuele stand en bewijsgrenzen: [F2-uitvoering](docs/f2/Uitvoering-20261022.md).

## Lokale websitepakketten 18–20

Navigatie, homepage, publieke CMS-routes, Nieuws & BESC-blog, creators en het eigen overzicht zijn lokaal uitgebreid. De nieuwe presentatie staat standaard uit (`BESC_WEBSITE_EXPERIENCE_ENABLED=false`). Zie [uitvoering en bewijsgrenzen](docs/website/Uitvoering-pakketten18-20.md) en de [opgeslagen sitemap](docs/website/Sitemap-navigatie-en-homepage.md). De bestaande bron-, account- en publicatiecontroles blijven gelden. Er zijn geen live inhoud, koppelingen of serverinstellingen gewijzigd.

`pnpm test:experience` controleert de nieuwe presentatie met nagebootste bronnen, naast de bestaande `pnpm test:e2e`. Beide browserproeven gebruiken een expliciet ingestelde, tijdelijke `F2_FIXTURE_STATE`; het testproces roept geen echte BESC-bron aan.
