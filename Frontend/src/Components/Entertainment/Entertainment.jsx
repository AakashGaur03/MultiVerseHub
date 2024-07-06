import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getEntertainmentData, getEntertainmentDataParticulars } from "../../Features";
const Entertainment = () => {
  const [movieData, setMovieData] = useState([]);
  const dispatch = useDispatch();
  const entertainmentData = useSelector(
    (state) => state.getEntertainmentData.entertainmentData
  );
  useEffect(() => {
    dispatch(getEntertainmentData()).then((response) => {});
    let payload = {
      category: "movie",
      id: 786892,
      particular: "credits",
    };
    dispatch(getEntertainmentDataParticulars(payload));
  }, [dispatch]);
  useEffect(() => {
    if (entertainmentData && entertainmentData.results) {
      setMovieData(entertainmentData.results);
    }
  }, [entertainmentData]);

  return (
    <div>
      {movieData?.length > 0 ? (
        movieData.map((data, index) => (
          <Card
            style={{ width: "18rem", maxHeight: "20rem" }}
            className="overflow-x-auto"
            key={data.id}
          >
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            />
            <Card.Body>
              <Card.Title>{data.title}</Card.Title>
              <Card.Text>{data.overview}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>No Data to Show</div>
      )}
    </div>
  );
};

export default Entertainment;
