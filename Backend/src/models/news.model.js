import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema(
  {
    newsId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imageUrl: {
      type: String,
    },
    redirectLink: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    sourceRedirectUrl: {
      type: String,
    },
    sourceIconUrl: {
      type: String,
    },
    publishDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
/*
NewsId  article_id
imageUrl
redirectLink
title
description
sourceRedirectUrl
sourceIconUrl
publishDate
*/

export const News = mongoose.model("News", newsSchema);
