import { trpc } from '@foundation-trpc/trpc-client/src'

export default async function Home() {
  const users = await trpc.auth.users.query()
  return <main>Hello {JSON.stringify(users)}</main>
}
