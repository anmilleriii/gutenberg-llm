import { Prisma } from "@prisma/client";

import { generateEmbedding } from "@/lib/adapters/openai";
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

export const querySimilarContent = async ({
  resourceId,
  content,
}: {
  resourceId: string;
  content: string;
}) => {
  const vector = await generateEmbedding(content);

  const results =
    await prisma.$queryRaw`SELECT id, content FROM embedding WHERE embedding."resourceId" = ${resourceId} ORDER BY vector <=> ${JSON.stringify(
      vector
    )}::vector LIMIT 10`;

  return results as { id: string; content: string }[];
};
