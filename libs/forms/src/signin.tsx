'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { schemaSignIn } from './schemas'

export type FormTypeSignIn = z.infer<typeof schemaSignIn>

export const userFormSignIn = () =>
  useForm<FormTypeSignIn>({
    resolver: zodResolver(schemaSignIn),
  })
