import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
const Entertainment = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    // TESTING API RESPONSES
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    // "https://api.themoviedb.org/3/movie/top_rated"
    // "https://api.themoviedb.org/3/movie/786892"
    // "https://api.themoviedb.org/3/movie/786892/credits";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWMyYzBjNzEzMTY5MzYwYmQyMDA2MjA4MGQ2YTJlOSIsIm5iZiI6MTcxOTkzNzE2NC4yNjU4OSwic3ViIjoiNjY3NDVkMGI3ZjJkOGEyMjViMjUwM2IzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2T71LD0Pu5-U7JLeOUEFIYp_ukSH7e9_42Bcth5BdSE",
      },
    };

    axios(url, options)
      .then((response) => {
        console.log(response.data);
        setMovieData(response.data.results);
      })
      .catch((error) => console.error("error:" + error));
  }, []);

  return (
    <div>
      {movieData.length>0 ?  movieData.map((data, index) => (
        <Card style={{ width: "18rem",maxHeight:"20rem" }} className="overflow-x-auto" key={data.id}>
          <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              {data.overview}
            </Card.Text>
          </Card.Body>
        </Card>
      )) : <div>No Data to Show</div>}
    </div>
  );
};

export default Entertainment;
