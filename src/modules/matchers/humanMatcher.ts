import { Matcher } from "../types";

export const humanMatcher: Matcher = async (context) => {
    const { message } = context;
    return !message.author.bot;
};
