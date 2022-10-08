import { Context } from "../types";

export type Cooldown = { lastTalkedAt: number };

const recentlySentCommand = new Map<string, { lastTalkedAt: number }>();

export const hasCooldown = (timeout: number, context: Context) => {
    const { message } = context;
    const { content } = message;
    const command = content.split(" ")[0];

    const mostRecentTime = new Date().getTime();

    const key = `${message.author.id}${command}`;

    if (recentlySentCommand.has(key)) {
        if (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            recentlySentCommand.get(key)!.lastTalkedAt + timeout >
            mostRecentTime
        ) {
            message.reply(
                `You have to wait **${
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    (recentlySentCommand.get(key)!.lastTalkedAt +
                        timeout -
                        mostRecentTime) /
                    1000
                }** seconds before using this command again.`
            );

            return true;
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            recentlySentCommand.get(key)!.lastTalkedAt = mostRecentTime;
        }
    } else {
        recentlySentCommand.set(key, {
            lastTalkedAt: mostRecentTime
        });
    }
    return false;
};
