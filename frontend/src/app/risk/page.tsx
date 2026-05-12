"use client";
import { useState } from "react";

const alerts = [
  { type:"critical", icon:"🚨", title:"Revenge Trading Detectado", desc:"Lot size aumentou 40% apos 2 perdas consecutivas hoje.", time:"14:32" },
  { type:"warn", icon:"⚠️", title:"Limite Diario em 80%", desc:"Voce perdeu $320 hoje. Limite diario e $400.", time:"13:15" },
  { type:"info", icon:"💡", title:"Melhor Horario Detectado", desc:"Seu win rate no London Open e 74%. Proxima sessao em 2h.", time:"11:00" },
];

export default function Risk() {
  const [dailyLimit, setDailyLimit] = useState(400);
  const [maxDD, setMaxDD] = useState(5);
  const [maxTrades, setMaxTrades] = useState(6);

  const dailyLoss = 320;
  const dailyPct = (dailyLoss/dailyLimit)*100;
  const drawdown = 3.8;
  const ddPct = (drawdown/maxDD)*100;
  const todayTrades = 5;
  const tradesPct = (todayTrades/maxTrades)*100;

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===4?"rgba(0,212,170,0.12)":"transparent",color:i===4?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Risk Management</span>
          <div style={{flex:1}}/>
          <span style={{background:"rgba(244,63,94,0.1)",color:"#f43f5e",fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontWeight:"700"}}>⚠ 2 Alertas Ativos</span>
        </header>
        <main style={{padding:"20px",flex:1,overflowY:"auto"}}>

          {/* Risk Score */}
          <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"20px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"24px"}}>
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:"10px",color:"#6b7280",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"8px"}}>Risk Score</div>
              <div style={{width:"80px",height:"80px",borderRadius:"50%",border:"4px solid #f59e0b",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <span style={{fontFamily:"monospace",fontSize:"22px",fontWeight:"bold",color:"#f59e0b"}}>6.2</span>
                <span style={{fontSize:"9px",color:"#6b7280"}}>/ 10</span>
              </div>
              <div style={{fontSize:"11px",color:"#f59e0b",marginTop:"8px"}}>Moderado</div>
            </div>
            <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px"}}>
              {[
                {l:"Perda Diaria",v:`$${dailyLoss}`,limit:`/ $${dailyLimit}`,pct:dailyPct,c:dailyPct>80?"#f43f5e":"#f59e0b"},
                {l:"Drawdown",v:`${drawdown}%`,limit:`/ ${maxDD}%`,pct:ddPct,c:ddPct>80?"#f43f5e":"#10b981"},
                {l:"Trades Hoje",v:todayTrades,limit:`/ ${maxTrades}`,pct:tradesPct,c:tradesPct>80?"#f59e0b":"#10b981"},
              ].map((m,i)=>(
                <div key={i} style={{background:"#181c24",borderRadius:"10px",padding:"14px"}}>
                  <div style={{fontSize:"10px",color:"#6b7280",textTransform:"uppercase",marginBottom:"8px"}}>{m.l}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:"4px",marginBottom:"8px"}}>
                    <span style={{fontFamily:"monospace",fontSize:"18px",fontWeight:"bold",color:m.c}}>{m.v}</span>
                    <span style={{fontSize:"11px",color:"#6b7280"}}>{m.limit}</span>
                  </div>
                  <div style={{height:"6px",background:"#0a0c10",borderRadius:"3px"}}>
                    <div style={{width:`${Math.min(m.pct,100)}%`,height:"6px",borderRadius:"3px",background:m.c,transition:"width 0.5s"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"}}>
            {/* Alertas */}
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Alertas Recentes</div>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                {alerts.map((a,i)=>(
                  <div key={i} style={{background:"#181c24",borderRadius:"8px",padding:"12px",borderLeft:`3px solid ${a.type==="critical"?"#f43f5e":a.type==="warn"?"#f59e0b":"#3b82f6"}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
                      <span style={{fontSize:"12px",fontWeight:"600"}}>{a.icon} {a.title}</span>
                      <span style={{fontSize:"10px",color:"#6b7280"}}>{a.time}</span>
                    </div>
                    <div style={{fontSize:"11px",color:"#6b7280"}}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configuracoes */}
            <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px"}}>
              <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Configurar Limites</div>
              <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                {[
                  {l:"Perda Diaria Maxima ($)",v:dailyLimit,set:setDailyLimit,min:100,max:2000,step:50},
                  {l:"Max Drawdown (%)",v:maxDD,set:setMaxDD,min:1,max:20,step:0.5},
                  {l:"Max Trades por Dia",v:maxTrades,set:setMaxTrades,min:1,max:20,step:1},
                ].map((c,i)=>(
                  <div key={i}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"6px"}}>
                      <span style={{fontSize:"11px",color:"#6b7280"}}>{c.l}</span>
                      <span style={{fontFamily:"monospace",fontSize:"12px",color:"#00d4aa"}}>{c.v}</span>
                    </div>
                    <input type="range" min={c.min} max={c.max} step={c.step} value={c.v}
                      onChange={e=>c.set(Number(e.target.value))}
                      style={{width:"100%",accentColor:"#00d4aa"}}
                    />
                  </div>
                ))}
                <button style={{width:"100%",padding:"10px",background:"#00d4aa",border:"none",borderRadius:"8px",color:"#0a0c10",fontWeight:"700",cursor:"pointer",fontSize:"13px"}}>
                  Salvar Configuracoes
                </button>
              </div>
            </div>
          </div>

          {/* Prop Firm Mode */}
          <div style={{background:"linear-gradient(135deg,rgba(0,212,170,0.05),rgba(59,130,246,0.05))",border:"1px solid rgba(0,212,170,0.2)",borderRadius:"12px",padding:"16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontSize:"13px",fontWeight:"600",marginBottom:"4px"}}>🏆 Modo Prop Firm</div>
              <div style={{fontSize:"11px",color:"#6b7280"}}>Ativa regras automaticas de compliance para desafios FTMO, MyForexFunds, etc.</div>
            </div>
            <button style={{padding:"8px 20px",background:"rgba(0,212,170,0.1)",border:"1px solid #00d4aa",borderRadius:"8px",color:"#00d4aa",cursor:"pointer",fontWeight:"600",fontSize:"12px"}}>
              Ativar
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
