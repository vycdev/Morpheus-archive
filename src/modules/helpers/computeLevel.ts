import { UserProfiles } from "@prisma/client";
import { prisma } from "../..";

const xpMultiplier = parseFloat(process.env.XP_MULTIPLIER || "1");
const scaler = parseFloat(process.env.XP_SCALER || "10");

export const computeLevel = (xp: number) => {
    return Math.floor(Math.sqrt(xp / scaler));
};

export const computeXp = (level: number) => level * level * scaler;

export const xpGain = (level: number) =>
    (Math.floor(Math.random() * 10) + 1 + Math.floor(Math.sqrt(level))) *
    xpMultiplier;

export const totalXpGuild = async (userxp: UserProfiles) => {
    const xpDays = await prisma.xpDays.findMany({
        where: {
            usersXpId: userxp.id
        }
    });
    if (!xpDays) return;
    const totalXp = xpDays
        .map((v) => v.xp)
        .reduce((prev, curr) => prev + curr, 0);

    return totalXp;
};

export const totalXpUser = async (userid: string) => {
    const usersxp = await prisma.userProfiles.findMany({
        where: {
            usersUser_id: userid
        }
    });
    if (!usersxp) return;

    const totalXp = (
        await Promise.all(
            usersxp.map(async (user) => {
                const xpDays = await prisma.xpDays.findMany({
                    where: {
                        usersXpId: user.id
                    }
                });
                if (!xpDays) return 0;
                const totalXp = xpDays
                    .map((v) => v.xp)
                    .reduce((prev, curr) => prev + curr, 0);
                return totalXp;
            })
        )
    ).reduce((prev, curr) => prev + curr, 0);

    return totalXp;
};
