import { prisma } from '@foundation-trpc/db'
import { Role } from './types'
import { TRPCError } from '@trpc/server'

export const getUserRoles = async (uid: string): Promise<Role[]> => {
  const [adminExists, managerExists] = await Promise.all([
    prisma.admin.findUnique({ where: { uid } }),
    prisma.manager.findUnique({ where: { uid } }),
  ])

  const roles: Role[] = []
  if (adminExists) roles.push('admin')
  if (managerExists) roles.push('manager')

  return roles
}

export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return // No specific roles required, access is granted
  }

  const userRoles = await getUserRoles(uid)

  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the required role(s).',
    })
  }
}

export const checkRowLevelPermission = async (
  uid: string,
  allowedUids: string | string[],
  allowedRoles: Role[] = ['admin'],
) => {
  const userRoles = await getUserRoles(uid)

  if (userRoles?.some((role) => allowedRoles.includes(role))) {
    return true
  }

  const uids =
    typeof allowedUids === 'string'
      ? [allowedUids]
      : allowedUids.filter(Boolean)

  if (!uids.includes(uid)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You are not allowed to do this action.',
    })
  }
}
