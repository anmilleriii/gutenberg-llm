import { GutendexBookMetadata } from "@/lib/clients/gutenberg-client";
import Image from "next/image";
import { SaveBookButton } from "./save-book-button";

export async function BookChatHeader({
  title,
  summaries,
  authors,
  formats,
  bookshelves,
  copyright,
  id,
  subjects,
}: GutendexBookMetadata) {
  const image = formats["image/jpeg"] || formats["image/png"];

  return (
    <div>
      <div className="flex items-center ">
        <Image
          className="mx-12 my-4"
          src={image}
          width={100}
          height={100}
          alt={title}
        />
        <div className="flex flex-col w-full">
          <SaveBookButton bookId={String(id)} image={image} />
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <h2 className="scroll-m-20  pb-2 text-xl tracking-tight first:mt-0">
            {authors?.[0]?.name}
          </h2>
          <div className="[&>p]:text-xs text-muted-foreground">
            <p>Gutenberg Book ID: {id}</p>
            <p>Bookshelves: {bookshelves.join(", ")}</p>
            <p>Copyright: {copyright || "No"}</p>
            <p>Subjects: {subjects.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="flex pl-12 p-8">
        <p className="leading-6  text-sm flex-[2]">{summaries?.[0]}</p>
      </div>
    </div>
  );
}
