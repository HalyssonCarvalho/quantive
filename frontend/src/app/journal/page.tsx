"use client";
import { useState } from "react";

const entries = [
  { id:1, date:"2026-05-11", symbol:"XAU/USD", dir:"BUY", pnl:640, emotion:"confident", setup:"Breakout", rating:5, notes:"Setup perfeito no London Open. Entrei no retest do nível e segurei até o TP." },
  { id:2, date:"2026-05-10", symbol:"EUR/USD", dir:"SELL", pnl:-120, emotion:"anxious", setup:"Reversao", rating:2, notes:"Entrei cedo demais. Nao esperei confirmacao. Saí no SL sem paciencia." },
  { id:3, date:"2026-05-09", symbol:"NAS100", dir:"BUY", pnl:480, emotion:"calm", setup:"Tendencia", rating:4, notes:"Trade seguindo a tendencia principal. Boa execucao, poderia ter deixado correr mais." },
  { id:4, date:"2026-05-08", symbol:"WTI OIL", dir:"BUY", pnl:310, emotion:"calm", setup:"Suporte", rating:4, notes:"Compra no suporte chave. Setup de alta probabilidade." },
];

const emotions: Record<string, {label:string,color:string,emoji:string}> = {
  calm: { label:"Calmo", color:"#10b981", emoji:"😌" },
  confident: { label:"Confiante", color:"#3b82f6", emoji:"💪" },
  anxious: { label:"Ansioso", color:"#f59e0b", emoji:"😰" },
  frustrated: { label:"Frustrado", color:"#f43f5e", emoji:"😤" },
  greedy: { label:"Ganancioso", color:"#a78bfa", emoji:"🤑" },
};

