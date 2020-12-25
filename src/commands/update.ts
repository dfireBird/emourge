import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { getRepository } from "typeorm";
import { Guild } from "../entities/Guild";
import { Emoji } from "../entities/Emoji";

class UpdateCommand extends Command {
    private guildRepo = getRepository(Guild);
    constructor() {
        super("update", {
            aliases: ["update"],
            channel: "guild",
        });
    }

    public async exec(msg: Message) {
        if (msg.guild === null) return;
        const emojis = msg.guild.emojis.cache;
        const guild = await this.guildRepo.findOne(msg.guild.id, {
            relations: ["emojis"],
        });
        if (guild === undefined) return;

        const updatedEmojis: Emoji[] = emojis.map((emoji) => {
            const found = guild.emojis.find(
                (dbEmoji) => dbEmoji.id === emoji.id
            );
            if (found) {
                return found;
            } else {
                const newEmoji = getRepository(Emoji).create({
                    id: emoji.id,
                    guild: guild,
                    name: emoji.name,
                    animated: emoji.animated,
                    frequency: 0,
                });
                getRepository(Emoji).save(newEmoji);
                return newEmoji;
            }
        });

        guild.emojis = updatedEmojis;
        try {
            await this.guildRepo.save(guild);
        } catch (err) {
            console.log(err);
        }
        return msg.channel.send("Information update successful");
    }
}

export default UpdateCommand;
