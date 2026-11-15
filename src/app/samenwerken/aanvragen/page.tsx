import {notFound} from 'next/navigation';
import {experienceEnabled,websiteFeatures} from '@/lib/website-experience';
import IntakePage from '@/app/mijn-besc/aanvragen/page';
export const dynamic='force-dynamic';
export default async function Page(props:{searchParams:Promise<Record<string,string|undefined>>}){if(!experienceEnabled()||!websiteFeatures(process.env).intake)notFound();return <IntakePage {...props}/>;}
