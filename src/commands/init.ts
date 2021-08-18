import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { getRepository } from "typeorm";
import { Guild } from "../entities/Guild";
import { Emoji } from "../entities/Emoji";

class InitCommand extends Command {
    private guildRepo = getRepository(Guild);
    private emojiRepo = getRepository(Emoji);
    constructor() {
        super("init", {
            aliases: ["init", "start"],
        });
    }

    public async exec(msg: Message) {
        if (!msg.guild) {
            return;
        }
        const emojis = msg.guild.emojis.cache;
        if ((await this.guildRepo.findOne(msg.guild.id)) === undefined) {
            return msg.channel.send("**Already Initialized**");
        }
        const guildEmojis: Emoji[] = [];
        for (const [_key, emoji] of emojis) {
            const newEmoji = this.emojiRepo.create({
                id: emoji.id,
                name: emoji.name ?? "",
                animated: emoji.animated ?? false,
                frequency: 0,
            });
            guildEmojis.push(newEmoji);
            await this.emojiRepo.save(newEmoji);
        }
        const guild = this.guildRepo.create({
            id: msg.guild.id,
            emojis: guildEmojis,
        });
        this.guildRepo.save(guild).then(() => {
            msg.channel.send("Successfully Initialized");
        });
    }
}

export default InitCommand;
