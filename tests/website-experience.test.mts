import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {websiteLoader} from './helpers/website-loader.mts';
import {experienceFixture,pageFixture,creatorFixture} from './experience-fixtures.cjs';
import * as structure from '../src/lib/website-structure.ts';
import type {WebsiteReaderPort} from '../src/lib/website-reader';
import type {WebsiteFeatures} from '../src/lib/website-experience';
const load=websiteLoader(),model=load('src/lib/website-experience.ts') as typeof import('../src/lib/website-experience');
const reader=load('src/lib/website-reader.ts') as typeof import('../src/lib/website-reader');
const features:WebsiteFeatures={pages:true,creators:true,partners:true,vacancies:true,intake:true,contact:true,delegation:true,staging:true};
function fixture(){const data=experienceFixture(),calls:string[]=[];const port:WebsiteReaderPort={pages:async(cursor)=>{calls.push('pages:'+String(cursor));return {items:data.pages,next_cursor:null} as never;},news:async()=>{calls.push('news');return {items:data.items.filter(i=>i.type==='news'),next_cursor:null} as never;},events:async()=>{calls.push('events');return {items:data.items.filter(i=>i.type==='event'),next_cursor:null} as never;},creators:async()=>{calls.push('creators');return {items:data.creators,next_cursor:null} as never;},partners:async()=>{calls.push('partners');return {items:data.partners,next_cursor:null} as never;}};return {data,calls,port};}
test('Website 18-20: default off and production cannot reuse private creator/partner/account contracts',()=>{
 assert.equal(model.experienceEnabled({}),false);assert.equal(model.experienceEnabled({BESC_WEBSITE_EXPERIENCE_ENABLED:'true'}),true);
 const f=model.websiteFeatures({BESC_PUBLIC_WEBSITE_ENABLED:'true',BESC_CREATOR_PLATFORM_ENABLED:'true',BESC_PARTNER_PLATFORM_ENABLED:'true',BESC_PLATFORM_INTAKE_ENABLED:'true',BESC_WEBSITE_STAGING_ENABLED:'true'});assert.equal(f.creators,false);assert.equal(f.partners,false);assert.equal(f.staging,false);assert.equal(f.intake,false);
});
test('Website navigation: seven ordered groups, correct blog naming and no speculative programme links',async()=>{
 const f=fixture();const result=await reader.readWebsiteCatalog(f.port,features);assert.deepEqual(Array.from(result.navigation.groups,g=>g.label),structure.websiteGroups.map(g=>g.label));const links=result.navigation.groups.flatMap(g=>g.children);assert.ok(links.some(l=>l.label==='Nieuws & BESC-blog'&&l.href==='/nieuws'));assert.ok(result.navigation.footer.some(l=>l.href==='/privacy'));assert.ok(!JSON.stringify(result.navigation).match(/Academy|NEXT UP|Originals|Cares|nieuwsbrief|winkelmand|bestellingen/));
});
test('Website navigation: no unreleased CMS pages, disabled feature links or empty parent groups',async()=>{
 const f=fixture();f.data.pages=[];const result=await reader.readWebsiteCatalog(f.port,{...features,pages:false,creators:false,partners:false,vacancies:false,intake:false,contact:false,delegation:false});assert.deepEqual(Array.from(result.navigation.groups,g=>g.label),['Events','Media & Impact']);assert.ok(!f.calls.length);assert.ok(!JSON.stringify(result.navigation).includes('/creators'));
});
test('Website catalog: bounded page cursor traversal, duplicates and loops never become a false complete inventory',async()=>{
 const f=fixture();let calls=0;f.port.pages=async()=>{calls++;return {items:[],next_cursor:'cursor'+calls};};const result=await reader.readWebsiteCatalog(f.port,features);assert.equal(calls,3);assert.equal(result.incomplete,true);
 f.port.pages=async()=>({items:[pageFixture('team')] as never,next_cursor:'same'});const loop=await reader.readWebsiteCatalog(f.port,features);assert.equal(loop.unavailable,true);assert.equal(loop.items.length,0);
});
test('Website catalog: rejects contradictory versions, expired and scheduled pages; source failure clears old pages',async()=>{
 const f=fixture();const p=pageFixture('team');f.port.pages=async()=>({items:[p,{...p,revision:2}] as never,next_cursor:null});assert.equal((await reader.readWebsiteCatalog(f.port,features)).unavailable,true);
 f.port.pages=async()=>({items:[{...p,valid_until:'2000-01-01T00:00:00Z'},{...p,slug:'vzw',published_at:'2200-01-01T00:00:00Z'}] as never,next_cursor:null});assert.equal((await reader.readWebsiteCatalog(f.port,features)).items.length,0);
 f.port.pages=async()=>{throw Error('revoked');};assert.equal((await reader.readWebsiteCatalog(f.port,features)).items.length,0);
});
test('Homepage: upcoming events only, max three articles, four creators and six organizations; no own data port exists',async()=>{
 const f=fixture();const home=await reader.readWebsiteHome(f.port,features,Date.parse('2026-11-15'));assert.equal(home.events.length,1);assert.equal(home.events[0].slug,'testfixture-event');assert.ok(home.news.length<=3);assert.ok(home.creators.length<=4);assert.ok(home.partners.length<=6);assert.ok(model.homeSchema.safeParse(home).success);assert.ok(!f.calls.some(c=>/me|intake|representation/.test(c)));
});
test('Homepage: unavailable differs from empty and never restores an old article',async()=>{
 const f=fixture();f.port.news=async()=>{throw Error('unavailable');};const home=await reader.readWebsiteHome(f.port,features);assert.equal(home.newsState,'unavailable');assert.equal(home.news.length,0);assert.equal(home.eventsState,'ready');assert.equal(home.pageState,'ready');
});
test('Homepage: disabled profiles perform no source reads and no fake authors, follower rankings or live status are invented',async()=>{
 const f=fixture();const home=await reader.readWebsiteHome(f.port,{...features,creators:false,partners:false});assert.equal(home.creatorsState,'disabled');assert.equal(home.creators.length,0);assert.ok(!f.calls.includes('creators'));assert.ok(!f.calls.includes('partners'));assert.ok(!JSON.stringify(home).match(/live_status|follower_count|author_email/));
});
test('Website search: includes only publication ports, filters types and reports truncated/unavailable sources',async()=>{
 const f=fixture();const result=await reader.readWebsiteSearch(f.port,features,'TESTFIXTURE','creator');assert.equal(result.items.length,1);assert.equal(result.items[0].href,'/creators/testfixture-creator');assert.ok(!f.calls.includes('news'));assert.ok(!JSON.stringify(result).includes('eigen aanvraag'));
 f.port.news=async()=>({items:[] as never,next_cursor:'next'});f.port.partners=async()=>{throw Error('unavailable');};const partial=await reader.readWebsiteSearch(f.port,features,'TESTFIXTURE');assert.equal(partial.incomplete,true);assert.equal(partial.unavailable,true);
});
test('Website return paths: private external redirects and encoded bypasses are rejected',()=>{
 assert.equal(structure.safeWebsiteReturn('/mijn-besc/profiel#toestemmingen'),'/mijn-besc/profiel#toestemmingen');
 for(const url of ['https://evil.test','//evil.test','/api/website/account','/auth/callback','/login','/mijn-besc/%2f%2fevil','/mijn-besc/../../evil','/mijn-besc\\evil','/mijn-besc/%252fevil'])assert.equal(structure.safeWebsiteReturn(url),'/',url);
});
test('Sitemap aliases preserve one source/profile and never route media delivery through a generic page',()=>{
 for(const [path,slug]of Object.entries(structure.pageSources)){assert.equal(structure.websitePageSource(path),slug);assert.equal(structure.websitePagePath(slug),path);}
 assert.equal(structure.websitePageSource('/fotoalbums/lokaal'),'fotoalbum-lokaal');assert.equal(structure.websitePagePath('fotoalbum-lokaal'),'/fotoalbums/lokaal');for(const path of ['/media/file','/api/x','/auth/callback','/fotoalbums/../private'])assert.equal(structure.websitePageSource(path),null);
 const crumbs=structure.websiteBreadcrumbs('/nieuws/voorbeeld','Voorbeeld');assert.equal(crumbs.map(c=>c.label).join(' > '),'Home > Media & Impact > Nieuws & BESC-blog > Voorbeeld');
});
test('Real homepage render retains ordered sections, avoids invented defaults and uses canonical profiles',async()=>{
 const f=fixture();const home=await reader.readWebsiteHome(f.port,features);const Home=load('src/components/website-home.tsx').WebsiteHomeView as React.ComponentType<{initial:unknown}>;const html=renderToStaticMarkup(React.createElement(Home,{initial:home}));
 for(const href of ['/creators/testfixture-creator','/nieuws/testfixture-nieuws','/samenwerkingen/testfixture-partner'])assert.ok(html.includes(href),href);
 const order=['Kies jouw ingang','Binnenkort bij BESC','Ontdek onze creators','Nieuws &amp; BESC-blog','Dit is BESC','Doe mee','Samenwerkingen','Media en impact'];let previous=-1;for(const heading of order){const found=html.indexOf(heading,previous+1);assert.ok(found>previous,heading);previous=found;}assert.ok(!html.includes('TESTFIXTURE eigen aanvraag'));assert.ok(!html.includes('volgers'));
});
test('Fixture content conforms to real page, creator, partner and own-account contracts',()=>{
 const f=experienceFixture();for(const page of f.pages)assert.ok((load('src/lib/site-content-contract.ts') as typeof import('../src/lib/site-content-contract')).pagePublicationSchema.safeParse(page).success,page.slug);
 assert.ok(model.homeSchema.shape.creators.safeParse([creatorFixture]).success);assert.ok((load('src/lib/creator-contract.ts') as typeof import('../src/lib/creator-contract')).creatorOwnSchema.safeParse(f.ownCreator).success);assert.ok((load('src/lib/intake-contract.ts') as typeof import('../src/lib/intake-contract')).intakeOwnSchema.safeParse(f.ownIntake).success);assert.ok((load('src/lib/delegation-contract.ts') as typeof import('../src/lib/delegation-contract')).delegationOwnSchema.safeParse(f.ownDelegations).success);
});
test('New website API: default off performs no reads; invalid search/collection/owner query cannot dispatch',async()=>{
 let reads=0;const deps={'@/lib/website-data':{websiteCatalog:async()=>{reads++;return {};},websiteHome:async()=>{reads++;return {};},websiteSearch:async()=>{reads++;return {};},websiteCollection:async()=>{reads++;return {};}},'@/lib/account-overview-data':{readAccountOverview:async()=>{reads++;return {};}}};
 const off=websiteLoader(deps)('src/app/api/website/[kind]/route.ts').GET as (request:Request,context:unknown)=>Promise<Response>;
 assert.equal((await off(new Request('https://fixture.test/api/website/account'),{params:Promise.resolve({kind:'account'})})).status,404);assert.equal(reads,0);
 const on=websiteLoader(deps,{BESC_WEBSITE_EXPERIENCE_ENABLED:'true'})('src/app/api/website/[kind]/route.ts').GET as typeof off;
 for(const [kind,query]of [['account','?owner=another'],['search','?q=x'],['search','?q=valid&type=private'],['collection','?root=https://evil.test'],['collection','?root=/fotoalbums&root=/downloads']]){const response=await on(new Request('https://fixture.test/api/website/'+kind+query),{params:Promise.resolve({kind})});assert.ok([400,404].includes(response.status));assert.ok(response.headers.get('cache-control')?.includes('no-store'));}assert.equal(reads,0);
});
test('Account overview: verified actor before own read, minimal summaries and revoked source never reuses prior data',async()=>{
 const f=experienceFixture(),calls:string[]=[];let denied=false;
 const deps={'./auth':{viewerToken:async()=>{calls.push('actor');}},'./creator-data':{ownCreator:async()=>{calls.push('creator');if(denied)throw Error('revoked');return f.ownCreator;}},'./intake-data':{ownIntake:async()=>{calls.push('intake');if(denied)throw Error('revoked');return f.ownIntake;}},'./delegation-data':{ownDelegations:async()=>{calls.push('delegation');return f.ownDelegations;}}};
 const env={BESC_WEBSITE_EXPERIENCE_ENABLED:'true',BESC_WEBSITE_STAGING_ENABLED:'true',BESC_CREATOR_PLATFORM_ENABLED:'true',BESC_PLATFORM_INTAKE_ENABLED:'true',BESC_PARTNER_DELEGATION_ENABLED:'true'};
 const run=websiteLoader(deps,env)('src/lib/account-overview-data.ts').readAccountOverview as ()=>Promise<import('../src/lib/account-overview').AccountOverviewData>;
 const result=await run();assert.equal(calls[0],'actor');assert.equal(result.applications[0].title,'TESTFIXTURE eigen aanvraag');assert.ok(!JSON.stringify(result).includes('persoonlijke veldkeuze'));assert.ok(!JSON.stringify(result).includes('lease_id'));denied=true;const revoked=await run();assert.equal(revoked.profile,'unavailable');assert.equal(revoked.profileStatus,null);assert.equal(revoked.applications.length,0);
 const closed=websiteLoader(deps,{...env,BESC_PUBLIC_WEBSITE_ENABLED:'true'})('src/lib/account-overview-data.ts').readAccountOverview as typeof run;calls.length=0;await assert.rejects(closed());assert.equal(calls.length,0);
});
test('Existing portal handoff: off/public/unknown query refuses before auth; approved target receives no credentials or identifiers',async()=>{
 let actors=0,redirects=0;const deps={'@/lib/auth':{viewerToken:async()=>{actors++;return 'TESTFIXTURE-token-do-not-forward';}},'next/server':{NextResponse:{redirect:(url:URL,init:ResponseInit)=>{redirects++;return new Response(null,{...init,headers:{...init.headers,Location:url.href}});}}}};
 const env={BESC_WEBSITE_EXPERIENCE_ENABLED:'true',BESC_WEBSITE_STAGING_ENABLED:'true',BESC_WEBSITE_EXISTING_PORTAL_ENABLED:'true'};
 const handler=(config:Record<string,string>)=>websiteLoader(deps,config)('src/app/mijn-besc/portaal/route.ts').GET as (request:Request)=>Promise<Response>;
 for(const config of [{},{...env,BESC_WEBSITE_EXISTING_PORTAL_ENABLED:'false'},{...env,BESC_PUBLIC_WEBSITE_ENABLED:'true'}])assert.equal((await handler(config)(new Request('https://website.fixture/mijn-besc/portaal'))).status,404);
 assert.equal((await handler(env)(new Request('https://website.fixture/mijn-besc/portaal?next=https://evil.test'))).status,400);assert.equal(actors,0);
 const response=await handler(env)(new Request('https://website.fixture/mijn-besc/portaal'));assert.equal(response.status,303);assert.equal(response.headers.get('location'),'https://cc-dev.belgianstreamerscommunity.be/portal');assert.equal(response.headers.get('referrer-policy'),'no-referrer');assert.ok(response.headers.get('cache-control')?.includes('no-store'));assert.equal(actors,1);assert.equal(redirects,1);assert.ok(!JSON.stringify([...response.headers]).includes('TESTFIXTURE-token'));
 await assert.rejects(handler({...env,BESC_CC_URL:'https://evil.test'})(new Request('https://website.fixture/mijn-besc/portaal')));assert.equal(redirects,1);
});
test('Resource lease: late response cannot restore previous actor data after focus/offline, even when transport ignores abort',async()=>{
 const values:unknown[]=[],listeners=new Map<string,()=>void>(),requests:{resolve:(response:Response)=>void;signal:AbortSignal}[]=[];let cleanup:(()=>void)|undefined;
 const events={addEventListener:(name:string,fn:()=>void)=>listeners.set(name,fn),removeEventListener:(name:string)=>listeners.delete(name)};
 const document={...events,visibilityState:'visible',documentElement:{dataset:{protected:'true'} as Record<string,string>}};
 const mocks={react:{useState:()=>[null,(value:unknown)=>values.push(value)],useEffect:(effect:()=>()=>void)=>{cleanup=effect();}}};
 const schema={safeParse:(value:unknown)=>({success:true,data:value})};
 const run=websiteLoader(mocks,{}, {document,window:events,navigator:{onLine:true},AbortController,setTimeout:()=>0,clearTimeout:()=>{},setInterval:()=>0,clearInterval:()=>{},fetch:(_path:string,init:RequestInit)=>new Promise<Response>(resolve=>requests.push({resolve,signal:init.signal as AbortSignal}))})('src/components/website-resource.ts').useWebsiteResource as (initial:unknown,path:string,schema:unknown)=>void;
 const flush=()=>new Promise(resolve=>setImmediate(resolve));
 try{
  run({actor:'old'},'/api/website/account',schema);assert.equal(requests.length,1);listeners.get('focus')!();assert.equal(requests[0].signal.aborted,true);requests[0].resolve(Response.json({actor:'old'}));await flush();assert.equal(requests.length,2);assert.ok(!values.some(v=>v&&typeof v==='object'&&(v as {actor:string}).actor==='old'));
  requests[1].resolve(Response.json({actor:'new'}));await flush();assert.ok(values.some(v=>v&&typeof v==='object'&&(v as {actor:string}).actor==='new'));
  listeners.get('focus')!();assert.equal(requests.length,3);listeners.get('offline')!();requests[2].resolve(Response.json({actor:'stale-after-offline'}));await flush();assert.equal(values.at(-1),null);assert.ok(!values.some(v=>v&&typeof v==='object'&&(v as {actor:string}).actor==='stale-after-offline'));
 }finally{cleanup?.();}
});
