import { auth } from "@/auth";
import { getBookMetadataById } from "@/lib/client/gutenberg-client";
import { BookChatHeader } from "@/lib/features/chat/book-chat-header";
import { Chat } from "@/lib/features/chat/chat";
import { notFound, redirect } from "next/navigation";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const bookId = (await params).bookId;
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const metadata = await getBookMetadataById(Number(bookId));
  if (!metadata?.title) {
    return notFound();
  }

  return (
    <div>
      <BookChatHeader {...metadata} />
      <Chat {...metadata} />
    </div>
  );
}
