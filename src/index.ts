import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
// import commands from "./commands/index";
import { textCommands } from "./commands/index";
import { contextBuilder } from "./modules/helpers/contextBuilder";
import { humanMatcher } from "./modules/matchers/humanMatcher";
import { tryCommands } from "./modules/tryCommands";
import { helpMessageInteractionHandler } from "./commands/utility/help";

import { PrismaClient } from "@prisma/client";
import { initGuild } from "./modules/passives/initialisers/initGuild";
import { initUser } from "./modules/passives/initialisers/initUser";
import { initUsersXp } from "./modules/passives/initialisers/initUsersXp";
import { initXpDays } from "./modules/passives/initialisers/initXpDays";
import { claimXp } from "./modules/passives/claimXp";

export const prisma = new PrismaClient();

const intents = new IntentsBitField();
intents.add(32767); // Fix this please.
intents.add("MessageContent");

const client = new Client({ intents });

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

    initUser(context); // need some optimisation with these db functions
    initUsersXp(context); // well I guess they are good enough
    initXpDays(context); // for now
    claimXp(context);

    tryCommands(context, [humanMatcher], textCommands);
});

client.on("interactionCreate", (interaction) => {
    helpMessageInteractionHandler(interaction);
    //     // Slash commands test
    //     if (!interaction.isCommand()) return;

    //     // const { commandName } = interaction;

    //     interaction.reply("pong");
});

client.on("guildCreate", (guild) => {
    initGuild(guild);
});

client.on("error", (err) => console.error(`🔴 ${err}`));
main();
