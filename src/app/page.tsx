import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo ao Dashboard!</h1>
        <p className="text-gray-600 mb-6">Você está autenticado como:</p>
        <div className="bg-gray-50 p-3 rounded border text-sm font-mono text-gray-700 mb-6 break-all">
          {user.email}
        </div>
        <form action={async () => {
          'use server'
          const cookieStore = await cookies()
          const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
              cookies: {
                getAll() { return cookieStore.getAll() },
                setAll(cookiesToSet) {
                  try {
                    cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                  } catch {}
                }
              }
            }
          )
          await supabase.auth.signOut()
          return redirect('/login')
        }}>
          <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors text-sm font-medium">
            Sair da Conta
          </button>
        </form>
      </div>
    </div>
  )
}
