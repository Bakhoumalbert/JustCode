/*
  Warnings:

  - You are about to drop the column `state` on the `Course` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CourseState" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "state";
