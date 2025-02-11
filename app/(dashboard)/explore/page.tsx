import { auth } from "@/auth";
import { SearchBooksForm } from "@/lib/features/explore/search-books-form/search-books-form";
import { redirect } from "next/navigation";

export default async function ExplorePage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return <SearchBooksForm />;
}
