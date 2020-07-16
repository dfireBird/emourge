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
