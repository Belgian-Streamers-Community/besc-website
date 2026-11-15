import {experienceEnabled} from '@/lib/website-experience';
import OwnCreatorPage from '@/components/own-creator-page';
import {AccountOverview} from '@/components/account-overview';
export const dynamic='force-dynamic';
export default async function Page(props:{searchParams:Promise<Record<string,string|undefined>>}){return experienceEnabled()?<AccountOverview/>:<OwnCreatorPage {...props}/>;}
