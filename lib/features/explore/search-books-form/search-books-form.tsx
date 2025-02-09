"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const schema = z.object({
  bookId: z.string().length(10, {
    message: "Gutenberg book ID's are 10 characters long.",
  }),
});
type Schema = z.infer<typeof schema>;

export function SearchBooksForm() {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Schema) => {
    console.log(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={methods.control}
          name="bookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gutenberg Book ID</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="1234567" {...field} />
              </FormControl>
              {/* <FormDescription>Search by Gutenberg Book ID</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon /> Search
        </Button>
      </form>
    </Form>
  );
}
