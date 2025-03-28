import { Client, Message } from "discord.js";

export type Context = {
    client: Client;
    message: Message;
    content: string;
    argvs: string[];
};

export type LOG = {
    code: number;
    type: "logToDiscord" | "logToConsole" | "logToBoth";
    info: string;
};

export type Metadata = {
    name: string;
    usage: string[];
    description: string;
    longDescription: string;
    usageExamples: string[];
    category: string;
    cooldown: number;
};
// A matcher returns true if the next function command/commands can be executed.
export type Matcher<T> = (context: Context, match?: T) => Promise<boolean>;
// A log handler takes a log and uses the data to log it to the console or in discord.
export type LogHandler = (maybeLog: LOG, context: Context) => void;
export type ErrorHandler = (error: Error | unknown, context: Context) => void;

export type Data<T extends object> = T;

export type ContextBuilder = (client: Client, message: Message) => Context;

// A command returns a LOG if the execution wasn't successful.

export type Command = (
    context: Context
) => [
    metadata: Data<Metadata>,
    matchers: Matcher<string[]>[],
    func: () => Promise<LOG | void>
];

export type TryCommandsFunction = (
    context: Context,
    matchers: Matcher<void>[],
    commands: Command[]
) => void;
