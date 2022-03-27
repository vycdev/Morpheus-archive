-- CreateTable
CREATE TABLE "Guild" (
    "guild_id" TEXT NOT NULL,
    "most_xp_day" TEXT NOT NULL,
    "most_xp_week" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "guildGuild_id" TEXT,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guild"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guild"("guild_id") ON DELETE SET NULL ON UPDATE CASCADE;
