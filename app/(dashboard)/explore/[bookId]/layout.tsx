import { getBookContentById } from "@/lib/adapters/gutenberg";

import { BookHeader } from "@/lib/features/chat/book-header";
import { getGutenbergBookMetadataById } from "@/lib/features/search/actions";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function BookLayout({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{ bookId: string }>;
}>) {
  await redirectUnauthenticatedToLogin();

  const bookId = parseInt((await params).bookId);
  const [metadata, content] = await Promise.all([
    getGutenbergBookMetadataById(bookId),
    getBookContentById(bookId),
  ]);

  if (!metadata?.title || !content) {
    return notFound();
  }

  return (
    <div className="flex flex-col justify-between min-h-full">
      <BookHeader {...metadata} />
      {children}
    </div>
  );
}
