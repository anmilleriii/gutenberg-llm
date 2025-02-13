const GUTENBERG_BASE_URL = "https://www.gutenberg.org";

export async function getBookContentById(bookId: number) {
  const response = await fetch(
    `${GUTENBERG_BASE_URL}/cache/epub/${bookId}/pg${bookId}.txt`
  );
  const data = await response.text();
  return data;
}
