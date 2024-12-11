/*
  Warnings:

  - You are about to drop the column `typeId` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `VehicleType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_typeId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT;

-- DropTable
DROP TABLE "VehicleType";
