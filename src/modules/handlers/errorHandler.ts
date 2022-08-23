import { ErrorHandler } from "../types";

export const errorHandler: ErrorHandler = (error: Error | unknown, context) => {
    if (error instanceof Error) console.error(error);
    else console.error("Unknown or New Error:", error);

    context.message.channel.send(
        "🔴 **Sorry, an internal error just occured.**"
    );

    return;
};
