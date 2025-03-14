-- AlterTable
ALTER TABLE "Guilds" ADD COLUMN     "welcome_channel" TEXT;

-- AlterTable
ALTER TABLE "UserProfiles" ALTER COLUMN "last_daily_claim" SET DEFAULT NOW() - INTERVAL '1 DAY';
