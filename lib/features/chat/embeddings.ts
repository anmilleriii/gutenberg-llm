"use server";

import { generateEmbedding, generateEmbeddings } from "@/lib/adapters/openai";
import { prisma } from "@/prisma/client";
import { Prisma } from "@prisma/client";

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
  console.log("writing embeddings");
  const metadata = await prisma.gutenbergBookMetadata.findUniqueOrThrow({
    where: { gutenbergBookId },
  });

  const rows = Prisma.join(
    embeddings.map(
      (embedding) =>
        Prisma.sql`(${metadata.id}, ${JSON.stringify(
          embedding.embedding
        )}::vector, ${embedding.content})`
    )
  );

  await prisma.$executeRaw`INSERT INTO embedding ("gutenbergBookMetadataId", vector, content) VALUES ${rows}`;
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

  console.log("generating embeddings");
  const embeddings = await generateEmbeddings(content);

  if (!embeddings) {
    return;
  }

  await writeEmbeddings({
    gutenbergBookId,
    embeddings,
  });
}
