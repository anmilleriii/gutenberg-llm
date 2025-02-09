/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_passwordHash_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash";
