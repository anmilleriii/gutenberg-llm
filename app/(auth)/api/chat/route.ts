import { querySimilarContent } from "@/lib/features/chat/rag/actions/embeddings";
import { getGutenbergBookMetadataById } from "@/lib/features/search/search-books-form/queries";
import { groq } from "@ai-sdk/groq";
import { generateObject, generateText, streamText, tool } from "ai";
import { headers } from "next/headers";
import { z } from "zod";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const headersList = await headers();
  const referer = headersList.get("referer");
  const bookIdParam = referer?.split("/explore/")[1];

  if (!bookIdParam) {
    throw new Error("Not found");
  }

  const gutenbergBookId = parseInt(bookIdParam);

  const metadata = await getGutenbergBookMetadataById();

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
    system: `You are an expert librarian specializing in answering questions about a 
    specific book from the Gutenberg Project. Use retrieval tools for every request to 
    ensure accuracy. Only respond with information retrieved from the book or directly 
    inferred from it.  Keep responses concise while maintaining clarity. If a user asks 
    about a broader topic (e.g., historical context), guide them back to the book's content. 
    Your goal is to provide precise, relevant, and well-reasoned answers using only the 
    available text. Don't repeat yourself.`,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
          similarQuestions: z.array(z.string()).describe("keywords to search"),
        }),

        execute: async ({ similarQuestions }) => {
          const results = await Promise.all(
            similarQuestions.map(
              async (question) =>
                await querySimilarContent({
                  gutenbergBookId,
                  content: question,
                })
            )
          );
          const uniqueResults = Array.from(
            new Map(results.flat().map((item) => [item?.id, item])).values()
          );
          console.log({ uniqueResults });
          return uniqueResults;
        },
      }),
      understandQuery: tool({
        description: `understand the users query.`,
        parameters: z.object({
          query: z.string().describe("the users query"),
          toolsToCallInOrder: z
            .array(z.string())
            .describe(
              "these are the tools you need to call in the order necessary to respond to the users query"
            ),
        }),
        execute: async ({ query }) => {
          const { object } = await generateObject({
            model: groq("llama-3.3-70b-versatile"),
            system:
              "You are a query understanding assistant. Analyze the user query and generate similar questions.",
            schema: z.object({
              questions: z
                .array(z.string())
                .max(3)
                .describe("similar questions to the user's query. be concise."),
            }),
            prompt: `Analyze this query: "${query}". Provide the following:
                    3 similar questions that could help answer the user's query`,
          });
          return object.questions;
        },
      }),
      getBookMetadata: tool({
        description: `get book metadata and overview information. use this tool if the user asks about the book itself, not the plot of the book.`,
        parameters: z.object({
          query: z.string().describe("the users query"),
        }),
        execute: async ({ query }) => {
          const result = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system:
              "You are a librarian. Analyze the user query and determine if they are asking a question about the book itself, such as the author or date written, not the plot of the book.",
            prompt: `The follow includes information about a book from the Gutenberg Project: "${JSON.stringify(
              metadata
            )}". Given the following query, use the book information if it is helpful: "${query}`,
          });
          return result.text;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
