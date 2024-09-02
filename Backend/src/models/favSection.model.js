import mongoose, { Schema } from "mongoose";

// Each is made Array of objects because oh multiple entries
const favSectionSchema = new Schema(
  {
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    entertainment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Entertainment",
      },
    ],
    cricket: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cricket",
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

export const FavSection = mongoose.model("FavSection", favSectionSchema);
