import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { guildModel } from "./models/guildModel";

/**
 * The bot class extends client and with command handlers
 */
class Bot extends AkairoClient {
    /**
     * Command Handler instance
     */
    private commandHandler: CommandHandler;

    /**
     * Listener Handler instance
     */
    private listenerHandler: ListenerHandler;

    /**
     * Initialize the bot with token
     *
     * @param token
     */
    constructor(token: string) {
        super({ ownerID: process.env.BOT_OWNER_ID });

        this.commandHandler = new CommandHandler(this, {
            directory: `${__dirname}/commands/`,
            prefix: process.env.PREFIX,
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: `${__dirname}/listeners/`,
        });

        this.login(token);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    /*
     * Wrapper around AkairoClient login method;
     *
     * @param token
     */
    public async login(token: string) {
        return super.login(token);
    }
}

export default Bot;
