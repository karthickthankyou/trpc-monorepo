import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers'

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
})
