import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Favorite } from "../models/favSection.model.js";
import { News } from "../models/news.model.js";
import { WordOfTheDay } from "../models/wordOfTheDay.js";
import { Entertainment } from "../models/entertainment.model.js";
import { Game } from "../models/games.model.js";
import { CricketNews } from "../models/cricketNews.model.js";
import { CricketMatch } from "../models/cricketMatches.model.js";

const addToFavorite = asyncHandler(async (req, res) => {
  const { category, data } = req.body;
  const userId = req.user._id;
  let Model;
  let field;
  switch (category) {
    case "news":
      Model = News;
      field = "news";
      break;
    case "wordOfTheDay":
      Model = WordOfTheDay;
      field = "wordOfTheDay";
      break;
    case "entertainment":
      Model = Entertainment;
      field = "entertainment";
      break;
    case "game":
      Model = Game;
      field = "game";
      break;
    case "cricketNews":
      Model = CricketNews;
      field = "cricketNews";
      break;
    case "cricketMatch":
      Model = CricketMatch;
      field = "cricketMatch";
      break;
    default:
      return res.status(400).json(new ApiError(400, "Invalid category"));
  }
  try {
    let item = await Model.findOne({
      // Note that in data First key should be of ID of respective Model only
      [Object.keys(data)[0]]: data[Object.keys(data)[0]],
    });

    if (!item) {
      item = await Model.create(data);
    }

    const favorite = await Favorite.findOne({ user: userId });

    if (!favorite) {
      // If the user doesn't have a favorite section yet, create one
      await Favorite.create({ user: userId, [field]: [item._id] });
    } else {
      // If the favorite already exists, add the item to the respective category field
      if (!favorite[field].includes(item._id)) {
        favorite[field].push(item._id);
        await favorite.save();
      }
    }
    const addedItem = {
      category,
      item,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, { addedItem }, "Added To Favorites"));
  } catch (error) {
    console.error("Error Adding To Favorite:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while adding to Favorite"));
  }
});

const getFavorites = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    // Without .populate
    /*
        {
          "_id": "64fa5b8bca28b45f93b",
          "user": "64fa5c123d45100128e",
          "news": ["64fa5c8ab12d3b00128e"],
        }
    */
    // With .populate
    /*
        {
          "_id": "64fa5b8bca28b45f93b",
          "user": "64fa5c123d45100128e",
          "news": [
               {
                  "_id": "64fa5c8ab12d3b00128e",
                  "title": "Breaking News Title",
                  "description": "Description of the breaking news",
                  "imageUrl": "https://example.com/news123.jpg",
                  "publishDate": "2024-10-19T10:00:00.000Z"
                }],
        }
    */

    const favorite = await Favorite.findOne({ user: userId })
      .populate("news")
      .populate("wordOfTheDay")
      .populate("entertainment")
      .populate("game")
      .populate("cricketNews")
      .populate("cricketMatch");
    if (!favorite) {
      return res
        .status(404)
        .json(new ApiError(404, "No favorites found for the user"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, { favorite }, "Favorites retrieved successfully")
      );
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Some error occurred while retrieving favorites")
      );
  }
});

const removeFavorite = asyncHandler(async (req, res) => {
  const { category, itemId } = req.body;
  const userId = req.user._id;
  let Model;
  let field;

  switch (category) {
    case "news":
      Model = News;
      field = "news";
      break;
    case "wordOfTheDay":
      Model = WordOfTheDay;
      field = "wordOfTheDay";
      break;
    case "entertainment":
      Model = Entertainment;
      field = "entertainment";
      break;
    case "game":
      Model = Game;
      field = "game";
      break;
    case "cricketNews":
      Model = CricketNews;
      field = "cricketNews";
      break;
    case "cricketMatch":
      Model = CricketMatch;
      field = "cricketMatch";
      break;
    default:
      return res.status(400).json(new ApiError(400, "Invalid category"));
  }

  try {
    const favorite = await Favorite.findOne({ user: userId });
    if (!favorite) {
      return res
        .status(404)
        .json(new ApiError(404, "No favorite section found for the user"));
    }
    const itemIndex = favorite[field].findIndex(
      (item) => item.toString() === itemId
    );

    if (itemIndex === -1) {
      // Item does not exist in the user's favorites
      return res
        .status(404)
        .json(new ApiError(404, "Item doesn't exist in favorites"));
    }

    const removedItemId = favorite[field][itemIndex];
    // console.log(field);
    // Optionally fetch complete item details if needed from another collection
    const removedItem = {
      category,
      item: await Model.findById(removedItemId),
    };

    favorite[field] = favorite[field].filter(
      (item) => item.toString() !== itemId
    );
    await favorite.save();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { removedItem },
          "Item removed from favorites successfully"
        )
      );
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Some error occurred while removing from favorites")
      );
  }
});

export { addToFavorite, getFavorites, removeFavorite };
// Get Favorite
// Add to Favorite
// Remove From Favorite
