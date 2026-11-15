'use client';
import {useEffect,useState} from 'react';
import {EventCalendar} from './event-calendar';
import type {F2Publication} from '@/lib/contract';
type Data={items:F2Publication[];next_cursor:string|null}|F2Publication;
const date=(v:string)=>new Intl.DateTimeFormat('nl-BE',{dateStyle:'long',timeStyle:'short',timeZone:'Europe/Brussels'}).format(new Date(v));
function Card({item}:{item:F2Publication}){return <article className="card"><p className="eyebrow">{item.type==='event'?'Event':'Nieuws & BESC-blog'}</p><h2><a href={(item.type==='event'?'/events/':'/nieuws/')+item.slug}>{item.title}</a></h2><p>{item.summary}</p>{item.type==='event'&&<p className="date">{date(item.starts_at)}</p>}<a className="more" href={(item.type==='event'?'/events/':'/nieuws/')+item.slug}>Lees verder <span aria-hidden="true">↗</span></a></article>;}
export function ContentView({initial,path,title,view,period}:{initial:Data;path:string;title:string;view?:string;period?:string}){
 const [source,setData]=useState<Data|null>(initial),[status,setStatus]=useState('');
 useEffect(()=>{let alive=true,controller:AbortController|null=null,inFlight=false;
  const hide=()=>{document.documentElement.dataset.protected='true';setData(null);setStatus('De inhoud wordt opnieuw gecontroleerd.');};
  const check=async()=>{if(inFlight)return;inFlight=true;controller=new AbortController();const timeout=setTimeout(()=>controller?.abort(),5000);
   try{const r=await fetch('/api/content/'+path,{cache:'no-store',credentials:'same-origin',redirect:'error',signal:controller.signal});if(!r.ok)throw Error('unavailable');const next=await r.json();if(alive&&document.visibilityState==='visible'){delete document.documentElement.dataset.protected;setData(next);setStatus('');}}
   catch{if(alive){setData(null);setStatus('Deze inhoud is niet meer beschikbaar of kon niet opnieuw worden gecontroleerd. Vernieuw de pagina om opnieuw te proberen.');}}
   finally{clearTimeout(timeout);inFlight=false;}
  };
  const visibility=()=>{if(document.visibilityState==='hidden'){controller?.abort();hide();}else{hide();void check();}};
  const resume=()=>{hide();void check();};
  const offline=()=>{controller?.abort();hide();};
  const timer=setInterval(()=>{if(document.visibilityState==='visible')void check();},20000);
  document.addEventListener('visibilitychange',visibility);window.addEventListener('pageshow',resume);window.addEventListener('pagehide',hide);window.addEventListener('focus',resume);window.addEventListener('offline',offline);if(document.visibilityState==='hidden')hide();else void check();
  return()=>{alive=false;controller?.abort();clearInterval(timer);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pageshow',resume);window.removeEventListener('pagehide',hide);window.removeEventListener('focus',resume);window.removeEventListener('offline',offline);};
 },[path]);
 let data=source;
 if(!data)return <section className="state" aria-live="polite"><h1>Even niet beschikbaar</h1><p>{status}</p><a href="/">Terug naar home</a></section>;
 if('items'in data&&period){const now=Date.now();data={...data,items:data.items.filter(item=>item.type==='event'&&(period==='archive'?Date.parse(item.ends_at)<now:Date.parse(item.ends_at)>=now))};}
 if('items'in data)return <section className="protected-content"><div className="section-head"><p className="eyebrow">BESC · Community</p><h1>{title}</h1>{period&&<nav className="event-display" aria-label="Eventweergave"><a href="/events" aria-current={period==='upcoming'&&view!=='calendar'?'page':undefined}>Lijst</a><a href="/events?weergave=kalender" aria-current={view==='calendar'?'page':undefined}>Kalender</a><a href="/events/archief" aria-current={period==='archive'?'page':undefined}>Voorbije events</a></nav>}</div>{!data.items.length?<div className="state"><h2>Geen resultaten in dit overzicht</h2><p>Hier verschijnen alleen beoordeelde en vrijgegeven berichten uit deze geladen pagina.</p></div>:view==='calendar'?<EventCalendar items={data.items}/>:<div className="grid">{data.items.map(item=><Card key={item.public_id} item={item}/>)}</div>}{data.next_cursor&&<a className="button" href={(period==='archive'?'/events/archief':path.startsWith('events')?'/events':'/nieuws')+'?cursor='+encodeURIComponent(data.next_cursor)+(view==='calendar'?'&weergave=kalender':'')}>Meer bekijken</a>}</section>;
 return <article className="article protected-content"><a className="back" href={data.type==='event'?'/events':'/nieuws'}>← Alle {data.type==='event'?'events':'nieuws en blogartikelen'}</a><p className="eyebrow">{data.type==='event'?'BESC · Event':'Nieuws & BESC-blog'}</p><h1>{data.title}</h1>{data.type==='news'&&<p className="article-date">Gepubliceerd <time dateTime={data.published_at}>{date(data.published_at)}</time></p>}<p className="lead">{data.summary}</p>{data.type==='event'&&<dl className="event-meta"><div><dt>Wanneer</dt><dd>{date(data.starts_at)} – {date(data.ends_at)}</dd></div><div><dt>Waar</dt><dd>{data.location_label}</dd></div></dl>}{data.media.map(m=><figure key={m.public_media_id}><img src={'/media/'+m.public_media_id} alt={m.alt}/>{m.credit&&<figcaption>{m.credit}</figcaption>}</figure>)}<div className="prose" dangerouslySetInnerHTML={{__html:data.body.value}}/>{data.type==='event'&&data.registration_url&&<a className="button" href={data.registration_url} rel="noopener noreferrer" target="_blank">Meer informatie en inschrijven</a>}</article>;
}
