import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command, Metadata } from "../../modules/types";

export const sayCommand: Command<Metadata> = (context) => [
    {
        name: "Say",
        description: "The bot will repeat what you said.",
        suffix: "m!say",
        cooldown: 500
    },
    [() => prefixMatcher(context, "say")],
    async () => {
        const { message, content } = context;

        message.channel.send(content);
    }
];
