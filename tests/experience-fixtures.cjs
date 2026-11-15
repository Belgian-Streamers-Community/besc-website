// Isolated fixtures only. This module is never imported by application code.
const {readFileSync}=require('node:fs');
const {join}=require('node:path');
const fixtureId=n=>'00000000-0000-4000-8000-'+String(n).padStart(12,'0');
const source=JSON.parse(readFileSync(join(__dirname,'../docs/f2/contracts/fixtures.json'),'utf8')).fixtures.filter(x=>x.expected_valid).map(x=>x.payload);
const publishedAt='2026-01-01T12:00:00Z';
function pageFixture(slug,title=slug){return {schema_version:'besc-platform-publication-v1',type:'page',public_id:fixtureId(800+slugs.indexOf(slug)),revision:1,published_at:publishedAt,valid_until:null,slug,locale:'nl-BE',title:'TESTFIXTURE — '+title,summary:'TESTFIXTURE — NIET PUBLICEREN — lokaal voorbeeld',body:{format:'plain_text',value:'TESTFIXTURE — NIET PUBLICEREN — deze inhoud is uitsluitend voor lokale controles.'},navigation:true,links:[],hero:null};}
const slugs=['home','over-besc','missie-en-waarden','ons-verhaal','team','vzw','steun-besc','community','aansluiten','streamteam','acties','gamingactiviteiten','esports-meedoen','samenwerken','media-en-impact','fotoalbums','fotoalbum-lokaal','videos','video-lokaal','impact','jaaroverzicht-2026','downloads','download-checklist','mediakit','contact','privacy','cookies','voorwaarden','toegankelijkheid','event-voorstellen'];
const creatorFixture={schema_version:'besc-platform-publication-v1',type:'creator',public_id:fixtureId(901),revision:1,published_at:publishedAt,valid_until:null,slug:'testfixture-creator',locale:'nl-BE',display_name:'TESTFIXTURE creator',bio:'TESTFIXTURE — uitsluitend een nagebootst profiel',disciplines:['Gaming'],languages:['Nederlands'],platform_links:[{platform:'twitch',url:'https://www.twitch.tv/testfixture'}],avatar:null};
const partnerFixture={schema_version:'besc-platform-publication-v1',type:'partner',public_id:fixtureId(902),revision:1,published_at:publishedAt,valid_until:null,slug:'testfixture-partner',locale:'nl-BE',name:'TESTFIXTURE partner',description:'TESTFIXTURE — NIET PUBLICEREN',roles:['community'],website_url:null,logo:null};
function experienceFixture(){
 const items=source.map(item=>item.type==='event'?{...item,starts_at:'2030-06-15T12:00:00Z',ends_at:'2030-06-15T14:00:00Z'}:item);
 const past={...items.find(i=>i.type==='event'),public_id:fixtureId(903),slug:'testfixture-archief',title:'TESTFIXTURE — historisch event',starts_at:'2020-06-15T12:00:00Z',ends_at:'2020-06-15T14:00:00Z'};
 return {experience:true,items:[...items,past],revoked:false,denied:false,unavailable:false,authRevoked:false,pages:slugs.map(slug=>pageFixture(slug)),creators:[creatorFixture],partners:[partnerFixture],ownRevoked:false,
  ownCreator:{lease_id:fixtureId(910),profile_id:fixtureId(911),revision:0,may_view:true,purposes:[{id:fixtureId(912),text_version:1,title:'TESTFIXTURE persoonlijke veldkeuze',body:'TESTFIXTURE — NIET PUBLICEREN',allowed_scope:{fields:['display_name','bio']},retention_policy:'TESTFIXTURE lokale proef'}],consents:[],revisions:[],entries:[]},
  ownIntake:{schema_version:'besc-intake-own-v1',lease_id:fixtureId(913),forms:[],applications:[{id:fixtureId(914),title:'TESTFIXTURE eigen aanvraag',category:'partnership',version:1,status:'received',created_at:publishedAt,updated_at:publishedAt}]},
  ownDelegations:{schema_version:'besc-delegation-own-v1',lease_id:fixtureId(915),delegations:[],proposals:[]}};
}

module.exports={fixtureId,publishedAt,pageFixture,creatorFixture,partnerFixture,experienceFixture};
