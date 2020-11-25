import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";

class ShowMostCommand extends Command {
    private emojiRepo = getRepository(Emoji);
    constructor() {
        super("most", {
            aliases: ["most", "m", "show-most"],
            channel: "guild",
        });
    }

    public async exec(msg: Message) {
        if (msg.guild === null) return;

        const embed = new MessageEmbed()
            .setColor("#86F97C")
            .setTitle("Most used emojis");

        const emojiManager = msg.guild.emojis;
        const emojis = await this.emojiRepo.find({
            where: {
                guildId: msg.guild.id,
            },
            order: {
                frequency: "DESC",
            },
            take: 10,
        });
        for (const e of emojis) {
            const emoji = emojiManager.resolve(e.id);
            embed.addField(`${e.name}:  ${emoji}`, `${e.frequency}`);
        }

        msg.channel.send(embed);
    }
}

export default ShowMostCommand;
