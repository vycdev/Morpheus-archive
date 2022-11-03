import { AllowedMentionsTypes, TextChannel } from "discord.js";
import { prisma } from "../..";
import { logHandler } from "../handlers/logHandler";
import { Context } from "../types/types";

const balanceMultiplier = parseFloat(process.env.BALANCE_MULTIPLIER || "1");

const updateBalance = async (context: Context, level: number) => {
    if (!context.message.guild) return; // Something would have to be very wrong to return here.

    const userprofile = await prisma.userProfiles.findFirst({
        where: {
            guildsGuild_id: context.message.guild.id,
            usersUser_id: context.message.author.id
        }
    });
    if (!userprofile) return; // Something would have to be very wrong to return here.

    const balanceGain = // Here is the formula for balance gain
        Math.floor(level * Math.sqrt(level)) * balanceMultiplier;

    await prisma.userProfiles.update({
        where: {
            id: userprofile.id
        },
        data: {
            balance: userprofile.balance + balanceGain
        }
    });
    return balanceGain;
};

export const levelUp = async (context: Context, level: number) => {
    const { message } = context;
    if (!message.guild) return;
    const balanceGain = await updateBalance(context, level);

    const guild = await prisma.guilds.findFirst({
        where: {
            guild_id: message.guild.id
        }
    });

    if (process.env.NODE_ENV === "development")
        logHandler(
            {
                code: 200,
                info: `${message.author.tag} leveled up, level: ${level}, balance gain: ${balanceGain}, guild: ${message.guild.name}`,
                type: "logToConsole"
            },
            context
        );

    const quotesCount = await prisma.quotes.count({
        where: {
            guildGuild_id: guild?.global_quotes ? undefined : message.guild.id
        }
    });
    const skip = Math.floor(Math.random() * quotesCount);
    const quote = (
        await prisma.quotes.findMany({
            take: 1,
            skip: skip,
            where: {
                guildGuild_id: guild?.global_quotes
                    ? undefined
                    : message.guild.id
            },
            orderBy: {
                id: "desc"
            }
        })
    )[0];

    if (!guild?.levelUps_channel) {
        if (!guild?.disable_levelUps)
            message.reply(
                `You leveled up, you are now level ${level}!\nYou also earned $${balanceGain}!`
            );
    } else {
        const levelUpsChannel = (await message.guild.channels.fetch(
            guild.levelUps_channel
        )) as TextChannel;
        if (levelUpsChannel)
            levelUpsChannel.send({
                content: `<@${message.author.id}> You leveled up, you are now level ${level}!\nYou also earned $${balanceGain}!`,
                allowedMentions: { users: [] }
            });
    }

    if (!quote) {
        message.channel.send(
            "This server has no quotes added, disable the quotes or add some quotes for this message to no longer appear."
        );
    }

    if (!guild?.quotes_channel) {
        if (!guild?.disable_quotes) message.channel.send(`${quote.quote}`);
    } else {
        const quotesChannel = (await message.guild.channels.fetch(
            guild.quotes_channel
        )) as TextChannel;
        if (quotesChannel)
            quotesChannel.send({
                content: `${quote.quote}`,
                allowedMentions: { users: [] }
            });
    }
};
