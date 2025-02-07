import { http, HttpResponse } from "msw";
import { GutenbergBookContentResponse } from "../client/types";

export const handlers = [
  http.get("https://example.com/user", () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];


export const mockBook: GutenbergBookContentResponse = {
  id: "1",
  title: "The Adventures of Sherlock Holmes",
  content: "The Adventures of Sherlock Holmes",
  metadata: {
    title: "The Adventures of Sherlock Holmes",
    content: "The Adventures of Sherlock Holmes",
}