import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { guildModel } from "../models/guildModel";

class ShowMostCommand extends Command {
    constructor() {
        super("most", {
            aliases: ["most", "m", "show-most"],
            channel: "guild",
        });
    }

    public exec(msg: Message) {
        const prefix = process.env.PREFIX;
        if (msg.guild === null) return;

        const embed = new MessageEmbed()
            .setColor("#86F97C")
            .setTitle("Most used emojis");

        const emojiManager = msg.guild.emojis;
        guildModel
            .aggregate([
                {
                    $match: { id: msg.guild.id },
                },
                { $unwind: "$emojiFrequency" },
                { $sort: { "emojiFrequency.frequency": -1 } },
                {
                    $group: {
                        _id: "$_id",
                        id: { $first: "$id" },
                        emojiFrequency: { $push: "$emojiFrequency" },
                    },
                },
                {
                    $project: {
                        emojiFrequency: {
                            $slice: ["$emojiFrequency", 0, 10],
                        },
                    },
                },
                { $limit: 1 },
            ])
            .then((result) => {
                if (result[0] === null) {
                    msg.channel.send(
                        `Your server is not initialized. Use \`${prefix}init\` to start recording.`
                    );
                    return;
                }

                const emojis = result[0].emojiFrequency;
                for (const e of emojis) {
                    const emoji = emojiManager.resolve(e.emojiId);
                    embed.addField(
                        `${e.emojiName}:  ${emoji}`,
                        `${e.frequency}`
                    );
                }

                msg.channel.send(embed);
            });
    }
}

export default ShowMostCommand;
