import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GutenbergBookMetadata } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export function SearchBooksResultsList({
  results,
}: {
  results: GutenbergBookMetadata[] | null;
}) {
  if (!results) {
    return null;
  }

  if (results.length === 0) {
    return <h3>No results</h3>;
  }

  return (
    <div className="gap-4 columns-1 sm:columns-2 md:columns-3 lg:columns-4 w-full  min-w-fit xl:w-2/3">
      {results?.map((result, index) => (
        <Link
          className="hover:opacity-70 transition-[opacity] h-fit w-full"
          key={`${result.title}-${index}`}
          href={`/explore/${result.gutenbergBookId}`}
        >
          <Card className="min-w-[300px] max-w-[400px] break-inside-avoid-column aspect-video [&:not(:first-child)]:mt-10 mb-10">
            <CardHeader className="pb-2 gap-6 flex flex-col items-center">
              {result.imageHref && (
                <Image
                  src={result.imageHref}
                  width={200}
                  height={100}
                  alt={result.title ?? "Image"}
                />
              )}
              <h4>{result.title}</h4>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{result.authors}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
