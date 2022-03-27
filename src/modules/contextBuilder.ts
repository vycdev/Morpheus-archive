import { ContextBuilder } from "./types";

export const contextBuilder: ContextBuilder = (client, message) => {
    return {
        client,
        message,
        content: message.content
    };
};
