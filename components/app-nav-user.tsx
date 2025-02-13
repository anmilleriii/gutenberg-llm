import { auth } from "@/auth";
import { NavUser } from "./nav-user";

export async function AppNavUser() {
  const session = await auth();

  const user = {
    name: session?.user?.name ?? undefined,
    email: session?.user?.email ?? undefined,
    avatar: session?.user?.image ?? undefined,
  };

  return <NavUser user={user} />;
}
