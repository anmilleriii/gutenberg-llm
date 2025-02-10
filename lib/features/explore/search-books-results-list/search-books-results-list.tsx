import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export function SearchBooksResultsList({ results }: { results: Book[] }) {
  console.log({ results });
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
    <Card>
      <CardHeader className="text-xl font-semibold">Results</CardHeader>
      <CardContent>
        {results?.map((result) => (
          <Link
            className="hover:opacity-70 transition-[opacity]"
            key={result.title}
            href={`/explore/${result.id}`}
          >
            <Card>
              <CardHeader className="text-lg font-semibold pb-2">
                {result.title}
              </CardHeader>
              <CardContent>
                <p>{result.authors?.[0].name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
