"use server";

import { z } from "zod";

import { createUser, getUserByEmail } from "@/app/(auth)/queries";
import { signIn } from "../auth";

const authFormSchema = z.object({
  email: z.string().email(),
});

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
    });

    const user = await getUserByEmail(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    }
    await createUser({
      email: validatedData.email,
    });
    await signIn("credentials", {
      email: validatedData.email,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
