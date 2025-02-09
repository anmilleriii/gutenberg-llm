import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data: {
      email,
    },
  });
}

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
