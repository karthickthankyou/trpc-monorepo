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
      {session?.data?.user?.image ? (
        <Image
          className="w-16 h-16 rounded-full aspect-square"
          width={600}
          height={600}
          src={session?.data?.user?.image || ''}
          alt={''}
        />
      ) : (
        <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 text-3xl font-semibold text-white bg-black border rounded-full">
          {session?.data?.user?.name?.charAt(0)}
        </div>
      )}
      <div>
        <div className={`text-xl font-light`}>{session?.data?.user?.name}</div>
        <div className="text-gray-500">{session?.data?.user?.uid}</div>
      </div>
    </div>
  )
}
