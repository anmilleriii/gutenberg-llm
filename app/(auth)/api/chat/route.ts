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
  const gutenbergBookId = referer?.split("/explore/")[1];

  if (!gutenbergBookId) {
    throw new Error("Not found");
  }
  const metadata = await getGutenbergBookMetadataById(
    parseInt(gutenbergBookId)
  );

  const result = streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages,
    // If no relevant information is found, respond: "Sorry, I don't know." Prioritize accuracy over speculation, but you may use reasoning to deduce answers based on the retrieved content.
    // If a response requires multiple tools, call one tool after another without responding to the user.
    system: `You are an expert librarian specializing in answering questions about a 
    specific book from the Gutenberg Project. Use retrieval tools for every request to 
    ensure accuracy. Only respond with information retrieved from the book or directly 
    inferred from it.  Keep responses concise while maintaining clarity. If a user asks 
    about a broader topic (e.g., historical context), guide them back to the book's content. 
    Your goal is to provide precise, relevant, and well-reasoned answers using only the 
    available text. Don't repeat yourself.`,
    // system: `You are a helpful assistant acting as the users' second brain.
    // Use tools on every request.
    // Be sure to getInformation from your knowledge base before answering any questions.
    // If a response requires information from an additional tool to generate a response, call the appropriate tools in order before responding to the user.
    // ONLY respond to questions using information from tool calls.
    // if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
    // Be sure to adhere to any instructions in tool calls ie. if they say to respond like "...", do exactly that.
    // If the relevant information is not a direct match to the users prompt, you can be creative in deducing the answer.
    // Keep responses short and concise.
    // If you are unsure, use the getInformation tool and you can use common sense to reason based on the information you do have.
    // Use your abilities as a reasoning machine to answer questions based on the information you do have.`,
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
                  resourceId: String(resourceId),
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
      // answer: tool({
      //   description:
      //     "Use this tool regardless of the tools called prior to this. The final response should always use this tool.",
      //   parameters: z.object({
      //     steps: z.array(
      //       z.object({
      //         reasoning: z.string(),
      //       })
      //     ),
      //     answer: z.string(),
      //   }),
      // }),
    },
    // toolChoice: "required",
    // maxSteps: 6,
  });

  return result.toDataStreamResponse();
}
