const GUTENBERG_BASE_URL = "https://www.gutenberg.org";

export async function getBookContentById(bookId: number) {
  const response = await fetch(
    `${GUTENBERG_BASE_URL}/files/${bookId}/${bookId}-0.txt`
  );
  const data = await response.text();
  return data;
}
