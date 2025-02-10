"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GutendexBookMetadata } from "@/lib/client/types";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";

export function Chat({
  title,
  content,
}: GutendexBookMetadata & { content: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // TODO rag content

  const user = "Albert";

  return (
    <div className="flex flex-col w-full py-24">
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
          {m.role === "user" ? `${user}: ` : "Gutenberg LLM: "}
          <p>
            {m.content.length > 0 ? (
              m.content
            ) : (
              <span className="italic font-light">
                {"calling tool: " + m?.parts?.[0].toolName}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

// function Message() {
//   return (

//   )
// }

function Suggestions() {
  return (
    <div className="flex flex-wrap">
      <Badge>What</Badge>
    </div>
  );
}
