import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuggestedQuestions } from "./suggested-questions";

describe("<SuggestedQuestions />", () => {
  it("renders the correct suggested questions", () => {
    render(<SuggestedQuestions title="Test Book" />);

    expect(screen.getByText("Summarize Test Book.")).toBeInTheDocument();
  });

  it("clicking on a suggested question appends the user message to the log", async () => {
    const handleClickQuestion = vi.fn();

    render(
      <SuggestedQuestions title="Test Book" onClick={handleClickQuestion} />
    );

    await userEvent.click(screen.getByText(/Summarize Test Book./i));

    expect(handleClickQuestion).toHaveBeenCalledWith("Summarize Test Book.");
  });
});
