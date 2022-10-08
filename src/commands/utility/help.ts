import { prefixMatcher } from "../../modules/matchers/prefixMatcher";
import { Command, FakeCommand } from "../../modules/types";
import {
    ActionRowBuilder,
    SelectMenuBuilder,
    Interaction,
    CacheType,
    EmbedBuilder
} from "discord.js";

import { textCommands } from "../index";

const getCommandCategories = () => {
    const categories = [
        ...new Set(
            (textCommands as FakeCommand[]).map((command) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [metadata, matchers, func] = command();

                return metadata.category;
            })
        )
    ];
    return categories;
};

const generateCategoriesComponent = (placeholder: string) => {
    const menuOptions = getCommandCategories().map((v) => {
        return {
            label: v,
            description: `Show a list of the ${v} commands.`,
            value: v
        };
    });

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
        new SelectMenuBuilder()
            .setCustomId("selectHelpCategory")
            .setPlaceholder(placeholder)
            .addOptions(menuOptions)
    );
    return row;
};

const generateCommandsComponent = (placeholder: string, category: string) => {
    const categoryCommands = getCommandsByCategory(category).map((command) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [metadata, matchers, func] = command();

        return {
            label: metadata.name,
            description: metadata.description,
            value: metadata.name
        };
    });
    const commandsRow = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
        new SelectMenuBuilder()
            .setCustomId("selectHelpCommand")
            .setPlaceholder(placeholder)
            .addOptions(categoryCommands)
    );

    return commandsRow;
};

const getCommandsByCategory = (category: string) => {
    const commands = (textCommands as FakeCommand[]).filter((command) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [metadata, matchers, func] = command();
        if (category === metadata.category) {
            return true;
        } else {
            return false;
        }
    });

    return commands;
};

const generateCommandEmbed = (command: FakeCommand) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [metadata, matchers, func] = command();
    const embedDescription = `**Description**\n ${
        metadata.description
    }\n**Extra**\n${
        metadata.longDescription
    }\n**Usage Examples**\n${metadata.usageExamples
        .map((v) => `\`${v}\``)
        .join("\n")}\n**Aliases**\n${metadata.usage
        .map((v) => `\`${v}\``)
        .join("\n")}`;

    const embed = new EmbedBuilder()
        .setColor(0x03adfc)
        .setTitle(metadata.name)
        .setDescription(embedDescription);

    return embed;
};

const generateCategoryEmbed = (category: string) => {
    const commands = (textCommands as FakeCommand[]).filter((command) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [metadata, matchers, func] = command();

        if (category === metadata.category) return true;
        else return false;
    });
    const embedDescription = commands
        .map((command) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [metadata, matchers, func] = command();

            return `\`${metadata.usage}\` | ${metadata.description}`;
        })
        .join("\n");
    const embed = new EmbedBuilder()
        .setColor(0x03adfc)
        .setTitle(category)
        .setDescription(embedDescription);

    return embed;
};

export const helpMessageInteractionHandler = async (
    interaction: Interaction<CacheType>
) => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId === "selectHelpCategory") {
        const embed = generateCategoryEmbed(interaction.values[0]);
        interaction.update({
            embeds: [embed],
            components: [
                generateCategoriesComponent(interaction.values[0]),
                generateCommandsComponent(
                    "Nothing selected.",
                    interaction.values[0]
                )
            ]
        });
        return;
    }
    if (interaction.customId === "selectHelpCommand") {
        const command = (textCommands as FakeCommand[]).filter((command) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [metadata, matchers, func] = command();

            return metadata.name === interaction.values[0];
        })[0];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [commandMetadata, commandMatchers, commandFunc] = command();
        const embed = generateCommandEmbed(command);
        interaction.update({
            embeds: [embed],
            components: [
                generateCategoriesComponent(commandMetadata.category),
                generateCommandsComponent(
                    commandMetadata.name,
                    commandMetadata.category
                )
            ]
        });
        return;
    }
    interaction.message.edit({
        content:
            "**This interaction is outdated, try to use the help command again.**.",
        embeds: [],
        components: []
    });
    return;
};

export const helpCommand: Command = (context) => [
    {
        name: "Help",
        description: "Show a menu with all the commands.",
        longDescription:
            "The menu has two select components that you can use to select either categories or individual commands.",
        usage: ["m!help"],
        usageExamples: ["m!help"],
        category: "Utility",
        cooldown: 15000
    },
    [() => prefixMatcher(context, ["help"])],
    async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { message, content } = context;
        const row = generateCategoriesComponent("Nothing selected.");

        const embed = new EmbedBuilder()
            .setColor(0x03adfc)
            .setTitle("Help Menu")
            .setDescription(
                "**Select one of the categories to see the commands.**"
            );

        await message.reply({ embeds: [embed], components: [row] });
    }
];
