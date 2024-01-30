'use client'
import { Mic2, Menu, PenBoxIcon } from 'lucide-react'

import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '../atoms/sheet'

import { Button } from '../atoms/button'

import { DisplayUser } from '../organisms/DisplayUser'
import { useSession } from 'next-auth/react'

import { useDialogState } from '../../util/hooks'
import { buttonVariants } from '../../util/variants'
import { MenuItem } from '../../util/types'

export interface INavSidebarProps {
  menuItems: MenuItem[]
}

export function Sidebar() {
  const user = useSession()

  const [open, setOpen] = useDialogState(false)

  if (!user.data?.user) {
    return (
      <Link href="/signIn" className={buttonVariants({ variant: 'default' })}>
        Sign in
      </Link>
    )
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <DisplayUser />
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-4 mb-8">
          <Link href="/anotherPage">
            <div className="flex items-center gap-2">
              <PenBoxIcon className="w-4 h-4" /> Another page
            </div>
          </Link>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Link href="/api/auth/signout">Signout</Link>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const ShowMenuItems = ({ menuItems }: INavSidebarProps) => {
  const uid = true

  if (!uid) return null
  return (
    <div className="items-center hidden ml-auto lg:flex lg:gap-10">
      <Link href={'/employer'}>
        <Mic2 />
      </Link>

      {menuItems
        .filter(({ loggedIn }) => !loggedIn || uid)
        .map(({ href, label }) => (
          <NavLink label={label} href={href} key={label} />
        ))}
    </div>
  )
}
export const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    key={label}
    href={href}
    className="text-sm transition-all hover:text-black hover:font-semibold hover:underline underline-offset-4"
  >
    {label}
  </Link>
)
