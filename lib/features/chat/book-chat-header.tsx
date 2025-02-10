import { Card } from "@/components/ui/card";
import { GutendexBookMetadata } from "@/lib/client/types";

export async function BookChatHeader({ title, authors }: GutendexBookMetadata) {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {title}
      </h1>

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {authors?.[0].name}
      </h2>
      <Card>{/* <CardContent>{JSON.stringify(metadata)}</CardContent> */}</Card>
    </div>
  );
}
