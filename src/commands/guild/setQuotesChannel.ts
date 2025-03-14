import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const setQuotesChannel: Command = (context) => [
    {
        name: "Set Quotes Channel",
        description: "Will set the current channel as the quotes channel.",
        longDescription:
            "Whenever a member will level up, the bot's quote message will be redirected to the set channel. This command will set the current channel as the quotes channel. Requires administrator or manage guild permission.",
        usage: ["m!sqch", "m!setquoteschannel"],
        usageExamples: ["m!sqch disable", "m!sqch", "m!setquoteschannel"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["sqch", "setquoteschannel"])],
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
                    quotes_channel: context.message.channel.id
                }
            });
            message.reply(
                `The quotes channel has been set to <#${context.message.channel.id}>.`
            );
        } else {
            await prisma.guilds.update({
                where: {
                    guild_id: context.message.guild.id
                },
                data: {
                    quotes_channel: null
                }
            });
            message.reply("The quotes channel has been reset.");
        }
    }
];
