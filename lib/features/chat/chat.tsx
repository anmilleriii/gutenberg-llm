"use client";

import { cn } from "@/lib/utils/tailwind";
import { GutenbergBookMetadata } from "@prisma/client";
import { KeyboardEvent, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
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
    setInput,
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

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        const scrollViewport = scrollRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        ) as HTMLDivElement;
        if (scrollViewport) {
          scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }
      }
    }, 100);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setInput(event.currentTarget.value);
      handleSubmit(event);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className=" flex flex-col gap-12 justify-between w-full xl:w-3/5 mx-auto py-4 ">
        <ScrollArea ref={scrollRef} className=" max-h-[400px] px-6 pb-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex justify-end gap-4 py-4 text-sm",
                m.role === "user" ? "text-right" : "text-left"
              )}
            >
              <p
                role="article"
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
                    {isLoading
                      ? `Reading ${title}...`
                      : "Something went wrong, please try again."}
                  </span>
                )}
              </p>
            </div>
          ))}
        </ScrollArea>

        <div className="space-y-4 justify-self-end">
          {!input && !messages.length && (
            <SuggestedQuestions title={title} onClick={handleClickQuestion} />
          )}
          <form onSubmit={handleSubmit}>
            <Textarea
              key="chat-input"
              id="chat-input"
              autoFocus
              className="pt-4 pb-24 items-start resize-none bg-background shadow-md"
              value={input}
              placeholder={`Ask a question about ${title?.replaceAll(
                /(\r\n|\n|\r)/gm,
                ""
              )}`}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </>
  );
}
