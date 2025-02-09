import { auth } from "@/auth";
import { LoginForm } from "@/lib/features/auth/login-form/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/explore");
  }

  return <LoginForm />;
}
