import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { trpc } from '@foundation-trpc/trpc-client/src'
import { JWT } from 'next-auth/jwt'
export const MAX_AGE = 1 * 24 * 60 * 60
import { sign, verify } from 'jsonwebtoken'
import { AuthProviderType } from '@foundation-trpc/db/types'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials
        if (!email || !password) {
          throw new Error('Email and password are required')
        }

        const data = await trpc.auth.signIn.mutate({ email, password })
        if (!data?.user) {
          throw new Error('Authentication failed')
        }
        return {
          id: data.user.uid,
          name: data.user.name,
          image: data.user.image,
          email,
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },
  jwt: {
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      const { sub, picture, ...tokenProps } = token
      const nowInSeconds = Math.floor(Date.now() / 1000)
      const expirationTimestamp = nowInSeconds + MAX_AGE
      return sign(
        {
          uid: sub,
          image: picture,
          ...tokenProps,
          exp: expirationTimestamp,
        },
        secret,
        { algorithm: 'HS256' },
      )
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      try {
        const decodedToken = verify(token, secret, {
          algorithms: ['HS256'],
        })
        return decodedToken as JWT
      } catch (error) {
        console.error('JWT decode error', error)
        return null
      }
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { id, name, image } = user
        const existingUser = await trpc.auth.user.query({
          uid: id,
        })

        if (!existingUser) {
          const user = await trpc.auth.registerWithProvider.mutate({
            type: AuthProviderType.GOOGLE,
            uid: id,
            image: image || '',
            name: name || '',
          })
        }
      }
      return true
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
          uid: (token.uid as string) || '',
        }
      }
      return session
    },
  },
}

export const getAuth = () => getServerSession(authOptions)
