import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";

export const screamCommand: Command = (context) => [
    {
        name: "Scream",
        description: "The bot will scream.",
        longDescription:
            "The bot will send a random number of A characters as a scream.",
        usage: ["m!a", "m!scream"],
        usageExamples: ["m!a", "m!scream"],
        category: "Fun",
        cooldown: 3000
    },
    [() => prefixMatcher(context, ["a", "scream"])],
    async () => {
        const { message } = context;

        const randNum = Math.floor(Math.random() * 100) + 1;

        await message.reply(
            randNum === 1 ? "a" : `${"".padStart(randNum, "A")}`
        );
    }
];
