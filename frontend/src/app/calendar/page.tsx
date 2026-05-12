"use client";
import { useState } from "react";

const events = [
  { id:1, time:"07:00", country:"GB", flag:"🇬🇧", title:"UK GDP (MoM)", impact:"low", forecast:"+0.2%", actual:"+0.2%", previous:"+0.1%", done:true },
  { id:2, time:"09:00", country:"EU", flag:"🇪🇺", title:"Eurozone CPI (YoY)", impact:"high", forecast:"2.4%", actual:null, previous:"2.6%", done:false },
  { id:3, time:"12:30", country:"US", flag:"🇺🇸", title:"US Initial Jobless Claims", impact:"med", forecast:"215K", actual:null, previous:"211K", done:false },
  { id:4, time:"14:30", country:"US", flag:"🇺🇸", title:"US CPI (YoY)", impact:"high", forecast:"3.4%", actual:null, previous:"3.5%", done:false },
  { id:5, time:"15:15", country:"US", flag:"🇺🇸", title:"US Industrial Production", impact:"med", forecast:"+0.3%", actual:null, previous:"+0.1%", done:false },
  { id:6, time:"18:00", country:"US", flag:"🇺🇸", title:"FOMC Meeting Minutes", impact:"high", forecast:null, actual:null, previous:null, done:false },
  { id:7, time:"20:00", country:"US", flag:"🇺🇸", title:"Fed Chair Speech", impact:"high", forecast:null, actual:null, previous:null, done:false },
];

const impactConfig: Record<string, {color:string, label:string, bg:string}> = {
  high: { color:"#f43f5e", label:"Alto", bg:"rgba(244,63,94,0.15)" },
  med: { color:"#f59e0b", label:"Médio", bg:"rgba(245,158,11,0.15)" },
  low: { color:"#6b7280", label:"Baixo", bg:"rgba(107,114,128,0.15)" },
};

