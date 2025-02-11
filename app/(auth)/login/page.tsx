import { LoginForm } from "@/lib/features/auth/login-form/login-form";
import { redirectAuthenticatedToDashboad } from "@/lib/utils/redirect";

export default async function Page() {
  await redirectAuthenticatedToDashboad();

  return <LoginForm />;
}
