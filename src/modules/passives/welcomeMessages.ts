import {
    Client,
    EmbedBuilder,
    GuildMember,
    PartialGuildMember,
    TextChannel
} from "discord.js";
import { prisma } from "../..";

const getWelcomeChannel = async (guildid: string): Promise<string | null> => {
    const guild = await prisma.guilds.findFirst({
        where: {
            guild_id: guildid
        }
    });
    if (!guild) return null;

    return guild.welcome_channel;
};

const joinMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;

    const embed = new EmbedBuilder()
        .setTitle(member.user.tag)
        .setDescription("**JOINED THE SERVER**")
        .setThumbnail(member.displayAvatarURL())
        .setURL(`https://discordapp.com/users/${member.id}`)
        .setColor(3447003);
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send({
            embeds: [embed]
        });
    } catch (error) {
        console.log(error);
    }
};

const leaveMessage = async (
    guildid: string,
    client: Client,
    member: GuildMember | PartialGuildMember
) => {
    const channelid = await getWelcomeChannel(guildid);
    if (!channelid) return;

    const embed = new EmbedBuilder()
        .setTitle(member.user.tag)
        .setDescription("**LEFT THE SERVER**")
        .setThumbnail(member.displayAvatarURL())
        .setURL(`https://discordapp.com/users/${member.id}`)
        .setColor(3447003);
    try {
        const channel = (await client.channels.fetch(channelid)) as TextChannel;
        channel.send({
            embeds: [embed]
        });
    } catch (error) {
        console.log(error);
    }
};

export const welcomeEventsInitialiser = (client: Client) => {
    client.on("guildMemberAdd", async (member) => {
        joinMessage(member.guild.id, client, member);
    });

    client.on("guildMemberRemove", async (member) => {
        leaveMessage(member.guild.id, client, member);
    });
};
