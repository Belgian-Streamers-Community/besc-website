'use client';
import {collectionSchema,type WebsiteCollectionData} from '@/lib/website-experience';
import {useWebsiteResource} from './website-resource';
export function WebsitePageChildren({initial,path,heading=true}:{initial:WebsiteCollectionData;path:string;heading?:boolean}){
 const data=useWebsiteResource(initial,'/api/website/collection?'+new URLSearchParams({root:path}),collectionSchema);
 if(!data)return <p role="status">Dit overzicht kon niet opnieuw worden gecontroleerd.</p>;
 return <section className="protected-content">{heading?<h1>{data.title}</h1>:data.items.length>0&&<h2>In dit overzicht</h2>}{data.unavailable&&<p role="status">De actuele inhoud is tijdelijk niet beschikbaar.</p>}{data.incomplete&&<p role="status">Er zijn meer bronpagina’s dan hier geladen.</p>}<div className="grid">{data.items.map(p=><article className="card" key={p.href}>{p.hero&&<img src={'/page-media/'+p.hero.public_media_id} alt={p.hero.alt} width="640" height="360" loading="lazy"/>}<h2><a href={p.href}>{p.title}</a></h2><p>{p.summary}</p></article>)}</div></section>;
}
