/*
  Warnings:

  - The `status` column on the `application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('Applied', 'ShortListed', 'Hired', 'Rejected');

-- AlterTable
ALTER TABLE "application" DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'Applied';
