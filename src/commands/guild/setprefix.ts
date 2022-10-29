import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const setPrefixCommand: Command = (context) => [
    {
        name: "Set Prefix",
        description: "Will set the prefix of the server for bot commands.",
        longDescription:
            "This will set the prefix for the bot commands across the server. The only command who will preserve the prefix will be the help command, but it will also support the new prefix. Requires administrator or manage guild permission.",
        usage: ["m!setprefix", "m!sp"],
        usageExamples: ["m!sp m!", "m!setprefix !"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["sp", "setprefix"])],
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
        if (!argvs[0]) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You set an empty prefix."
                },
                context
            );
            return;
        }
        if (argvs[0].length < 1 || argvs[0].length > 2) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "The prefix can only be at least 1 and at most 2 characters long."
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

        await prisma.guilds.update({
            where: {
                guild_id: context.message.guild.id
            },
            data: {
                prefix: argvs[0]
            }
        });
        message.reply(`The bot command's prefix was set to **${argvs[0]}**`);
    }
];
