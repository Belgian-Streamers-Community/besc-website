import {NextResponse} from 'next/server';
import {viewerToken} from '@/lib/auth';
import {commandCenterOrigin} from '@/lib/deployment-config';
import {experienceEnabled,websiteFeatures} from '@/lib/website-experience';
export const dynamic='force-dynamic';
/** A navigation handoff only. Never forward a session, key, account id or access id. */
export async function GET(request:Request){
 const headers={'Cache-Control':'private, no-store, max-age=0','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'no-referrer'};
 if(!experienceEnabled()||!websiteFeatures(process.env).staging||process.env.BESC_WEBSITE_EXISTING_PORTAL_ENABLED!=='true')return new Response(null,{status:404,headers});
 if(new URL(request.url).search)return new Response(null,{status:400,headers});
 await viewerToken(undefined,'/mijn-besc/portaal');
 const target=new URL('/portal',commandCenterOrigin(process.env));
 return NextResponse.redirect(target,{status:303,headers});
}
