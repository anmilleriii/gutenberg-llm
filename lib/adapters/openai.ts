import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";

const embeddingModel = openai.embedding("text-embedding-3-small");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string
): Promise<Array<{ embedding: number[]; content: string }> | undefined> => {
  const chunks = generateChunks(value);

  try {
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
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
