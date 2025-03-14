import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const setLevelUpChannel: Command = (context) => [
    {
        name: "Set Level Ups Channel",
        description: "Will set the current channel as the level ups channel.",
        longDescription:
            "Whenever a member will level up, the bot's level up message will be redirected to the set channel. This command will set the current channel as the level up channel. Requires administrator or manage guild permission.",
        usage: ["m!sluch", "m!setlevelupchannel"],
        usageExamples: ["m!sluch disable", "m!sluch", "m!setlevelupchannel"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["sluch", "setlevelupchannel"])],
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
        if (
            !message.member?.permissions.has("Administrator") ||
            !message.member?.permissions.has("ManageGuild")
        ) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You don't have the permission to use this command."
                },
                context
            );
            return;
        }
        if (!argvs[0]) {
            await prisma.guilds.update({
                where: {
                    guild_id: context.message.guild.id
                },
                data: {
                    levelUps_channel: context.message.channel.id
                }
            });
            message.reply(
                `The level ups channel has been set to <#${context.message.channel.id}>.`
            );
        } else {
            await prisma.guilds.update({
                where: {
                    guild_id: context.message.guild.id
                },
                data: {
                    levelUps_channel: null
                }
            });
            message.reply("The level ups channel has been reset.");
        }
    }
];
