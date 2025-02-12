"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils/tailwind";
import { GutenbergBookMetadata } from "@prisma/client";

import { Textarea } from "@/components/ui/textarea";
import { useChat } from "ai/react";
import { useRef } from "react";
import { SuggestedQuestions } from "./suggested-questions";

export function Chat({
  title,
}: Pick<GutenbergBookMetadata, "title" | "gutenbergBookId"> & {
  content: string;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
  } = useChat({
    maxSteps: 4,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleClickQuestion = (question: string) => {
    append({ role: "user", content: question });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <>
      <div className="flex-grow flex flex-col justify-between w-full xl:w-4/5 mx-auto ">
        <ScrollArea ref={scrollRef} className=" rounded-md  p-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex justify-end gap-4 py-4 text-sm",
                m.role === "user" ? "text-right" : "text-left"
              )}
            >
              <p
                className={cn(
                  m.role === "user"
                    ? "px-4 py-2  text-muted-foreground rounded-md bg-muted w-fit"
                    : "text-slate-500 w-full"
                )}
              >
                {m.content.length > 0 ? (
                  m.content
                ) : (
                  <span className="italic font-light">
                    {isLoading ? `Reading ${title}...` : "Something went wrong"}
                  </span>
                )}
              </p>
            </div>
          ))}
        </ScrollArea>
        <div className="space-y-4">
          {!input && !messages.length && (
            <SuggestedQuestions title={title} onClick={handleClickQuestion} />
          )}
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              scrollRef.current?.scrollTo(0, 0);
            }}
          >
            <Textarea
              autoFocus
              className="pt-4 pb-24 items-start resize-none "
              value={input}
              placeholder={`Ask a question about ${title}`}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </>
  );
}
