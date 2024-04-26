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
  //   });
  return (
    <>
      <div className="border-blue-950 text-center flex flex-col justify-evenly h-52 m-8 border-2 wordOfTheDay border-solid p-2">
        <div>
          <h2>Word of the Day</h2>
        </div>
        <div>
          <p className="text-left">Word : {wordOfTheDayData?.word}</p>
          <p className="text-left">Meaning : {wordOfTheDayData?.meaning}</p>
        </div>
      </div>
    </>
  );
};

export default WordOfTheDay;
