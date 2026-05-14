/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_postId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reportedId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_reporterId_fkey";

-- DropIndex
DROP INDEX "Block_blockerId_blockedId_idx";

-- DropTable
DROP TABLE "Report";

-- DropEnum
DROP TYPE "REPORT_TYPE";

-- CreateTable
CREATE TABLE "ReportUser" (
    "id" TEXT NOT NULL,
    "reason" "REPORT_REASON" NOT NULL,
    "status" "REPORT_STATUS" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporterId" TEXT NOT NULL,
    "reportedId" TEXT NOT NULL,

    CONSTRAINT "ReportUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportPost" (
    "id" TEXT NOT NULL,
    "reason" "REPORT_REASON" NOT NULL,
    "status" "REPORT_STATUS" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reporterId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "ReportPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReportUser_reportedId_idx" ON "ReportUser"("reportedId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportUser_reporterId_reportedId_key" ON "ReportUser"("reporterId", "reportedId");

-- CreateIndex
CREATE INDEX "ReportPost_postId_idx" ON "ReportPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "ReportPost_reporterId_postId_key" ON "ReportPost"("reporterId", "postId");

-- AddForeignKey
ALTER TABLE "ReportUser" ADD CONSTRAINT "ReportUser_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportUser" ADD CONSTRAINT "ReportUser_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportPost" ADD CONSTRAINT "ReportPost_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportPost" ADD CONSTRAINT "ReportPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
