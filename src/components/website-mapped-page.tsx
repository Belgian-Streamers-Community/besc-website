import {WebsitePageChildren} from "./website-page-children";
import {websiteCollection} from "@/lib/website-data";
import {collectionRoots} from "@/lib/website-experience";
import {notFound} from 'next/navigation';
import {websitePageSource} from '@/lib/website-structure';
import {websiteCatalog} from '@/lib/website-data';
import {Shell} from './shell';
import {SitePageView} from './site-page-view';
import {WebsiteCollection} from './website-collection';
export async function WebsiteMappedPage({route,locale='nl-BE'}:{route:string;locale?:string}){
  const source=websitePageSource(route);if(!source||process.env.BESC_SITE_PAGES_ENABLED!=='true'||locale!=='nl-BE')notFound();
  const catalog=await websiteCatalog(),page=catalog.items.find(p=>p.slug===source&&p.locale===locale),group=catalog.navigation.groups.find(g=>g.href===route);
  const collection=(collectionRoots as readonly string[]).includes(route)?await websiteCollection(route):null;
  if(!page&&!group&&!collection?.items.length){if(catalog.unavailable)return <Shell><section className="state"><h1>Deze pagina is tijdelijk niet beschikbaar</h1><p>De actuele bron kon niet worden gecontroleerd.</p></section></Shell>;notFound();}
  return <Shell>{page&&<SitePageView initial={page} path={'pages/'+source} query={'?locale='+encodeURIComponent(locale)}/>} {collection&&<WebsitePageChildren initial={collection} path={route} heading={!page&&!group}/>} {group&&<WebsiteCollection initial={catalog.navigation} path={route} heading={!page}/>}</Shell>;
}
