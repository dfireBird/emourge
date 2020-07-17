import {
    AkairoClient,
    CommandHandler,
    ListenerHandler,
    MongooseProvider,
} from "discord-akairo";
import { emojiFrequencyModel } from "./emojiModel";

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

    /**
     * Listener Handler instance
     */
    private listenerHandler: ListenerHandler;

    /**
     * Mongoose provide instance for recording emoji frequency
     */
    private emojiFrequency: MongooseProvider;

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

        this.emojiFrequency = new MongooseProvider(emojiFrequencyModel);

        this.login(token);
        this.listenerHandler.loadAll();
    }

    /*
     * Wrapper around AkairoClient login method;
     *
     * @param token
     */
    private async login(token: string) {
        await this.emojiFrequency.init();
        await this.client.login(token);
    }
}

export default Bot;
