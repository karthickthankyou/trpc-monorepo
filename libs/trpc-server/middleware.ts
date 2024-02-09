import { TRPCError } from '@trpc/server'
import { t } from './trpc'
import { Role } from './types'
import { JwtPayload, verify } from 'jsonwebtoken'
import { authorizeUser } from './util'

export const isAuthed = (...roles: Role[]) =>
  t.middleware(async (opts) => {
    const { token } = opts.ctx
    if (!token) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Token not found.',
      })
    }

    let uid

    try {
      const user = await verify(token, process.env.NEXTAUTH_SECRET || '')
      uid = (user as JwtPayload).uid
    } catch (error) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid token.',
      })
    }

    await authorizeUser(uid, roles)

    return opts.next({ ...opts, ctx: { ...opts.ctx, uid } })
  })
