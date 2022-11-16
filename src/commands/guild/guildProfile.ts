import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { totalXpUser } from "../../modules/helpers/computeLevel";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";
import {EmbedBuilder} from "discord.js"
import { computeLevel } from "../../modules/helpers/computeLevel";
import { totalBalanceUser } from "../../modules/helpers/computeLevel";

const getData = async (guildGuild_id: string) => {
    const guildProfile = await prisma.guilds.findFirst({
        where: {
            guild_id: guildGuild_id
        }
    });

    if(!guildProfile) return; 

    const total_quotes_guild = await prisma.quotes.count({
        where: {
            guildGuild_id
        }
    });

    const total_guild_bot_users = await prisma.userProfiles.count({
        where: {
            guildGuild_id
        }
    });

    return {
        prefix: guildProfile.prefix,
        total_guild_bot_users,
        
        total_quotes_guild,
        levelUps_channel: guildProfile.levelUps_channel,
        quotes_channel: guildProfile.quotes_channel,
        disable_levelUps: guildProfile.disable_levelUps,
        disable_quotes: guildProfile.disable_quotes,
        global_quotes: guildProfile.global_quotes
    }
}

const guildNotFound = async (context: Context) => {
    logHandler(
        {
            code: 404,
            type: "logToDiscord",
            info: "Guild not found, try again in a few minutes."
        },
        context
    );
    return;
} 

export const guildProfileCommand: Command = (context) => [
    {
        name: "Guild Profile",
        description: "See the guild's profile.",
        longDescription:
            "Displays useful information about the guild such as settings and stats.",
        usage: ["m!gp", "m!guildProfile"],
        usageExamples: ["m!gp", "m!guildProfile"],
        category: "Guild",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["gp", "guildProfile"])],
    async () => {
        const { message, argvs } = context;
        if (!context.message.guild) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You can only use this command in guilds."
                },
                context
            );
            return;
        }                   
                
        const profileData = await getData(context.message.guild.id);
        if(!profileData) guildNotFound(context);
        
        const embed = new EmbedBuilder()
        .setColor(0x05b7f7)
        .setTitle(context.message.guild.name)
        .setThumbnail(context.message.guild.iconURL())
        .addFields(
            { name: 'COMMANDS PREFIX', value: profileData?.prefix },
            { name: 'TOTAL BOT USERS', value: profileData?.total_guild_bot_users, inline: true},
            { name: 'DISABLE LEVEL UPS', value: profileData?.disable_levelUps },
            { name: 'DISABLE QUOTES', value: profileData?.disable_quotes, inline: true},
            { name: 'GLOBAL QUOTES', value: profileData?.global_quotes},
            { name: 'TOTAL GUILD QUOTES', value: profileData?.total_quotes_guild, inline: true},
            { name: 'LEVEL UPS CHANNEL', value: profileData?.levelUps_channel},
            { name: 'QUOTES CHANNEL', value: profileData?.quotes_channel, inline: true},
            );

        message.reply({embeds: [embed]});
    }
];
