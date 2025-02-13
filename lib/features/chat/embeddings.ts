"use server";

import { generateEmbedding, generateEmbeddings } from "@/lib/adapters/openai";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";

const BATCH_SIZE = 10000;

export const writeEmbeddings = async ({
  gutenbergBookId,
  embeddings,
}: {
  gutenbergBookId: number;
  embeddings: {
    embedding: number[];
    content: string;
  }[];
}) => {
  const metadata = await prisma.gutenbergBookMetadata.findUniqueOrThrow({
    where: { gutenbergBookId },
  });

  try {
    for (let i = 0; i < embeddings.length; i += BATCH_SIZE) {
      const batch = embeddings.slice(i, i + BATCH_SIZE);
      const rows = Prisma.join(
        batch.map(
          (embedding) =>
            Prisma.sql`(${metadata.id}, ${JSON.stringify(
              embedding.embedding
            )}::vector, ${embedding.content})`
        )
      );

      await prisma.$executeRaw`INSERT INTO embedding ("gutenbergBookMetadataId", vector, content) VALUES ${rows}`;
    }
  } catch (e) {
    console.error(e);
  }
};

export const querySimilarContent = async ({
  gutenbergBookId,
  content,
}: {
  gutenbergBookId: number;
  content: string;
}) => {
  const metadata = await prisma.gutenbergBookMetadata.findUniqueOrThrow({
    where: { gutenbergBookId },
  });

  const vector = await generateEmbedding(content);

  const results =
    await prisma.$queryRaw`SELECT id, content FROM embedding WHERE embedding."gutenbergBookMetadataId" = ${
      metadata.id
    } ORDER BY vector <=> ${JSON.stringify(vector)}::vector LIMIT 10`;

  return results as { id: string; content: string }[];
};

export async function createEmbeddingsForBook({
  content,
  gutenbergBookId,
}: {
  content: string;
  gutenbergBookId: number;
}) {
  const existingEmbedding = await prisma.embedding.findFirst({
    where: { gutenbergBookMetadata: { gutenbergBookId } },
  });

  if (existingEmbedding) {
    return;
  }

  const embeddings = await generateEmbeddings(content);

  if (!embeddings) {
    return;
  }
  await writeEmbeddings({
    gutenbergBookId,
    embeddings,
  });
}
