import { initTRPC } from '@trpc/server'
import { createTRPCContext } from './context'
import { isAuthed } from './middleware'
import { Role } from './types'

export const t = initTRPC.context<typeof createTRPCContext>().create()

export const router = t.router

export const publicProcedure = t.procedure
export const privateProcedure = (...roles: Role[]) =>
  t.procedure.use(isAuthed(...roles))
