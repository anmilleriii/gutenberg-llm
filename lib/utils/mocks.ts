import { GutenbergBookMetadata } from "@prisma/client";

export const mockBookMetadata: GutenbergBookMetadata = {
  id: "1",
  gutenbergBookId: 1,
  imageHref: "https://example.com",
  title: "Crime and Punishment",
  authors: "Dostoyevsky, Fyodor, 1821-1881",
  subjects:
    "Detective and mystery stories, Psychological fiction, Saint Petersburg (Russia) -- Fiction, Murder -- Fiction, Crime -- Psychological aspects -- Fiction",
  bookshelves: "Text",
  dateIssued: "2006-03-28",
  createdAt: new Date(),
  updatedAt: new Date(),
};
