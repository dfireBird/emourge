import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";
import { extractEmoji } from "../utils";

export default class EmojiListener extends Listener {
    private emojiRepo = getRepository(Emoji);
    constructor() {
        super("message", {
            emitter: "client",
            event: "messageCreate",
        });
    }

    public exec(msg: Message) {
        this.storeEmoji(msg);
    }

    /*
     * Seprates emojis from the message string and store it in database
     *
     * @param msg: Message object
     */
    private async storeEmoji(msg: Message) {
        const emojis = extractEmoji(msg.content);
        const emojiIds = emojis.map((emoji) => {
            const result = emoji.match(/\d+/);
            return result !== null ? result[0] : "";
        });

        if (msg.guild === null) return;

        const emojiManager = msg.guild.emojis;
        for (const emojiId of emojiIds) {
            let emoji = emojiManager.resolve(emojiId);
            if (emoji === null) continue;

            const dbEmoji = await this.emojiRepo.findOne({
                id: emojiId,
            });
            if (dbEmoji === undefined) continue;
            dbEmoji.frequency += 1;

            try {
                await this.emojiRepo.save(dbEmoji);
            } catch (err) {
                console.log(err);
            }
        }
    }
}
