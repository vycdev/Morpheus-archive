import { errorHandler } from "./handlers/errorHandler";
import { logHandler } from "./handlers/logHandler";
import { hasCooldown } from "./helpers/commandCooldowns";
import { TryCommandsFunction } from "./types/types";

export const tryCommands: TryCommandsFunction = async (
    context,
    matchers,
    commands
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
                commandMatches = (await matcher(context)) && commandMatches;

            if (commandMatches) {
                //Handle the cooldowns here
                if (hasCooldown(metadata.cooldown, context)) return;

                try {
                    const maybeLog = await func();
                    if (maybeLog) {
                        logHandler(maybeLog, context);
                    }
                } catch (error) {
                    errorHandler(error, context);
                }
            }
        }
    }
};
