import { auth } from "@/auth";
import {
  getBookContentById,
  getBookMetadataById,
} from "@/lib/client/gutenberg-client";
import { BookChatHeader } from "@/lib/features/chat/book-chat-header";
import { Chat } from "@/lib/features/chat/chat";
import { notFound, redirect } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const bookId = (await params).bookId;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // todo not waterfall
  const metadata = await getBookMetadataById(Number(bookId));
  const content = await getBookContentById(bookId);

  if (!metadata?.title) {
    return notFound();
  }

  return (
    <div>
      <BookChatHeader {...metadata} />
      <Chat {...metadata} content={content} />
      {content}
    </div>
  );
}
