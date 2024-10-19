import mongoose, { Schema } from "mongoose";

const favoriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    news: [
      {
        type: Schema.Types.ObjectId,
        ref: "News",
      },
    ],
    wordOfTheDay: [
      {
        type: Schema.Types.ObjectId,
        ref: "WordOfTheDay",
      },
    ],
    entertainment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entertainment",
      },
    ],
    game: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    cricketNews: [
      {
        type: Schema.Types.ObjectId,
        ref: "CricketNews",
      },
    ],
    cricketMatch: [
      {
        type: Schema.Types.ObjectId,
        ref: "CricketMatch",
      },
    ],
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
