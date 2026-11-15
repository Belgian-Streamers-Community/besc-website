import 'server-only';
import {viewerToken} from './auth';
import {ownCreator} from './creator-data';
import {ownIntake} from './intake-data';
import {ownDelegations} from './delegation-data';
import {experienceEnabled,websiteFeatures} from './website-experience';
import {accountOverviewSchema,type AccountOverviewData} from './account-overview';
import {intakeStatusLabels} from './intake-contract';
import {ContentFailure} from './content';
const profileLabels:Record<string,string>={draft:'Eigen concept',submitted:'Ingediend voor beoordeling',changes_requested:'Wijzigingen gevraagd',approved:'Goedgekeurd; afzonderlijke vrijgave vereist',withdrawn:'Ingetrokken'};
export async function readAccountOverview(){
  const features=websiteFeatures(process.env);
  if(!experienceEnabled()||!features.staging)throw new ContentFailure(404);
  await viewerToken(undefined,'/mijn-besc');
  const output:AccountOverviewData={existingPortal:process.env.BESC_WEBSITE_EXISTING_PORTAL_ENABLED==='true',profile:'disabled',profileStatus:null,attention:0,applicationsState:'disabled',applications:[],applicationsCount:0,organizationsState:'disabled',organizations:[]};
  await Promise.all([
    features.creators?(async()=>{try{const own=await ownCreator();output.profile='ready';const current=own.revisions[0];output.profileStatus=current?profileLabels[current.status]:'Nog geen eigen concept';output.attention=own.revisions.filter(r=>r.status==='changes_requested').length;}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;output.profile='unavailable';}})():null,
    features.intake?(async()=>{try{const own=await ownIntake();output.applicationsState='ready';output.applicationsCount=own.applications.length;output.applications=[...own.applications].sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at)).slice(0,5).map(row=>({id:row.id,title:row.title,status:intakeStatusLabels[row.status]}));}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;output.applicationsState='unavailable';}})():null,
    features.delegation?(async()=>{try{const own=await ownDelegations();output.organizationsState='ready';output.organizations=own.delegations.slice(0,50).map(d=>({id:d.id,name:d.partner.name}));}catch(error){if(error instanceof Error&&error.message==='NEXT_REDIRECT')throw error;output.organizationsState='unavailable';}})():null,
  ]);
  return accountOverviewSchema.parse(output);
}
