import mongoose, { Schema } from "mongoose";

const entertainmentSchema = new Schema(
  {
    movieId: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
