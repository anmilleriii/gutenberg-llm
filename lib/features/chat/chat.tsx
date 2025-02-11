"use client";

import { Input } from "@/components/ui/input";
import { GutendexBookMetadata } from "@/lib/adapters/gutenberg";
import { cn } from "@/lib/utils/tailwind";
import { useChat } from "ai/react";
import { SessionProvider } from "next-auth/react";
import { AgentAvatar, UserAvatar } from "./chat-avatar";

export function Chat({ title }: GutendexBookMetadata) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full lg:w-1/2 mx-auto ">
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          className="w-full pt-4 pb-24 items-start text-start "
          value={input}
          placeholder={`Ask a question about ${title}`}
          onChange={handleInputChange}
        />
      </form>
      {/* chips suggested questions */}

      {messages.map((m) => (
        <div
          key={m.id}
          className={cn(
            "whitespace-pre-wrap",
            m.role === "user" ? "text-right" : "text-left"
          )}
        >
          {m.role === "user" ? (
            <SessionProvider>
              <UserAvatar />
            </SessionProvider>
          ) : (
            <AgentAvatar name="Gutenberg LLM" src="/gutenberg.webp" />
          )}

          <p>
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
    </div>
  );
}
