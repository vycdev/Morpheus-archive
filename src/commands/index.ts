import { SlashCommandBuilder } from "@discordjs/builders";

export default [
    new SlashCommandBuilder().setName("ping").setDescription("test the ping")
].map((command) => command.toJSON());
