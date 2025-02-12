# Gutenberg

<!--  -->

## Demo

[] Demo video

mobile

## Features

```sh

pnpm db:seed
```

### Gutenberg chat

Gutenberg content is

1. Retrived by API
2. Chunked
3. Converted to embeddings
4. Query passed and streamed to and from Groq

### Querying Gutenberg Data

A point in time index of gutenberg metadata is pulled from their [pg_catalog.csv](https://www.gutenberg.org/cache/epub/feeds/) to provide fast textual search. I considered using Gutendex but https://gutendex.com/

## Implementation

Next application deployed on Vercel. Groq is the LLM provider, connected using the Vercel AI SDK. Gutenberg data is retrieved via . User data and RAG is stored in a serverless Postgres instance (Neon). NextAuth is to provide JWT-based email and social (Google) auth. Vitest covers basic UI tests with Github Actions CI.

Code generation is used from shadcdn CLI.

# Todo

- conversation longer than 5 steps
- something went wrong
- save book button
- active link
- default form value
- pagination maybe
- chat history maybe
- search history
- chips with suggested questions maybe
- summary generated to side maybe...
-

# Done

- Search gutenberg books by text in DB
- Store gutenberg books in DB
- get book text api
- embeddings w/prisma
