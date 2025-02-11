import { GutenbergBookMetadata } from "@prisma/client";
import { default as Image } from "next/image";

export async function BookChatHeader({
  title,
  dateIssued,
  gutenbergBookId,
  imageHref,
  authors,
  bookshelves,
  subjects,
}: GutenbergBookMetadata) {
  return (
    <div>
      <div className="flex items-center ">
        {imageHref && (
          <Image
            className="mx-12 my-4"
            src={imageHref}
            width={100}
            height={100}
            alt={title ?? ""}
          />
        )}
        <div className="flex flex-col w-full">
          {/* <SaveBookButton bookId={String(id)} image={imageHref} /> */}
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <h2 className="scroll-m-20  pb-2 text-xl tracking-tight first:mt-0">
            {authors}
          </h2>
          <div className="[&>p]:text-xs text-muted-foreground">
            <p>Gutenberg Book ID: {gutenbergBookId}</p>
            <p>Bookshelves: {bookshelves}</p>
            <p>Subjects: {subjects}</p>
            <p>Date Published: {new Date(dateIssued ?? "").toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="flex pl-12 p-8">
        {/* <p className="leading-6  text-sm flex-[2]">{summaries?.[0]}</p> */}
      </div>
    </div>
  );
}
