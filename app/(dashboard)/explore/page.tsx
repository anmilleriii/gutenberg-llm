import { SearchBooksForm } from "@/lib/search-books-form/search-books-form";

export default function Page() {
  return (
    <main className="flex flex-col content-start  p-16">
      <h1>Search Gutenberg books by ID</h1>
      <SearchBooksForm />
    </main>
  );
}
