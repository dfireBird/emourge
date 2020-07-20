import { Listener } from "discord-akairo";
import { Message } from "discord.js";
import { extractEmoji } from "../utils";
import { guildModel } from "../models/guildModel";

export default class EmojiListener extends Listener {
    constructor() {
        super("message", {
            emitter: "client",
            event: "message",
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

            const guild = await guildModel.findOne({ id: msg.guild.id }).exec();

            if (guild === null) continue;

            const index = guild.emojiFrequency.findIndex((e) => {
                if (emoji === null) return;
                return e.emojiId == emoji.id;
            });

            guild.emojiFrequency[index].frequency++;
            try {
                await guild.save();
            } catch (err) {
                console.log(err);
            }
        }
    }
}
