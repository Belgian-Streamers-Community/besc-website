import {viewerToken} from "@/lib/auth";
import {notFound} from 'next/navigation';
import {experienceEnabled} from '@/lib/website-experience';
import OwnCreatorPage from '@/components/own-creator-page';
export const dynamic='force-dynamic';
export default async function Page(props:{searchParams:Promise<Record<string,string|undefined>>}){if(!experienceEnabled())notFound();await viewerToken(undefined,"/mijn-besc/profiel");return <OwnCreatorPage {...props}/>;}
