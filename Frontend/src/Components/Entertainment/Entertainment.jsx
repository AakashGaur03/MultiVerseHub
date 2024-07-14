import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
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
      // console.log(entertainmentData, "entertainmentData");
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
  useEffect(() => {
    console.log(entertainmentDataTV);
  }, [entertainmentDataTV]);

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
      

      {/* This is infinite Carousel Explore more otherwise need to make custom */}
      <div className="container mx-auto my-8">
        <Carousel indicators={false} interval={null}>
          {movieDataUpcoming?.length > 0 ? (
            Array.from(
              { length: Math.ceil(movieDataUpcoming.length / 4) },
              (_, index) => (
                <Carousel.Item key={index}>
                  <div className="row">
                    {movieDataUpcoming
                      .slice(index * 4, index * 4 + 4)
                      .map((data) => (
                        <div className="col-md-3 " key={data.id}>
                          <div
                            className="card rounded-3xl shadow-lg text-center"
                            onClick={() => infoAboutItem(data.id, "movie")}
                          >
                            <img
                              className="rounded-3xl mx-auto mb- 4"
                              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                              alt={data.title}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </Carousel.Item>
              )
            )
          ) : (
            <div>No Data to Show</div>
          )}
        </Carousel>
      </div>

      <div className="container mx-auto my-8">
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="row">
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="First slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Second slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Third slide"
                  />
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Fourth slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Fifth slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Sixth slide"
                  />
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Entertainment;
