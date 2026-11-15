'use client';
import {useEffect,useState} from 'react';
import type {ZodType} from 'zod';
/** Each region owns its lease. One successful widget cannot reveal another's stale data. */
export function useWebsiteResource<T>(initial:T,path:string,schema:ZodType<T>,unlockDocument=true){
  const [resource,setResource]=useState<T|null>(initial);
  useEffect(()=>{
    let active=true,busy=false,queued=false,paused=false,epoch=0;let controller:AbortController|null=null;
    const hide=()=>{epoch++;controller?.abort();setResource(null);};
    const check=async()=>{if(paused)return;if(busy){queued=true;return;}queued=false;busy=true;const version=epoch,request=new AbortController();controller=request;const timeout=setTimeout(()=>request.abort(),5000);
      try{const response=await fetch(path,{credentials:'same-origin',cache:'no-store',redirect:'error',signal:request.signal});if(!response.ok)throw Error('Unavailable');const parsed=schema.safeParse(await response.json());if(!parsed.success)throw Error('Invalid');if(active&&version===epoch&&!request.signal.aborted&&!paused&&document.visibilityState==='visible'){setResource(parsed.data);if(unlockDocument)delete document.documentElement.dataset.protected;}}
      catch{if(active&&version===epoch)hide();}finally{clearTimeout(timeout);busy=false;if(queued&&active&&!paused){queued=false;void check();}}
    };
    const resume=()=>{paused=document.visibilityState==='hidden'||!navigator.onLine;hide();if(!paused)void check();};const offline=()=>{paused=true;hide();};const visibility=()=>{if(document.visibilityState==='hidden')offline();else resume();};
    const timer=setInterval(()=>{if(!paused&&document.visibilityState==='visible')void check();},20000);
    window.addEventListener('focus',resume);window.addEventListener('pageshow',resume);window.addEventListener('pagehide',offline);window.addEventListener('offline',offline);window.addEventListener('online',resume);document.addEventListener('visibilitychange',visibility);
    if(document.visibilityState==='hidden'||!navigator.onLine)offline();else void check();
    return()=>{active=false;epoch++;controller?.abort();clearInterval(timer);window.removeEventListener('focus',resume);window.removeEventListener('pageshow',resume);window.removeEventListener('pagehide',offline);window.removeEventListener('offline',offline);window.removeEventListener('online',resume);document.removeEventListener('visibilitychange',visibility);};
  },[path,schema,unlockDocument]);
  return resource;
}
