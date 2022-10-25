import { prisma } from "../..";
import { Context } from "../types/types";

const balanceMultiplier = parseInt(process.env.BALANCE_MULTIPLIER || "1");

const updateBalance = async (context: Context, level: number) => {
    if (!context.message.guild) return; // Something would have to be very wrong to return here.

    const userxp = await prisma.usersXp.findFirst({
        where: {
            guildsGuild_id: context.message.guild.id,
            usersUser_id: context.message.author.id
        }
    });
    if (!userxp) return; // Something would have to be very wrong to return here.

    const balanceGain = // Here is the formula for balance gain
        userxp.balance +
        Math.floor(level * Math.sqrt(level)) * balanceMultiplier;

    await prisma.usersXp.update({
        where: {
            id: userxp.id
        },
        data: {
            balance: balanceGain
        }
    });
};

export const levelUp = (context: Context, level: number) => {
    const { message } = context;

    updateBalance(context, level);
    message.reply(`You leveled up, you are now level *${level}!*`);
};
