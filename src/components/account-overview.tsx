import {Shell} from './shell';
import {readAccountOverview} from '@/lib/account-overview-data';
import {AccountOverviewView} from './account-overview-view';
export async function AccountOverview(){const initial=await readAccountOverview();return <Shell><AccountOverviewView initial={initial}/></Shell>;}
