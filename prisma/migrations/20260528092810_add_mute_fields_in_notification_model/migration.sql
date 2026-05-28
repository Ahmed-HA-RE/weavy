-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "muteComment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muteFollow" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muteLike" BOOLEAN NOT NULL DEFAULT false;
