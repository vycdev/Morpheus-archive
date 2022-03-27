import { Metadata, TryCommandsFunction } from "./types";

export const tryCommands: TryCommandsFunction<Metadata> = async (
    context,
    matchers,
    commands,
    logHandlers
) => {
    let matches = true;
    for (const matcher of matchers)
        matches = (await matcher(context)) && matches;

    if (matches) {
        for (const command of commands) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [metadata, matchers, func] = command(context);
            let commandMatches = true;
            for (const matcher of matchers)
                commandMatches = (await matcher(context)) && matches;

            if (commandMatches) {
                const maybeError = await func();
                if (maybeError) {
                    for (const handler of logHandlers)
                        handler(maybeError, context);
                }
            }
        }
    }
};
