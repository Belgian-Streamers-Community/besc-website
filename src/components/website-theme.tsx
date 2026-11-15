'use client';
import {useEffect,useState} from 'react';
export function ExperienceTheme(){
  const [theme,setTheme]=useState('system');
  useEffect(()=>{let value='system';try{const saved=localStorage.getItem('besc-theme');if(saved&&['system','light','dark'].includes(saved))value=saved;}catch{}setTheme(value);},[]);
  useEffect(()=>{const media=matchMedia('(prefers-color-scheme: dark)');const apply=()=>{document.documentElement.dataset.theme=theme==='system'?(media.matches?'dark':'light'):theme;};apply();media.addEventListener('change',apply);return()=>media.removeEventListener('change',apply);},[theme]);
  return <label className="theme-select">Weergave<select aria-label="Weergave" value={theme} onChange={event=>{setTheme(event.target.value);try{localStorage.setItem('besc-theme',event.target.value);}catch{}}}><option value="system">Systeem</option><option value="light">Licht</option><option value="dark">Donker</option></select></label>;
}
