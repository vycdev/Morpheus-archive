import { prisma } from "../../../";
import { humanMatcher } from "../../matchers/humanMatcher";
import { Context } from "../../types/types";

export const initUsersXp = async (context: Context) => {
    if (!(await humanMatcher(context))) return;
    if (!context.message.guild) return;
    const userxp = await prisma.userProfiles.findFirst({
        where: {
            usersUser_id: context.message.author.id,
            guildsGuild_id: context.message.guild.id
        }
    });
    if (userxp) return;

    const user = await prisma.users.findFirst({
        where: {
            user_id: context.message.author.id
        }
    });
    if (!user) return;

    const guild = await prisma.guilds.findFirst({
        where: {
            guild_id: context.message.guild.id
        }
    });
    if (!guild) return;

    await prisma.userProfiles.create({
        data: {
            usersUser_id: context.message.author.id,
            guildsGuild_id: context.message.guild.id
        }
    });
};
