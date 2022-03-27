import { LogHandler } from "./types";

export const logHandler: LogHandler = (logdata, context) => {
    const { info, code, type } = logdata;

    if (type === "logToBoth") {
        console.log(`[${code}]: ${info}`);
        context.message.channel.send(`[${code}]: ${info}`);
    } else if (type === "logToConsole") {
        console.log(`[${code}]: ${info}`);
    } else if (type === "logToDiscord") {
        context.message.channel.send(`[${code}]: ${info}`);
    }
};
