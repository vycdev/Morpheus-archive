import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";

export const timeCommand: Command = (context) => [
    {
        name: "Bot Time",
        description: "The bot will show it's time.",
        longDescription: "The bot will show it's current time.",
        usage: ["m!time", "m!servertime"],
        usageExamples: ["m!time", "m!servertime"],
        category: "Utility",
        cooldown: 3000
    },
    [() => prefixMatcher(context, ["time", "servertime"])],
    async () => {
        const { message } = context;

        await message.reply(
            `${new Date().toLocaleString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })} GMT`
        );
    }
];
