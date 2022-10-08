import { Matcher } from "../types";

const symbols = ["-", "."];

export const prefixMatcher: Matcher = async (context, match) => {
    if (!match) return false;
    const { message } = context;
    const messagePrefix = message.content.split(" ")[0];

    const prefixToMatch = match.map((m) => "m!" + m);

    const regex = new RegExp(
        `^(${prefixToMatch.join(
            "|"
        )})([^\\w]|$)( |[\\w]|(<@!?\\d+>)|${symbols.join("|")})*$`,
        "i"
    );

    return !!messagePrefix.match(regex);
};
