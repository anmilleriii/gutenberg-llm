import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 
 * content_url = f"https://www.gutenberg.org/files/{book_id}/(book_id}-0.txt
metadata url = f"https://www.gutenberg.org/ebooks/{book_id)"
# Get book content
content response = requests.get (content url)
content = content_response. text
# Cot metadata
metadata_response = requests.get
 */
