import { Client, Intents, Interaction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
    new SlashCommandBuilder().setName("ping").setDescription("test the ping")
].map((command) => command.toJSON());

const main = async () => {
    console.info("🟡 Connecting to discord...");
    await client.login(process.env.BOT_TOKEN);
    console.info(`🟢 Logged in as ${client.user?.tag}`);

    client.user?.setActivity("💊 m!help");
    console.info("🟢 Bot activity has been set.");

    console.info("🟡 Setting slash commands...");
    if (!process.env.TESTING_GUILDID) {
        await client.application?.commands.set(commands);
    } else {
        await (
            await client.guilds.fetch(process.env.TESTING_GUILDID)
        ).commands.set([]);
        await (
            await client.guilds.fetch(process.env.TESTING_GUILDID)
        ).commands.set(commands);
    }
    console.info("🟢 Slash commands have been set.");

    console.info("🟢 The bot is up and running.");
};

client.on("interactionCreate", async (interaction) => {
    // Slash commands test
    if (!interaction.isCommand()) return;

    // const { commandName } = interaction;

    interaction.reply("pong");
});

client.on("error", (err) => console.error(`🔴 ${err}`));
main();
