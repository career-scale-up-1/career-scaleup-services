/*
  Warnings:

  - You are about to drop the column `basicsId` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the column `skillsId` on the `resume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `basics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resumeId]` on the table `skills` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."resume" DROP CONSTRAINT "resume_basicsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resume" DROP CONSTRAINT "resume_skillsId_fkey";

-- AlterTable
ALTER TABLE "basics" ADD COLUMN     "resumeId" TEXT;

-- AlterTable
ALTER TABLE "resume" DROP COLUMN "basicsId",
DROP COLUMN "skillsId";

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "resumeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "basics_resumeId_key" ON "basics"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "skills_resumeId_key" ON "skills"("resumeId");

-- AddForeignKey
ALTER TABLE "basics" ADD CONSTRAINT "basics_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
