-- CreateTable
CREATE TABLE "gutenberg_book_metadata" (
    "id" TEXT NOT NULL,
    "gutenbergBookId" TEXT NOT NULL,
    "imageHref" TEXT,
    "title" TEXT,
    "authors" TEXT,
    "subjects" TEXT,
    "bookshelves" TEXT,
    "dateIssued" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gutenberg_book_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gutenberg_book_metadata_gutenbergBookId_key" ON "gutenberg_book_metadata"("gutenbergBookId");
