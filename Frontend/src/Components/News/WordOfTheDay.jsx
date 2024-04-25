import axios from "axios";
import React, { useEffect, useState } from "react";

const WordOfTheDay = () => {
  const [wordOfTheDayData, setWordOfTheDayData] = useState(
    JSON.parse(localStorage.getItem("wordOfTheDay")) || null
  );
  //   useEffect(() => {
  const handleClicl = async () => {
    const currentDate = new Date().toDateString();
    const storedDate = localStorage.getItem("wordOfTheDayDate") || null;

    const options = {
      method: "GET",
      url: "https://words-api5.p.rapidapi.com/api/v1/dict/word-today",
      headers: {
        "X-RapidAPI-Key": "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
        "X-RapidAPI-Host": "words-api5.p.rapidapi.com",
      },
    };

    try {
      if (
        !wordOfTheDayData ||
        !wordOfTheDayData.word ||
        storedDate != currentDate
      ) {
        const response = await axios.request(options);
        const wordData = response.data.data;
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
          <p className="text-left">Word : {wordOfTheDayData.word}</p>
          <p className="text-left">Meaning : {wordOfTheDayData.meaning}</p>
        </div>
      </div>
    </>
  );
};

export default WordOfTheDay;
