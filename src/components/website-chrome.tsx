'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from 'next/navigation';
import {navigationSchema,type WebsiteNavigation} from '@/lib/website-experience';
import {websiteBreadcrumbs} from '@/lib/website-structure';
import {useWebsiteResource} from './website-resource';
import {ExperienceTheme} from './website-theme';
function Groups({groups,close}:{groups:WebsiteNavigation['groups'];close():void}){
  const pathname=usePathname();
  return <>{groups.map(group=><div className="nav-group" key={group.href}>
    <a href={group.href} aria-current={pathname===group.href?'page':undefined} onClick={close}>{group.label}</a>
    <details><summary aria-label={`Submenu ${group.label}`}>⌄</summary><div className="nav-submenu">{group.children.map(link=><a key={link.href} href={link.href} aria-current={pathname===link.href?'page':undefined} onClick={close}>{link.label}</a>)}</div></details>
  </div>)}</>;
}
export function WebsiteChrome({initial,footer=false}:{initial:WebsiteNavigation;footer?:boolean}){
  const data=useWebsiteResource(initial,'/api/website/navigation',navigationSchema,false);const [open,setOpen]=useState(false),[search,setSearch]=useState(false);const searchToggle=useRef<HTMLButtonElement>(null),toggle=useRef<HTMLButtonElement>(null),root=useRef<HTMLDivElement>(null);const pathname=usePathname();
  useEffect(()=>{function dismiss(event:KeyboardEvent|PointerEvent){if(event instanceof KeyboardEvent){if(event.key!=='Escape')return;const expanded=root.current?.querySelectorAll('details[open]');expanded?.forEach(item=>{if(item.contains(document.activeElement))(item.querySelector('summary') as HTMLElement|null)?.focus();item.removeAttribute('open');});setOpen(false);setSearch(false);if(open)toggle.current?.focus();else if(search)searchToggle.current?.focus();}else if(!root.current?.contains(event.target as Node)){setOpen(false);root.current?.querySelectorAll('details[open]').forEach(item=>item.removeAttribute('open'));}}
    document.addEventListener('keydown',dismiss);document.addEventListener('pointerdown',dismiss);return()=>{document.removeEventListener('keydown',dismiss);document.removeEventListener('pointerdown',dismiss);};},[open,search]);
  if(footer)return <footer className="website-footer"><a href="/" className="footer-brand">Belgian Streamers Community</a>{data&&<div className="footer-columns protected-content">{data.groups.map(group=><section key={group.href}><h2>{group.label}</h2>{group.children.map(link=><a key={link.href} href={link.href}>{link.label}</a>)}</section>)}<section><h2>Informatie</h2>{data.footer.filter(link=>['/privacy','/cookies','/voorwaarden','/toegankelijkheid'].includes(link.href)).map(link=><a key={link.href} href={link.href}>{link.label}</a>)}</section></div>}<p>Belgian Streamers Community</p></footer>;
  return <div className="website-navigation" ref={root}>
    <div className="site-utilities"><ExperienceTheme/>{data?.search&&<button type="button" className="quiet" ref={searchToggle} aria-expanded={search} aria-controls="website-search" onClick={()=>setSearch(!search)}>Zoeken</button>}{data?.account&&<a className="account-link" href="/mijn-besc">Mijn BESC</a>}<button type="button" className="quiet mobile-menu-toggle" ref={toggle} aria-expanded={open} aria-controls="website-menu" onClick={()=>setOpen(!open)}>{open?'Sluiten':'Menu'}</button></div>
    {search&&<form id="website-search" role="search" action="/zoeken"><label>Zoeken op de website<input name="q" type="search" required minLength={2} maxLength={80} autoFocus/></label><button className="button">Zoeken</button></form>}
    {data?<nav id="website-menu" aria-label="Hoofdnavigatie" className={`website-menu protected-content ${open?'is-open':''}`}><Groups groups={data.groups} close={()=>setOpen(false)}/></nav>:<p role="status" className="navigation-state">De navigatie kon niet opnieuw worden gecontroleerd. <a href={pathname}>Opnieuw laden</a></p>}
  </div>;
}
export function WebsiteBreadcrumbs({title}:{title?:string}){
 const path=usePathname(),[currentTitle,setCurrentTitle]=useState<string>();
 useEffect(()=>{const main=document.querySelector('main');if(!main)return;
   const update=()=>setCurrentTitle(document.documentElement.dataset.protected==='true'?undefined:main.querySelector('h1')?.textContent??undefined);
   const observer=new MutationObserver(update),visibility=new MutationObserver(update);observer.observe(main,{childList:true,subtree:true,characterData:true});visibility.observe(document.documentElement,{attributes:true,attributeFilter:['data-protected']});update();return()=>{observer.disconnect();visibility.disconnect();};
 },[path]);
 if(path==='/')return null;const crumbs=websiteBreadcrumbs(path,title??currentTitle);return <nav className="breadcrumbs" aria-label="Broodkruimels"><ol>{crumbs.map((crumb,index)=><li key={crumb.href}>{index===crumbs.length-1?<span aria-current="page">{crumb.label}</span>:<a href={crumb.href}>{crumb.label}</a>}</li>)}</ol></nav>;
}
