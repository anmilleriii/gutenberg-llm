export interface GutenbergBookContentMetadata {
  title: string;
  content: string;
  [key: string]: string;
}

export interface GutenbergBookContentResponse {
  id: string;
  title: string;
  content: string;
  metadata: GutenbergBookContentMetadata;
}
