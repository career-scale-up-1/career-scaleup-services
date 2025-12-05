-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Open', 'Closed');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('Onsite', 'Remote', 'Hybrid');

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'Open',
ADD COLUMN     "workType" "WorkType" NOT NULL DEFAULT 'Onsite';
