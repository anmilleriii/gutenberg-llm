import { RegisterForm } from "@/lib/features/auth/register-form/register-form";
import { redirectAuthenticatedToDashboad } from "@/lib/utils/redirect";

export default async function Page() {
  await redirectAuthenticatedToDashboad();

  return <RegisterForm />;
}
