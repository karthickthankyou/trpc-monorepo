import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      async headers() {
        const token = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/api/auth/token',
        ).then((res) => res.json())
        return {
          authorization: `Bearer ${token}`,
        }
      },
    }),
  ],
})
