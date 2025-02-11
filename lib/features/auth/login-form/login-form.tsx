"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type Schema = z.infer<typeof schema>;

export function LoginForm({ className }: ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const methods = useForm<Schema>({ resolver: zodResolver(schema) });

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async ({ email }: Schema) => {
    setEmailSent(true);
    await signIn("resend", {
      email,
      redirect: false,
    });
    router.refresh();
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Check your email</h1>
        <p className="text-balance text-sm text-muted-foreground pb-72">
          Please follow the link sent to {methods.getValues("email")} to login
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={methods.handleSubmit(handleSubmit)}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Welcome to Gutenberg LLM</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            autoFocus
            id="email"
            type="email"
            placeholder="gutenberg@example.com"
            {...methods.register("email")}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button
          onClick={() => signIn("google")}
          type="button"
          variant="outline"
          className="w-full"
        >
          <Image src="/google.svg" alt="logo" width={18} height={18} />
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
