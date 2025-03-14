import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

export const dailyRewardCommand: Command = (context) => [
    {
        name: "Claim Daily Reward",
        description: "Claim your daily reward, aka some free coins.",
        longDescription:
            "Claim your daily reward, aka some free coins. The initial reward will be multiplied by the streak, your streak increases with every day that you claim your reward in a row.",
        usage: ["m!cd", "m!claimdaily"],
        usageExamples: ["m!cd", "m!claimdaily"],
        category: "Other",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["cd", "claimdaily"])],
    async () => {
        const { message } = context;
        if (!context.message.guild) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You can only use this command in guilds."
                },
                context
            );
            return;
        }
        const userProfile = await prisma.userProfiles.findFirst({
            where: {
                usersUser_id: message.author.id,
                guildsGuild_id: context.message.guild.id
            }
        });
        if (!userProfile) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "Your user profile doesn't exist yet, try again in a few seconds."
                },
                context
            );
            return;
        }

        if (
            userProfile.last_daily_claim.setUTCHours(0, 0, 0, 0) >=
            new Date().setUTCHours(0, 0, 0, 0)
        ) {
            logHandler(
                {
                    code: 400,
                    type: "logToDiscord",
                    info: "You already claimed your reward today."
                },
                context
            );
            return;
        }

        const hasCombo =
            new Date().setUTCHours(0, 0, 0, 0) -
                userProfile.last_daily_claim.setUTCHours(0, 0, 0, 0) ===
            86400000;

        const balanceGain =
            10 *
            (hasCombo ? userProfile.daily_claim_combo : 1) *
            parseFloat(process.env.DAILY_MULTIPLIER || "1");

        await prisma.userProfiles.update({
            where: {
                id: userProfile.id
            },
            data: {
                last_daily_claim: new Date(),
                daily_claim_combo: hasCombo
                    ? userProfile.daily_claim_combo + 1
                    : 1,
                balance: userProfile.balance + balanceGain
            }
        });

        message.reply(
            `You succesfully claimed **${balanceGain}** coins. Your streak is **${userProfile.daily_claim_combo}**.\nClaim your reward again tomorrow for even more coins.`
        );
    }
];
