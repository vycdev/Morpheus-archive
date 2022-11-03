import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const toggleGlobalQuotes: Command = (context) => [
    {
        name: "Toggle Global Quotes",
        description: "Toggle global quotes in the server.",
        longDescription:
            "If on, the quotes the bot will send on level ups will not be limited to quotes only added in that server.",
        usage: ["m!tgqs", "m!toggleglobalquotesserver"],
        usageExamples: ["m!tgqs", "m!toggleglobalquotesserver"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["tgqs", "toggleglobalquotesserver"])],
    async () => {
        const { message } = context;
        if (!message.guild) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You can't use this command outside a guild."
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

        const guild = await prisma.guilds.findFirst({
            where: {
                guild_id: message.guild.id
            }
        });

        if (!guild) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "Looks like the guild hasn't been added to the database yet, try again in a few seconds."
                },
                context
            );
            return;
        }

        await prisma.guilds.update({
            where: {
                guild_id: guild.guild_id
            },
            data: {
                global_quotes: !guild.global_quotes
            }
        });

        if (!guild.global_quotes) {
            message.reply("Global quotes in the guild have been enabled.");
        } else {
            message.reply("Global quotes in the guild have been disabled.");
        }
    }
];
