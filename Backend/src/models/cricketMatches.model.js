import mongoose, { Schema } from "mongoose";

const cricketMatchSchema = new Schema(
  {
    crikcetMatchId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    seriesId: {
      // For PointsTable
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    seriesName: {
      type: String,
    },
    matchFormat: {
      type: String,
    },
    team1SName: {
      type: String,
    },
    team1inngs1runs: {
      type: String,
    },
    team1inngs1wickets: {
      type: String,
    },
    team1inngs1overs: {
      type: String,
    },
    team1inngs2runs: {
      type: String,
    },
    team1inngs2wickets: {
      type: String,
    },
    team2SName: {
      type: String,
    },
    team2inngs1runs: {
      type: String,
    },
    team2inngs1wickets: {
      type: String,
    },
    team2inngs1overs: {
      type: String,
    },
    team2inngs2runs: {
      type: String,
    },
    team2inngs2wickets: {
      type: String,
    },
    matchStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

/*
    matchId
    matchInfo?.matchDesc
    matchInfo?.seriesName
    matchInfo?.matchFormat
    team1?.teamSName
    team1Score?.inngs1.runs
    team1Score?.inngs1.wickets
    team1Score?.inngs1.overs
    team1Score?.inngs2?.runs
    team1Score?.inngs2?.wickets
    team2?.teamSName
    team2Score?.inngs1.runs
    team2Score?.inngs1.wickets
    team2Score?.inngs1.overs
    team2Score?.inngs2?.runs
    team2Score?.inngs2?.wickets
    matchStatus
    seriesId // For PointsTable
*/

export const CricketMatch = mongoose.model("CricketMatch", cricketMatchSchema);
