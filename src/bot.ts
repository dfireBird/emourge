import {
    AkairoClient,
    CommandHandler,
    ListenerHandler,
    MongooseProvider,
} from "discord-akairo";
import { emojiFrequencyModel } from "./emojiModel";

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
     * Mongoose provide instance for recording emoji frequency
     */
    private emojiFrequency: MongooseProvider;

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

        this.emojiFrequency = new MongooseProvider(emojiFrequencyModel);

        this.login(token);
        this.listenerHandler.loadAll();
    }

    /*
     * Wrapper around AkairoClient login method;
     *
     * @param token
     */
    public async login(token: string) {
        await this.emojiFrequency.init();
        return super.login(token);
    }
}

export default Bot;
