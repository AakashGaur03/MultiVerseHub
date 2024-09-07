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
  // const { favType, itemId } = req.body;
  try {
    const itemId = "475";
    const favType = "games";
    const gameId = "475";
    const imageUrl = "https://www.freetogame.com/g/475/thumbnail.jpg";
    const name = "Genshin Impact";
    const releaseDate = "28 September 2020";
    const userId = req.user._id;
    let user = await User.findById(userId).populate("favSection");
    let favSection = user.favSection;

    if (!favSection) {
      favSection = new FavSection();
      user.favSection = favSection._id;
      await user.save();
    }
    let item;
    if (favType === "games") {
      item = await Game.findOne({ gameId: itemId });
      if (!item) {
        item = new Game({ gameId: itemId, name, imageUrl, releaseDate });
        await item.save();
      }
    }
    if (favSection[favType].includes(item._id)) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, favSection, "Item already exists in Fav Section")
        );
    }
    favSection[favType].push(item._id);
    await favSection.save();
    return res
      .status(200)
      .json(new ApiResponse(200, favSection, "Item saved in Fav Section"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Some Error occurred while saving Item in Fav Section"
        )
      );
  }
  console.log(req.user);
  console.log("Distincr");
  console.log(user);
});
const removeFavorites = asyncHandler(async (req, res) => {
  const { favType, itemId } = req.body;
  console.log("S");
});

export { addFavorites, removeFavorites };
