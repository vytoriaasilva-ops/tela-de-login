import './globals.css'

export const metadata = {
  title: 'Next.js + Supabase Auth',
  description: 'Tela de login completa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}