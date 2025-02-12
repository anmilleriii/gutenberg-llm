"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import Link from "next/link";
import { saveBook } from "./queries";

export function SaveBookButton({
  title,
  gutenbergBookId,
}: {
  title: string | null;
  gutenbergBookId: number;
}) {
  const { toast } = useToast();

  const handleSaveBook = async () => {
    await saveBook(gutenbergBookId);

    toast({
      title: `${title} saved`,
      description: (
        <p>
          View your books in your{" "}
          <Link href="/bookshelf" className="underline font-semibold">
            bookshelf
          </Link>
        </p>
      ),
    });
  };

  return (
    <Button
      onClick={handleSaveBook}
      className="my-4 hover:bg-accent hover:text-accent-foreground md:place-self-end right-0"
    >
      <Book />
      Add to Bookshelf
    </Button>
  );
}
