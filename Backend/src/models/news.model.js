import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    redirectLink: {
      type: String,
      required: true,
    },
    hLine: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const News = mongoose.model("News", newsSchema);
