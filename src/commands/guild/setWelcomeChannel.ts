import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const setWelcomeChannel: Command = (context) => [
    {
        name: "Set Welcome Channel",
        description: "Will set the current channel as the welcome channel.",
        longDescription:
            "When a memeber leaves or enters the server a message will be sent in the welcome channel. Requires administrator or manage guild permissions.",
        usage: ["m!swch", "m!setwelcomechannel"],
        usageExamples: ["m!swch disable", "m!swch", "m!setwelcomechannel"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["swch", "setwelcomechannel"])],
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
                    welcome_channel: context.message.channel.id
                }
            });
            message.reply(
                `The welcome channel has been set to <#${context.message.channel.id}>.`
            );
        } else {
            await prisma.guilds.update({
                where: {
                    guild_id: context.message.guild.id
                },
                data: {
                    welcome_channel: null
                }
            });
            message.reply("The welcome channel has been reset.");
        }
    }
];
