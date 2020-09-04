import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { guildModel, IEmojiFrequency } from "../models/guildModel";

export default class EmojiCreateListener extends Listener {
    constructor() {
        super("create", {
            emitter: "client",
            event: "emojiCreate",
        });
    }

    public async exec(emoji: GuildEmoji) {
        console.log("Emoji Create");
        const guild = await guildModel.findOne({ id: emoji.guild.id }).exec();
        if (guild === null) return;

        guild.emojiFrequency.push({
            emojiId: emoji.id,
            emojiName: emoji.name,
            animated: emoji.animated,
            frequency: 0,
        });

        try {
            await guild.save();
        } catch (err) {
            console.log(err);
        }
    }
}
