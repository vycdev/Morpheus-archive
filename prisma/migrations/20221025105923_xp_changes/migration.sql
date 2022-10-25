/*
  Warnings:

  - You are about to drop the column `most_xp_day` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `most_xp_week` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `UsersXp` table. All the data in the column will be lost.
  - You are about to drop the column `xp` on the `UsersXp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guilds" DROP COLUMN "most_xp_day",
DROP COLUMN "most_xp_week";

-- AlterTable
ALTER TABLE "UsersXp" DROP COLUMN "level",
DROP COLUMN "xp",
ADD COLUMN     "lastxpclaim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "XpDays" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "xp" INTEGER NOT NULL,
    "usersXpId" INTEGER NOT NULL,

    CONSTRAINT "XpDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "XpDays" ADD CONSTRAINT "XpDays_usersXpId_fkey" FOREIGN KEY ("usersXpId") REFERENCES "UsersXp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
