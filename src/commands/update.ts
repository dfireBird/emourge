import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { guildModel, IEmojiFrequency } from "../models/guildModel";

class UpdateCommand extends Command {
    constructor() {
        super("update", {
            aliases: ["update"],
            channel: "guild",
        });
    }

    public async exec(msg: Message) {
        if (msg.guild === null) return;
        const emojis = msg.guild.emojis.cache;
        const guild = await guildModel.findOne({ id: msg.guild.id }).exec();
        if (guild === null) return;

        const updatedEmojis: IEmojiFrequency[] = emojis.map((emoji) => {
            const found = guild.emojiFrequency.find(
                (dbEmoji) => dbEmoji.emojiId === emoji.id
            );
            if (found) {
                return found;
            } else {
                return {
                    emojiId: emoji.id,
                    emojiName: emoji.name,
                    animated: emoji.animated,
                    frequency: 0,
                };
            }
        });

        guild.emojiFrequency = updatedEmojis;
        try {
            await guild.save();
        } catch (err) {
            console.log(err);
        }
        return msg.channel.send("Information update successful");
    }
}

export default UpdateCommand;
