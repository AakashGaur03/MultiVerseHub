import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    thumbnail: {
      type: String,
    },
    title: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
  },
  { timestamps: true }
);

/*
    gameId
    thumbnail
    title
    releaseDate
*/

export const Game = mongoose.model("Game", gameSchema);
