import {
    AkairoClient,
    CommandHandler,
    ListenerHandler,
    InhibitorHandler,
} from "discord-akairo";
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

    /*
     * Inhibitor Handler instance
     */
    private inhibitorHandler: InhibitorHandler;

    /**
     * Initialize the bot with token
     *
     * @param token
     */
    constructor(token: string) {
        super({ ownerID: process.env.BOT_OWNER_ID });

        this.commandHandler = new CommandHandler(this, {
            directory: `${__dirname}/commands/`,
            allowMention: true,
            prefix: process.env.PREFIX,
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: `${__dirname}/listeners/`,
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: `${__dirname}/inhibitors/`,
        });

        this.login(token);
        this.commandHandler.loadAll();
        this.inhibitorHandler.loadAll();
        this.listenerHandler.loadAll();

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
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
