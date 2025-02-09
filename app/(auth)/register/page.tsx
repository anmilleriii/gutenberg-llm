import { auth } from "@/auth";
import { RegisterForm } from "@/lib/features/auth/register-form/register-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect("/explore");
  }

  return <RegisterForm />;
}
