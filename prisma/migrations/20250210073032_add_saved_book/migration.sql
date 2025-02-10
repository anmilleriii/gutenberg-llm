-- CreateTable
CREATE TABLE "SavedBook" (
    "id" TEXT NOT NULL,
    "gutenbergBookId" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedBook_gutenbergBookId_key" ON "SavedBook"("gutenbergBookId");

-- AddForeignKey
ALTER TABLE "SavedBook" ADD CONSTRAINT "SavedBook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
