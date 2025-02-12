import { render } from "@testing-library/react";
import { Bookshelf } from "./bookshelf";

describe("<Bookshelf />", () => {
  // 1 getGutenbergBookMetadataOfSavedBooks needs to return books
  // 2 need an auth session
  it("renders empty state when no saved books", () => {
    render(<Bookshelf />);
  });

  it("shows books when the user has multiple saved books", () => {
    render(<Bookshelf />);
  });

  it("enables the user to remove a book from their bookshelf", () => {
    render(<Bookshelf />);
  });
});
