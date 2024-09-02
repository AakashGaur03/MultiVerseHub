import mongoose, { Schema } from "mongoose";

const wordOfTheDaySchema = new Schema(
  {
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
