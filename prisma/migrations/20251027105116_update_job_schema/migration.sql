/*
  Warnings:

  - You are about to drop the column `createdAt` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `job` table. All the data in the column will be lost.
  - The `responsibilities` column on the `job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `applicationLink` to the `job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" DROP COLUMN "createdAt",
DROP COLUMN "requirements",
ADD COLUMN     "applicationLink" TEXT NOT NULL,
ADD COLUMN     "benefits" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "qualifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "responsibilities",
ADD COLUMN     "responsibilities" TEXT[] DEFAULT ARRAY[]::TEXT[];
