import { Listener } from "discord-akairo";
import { MessageReaction } from "discord.js";
import { getRepository } from "typeorm";
import { Emoji } from "../entities/Emoji";

export default class ReactionRemoveListener extends Listener {
    private emojiRepo = getRepository(Emoji);
    constructor() {
        super("reactionRm", {
            emitter: "client",
            event: "messageReactionRemove",
        });
    }

    public async exec(reaction: MessageReaction) {
        const msg = reaction.message;
        const result = reaction.emoji.identifier.match(/:\d+/g);
        const emojiId = result !== null ? result[0].slice(1) : "";

        if (msg.guild === null) return;
        const emojiManager = msg.guild.emojis;
        const emoji = emojiManager.resolve(emojiId);

        if (emoji === null) return;
        const dbEmoji = await this.emojiRepo.findOne({
            id: emoji.id,
        });

        if (dbEmoji === undefined) return;
        dbEmoji.frequency -= 1;

        try {
            await this.emojiRepo.save(dbEmoji);
        } catch (err) {
            console.log(err);
        }
    }
}
