import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { prisma } from "@/prisma/client";
import Image from "next/image";
import { DeleteBookButton } from "./delete-book";

async function getBooks() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  return prisma.savedBook.findMany({
    where: {
      userId: session.user.id,
    },
  });
}
export async function Bookshelf() {
  const books = await getBooks();
  console.log({ books });
  //   todo no n1

  return (
    <div>
      <h1>Bookshelf</h1>

      {books?.map((book) => (
        <Card key={book.gutenbergBookId}>
          <CardHeader>
            {book.gutenbergBookId} <DeleteBookButton savedBookId={book.id} />
          </CardHeader>

          {book.gutenbergBookImageHref && (
            <Image
              className="mx-12 my-4"
              src={book.gutenbergBookImageHref}
              width={150}
              height={150}
              alt={book.gutenbergBookId}
            />
          )}
          <CardDescription>
            {new Date(book.createdAt).toDateString()}
          </CardDescription>
          <CardContent></CardContent>
        </Card>
      ))}
    </div>
  );
}
