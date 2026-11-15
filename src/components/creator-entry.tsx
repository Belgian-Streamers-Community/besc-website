import {notFound} from 'next/navigation';
import {Shell} from './shell';
import {websiteFeatures} from '@/lib/website-experience';
export function CreatorEntry(){if(!websiteFeatures(process.env).creators)notFound();return <Shell><section className="article"><p className="eyebrow">Creators</p><h1>Creator aanmelden</h1><p>Gebruik je bestaande BESC-account om een eigen profielvoorstel te bewaren. Je kiest zelf welke profielvelden na beoordeling getoond mogen worden.</p><p>Indienen is nog geen goedkeuring of publicatie. Je kunt je verklaring of profiel later intrekken via Mijn BESC.</p><a className="button" href="/mijn-besc/profiel">Naar mijn profielvoorstel</a><p>Je account moet afzonderlijk voor profielbeheer toegelaten zijn. Hier wordt geen nieuw account aangemaakt.</p></section></Shell>;}
