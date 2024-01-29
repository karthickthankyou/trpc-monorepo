import { isAuthed } from '../middleware'
import { privateProcedure, publicProcedure, router, t } from '../trpc'

import { prisma } from '@foundation-trpc/db'

export const authRoutes = router({
  users: t.procedure.use(isAuthed('manager')).query(({ ctx }) => {
    return prisma.user.findMany()
  }),
})
