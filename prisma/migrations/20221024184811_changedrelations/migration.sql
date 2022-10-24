/*
  Warnings:

  - You are about to drop the column `author_id` on the `Quotes` table. All the data in the column will be lost.
  - You are about to drop the column `guildGuild_id` on the `Users` table. All the data in the column will be lost.
  - Made the column `prefix` on table `Guilds` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userUser_id` to the `Quotes` table without a default value. This is not possible if the table is not empty.
  - Made the column `guildGuild_id` on table `Quotes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_guildGuild_id_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_guildGuild_id_fkey";

-- AlterTable
ALTER TABLE "Guilds" ALTER COLUMN "prefix" SET NOT NULL,
ALTER COLUMN "prefix" SET DEFAULT E'm!';

-- AlterTable
ALTER TABLE "Quotes" DROP COLUMN "author_id",
ADD COLUMN     "userUser_id" INTEGER NOT NULL,
ALTER COLUMN "guildGuild_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "guildGuild_id";

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
