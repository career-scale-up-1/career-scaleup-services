-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'Withdraw';

-- AlterTable
ALTER TABLE "job" ALTER COLUMN "applicationLink" DROP NOT NULL;

-- CreateTable
CREATE TABLE "cover_letter" (
    "id" TEXT NOT NULL,
    "seekerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "applicant" JSONB NOT NULL,
    "employer" JSONB NOT NULL,
    "letter" JSONB NOT NULL,

    CONSTRAINT "cover_letter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cover_letter" ADD CONSTRAINT "cover_letter_seekerId_fkey" FOREIGN KEY ("seekerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
