/*
  Warnings:

  - You are about to drop the column `levelup_messages` on the `UserProfiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guilds" ADD COLUMN     "disable_Quotes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disable_levelUps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "levelUps_channel" TEXT,
ADD COLUMN     "quotes_channel" TEXT;

-- AlterTable
ALTER TABLE "UserProfiles" DROP COLUMN "levelup_messages",
ADD COLUMN     "disable_levelUps" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "disable_quotes" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "disable_levelUps" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "disable_quotes" BOOLEAN NOT NULL DEFAULT false;
