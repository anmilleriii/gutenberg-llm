import { prisma } from "@/prisma/client";
import { Resource } from "@prisma/client";

export async function createResource({
  content,
  gutenbergBookId,
}: Pick<Resource, "content" | "gutenbergBookId">) {
  console.log("called", { gutenbergBookId });

  const resource = await prisma.resource.upsert({
    where: {
      gutenbergBookId,
    },
    update: {},
    create: { content, gutenbergBookId },
  });
  console.log("added resource");

  return;
}

// 2 create the embeddings for the resource

// 3 return

//   const [resource] = await db
//   .insert(resources)
//   .values({ content })
//   .returning();

// const embeddings = await generateEmbeddings(content);
// await db.insert(embeddingsTable).values(
//   embeddings.map((embedding) => ({
//     resourceId: resource.id,
//     ...embedding,
//   })),
// );
// return "Resource successfully created and embedded.";
