import { LogHandler } from "../types/types";

export const logHandler: LogHandler = (maybeError, context) => {
    const { info, code, type } = maybeError;

    switch (type) {
        case "logToBoth":
            console.log(`[${new Date().toISOString()}][${code}]: ${info}`);
            context.message.reply(`**[${code}]**: ${info}`);
            break;

        case "logToConsole":
            console.log(`[${new Date().toISOString()}][${code}]: ${info}`);
            break;

        case "logToDiscord":
            context.message.reply(`**[${code}]**: ${info}`);
            break;

        default:
            console.error(
                new Date().toISOString(),
                "UNKNOWN LOG TYPE:",
                maybeError
            );
            break;
    }
};
