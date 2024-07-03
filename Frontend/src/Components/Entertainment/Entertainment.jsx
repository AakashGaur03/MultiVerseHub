import React, { useEffect } from "react";
import axios from "axios";
const Entertainment = () => {
  useEffect(() => {

// TESTING API RESPONSES
    const url =
      // "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
      // "https://api.themoviedb.org/3/movie/top_rated"
      // "https://api.themoviedb.org/3/movie/786892"
      "https://api.themoviedb.org/3/movie/786892/credits"
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer (ADD TOKEN FROM ENV)",
      },
    };

    axios(url, options)
    .then((response) => console.log(response.data))
    .catch((error) => console.error("error:" + error));
  }, []);

  return <div>Entertainment</div>;
};

export default Entertainment;
