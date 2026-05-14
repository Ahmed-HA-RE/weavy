/*
  Warnings:

  - Added the required column `type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "REPORT_TYPE" AS ENUM ('USER', 'POST');

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "type" "REPORT_TYPE" NOT NULL;
