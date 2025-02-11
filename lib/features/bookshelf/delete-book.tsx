"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteBook } from "../chat/save-chat-actions";

export function DeleteBookButton({ savedBookId }: { savedBookId: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = async () => {
    await deleteBook({ savedBookId });

    toast({
      title: "Book deleted",
      description: "View your books in your bookshelf",
    });
    router.refresh();
  };

  return (
    <Button onClick={handleClick} variant="link" className="text-destructive">
      Remove
    </Button>
  );
}
