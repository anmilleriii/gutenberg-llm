// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { prisma } from "@/prisma/client";
import { groq } from "@ai-sdk/groq";
import { embed, embedMany } from "ai";

const embeddingModel = groq.textEmbeddingModel("text-embedding-ada-002");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });

  return embedding;
};

// export const findRelevantContent = async (userQuery: string) => {
//   const userQueryEmbedded = await generateEmbedding(userQuery);
//   const similarity = sql<number>`1 - (${cosineDistance(
//     embeddings.embedding,
//     userQueryEmbedded
//   )})`;
//   const similarGuides = await db
//     .select({ name: embeddings.content, similarity })
//     .from(embeddings)
//     .where(gt(similarity, 0.5))
//     .orderBy((t) => desc(t.similarity))
//     .limit(4);
//   return similarGuides;
// };

export const writeEmbeddings = async (embeddings) => {
  const embeddings = await generateEmbeddings(content);

  await prisma.$executeRaw`INSERT INTO embedding (vector) VALUES (${vectorEmbedding1}::vector), (${vectorEmbedding2}::vector)`;
  return embeddings;
};

// async function main() {
//   // Generate embeddings
//   const vectorEmbedding1 = JSON.stringify([1, 2, 3, 4]);
//   const vectorEmbedding2 = JSON.stringify([64, 256, 512, 1024]);

//   // Insert embeddings into DB
//   await prisma.$executeRaw`INSERT INTO embedding (vector) VALUES (${vectorEmbedding1}::vector), (${vectorEmbedding2}::vector)`;

//   // Search/Query and retrieve embeddings
//   const results =
//     await prisma.$queryRaw`SELECT id, embedding::text FROM embedding ORDER BY vector >-> ${vecEmbed}::vector LIMIT 2`;
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
