import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
  return prisma.user.findUniqueOrThrow({
    where: { email },
  });
}

export async function getAccountByEmail(email: string) {
  return prisma.account.findUniqueOrThrow({
    where: { email },
  });
}
