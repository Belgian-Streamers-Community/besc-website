import {experienceEnabled} from "@/lib/website-experience";
import {websitePageSource} from "@/lib/website-structure";
import {WebsiteMappedPage} from "@/components/website-mapped-page";
import {publicMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {Shell} from '@/components/shell';
import {SitePageView} from '@/components/site-page-view';
import {pages} from '@/lib/site-content-data';
import {ContentFailure} from '@/lib/content';
export const dynamic='force-dynamic';
export default async function Page({params,searchParams}:{params:Promise<{path:string[]}>;searchParams:Promise<{locale?:string}>}){
 const {path}=await params,{locale='nl-BE'}=await searchParams;if(experienceEnabled()&&locale==='nl-BE'&&websitePageSource('/'+path.join('/')))return <WebsiteMappedPage route={'/'+path.join('/')} locale={locale}/>;
 if(path.length!==1||!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(path[0])||process.env.BESC_SITE_PAGES_ENABLED!=='true')notFound();const query='?locale='+encodeURIComponent(locale);let data;
 try{data=await pages('pages/'+path[0],query);}catch(e){if(!(e instanceof ContentFailure))throw e;if(e.status===404)notFound();return <Shell><meta name="robots" content="noindex, nofollow"/><section className="state"><h1>Deze pagina is nu niet beschikbaar</h1><p>De actuele inhoud en toegang konden niet worden bevestigd.</p></section></Shell>;}
 return <Shell><SitePageView initial={data} path={'pages/'+path[0]} query={query}/></Shell>;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{path:string[]}>;searchParams:Promise<{locale?:string}>}){return publicMetadata('/'+(await params).path.join('/'),await searchParams);}
