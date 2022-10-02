import { LogHandler } from "../types";

export const logHandler: LogHandler = (maybeError, context) => {
    const { info, code, type } = maybeError;

    switch (type) {
        case "logToBoth":
            console.log(`[${code}]: ${info}`);
            context.message.channel.send(`[${code}]: ${info}`);
            break;

        case "logToConsole":
            console.log(`[${code}]: ${info}`);
            break;

        case "logToDiscord":
            context.message.channel.send(`[${code}]: ${info}`);
            break;

        default:
            console.error("UNKNOWN LOG TYPE:", maybeError);
            break;
    }
};