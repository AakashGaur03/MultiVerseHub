import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getEntertainmentDataMovie,
  getEntertainmentParticularsData,
  getEntertainmentTypeWiseData,
} from "../../Features";
const Entertainment = () => {
  const [movieData, setMovieData] = useState([]);
  const dispatch = useDispatch();
  const entertainmentData = useSelector(
    (state) => state.getEntertainmentData.entertainmentData
  );
  useEffect(() => {
    let payload1 = {
      category: "movie",
      page: "22",
    };
    dispatch(getEntertainmentDataMovie(payload1)).then((response) => {});
    let payload3 = {
      category: "movie",
      type: "now_playing",
    };
    dispatch(getEntertainmentTypeWiseData(payload3));
  }, [dispatch]);

  const infoAboutItem = (id, type) => {
    let payload = {
      category: type,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  };
  useEffect(() => {
    if (entertainmentData && entertainmentData.results) {
      setMovieData(entertainmentData.results);
    }
  }, [entertainmentData]);

  return (
    <div className="overflow-y-auto flex my-8 mx-4">
      <div className="flex gap-8">
        {movieData?.length > 0 ? (
          movieData.map((data, index) => (
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
              {/* <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.overview}</Card.Text>
              </Card.Body> */}
            </Card>
          ))
        ) : (
          <div>No Data to Show</div>
        )}
      </div>
    </div>
  );
};

export default Entertainment;
