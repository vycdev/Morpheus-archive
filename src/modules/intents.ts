import { IntentsBitField } from "discord.js";

export const intents = new IntentsBitField();

intents.add("DirectMessageReactions");
intents.add("DirectMessageTyping");
intents.add("DirectMessages");
intents.add("GuildBans");
intents.add("GuildEmojisAndStickers");
intents.add("GuildIntegrations");
intents.add("GuildInvites");
intents.add("GuildMembers");
intents.add("GuildMessageReactions");
intents.add("GuildMessageTyping");
intents.add("GuildMessages");
intents.add("GuildPresences");
intents.add("GuildScheduledEvents");
intents.add("GuildVoiceStates");
intents.add("GuildWebhooks");
intents.add("Guilds");
intents.add("MessageContent");
