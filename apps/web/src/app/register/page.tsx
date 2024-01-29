'use client'
import { userFormRegister } from '@foundation-trpc/forms/src/register'
import { trpcClient } from '@foundation-trpc/trpc-client/src/client'
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormRegister()
  console.log('errors', errors)
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation()
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const user = await mutateAsync(data)
        console.log('user', user)
      })}
    >
      <input placeholder="email" {...register('email')} />
      <input placeholder="password" {...register('password')} type="password" />
      <input placeholder="name" {...register('name')} />
      <button type="submit">Submit</button>
    </form>
  )
}
