"use server";

import {
  getBookMetadataById,
  GutendexBookMetadata,
} from "@/lib/clients/gutenberg-client";
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
  data?: GutendexBookMetadata;
}

export const queryBooksById = async (
  _: QueryBooksActionState,
  formData: FormData
): Promise<QueryBooksActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      id: formData.get("id"),
    });

    const data = await getBookMetadataById(Number(validatedData.id));

    return { status: "success", data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }
    console.error(error);

    return { status: "failed" };
  }
};
