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
    where: { user: { email } },
    include: { user: true },
  });

  if (existingAccount) {
    return existingAccount;
  }

  const newAccount = prisma.account.create({
    data: {
      user: {
        create: {
          email,
        },
      },
    },
  });
}
