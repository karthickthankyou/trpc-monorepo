import { inferRouterOutputs } from '@trpc/server'
import { router } from '../trpc'
import { authRoutes } from './auth'

export const appRouter = router({
  auth: authRoutes,
})

export type AppRouter = typeof appRouter
export type AppRouterType = inferRouterOutputs<AppRouter>
