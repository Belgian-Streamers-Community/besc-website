import {notFound} from 'next/navigation';
import {Shell} from '@/components/shell';
import {experienceEnabled,searchTypes} from '@/lib/website-experience';
import {websiteSearch} from '@/lib/website-data';
import {WebsiteSearchResults} from '@/components/website-search';
export const dynamic='force-dynamic';
export const metadata={robots:{index:false,follow:false}};
export default async function Page({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
  if(!experienceEnabled())notFound();const params=await searchParams;const q=typeof params.q==='string'?params.q.trim():'',type=typeof params.type==='string'?params.type:'all';
  const valid=q.length>=2&&q.length<=80&&searchTypes.includes(type as typeof searchTypes[number])&&Object.entries(params).every(([key,value])=>['q','type'].includes(key)&&!Array.isArray(value));
  const initial=valid?await websiteSearch(q,type):null;
  return <Shell><h1>Zoeken</h1><p>Zoek in vrijgegeven pagina’s, nieuws, events en beschikbare profielen.</p><form className="creator-filters" role="search" method="get"><label>Zoekterm<input type="search" name="q" required minLength={2} maxLength={80} defaultValue={q}/></label><label>Onderdeel<select name="type" defaultValue={type}>{[['all','Alles'],['page','Pagina’s'],['news','Nieuws & BESC-blog'],['event','Events'],['creator','Creators'],['partner','Samenwerkingen']].map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label><button className="button">Zoeken</button></form>{initial?<WebsiteSearchResults initial={initial} query={q} type={type}/>:<p role="status">Vul een zoekterm van 2 tot 80 tekens in en kies een onderdeel.</p>}</Shell>;
}
