import {z} from 'zod';
import {pagePublicationSchema} from './site-content-contract';
import {creatorPublicationSchema} from './creator-contract';
import {partnerPublicationSchema} from './partner-contract';
import {websiteGroups,websitePagePath,newsLabel} from './website-structure';
export const experienceEnabled=(env:Record<string,string|undefined>=process.env)=>env.BESC_WEBSITE_EXPERIENCE_ENABLED==='true';
const link=z.object({label:z.string().max(240),href:z.string().max(600).regex(/^\/(?!\/)/)}).strict();
export const navigationSchema=z.object({groups:z.array(z.object({label:z.string().max(100),href:z.string().max(200),children:z.array(link).max(15)}).strict()).max(7),footer:z.array(link).max(60),account:z.boolean(),search:z.boolean(),incomplete:z.boolean(),unavailable:z.boolean()}).strict();
export type WebsiteNavigation=z.infer<typeof navigationSchema>;
export type WebsiteFeatures={pages:boolean;creators:boolean;partners:boolean;vacancies:boolean;intake:boolean;contact:boolean;delegation:boolean;staging:boolean};
export function websiteFeatures(env:Record<string,string|undefined>):WebsiteFeatures {
  const staging=env.BESC_WEBSITE_STAGING_ENABLED==='true'&&env.BESC_PUBLIC_WEBSITE_ENABLED!=='true';
  return {pages:env.BESC_SITE_PAGES_ENABLED==='true',creators:staging&&env.BESC_CREATOR_PLATFORM_ENABLED==='true',partners:staging&&env.BESC_PARTNER_PLATFORM_ENABLED==='true',vacancies:staging&&env.BESC_VACANCY_PLATFORM_ENABLED==='true',intake:staging&&env.BESC_PLATFORM_INTAKE_ENABLED==='true',contact:staging&&env.BESC_GENERAL_CONTACT_ENABLED==='true',delegation:staging&&env.BESC_PARTNER_DELEGATION_ENABLED==='true',staging};
}
export function buildWebsiteNavigation(pages:z.infer<typeof pagePublicationSchema>[],features:WebsiteFeatures,incomplete=false,unavailable=false):WebsiteNavigation {
  const available=new Set(pages.filter(p=>p.locale==='nl-BE'&&p.navigation).map(p=>websitePagePath(p.slug)).filter(Boolean));
  for(const root of ['/fotoalbums','/videos','/impact','/downloads','/community/acties'])if([...available].some(path=>path?.startsWith(root+'/')))available.add(root);
  available.add('/nieuws');available.add('/events');available.add('/events?weergave=kalender');available.add('/events/archief');
  if(features.creators){available.add('/creators');available.add('/creators/aanmelden');}
  if(features.partners){available.add('/samenwerkingen');available.add('/samenwerkingen?groep=partners');available.add('/esports');for(const role of ['partner','sponsor','esports'])available.add('/samenwerkingen?role='+role);}
  if(features.vacancies)available.add('/vrijwilligers');
  if(features.intake)available.add('/samenwerken/aanvragen');
  if(features.contact)available.add('/contact');
  // These overviews are functional collections of currently available children.
  for(const href of ['/community','/media-en-impact','/over-besc'])if(websiteGroups.find(g=>g.href===href)?.children.some(([,child])=>child!==href&&available.has(child)))available.add(href);
  const groups=websiteGroups.filter(g=>available.has(g.href)).map(g=>({label:g.label,href:g.href,children:g.children.filter(([,href])=>available.has(href)).map(([label,href])=>({label,href}))}));
  const footer=[...new Map([...groups.flatMap(g=>g.children),...['/privacy','/cookies','/voorwaarden','/toegankelijkheid'].filter(href=>available.has(href)).map(href=>({label:({'/privacy':'Privacy','/cookies':'Cookies','/voorwaarden':'Gebruiksvoorwaarden','/toegankelijkheid':'Toegankelijkheid'}as Record<string,string>)[href],href}))].map(l=>[l.href,l])).values()];
  return {groups,footer,account:features.staging,search:true,incomplete,unavailable};
}
const publicationState=z.enum(['ready','disabled','unavailable']);
export const homeCardSchema=z.object({type:z.enum(['news','event']),public_id:z.string().uuid(),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160),title:z.string().max(240),summary:z.string().max(2000),published_at:z.string().datetime({offset:true}),image:z.object({public_media_id:z.string().uuid(),alt:z.string().max(500),credit:z.string().max(500)}).strict().nullable(),starts_at:z.string().datetime({offset:true}).nullable(),ends_at:z.string().datetime({offset:true}).nullable(),location:z.string().max(1000).nullable()}).strict();
export type WebsiteCard=z.infer<typeof homeCardSchema>;
export const homeSchema=z.object({page:pagePublicationSchema.nullable(),pageState:publicationState,events:z.array(homeCardSchema).max(50),eventsState:publicationState,news:z.array(homeCardSchema).max(50),newsState:publicationState,creators:z.array(creatorPublicationSchema).max(4),creatorsState:publicationState,partners:z.array(partnerPublicationSchema).max(6),partnersState:publicationState,navigation:navigationSchema}).strict();
export type WebsiteHome=z.infer<typeof homeSchema>;
export function selectHomeEvents(items:WebsiteCard[],now=Date.now()) {return items.filter(item=>item.type==='event'&&item.starts_at&&Date.parse(item.starts_at)>=now).sort((a,b)=>Date.parse(a.starts_at!)-Date.parse(b.starts_at!)).slice(0,3);}
export const searchTypes=['all','page','news','event','creator','partner'] as const;
export const searchSchema=z.object({items:z.array(z.object({title:z.string().max(240),summary:z.string().max(2000),href:z.string().max(600).regex(/^\/(?!\/)/),type:z.enum(searchTypes)}).strict()).max(50),incomplete:z.boolean(),unavailable:z.boolean()}).strict();
export type WebsiteSearch=z.infer<typeof searchSchema>;
export {newsLabel};

export const collectionRoots=['/fotoalbums','/videos','/impact','/downloads','/community/acties','/over-besc','/community','/esports','/samenwerkingen'] as const;
export const collectionSchema=z.object({title:z.string().max(240),items:z.array(z.object({title:z.string().max(240),summary:z.string().max(2000),href:z.string().max(600).regex(/^\/(?!\/)/),hero:pagePublicationSchema.shape.hero}).strict()).max(50),incomplete:z.boolean(),unavailable:z.boolean()}).strict();
export type WebsiteCollectionData=z.infer<typeof collectionSchema>;
