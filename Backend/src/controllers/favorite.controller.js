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
import { Counter } from "../models/counter.model.js";

const addFavorites = asyncHandler(async (req, res) => {
  const {
    favType,
    itemId,
    name,
    imageUrl,
    releaseDate,
    entertainmentType,
    rating,
    title,
    redirectLink,
    hLine,
    description,
    source,
    sourceImg,
    sourceRedirectLink,
    publishDate,
    word,
    meaning,
    matchId,
    seriesId,
    matchDesc,
    matchFormat,
    team1ShortName,
    team2ShortName,
    team1Inn1Runs,
    team1Inn2Runs,
    team1Inn1Wickets,
    team1Inn2Wickets,
    team1Inn1Overs,
    team1Inn2Overs,
    team2Inn1Runs,
    team2Inn2Runs,
    team2Inn1Wickets,
    team2Inn2Wickets,
    team2Inn1Overs,
    team2Inn2Overs,
    matchStatus,
    publishTime,
    cricketNewsId,
  } = req.body;
  try {
    // const itemId = "475";
    // const favType = "games";
    // const gameId = "475";
    // const imageUrl = "https://www.freetogame.com/g/475/thumbnail.jpg";
    // const name = "Genshin Impact";
    // const releaseDate = "28 September 2020";
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
    } else if (favType === "entertainment") {
      item = await Entertainment.findOne({ entertainmentId: itemId });
      if (!item) {
        item = new Entertainment({
          entertainmentId: itemId,
          entertainmentType,
          imageUrl,
          rating,
          title,
          releaseDate,
        });
        await item.save();
      }
    } else if (favType === "news") {
      const counter = await Counter.findOneAndUpdate(
        { name: "favSectionNewsId" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      item = await News.findOne({ newsId: counter.value });
      if (!item) {
        item = new News({
          newsId: counter.value,
          imageUrl,
          redirectLink,
          hLine,
          description,
          sourceImg,
          sourceRedirectLink,
          publishDate,
        });
        await item.save();
      }
    } else if (favType === "wordOfTheDay") {
      const counter = await Counter.findOneAndUpdate(
        { name: "wordOfTheDayId" },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );
      item = await WordOfTheDay.findOne({ wordOfTheDayId: counter.value });
      if (!item) {
        item = new WordOfTheDay({
          wordOfTheDayId: counter.value,
          word,
          meaning,
        });
        await item.save();
      }
    } else if (favType === "cricket") {
      if (matchId) {
        item = await Cricket.findOne({ "matchDetails.matchId": itemId });
        if (!item) {
          item = new Cricket({
            matchDetails: [
              {
                matchId,
                seriesId,
                matchDesc,
                matchFormat,
                team1ShortName,
                team2ShortName,
                team1Inn1Runs,
                team1Inn2Runs,
                team1Inn1Wickets,
                team1Inn2Wickets,
                team1Inn1Overs,
                team1Inn2Overs,
                team2Inn1Runs,
                team2Inn2Runs,
                team2Inn1Wickets,
                team2Inn2Wickets,
                team2Inn1Overs,
                team2Inn2Overs,
                matchStatus,
              },
            ],
          });
          await item.save();
        }
      } else if (cricketNewsId) {
        item = await Cricket.findOne({ "cricketNews.cricketNewsId": itemId });
        if (!item) {
          item = new Cricket({
            cricketNews: [
              {
                cricketNewsId: itemId,
                imageUrl,
                redirectLink,
                hLine,
                description,
                source,
                publishTime,
              },
            ],
          });
          await item.save();
        }
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
