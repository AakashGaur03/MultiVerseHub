import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
  getEntertainmentParticularsData,
} from "../../Features";
import CarouselPractice from "../CarouselPractice";
const Entertainment = () => {
  const [movieDataNowPlaying, setMovieDataNowPlaying] = useState([]);
  const [movieDataPopular, setMovieDataPopular] = useState([]);
  const [movieDataTopRated, setMovieDataTopRated] = useState([]);
  const [movieDataUpcoming, setMovieDataUpcoming] = useState([]);
  const dispatch = useDispatch();
  const entertainmentData = useSelector(
    (state) => state.getEntertainmentData.entertainmentData
  );
  const entertainmentDataTV = useSelector(
    (state) => state.getEntertainmentData.entertainmentDataTV
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
    dispatch(getEntertainmentDataMovie(payload1));
    let payload2 = {
      onTheAirPage: "1",
      topRatedPage: "1",
      popularPage: "1",
      airingTodayPage: "1",
    };
    dispatch(getEntertainmentDataTV(payload2));
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
      setMovieDataNowPlaying(entertainmentData.now_playing);
      setMovieDataPopular(entertainmentData.popular);
      setMovieDataTopRated(entertainmentData.top_rated);
      setMovieDataUpcoming(entertainmentData.upcoming);
      // console.log(movieData, "MovieData");
    }
  }, [entertainmentData]);
  useEffect(() => {
    console.log(entertainmentDataTV);
  }, [entertainmentDataTV]);

  let topRatedPage = movieDataTopRated.page;
  let popularPage = movieDataPopular.page;
  let nowPlayingPage = movieDataNowPlaying.page;
  let upcomingPage = movieDataUpcoming.page;

  const loadMoreMovies = (updatePage, movieType) => {
    let payload1 = {
      topRatedPage,
      popularPage,
      nowPlayingPage,
      upcomingPage,
      oldData: entertainmentData,
    };

    switch (movieType) {
      case "nowPlaying":
        payload1.nowPlayingPage = updatePage + 1;
        nowPlayingPage = updatePage + 1;
        break;
      case "popular":
        payload1.popularPage = updatePage + 1;
        popularPage = updatePage + 1;
        break;
      case "topRated":
        payload1.topRatedPage = updatePage + 1;
        topRatedPage = updatePage + 1;
        break;
      case "upcoming":
        payload1.upcomingPage = updatePage + 1;
        upcomingPage = updatePage + 1;
        break;
      default:
        break;
    }
    dispatch(getEntertainmentDataMovie(payload1));
  };

  return (
    <div className="overflow-y-auto">
      {/* movieDataNowPlaying */}
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataNowPlaying?.results?.length > 0 ? (
            movieDataNowPlaying.results.map((data, index) => (
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
          {movieDataNowPlaying.page <
            Math.min(movieDataNowPlaying.total_pages, 500) && (
            <div className="w-max flex items-center">
              <Button
                variant="secondary"
                onClick={() =>
                  loadMoreMovies(movieDataNowPlaying.page, "nowPlaying")
                }
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* movieDataPopular */}
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataPopular?.results?.length > 0 ? (
            movieDataPopular.results.map((data, index) => (
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
          {movieDataPopular.page <
            Math.min(movieDataPopular.total_pages, 500) && (
            <div className="w-max flex items-center">
              <Button
                variant="secondary"
                onClick={() => loadMoreMovies(movieDataPopular.page, "popular")}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* movieDataTopRated */}
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataTopRated?.results?.length > 0 ? (
            movieDataTopRated.results.map((data, index) => (
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
          {movieDataTopRated.page <
            Math.min(movieDataTopRated.total_pages, 500) && (
            <div className="w-max flex items-center">
              <Button
                variant="secondary"
                onClick={() =>
                  loadMoreMovies(movieDataTopRated.page, "topRated")
                }
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* movieDataUpcoming */}
      <div className="overflow-y-auto flex my-8 mx-4">
        <div className="flex gap-8">
          {movieDataUpcoming?.results?.length > 0 ? (
            movieDataUpcoming.results.map((data, index) => (
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
          {movieDataUpcoming.page <
            Math.min(movieDataUpcoming.total_pages, 500) && (
            <div className="w-max flex items-center">
              <Button
                variant="secondary"
                onClick={() =>
                  loadMoreMovies(movieDataUpcoming.page, "upcoming")
                }
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* <CarouselPractice /> */}
    </div>
  );
};

export default Entertainment;
