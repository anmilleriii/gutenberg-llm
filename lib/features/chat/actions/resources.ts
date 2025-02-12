"use server";

import { prisma } from "@/prisma/client";

import { generateEmbeddings } from "@/lib/adapters/openai";
import { writeEmbeddings } from "./embeddings";

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

  await writeEmbeddings({
    gutenbergBookId,
    embeddings,
  });
}
