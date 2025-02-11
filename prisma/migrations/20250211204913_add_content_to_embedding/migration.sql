/*
  Warnings:

  - Added the required column `content` to the `embedding` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "embedding" ADD COLUMN     "content" TEXT NOT NULL;
