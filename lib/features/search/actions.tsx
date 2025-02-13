"use server";

import { prisma } from "@/prisma/client";

function maybeParseQueryToInt(query?: string) {
  const result = parseInt(query ?? "");
  if (isNaN(result)) {
    return false;
  }
  return result;
}

export async function queryBooks({
  query,
  limit = 25,
}: {
  query: string;
  offset?: number;
  limit?: number;
}) {
  const queryId = maybeParseQueryToInt(query);

  if (!!queryId) {
    return await getGutenbergBookMetadataById(queryId);
  }

  const result = await prisma.gutenbergBookMetadata.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          authors: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    distinct: ["id"],
    orderBy: {
      title: "asc",
    },
    take: limit,
  });

  return result;
}

export async function getGutenbergBookMetadataById(id?: number) {
  const result = await prisma.gutenbergBookMetadata.findUnique({
    where: {
      gutenbergBookId: id,
    },
  });

  return result;
}
