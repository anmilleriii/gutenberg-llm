"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import { saveBook } from "./save-chat-actions";

export function SaveBookButton({ bookId }: { bookId: string; image?: string }) {
  const { toast } = useToast();
  // todo get books don't show
  const handleClick = async () => {
    await saveBook({ gutenbergBookId: bookId });

    toast({
      title: "Book saved",
      description: "View your books in your bookshelf",
    });
  };

  return (
    <Button onClick={handleClick} className="place-self-end right-0">
      <Book />
      Save to Bookshelf
    </Button>
  );
}
