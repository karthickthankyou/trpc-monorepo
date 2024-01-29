import NextAuth from 'next-auth'
import { authOptions } from '@foundation-trpc/network/src/auth/authOptions'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
