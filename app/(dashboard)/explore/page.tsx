import { SearchBooksByTitleForm } from "@/lib/features/explore/search-books-form/search-books-by-title";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";

export default async function ExplorePage() {
  await redirectUnauthenticatedToLogin();

  return <SearchBooksByTitleForm />;
}
