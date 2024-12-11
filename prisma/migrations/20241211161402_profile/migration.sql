/*
  Warnings:

  - You are about to drop the column `allowPatientAssign` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `patientCode` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `specialistDesc` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Profile_patientCode_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "allowPatientAssign",
DROP COLUMN "patientCode",
DROP COLUMN "specialistDesc";
