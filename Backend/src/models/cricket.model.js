import mongoose, { Schema } from "mongoose";

const cricketMatchSchema = new Schema(
  {
    matchId: {
      type: String,
      required: true,
    },
    seriesId: {
      type: String,
      required: true,
    },
    matchDesc: {
      type: String,
      required: true,
    },
    matchFormat: {
      type: String,
      required: true,
    },
    team1ShortName: {
      type: String,
      required: true,
    },
    team2ShortName: {
      type: String,
      required: true,
    },
    team1Inn1Runs: {
      type: String,
      required: true,
    },
    team1Inn2Runs: {
      type: String,
    },
    team1Inn1Wickets: {
      type: String,
      required: true,
    },
    team1Inn2Wickets: {
      type: String,
    },
    team1Inn1Overs: {
      type: String,
      required: true,
    },
    team1Inn2Overs: {
      type: String,
    },
    team2Inn1Runs: {
      type: String,
      required: true,
    },
    team2Inn2Runs: {
      type: String,
    },
    team2Inn1Wickets: {
      type: String,
      required: true,
    },
    team2Inn2Wickets: {
      type: String,
    },
    team2Inn1Overs: {
      type: String,
      required: true,
    },
    team2Inn2Overs: {
      type: String,
    },
    matchStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const cricketNewsSchema = new Schema(
  {
    cricketNewsId: {
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
    publishTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const cricketScheme = new Schema({
  matchDetails: [cricketMatchSchema],
  cricketNews: [cricketNewsSchema],
});

export const Cricket = mongoose.model("Cricket", cricketScheme);
