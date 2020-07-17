import mongoose, { Schema, Document } from "mongoose";

export interface IEmojiFrequency extends Document { }

const emojiFrequencySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        required: true,
    },
    emojiFrequency: [
        {
            emojiId: Number,
            emojiName: String,
            frequency: Number,
        },
    ],
});

export const emojiFrequencyModel = mongoose.model<IEmojiFrequency>(
    "emojiFrequency",
    emojiFrequencySchema
);
