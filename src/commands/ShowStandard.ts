import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { guildModel } from "../models/guildModel";

class ShowStandardCommand extends Command {
    constructor() {
        super("show-standard", {
            aliases: [
                "show-standard",
                "showStandard",
                "standard",
                "showS",
                "show-s",
            ],
            channel: "guild",
        });
    }

    public exec(msg: Message) {
        if (msg.guild === null) return;

        const embed = new MessageEmbed()
            .setColor("#86F97C")
            .setTitle("Least used emojis");

        const emojiManager = msg.guild.emojis;
        guildModel
            .findOne({ id: msg.guild.id })
            .exec()
            .then((result) => {
                if (result === null) return;
                const emojis = result.emojiFrequency.sort(
                    (a, b) => a.frequency - b.frequency
                );

                let i = 0;
                for (const e of emojis) {
                    if (i > 10) break;
                    const emoji = emojiManager.resolve(e.emojiId);
                    if (emoji?.animated === false) {
                        embed.addField(
                            `${e.emojiName}:  ${emoji}`,
                            `${e.frequency}`
                        );

                        i++;
                    }
                }

                msg.channel.send(embed);
            });
    }
}

export default ShowStandardCommand;
