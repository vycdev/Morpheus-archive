import { Matcher } from "../types";

export const humanMatcher: Matcher<void> = async (context) => {
    const { message } = context;
    return !message.author.bot;
};
