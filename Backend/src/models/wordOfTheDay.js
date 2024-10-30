import mongoose, { Schema } from "mongoose";

const wordOfTheDatSchema = new Schema(
  {
    wordOfTheDayId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    date: {
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
  { timestamps: true }
);
/* 
word
meaning
date
*/
export const WordOfTheDay = mongoose.model("WordOfTheDay", wordOfTheDatSchema);
