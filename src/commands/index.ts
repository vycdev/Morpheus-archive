import { sayCommand } from "./fun/say";
import { helpCommand } from "./utility/help";

export const textCommands = [sayCommand, helpCommand];

// import { SlashCommandBuilder } from "@discordjs/builders";

// export default [
//     new SlashCommandBuilder().setName("ping").setDescription("test the ping")
// ].map((command) => command.toJSON());
