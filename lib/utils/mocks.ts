import { GutenbergBookMetadata, SavedBook, User } from "@prisma/client";

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

export const mockUser: User = {
  id: "c123xy",
  email: "gutenberg@example.com",
  emailVerified: new Date(),
  image: null,
  name: "Gutenberg",
};

export const mockSavedBooks: SavedBook[] = [
  {
    id: "c123xy",
    gutenbergBookId: 5,
    userId: mockUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "c456xy",
    gutenbergBookId: 6,
    userId: mockUser.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
