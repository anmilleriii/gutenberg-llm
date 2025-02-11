import { prisma } from "@/prisma/client";
import { generateEmbeddings } from "./embeddings";

/**
 *  Flow is
 * 1 get book text
 * 2 chunk the text
 * 3 Create a resource to associate with the Embeddings, including the content
 * 4 generate an embedding for each chunk and write it to Embedding table
 * 5 return
 */
export const writeEmbeddingsForContent = async (content: string) => {
  const embeddings = await generateEmbeddings(content);
  await prisma.$executeRaw`INSERT INTO embedding (vector, content) VALUES (${embeddings[0].embedding}::vector, ${embeddings[0].content})`;
  // resource?
};

export const getSimilarContentFromEmbedding = async (vector: number[]) => {
  await prisma.$queryRaw`SELECT id, embedding::text FROM embedding ORDER BY vector >-> ${vector}::vector LIMIT 2`;
};

// cosine similarity since we don't care about the magintude of the vector

//   const similarGuides = await db
//     .select({ name: embeddings.content, similarity })
//     .from(embeddings)
//     .where(gt(similarity, 0.5))
//     .orderBy((t) => desc(t.similarity))
//     .limit(4);
// async function main() {
//   // Generate embeddings
//   const vectorEmbedding1 = JSON.stringify([1, 2, 3, 4]);
//   const vectorEmbedding2 = JSON.stringify([64, 256, 512, 1024]);

//   // Insert embeddings into DB
//   await prisma.$executeRaw`INSERT INTO embedding (vector) VALUES (${vectorEmbedding1}::vector), (${vectorEmbedding2}::vector)`;

//   // Search/Query and retrieve embeddings
//   const results =
//     await prisma.$queryRaw`SELECT id, embedding::text FROM embedding ORDER BY vector >-> ${vector}::vector LIMIT 2`;
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
