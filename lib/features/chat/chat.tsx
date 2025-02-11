"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils/tailwind";
import { GutenbergBookMetadata } from "@prisma/client";

import { useChat } from "ai/react";

export function Chat({ title }: Pick<GutenbergBookMetadata, "title">) {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat();
  // addToolResult({
  //   type: "addResource",
  //   result:})

  return (
    <div className="flex-grow flex flex-col justify-between w-full xl:w-2/3 mx-auto ">
      {/* chips suggested questions */}

      <ScrollArea className="h-[400px] rounded-md border p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex justify-end gap-4 py-4",
              // "whitespace-pre-wrap",
              m.role === "user" ? "text-right" : "text-left"
            )}
          >
            <p
              className={cn(
                m.role === "user"
                  ? "px-4 py-1 text-muted-foreground rounded-md bg-muted w-fit"
                  : "text-slate-500 w-full"
              )}
            >
              {m.content.length > 0 ? (
                m.content
              ) : (
                <span className="italic font-light">
                  {"calling tool: " + m?.parts?.[0].type}
                </span>
              )}
            </p>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          className="pt-4 pb-24 items-start  "
          value={input}
          placeholder={`Ask a question about ${title}`}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
