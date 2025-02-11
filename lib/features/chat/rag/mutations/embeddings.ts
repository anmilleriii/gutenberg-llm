import { Prisma } from "@prisma/client";

import { prisma } from "@/prisma/client";

export const writeEmbeddings = async ({
  resourceId,
  embeddings,
}: {
  resourceId: string;
  embeddings: {
    embedding: number[];
    content: string;
  }[];
}) => {
  const rows = Prisma.join(
    embeddings.map(
      (embedding) =>
        Prisma.sql`(${resourceId}, ${JSON.stringify(
          embedding.embedding
        )}::vector, ${embedding.content})`
    )
  );

  await prisma.$executeRaw`INSERT INTO embedding ("resourceId", vector, content) VALUES ${rows}`;
};
