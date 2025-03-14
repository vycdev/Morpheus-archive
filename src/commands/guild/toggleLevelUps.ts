import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const toggleLevelUps: Command = (context) => [
    {
        name: "Toggle LevelUps",
        description: "Toggle level ups in the server.",
        longDescription:
            "If level up messages are turned off in the server, the bot will not send level and balance information when a member levels up. Requires administrator or manage guild permission.",
        usage: ["m!tlups", "m!togglelevelupsserver"],
        usageExamples: ["m!tlups", "m!togglelevelupsserver"],
        category: "Guild",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["tlups", "togglelevelupsserver"])],
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
                disable_levelUps: !guild.disable_levelUps
            }
        });

        if (guild.disable_levelUps) {
            message.reply("Level up messages in the guild have been enabled.");
        } else {
            message.reply("Level up messages in the guild have been disabled.");
        }
    }
];
