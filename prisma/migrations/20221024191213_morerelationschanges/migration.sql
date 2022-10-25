/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `balance` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `day_xp` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `last_day_xp` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `last_week_xp` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `last_xp_claim` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `levelup_messages` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `week_xp` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Quotes" ALTER COLUMN "userUser_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "balance",
DROP COLUMN "day_xp",
DROP COLUMN "id",
DROP COLUMN "last_day_xp",
DROP COLUMN "last_week_xp",
DROP COLUMN "last_xp_claim",
DROP COLUMN "level",
DROP COLUMN "levelup_messages",
DROP COLUMN "week_xp",
DROP COLUMN "xp",
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "UsersXp" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "levelup_messages" BOOLEAN NOT NULL DEFAULT true,
    "usersUser_id" TEXT NOT NULL,
    "guildsGuild_id" TEXT NOT NULL,

    CONSTRAINT "UsersXp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersXp" ADD CONSTRAINT "UsersXp_guildsGuild_id_fkey" FOREIGN KEY ("guildsGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersXp" ADD CONSTRAINT "UsersXp_usersUser_id_fkey" FOREIGN KEY ("usersUser_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
