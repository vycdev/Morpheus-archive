/*
  Warnings:

  - You are about to drop the column `user_name` on the `Users` table. All the data in the column will be lost.
  - Added the required column `user_tag` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "user_name",
ADD COLUMN     "user_tag" TEXT NOT NULL;
