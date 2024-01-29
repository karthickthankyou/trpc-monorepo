'use client'
import { getAuth } from '@foundation-trpc/network/src/auth/authOptions'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data } = trpcClient.auth.users.useQuery()
  const { data: userData } = useSession()
  return (
    <main>
      Hello {JSON.stringify(data)}
      <div>
        {userData?.user ? (
          <button onClick={() => signOut()}>signout</button>
        ) : (
          <Link href="/signIn">Sign in</Link>
        )}
      </div>
    </main>
  )
}
