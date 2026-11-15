import {websiteCatalog} from '@/lib/website-data';
import {WebsiteChrome,WebsiteBreadcrumbs} from './website-chrome';
import {logout} from '@/app/login/actions';
import {publicWebsiteEnabled} from '@/lib/deployment-config';
export async function WebsiteShell({children}:{children:React.ReactNode}){
  const {navigation}=await websiteCatalog();const open=publicWebsiteEnabled(process.env);
  return <div className="website-experience">{!open&&<div className="staging">BESC WEBSITEPROEF · Alleen voor aangewezen crew en vrijwilligers</div>}
    <header className="website-header"><a className="website-logo" href="/" aria-label="BESC home"><img src="/assets/besc-logo.png" alt="BESC" width="156" height="64"/></a><WebsiteChrome initial={navigation}/>{!open&&<form action={logout} className="website-logout"><button className="quiet">Uitloggen</button></form>}</header>
    <main id="inhoud"><WebsiteBreadcrumbs/>{children}</main><WebsiteChrome initial={navigation} footer/>{!open&&<p className="development-note">Afgeschermde ontwikkelomgeving · De bestaande publieke website blijft beschikbaar.</p>}
  </div>;
}
