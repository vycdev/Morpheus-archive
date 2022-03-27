import { Client, Intents } from "discord.js";
// import commands from "./commands/index";
import { textCommands } from "./commands/index";
import { contextBuilder } from "./modules/contextBuilder";
import { logHandler } from "./modules/logHandler";
import { humanMatcher } from "./modules/matchers/humanMatcher";
import { tryCommands } from "./modules/tryCommands";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const setSlashCommands = async () => {
//     console.info("🟡 Setting slash commands...");
//     if (!process.env.TESTING_GUILDID) {
//         await client.application?.commands.set(commands);
//     } else {
//         await (
//             await client.guilds.fetch(process.env.TESTING_GUILDID)
//         ).commands.set([]);
//         await (
//             await client.guilds.fetch(process.env.TESTING_GUILDID)
//         ).commands.set(commands);
//     }
//     console.info("🟢 Slash commands have been set.");
// };

const setBotActivity = () => {
    client.user?.setActivity("💊 m!help");
    console.info("🟢 Bot activity has been set.");
};

const main = async () => {
    console.info("🟡 Connecting to discord...");
    await client.login(process.env.BOT_TOKEN);
    console.info(`🟢 Logged in as ${client.user?.tag}`);

    setBotActivity();
    // setSlashCommands();

    console.info("🟢 The bot is up and running.");
};

client.on("messageCreate", (message) => {
    const context = contextBuilder(client, message);
    tryCommands(context, [humanMatcher], textCommands, [logHandler]);
});

client.on("interactionCreate", async (interaction) => {
    // Slash commands test
    if (!interaction.isCommand()) return;

    // const { commandName } = interaction;

    interaction.reply("pong");
});

client.on("error", (err) => console.error(`🔴 ${err}`));
main();
