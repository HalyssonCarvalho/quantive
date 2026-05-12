"use client";
import { useState } from "react";

export default function ImportPage() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle"|"loading"|"success">("idle");

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  async function handleImport() {
    if (!file) return;
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  }

  return (
    <div style={{display:"flex",minHeight:"100vh",background:"#0a0c10",fontFamily:"sans-serif",color:"#e8eaf0"}}>
      <nav style={{width:"56px",background:"#111318",borderRight:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 0",gap:"4px"}}>
        <div style={{width:"32px",height:"32px",background:"#00d4aa",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"16px"}}>
          <span style={{fontFamily:"monospace",fontWeight:"bold",fontSize:"14px",color:"#0a0c10"}}>Q</span>
        </div>
      </nav>
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <header style={{height:"52px",borderBottom:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",padding:"0 20px",background:"#111318"}}>
          <span style={{fontFamily:"monospace",fontSize:"11px",color:"#6b7280"}}><strong style={{color:"#e8eaf0"}}>QUANTIVE</strong> — Import de Trades</span>
        </header>
        <main style={{padding:"40px",flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:"100%",maxWidth:"600px"}}>
            <h1 style={{fontSize:"20px",fontWeight:"bold",marginBottom:"8px"}}>Importar Trades</h1>
            <p style={{color:"#6b7280",fontSize:"13px",marginBottom:"32px"}}>Suporte para CSV do MT5 e outros brokers.</p>
            <div onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={handleDrop} style={{border:`2px dashed ${dragging?"#00d4aa":file?"#10b981":"rgba(255,255,255,0.15)"}`,borderRadius:"16px",padding:"48px",textAlign:"center",background:dragging?"rgba(0,212,170,0.05)":"#111318",transition:"all 0.2s",marginBottom:"24px"}}>
              {file ? (
                <div>
                  <div style={{fontSize:"40px",marginBottom:"12px"}}>📄</div>
                  <div style={{color:"#10b981",fontWeight:"600",marginBottom:"4px"}}>{file.name}</div>
                  <div style={{color:"#6b7280",fontSize:"12px"}}>{(file.size/1024).toFixed(1)} KB</div>
                  <button onClick={()=>setFile(null)} style={{marginTop:"12px",background:"transparent",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"6px",padding:"4px 12px",color:"#6b7280",cursor:"pointer",fontSize:"12px"}}>Remover</button>
                </div>
              ) : (
                <div>
                  <div style={{fontSize:"40px",marginBottom:"12px"}}>📂</div>
                  <div style={{fontWeight:"500",marginBottom:"8px"}}>Arraste seu arquivo CSV aqui</div>
                  <div style={{color:"#6b7280",fontSize:"12px",marginBottom:"16px"}}>ou clique para selecionar</div>
                  <label style={{background:"rgba(0,212,170,0.1)",border:"1px solid #00d4aa",borderRadius:"8px",padding:"8px 20px",color:"#00d4aa",cursor:"pointer",fontSize:"13px"}}>
                    Selecionar arquivo
                    <input type="file" accept=".csv" onChange={handleFile} style={{display:"none"}}/>
                  </label>
                </div>
              )}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",marginBottom:"24px"}}>
              {[{icon:"🔄",title:"MT5 CSV",desc:"Export direto do MetaTrader 5"},{icon:"📊",title:"Broker CSV",desc:"Normalizado automaticamente"},{icon:"🔒",title:"Seguro",desc:"Dados processados localmente"}].map((c,i)=>(
                <div key={i} style={{background:"#111318",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
                  <div style={{fontSize:"24px",marginBottom:"8px"}}>{c.icon}</div>
                  <div style={{fontSize:"12px",fontWeight:"600",marginBottom:"4px"}}>{c.title}</div>
                  <div style={{fontSize:"11px",color:"#6b7280"}}>{c.desc}</div>
                </div>
              ))}
            </div>
            <button onClick={handleImport} disabled={!file||status==="loading"} style={{width:"100%",padding:"14px",background:file?"#00d4aa":"#181c24",border:"none",borderRadius:"10px",color:file?"#0a0c10":"#6b7280",fontWeight:"700",fontSize:"15px",cursor:file?"pointer":"not-allowed"}}>
              {status==="loading"?"⏳ Processando...":"Importar Trades"}
            </button>
            {status==="success" && (
              <div style={{marginTop:"24px",background:"rgba(16,185,129,0.1)",border:"1px solid #10b981",borderRadius:"12px",padding:"20px",textAlign:"center"}}>
                <div style={{fontSize:"32px",marginBottom:"8px"}}>✅</div>
                <div style={{fontWeight:"600",color:"#10b981",marginBottom:"4px"}}>47 trades importados com sucesso!</div>
                <div style={{fontSize:"12px",color:"#6b7280",marginBottom:"16px"}}>Analytics atualizados automaticamente.</div>
                <a href="/dashboard" style={{display:"inline-block",background:"#10b981",borderRadius:"8px",padding:"8px 20px",color:"#fff",textDecoration:"none",fontSize:"13px",fontWeight:"600"}}>Ver Dashboard →</a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
