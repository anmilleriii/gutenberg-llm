import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GutenbergBookMetadata } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function SearchBooksResultsList({
  results,
}: {
  results?: GutenbergBookMetadata[];
}) {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardHeader className="text-xl font-semibold">No results</CardHeader>
      </Card>
    );
  }
  console.log({ results });
  return (
    <div className="w-full  flex flex-row flex-wrap gap-12">
      {results?.map((result, index) => (
        <Link
          className="hover:opacity-70 transition-[opacity]"
          key={`${result.title}-${index}`}
          href={`/explore/${result.gutenbergBookId}`}
        >
          <Card className="w-[300px]  aspect-video">
            <CardHeader className="text-md font-semibold pb-2 space-y-4">
              {result.imageHref && (
                <Image
                  src={result.imageHref}
                  width={100}
                  height={100}
                  alt={result.title ?? "Image"}
                />
              )}
              <h2>{result.title}</h2>
            </CardHeader>
            <CardContent>
              <p>{result.authors}</p>
            </CardContent>
          </Card>
        </Link>
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
