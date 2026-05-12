export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body style={{margin:0,padding:0,background:"#0a0c10"}}>{children}</body>
    </html>
  )
}
