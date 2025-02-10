"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/client";

export async function saveBook({
  gutenbergBookId,
  gutenbergBookImageHref,
}: {
  gutenbergBookId: string;
  gutenbergBookImageHref?: string;
}) {
  const session = await auth();

  console.log(session);
  if (!session?.user?.id) {
    return null;
  }
  console.log(prisma);

  const result = await prisma.savedBook.create({
    data: {
      gutenbergBookId,
      gutenbergBookImageHref,
      userId: session.user.id,
    },
  });

  console.log({ result });

  return result;
}

export async function deleteBook({ savedBookId }: { savedBookId: string }) {
  const result = await prisma.savedBook.delete({
    where: { id: savedBookId },
  });

  return result;
}
