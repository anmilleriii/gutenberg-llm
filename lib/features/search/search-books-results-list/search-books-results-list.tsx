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
    return (
      <Card>
        <CardHeader className="text-xl font-semibold">No results</CardHeader>
      </Card>
    );
  }

  return (
    <div className="w-full  flex flex-row flex-wrap gap-12">
      {results?.map((result, index) => (
        <Link
          className="hover:opacity-70 transition-[opacity]"
          key={`${result.title}-${index}`}
          href={`/explore/${result.gutenbergBookId}`}
        >
          <Card className="w-[300px]  aspect-video">
            <CardHeader className="pb-2 space-y-4">
              {result.imageHref && (
                <Image
                  src={result.imageHref}
                  width={100}
                  height={100}
                  alt={result.title ?? "Image"}
                />
              )}
              <h4>{result.title}</h4>
            </CardHeader>
            <CardContent>
              <p>{result.authors}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
