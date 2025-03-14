import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const deleteQuote: Command = (context) => [
    {
        name: "Delete Quotes",
        description: "Delete one or more quotes of the server.",
        longDescription:
            "You can delete one or multiple quotes of the server at once. This command requires the administrator or guild manager permission.",
        usage: ["m!delq", "m!deletequotes"],
        usageExamples: [
            "m!delq 432",
            "m!deletequotes 234 42 352 34",
            "m!delq 23 423 43"
        ],
        category: "Quotes",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["delq", "deletequotes"])],
    async () => {
        const { message, argvs } = context;
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
        if (argvs.length < 1) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You need to delete at least one quote."
                },
                context
            );
            return;
        }

        const quoteIds = [...new Set(argvs.map((v) => parseInt(v)))];

        quoteIds.forEach(async (quoteId) => {
            const quote = await prisma.quotes.findFirst({
                where: {
                    id: quoteId
                }
            });

            if (!quote) {
                logHandler(
                    {
                        code: 400,
                        type: "logToDiscord",
                        info: `Couldn't delete quote with id ${quoteId}, this quote doesn't seem to exist or isn't a quote from this server.`
                    },
                    context
                );
            } else {
                await prisma.quotes.delete({
                    where: {
                        id: quoteId
                    }
                });
                logHandler(
                    {
                        code: 200,
                        type: "logToDiscord",
                        info: `Quote with id ${quoteId} has been deleted succesfully.`
                    },
                    context
                );
            }
        });
    }
];
