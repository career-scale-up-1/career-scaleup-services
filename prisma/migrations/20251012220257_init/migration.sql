/*
  Warnings:

  - The primary key for the `award` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `basics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `certification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `resume` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `volunteering` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."award" DROP CONSTRAINT "award_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."basics" DROP CONSTRAINT "basics_locationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."certification" DROP CONSTRAINT "certification_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."education" DROP CONSTRAINT "education_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."experience" DROP CONSTRAINT "experience_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."language" DROP CONSTRAINT "language_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."project" DROP CONSTRAINT "project_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resume" DROP CONSTRAINT "resume_basicsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."resume" DROP CONSTRAINT "resume_skillsId_fkey";

-- DropForeignKey
ALTER TABLE "public"."volunteering" DROP CONSTRAINT "volunteering_resumeId_fkey";

-- AlterTable
ALTER TABLE "award" DROP CONSTRAINT "award_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "award_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "award_id_seq";

-- AlterTable
ALTER TABLE "basics" DROP CONSTRAINT "basics_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "basics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "basics_id_seq";

-- AlterTable
ALTER TABLE "certification" DROP CONSTRAINT "certification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "certification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "certification_id_seq";

-- AlterTable
ALTER TABLE "education" DROP CONSTRAINT "education_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "education_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "education_id_seq";

-- AlterTable
ALTER TABLE "experience" DROP CONSTRAINT "experience_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "experience_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "experience_id_seq";

-- AlterTable
ALTER TABLE "language" DROP CONSTRAINT "language_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "language_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "language_id_seq";

-- AlterTable
ALTER TABLE "location" DROP CONSTRAINT "location_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "location_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "location_id_seq";

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "project_id_seq";

-- AlterTable
ALTER TABLE "resume" DROP CONSTRAINT "resume_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "basicsId" SET DATA TYPE TEXT,
ALTER COLUMN "skillsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "resume_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "resume_id_seq";

-- AlterTable
ALTER TABLE "skills" DROP CONSTRAINT "skills_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "skills_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "skills_id_seq";

-- AlterTable
ALTER TABLE "volunteering" DROP CONSTRAINT "volunteering_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "resumeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "volunteering_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "volunteering_id_seq";

-- DropTable
DROP TABLE "public"."Users";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "phoneNumber" TEXT,
    "bio" TEXT,
    "profilePicture" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "industry" TEXT,
    "website" TEXT,
    "companyDescription" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "application" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "coverLetter" TEXT,
    "resumeUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Applied',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_basicsId_fkey" FOREIGN KEY ("basicsId") REFERENCES "basics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basics" ADD CONSTRAINT "basics_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "award" ADD CONSTRAINT "award_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteering" ADD CONSTRAINT "volunteering_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
