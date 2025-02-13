"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function saveBook(gutenbergBookId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const result = await prisma.savedBook.create({
    data: {
      userId: session.user.id,
      gutenbergBookId,
    },
  });

  revalidatePath("/explore");
  revalidatePath("/bookshelf");

  return result;
}

export async function deleteSavedBook(gutenbergBookId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const result = await prisma.savedBook.delete({
    where: {
      userId: session.user.id,
      gutenbergBookId,
    },
  });

  revalidatePath("/explore");
  revalidatePath("/bookshelf");

  return result;
}

export async function getSavedBookById(gutenbergBookId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const result = await prisma.savedBook.findUnique({
    where: {
      userId: session.user.id,
      gutenbergBookId,
    },
  });

  return result;
}

export async function getGutenbergBookMetadataOfSavedBooks() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const savedBookIds = await prisma.savedBook.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const result = await prisma.gutenbergBookMetadata.findMany({
    where: {
      gutenbergBookId: {
        in: savedBookIds.map((savedBook) => savedBook.gutenbergBookId),
      },
    },
  });

  return result;
}
