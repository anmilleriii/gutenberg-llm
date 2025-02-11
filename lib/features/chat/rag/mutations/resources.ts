import { prisma } from "@/prisma/client";
import { Resource } from "@prisma/client";
import { generateEmbeddings } from "../embeddings";
import { writeEmbeddings } from "./embeddings";

export async function createResource({
  content,
  gutenbergBookId,
}: Pick<Resource, "content" | "gutenbergBookId">) {
  console.log("called", { gutenbergBookId });

  // // 1 check if resource already exists
  // const existingResource = await prisma.resource.findUnique({
  //   where: {
  //     gutenbergBookId,
  //   },
  // });
  // if (existingResource) {
  //   return;
  // }

  // // 2 create the resource
  // const resource = await prisma.resource.create({
  //   data: { content, gutenbergBookId },
  // });

  // 2 create the resource
  const resource = await prisma.resource.upsert({
    where: { gutenbergBookId },
    update: {},
    create: { content, gutenbergBookId },
  });

  // 3 generate the embeddings via OpenAI
  const embeddings = await generateEmbeddings("The dog ran over the fence");

  // 4 write the embeddings locally to pgvector, associated with the resource
  const result = await writeEmbeddings({
    resourceId: String(resource.id),
    embeddings,
  });

  return;
}
