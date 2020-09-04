import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";

class HelpCommand extends Command {
    constructor() {
        super("help", {
            aliases: ["help", "h"],
            channel: "guild",
        });
    }

    public exec(msg: Message) {
        const embed = new MessageEmbed()
            .setColor("#86F97C")
            .setTitle("Help Information")
            .setDescription("List of all commands")
            .addFields(
                { name: "`init`", value: "Starts recording emoji usage" },
                {
                    name: "`show-animated`",
                    value: "Show least used animated emojis",
                },
                {
                    name: "`show-standard`",
                    value: "Show least used standard emojis",
                },
                {
                    name: "`update`",
                    value: "Updates the emoji information on database",
                }
            );

        return msg.channel.send(embed);
    }
}

export default HelpCommand;
