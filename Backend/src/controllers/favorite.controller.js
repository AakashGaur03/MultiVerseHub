import { User } from "../models/user.model.js";
import { Game } from "../models/game.model.js";
import { Entertainment } from "../models/entertainment.model.js";
import { News } from "../models/news.model.js";
import { Cricket } from "../models/cricket.model.js";
import { WordOfTheDay } from "../models/wordOfTheDay.model.js";
import { FavSection } from "../models/favSection.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addFavorites = asyncHandler(async (req, res) => {
  const { favType, itemId } = req.body;
  console.log("first")
  return "HLo"
});
const removeFavorites = asyncHandler(async (req, res) => {
  const { favType, itemId } = req.body;
  console.log("S")
});

export { addFavorites, removeFavorites };
