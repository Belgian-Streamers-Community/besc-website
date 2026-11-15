/** Visitor routes are separate from CMS slugs. Existing flat URLs stay valid. */
export const newsLabel = 'Nieuws & BESC-blog';
export const websiteGroups:ReadonlyArray<{label:string;href:string;children:ReadonlyArray<readonly [string,string]>}> = [
  {label:'Over BESC',href:'/over-besc',children:[['Overzicht','/over-besc'],['Missie en waarden','/over-besc/missie-en-waarden'],['Ons verhaal','/over-besc/ons-verhaal'],['Team','/over-besc/team'],['De vzw','/over-besc/vzw'],['Steun BESC','/steun-besc'],['Contact','/contact']]},
  {label:'Creators',href:'/creators',children:[['Alle creators','/creators'],['Creator aanmelden','/creators/aanmelden']]},
  {label:'Esports & Gaming',href:'/esports',children:[['Overzicht','/esports'],['Esportsorganisaties','/samenwerkingen?role=esports'],['Gamingactiviteiten','/esports/activiteiten'],['Meedoen of samenwerken','/esports/meedoen']]},
  {label:'Events',href:'/events',children:[['Komende events','/events'],['Kalender','/events?weergave=kalender'],['Voorbije events','/events/archief'],['Event voorstellen','/events/voorstellen']]},
  {label:'Community',href:'/community',children:[['Community ontdekken','/community'],['Aansluiten','/community/aansluiten'],['BESC Streamteam','/community/streamteam'],['Vrijwilligers','/vrijwilligers'],['Acties','/community/acties']]},
  {label:'Samenwerkingen',href:'/samenwerkingen',children:[['Alle samenwerkingen','/samenwerkingen'],['Partners','/samenwerkingen?groep=partners'],['Sponsors','/samenwerkingen?role=sponsor'],['Samenwerken met BESC','/samenwerkingen/samenwerken'],['Samenwerking voorstellen','/samenwerken/aanvragen']]},
  {label:'Media & Impact',href:'/media-en-impact',children:[['Overzicht','/media-en-impact'],[newsLabel,'/nieuws'],['Fotoalbums','/fotoalbums'],['Video’s','/videos'],['Impact','/impact'],['Downloads','/downloads'],['Mediakit','/mediakit']]},
] as const;
export const pageSources:Record<string,string> = {
  '/over-besc':'over-besc','/over-besc/missie-en-waarden':'missie-en-waarden','/over-besc/ons-verhaal':'ons-verhaal','/over-besc/team':'team','/over-besc/vzw':'vzw','/steun-besc':'steun-besc',
  '/community':'community','/community/aansluiten':'aansluiten','/community/streamteam':'streamteam','/community/acties':'acties',
  '/esports/activiteiten':'gamingactiviteiten','/esports/meedoen':'esports-meedoen','/samenwerkingen/samenwerken':'samenwerken',
  '/media-en-impact':'media-en-impact','/fotoalbums':'fotoalbums','/videos':'videos','/impact':'impact','/downloads':'downloads','/mediakit':'mediakit',
  '/contact':'contact','/privacy':'privacy','/cookies':'cookies','/voorwaarden':'voorwaarden','/toegankelijkheid':'toegankelijkheid','/events/voorstellen':'event-voorstellen',
};
const collections:Record<string,string>={'fotoalbums':'fotoalbum','videos':'video','downloads':'download','impact':'jaaroverzicht','community/acties':'actie'};
export function websitePageSource(path:string):string|null {
  if(pageSources[path])return pageSources[path];
  for(const [route,prefix]of Object.entries(collections)){
    const tail=path.slice(route.length+2);
    if(path.startsWith('/'+route+'/')&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tail)&&tail.length<=100)return prefix+'-'+tail;
  }
  return null;
}
export function websitePagePath(slug:string):string|null {
  const direct=Object.entries(pageSources).find(([,source])=>source===slug);if(direct)return direct[0];
  for(const [route,prefix]of Object.entries(collections))if(slug.startsWith(prefix+'-')&&slug.length>prefix.length+1)return '/'+route+'/'+slug.slice(prefix.length+1);
  return null;
}
export function websiteBreadcrumbs(path:string,title?:string){
  const crumbs:{label:string;href:string}[]=[{label:'Home',href:'/'}];
  if(path==='/')return crumbs;
  const group=websiteGroups.find(g=>path===g.href||path.startsWith(g.href+'/')||g.children.some(([,href])=>href===path))??(path.startsWith('/nieuws')||['/fotoalbums','/videos','/impact','/downloads','/mediakit'].some(p=>path===p||path.startsWith(p+'/'))?websiteGroups[6]:path.startsWith('/vrijwilligers')?websiteGroups[4]:undefined);
  if(path.startsWith('/mijn-besc'))crumbs.push({label:'Mijn BESC',href:'/mijn-besc'});
  else if(group)crumbs.push({label:group.label,href:group.href});
  if(path.startsWith('/nieuws'))crumbs.push({label:newsLabel,href:'/nieuws'});
  for(const [root,label]of [['/fotoalbums','Fotoalbums'],['/videos','Video’s'],['/impact','Impact'],['/downloads','Downloads'],['/community/acties','Acties'],['/mijn-besc/aanvragen','Mijn aanvragen'],['/mijn-besc/organisaties','Mijn organisatie']])if(path.startsWith(root+'/'))crumbs.push({label,href:root});
  const known=websiteGroups.flatMap(g=>g.children).find(([,href])=>href===path)?.[0]??Object.entries({profiel:'Mijn profiel',aanvragen:'Mijn aanvragen',organisaties:'Mijn organisatie'}).find(([key])=>path==='/mijn-besc/'+key)?.[1];
  if(crumbs.at(-1)?.href!==path)crumbs.push({label:title??known??'Detail',href:path});
  return crumbs;
}
export function safeWebsiteReturn(value:unknown):string {
  if(typeof value!=='string'||value.length>600||!value.startsWith('/')||value.startsWith('//')||/[\\\x00-\x20]|%(?:2f|5c|25)/i.test(value))return '/';
  const url=new URL(value,'https://besc.invalid');
  if(!/^\/(?:mijn-besc(?:\/[a-z0-9-]+)*|creators(?:\/[a-z0-9-]+)?|events(?:\/[a-z0-9-]+)?|contact)$/.test(url.pathname))return '/';
  return url.pathname+url.search+url.hash;
}
