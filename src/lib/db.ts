import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

if (typeof window === 'undefined') {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  prismaInstance = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
} else {
  prismaInstance = null as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma || prismaInstance;

if (process.env.NODE_ENV !== 'production' && typeof window === 'undefined') {
  globalForPrisma.prisma = prisma;
}
