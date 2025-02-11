/*
  Warnings:

  - You are about to drop the column `embedding` on the `embedding` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "embedding_hnsw";

-- AlterTable
ALTER TABLE "embedding" DROP COLUMN "embedding",
ADD COLUMN     "vector" vector(1536);

-- CreateIndex
CREATE INDEX "vector_hnsw" ON "embedding"("vector");
