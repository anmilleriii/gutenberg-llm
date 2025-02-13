import { querySimilarContent } from "@/lib/features/chat/actions/embeddings";
import { getGutenbergBookMetadataById } from "@/lib/features/search/actions";
import { groq } from "@ai-sdk/groq";
import { generateText, streamText, tool } from "ai";
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

  const metadata = await getGutenbergBookMetadataById(gutenbergBookId);

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
    system: `You are a librarian focusing on answering questions about a specific book from the Gutenberg Project. 
    If the user's question includes the word "this", then they are likely referring to the book itself.
    Always ensure accuracy by retrieving relevant content from your knowledge base using the appropriate retrieval tools.
    Be sure to getInformation from your knowledge base before answering any questions.
    If a response requires multiple tools, call one tool after another without responding to the user.
    Your responses should be precise, relevant, include details and context directly from the book, and primarily based on the book's content or logical inferences derived directly from it.
    That said, you can be creative, like a librarian, focusing on critical analysis and logical arguments.
     Do not repeat yourself. 
     If the user asks about a broader topic (e.g., historical context), politely redirect them to content within the book. 
     Prioritize reliability in the retrieval process to ensure each function call yields correct and relevant information.
    Use your abilities as a reasoning machine to answer questions based on the information you do have.
    `,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
          keywords: z.array(z.string()).describe("keywords to search"),
        }),

        execute: async ({ keywords }) => {
          const results = await Promise.all(
            keywords.map(
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
          return uniqueResults;
        },
      }),
      getAuthorAndDateInformation: tool({
        description: `get author, date, and other details about the book that are not related to the plot of the book.`,
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
    onError: (e) => console.error(e),
  });

  return result.toDataStreamResponse();
}
