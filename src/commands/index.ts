import { Context } from "../modules/types/types";
import { copyPastaCommand } from "./fun/copyPasta";
import { jokeCommand } from "./fun/joke";
import { sayCommand } from "./fun/say";
import { screamCommand } from "./fun/scream";
import { xmasCommand } from "./fun/xmas";
import { guildProfileCommand } from "./guild/guildProfile";
import { setLevelUpChannel } from "./guild/setLevelUpChannel";
import { setPrefixCommand } from "./guild/setprefix";
import { setQuotesChannel } from "./guild/setQuotesChannel";
import { toggleGlobalQuotes } from "./guild/toggleGlobalQuotes";
import { toggleLevelUps } from "./guild/toggleLevelUps";
import { toggleQuotes } from "./guild/toggleQuotes";
import { dailyRewardCommand } from "./other/dailyclaim";
import { feedbackCommand } from "./other/feedback";
import { profileCommand } from "./profile/profile";
import { addQuoteCommand } from "./quotes/addquote";
import { deleteQuote } from "./quotes/deletequote";
import { quotesCommand } from "./quotes/quotes";
import { ageCommand } from "./utility/age";
import { helpCommand } from "./utility/help";
import { timeCommand } from "./utility/time";

export const textCommands = [
    sayCommand,
    helpCommand,
    copyPastaCommand,
    jokeCommand,
    xmasCommand,
    screamCommand,
    timeCommand,
    ageCommand,
    setPrefixCommand,
    toggleLevelUps,
    toggleQuotes,
    setLevelUpChannel,
    setQuotesChannel,
    dailyRewardCommand,
    addQuoteCommand,
    toggleGlobalQuotes,
    feedbackCommand,
    deleteQuote,
    quotesCommand,
    profileCommand,
    guildProfileCommand
];

export const commandsMetadata = textCommands.map((v) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [metadata, matchers, func] = v({} as Context);
    return metadata;
});

// import { SlashCommandBuilder } from "@discordjs/builders";

// export default [
//     new SlashCommandBuilder().setName("ping").setDescription("test the ping")
// ].map((command) => command.toJSON());
