import { prisma } from "@/prisma/client";
import { Resource } from "@prisma/client";
import { generateEmbeddings } from "../../../../adapters/openai";
import { writeEmbeddings } from "./embeddings";

export async function createResource({
  content,
  gutenbergBookId,
}: Pick<Resource, "content" | "gutenbergBookId">) {
  const existingResource = await prisma.resource.findFirst({
    where: { gutenbergBookId },
  });

  if (existingResource) {
    return;
  }

  const resource = await prisma.resource.upsert({
    where: { gutenbergBookId },
    update: {},
    create: { content, gutenbergBookId },
  });

  const embeddings = await generateEmbeddings(content);

  await writeEmbeddings({
    resourceId: String(resource.id),
    embeddings,
  });

  return;
}

export async function getResourceIdByGutenbergBookId(gutenbergBookId?: string) {
  const resource = await prisma.resource.findUnique({
    where: { gutenbergBookId },
  });
  return resource?.id;
}
