import { getBookContentById } from "@/lib/adapters/gutenberg";
import { Chat } from "@/lib/features/chat/chat";
import { createResource } from "@/lib/features/chat/rag/actions/resources";
import { BookChatHeader } from "@/lib/features/search/book-detail/book-chat-header";
import { getGutenbergBookMetadataById } from "@/lib/features/search/search-books-form/queries";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  await redirectUnauthenticatedToLogin();

  const bookId = (await params).bookId;
  const [metadata, content] = await Promise.all([
    getGutenbergBookMetadataById(bookId),
    getBookContentById(bookId),
  ]);

  if (!metadata?.title || !content) {
    return notFound();
  }

  await createResource({
    content,
    gutenbergBookId: bookId,
  });

  return (
    <div className="flex flex-col justify-between min-h-full">
      <BookChatHeader {...metadata} />
      <Chat title={metadata.title} />
    </div>
  );
}
