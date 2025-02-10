"use server";

import { z } from "zod";

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

    // const user = await getUserByEmail(validatedData.email);

    // if (user) {
    //   return { status: "user_exists" } as RegisterActionState;
    // }
    // await createUser({
    //   email: validatedData.email,
    // });

    // 1 create the user
    // 2 signin with nextauth

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.error(error);

    return { status: "failed" };
  }
};
