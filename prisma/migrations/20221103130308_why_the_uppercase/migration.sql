/*
  Warnings:

  - You are about to drop the column `disable_Quotes` on the `Guilds` table. All the data in the column will be lost.
  - You are about to drop the column `global_Quotes` on the `Guilds` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guilds" DROP COLUMN "disable_Quotes",
DROP COLUMN "global_Quotes",
ADD COLUMN     "disable_quotes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "global_quotes" BOOLEAN NOT NULL DEFAULT false;
