import {notFound} from 'next/navigation';
import {experienceEnabled,websiteFeatures} from '@/lib/website-experience';
import VolunteerPage from '@/app/vrijwilligers/page';
export const dynamic='force-dynamic';
export default async function Page(props:{searchParams:Promise<Record<string,string|undefined>>}){if(!experienceEnabled()||!websiteFeatures(process.env).vacancies)notFound();return <VolunteerPage {...props}/>;}
