import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookMarked } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getGutenbergBookMetadataOfSavedBooks } from "./actions";
import { DeleteBookButton } from "./delete-book-button";

export async function Bookshelf() {
  const books = await getGutenbergBookMetadataOfSavedBooks();

  return (
    <div className="flex flex-col gap-12  w-full">
      <h1 className="inline-flex items-center gap-3">
        <BookMarked height={46} width={46} />
        Saved Books
      </h1>

      <div className="gap-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 w-full  min-w-fit xl:w-2/3">
        {!books || books.length === 0 ? (
          <h3>You have not saved any books yet</h3>
        ) : (
          books?.map((book) => (
            <Card
              key={book.gutenbergBookId}
              className="max-w-[400px] break-inside-avoid-column aspect-video"
            >
              <CardHeader>
                <Link
                  className="hover:opacity-70 transition-[opacity] flex flex-col items-center gap-4"
                  href={`/explore/${book.gutenbergBookId}`}
                >
                  <div className="relative h-64 aspect-square">
                    {book.imageHref && (
                      <Image
                        src={book.imageHref}
                        fill
                        className="object-contain"
                        alt={book.title ?? "Image"}
                      />
                    )}
                  </div>
                  <h3>{book.title}</h3>
                </Link>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-sm">{book.authors}</p>
                <DeleteBookButton
                  gutenbergBookId={book.gutenbergBookId}
                  title={book.title}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
