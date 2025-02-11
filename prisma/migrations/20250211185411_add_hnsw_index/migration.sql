-- Prisma does not natively support pgvector
DROP INDEX "vector_hnsw";

CREATE INDEX "vector_hnsw" ON "embedding" USING hnsw ("vector" vector_cosine_ops);