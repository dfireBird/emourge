import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { guildModel, IEmojiFrequency } from "../models/guildModel";

export default class EmojiDeleteListener extends Listener {
    constructor() {
        super("delete", {
            emitter: "client",
            event: "emojiDelete",
        });
    }

    public async exec(emoji: GuildEmoji) {
        const guild = await guildModel.findOne({ id: emoji.guild.id }).exec();
        if (guild === null) return;

        const index = guild.emojiFrequency.findIndex(
            (i) => i.emojiId === emoji.id
        );

        if (index > -1) {
            guild.emojiFrequency.splice(index, 1);
        }

        try {
            await guild.save();
        } catch (err) {
            console.log(err);
        }
    }
}
