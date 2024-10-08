import mongoose, { Schema } from "mongoose";

const entertainmentSchema = new Schema(
  {
    entertainmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    entertainmentType: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    title: {
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

export const Entertainment = mongoose.model(
  "Entertainment",
  entertainmentSchema
);