export default function Journal() {
  const [selected, setSelected] = useState<number|null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newEmotion, setNewEmotion] = useState("calm");

  const entry = entries.find(e=>e.id===selected);

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===2?"rgba(0,212,170,0.12)":"transparent",color:i===2?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Trading Journal</span>
          <div style={{flex:1}}/>
          <button onClick={()=>setShowNew(true)} style={{background:"#00d4aa",border:"none",borderRadius:"8px",padding:"6px 16px",color:"#0a0c10",fontWeight:"700",cursor:"pointer",fontSize:"12px"}}>+ Nova Entrada</button>
        </header>
        <main style={{padding:"20px",flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",overflowY:"auto"}}>

          {/* Lista */}
          <div>
            <div style={{fontSize:"10px",fontFamily:"monospace",textTransform:"uppercase",color:"#6b7280",marginBottom:"12px"}}>Entradas Recentes</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {entries.map(e=>(
                <div key={e.id} onClick={()=>setSelected(e.id)} style={{background:selected===e.id?"#181c24":"#111318",border:`1px solid ${selected===e.id?"#00d4aa":"rgba(255,255,255,0.07)"}`,borderRadius:"12px",padding:"14px 16px",cursor:"pointer",transition:"all 0.15s"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontWeight:"600"}}>{e.symbol}</span>
                      <span style={{padding:"2px 7px",borderRadius:"4px",fontSize:"10px",fontWeight:"bold",background:e.dir==="BUY"?"rgba(16,185,129,0.15)":"rgba(244,63,94,0.15)",color:e.dir==="BUY"?"#10b981":"#f43f5e"}}>{e.dir}</span>
                    </div>
                    <span style={{fontFamily:"monospace",color:e.pnl>0?"#10b981":"#f43f5e",fontWeight:"bold"}}>{e.pnl>0?"+":""}{e.pnl}</span>
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <span>{emotions[e.emotion]?.emoji}</span>
                      <span style={{fontSize:"11px",color:emotions[e.emotion]?.color}}>{emotions[e.emotion]?.label}</span>
                    </div>
                    <div style={{display:"flex",gap:"2px"}}>
                      {Array.from({length:5}).map((_,i)=>(
                        <span key={i} style={{color:i<e.rating?"#fbbf24":"#374151",fontSize:"12px"}}>★</span>
                      ))}
                    </div>
                  </div>
                  <div style={{fontSize:"11px",color:"#6b7280",marginTop:"6px"}}>{e.date} · {e.setup}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhe */}
          <div>
            {entry ? (
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"}}>
                  <div>
                    <div style={{fontSize:"18px",fontWeight:"bold",marginBottom:"4px"}}>{entry.symbol}</div>
                    <div style={{fontSize:"11px",color:"#6b7280"}}>{entry.date} · {entry.setup}</div>
                  </div>
                  <span style={{fontFamily:"monospace",fontSize:"20px",fontWeight:"bold",color:entry.pnl>0?"#10b981":"#f43f5e"}}>{entry.pnl>0?"+":""}{entry.pnl}</span>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"16px"}}>
                  {[{l:"Direcao",v:entry.dir},{l:"Estado Emocional",v:`${emotions[entry.emotion]?.emoji} ${emotions[entry.emotion]?.label}`},{l:"Setup",v:entry.setup},{l:"Rating",v:"★".repeat(entry.rating)+"☆".repeat(5-entry.rating)}].map((f,i)=>(
                    <div key={i} style={{background:"#181c24",borderRadius:"8px",padding:"10px 12px"}}>
                      <div style={{fontSize:"10px",color:"#6b7280",marginBottom:"4px"}}>{f.l}</div>
                      <div style={{fontSize:"13px",fontWeight:"500"}}>{f.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:"#181c24",borderRadius:"8px",padding:"14px"}}>
                  <div style={{fontSize:"10px",color:"#6b7280",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Notas</div>
                  <p style={{fontSize:"13px",lineHeight:1.6,margin:0,color:"#e8eaf0"}}>{entry.notes}</p>
                </div>
                <div style={{marginTop:"12px",background:"rgba(0,212,170,0.05)",border:"1px solid rgba(0,212,170,0.2)",borderRadius:"8px",padding:"12px"}}>
                  <div style={{fontSize:"10px",color:"#00d4aa",marginBottom:"6px",fontWeight:"700"}}>🤖 AI FEEDBACK</div>
                  <p style={{fontSize:"12px",lineHeight:1.5,margin:0,color:"#6b7280"}}>
                    {entry.pnl>0?"Excelente execucao. Voce seguiu o plano e obteve um resultado acima da media. Continue priorizando esse tipo de setup.":"Identifiquei impaciencia neste trade. Entradas precipitadas custaram $120. Recomendo aguardar pelo menos 2 confirmacoes antes de entrar."}
                  </p>
                </div>
              </div>
            ) : (
              <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"40px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"300px"}}>
                <div style={{fontSize:"40px",marginBottom:"12px"}}>📓</div>
                <div style={{color:"#6b7280",fontSize:"13px"}}>Selecione uma entrada para ver os detalhes</div>
              </div>
            )}

            {/* Nova entrada */}
            {showNew && (
              <div style={{background:"#111318",border:"1px solid rgba(0,212,170,0.2)",borderRadius:"12px",padding:"20px",marginTop:"12px"}}>
                <div style={{fontSize:"12px",fontWeight:"600",marginBottom:"16px"}}>Nova Entrada</div>
                <div style={{marginBottom:"12px"}}>
                  <div style={{fontSize:"10px",color:"#6b7280",marginBottom:"6px"}}>Estado Emocional</div>
                  <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                    {Object.entries(emotions).map(([k,v])=>(
                      <button key={k} onClick={()=>setNewEmotion(k)} style={{padding:"4px 10px",borderRadius:"20px",border:`1px solid ${newEmotion===k?v.color:"rgba(255,255,255,0.1)"}`,background:newEmotion===k?`rgba(${v.color},0.1)`:"transparent",color:newEmotion===k?v.color:"#6b7280",cursor:"pointer",fontSize:"11px"}}>
                        {v.emoji} {v.label}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Descreva o trade, setup, o que funcionou ou nao..." style={{width:"100%",height:"80px",background:"#181c24",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",padding:"10px",color:"#e8eaf0",fontSize:"12px",resize:"none",outline:"none",boxSizing:"border-box"}}/>
                <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
                  <button onClick={()=>setShowNew(false)} style={{flex:1,padding:"8px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#6b7280",cursor:"pointer"}}>Cancelar</button>
                  <button onClick={()=>setShowNew(false)} style={{flex:1,padding:"8px",background:"#00d4aa",border:"none",borderRadius:"8px",color:"#0a0c10",fontWeight:"700",cursor:"pointer"}}>Salvar</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
