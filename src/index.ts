import "ts-node/register";
import "dotenv/config";
import { Client } from "discord.js";

import { intents } from "./modules/intents";
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
import { quotesComponentInteractionHandler } from "./commands/quotes/quotes";
import { welcomeEventsInitialiser } from "./modules/passives/welcomeMessages";

export const prisma = new PrismaClient();

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
    console.info("🟢 Set the bot activity.");

    welcomeEventsInitialiser(client);
    console.info("🟢 Set the welcome events initialiser.");

    // setSlashCommands();

    console.info("🟢 The bot is up and running.");
};

client.on("messageCreate", (message) => {
    const context = contextBuilder(client, message);

    // rlly annoying when the data in the db gets deleted
    // and I have to manually add this line of code again
    // because I dont want to reinvite the bot in the server
    if (message.guild && process.env.NODE_ENV === "development")
        initGuild(message.guild);

    initUser(context); // need some optimisation with these db functions
    initUsersXp(context); // well I guess they are good enough
    initXpDays(context); // for now
    claimXp(context);

    tryCommands(context, [humanMatcher], textCommands);
});

client.on("interactionCreate", (interaction) => {
    helpMessageInteractionHandler(interaction);
    quotesComponentInteractionHandler(interaction);
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
