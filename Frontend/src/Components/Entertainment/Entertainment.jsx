import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntertainmentDataMovie,
  getEntertainmentParticularsData,
} from "../../Features";
const Entertainment = () => {
  const [movieDataNowPlaying, setMovieDataNowPlaying] = useState([]);
  const [movieDataPopular, setMovieDataPopular] = useState([]);
  const [movieDataTopRated, setMovieDataTopRated] = useState([]);
  const [movieDataUpcoming, setMovieDataUpcoming] = useState([]);
  const dispatch = useDispatch();
  const entertainmentData = useSelector(
    (state) => state.getEntertainmentData.entertainmentData
  );
  useEffect(() => {
    let payload1 = {
      // category: "movie",
      // page: "22",
      topRatedPage: "1",
      popularPage: "1",
      nowPlayingPage: "1",
      upcomingPage: "1",
    };
    dispatch(getEntertainmentDataMovie(payload1)).then((response) => {});
  }, [dispatch]);

  const infoAboutItem = (id, type) => {
    let payload = {
      category: type,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  };
  useEffect(() => {
    if (entertainmentData) {
      console.log(entertainmentData, "entertainmentData");
      const allMovies = [
        ...entertainmentData.now_playing.results,
        ...entertainmentData.popular.results,
        ...entertainmentData.top_rated.results,
      ];
      const uniqueMovieId = new Set();
      const uniqueMovies = allMovies.filter((movie) => {
        if (uniqueMovieId.has(movie.id)) {
          return false;
        } else {
          uniqueMovieId.add(movie.id);
          return true;
        }
      });
      setMovieDataNowPlaying(entertainmentData.now_playing.results);
      setMovieDataPopular(entertainmentData.popular.results);
      setMovieDataTopRated(entertainmentData.top_rated.results);
      setMovieDataUpcoming(entertainmentData.upcoming.results);
      // console.log(movieData, "MovieData");
    }
  }, [entertainmentData]);

  return (
    <div className="overflow-y-auto">
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataNowPlaying?.length > 0 ? (
            movieDataNowPlaying.map((data, index) => (
              <Card
                style={{ width: "15rem" }}
                className="overflow-x-auto rounded-3xl"
                key={data.id}
                onClick={() => infoAboutItem(data.id, "movie")}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
              </Card>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataPopular?.length > 0 ? (
            movieDataPopular.map((data, index) => (
              <Card
                style={{ width: "15rem" }}
                className="overflow-x-auto rounded-3xl"
                key={data.id}
                onClick={() => infoAboutItem(data.id, "movie")}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
              </Card>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataTopRated?.length > 0 ? (
            movieDataTopRated.map((data, index) => (
              <Card
                style={{ width: "15rem" }}
                className="overflow-x-auto rounded-3xl"
                key={data.id}
                onClick={() => infoAboutItem(data.id, "movie")}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
              </Card>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataUpcoming?.length > 0 ? (
            movieDataUpcoming.map((data, index) => (
              <Card
                style={{ width: "15rem" }}
                className="overflow-x-auto rounded-3xl"
                key={data.id}
                onClick={() => infoAboutItem(data.id, "movie")}
              >
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
              </Card>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Entertainment;
