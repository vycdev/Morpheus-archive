import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const feedbackCommand: Command = (context) => [
    {
        name: "Feedback",
        description: "Send feedback to the bot creator.",
        longDescription: "Sends a text only message to the bot creator.",
        usage: ["m!feedback"],
        usageExamples: ["m!feedback Hello here is some feedback."],
        category: "Other",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["feedback"])],
    async () => {
        const { message, content } = context;

        const botCreator = process.env.BOT_CREATOR_ID || "270972671490129921";

        if (content.length > 1500) {
            logHandler(
                {
                    code: 400,
                    info: "Maximum message length allowed is 1500 characters.",
                    type: "logToDiscord"
                },
                context
            );
            return;
        }

        const creator = await context.client.users.fetch(botCreator);

        if (!creator) {
            logHandler(
                {
                    code: 400,
                    info: "Looks like the bot can't send a message to the creator right now, try again later.",
                    type: "logToDiscord"
                },
                context
            );
            return;
        }
        creator.send(
            `**__NEW FEEDBACK__**\n**User Tag**: ${message.author.tag}\n**User ID**: ${message.author.id}\n**Message**: ${content}`
        );
        message.reply("The creator has successfully received your feedback.");
    }
];
