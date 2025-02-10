import { GutendexBookMetadata } from "./types";

const GUTENBERG_BASE_URL = "https://www.gutenberg.org";

// just start with a simple by ID
export async function getBookContentById(bookId: string) {
  try {
    const response = await fetch(
      `${GUTENBERG_BASE_URL}/files/${bookId}/${bookId}-0.txt`
    );
    const data = (await response.json()) as any;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookMetadataById(bookId: number) {
  try {
    const response = await fetch(`https://gutendex.com/books/${bookId}`);
    return (await response.json()) as GutendexBookMetadata;
  } catch (error) {
    console.error(error);
  }
}

// export async function getBookMetadataById(bookId: string) {
//   try {
//     const response = await fetch(`${GUTENBERG_BASE_URL}/ebooks/${bookId}`);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
