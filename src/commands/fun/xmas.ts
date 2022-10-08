import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types";

const timeTillChristmas = (year: number): string => {
    const today = new Date();

    const xmas = new Date(`December 25, ${year}`);
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeLeft = xmas.getTime() - today.getTime();

    const eDaysLeft = timeLeft / msPerDay;
    const daysLeft = Math.floor(eDaysLeft);
    const eHrsLeft = (eDaysLeft - daysLeft) * 24;
    const hrsLeft = Math.floor(eHrsLeft);
    const minsLeft = Math.floor((eHrsLeft - hrsLeft) * 60);

    if (daysLeft === 0)
        return ":santa_tone1::snowflake: :santa_tone1: **IT IS CHRISTMASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS** :santa_tone1::snowflake: :santa_tone1:";
    if (daysLeft < 0) return timeTillChristmas(year + 1);
    if (daysLeft > 0)
        return `**There are ${daysLeft} days ${hrsLeft} hours ${minsLeft} minutes left until Christmas** :santa_tone1:`;
    return "error";
};

export const xmasCommand: Command = (context) => [
    {
        name: "Xmas",
        description: "Time left until XMAS.",
        longDescription:
            "The message sent by the bot will be a reply with how much time there is left until Christmas.",
        usage: ["m!xmas", "m!christmas"],
        usageExamples: ["m!xmas", "m!christmas"],
        category: "Fun",
        cooldown: 5000
    },
    [() => prefixMatcher(context, ["xmas", "christmas"])],
    async () => {
        const { message } = context;

        await message.reply(`${timeTillChristmas(new Date().getFullYear())}`);
    }
];
