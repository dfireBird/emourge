import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";
import { Guild } from "../entities/Guild";

class ShowAnimatedCommand extends Command {
    private emojiRepo = getRepository(Emoji);
    private guildRepo = getRepository(Guild);
    constructor() {
        super("show-animated", {
            aliases: [
                "show-animated",
                "showAnimated",
                "animated",
                "showA",
                "show-a",
            ],
            channel: "guild",
        });
    }

    public async exec(msg: Message) {
        if (msg.guild === null) return;

        const embed = new MessageEmbed()
            .setColor("#86F97C")
            .setTitle("Least used emojis");

        const emojiManager = msg.guild.emojis;
        const emojis = await this.emojiRepo.find({
            where: {
                guild: await this.guildRepo.findOne({
                    id: msg.guild.id,
                }),
                animated: true,
            },
            order: {
                frequency: "ASC",
            },
            take: 10,
        });

        for (const e of emojis) {
            const emoji = emojiManager.resolve(e.id);
            embed.addField(`${e.name}:  ${emoji}`, `${e.frequency}`);
        }

        msg.channel.send({ embeds: [embed] });
    }
}

export default ShowAnimatedCommand;
