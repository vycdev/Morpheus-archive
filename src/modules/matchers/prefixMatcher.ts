import { prisma } from "../..";
import { Matcher } from "../types/types";

const symbols = ["-", "."];

export const prefixMatcher: Matcher<string[]> = async (context, match) => {
    if (!match) return false;
    const { message } = context;
    const messagePrefix = message.content.split(" ")[0];

    const serverPrefix =
        (
            await prisma.guilds.findFirst({
                where: {
                    guild_id: message.guild?.id || ""
                }
            })
        )?.prefix || "m!";

    const prefixToMatch = match.map((m) => serverPrefix + m);

    const regex = new RegExp(
        `^(${prefixToMatch.join(
            "|"
        )})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join("|")})*$`,
        "i"
    );

    return (
        !!messagePrefix.match(regex) ||
        (match[0] === "help" && messagePrefix === "m!help") // Exception for help command.
    );
};
