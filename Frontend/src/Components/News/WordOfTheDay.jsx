import { useEffect, useState } from "react";
import { getWordOfTheDayAPIFunc } from "../../Api";
import { LikeButton } from "../..";
import { handleLikeOperation } from "../../GlobalComp/handleLikeClick";
import { addFavSection, removeFavSection } from "../../Features";

import { useDispatch, useSelector } from "react-redux";

const WordOfTheDay = () => {
  const [wordOfTheDayData, setWordOfTheDayData] = useState(JSON.parse(localStorage.getItem("wordOfTheDay")) || null);
  const dispatch = useDispatch();

  const [likedItems, setLikedItems] = useState({});
  const [favSectionDataAll, setFavSectionDataAll] = useState({});
  const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
  const favSectionGameLoader = useSelector((state) => state?.favSection?.loader);
  const [isFavLoading, setIsFavLoading] = useState(false);
  const [wordDate, setWordDate] = useState("");

  const handleLikeClick = async (itemData, category = "wordOfTheDay") => {
    // console.log(itemData);
    itemData = {
      id: wordDate,
      date: wordDate,
      word: itemData.word,
      meaning: itemData.meaning,
    };
    // console.log(itemData, "ITEMATA");
    // console.log(likedItems, "likedItemslikedItemslikedItemslikedItems");
    await handleLikeOperation({
      category,
      itemData,
      favSectionDataAll,
      setLikedItems,
      dispatch,
      addFavSection,
      removeFavSection,
    });
  };
  useEffect(() => {
    setFavSectionDataAll(favSectionData);
  }, [favSectionData]);
  useEffect(() => {
    setIsFavLoading(favSectionGameLoader);
  }, [favSectionGameLoader]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (favSectionDataAll && Object.keys(favSectionDataAll).length > 0) {
          const favoriteWOTD = favSectionDataAll?.wordOfTheDay || [];
          // Create a dictionary of liked games based on their IDs
          const likedGamesMap = favoriteWOTD.reduce((acc, wordOfTheDay) => {
            acc[wordOfTheDay.wordOfTheDayId] = true;
            return acc;
          }, {});
          setLikedItems(likedGamesMap);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [favSectionDataAll]);

  const handleClicl = async () => {
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem("wordOfTheDayDate") || null;
    setWordDate(storedDate);

    try {
      if (!wordOfTheDayData || !wordOfTheDayData.word || storedDate != currentDate) {
        const response = await getWordOfTheDayAPIFunc();
        const wordData = response;
        setWordOfTheDayData(wordData);
        localStorage.setItem("wordOfTheDay", JSON.stringify(wordData));
        localStorage.setItem("wordOfTheDayDate", currentDate);
        setWordDate(currentDate);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleClicl();
  }, []);
  return (
    <>
      <div className="text-center flex flex-col min:h-52 m-8 wordOfTheDay p-2 relative">
        {isFavLoading && (
          <div className="overlay">
            <div className="loader2"></div>
          </div>
        )}
        {/* <div className="absolute z-10 right-4 top-[-25px]">
          <LikeButton
            customId={`likeButton-wordOfTheDay`}
            isActive={!!likedItems[wordDate]}
            onClick={() => handleLikeClick(wordOfTheDayData)}
          />
        </div> */}
        <div className="mt-4">
          <h2>Word of the Day</h2>
        </div>
        <div className="mt-5">
          <p className="text-left">Word : {wordOfTheDayData?.word}</p>
          <p className="text-left pb-6">Meaning : {wordOfTheDayData?.meaning}</p>
        </div>
      </div>
    </>
  );
};

export default WordOfTheDay;
