import './mock-upstreams.mjs';
import {readFileSync} from 'node:fs';
const fallback=globalThis.fetch;
globalThis.fetch=async(input,init)=>{
 const url=new URL(input instanceof Request?input.url:String(input));
 if(url.origin==='https://cc-dev.belgianstreamerscommunity.be'&&url.pathname.startsWith('/api/v1/platform/')){
  const state=JSON.parse(readFileSync(process.env.F2_FIXTURE_STATE,'utf8'));
  if(!state.experience)return fallback(input,init);
  const headers=new Headers(init?.headers??(input instanceof Request?input.headers:undefined));
  if(headers.get('X-BESC-Publication-Key')!==process.env.BESC_PUBLICATION_KEY||!headers.get('Authorization')?.startsWith('Bearer '))return new Response(null,{status:401});
  if(state.denied)return new Response(null,{status:403});if(state.unavailable)return new Response(null,{status:503});
  const path=url.pathname.slice('/api/v1/platform/'.length);
  if(['me','intake','representation'].includes(path))return state.ownRevoked?new Response(null,{status:403}):Response.json(path==='me'?state.ownCreator:path==='intake'?state.ownIntake:state.ownDelegations);
  if(path==='publications/pages'||path.startsWith('publications/pages/')){
   const items=state.revoked?[]:state.pages;
   if(path==='publications/pages')return Response.json({schema_version:'besc-platform-publication-v1',items,next_cursor:null});
   const file=items.find(p=>p.slug===path.slice('publications/pages/'.length));return file?Response.json(file):new Response(null,{status:404});
  }
  if(path==='publications/creators'||path.startsWith('publications/creators/')){
   let items=state.revoked?[]:state.creators;
   for(const key of ['search','platform','language','discipline']){const value=url.searchParams.get(key);if(!value)continue;items=items.filter(p=>key==='search'?p.display_name.toLowerCase().includes(value.toLowerCase()):key==='platform'?p.platform_links?.some(l=>l.platform===value):key==='language'?p.languages?.includes(value):p.disciplines?.includes(value));}
   if(path==='publications/creators')return Response.json({schema_version:'besc-platform-publication-v1',items,next_cursor:null});
   const file=items.find(p=>p.slug===path.slice('publications/creators/'.length));return file?Response.json(file):new Response(null,{status:404});
  }
  if(path==='publications/partners'||path.startsWith('publications/partners/')){
   const role=url.searchParams.get('role');const items=(state.revoked?[]:state.partners).filter(p=>!role||p.roles.includes(role));
   if(path==='publications/partners')return Response.json({schema_version:'besc-platform-publication-v1',items,next_cursor:null});
   const file=items.find(p=>p.slug===path.slice('publications/partners/'.length));return file?Response.json(file):new Response(null,{status:404});
  }
  if(path==='publications/vacancies')return Response.json({schema_version:'besc-platform-publication-v1',items:[],next_cursor:null});
  return new Response(null,{status:404});
 }
 return fallback(input,init);
};
