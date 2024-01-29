import { z } from 'zod'
import { AuthProviderType } from '../../db/types'

export const formSchemaRegister = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  image: z.string().optional(),
})
export const formSchemaUser = z.object({
  uid: z.string(),
})

export const formSchemaSignIn = formSchemaRegister.pick({
  email: true,
  password: true,
})

export const zodSchemaRegisterWithProvider = z.object({
  uid: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  type: z.nativeEnum(AuthProviderType),
})
