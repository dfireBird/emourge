import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";

/**
 * The bot class with client and command handlers
 */
class Bot {
    /**
     * Akairo Client instance
     */
    private client: AkairoClient;

    /**
     * Command Handler instance
     */
    private commandHandler: CommandHandler;

    /*
     * Listener Handler instance
     */
    private listenerHandler: ListenerHandler;

    /**
     * Initialize the bot with token
     *
     * @param token
     */
    constructor(token: string) {
        this.client = new AkairoClient({ ownerID: process.env.BOT_OWNER_ID });

        this.commandHandler = new CommandHandler(this.client, {
            directory: `${__dirname}/commands/`,
            prefix: process.env.PREFIX,
        });

        this.listenerHandler = new ListenerHandler(this.client, {
            directory: `${__dirname}/listeners/`,
        });

        this.client.login(token);
        this.listenerHandler.loadAll();
    }
}

export default Bot;
