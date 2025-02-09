"use server";

import { z } from "zod";

import { signIn } from "next-auth/react";

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
    console.log(formData.get("email"));
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
    });

    // const user = await getUserByEmail(validatedData.email);

    // if (user) {
    //   return { status: "user_exists" } as RegisterActionState;
    // }
    // await createUser({
    //   email: validatedData.email,
    // });
    await signIn("resend", {
      email: validatedData.email,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.log(error);

    return { status: "failed" };
  }
};
