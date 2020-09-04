import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { guildModel } from "../models/guildModel";

export default class EmojiUpdateListener extends Listener {
    constructor() {
        super("update", {
            emitter: "client",
            event: "emojiUpdate",
        });
    }

    public async exec(old_emoji: GuildEmoji, new_emoji: GuildEmoji) {
        const guild = await guildModel
            .findOne({ id: old_emoji.guild.id })
            .exec();
        if (guild === null) return;

        const index = guild.emojiFrequency.findIndex(
            (i) => i.emojiId === old_emoji.id
        );

        if (index > -1) {
            guild.emojiFrequency[index].emojiName = new_emoji.name;
        }

        try {
            await guild.save();
        } catch (err) {
            console.log(err);
        }
    }
}