export default function Calendar() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<number|null>(null);

  const filtered = events.filter(e => filter === "all" || e.impact === filter);
  const event = events.find(e => e.id === selected);

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===5?"rgba(0,212,170,0.12)":"transparent",color:i===5?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",gap:"12px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Calendário Econômico</span>
          <div style={{flex:1}}/>
          <div style={{fontFamily:"monospace",fontSize:"11px",color:"#00d4aa"}}>📅 Seg, 11 Mai 2026</div>
        </header>
        <main style={{padding:"20px",flex:1,display:"grid",gridTemplateColumns:"1fr 380px",gap:"16px",overflowY:"auto"}}>

          {/* Events list */}
          <div>
            {/* Filters */}
            <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
              {[{k:"all",l:"Todos"},{ k:"high",l:"🔴 Alto"},{ k:"med",l:"🟡 Médio"},{ k:"low",l:"⚫ Baixo"}].map(f=>(
                <button key={f.k} onClick={()=>setFilter(f.k)} style={{padding:"5px 12px",borderRadius:"20px",fontSize:"11px",border:`1px solid ${filter===f.k?"#00d4aa":"rgba(255,255,255,0.1)"}`,background:filter===f.k?"rgba(0,212,170,0.1)":"transparent",color:filter===f.k?"#00d4aa":"#6b7280",cursor:"pointer"}}>{f.l}</button>
              ))}
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
              {filtered.map(e=>(
                <div key={e.id} onClick={()=>setSelected(e.id)} style={{background:selected===e.id?"#181c24":"#111318",border:`1px solid ${selected===e.id?"#00d4aa":"rgba(255,255,255,0.07)"}`,borderRadius:"10px",padding:"12px 16px",cursor:"pointer",display:"grid",gridTemplateColumns:"60px 28px 1fr 80px 80px 80px",alignItems:"center",gap:"12px",opacity:e.done?0.6:1,transition:"all 0.15s"}}>
                  <span style={{fontFamily:"monospace",fontSize:"12px",color:"#6b7280"}}>{e.time}</span>
                  <span style={{fontSize:"16px"}}>{e.flag}</span>
                  <div>
                    <div style={{fontWeight:"500",fontSize:"12px"}}>{e.title}</div>
                    <div style={{fontSize:"10px",marginTop:"2px"}}>
                      <span style={{padding:"1px 6px",borderRadius:"4px",background:impactConfig[e.impact].bg,color:impactConfig[e.impact].color,fontWeight:"600"}}>{impactConfig[e.impact].label}</span>
                      {e.done && <span style={{marginLeft:"6px",color:"#10b981",fontSize:"10px"}}>✓ Divulgado</span>}
                    </div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:"9px",color:"#6b7280",marginBottom:"2px"}}>Anterior</div>
                    <div style={{fontSize:"12px",fontFamily:"monospace"}}>{e.previous ?? "—"}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:"9px",color:"#6b7280",marginBottom:"2px"}}>Previsão</div>
                    <div style={{fontSize:"12px",fontFamily:"monospace",color:"#f59e0b"}}>{e.forecast ?? "—"}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:"9px",color:"#6b7280",marginBottom:"2px"}}>Atual</div>
                    <div style={{fontSize:"12px",fontFamily:"monospace",color:e.actual?"#10b981":"#6b7280"}}>{e.actual ?? "—"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            {event ? (
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"20px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
                  <span style={{fontSize:"24px"}}>{event.flag}</span>
                  <div>
                    <div style={{fontWeight:"600",fontSize:"14px"}}>{event.title}</div>
                    <div style={{fontSize:"11px",color:"#6b7280",marginTop:"2px"}}>{event.time} UTC · {event.country}</div>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"16px"}}>
                  {[{l:"Anterior",v:event.previous,c:"#6b7280"},{l:"Previsão",v:event.forecast,c:"#f59e0b"},{l:"Atual",v:event.actual,c:"#10b981"}].map((f,i)=>(
                    <div key={i} style={{background:"#181c24",borderRadius:"8px",padding:"10px",textAlign:"center"}}>
                      <div style={{fontSize:"9px",color:"#6b7280",marginBottom:"4px",textTransform:"uppercase"}}>{f.l}</div>
                      <div style={{fontFamily:"monospace",fontSize:"16px",fontWeight:"bold",color:f.v?f.c:"#374151"}}>{f.v ?? "—"}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"rgba(0,212,170,0.05)",border:"1px solid rgba(0,212,170,0.15)",borderRadius:"8px",padding:"12px"}}>
                  <div style={{fontSize:"10px",color:"#00d4aa",fontWeight:"700",marginBottom:"6px"}}>🤖 IMPACTO ESPERADO</div>
                  <p style={{fontSize:"12px",lineHeight:1.5,margin:0,color:"#6b7280"}}>
                    {event.impact==="high"
                      ? "Evento de alto impacto. Volatilidade esperada acima de 40% nos pares relacionados. Evite posições abertas 15 min antes e após a divulgação."
                      : event.impact==="med"
                      ? "Evento de impacto médio. Possível aumento de volatilidade. Ajuste seu stop loss preventivamente."
                      : "Evento de baixo impacto. Efeito limitado nos mercados. Pode operar normalmente."}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"40px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"250px"}}>
                <div style={{fontSize:"40px",marginBottom:"12px"}}>📅</div>
                <div style={{color:"#6b7280"}}>Selecione um evento para ver detalhes</div>
              </div>
            )}

            {/* Next high impact */}
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Próximos Eventos de Alto Impacto</div>
              {events.filter(e=>e.impact==="high"&&!e.done).map(e=>(
                <div key={e.id} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderTop:"1px solid rgba(255,255,255,0.05)"}}>
                  <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#f43f5e",flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"12px"}}>{e.flag} {e.title}</div>
                    <div style={{fontSize:"10px",color:"#6b7280"}}>{e.time} UTC</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
