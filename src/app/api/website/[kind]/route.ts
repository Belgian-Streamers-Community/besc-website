import {readAccountOverview} from "@/lib/account-overview-data";
import {experienceEnabled,searchTypes,collectionRoots} from '@/lib/website-experience';
import {websiteCatalog,websiteHome,websiteSearch,websiteCollection} from '@/lib/website-data';
export const dynamic='force-dynamic';
export async function GET(request:Request,{params}:{params:Promise<{kind:string}>}){
  const headers={'Cache-Control':'private, no-store, max-age=0','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff'};
  if(!experienceEnabled())return new Response(null,{status:404,headers});
  const {kind}=await params,url=new URL(request.url);
  try{
    if(kind==='account'&&!url.search)return Response.json(await readAccountOverview(),{headers});
    if(kind==='navigation'&&!url.search)return Response.json((await websiteCatalog()).navigation,{headers});
    if(kind==='home'&&!url.search)return Response.json(await websiteHome(),{headers});
    if(kind==='collection'){const root=url.searchParams.get('root');if(!root||!(collectionRoots as readonly string[]).includes(root)||[...url.searchParams.keys()].some(key=>key!=='root')||url.searchParams.getAll('root').length!==1)return new Response(null,{status:400,headers});return Response.json(await websiteCollection(root),{headers});}
    if(kind==='search'){
      const q=(url.searchParams.get('q')??'').trim(),type=url.searchParams.get('type')??'all';
      if(q.length<2||q.length>80||!searchTypes.includes(type as typeof searchTypes[number])||[...url.searchParams.keys()].some(k=>!['q','type'].includes(k)||url.searchParams.getAll(k).length>1))return new Response(null,{status:400,headers});
      return Response.json(await websiteSearch(q,type),{headers});
    }
    return new Response(null,{status:404,headers});
  }catch(error){return new Response(null,{status:error instanceof Error&&error.message==='NEXT_REDIRECT'?401:503,headers});}
}
