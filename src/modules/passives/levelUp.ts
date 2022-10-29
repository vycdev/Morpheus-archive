import { prisma } from "../..";
import { Context } from "../types/types";

const balanceMultiplier = parseInt(process.env.BALANCE_MULTIPLIER || "1");

const updateBalance = async (context: Context, level: number) => {
    if (!context.message.guild) return; // Something would have to be very wrong to return here.

    const userxp = await prisma.userProfiles.findFirst({
        where: {
            guildsGuild_id: context.message.guild.id,
            usersUser_id: context.message.author.id
        }
    });
    if (!userxp) return; // Something would have to be very wrong to return here.

    const balanceGain = // Here is the formula for balance gain
        Math.floor(level * Math.sqrt(level)) * balanceMultiplier;

    await prisma.userProfiles.update({
        where: {
            id: userxp.id
        },
        data: {
            balance: userxp.balance + balanceGain
        }
    });
    return balanceGain;
};

export const levelUp = async (context: Context, level: number) => {
    const { message } = context;

    const balanceGain = await updateBalance(context, level);
    message.reply(
        `You leveled up, you are now level ${level}!\nYou also earned $${balanceGain}!`
    );
};
