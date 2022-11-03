import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const addQuoteCommand: Command = (context) => [
    {
        name: "Add Quote",
        description: "Will add a quote to the bot's list of quotes.",
        longDescription:
            "The bot can send random quotes on level ups, those quotes can be added using coins by the users.",
        usage: ["m!addquote", "m!aq"],
        usageExamples: ["m!aq This is a quote", "m!addquote Quotes are fun"],
        category: "Quotes",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["aq", "addquote"])],
    async () => {
        const { message, content } = context;
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
        if (!content) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You cannot add an empty quote."
                },
                context
            );
            return;
        }
        if (content.length < 1 || content.length > 200) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "The quote can be a maximum of 200 characters long."
                },
                context
            );
            return;
        }

        const quoteCost = parseInt(process.env.ADD_QUOTE_COST || "1000");

        const userProfile = await prisma.userProfiles.findFirst({
            where: {
                usersUser_id: message.author.id,
                guildsGuild_id: context.message.guild.id
            }
        });
        if (!userProfile) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "Your profile for this server doesn't exist yet, try again in a few seconds."
                },
                context
            );
            return;
        }

        if (userProfile.balance < quoteCost) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: `You don't have enough coins to add a new quote, you need at least ${quoteCost} coins.`
                },
                context
            );
            return;
        }
        await prisma.userProfiles.update({
            where: {
                id: userProfile.id
            },
            data: {
                balance: userProfile.balance - quoteCost
            }
        });

        await prisma.quotes.create({
            data: {
                quote: content,
                guildGuild_id: context.message.guild.id,
                userUser_id: message.author.id
            }
        });

        message.reply("Your quote has been successfully added to the sever.");
    }
];
