import mongoose, { Schema, mongo } from "mongoose";

const imageSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    resource_type: {
      type: String,
    },
    faceImageID: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", imageSchema);
