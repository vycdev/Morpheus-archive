import { ContextBuilder } from "../types/types";

export const contextBuilder: ContextBuilder = (client, message) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [prefix, ...content] = message.content.split(" ");

    return {
        client,
        message,
        content: content.join(" "),
        argvs: content
    };
};
