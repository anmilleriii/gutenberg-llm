import { SearchBooks } from "@/lib/features/search/search-books";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";

export default async function ExplorePage() {
  await redirectUnauthenticatedToLogin();

  return <SearchBooks />;
}
