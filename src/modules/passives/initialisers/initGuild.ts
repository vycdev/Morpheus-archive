import { Guild } from "discord.js";
import { prisma } from "../../../";

export const initGuild = async (guild: Guild) => {
    const guildExists = await prisma.guilds.findUnique({
        where: {
            guild_id: guild.id
        }
    });
    if (guildExists) {
        return;
    }
    await prisma.guilds.create({
        data: {
            guild_id: guild.id
        }
    });
};
