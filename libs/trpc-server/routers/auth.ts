import { publicProcedure, router } from '../trpc'

import { prisma } from '@foundation-trpc/db'

export const authRoutes = router({
  users: publicProcedure.query(() => {
    return prisma.user.findMany()
  }),
})
