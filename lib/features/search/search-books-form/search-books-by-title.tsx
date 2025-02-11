"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ComponentPropsWithoutRef, useState } from "react";

import { cn } from "@/lib/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { GutenbergBookMetadata } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchBooksResultsList } from "../search-books-results-list/search-books-results-list";
import { queryBooksByTitleOrId } from "./queries";

const schema = z.object({
  titleOrId: z.string().min(3, "Title or ID must be at least 3 characters"),
});

type Schema = z.infer<typeof schema>;

export function SearchBooksByTitleForm({
  className,
}: ComponentPropsWithoutRef<"form">) {
  const methods = useForm<Schema>({ resolver: zodResolver(schema) });
  const [books, setBooks] = useState<GutenbergBookMetadata | null>(null);

  const handleSubmit = async ({ titleOrId }: Schema) => {
    const result = await queryBooksByTitleOrId({ titleOrId, offset: 0 });
    // @ts-expect-error asdf
    setBooks(result);
  };

  return (
    <div className="flex flex-col gap-4 ">
      <h1 className="text-4xl font-bold">Explore the Gutenberg Archives</h1>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={cn("flex flex-col gap-6 lg:w-1/2", className)}
      >
        <Label>Search by author, title, or Gutenberg ID</Label>
        <Input
          type="text"
          id="titleOrId"
          autoFocus
          placeholder="Crime and Punishment"
          {...methods.register("titleOrId")}
        />
        <Button type="submit">Search</Button>
      </form>
      {/* @ts-expect-error asdf */}
      <SearchBooksResultsList results={books ?? undefined} />
    </div>
  );
}
