import { mockBookMetadata } from "@/lib/utils/mocks";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chat } from "./chat";

describe("<Chat />", () => {
  it("asking a question appends the user message to the log", async () => {
    render(
      <Chat
        title={mockBookMetadata.title}
        gutenbergBookId={mockBookMetadata.gutenbergBookId}
        content="Test book content"
      />
    );

    expect(screen.queryAllByRole("article")).toHaveLength(0);

    await userEvent.type(
      screen.getByPlaceholderText(/Ask a question about Crime and Punishment/i),
      "What is this book about?"
    );
    await userEvent.keyboard("{Enter}");

    expect(await screen.findByRole("article")).toHaveTextContent(
      "What is this book about?"
    );
  });

  it("clicking on a suggested question appends the user message to the log", async () => {
    render(
      <Chat
        title={mockBookMetadata.title}
        gutenbergBookId={mockBookMetadata.gutenbergBookId}
        content="Test book content"
      />
    );

    expect(screen.queryAllByRole("article")).toHaveLength(0);

    await userEvent.click(screen.getByText("Summarize Crime and Punishment"));

    expect(await screen.findByRole("article")).toHaveTextContent(
      "Summarize Crime and Punishment"
    );
  });
});
