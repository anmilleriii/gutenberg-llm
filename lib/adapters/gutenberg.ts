const GUTENBERG_BASE_URL = "https://www.gutenberg.org";

export interface GutendexBookMetadata {
  id: number;
  title: string;
  authors: {
    name: string;
    birth_year: number;
    death_year: number;
  }[];
  summaries: string[];
  translators: {
    name: string;
    birth_year: number;
    death_year: number;
  }[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: {
    [key: string]: string;
  };
}

export async function getBookContentById(bookId: string) {
  try {
    const response = await fetch(
      `${GUTENBERG_BASE_URL}/files/${bookId}/${bookId}-0.txt`
    );
    const data = await response.text();
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
