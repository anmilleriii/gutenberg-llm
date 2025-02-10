"use client";

import { Input } from "@/components/ui/input";
import { GutendexBookMetadata } from "@/lib/client/types";
import { useChat } from "ai/react";

export function Chat({ title }: GutendexBookMetadata) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const user = "Albert";

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          className=""
          value={input}
          placeholder={`Ask a question about ${title}`}
          onChange={handleInputChange}
        />
      </form>

      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? `${user}: ` : "Gutenberg LLM: "}
          {m.parts ? (
            <pre>{JSON.stringify(m.parts, null, 2)}</pre>
          ) : (
            <p>{m.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}
