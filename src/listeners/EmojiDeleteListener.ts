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
        const guild = await this.guildRepository.findOne(emoji.guild.id, {
            relations: ["emoji"],
        });
        if (guild === undefined) return;

        const index = guild.emojis.findIndex((i) => i.id === emoji.id);

        if (index > -1) {
            guild.emojis.splice(index, 1);
        }
        const dbEmoji = await this.emojiRepository.findOne(emoji.id);
        if (dbEmoji === undefined) return;

        try {
            await this.guildRepository.save(guild);
            await this.emojiRepository.remove(dbEmoji);
        } catch (err) {
            console.log(err);
        }
    }
}
