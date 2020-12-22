import { Message } from "discord.js";
import { Collection } from "mongoose";

/*
 * Extract the emoji's out of message string.
 * 'Emoji are of format <:[emoji_name]:[emoji_id]>'
 *
 * @param message - message string
 * @returns Array of emoji in the message string
 */
export function extractEmoji(message: string): Array<string> {
    const result = message.match(/<a?:.+?\d+>/g);
    if (result !== null) {
        return result;
    } else {
        return [];
    }
}

// Extract the reaction from the message => ReactionManager
// Get the MessageReaction from the Reaction Manager
// Iterate and count same reactions.
// 
// Return an object with those reactions.
// *If need be, change emoji.toString() to emoji.toId() to access the ID of the emojis.*

export function extractReaction(message: Message) {
    const reactionsManager = message.reactions;

    let objreactions: any = {};

    for (let reaction_constructor of reactionsManager.cache) {
        let ObjReactionMessage = reaction_constructor[1];
        let emoji = ObjReactionMessage.emoji.id;

        if(emoji! in objreactions) {
            objreactions[emoji!] = objreactions[emoji!] + 1;
        } else {
            objreactions[emoji!] = 1;
        }
    }

    return objreactions;
}
