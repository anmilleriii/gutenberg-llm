import { auth } from "@/auth";
import { prisma } from "@/prisma/client";

export async function getGutenbergBookMetadataOfSavedBooks() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  // metadata where gutenbergBookId is in saved books of user id
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
