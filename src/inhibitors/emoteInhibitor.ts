import { Inhibitor } from "discord-akairo";
import { Message, Permissions } from "discord.js";

class EmoteInhibitor extends Inhibitor {
    constructor() {
        super("emote", {
            priority: 1,
            reason: "Not have permission needed to run the command",
        });
    }

    public exec(message: Message) {
        const author = message.member;
        if (author === null) {
            return false;
        }

        return !author.permissions.has([
            Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS,
        ]);
    }
}

export default EmoteInhibitor;
