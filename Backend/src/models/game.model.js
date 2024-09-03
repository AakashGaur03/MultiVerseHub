import mongoose, { Schema } from "mongoose";

const gameSchema = new Schema(
  {
    gameId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model("Game", gameSchema);
