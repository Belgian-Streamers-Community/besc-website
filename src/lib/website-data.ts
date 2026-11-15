import {websitePagePath} from "./website-structure";
import 'server-only';
import {cache} from 'react';
import {content,ContentFailure} from './content';
import {pages} from './site-content-data';
import {creators} from './creator-data';
import {partners} from './partner-data';
import {experienceEnabled,websiteFeatures,homeSchema,searchSchema,collectionSchema} from './website-experience';
import {readWebsiteCatalog,readWebsiteHome,readWebsiteSearch,type WebsiteReaderPort} from './website-reader';
export function websiteReadPort():WebsiteReaderPort {
  const list=async(path:string)=>{const data=await content(path,'?locale=nl-BE&limit=50');if(!('items'in data))throw new ContentFailure(503);return data;};
  return {
    pages:async(cursor)=>{const data=await pages('pages','?locale=nl-BE&limit=50'+(cursor?'&cursor='+encodeURIComponent(cursor):''));if(!('items'in data))throw new ContentFailure(503);return data;},
    news:()=>list('news'),events:()=>list('events'),
    creators:async()=>{const data=await creators('creators','?locale=nl-BE');if(!('items'in data))throw new ContentFailure(503);return data;},
    partners:async()=>{const data=await partners('partners','?locale=nl-BE');if(!('items'in data))throw new ContentFailure(503);return data;},
  };
}
export const websiteCatalog=cache(async()=>{
  if(!experienceEnabled())throw new ContentFailure(404);
  return readWebsiteCatalog(websiteReadPort(),websiteFeatures(process.env));
});
export async function websiteHome(){if(!experienceEnabled())throw new ContentFailure(404);return homeSchema.parse(await readWebsiteHome(websiteReadPort(),websiteFeatures(process.env)));}
export async function websiteSearch(query:string,type:string){if(!experienceEnabled())throw new ContentFailure(404);return searchSchema.parse(await readWebsiteSearch(websiteReadPort(),websiteFeatures(process.env),query,type));}

export async function websiteCollection(root:string){const catalog=await websiteCatalog();return collectionSchema.parse({title:({'/fotoalbums':'Fotoalbums','/videos':'Video’s','/impact':'Impact','/downloads':'Downloads','/community/acties':'Acties','/over-besc':'Over BESC','/community':'Community','/esports':'Esports & Gaming','/samenwerkingen':'Samenwerkingen'} as Record<string,string>)[root]??'Overzicht',items:catalog.items.filter(page=>page.navigation).map(page=>({...page,href:websitePagePath(page.slug)})).filter(page=>page.href?.startsWith(root+'/')).slice(0,50).map(page=>({title:page.title,summary:page.summary,href:page.href,hero:page.hero})),incomplete:catalog.incomplete,unavailable:catalog.unavailable});}
