"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/client";

export async function saveBook({
  gutenbergBookId,
}: {
  gutenbergBookId: string;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const result = await prisma.savedBook.create({
    data: {
      gutenbergBookId,
      userId: session.user.id,
    },
  });

  return result;
}
