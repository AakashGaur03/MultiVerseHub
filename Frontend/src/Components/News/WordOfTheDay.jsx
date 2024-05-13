import axios from "axios";
import React, { useEffect, useState } from "react";
import { getWordOfTheDayAPIFunc } from "../../Api";

const WordOfTheDay = () => {
  const [wordOfTheDayData, setWordOfTheDayData] = useState(
    JSON.parse(localStorage.getItem("wordOfTheDay")) || null
  );
  const handleClicl = async () => {
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem("wordOfTheDayDate") || null;
    try {
      if (
        !wordOfTheDayData ||
        !wordOfTheDayData.word ||
        storedDate != currentDate
      ) {
        const response = await getWordOfTheDayAPIFunc();
        const wordData = response;
        setWordOfTheDayData(wordData);
        localStorage.setItem("wordOfTheDay", JSON.stringify(wordData));
        localStorage.setItem("wordOfTheDayDate", currentDate);
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
      <div className="text-center flex flex-col min:h-52 m-8 wordOfTheDay p-2">
        <div className="mt-4">
          <h2>Word of the Day</h2>
        </div>
        <div className="mt-5">
          <p className="text-left">Word : {wordOfTheDayData?.word}</p>
          <p className="text-left pb-6">
            Meaning : {wordOfTheDayData?.meaning}
          </p>
        </div>
      </div>
    </>
  );
};

export default WordOfTheDay;
