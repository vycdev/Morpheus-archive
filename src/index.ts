import { Client, Intents } from "discord.js";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const main = async () => {
    console.info("🚀 Connecting to discord...");
    await client.login(process.env.BOT_TOKEN);
    console.info(`🗝️  Logged in as ${client.user?.tag}`);

    client.user?.setActivity("💊 m!help");
    console.info("🐱 Bot activity has been set.");
    console.info("👍 The bot is up and running.");
};

client.on("error", (err) => console.error(err));
main();
