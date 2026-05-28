/*
  Warnings:

  - You are about to drop the column `muteComment` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `muteFollow` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `muteLike` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "muteComment",
DROP COLUMN "muteFollow",
DROP COLUMN "muteLike";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "muteComments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muteFollows" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "muteLikes" BOOLEAN NOT NULL DEFAULT false;
