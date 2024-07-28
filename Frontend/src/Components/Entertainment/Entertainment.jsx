import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
} from "../../Features";
import { ListMoviesTV } from "../..";
import { useNavigate } from "react-router-dom";
const Entertainment = () => {
  const activeSidebarItem = useSelector(
    (state) => state.sidebar.currentSidebar
  );
  const navigate = useNavigate()
  const [movieDataNowPlaying, setMovieDataNowPlaying] = useState([]);
  const [movieDataPopular, setMovieDataPopular] = useState([]);
  const [movieDataTopRated, setMovieDataTopRated] = useState([]);
  const [movieDataUpcoming, setMovieDataUpcoming] = useState([]);
  // onTheAirPage, topRatedPage, popularPage, airingTodayPage
  const [tvDataOnTheAir, setTvDataOnTheAir] = useState([]);
  const [tvDataPopular, setTvDataPopular] = useState([]);
  const [tvDataTopRated, setTvDataTopRated] = useState([]);
  const [tvDataAiringToday, setTvDataAiringToday] = useState([]);
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
    let payload2 = {
      onTheAirPageTv: "1",
      topRatedPageTv: "1",
      popularPageTv: "1",
      airingTodayPageTv: "1",
    };
    if (activeSidebarItem == "TV") {
      dispatch(getEntertainmentDataTV(payload2));
    } else {
      dispatch(getEntertainmentDataMovie(payload1));
    }
  }, [dispatch, activeSidebarItem]);

  const infoAboutItem = (id, category) => {
    navigate(`/particulars/${category}/${id}`)
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
    }
  }, [entertainmentData]);

  useEffect(() => {
    if (entertainmentDataTV) {
      const filterUniqueTv = (tv) => {
        const uniqueTvId = new Set();
        return tv.filter((tv) => {
          if (uniqueTvId.has(tv.id)) {
            return false;
          } else {
            uniqueTvId.add(tv.id);
            return true;
          }
        });
      };
      const uniqueOnTheAir = filterUniqueTv(
        entertainmentDataTV.on_the_air.results
      );
      const uniquePopularTv = filterUniqueTv(
        entertainmentDataTV.popular.results
      );
      const uniqueTopRatedTv = filterUniqueTv(
        entertainmentDataTV.top_rated.results
      );
      const uniqueAiringToday = filterUniqueTv(
        entertainmentDataTV.airing_today.results
      );
      setTvDataOnTheAir({
        ...entertainmentDataTV.on_the_air,
        results: uniqueOnTheAir,
      });
      setTvDataPopular({
        ...entertainmentDataTV.popular,
        results: uniquePopularTv,
      });
      setTvDataTopRated({
        ...entertainmentDataTV.top_rated,
        results: uniqueTopRatedTv,
      });
      setTvDataAiringToday({
        ...entertainmentDataTV.airing_today,
        results: uniqueAiringToday,
      });
    }
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
  let onTheAirPageTv = tvDataOnTheAir.page;
  let topRatedPageTv = tvDataTopRated.page;
  let popularPageTv = tvDataPopular.page;
  let airingTodayPageTv = tvDataAiringToday.page;

  const loadMoreTv = (updatePage, TvType) => {
    console.log(updatePage,TvType);
    let payload2 = {
      onTheAirPageTv,
      topRatedPageTv,
      popularPageTv,
      airingTodayPageTv,
      oldData: entertainmentDataTV,
    };
    switch (TvType) {
      case "onTheAirTv":
        payload2.onTheAirPageTv = updatePage + 1;
        onTheAirPageTv = updatePage + 1;
        break;
      case "topRatedTv":
        payload2.topRatedPageTv = updatePage + 1;
        topRatedPageTv = updatePage + 1;
        console.log(payload2.topRatedPageTv,"payload2.topRatedPageTv")
        console.log(topRatedPageTv,"topRatedPageTv")
        break;
      case "popularTv":
        payload2.popularPageTv = updatePage + 1;
        popularPageTv = updatePage + 1;
        console.log(payload2.popularPageTv,"payload2.popularPageTv")
        console.log(popularPageTv,"popularPageTv")
        break;
      case "airingTodayTv":
        payload2.airingTodayPageTv = updatePage + 1;
        airingTodayPageTv = updatePage + 1;
        break;
      default:
        break;
    }
    dispatch(getEntertainmentDataTV(payload2));
  };

  return (
    <div className="overflow-y-auto">
      {activeSidebarItem != "TV" && (
        <>
          {" "}
          <ListMoviesTV
            ListData={movieDataNowPlaying}
            LoadMoreOption="nowPlaying"
            Heading="Now Playing"
            LoadMoreContent={loadMoreMovies}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"movie"}
          />
          <ListMoviesTV
            ListData={movieDataPopular}
            LoadMoreOption="popular"
            Heading="Popular"
            LoadMoreContent={loadMoreMovies}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"movie"}
          />
          <ListMoviesTV
            ListData={movieDataTopRated}
            LoadMoreOption="topRated"
            Heading="Top Rated"
            LoadMoreContent={loadMoreMovies}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"movie"}
          />
          <ListMoviesTV
            ListData={movieDataUpcoming}
            LoadMoreOption="upcoming"
            Heading="Upcoming"
            LoadMoreContent={loadMoreMovies}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"movie"}
          />
        </>
      )}
      {activeSidebarItem == "TV" && (
        <>
          {" "}
          <ListMoviesTV
            ListData={tvDataOnTheAir}
            LoadMoreOption="onTheAirTv"
            Heading="On The Air"
            LoadMoreContent={loadMoreTv}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"tv"}
          />
          <ListMoviesTV
            ListData={tvDataPopular}
            LoadMoreOption="popularTv"
            Heading="Popular"
            LoadMoreContent={loadMoreTv}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"tv"}
          />
          <ListMoviesTV
            ListData={tvDataTopRated}
            LoadMoreOption="topRatedTv"
            Heading="Top Rated"
            LoadMoreContent={loadMoreTv}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"tv"}
          />
          <ListMoviesTV
            ListData={tvDataAiringToday}
            LoadMoreOption="airingTodayTv"
            Heading="Airing Today"
            LoadMoreContent={loadMoreTv}
            InfoAboutItem={infoAboutItem}
            MovieOrTv={"tv"}
          />
        </>
      )}
      {/* <CarouselPractice /> */}
    </div>
  );
};

export default Entertainment;
