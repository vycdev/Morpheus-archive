import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { totalXpUser } from "../../modules/helpers/computeLevel";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";
import {EmbedBuilder} from "discord.js"
import { computeLevel } from "../../modules/helpers/computeLevel";
import { totalBalanceUser } from "../../modules/helpers/computeLevel";

const getData = async (userUser_id: string, guildGuild_id: string) => {
    const userProfile = await prisma.userprofiles.findFirst({
        where: {
            userUser_id
        }
    });

    if(!userProfile) return; 

    const total_xp_guild = await totalXpGuild(userProfile);
    const total_xp_user = await totalXpUser(userUser_id); 

    const total_quotes_guild = await prisma.quotes.count({
        where: {
            userUser_id,
            guildGuild_id
        }
    });

    const total_quotes_user = await prisma.quotes.count({
        where: {
            userUser_id
        }
    });

    const total_servers_w_morpheus_in = await prisma.userprofiles.count({
        where: {
            userUser_id
        }
    })

    const total_balance_user = await totalBalanceUser(userUser_id); 

    return {
        total_balance_guild: userProfile.balance, 
        disable_levelUps: userProfile.disable_levelUps,
        disable_quotes: userProfile.disable_quotes,
        daily_claim_combo: userProfile.daily_claim_combo,
        last_daily_claim: userProfile.last_daily_claim,
        total_xp_guild,
        total_xp_user,
        total_quotes_guild,
        total_quotes_user,
        total_servers_w_morpheus_in,
        total_balance_user
    }
}

const userNotFound = async (context: Context) => {
    logHandler(
        {
            code: 404,
            type: "logToDiscord",
            info: "User not found."
        },
        context
    );
    return;
} 

export const profileCommand: Command = (context) => [
    {
        name: "Profile",
        description: "See your profile.",
        longDescription:
            "Displays useful information about your profile, stats and settings.",
        usage: ["m!profile", "m!p"],
        usageExamples: ["m!profile", "m!profile @user", "m!p"],
        category: "Profile",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["p", "profile"])],
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
                
        const profileData = await getData(!message.mentions.users.first() ? message.author.id : message.mentions.users.first().id);
        if(!profileData) userNotFound(context);
        
        const embed = new EmbedBuilder()
        .setColor(0x05b7f7)
        .setTitle(!message.mentions.users.first() ? message.author.tag : message.mentions.users.first().tag)
        .setThumbnail(!message.mentions.users.first() ? message.author.avatarURL() : message.mentions.users.first().avatarURL())
        .addFields(
            { name: 'USER TOTAL SERVERS WHERE MORPHEUS IS PRESENT IN', value: profileData.total_servers_w_morpheus_in },
            { name: 'GUILD LEVEL', value: computeLevel(profileData.total_xp_guild)},
            { name: 'GUILD BALANCE', value: profileData.total_balance_guild, inline: true },
            { name: 'GLOBAL LEVEL', value: computeLevel(profileData.total_xp_user) },
            { name: 'GLOBAL BALANCE', value: profileData.total_balance_user, inline: true },
            { name: 'GUILD DISABLED LEVELUPS', value: profileData.disable_levelUps },
            { name: 'GUILD DISABLED QUOTES', value: profileData.disable_quotes, inline: true },
            { name: 'GUILD LAST DAILY CLAIM', value: profileData.last_daily_claim },
            { name: 'GUILD DAILY CLAIM STREAK', value: profileData.daily_claim_combo, inline: true },
            { name: 'GUILD QUOTES ADDED', value: profileData.total_quotes_guild },
            { name: 'GLOBAL QUOTES ADDED', value: profileData.total_quotes_user, inline: true },
            );

        message.reply({embeds: [embed]});
    }
];
