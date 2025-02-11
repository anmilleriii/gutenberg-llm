"use server";

import { prisma } from "@/prisma/client";

export async function queryBooksByTitleOrId({
  titleOrId,
  offset = 0,
  limit = 25,
}: {
  titleOrId: string;
  offset?: number;
  limit?: number;
}) {
  const result = await prisma.gutenbergBookMetadata.findMany({
    where: {
      OR: [
        {
          title: {
            contains: titleOrId,
            mode: "insensitive",
          },
        },
        {
          gutenbergBookId: {
            contains: titleOrId,
            mode: "insensitive",
          },
        },
        {
          authors: {
            contains: titleOrId,
            mode: "insensitive",
          },
        },
      ],
    },
    distinct: ["id"],
    orderBy: {
      // TODO
      dateIssued: "desc",
    },
    skip: offset,
    take: limit,
  });

  return result;
}

export async function getGutenbergBookMetadataById(id: string) {
  const result = await prisma.gutenbergBookMetadata.findUnique({
    where: {
      gutenbergBookId: id,
    },
  });

  return result;
}
