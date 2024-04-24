import axios from "axios";
import React, { useEffect, useState } from "react";

const WordOfTheDay = () => {
    const [wordOfTheDayData,setWordOfTheDayData]=  useState(
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
          "X-RapidAPI-Key":
            "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
          "X-RapidAPI-Host": "words-api5.p.rapidapi.com",
        },
      };

      try {
        console.log(storedDate)
        console.log(currentDate)
        if ((!wordOfTheDayData || !wordOfTheDayData.word) && storedDate != currentDate) {
            const response = await axios.request(options);
            const wordData = response.data.data;
            console.log(wordData);
            setWordOfTheDayData(wordData);
            localStorage.setItem("wordOfTheDay", JSON.stringify(wordData));
            localStorage.setItem("wordOfTheDayDate", currentDate);

            
        }
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(()=>{
        console.log('useEffect triggered');
        handleClicl()
    },[])
//   });
  return (
    <>
      <button onClick={handleClicl}>CLICK</button>
      <div>
      <h2>Word of the Day</h2>
                    <p>Word: {wordOfTheDayData.word}</p>
                    <p>Meaning: {wordOfTheDayData.meaning}</p>
      </div>
    </>
  );
};

export default WordOfTheDay;
