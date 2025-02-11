import { generateText } from "ai";
import { MockLanguageModelV1 } from "ai/test";

const result = await generateText({
  model: new MockLanguageModelV1({
    doGenerate: async () => ({
      rawCall: { rawPrompt: null, rawSettings: {} },
      finishReason: "stop",
      usage: { promptTokens: 10, completionTokens: 20 },
      text: `Hello, world!`,
    }),
  }),
  prompt: "Hello, test!",
});

describe("Chat", () => {
  it("should generate text", async () => {
    expect(result).toBe("Hello, world!");
  });
});
