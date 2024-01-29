import { createTRPCReact } from '@trpc/react-query'
import { AppRouter } from '@foundation-trpc/trpc-server/routers'

export const trpcClient = createTRPCReact<AppRouter>()
