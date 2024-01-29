import { isAuthed } from '../middleware'
import { privateProcedure, publicProcedure, router, t } from '../trpc'
import { formSchemaRegister } from '@foundation-trpc/forms/src/schemas'

import { prisma } from '@foundation-trpc/db'
import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { AuthProviderType } from '@foundation-trpc/db/types'
import { sign } from 'jsonwebtoken'

export const authRoutes = router({
  users: t.procedure.use(isAuthed('manager')).query(({ ctx }) => {
    return prisma.user.findMany()
  }),
  registerWithCredentials: publicProcedure
    .input(formSchemaRegister)
    .mutation(async ({ input: { email, password, image, name } }) => {
      const existingUser = await prisma.credentials.findUnique({
        where: { email },
      })
      if (existingUser) {
        throw new TRPCError({
          message: 'User already exists with this email.',
          code: 'BAD_REQUEST',
        })
      }

      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const uid = uuid()

      const user = await prisma.user.create({
        data: {
          uid,
          name,
          image,
          Credentials: { create: { email, passwordHash } },
          AuthProvider: { create: { type: AuthProviderType.CREDENTIALS } },
        },
      })

      const token = sign({ uid: user.uid }, process.env.NEXTAUTH_SECRET || '')
      return { user, token }
    }),
})
