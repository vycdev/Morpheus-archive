import { Matcher } from "../types";

export const prefixMatcher: Matcher = async (context, match) => {
    if (!match) return false;
    const { message } = context;
    const prefix = message.content.split(" ")[0];

    let isMatching = true;
    for (const m of match) isMatching = isMatching && "m!" + m === prefix;

    return isMatching;
};
