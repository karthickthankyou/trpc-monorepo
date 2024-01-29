'use client'
import { userFormSignIn } from '@foundation-trpc/forms/src/signin'
import { signIn } from 'next-auth/react'
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormSignIn()
  console.log('errors', errors)
  return (
    <div>
      <form
        onSubmit={handleSubmit(async ({ email, password }) => {
          signIn('credentials', {
            email,
            password,
            callbackUrl: '/',
          })
        })}
      >
        <input placeholder="email" {...register('email')} />
        <input
          placeholder="password"
          {...register('password')}
          type="password"
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' })
          }}
          type="button"
        >
          Google
        </button>
      </div>
    </div>
  )
}
