import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { DeleteBookButton } from "./delete-book";
import { getGutenbergBookMetadataOfSavedBooks } from "./queries";

export async function Bookshelf() {
  const books = await getGutenbergBookMetadataOfSavedBooks();

  return (
    <div>
      <h1>Saved Books</h1>

      {books?.map((book) => (
        <Link
          className="hover:opacity-70 transition-[opacity]"
          key={book.title}
          href={`/explore/${book.gutenbergBookId}`}
        >
          <Card className="w-[300px]  aspect-video">
            <CardHeader className="text-md font-semibold pb-2 space-y-4">
              {/* todo  */}
              <DeleteBookButton savedBookId={book.gutenbergBookId} />
              {book.imageHref && (
                <Image
                  src={book.imageHref}
                  width={100}
                  height={100}
                  alt={book.title ?? "Image"}
                />
              )}
              <h2>{book.title}</h2>
            </CardHeader>
            <CardContent>
              <p>{book.authors}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
