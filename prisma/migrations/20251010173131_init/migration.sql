/*
  Warnings:

  - Made the column `fullName` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Seeker', 'Recruiter', 'Admin');

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "fullName" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
