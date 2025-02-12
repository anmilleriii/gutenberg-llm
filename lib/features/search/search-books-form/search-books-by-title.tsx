"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ComponentPropsWithoutRef, Suspense, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { GutenbergBookMetadata } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchBooksResultsList } from "../search-books-results-list/search-books-results-list";
import { queryBooks } from "./queries";

const schema = z.object({
  query: z.string().min(3, "Title or ID must be at least 3 characters"),
});

type Schema = z.infer<typeof schema>;

export function SearchBooksByTitleForm({
  className,
}: ComponentPropsWithoutRef<"form">) {
  const methods = useForm<Schema>({ resolver: zodResolver(schema) });
  const [books, setBooks] = useState<
    GutenbergBookMetadata | GutenbergBookMetadata[] | null
  >(null);

  const handleSubmit = async ({ query }: Schema) => {
    const result = await queryBooks({
      query,
      offset: 0,
    });
    setBooks(result);
  };

  return (
    <Suspense fallback={<Skeleton className="h-48 aspect-square" />}>
      <div className="flex flex-col gap-4  w-full">
        <h1 className="text-4xl font-bold">Explore the Gutenberg Archives</h1>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={cn("flex flex-col gap-6 lg:w-1/2", className)}
        >
          <Label>Search books by author, title, or Gutenberg book ID</Label>
          <Input
            autoFocus
            type="text"
            id="query"
            placeholder="Crime and Punishment"
            {...methods.register("query")}
          />
          <Button type="submit">Search</Button>
        </form>
        <SearchBooksResultsList
          results={!books ? null : Array.isArray(books) ? books : [books]}
        />
      </div>
    </Suspense>
  );
}
