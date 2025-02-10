"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useActionState, useEffect } from "react";

import { RegisterActionState } from "../../auth/register-form/register-actions";
import { SearchBooksResultsList } from "../search-books-results-list/search-books-results-list";
import { queryBooksById } from "./actions";

export function SearchBooksForm({
  className,
  ...props
}: ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    queryBooksById,
    {
      status: "idle",
    }
  );

  useEffect(() => {
    // todo
    if (state.status === "success") {
      console.log({ state });
      // router.push(`/explore/${state}`);
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <>
      <Card className="min-w-96 w-1/2 aspect-video">
        <CardHeader>
          <CardTitle>Search Gutenberg books by ID</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form
            action={handleSubmit}
            className={cn("flex flex-col gap-6", className)}
            {...props}
          >
            <Label>Gutenberg Book ID</Label>
            <Input
              name="id"
              type="text"
              id="id"
              autoFocus
              placeholder="1234567"
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>
      <SearchBooksResultsList results={state.data ? [state.data] : []} />
    </>
  );
}
