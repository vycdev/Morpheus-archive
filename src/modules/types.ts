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

export type Matcher = (context: Context, match?: string) => Promise<boolean>;

export type ErrorHandler<T extends object> = (
    command: Command<T>
) => Command<T> | void;

export type Data<T extends object> = T;

export type Command<T extends object> = (
    context: Context
) => [metadata: Data<T>, matchers: Matcher[], func: () => Promise<LOG | void>];

export type TryCommandsFunction<T extends object> = (
    context: Context,
    matchers: Matcher[],
    commands: Command<T>[],
    errorHandlers: ErrorHandler<T>[]
) => void;
