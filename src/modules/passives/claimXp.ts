import { prisma } from "../../../";
import { computeLevel, totalXpGuild, xpGain } from "../helpers/computeLevel";
import { humanMatcher } from "../matchers/humanMatcher";
import { Context } from "../types/types";
import { levelUp } from "./levelUp";

const claimCooldown = parseInt(process.env.XP_CLAIM_COOLDOWN_MS || "60000");

export const claimXp = async (context: Context) => {
    if (!(await humanMatcher(context))) return;
    if (!context.message.guild) return;
    const usersxp = await prisma.userProfiles.findFirst({
        where: {
            usersUser_id: context.message.author.id,
            guildsGuild_id: context.message.guild.id
        }
    });
    if (!usersxp) return;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const xpToday = await prisma.xpDays.findFirst({
        where: {
            usersXpId: usersxp.id,
            day: {
                gt: today
            }
        }
    });
    if (!xpToday) return;

    const totalXp = await totalXpGuild(usersxp);
    if (totalXp === undefined) return;

    const xpGained = xpGain(computeLevel(totalXp));

    if (new Date().getTime() - xpToday.lastClaimed.getTime() > claimCooldown) {
        await prisma.xpDays.update({
            where: {
                id: xpToday.id
            },
            data: {
                lastClaimed: new Date(),
                xp: xpToday.xp + xpGained,
                timesClaimed: xpToday.timesClaimed + 1
            }
        });
        if (computeLevel(totalXp + xpGained) > computeLevel(totalXp)) {
            levelUp(context, computeLevel(totalXp));
        }
    }
};
