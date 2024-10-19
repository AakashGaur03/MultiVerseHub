import mongoose, { Schema } from "mongoose";

const cricketNewsSchema = new Schema(
  {
    cricketNewsId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imageId: {
      type: String,
    },
    hLine: {
      type: String,
    },
    intro: {
      type: String,
    },
    source: {
      type: String,
    },
    pubTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

/*
    cricketNewsId
    imageId
    hLine
    intro
    source
    pubTime
*/

export const CricketNews = mongoose.model("CricketNews", cricketNewsSchema);
