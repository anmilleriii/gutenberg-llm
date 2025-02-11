"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils/tailwind";
import { GutenbergBookMetadata } from "@prisma/client";

import { useChat } from "ai/react";
import { useRef } from "react";

export function Chat({ title }: Pick<GutenbergBookMetadata, "title">) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      maxSteps: 4,
    });

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-grow flex flex-col justify-between w-full xl:w-4/5 mx-auto ">
      {/* chips suggested questions */}

      <ScrollArea ref={scrollRef} className="h-[500px] rounded-md  p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex justify-end gap-4 py-4",
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
              {/* {JSON.stringify(m)} */}
              {m.content.length > 0 ? (
                m.content
              ) : (
                <span className="italic font-light">
                  {`Reading ${title}...`}
                </span>
              )}
            </p>
          </div>
        ))}
      </ScrollArea>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          scrollRef.current?.scrollTo(0, 0);
        }}
      >
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
