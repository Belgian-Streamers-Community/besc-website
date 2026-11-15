'use client';
import {searchSchema,type WebsiteSearch} from '@/lib/website-experience';
import {useWebsiteResource} from './website-resource';
const labels={all:'Alles',page:'Pagina',news:'Nieuws & BESC-blog',event:'Event',creator:'Creator',partner:'Samenwerking'};
export function WebsiteSearchResults({initial,query,type}:{initial:WebsiteSearch;query:string;type:string}){
  const result=useWebsiteResource(initial,'/api/website/search?'+new URLSearchParams({q:query,type}),searchSchema);
  if(!result)return <p className="notice" role="status">De zoekresultaten konden niet opnieuw worden gecontroleerd. <a href={'/zoeken?'+new URLSearchParams({q:query,type})}>Opnieuw zoeken</a></p>;
  return <section className="protected-content"><h2>{result.items.length} gevonden op deze selectie</h2>{result.unavailable&&<p role="status">Een of meer bronnen zijn tijdelijk niet beschikbaar. Het resultaat is onvolledig.</p>}{result.incomplete&&<p role="status">Er zijn meer bronpagina’s dan in deze zoekronde geladen. Zoek verder in het betreffende overzicht.</p>}{!result.items.length?<p>{result.unavailable?'Er kunnen nu geen volledige resultaten worden getoond.':'Geen resultaten voor deze zoekopdracht in de geladen inhoud.'}</p>:<ul className="search-results">{result.items.map(item=><li key={item.href}><p className="eyebrow">{labels[item.type]}</p><h3><a href={item.href}>{item.title}</a></h3><p>{item.summary}</p></li>)}</ul>}</section>;
}
