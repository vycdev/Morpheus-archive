import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";

export const sayCommand: Command = (context) => [
    {
        name: "Say",
        description: "The bot will repeat what you said.",
        usage: "m!say",
        category: "fun",
        cooldown: 500
    },
    [() => prefixMatcher(context, "say")],
    async () => {
        const { message, content } = context;

        await message.reply(content);
    }
];
