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
import { ListMoviesTV } from "../..";
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
      const filterUniqueMovies = (movies) => {
        const uniqueMovieId = new Set();
        return movies.filter((movie) => {
          if (uniqueMovieId.has(movie.id)) {
            return false;
          } else {
            uniqueMovieId.add(movie.id);
            return true;
          }
        });
      };

      const uniqueNowPlaying = filterUniqueMovies(
        entertainmentData.now_playing.results
      );
      const uniquePopular = filterUniqueMovies(
        entertainmentData.popular.results
      );
      const uniqueTopRated = filterUniqueMovies(
        entertainmentData.top_rated.results
      );
      const uniqueUpcoming = filterUniqueMovies(
        entertainmentData.upcoming.results
      );
      console.log(entertainmentData, "entertainmentData");
      setMovieDataNowPlaying({
        ...entertainmentData.now_playing,
        results: uniqueNowPlaying,
      });
      setMovieDataPopular({
        ...entertainmentData.popular,
        results: uniquePopular,
      });
      setMovieDataTopRated({
        ...entertainmentData.top_rated,
        results: uniqueTopRated,
      });
      setMovieDataUpcoming({
        ...entertainmentData.upcoming,
        results: uniqueUpcoming,
      });
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
      <ListMoviesTV
        ListData={movieDataNowPlaying}
        LoadMoreOption="nowPlaying"
        Heading="Now Playing"
        LoadMoreContent={loadMoreMovies}
        InfoAboutItem={infoAboutItem}
      />
      <ListMoviesTV
        ListData={movieDataPopular}
        LoadMoreOption="popular"
        Heading="Popular"
        LoadMoreContent={loadMoreMovies}
        InfoAboutItem={infoAboutItem}
      />
      <ListMoviesTV
        ListData={movieDataTopRated}
        LoadMoreOption="topRated"
        Heading="Top Rated"
        LoadMoreContent={loadMoreMovies}
        InfoAboutItem={infoAboutItem}
      />
      <ListMoviesTV
        ListData={movieDataUpcoming}
        LoadMoreOption="upcoming"
        Heading="Upcoming"
        LoadMoreContent={loadMoreMovies}
        InfoAboutItem={infoAboutItem}
      />

      {/* <CarouselPractice /> */}
    </div>
  );
};

export default Entertainment;
