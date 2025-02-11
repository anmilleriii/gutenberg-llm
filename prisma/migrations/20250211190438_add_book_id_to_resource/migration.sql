/*
  Warnings:

  - A unique constraint covering the columns `[gutenbergBookId]` on the table `resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gutenbergBookId` to the `resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resource" ADD COLUMN     "gutenbergBookId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "resource_gutenbergBookId_key" ON "resource"("gutenbergBookId");
