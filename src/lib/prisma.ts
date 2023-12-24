import { PrismaClient } from '@prisma/client/edge'

export const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
})
