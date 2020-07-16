import { AkairoClient, CommandHandler } from "discord-akairo";

/**
 * The bot class with client and command handlers
 */
class Bot {
    /**
     * Command Handler instance
     */
    private commandHandler: CommandHandler;

    /**
     * Akairo Client instance
     */
    private client: AkairoClient;

    /**
     * Initialize the bot with token
     *
     * @param token
     */
    constructor(token: string) {
        this.client = new AkairoClient({ ownerID: process.env.BOT_OWNER_ID });

        this.commandHandler = new CommandHandler(this.client, {
            directory: "./commands/",
            prefix: process.env.PREFIX,
        });

        this.client.login(token);
    }
}

export default Bot;
