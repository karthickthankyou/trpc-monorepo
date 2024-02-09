'use client'
import { userFormRegister } from '@foundation-trpc/forms/src/register'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
import { signIn } from 'next-auth/react'
import { AuthLayout } from '../organisms/AuthLayout'
import Link from 'next/link'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormRegister()

  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation()
  return (
    <AuthLayout title={'Register'}>
      <form
        onSubmit={handleSubmit(async (data) => {
          const user = await mutateAsync(data)
          if (user?.user) {
            signIn('credentials', {
              email: data.email,
              password: data.password,
              callbackUrl: '/',
            })
          }
        })}
      >
        <Label title="Email" error={errors.email?.message}>
          <Input placeholder="email" {...register('email')} />
        </Label>{' '}
        <Label title="Password" error={errors.password?.message}>
          <Input
            placeholder="password"
            {...register('password')}
            type="password"
          />
        </Label>
        <Label title="Name" error={errors.name?.message}>
          <Input placeholder="name" {...register('name')} />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
      <div className="mt-12">
        Continue with{' '}
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' })
          }}
          type="button"
          className="underline underline-offset-8"
        >
          Google
        </button>
        <div className="mt-4">
          <Link href="/signIn">Sign In</Link>
        </div>
      </div>
    </AuthLayout>
  )
}
