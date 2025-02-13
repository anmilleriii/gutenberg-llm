import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";

const embeddingModel = openai.embedding("text-embedding-3-small");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

const BATCH_SIZE = 1500;

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }> | undefined> => {
  const chunks = generateChunks(value);

  try {
    const results: Array<{ embedding: number[]; content: string }> = [];

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      try {
        const { embeddings } = await embedMany({
          model: embeddingModel,
          values: batch,
        });
        results.push(
          ...embeddings.map((e, j) => ({ content: batch[j], embedding: e }))
        );
      } catch (e) {
        console.error(e);
      }
    }
    return results;
  } catch (e) {
    console.error(e);
  }
};

export const generateEmbedding = async (
  value: string
): Promise<number[] | undefined> => {
  const input = value.replaceAll("\\n", " ");

  try {
    const { embedding } = await embed({
      model: embeddingModel,
      value: input,
    });
    return embedding;
  } catch (e) {
    console.error(e);
  }
};
