import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:8080/trpc',
      async headers() {
        return {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJrYXJ0aGljayJ9.yq0wcUXHOUXnfVW96Uk-Wo6wAXYDsyj7Omj4IvMLwww`,
        }
      },
    }),
  ],
})
