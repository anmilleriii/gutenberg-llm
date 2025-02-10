"use server";

import { getBookMetadataById } from "@/lib/client/gutenberg-client";
import { z } from "zod";

const authFormSchema = z.object({
  id: z.string().min(1).max(10),
});

export interface QueryBooksActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const queryBooksById = async (
  _: QueryBooksActionState,
  formData: FormData
): Promise<QueryBooksActionState> => {
  try {
    console.log(formData.get("id"));
    const validatedData = authFormSchema.parse({
      id: formData.get("id"),
    });

    const result = await getBookMetadataById(validatedData.id);
    const d = await result?.text();
    console.log({ d });

    return { status: "success", data: d };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.log(error);

    return { status: "failed" };
  }
};
