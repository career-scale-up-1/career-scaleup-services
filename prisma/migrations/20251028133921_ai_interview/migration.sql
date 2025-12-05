-- CreateTable
CREATE TABLE "ai_interview" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB,
    "evaluationResult" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_interview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ai_interview" ADD CONSTRAINT "ai_interview_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_interview" ADD CONSTRAINT "ai_interview_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_interview" ADD CONSTRAINT "ai_interview_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
