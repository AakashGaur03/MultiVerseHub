import axios from "axios";
import React, { useEffect } from "react";

const WordOfTheDay = () => {
//   useEffect(() => {
    const handleClicl = async () => {
      const options = {
        method: "GET",
        // url: "https://wordsapiv1.p.rapidapi.com/words/hatchback/typeOf",
        url: "https://words-api5.p.rapidapi.com/api/v1/dict/word-today",
        headers: {
          "X-RapidAPI-Key":
            "bb3721361emshddcfed580ee75dap16315bjsn1b92129b04d2",
          "X-RapidAPI-Host": "words-api5.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
//   });
  return (
    <>
      <button onClick={handleClicl}>CLICK</button>
    </>
  );
};

export default WordOfTheDay;
