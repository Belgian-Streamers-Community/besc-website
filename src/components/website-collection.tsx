'use client';
import {navigationSchema,type WebsiteNavigation} from '@/lib/website-experience';
import {useWebsiteResource} from './website-resource';
export function WebsiteCollection({initial,path,heading=true}:{initial:WebsiteNavigation;path:string;heading?:boolean}){
  const data=useWebsiteResource(initial,'/api/website/navigation',navigationSchema);
  const group=data?.groups.find(g=>g.href===path);
  if(!data)return <p role="status">Dit overzicht kon niet opnieuw worden gecontroleerd.</p>;
  const children=group?.children.filter(c=>c.href!==path)??[];
  return <section className="protected-content">{heading?<h1>{group?.label??'Overzicht'}</h1>:<h2>Verder ontdekken</h2>}{data.unavailable&&<p role="status">Een deel van de paginabron is momenteel niet beschikbaar.</p>}<div className="entry-grid">{children.map(link=><a className="entry-card" href={link.href} key={link.href}><h3>{link.label}</h3><span aria-hidden="true">↗</span></a>)}</div></section>;
}
