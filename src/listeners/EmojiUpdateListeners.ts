import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";

export default class EmojiUpdateListener extends Listener {
    private emojiRepository = getRepository(Emoji);
    constructor() {
        super("update", {
            emitter: "client",
            event: "emojiUpdate",
        });
    }

    public async exec(old_emoji: GuildEmoji, new_emoji: GuildEmoji) {
        const oldDbEmoji = await this.emojiRepository.findOne({
            id: old_emoji.id,
        });
        if (oldDbEmoji === undefined) return;

        oldDbEmoji.name = new_emoji.name;

        try {
            await this.emojiRepository.save(oldDbEmoji);
        } catch (err) {
            console.log(err);
        }
    }
}
