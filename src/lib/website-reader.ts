import type {PagePublication} from './site-content-contract';
import type {F2Publication} from './contract';
import type {CreatorPublication} from './creator-contract';
import type {PartnerPublication} from './partner-contract';
import {buildWebsiteNavigation,selectHomeEvents,type WebsiteFeatures,type WebsiteCard,type WebsiteHome,type WebsiteSearch} from './website-experience';
import {websitePagePath} from './website-structure';
export type WebsiteReaderPort={
  pages(cursor?:string):Promise<{items:PagePublication[];next_cursor:string|null}>;
  news():Promise<{items:F2Publication[];next_cursor:string|null}>;
  events():Promise<{items:F2Publication[];next_cursor:string|null}>;
  creators():Promise<{items:CreatorPublication[];next_cursor:string|null}>;
  partners():Promise<{items:PartnerPublication[];next_cursor:string|null}>;
};
export const homeCard=(item:F2Publication):WebsiteCard=>({type:item.type,public_id:item.public_id,slug:item.slug,title:item.title,summary:item.summary,published_at:item.published_at,image:item.media[0]??null,starts_at:item.type==='event'?item.starts_at:null,ends_at:item.type==='event'?item.ends_at:null,location:item.type==='event'?item.location_label:null});
/** Bounded metadata inventory. No source body is imported, rewritten or published. */
export async function readWebsiteCatalog(port:WebsiteReaderPort,features:WebsiteFeatures){
  const items=new Map<string,PagePublication>();let incomplete=false,unavailable=false;
  if(features.pages){let cursor:string|undefined;const seen=new Set<string>();
    try{for(let n=0;n<3;n++){
      const page=await port.pages(cursor);
      for(const item of page.items){if(item.locale!=='nl-BE'||Date.parse(item.published_at)>Date.now()||(item.valid_until&&Date.parse(item.valid_until)<=Date.now()))continue;const previous=items.get(item.slug);if(previous&&(previous.public_id!==item.public_id||previous.revision!==item.revision))throw Error('Conflicting publication');items.set(item.slug,item);}
      if(!page.next_cursor)break;
      if(seen.has(page.next_cursor))throw Error('Repeated cursor');seen.add(page.next_cursor);cursor=page.next_cursor;if(n===2)incomplete=true;
    }}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;items.clear();unavailable=true;}
  }
  return {items:[...items.values()],incomplete,unavailable,navigation:buildWebsiteNavigation([...items.values()],features,incomplete,unavailable)};
}
export async function readWebsiteHome(port:WebsiteReaderPort,features:WebsiteFeatures,now=Date.now()):Promise<WebsiteHome>{
  const catalog=await readWebsiteCatalog(port,features);
  const state=async<T,>(enabled:boolean,read:()=>Promise<T>)=>{if(!enabled)return {state:'disabled' as const,items:[]};try{return {state:'ready' as const,items:await read()};}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;return {state:'unavailable' as const,items:[]};}};
  const [news,events,creators,partners]=await Promise.all([
    state(true,async()=>(await port.news()).items.filter(item=>item.type==='news').map(homeCard).sort((a,b)=>Date.parse(b.published_at)-Date.parse(a.published_at)).slice(0,3)),
    state(true,async()=>selectHomeEvents((await port.events()).items.map(homeCard),now)),
    state(features.creators,async()=>(await port.creators()).items.slice(0,4)),
    state(features.partners,async()=>(await port.partners()).items.slice(0,6)),
  ]);
  return {page:catalog.items.find(p=>p.slug==='home')??null,pageState:catalog.unavailable?'unavailable':features.pages?'ready':'disabled',events:events.items as WebsiteCard[],eventsState:events.state,news:news.items as WebsiteCard[],newsState:news.state,creators:creators.items as CreatorPublication[],creatorsState:creators.state,partners:partners.items as PartnerPublication[],partnersState:partners.state,navigation:catalog.navigation};
}
export async function readWebsiteSearch(port:WebsiteReaderPort,features:WebsiteFeatures,query:string,type='all'):Promise<WebsiteSearch>{
  const catalog=await readWebsiteCatalog(port,features);let incomplete=catalog.incomplete,unavailable=catalog.unavailable;
  const found:WebsiteSearch['items']=catalog.items.filter(p=>p.slug!=='home').map(p=>({title:p.title,summary:p.summary,href:websitePagePath(p.slug)??'/'+p.slug,type:'page'}));
  const tasks:[string,boolean,()=>Promise<{items:unknown[];next_cursor:string|null}>][]=[['news',true,()=>port.news()],['event',true,()=>port.events()],['creator',features.creators,()=>port.creators()],['partner',features.partners,()=>port.partners()]];
  await Promise.all(tasks.filter(([kind,on])=>on&&(type==='all'||kind===type)).map(async([kind,,read])=>{
    try{const page=await read();if(page.next_cursor)incomplete=true;
      for(const row of page.items){const p=row as {slug:string;title:string;summary:string;display_name:string;bio?:string;name:string;description:string};const title=kind==='creator'?p.display_name:kind==='partner'?p.name:p.title;found.push({title,summary:kind==='creator'?p.bio??'':kind==='partner'?p.description:p.summary,href:(kind==='news'?'/nieuws/':kind==='event'?'/events/':kind==='creator'?'/creators/':'/samenwerkingen/')+p.slug,type:kind as WebsiteSearch['items'][number]['type']});}
    }catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;unavailable=true;}
  }));
  const terms=query.toLocaleLowerCase('nl-BE').split(/\s+/).filter(Boolean);
  const items=found.filter(row=>(type==='all'||row.type===type)&&terms.every(term=>(row.title+' '+row.summary).toLocaleLowerCase('nl-BE').includes(term))).sort((a,b)=>a.title.localeCompare(b.title,'nl-BE'));
  if(items.length>50)incomplete=true;
  return {items:items.slice(0,50),incomplete,unavailable};
}
