-- DropForeignKey
ALTER TABLE "public"."award" DROP CONSTRAINT "award_resumeId_fkey";

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

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_basicsId_fkey" FOREIGN KEY ("basicsId") REFERENCES "basics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_skillsId_fkey" FOREIGN KEY ("skillsId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education" ADD CONSTRAINT "education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience" ADD CONSTRAINT "experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "award" ADD CONSTRAINT "award_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certification" ADD CONSTRAINT "certification_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "language" ADD CONSTRAINT "language_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteering" ADD CONSTRAINT "volunteering_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
