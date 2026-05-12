"use client";
import { useState } from "react";

const equity = [42000,43120,42680,44890,45200,44100,46382];
const days = ["Seg","Ter","Qua","Qui","Sex","Sab","Dom"];
const sessions = [{s:"Asian",v:48,c:"#3b82f6"},{s:"London",v:74,c:"#00d4aa"},{s:"New York",v:62,c:"#fbbf24"},{s:"Overnight",v:41,c:"#6b7280"}];
const assets = [{s:"XAU/USD",v:82,pnl:"+$1,840",c:"#fbbf24"},{s:"NAS100",v:68,pnl:"+$960",c:"#a78bfa"},{s:"WTI OIL",v:55,pnl:"+$620",c:"#10b981"},{s:"EUR/USD",v:42,pnl:"-$180",c:"#3b82f6"},{s:"USD/JPY",v:30,pnl:"-$240",c:"#f43f5e"}];
const maxEq = Math.max(...equity);
const minEq = Math.min(...equity);

export default function Analytics() {
  const [tf, setTf] = useState(0);
  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===1?"rgba(0,212,170,0.12)":"transparent",color:i===1?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",gap:"12px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Analytics</span>
          <div style={{flex:1}}/>
          <div style={{display:"flex",gap:"6px"}}>
            {["Semana","Mes","T1","Tudo"].map((t,i)=>(
              <button key={i} onClick={()=>setTf(i)} style={{padding:"4px 10px",borderRadius:"20px",fontSize:"11px",border:`1px solid ${tf===i?"#00d4aa":"rgba(255,255,255,0.1)"}`,background:tf===i?"rgba(0,212,170,0.1)":"transparent",color:tf===i?"#00d4aa":"#6b7280",cursor:"pointer"}}>{t}</button>
            ))}
          </div>
        </header>
        <main style={{padding:"20px",flex:1,overflowY:"auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",marginBottom:"20px"}}>
            {[{l:"Total Trades",v:"55",c:"#3b82f6"},{l:"Win Rate",v:"67.3%",c:"#10b981"},{l:"Profit Factor",v:"2.4",c:"#fbbf24"},{l:"Sharpe Ratio",v:"1.82",c:"#00d4aa"}].map((m,i)=>(
              <div key={i} style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:m.c}}/>
                <div style={{fontSize:"10px",color:"#6b7280",textTransform:"uppercase",marginBottom:"8px"}}>{m.l}</div>
                <div style={{fontFamily:"monospace",fontSize:"24px",fontWeight:"bold"}}>{m.v}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"12px"}}>
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"12px",fontWeight:"500",marginBottom:"4px"}}>Equity Curve</div>
              <div style={{fontSize:"11px",color:"#6b7280",marginBottom:"12px"}}>Evolucao do saldo esta semana</div>
              <svg viewBox="0 0 400 120" style={{width:"100%",height:"120px"}}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#00d4aa" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {(()=>{
                  const pts = equity.map((v,i)=>{
                    const x=(i/(equity.length-1))*380+10;
                    const y=110-((v-minEq)/(maxEq-minEq))*100;
                    return `${x},${y}`;
                  });
                  return <>
                    <path d={`M 10,110 L ${pts.join(" L ")} L 390,110 Z`} fill="url(#g)"/>
                    <path d={`M ${pts.join(" L ")}`} fill="none" stroke="#00d4aa" strokeWidth="2"/>
                    {equity.map((v,i)=>{
                      const x=(i/(equity.length-1))*380+10;
                      const y=110-((v-minEq)/(maxEq-minEq))*100;
                      return <circle key={i} cx={x} cy={y} r="3" fill="#00d4aa"/>;
                    })}
                    {days.map((d,i)=>(
                      <text key={i} x={(i/(days.length-1))*380+10} y="118" textAnchor="middle" fontSize="8" fill="#6b7280">{d}</text>
                    ))}
                  </>;
                })()}
              </svg>
            </div>
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"12px",fontWeight:"500",marginBottom:"4px"}}>Performance por Sessao</div>
              <div style={{fontSize:"11px",color:"#6b7280",marginBottom:"16px"}}>Win rate por sessao de mercado</div>
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                {sessions.map((s,i)=>(
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <span>{s.s}</span>
                      <span style={{fontFamily:"monospace",color:s.c}}>{s.v}%</span>
                    </div>
                    <div style={{height:"8px",background:"#181c24",borderRadius:"4px"}}>
                      <div style={{width:`${s.v}%`,height:"8px",borderRadius:"4px",background:s.c}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
            <div style={{fontSize:"12px",fontWeight:"500",marginBottom:"4px"}}>Performance por Ativo</div>
            <div style={{fontSize:"11px",color:"#6b7280",marginBottom:"16px"}}>P&L acumulado por instrumento</div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              {assets.map((a,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"12px"}}>
                  <span style={{width:"80px"}}>{a.s}</span>
                  <div style={{flex:1,height:"10px",background:"#181c24",borderRadius:"5px"}}>
                    <div style={{width:`${a.v}%`,height:"10px",borderRadius:"5px",background:a.c}}/>
                  </div>
                  <span style={{fontFamily:"monospace",width:"70px",textAlign:"right",color:a.pnl.startsWith("+")?"#10b981":"#f43f5e"}}>{a.pnl}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
