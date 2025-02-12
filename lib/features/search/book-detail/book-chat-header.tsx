import { GutenbergBookMetadata } from "@prisma/client";
import { default as Image } from "next/image";
import { DeleteBookButton } from "../../bookshelf/delete-book";
import { getSavedBookById } from "../../bookshelf/queries";
import { SaveBookButton } from "../../bookshelf/save-book-button";

export async function BookChatHeader({
  title,
  gutenbergBookId,
  imageHref,
  authors,
  bookshelves,
  subjects,
}: GutenbergBookMetadata) {
  const savedBook = await getSavedBookById(gutenbergBookId);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center text-center md:text-left w-full xl:w-4/5 mx-auto ">
        {imageHref && (
          <Image
            className="mx-12 my-4"
            src={imageHref}
            width={150}
            height={100}
            alt={title ?? ""}
          />
        )}
        <div className="flex flex-col items-center md:items-start w-full gap-4">
          {savedBook ? (
            <DeleteBookButton
              gutenbergBookId={savedBook?.gutenbergBookId}
              title={title}
            />
          ) : (
            <SaveBookButton gutenbergBookId={gutenbergBookId} title={title} />
          )}
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <h2 className="scroll-m-20  pb-2 text-xl tracking-tight first:mt-0">
            {authors}
          </h2>
          <div className="[&>p]:text-xs text-muted-foreground *:!mt-1  ">
            <p>Gutenberg Book ID: {gutenbergBookId}</p>
            <p>Bookshelves: {bookshelves}</p>
            <p>Subjects: {subjects}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
