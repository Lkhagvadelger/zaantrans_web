/*
  Warnings:

  - You are about to drop the column `author` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `News` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "News" DROP COLUMN "author",
DROP COLUMN "featured";
