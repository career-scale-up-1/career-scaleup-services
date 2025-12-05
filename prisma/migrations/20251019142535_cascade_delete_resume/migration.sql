/*
  Warnings:

  - Made the column `resumeId` on table `basics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resumeId` on table `skills` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."basics" DROP CONSTRAINT "basics_locationId_fkey";

-- AlterTable
ALTER TABLE "basics" ALTER COLUMN "resumeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "skills" ALTER COLUMN "resumeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "basics" ADD CONSTRAINT "basics_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
