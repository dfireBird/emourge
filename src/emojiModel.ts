import mongoose, { Schema, Document } from "mongoose";

export interface IEmojiFrequency {
    emojiId: String;
    emojiName: String;
    frequency: Number;
}

export interface IEmojiFrequencyDb extends Document {
    id: string;
    emojiFrequency: IEmojiFrequency;
}

const emojiFrequencySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    emojiFrequency: [
        {
            emojiId: String,
            emojiName: String,
            frequency: Number,
        },
    ],
});

export const emojiFrequencyModel = mongoose.model<IEmojiFrequencyDb>(
    "emojiFrequency",
    emojiFrequencySchema
);
