'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export const DisplayUser = () => {
  const session = useSession()

  if (session?.status === 'loading' || session?.status === 'unauthenticated') {
    return null
  }

  return (
    <div className="flex gap-2">
      <Image
        className="w-16 h-16 rounded-full aspect-square"
        width={600}
        height={600}
        src={session?.data?.user?.image || '/user.jpg'}
        alt={''}
      />

      <div>
        <div className={`text-xl font-light`}>{session?.data?.user?.name}</div>
        <div className="text-gray-500">{session?.data?.user?.uid}</div>
      </div>
    </div>
  )
}
