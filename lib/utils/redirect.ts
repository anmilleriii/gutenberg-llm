import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function redirectAuthenticatedToDashboad() {
  const session = await auth();
  if (session) {
    redirect("/explore");
  }
}

export async function redirectUnauthenticatedToLogin() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
}
