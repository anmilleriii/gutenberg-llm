import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Skeleton className="h-28 p-4 flex flex-col justify-between w-full xl:w-4/5 mx-auto text-muted-foreground">
      Reading and analyzing books, this will take a minute...
    </Skeleton>
  );
}
