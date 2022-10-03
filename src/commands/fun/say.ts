import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";

export const sayCommand: Command = (context) => [
    {
        name: "Say",
        description: "The bot will repeat what you said.",
        longDescription:
            "The message sent by the bot will be a reply to your original message.",
        usage: ["m!say"],
        usageExamples: ["m!say Hello"],
        category: "Fun",
        cooldown: 500
    },
    [() => prefixMatcher(context, "say")],
    async () => {
        const { message, content } = context;

        await message.reply(content);
    }
];
