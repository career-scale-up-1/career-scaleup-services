/*
  Warnings:

  - Added the required column `isActive` to the `resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOptimized` to the `resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "resume" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "isOptimized" BOOLEAN NOT NULL;
