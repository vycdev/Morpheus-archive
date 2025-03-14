-- AlterTable
ALTER TABLE "UserProfiles" ALTER COLUMN "last_daily_claim" SET DEFAULT NOW() - interval '1 day';
