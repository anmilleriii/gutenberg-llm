"use client";

import { useSession } from "next-auth/react";
import { NavUser } from "./nav-user";

export function AppNavUser() {
  const { data } = useSession();

  const user = {
    name: data?.user?.name,
    email: data?.user?.email,
    avatar: data?.user?.image,
  };

  // @ts-expect-error - asdf
  return <NavUser user={user} />;
}
