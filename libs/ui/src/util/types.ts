import { ReactNode } from 'react'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}

export type MenuItem = { label: string; href: string; loggedIn: boolean }
