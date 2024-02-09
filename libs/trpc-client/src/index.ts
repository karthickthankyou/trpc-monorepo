import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'
import { cookies } from 'next/headers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
      async headers() {
        const getCookies = cookies()
        const token = getCookies.get('next-auth.session-token')?.value || ''

        return {
          authorization: `Bearer ${token}`,
        }
      },
    }),
  ],
})
