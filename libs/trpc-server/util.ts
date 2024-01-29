import { prisma } from '@foundation-trpc/db'
import { Role } from './types'
import { TRPCError } from '@trpc/server'

export const userHasRequiredRole = async (
  uid: string,
  requiredRole: Role,
): Promise<boolean> => {
  let userExists

  switch (requiredRole) {
    case 'admin':
      userExists = await prisma.admin.findUnique({
        where: { uid },
      })
      break
    case 'manager':
      userExists = await prisma.manager.findUnique({
        where: { uid },
      })
      break
  }

  return Boolean(userExists)
}

export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return // No specific roles required, access is granted
  }

  const roleCheckPromises = roles.map((role) => userHasRequiredRole(uid, role))

  const roleCheckResults = await Promise.all(roleCheckPromises)
  if (!roleCheckResults.some(Boolean)) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the required role.',
    })
  }
  return
}
