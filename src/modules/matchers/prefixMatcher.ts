import { Matcher } from "../types";

export const prefixMatcher: Matcher = async (context, match) => {
    const { message } = context;
    const prefix = message.content.split(" ")[0];

    return prefix === match;
};
