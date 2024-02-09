import { z } from 'zod'
import { AuthProviderType } from '@foundation-trpc/db/types'

export const schemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  image: z.string().optional(),
})

export const schemaUser = z.object({
  uid: z.string(),
})

export const schemaSignIn = schemaRegister.pick({
  email: true,
  password: true,
})

export const schemaRegisterWithProvider = z.object({
  uid: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(AuthProviderType),
})
