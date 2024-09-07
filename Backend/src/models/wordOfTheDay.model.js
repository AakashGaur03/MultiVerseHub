import mongoose, { Schema } from "mongoose";

const wordOfTheDaySchema = new Schema(
  {
    wordOfTheDayId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    word: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WordOfTheDay = mongoose.model("WordOfTheDay", wordOfTheDaySchema);
