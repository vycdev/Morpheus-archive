-- CreateTable
CREATE TABLE "Motds" (
    "id" SERIAL NOT NULL,
    "motd" TEXT NOT NULL,
    "guildGuild_id" TEXT NOT NULL,
    "userUser_id" TEXT NOT NULL,

    CONSTRAINT "Motds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Motds" ADD CONSTRAINT "Motds_guildGuild_id_fkey" FOREIGN KEY ("guildGuild_id") REFERENCES "Guilds"("guild_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motds" ADD CONSTRAINT "Motds_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
