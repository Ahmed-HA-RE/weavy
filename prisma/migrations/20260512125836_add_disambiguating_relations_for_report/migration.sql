-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "reportedId" TEXT,
ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedId_fkey" FOREIGN KEY ("reportedId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
