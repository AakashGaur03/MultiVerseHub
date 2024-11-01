import mongoose, { Schema } from "mongoose";

const entertainmentSchema = new Schema(
  {
    entertainmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    entertainmentType: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
    },
    voteAverage: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    firstAirDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

/*
    movieId
    entertainmentType
    posterUrl
    voteAverage
    releaseDate
    firstAirDate    
*/

export const Entertainment = mongoose.model(
  "Entertainment",
  entertainmentSchema
);
