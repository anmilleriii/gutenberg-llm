"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  getBookContentById,
  getBookMetadataById,
} from "../client/gutenberg-client";

const schema = z.object({
  bookId: z.string().length(10, {
    message: "Gutenberg book ID's are 10 characters long.",
  }),
});
type Schema = z.infer<typeof schema>;

export function SearchBooksResultsList() {

  return (
   < 
  )
}
