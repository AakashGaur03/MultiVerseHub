import { User } from "../models/user.model";
import { Game } from "../models/game.model";
import { Entertainment } from "../models/entertainment.model";
import { News } from "../models/news.model";
import { Cricket } from "../models/cricket.model";
import { WordOfTheDay } from "../models/wordOfTheDay.model";
import { FavSection } from "../models/favSection.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const addFavorites = asyncHandler(async (req, res) => {
  const { favType, itemId } = req.body;
});
