/*
  Warnings:

  - You are about to drop the `UsersXp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersXp" DROP CONSTRAINT "UsersXp_guildsGuild_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersXp" DROP CONSTRAINT "UsersXp_usersUser_id_fkey";

-- DropForeignKey
ALTER TABLE "XpDays" DROP CONSTRAINT "XpDays_usersXpId_fkey";

-- DropTable
DROP TABLE "UsersXp";

-- CreateTable
CREATE TABLE "UserProfiles" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "levelup_messages" BOOLEAN NOT NULL DEFAULT true,
    "usersUser_id" TEXT NOT NULL,
    "guildsGuild_id" TEXT NOT NULL,

    CONSTRAINT "UserProfiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_guildsGuild_id_fkey" FOREIGN KEY ("guildsGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfiles" ADD CONSTRAINT "UserProfiles_usersUser_id_fkey" FOREIGN KEY ("usersUser_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "XpDays" ADD CONSTRAINT "XpDays_usersXpId_fkey" FOREIGN KEY ("usersXpId") REFERENCES "UserProfiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
