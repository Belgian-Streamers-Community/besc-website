import {WebsiteMappedPage} from "@/components/website-mapped-page";
import {experienceEnabled} from "@/lib/website-experience";
import {publicMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {PageContent} from '@/components/page-content';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(experienceEnabled()&&slug==="voorstellen")return <WebsiteMappedPage route="/events/voorstellen"/>;if(experienceEnabled()&&slug==="archief")return <PageContent path="events" title="Voorbije events" period="archive"/>;if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)||slug.length>160)notFound();return <PageContent path={'events/'+slug} title="Events van BESC"/>;}

export async function generateMetadata({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{locale?:string}>}){return publicMetadata('/events/'+(await params).slug,await searchParams);}
