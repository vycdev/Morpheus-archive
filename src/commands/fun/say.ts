import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const sayCommand: Command = (context) => [
    {
        name: "Say",
        description: "The bot will repeat what you said.",
        longDescription:
            "The message sent by the bot will be a reply to your original message.",
        usage: ["m!say"],
        usageExamples: ["m!say Hello"],
        category: "Fun",
        cooldown: 3000
    },
    [() => prefixMatcher(context, ["say"])],
    async () => {
        const { message, content } = context;
        if (!content) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You can't provide nothing to say for the bot."
                },
                context
            );
            return;
        }

        logHandler(
            {
                code: 0,
                info: `${context.message.author.username} has used the say command.`,
                type: "logToConsole"
            },
            context
        );

        await message.reply(content);
    }
];
