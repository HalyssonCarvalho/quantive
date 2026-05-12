"use client";
import { useState } from "react";

export default function Dashboard() {
  const [tf, setTf] = useState(0);

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===0?"rgba(0,212,170,0.12)":"transparent",color:i===0?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",gap:"12px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Dashboard</span>
          <div style={{flex:1}}/>
          <div style={{display:"flex",alignItems:"center",gap:"6px",background:"#181c24",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"20px",padding:"4px 10px",fontSize:"11px"}}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#10b981"}}/>
            <span style={{color:"#6b7280"}}>NY Session</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"6px",background:"#181c24",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"20px",padding:"4px 10px",fontSize:"11px"}}>
            <span style={{color:"#6b7280"}}>XAU/USD</span>
            <span style={{color:"#10b981",fontFamily:"monospace",fontWeight:"bold"}}>2 389.40</span>
          </div>
          <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"linear-gradient(135deg,#00d4aa,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"600"}}>AJ</div>
        </header>
        <main style={{padding:"20px",flex:1,overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
            <span style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.1em",color:"#6b7280"}}>Performance Overview</span>
            <div style={{display:"flex",gap:"6px"}}>
              {["Semana","Mes","T1","Tudo"].map((t,i)=>(
                <button key={i} onClick={()=>setTf(i)} style={{padding:"4px 10px",borderRadius:"20px",fontSize:"11px",border:`1px solid ${tf===i?"#00d4aa":"rgba(255,255,255,0.1)"}`,background:tf===i?"rgba(0,212,170,0.1)":"transparent",color:tf===i?"#00d4aa":"#6b7280",cursor:"pointer"}}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"10px",marginBottom:"20px"}}>
            {[{l:"Net P&L",v:"+$4,382",s:"↑ +12.4%",c:"#10b981"},{l:"Win Rate",v:"67.3%",s:"37 de 55 trades",c:"#3b82f6"},{l:"Avg R:R",v:"1:2.4",s:"↑ +0.3 vs avg",c:"#fbbf24"},{l:"Expectancy",v:"$79.67",s:"por trade",c:"#00d4aa"},{l:"Drawdown",v:"-3.8%",s:"Limite: 5%",c:"#f43f5e"}].map((m,i)=>(
              <div key={i} style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"14px 16px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:m.c}}/>
                <div style={{fontSize:"10px",color:"#6b7280",textTransform:"uppercase",marginBottom:"8px"}}>{m.l}</div>
                <div style={{fontFamily:"monospace",fontSize:"20px",fontWeight:"bold"}}>{m.v}</div>
                <div style={{fontSize:"11px",marginTop:"6px",color:m.s.startsWith("↑")?"#10b981":m.s.includes("Limite")?"#f43f5e":"#6b7280"}}>{m.s}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Trades Recentes</div>
              {[{s:"XAU/USD",d:"BUY",p:"+$640",pos:true},{s:"EUR/USD",d:"SELL",p:"-$120",pos:false},{s:"WTI OIL",d:"BUY",p:"+$310",pos:true},{s:"NAS100",d:"BUY",p:"+$480",pos:true},{s:"USD/JPY",d:"SELL",p:"-$95",pos:false}].map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderTop:i>0?"1px solid rgba(255,255,255,0.05)":"none"}}>
                  <span style={{fontSize:"12px"}}>{t.s}</span>
                  <span style={{padding:"2px 7px",borderRadius:"4px",fontSize:"10px",fontWeight:"bold",background:t.d==="BUY"?"rgba(16,185,129,0.15)":"rgba(244,63,94,0.15)",color:t.d==="BUY"?"#10b981":"#f43f5e"}}>{t.d}</span>
                  <span style={{fontFamily:"monospace",color:t.pos?"#10b981":"#f43f5e"}}>{t.p}</span>
                </div>
              ))}
            </div>
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                <span style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280"}}>AI Insights</span>
                <span style={{background:"rgba(0,212,170,0.1)",color:"#00d4aa",fontSize:"9px",padding:"2px 8px",borderRadius:"4px",fontWeight:"bold"}}>LIVE</span>
              </div>
              {[{t:"warn",b:"Comportamental",txt:"Win rate cai 22% apos 2 perdas. Considere uma pausa."},{t:"good",b:"Padrao",txt:"Gold no London Open supera sua media em 18%."},{t:"info",b:"Macro",txt:"CPI em 3h. Volatilidade historica sobe 40% apos o evento."}].map((ins,i)=>(
                <div key={i} style={{background:"#181c24",borderRadius:"8px",padding:"10px 12px",borderLeft:`3px solid ${ins.t==="warn"?"#f59e0b":ins.t==="good"?"#10b981":"#3b82f6"}`,marginBottom:"8px"}}>
                  <span style={{fontSize:"9px",fontWeight:"bold",padding:"2px 6px",borderRadius:"4px",display:"inline-block",marginBottom:"5px",background:ins.t==="warn"?"rgba(245,158,11,0.15)":ins.t==="good"?"rgba(16,185,129,0.15)":"rgba(59,130,246,0.15)",color:ins.t==="warn"?"#f59e0b":ins.t==="good"?"#10b981":"#3b82f6"}}>{ins.b}</span>
                  <p style={{fontSize:"11px",lineHeight:1.5,margin:0}}>{ins.txt}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
                <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Commodities</div>
                {[{n:"Gold XAU",v:"2 389",c:"+0.8%",up:true,p:82,col:"#fbbf24"},{n:"Oil WTI",v:"78.42",c:"-0.4%",up:false,p:58,col:"#10b981"},{n:"Silver",v:"28.71",c:"+1.2%",up:true,p:44,col:"#94a3b8"},{n:"DXY",v:"104.21",c:"-0.3%",up:false,p:65,col:"#3b82f6"}].map((c,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                    <span style={{width:"60px",fontSize:"11px",color:"#6b7280"}}>{c.n}</span>
                    <div style={{flex:1,height:"4px",background:"#181c24",borderRadius:"2px"}}>
                      <div style={{width:`${c.p}%`,height:"4px",borderRadius:"2px",background:c.col}}/>
                    </div>
                    <span style={{fontFamily:"monospace",fontSize:"11px",color:c.col,width:"48px",textAlign:"right"}}>{c.v}</span>
                    <span style={{fontFamily:"monospace",fontSize:"10px",color:c.up?"#10b981":"#f43f5e",width:"40px",textAlign:"right"}}>{c.c}</span>
                  </div>
                ))}
              </div>
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
                <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"10px"}}>Eventos de Hoje</div>
                {[{i:"high",t:"US CPI (YoY)",m:"14:30 UTC · Forecast 3.4%"},{i:"med",t:"FOMC Minutes",m:"18:00 UTC · Alto impacto"},{i:"low",t:"UK GDP (MoM)",m:"07:00 UTC · +0.2%"}].map((e,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px",padding:"8px 10px",background:"#181c24",borderRadius:"8px",marginBottom:"6px"}}>
                    <span style={{width:"6px",height:"6px",borderRadius:"50%",flexShrink:0,marginTop:"4px",background:e.i==="high"?"#f43f5e":e.i==="med"?"#f59e0b":"#6b7280"}}/>
                    <div>
                      <div style={{fontSize:"11px"}}>{e.t}</div>
                      <div style={{fontSize:"10px",color:"#6b7280",marginTop:"2px"}}>{e.m}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
