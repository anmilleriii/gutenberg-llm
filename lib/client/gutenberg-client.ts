const GUTENBERG_BASE_URL = "https://www.gutenberg.org";

export async function getBookContentById(bookId: string) {
  try {
    const response = await fetch(
      `${GUTENBERG_BASE_URL}/files/${bookId}/${bookId}-0.txt`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getBookMetadataById(bookId: string) {
  try {
    const response = await fetch(
      `${GUTENBERG_BASE_URL}/files/${bookId}/${bookId}-0.txt`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}
