'use client';
import {accountOverviewSchema,type AccountOverviewData} from '@/lib/account-overview';
import {useWebsiteResource} from './website-resource';
export function AccountOverviewView({initial}:{initial:AccountOverviewData}){
  const data=useWebsiteResource(initial,'/api/website/account',accountOverviewSchema);
  if(!data)return <section className="state" role="status"><h1>Je toegang wordt opnieuw gecontroleerd</h1><p>Er worden geen oude accountgegevens getoond.</p><a href="/mijn-besc">Mijn overzicht opnieuw laden</a></section>;
  const profile=data.profile==='ready',intake=data.applicationsState==='ready',organizations=data.organizationsState==='ready';
  return <div className="protected-content account-overview"><p className="eyebrow">Jouw account</p><h1>Mijn BESC</h1><p className="lead">Je profiel, aanvragen en organisaties op één plek. Aanmelden kent geen aanvullende rechten of lidmaatschap toe.</p>
    <nav className="account-sections" aria-label="Mijn BESC"><a href="/mijn-besc" aria-current="page">Overzicht</a>{profile&&<><a href="/mijn-besc/profiel">Mijn profiel</a><a href="/mijn-besc/profiel#toestemmingen">Toestemmingen</a></>}{intake&&<a href="/mijn-besc/aanvragen">Aanvragen</a>}{organizations&&<a href="/mijn-besc/organisaties">Mijn organisatie</a>}{data.existingPortal&&<a href="/mijn-besc/portaal">Bestaand portaal</a>}</nav>
    {data.attention>0&&<p className="notice">Er zijn {data.attention} profielvoorstellen waarvoor wijzigingen gevraagd zijn. <a href="/mijn-besc/profiel">Bekijk je voorstellen</a>.</p>}
    {profile&&<section className="account-card"><h2>Mijn profiel</h2><p>{data.profileStatus}</p><a className="button" href="/mijn-besc/profiel">Mijn profiel en veldkeuze beheren</a></section>}
    {data.profile==='unavailable'&&<p role="status">Je profieltoegang is niet beschikbaar of kon niet worden bevestigd.</p>}
    {intake&&<section className="account-card"><div className="section-heading"><h2>Mijn aanvragen</h2><a href="/mijn-besc/aanvragen">Alle aanvragen ({data.applicationsCount})</a></div>{data.applications.length?<ul>{data.applications.map(a=><li key={a.id}><a href={'/mijn-besc/aanvragen/'+a.id}>{a.title}</a><p>{a.status}</p></li>)}</ul>:<p>Je hebt nog geen aanvragen ingediend.</p>}</section>}
    {data.applicationsState==='unavailable'&&<p role="status">Je aanvragen konden niet worden gecontroleerd.</p>}
    {organizations&&<section className="account-card"><h2>Mijn organisatie</h2>{data.organizations.length?<ul>{data.organizations.map(d=><li key={d.id}><a href={'/mijn-besc/organisaties/'+d.id}>{d.name}</a></li>)}</ul>:<p>Je hebt geen actuele vertegenwoordiging van een organisatie.</p>}<a href="/mijn-besc/organisaties">Bekijk mijn organisatietoegang</a></section>}
    {data.organizationsState==='unavailable'&&<p role="status">Je organisatietoegang kon niet worden gecontroleerd.</p>}
    {data.existingPortal&&<section className="account-card"><h2>Mijn bestaande portaal</h2><p>Bekijk je opdrachten, voortgang en resultaten in het bestaande BESC-portaal. Je toegang wordt daar opnieuw gecontroleerd; deze ingang kent geen rechten toe.</p><p>Je opent de andere BESC-omgeving en meldt je daar zo nodig aan met je bestaande account.</p><a className="button" href="/mijn-besc/portaal">Open mijn bestaande portaal</a></section>}
    {!profile&&!intake&&!organizations&&!data.existingPortal&&<p>Er zijn momenteel geen eigen functies beschikbaar voor je account.</p>}
  </div>;
}
