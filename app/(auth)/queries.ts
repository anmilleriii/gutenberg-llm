import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUser({ email }: { email: string }) {
  return prisma.user.create({
    data: {
      email,
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getOrCreateAccountGoogle(email: string) {
  const existingAccount = await prisma.account.findUnique({
    // @ts-expect-error -asdf
    where: { user: { email } },
    include: { user: true },
  });

  if (existingAccount) {
    return existingAccount;
  }
}
