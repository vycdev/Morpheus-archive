import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    CacheType,
    EmbedBuilder,
    Interaction
} from "discord.js";
import { prisma } from "../..";
import { logHandler } from "../../modules/handlers/logHandler";
import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command } from "../../modules/types/types";

const getQuotes = async (page: number, guildGuild_id: string) => {
    return await prisma.quotes.findMany({
        take: 10,
        skip: page * 10,
        where: {
            guildGuild_id
        },
        orderBy: {
            id: "asc"
        }
    });
};

const countQuotes = async (guildGuild_id: string) => {
    return await prisma.quotes.count({
        where: {
            guildGuild_id
        }
    });
};

const getTotalPages = (totalQuotes: number) =>
    totalQuotes % 10 > 0
        ? Math.trunc(totalQuotes / 10)
        : Math.trunc(totalQuotes / 10 - 1);

const generateQuotesComponents = async (
    page: number,
    guildGuild_id: string
) => {
    const totalQuotes = await countQuotes(guildGuild_id);
    const totalPages = getTotalPages(totalQuotes);

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`pagesButton ${page - 1}`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page <= 0)
                .setLabel("◀")
        )
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`pagesButton ${page + 1}`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(page >= totalPages)
                .setLabel("▶")
        );
    return buttons;
};

export const quotesComponentInteractionHandler = async (
    interaction: Interaction<CacheType>
) => {
    if (!interaction.isButton()) return;
    const [type, page] = interaction.customId.split(" ");

    if (type !== "pagesButton") return;
    if (!interaction.guild) return;

    interaction.update({
        embeds: [
            await generateQuotesEmbed(
                parseInt(page),
                interaction.guild.id,
                interaction.guild.name
            )
        ],
        components: [
            await generateQuotesComponents(parseInt(page), interaction.guild.id)
        ]
    });
};

const generateQuotesEmbed = async (
    page: number,
    guildGuild_id: string,
    guildName: string
) => {
    const totalQuotes = await countQuotes(guildGuild_id);
    const totalPages = getTotalPages(totalQuotes);
    const quotes = await Promise.all(
        (
            await getQuotes(page, guildGuild_id)
        ).map(async (v) => {
            const userTag = (
                await prisma.users.findFirst({
                    where: {
                        user_id: v.userUser_id
                    }
                })
            )?.user_tag;

            return `**\`[ID: ${v.id}] [Added by: ${userTag}]\`:**\n${v.quote}`;
        })
    );

    const embed = new EmbedBuilder()
        .setColor(0x03adfc)
        .setTitle(`${guildName} has ${totalQuotes} quotes in total.`)
        .setDescription(
            totalQuotes === 0
                ? "*Looks like this server doesn't have any quotes added yet.*"
                : quotes.join("\n")
        )
        .setFooter({ text: `Page: ${page}/${totalPages}` });

    return embed;
};

export const quotesCommand: Command = (context) => [
    {
        name: "Quotes",
        description: "Shows a list with the quotes of the server.",
        longDescription: "Shows a list with the quotes of the server.",
        usage: ["m!quotes"],
        usageExamples: ["m!quotes"],
        category: "Quotes",
        cooldown: 10000
    },
    [() => prefixMatcher(context, ["quotes"])],
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
        const embed = await generateQuotesEmbed(
            0,
            context.message.guild.id,
            context.message.guild.name
        );
        const components = await generateQuotesComponents(
            0,
            context.message.guild.id
        );
        message.reply({ embeds: [embed], components: [components] });
    }
];
