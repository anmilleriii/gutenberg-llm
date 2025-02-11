import {
  getBookContentById,
  getBookMetadataById,
} from "@/lib/clients/gutenberg-client";
import { BookChatHeader } from "@/lib/features/chat/book-chat-header";
import { Chat } from "@/lib/features/chat/chat";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  await redirectUnauthenticatedToLogin();

  const bookId = (await params).bookId;

  // todo not waterfall
  const metadata = await getBookMetadataById(Number(bookId));
  const content = await getBookContentById(bookId);

  if (!metadata?.title) {
    return notFound();
  }

  return (
    <div>
      <BookChatHeader {...metadata} />
      <Chat {...metadata} />
      {content}
    </div>
  );
}
