"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";
import { deleteSavedBook } from "./queries";

export function DeleteBookButton({
  title,
  gutenbergBookId,
}: {
  title: string | null;
  gutenbergBookId: number;
}) {
  const { toast } = useToast();

  const handleDeleteSavedBook = async () => {
    await deleteSavedBook(gutenbergBookId);

    toast({
      title: `${title} removed from bookshelf`,
      variant: "destructive",
      description: "You can readd it to your bookshelf anytime",
    });
  };

  return (
    <Button
      onClick={handleDeleteSavedBook}
      variant="link"
      className="text-destructive z-50 text-xs place-self-end text-right my-4"
    >
      <BookX />
      Remove from Bookshelf
    </Button>
  );
}
