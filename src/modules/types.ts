import { Client, Message } from "discord.js";

export type Context = {
    client: Client;
    message: Message;
};

export type LOG = {
    code: number;
    type: "logToDiscord" | "logToConsole" | "logToBoth";
    info: string;
};

export type Metadata = Partial<{
    name: string;
    suffix: string;
    description: string;
    cooldown: number;
}>;

export type Matcher = (context: Context, match?: string) => void;

export type ErrorHandler<T extends object> = (
    command: Command<T>
) => Command<T> | void;

export type Data<T extends object> = T;

export type Command<T extends object> = (
    context: Context
) => [metadata: Data<T>, matcher: Matcher, func: () => LOG | void];

export type TryCommandsFunction<T extends object> = (
    context: Context,
    matcher: Matcher,
    commands: Command<T>[],
    errorHandler: ErrorHandler<T>
) => void;
