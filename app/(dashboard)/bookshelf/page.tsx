import { Bookshelf } from "@/lib/features/bookshelf/bookshelf";
import { redirectUnauthenticatedToLogin } from "@/lib/utils/redirect";

export default async function Page() {
  await redirectUnauthenticatedToLogin();

  return <Bookshelf />;
}
