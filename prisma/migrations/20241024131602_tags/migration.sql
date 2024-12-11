/*
  Warnings:

  - You are about to drop the column `doctorProfileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hospitalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `inviteToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `invitedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isTokenUsed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastRecommendedSpecialty` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropIndex
DROP INDEX "User_inviteToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "doctorProfileId",
DROP COLUMN "hospitalId",
DROP COLUMN "inviteToken",
DROP COLUMN "invitedBy",
DROP COLUMN "isTokenUsed",
DROP COLUMN "lastRecommendedSpecialty",
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Account";

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#fff',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);
