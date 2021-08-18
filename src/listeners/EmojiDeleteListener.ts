import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";
import { Guild } from "../entities/Guild";

export default class EmojiDeleteListener extends Listener {
    private emojiRepository = getRepository(Emoji);
    private guildRepository = getRepository(Guild);
    constructor() {
        super("delete", {
            emitter: "client",
            event: "emojiDelete",
        });
    }

    public async exec(emoji: GuildEmoji) {
        const dbEmoji = await this.emojiRepository.findOne({
            id: emoji.id,
        });
        if (dbEmoji === undefined) return;

        try {
            await this.emojiRepository.remove(dbEmoji);
        } catch (err) {
            console.log(err);
        }
    }
}
