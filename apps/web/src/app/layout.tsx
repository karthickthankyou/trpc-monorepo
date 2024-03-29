import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@foundation-trpc/ui/src/index.css'
import { Provider } from '@foundation-trpc/trpc-client/src/Provider'
import { SessionProvider } from '@foundation-trpc/ui/src/components/molecules/SessionProvider'
import { Container } from '@foundation-trpc/ui/src/components/atoms/container'
import { Navbar } from '@foundation-trpc/ui/src/components/organisms/Navbar'
import { Toaster } from '@foundation-trpc/ui/src/components/molecules/Toaster/Toaster'

export const dynamic = !(process.env.NODE_ENV === 'production')
  ? 'force-dynamic'
  : 'auto'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Provider>
            <Toaster />
            <Navbar />
            <Container>{children}</Container>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
