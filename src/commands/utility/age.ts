import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";
import { ymwdhms } from "../../modules/helpers/millisecondsToDateTime";

export const ageCommand: Command = (context) => [
    {
        name: "Age",
        description: "Age of the server or user.",
        longDescription:
            "The bot will show the age of the server or your account.",
        usage: ["m!age"],
        usageExamples: ["m!age"],
        category: "Utility",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["age"])],
    async () => {
        const { message } = context;
        if (message.guild == null) {
            message.reply(
                `Your account was created on: \`${String(
                    message.author.createdAt
                )}\`\n**That means that your account is: \`${ymwdhms(
                    new Date().getTime() - message.author.createdAt.getTime()
                )}\` old`
            );
        } else
            message.reply(
                `This server was created on: \`${String(
                    message.guild.createdAt
                )}\`\nThat means that the server is: \`${ymwdhms(
                    new Date().getTime() - message.guild.createdAt.getTime()
                )}\` old`
            );
    }
];
