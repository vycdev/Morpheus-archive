/*
  Warnings:

  - You are about to drop the `Guild` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_guildGuild_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_guildGuild_id_fkey";

-- DropTable
DROP TABLE "Guild";

-- DropTable
DROP TABLE "Quote";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Guilds" (
    "guild_id" TEXT NOT NULL,
    "prefix" TEXT,
    "most_xp_day" TEXT NOT NULL,
    "most_xp_week" TEXT NOT NULL,

    CONSTRAINT "Guilds_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "description" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "last_xp_claim" INTEGER NOT NULL DEFAULT 0,
    "day_xp" INTEGER NOT NULL DEFAULT 0,
    "last_day_xp" INTEGER NOT NULL DEFAULT 0,
    "week_xp" INTEGER NOT NULL DEFAULT 0,
    "last_week_xp" INTEGER NOT NULL DEFAULT 0,
    "levelup_messages" BOOLEAN NOT NULL DEFAULT true,
    "guildGuild_id" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "guildGuild_id" TEXT,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;
