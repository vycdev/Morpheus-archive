import { EmbedBuilder } from "discord.js";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";
import fetch from "node-fetch";

let loopIt = 0;

const loop = (type: "content" | "title" | "score") => {
    if (type === "title") {
        loopIt++ % 20;
    }
    return loopIt;
};

export const copyPastaCommand: Command = (context) => [
    {
        name: "Copy Pasta",
        description: "Pulls a copy pasta text from reddit.",
        longDescription:
            "The bot will send a message with a copy pasta from the r/copypasta subreddit.",
        usage: ["m!copypasta", "m!cp"],
        usageExamples: ["m!copypasta", "m!cp"],
        category: "Fun",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["copypasta", "cp"])],
    async () => {
        const { message } = context;

        const response = await fetch(
            "https://www.reddit.com/r/copypasta/hot/.json"
        );
        const data = await response.json();

        const embed = new EmbedBuilder()
            .setColor(3447003)
            .setTitle(`${data.data.children[loop("title")].data.title}`)
            .setDescription(
                `${data.data.children[loop("content")].data.selftext.substring(
                    0,
                    2000
                )}`
            )
            .setFooter({
                text: `👍 ${
                    data.data.children[loop("score")].data.score
                } | 💬 ${data.data.children[loop("score")].data.num_comments}`
            });

        message.reply({ embeds: [embed] });
    }
];
