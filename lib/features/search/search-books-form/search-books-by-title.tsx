"use client";

import { ComponentPropsWithoutRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { GutenbergBookMetadata } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { queryBooks } from "./queries";
import { SearchBar } from "./search-bar";

const schema = z.object({
  query: z.string().min(3, "Title or ID must be at least 3 characters"),
});

type Schema = z.infer<typeof schema>;

export function SearchBooksByTitleForm({
  className,
}: ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const methods = useForm<Schema>({ resolver: zodResolver(schema) });
  const [books, setBooks] = useState<GutenbergBookMetadata | null>(null);

  const handleSubmit = async (e: string) => {
    // router.push(`/explore?query=${e}`);
    console.log(e);
    const result = await queryBooks({
      query: e,
      // offset: offset ? parseInt(offset) : 0,
    });

    setBooks(result);
    console.log(result);
  };
  // router.push(`/explore?query=${query}&offset=${0}`);

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-4xl font-bold">Explore the Gutenberg Archives</h1>
      <SearchBar onValueChange={handleSubmit} results={books} />
      {/* <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={cn("flex flex-col gap-6 lg:w-1/2", className)}
      >
        <Label>Search books by author, title, or Gutenberg book ID</Label>
        <Input
          type="text"
          id="query"
          autoFocus
          placeholder="Crime and Punishment"
          {...methods.register("query")}
        />
        <Button type="submit">Search</Button>
      </form> */}
      {/* <SearchBooksResultsList results={books ?? undefined} /> */}
    </div>
  );
}
