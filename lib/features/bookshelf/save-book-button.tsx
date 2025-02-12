"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

import { saveBook } from "./queries";

export function SaveBookButton({
  gutenbergBookId,
}: {
  gutenbergBookId: number;
}) {
  const { toast } = useToast();

  const handleClick = async () => {
    await saveBook(gutenbergBookId);

    toast({
      title: "Book saved",
      description: "View your books in your bookshelf",
    });
  };

  return (
    <Button onClick={handleClick} className="md:place-self-end right-0">
      <Book />
      Save to Bookshelf
    </Button>
  );
}
