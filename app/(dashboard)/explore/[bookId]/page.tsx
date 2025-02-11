import { getBookContentById } from "@/lib/adapters/gutenberg";
import { BookChatHeader } from "@/lib/features/chat/book-chat-header";
import { Chat } from "@/lib/features/chat/chat";
import { getGutenbergBookMetadataById } from "@/lib/features/explore/search-books-form/queries";
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

  if (!metadata?.title) {
    return notFound();
  }

  return (
    <div>
      <BookChatHeader {...metadata} />
      {/* @ts-expect-error asdf */}
      <Chat {...metadata} />
      {content}
    </div>
  );
}
