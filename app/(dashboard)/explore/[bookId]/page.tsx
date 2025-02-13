import { getBookContentById } from "@/lib/adapters/gutenberg";
import { createEmbeddingsForBook } from "@/lib/features/chat/actions/resources";
import { Chat } from "@/lib/features/chat/chat";
import { getGutenbergBookMetadataById } from "@/lib/features/search/actions";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  await redirectUnauthenticatedToLogin();

  const bookId = parseInt((await params).bookId);
  const [metadata, content] = await Promise.all([
    getGutenbergBookMetadataById(bookId),
    getBookContentById(bookId),
  ]);

  if (!metadata?.title || !content) {
    return notFound();
  }

  await createEmbeddingsForBook({
    content,
    gutenbergBookId: bookId,
  });

  return <Chat {...metadata} content={content} />;
}
