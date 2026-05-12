"use client";
import { useState, useRef, useEffect } from "react";

const suggestions = [
  "Por que underperformei essa semana?",
  "Qual minha melhor sessao de trading?",
  "Estou overtradando?",
  "Como melhorar meu R:R?",
];

const initial = [
  { role: "ai", text: "Ola! Sou o seu AI Copilot do Quantive. Analisei seus ultimos 55 trades e estou pronto para te ajudar. O que deseja saber sobre sua performance?" }
];

const responses: Record<string, string> = {
  "Por que underperformei essa semana?": "Analisando seus dados: voce teve 3 perdas consecutivas na sessao NY afternoon (14h-17h UTC), onde seu win rate cai para 38%. Alem disso, seu lot size aumentou 40% apos as perdas — sinal classico de revenge trading. Recomendo pausar apos 2 perdas seguidas.",
  "Qual minha melhor sessao de trading?": "Sua melhor sessao e claramente o London Open (07h-10h UTC) com 74% de win rate e expectancy de $142 por trade. Seus piores resultados sao no Overnight (41% win rate). Concentre mais operacoes no London Open.",
  "Estou overtradando?": "Sim. Na ultima semana voce fez 8 trades na NY afternoon — sua media saudavel e 3-4. Nesses trades extras, seu RR medio foi 1:0.9, abaixo do break-even. A qualidade cai quando a quantidade sobe. Defina um limite de 4 trades por sessao.",
  "Como melhorar meu R:R?": "Seu RR medio atual e 1:2.4, que e bom. O problema e consistencia: 30% dos seus trades fecham abaixo de 1:1. Analise esses trades — voce esta saindo cedo por medo. Tente usar trailing stop para deixar os winners correrem.",
};

export default function AICopilot() {
  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages(m => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const reply = responses[text] || "Analisando seus trades... Com base nos seus dados, identifiquei que sua consistencia melhorou 12% esta semana. Continue focando nas sessoes de maior win rate e mantenha o gerenciamento de risco disciplinado.";
    setMessages(m => [...m, { role: "ai", text: reply }]);
    setLoading(false);
  }

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",fontSize:"13px",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
        {["⊞","∿","📓","◎","🛡","📅","💬"].map((icon,i)=>(
          <div key={i} style={{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"16px",background:i===6?"rgba(0,212,170,0.12)":"transparent",color:i===6?"#00d4aa":"#6b7280"}}>{icon}</div>
        ))}
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",gap:"12px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — AI Copilot</span>
          <div style={{flex:1}}/>
          <span style={{background:"rgba(0,212,170,0.1)",color:"#00d4aa",fontSize:"10px",padding:"3px 10px",borderRadius:"20px",fontWeight:"700"}}>GPT-4o</span>
        </header>

        <div style={{flex:1,display:"flex",flexDirection:"column",maxWidth:"800px",width:"100%",margin:"0 auto",padding:"20px",gap:"16px"}}>
          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"12px"}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start",flexDirection:m.role==="user"?"row-reverse":"row"}}>
                <div style={{width:"32px",height:"32px",borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",background:m.role==="ai"?"rgba(0,212,170,0.15)":"linear-gradient(135deg,#00d4aa,#3b82f6)"}}>
                  {m.role==="ai"?"🤖":"AJ"}
                </div>
                <div style={{maxWidth:"75%",background:m.role==="ai"?"#111318":"rgba(0,212,170,0.1)",border:`1px solid ${m.role==="ai"?"rgba(255,255,255,0.07)":"rgba(0,212,170,0.2)"}`,borderRadius:"12px",padding:"12px 16px",lineHeight:1.6,fontSize:"13px"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"rgba(0,212,170,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}>🤖</div>
                <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"12px 16px"}}>
                  <span style={{color:"#6b7280"}}>Analisando seus trades</span>
                  <span style={{animation:"pulse 1s infinite"}}>...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Suggestions */}
          <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
            {suggestions.map((s,i)=>(
              <button key={i} onClick={()=>send(s)} style={{padding:"6px 12px",borderRadius:"20px",border:"1px solid rgba(255,255,255,0.1)",background:"#111318",color:"#6b7280",fontSize:"11px",cursor:"pointer",transition:"all 0.15s"}}
                onMouseEnter={e=>{(e.target as HTMLElement).style.borderColor="#00d4aa";(e.target as HTMLElement).style.color="#00d4aa"}}
                onMouseLeave={e=>{(e.target as HTMLElement).style.borderColor="rgba(255,255,255,0.1)";(e.target as HTMLElement).style.color="#6b7280"}}
              >{s}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{display:"flex",gap:"10px",background:"#111318",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"12px",padding:"8px 12px"}}>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&send(input)}
              placeholder="Pergunte sobre sua performance, trades, sessoes..."
              style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#e8eaf0",fontSize:"13px"}}
            />
            <button onClick={()=>send(input)} disabled={!input.trim()||loading} style={{background:"#00d4aa",border:"none",borderRadius:"8px",padding:"6px 16px",color:"#0a0c10",fontWeight:"700",cursor:"pointer",fontSize:"13px",opacity:!input.trim()||loading?0.5:1}}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
