"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ComponentPropsWithoutRef,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { register, RegisterActionState } from "./register-actions";

export function RegisterForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    const handleRegisterSuccess = async () => {
      toast.success("Account created successfully");
      setEmailSent(true);
      await signIn("resend", {
        email,
        redirect: false,
      });
    };

    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      handleRegisterSuccess();

      router.refresh();
    }
  }, [state, router, email]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-balance text-sm text-muted-foreground pb-72">
          Please follow the link sent to {email} to login
        </p>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" autoFocus>
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="gutenberg@example.com"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          type="button"
          onClick={() => signIn("google")}
          variant="outline"
          className="w-full"
        >
          <Image src="/google.svg" alt="logo" width={18} height={18} />
          Register with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Have an account already?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}
