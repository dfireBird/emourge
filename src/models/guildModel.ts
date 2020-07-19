import mongoose, { Schema, Document } from "mongoose";

export interface IEmojiFrequency {
    emojiId: String;
    emojiName: String;
    frequency: Number;
}

export interface IGuild extends Document {
    id: string;
    emojiFrequency: IEmojiFrequency;
}

const guildSchema = new Schema({
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

export const guildModel = mongoose.model<IGuild>("guild", guildSchema);
