import { initTRPC } from '@trpc/server'
import { createTRPCContext } from './context'
import { isAuthed } from './middleware'

export const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(isAuthed('manager'))
