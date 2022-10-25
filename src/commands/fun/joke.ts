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

export const jokeCommand: Command = (context) => [
    {
        name: "Joke",
        description: "Pulls a joke from reddit.",
        longDescription:
            "The bot will send a message with a joke from the r/jokes subreddit.",
        usage: ["m!joke"],
        usageExamples: ["m!joke"],
        category: "Fun",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["joke"])],
    async () => {
        const { message } = context;

        const response = await fetch(
            "https://www.reddit.com/r/Jokes/hot/.json"
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
