"use client";
import { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setMsg("");
    try {
      const url = tab === "login"
        ? "http://localhost:8000/auth/login"
        : "http://localhost:8000/auth/register";
      const body = tab === "login"
        ? { email, password }
        : { email, password, full_name: name };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✅ Sucesso! Redirecionando...");
      } else {
        setMsg("❌ " + (data.detail || "Erro"));
      }
    } catch {
      setMsg("❌ Erro de conexão com a API");
    }
    setLoading(false);
  }

  return (
    <div style={{background:"#0a0c10",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"sans-serif"}}>
      <div style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"16px",padding:"40px",width:"100%",maxWidth:"400px"}}>
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{width:"40px",height:"40px",background:"#00d4aa",borderRadius:"10px",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"12px"}}>
            <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"18px",color:"#0a0c10"}}>Q</span>
          </div>
          <h1 style={{color:"#e8eaf0",fontSize:"1.5rem",fontWeight:"bold",margin:"0"}}>Quantive</h1>
          <p style={{color:"#6b7280",fontSize:"13px",marginTop:"4px"}}>AI Trading Intelligence</p>
        </div>

        <div style={{display:"flex",background:"#181c24",borderRadius:"8px",padding:"4px",marginBottom:"24px"}}>
          {(["login","register"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{flex:1,padding:"8px",borderRadius:"6px",border:"none",cursor:"pointer",fontSize:"13px",fontWeight:"500",background:tab===t?"#00d4aa":"transparent",color:tab===t?"#0a0c10":"#6b7280",transition:"all 0.15s"}}>
              {t === "login" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        {tab === "register" && (
          <div style={{marginBottom:"16px"}}>
            <label style={{color:"#6b7280",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Nome completo</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" style={{width:"100%",marginTop:"6px",padding:"10px 12px",background:"#181c24",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e8eaf0",fontSize:"14px",outline:"none",boxSizing:"border-box"}} />
          </div>
        )}

        <div style={{marginBottom:"16px"}}>
          <label style={{color:"#6b7280",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" type="email" style={{width:"100%",marginTop:"6px",padding:"10px 12px",background:"#181c24",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e8eaf0",fontSize:"14px",outline:"none",boxSizing:"border-box"}} />
        </div>

        <div style={{marginBottom:"24px"}}>
          <label style={{color:"#6b7280",fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.08em"}}>Senha</label>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" style={{width:"100%",marginTop:"6px",padding:"10px 12px",background:"#181c24",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",color:"#e8eaf0",fontSize:"14px",outline:"none",boxSizing:"border-box"}} />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{width:"100%",padding:"12px",background:"#00d4aa",border:"none",borderRadius:"8px",color:"#0a0c10",fontWeight:"700",fontSize:"14px",cursor:"pointer",opacity:loading?0.7:1}}>
          {loading ? "Aguarde..." : tab === "login" ? "Entrar" : "Criar conta"}
        </button>

        {msg && (
          <p style={{textAlign:"center",marginTop:"16px",fontSize:"13px",color:msg.startsWith("✅")?"#10b981":"#f43f5e"}}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
