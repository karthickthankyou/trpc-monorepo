import { isAuthed } from '../middleware'
import { publicProcedure, router, t } from '../trpc'
import {
  schemaRegister,
  schemaSignIn,
  schemaUser,
  schemaRegisterWithProvider,
} from '@foundation-trpc/forms/src/schemas'

import { prisma } from '@foundation-trpc/db'
import { TRPCError } from '@trpc/server'
import * as bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import { AuthProviderType } from '@foundation-trpc/db/types'
import { sign } from 'jsonwebtoken'

export const authRoutes = router({
  users: publicProcedure.use(isAuthed('admin')).query(() => {
    return prisma.user.findMany()
  }),
  user: publicProcedure.input(schemaUser).query(({ input: { uid }, ctx }) => {
    return prisma.user.findUnique({ where: { uid } })
  }),
  signIn: publicProcedure
    .input(schemaSignIn)
    .mutation(async ({ input: { email, password } }) => {
      const credentials = await prisma.credentials.findUnique({
        where: { email },
        include: { user: true },
      })

      if (!credentials) {
        throw new Error('Invalid email or password')
      }

      if (!bcrypt.compareSync(password, credentials.passwordHash)) {
        throw new Error('Invalid email or password')
      }

      const token = sign(
        { uid: credentials.uid },
        process.env.NEXTAUTH_SECRET || '',
      )

      return {
        user: credentials.user,
        token,
      }
    }),
  registerWithCredentials: publicProcedure
    .input(schemaRegister)
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
  registerWithProvider: publicProcedure
    .input(schemaRegisterWithProvider)
    .mutation(async ({ input }) => {
      const { type, uid, image, name } = input
      const user = await prisma.user.create({
        data: {
          uid,
          image,
          name,
          AuthProvider: {
            create: {
              type,
            },
          },
        },
      })
      const token = sign({ uid: user.uid }, process.env.NEXTAUTH_SECRET || '')
      return { user, token }
    }),
})
