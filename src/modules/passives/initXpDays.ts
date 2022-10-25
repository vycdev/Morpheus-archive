import { prisma } from "../..";
import { humanMatcher } from "../matchers/humanMatcher";
import { Context } from "../types/types";

export const initXpDays = async (context: Context) => {
    if (!(await humanMatcher(context))) return;
    if (!context.message.guild) return;
    const userxp = await prisma.usersXp.findFirst({
        where: {
            usersUser_id: context.message.author.id,
            guildsGuild_id: context.message.guild.id
        }
    });
    if (!userxp) return;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const xpdays = await prisma.xpDays.findFirst({
        where: {
            usersXpId: userxp.id,
            day: {
                gt: today
            }
        }
    });
    if (xpdays) return;

    await prisma.xpDays.create({
        data: {
            usersXpId: userxp.id
        }
    });
};
