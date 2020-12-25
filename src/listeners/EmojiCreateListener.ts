import { Listener } from "discord-akairo";
import { GuildEmoji } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";
import { Guild } from "../entities/Guild";

export default class EmojiCreateListener extends Listener {
    private emojiRepository = getRepository(Emoji);
    private guildRepository = getRepository(Guild);
    constructor() {
        super("create", {
            emitter: "client",
            event: "emojiCreate",
        });
    }

    public async exec(emoji: GuildEmoji) {
        console.log("Emoji Create");
        // const guild = await guildModel.findOne({ id: emoji.guild.id }).exec();
        const guild = await this.guildRepository.findOne(emoji.guild.id, {
            relations: ["emojis"],
        });
        if (guild === undefined) return;

        const newEmoji = this.emojiRepository.create({
            id: emoji.id,
            guild: guild,
            name: emoji.name,
            animated: emoji.animated,
            frequency: 0,
        });
        guild.emojis.push(newEmoji);

        try {
            await this.emojiRepository.save(newEmoji);
            await this.guildRepository.save(guild);
        } catch (err) {
            console.log(err);
        }
    }
}
