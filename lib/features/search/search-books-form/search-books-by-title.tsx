"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ComponentPropsWithoutRef, useState } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { GutenbergBookMetadata } from "@prisma/client";
import { Search } from "lucide-react";
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
    <div className="flex flex-col gap-12 ">
      <h1 className="inline-flex items-center gap-3">
        <Search className="min-h-[50px] min-w-[50px]" height={50} width={50} />
        Explore the Gutenberg Archives
      </h1>
      <Card className="p-12 lg:w-2/3">
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={cn("flex flex-col gap-6 ", className)}
        >
          <Label className="text-lg">
            Search books by author, title, or Gutenberg book ID
          </Label>
          <div className="flex flex-col lg:flex-row items-center gap-10 ">
            <Input
              autoFocus
              type="text"
              id="query"
              placeholder="Crime and Punishment"
              className="h-12"
              {...methods.register("query")}
            />
            <Button
              type="submit"
              className="p-6 text-xl font-bold hover:bg-accent hover:text-accent-foreground"
            >
              Search
            </Button>
          </div>
        </form>
      </Card>
      <SearchBooksResultsList
        results={!books ? null : Array.isArray(books) ? books : [books]}
      />
    </div>
  );
}
