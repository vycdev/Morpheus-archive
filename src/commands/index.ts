import { copyPastaCommand } from "./fun/copyPasta";
import { jokeCommand } from "./fun/joke";
import { sayCommand } from "./fun/say";
import { xmasCommand } from "./fun/xmas";
import { helpCommand } from "./utility/help";

export const textCommands = [
    sayCommand,
    helpCommand,
    copyPastaCommand,
    jokeCommand,
    xmasCommand
];

// import { SlashCommandBuilder } from "@discordjs/builders";

// export default [
//     new SlashCommandBuilder().setName("ping").setDescription("test the ping")
// ].map((command) => command.toJSON());
