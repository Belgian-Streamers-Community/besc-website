'use client';
import {useState} from 'react';
import type {F2Publication} from '@/lib/contract';
const parts=(value:string)=>Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Brussels',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(value)).map(p=>[p.type,p.value]));
export function EventCalendar({items}:{items:F2Publication[]}){
  const events=items.filter(item=>item.type==='event');const first=parts(events[0]?.starts_at??new Date().toISOString());const [month,setMonth]=useState(first.year+'-'+first.month);
  const [year,index]=month.split('-').map(Number),start=(new Date(Date.UTC(year,index-1,1)).getUTCDay()+6)%7,days=new Date(Date.UTC(year,index,0)).getUTCDate();
  const rows=Array.from({length:Math.ceil((start+days)/7)},(_,week)=>Array.from({length:7},(_,day)=>week*7+day-start+1));
  return <div className="calendar"><label>Maand<input aria-label="Maand" type="month" required value={month} min="1900-01" max="2200-12" onChange={event=>{if(/^\d{4}-(0[1-9]|1[0-2])$/.test(event.target.value))setMonth(event.target.value);}}/></label><p>De kalender toont de events uit deze geladen pagina, op hun begindatum in Belgische tijd.</p><div className="calendar-scroll" tabIndex={0} role="region" aria-label="Eventkalender"><table><caption>{new Intl.DateTimeFormat('nl-BE',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,index-1,1)))}</caption><thead><tr>{['Ma','Di','Wo','Do','Vr','Za','Zo'].map(day=><th key={day} scope="col">{day}</th>)}</tr></thead><tbody>{rows.map((week,row)=><tr key={row}>{week.map((day,column)=><td key={column}>{day>0&&day<=days&&<><span>{day}</span><ul>{events.filter(item=>{const p=parts(item.starts_at);return p.year+'-'+p.month===month&&Number(p.day)===day;}).map(item=><li key={item.public_id}><a href={'/events/'+item.slug}>{item.title}</a></li>)}</ul></>}</td>)}</tr>)}</tbody></table></div></div>;
}
