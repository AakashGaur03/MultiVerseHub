import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./weather.css";
import { getWeatherAPIFunc } from "../../Api";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchWeatherState, setSearchWeatherState] = useState(false);
  const [city, setCity] = useState("New Delhi");
  const [searchWeather, setSearchWeather] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      setSearchWeatherState(true);
      try {
        const response = await getWeatherAPIFunc(city);
        if (response) {
          setWeatherData(response);
          setSearchWeatherState(false);
        }
      } catch (error) {
      } finally {
        setSearchWeatherState(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchWeather);
  };
  const handleChange = (e) => {
    setSearchWeather(e.target.value);
  };

  if (!weatherData && searchWeatherState) {
    return <div>Loading...</div>;
  } else if (!weatherData) {
    return <div>Oopsie Weahter Data Not Found...</div>;
  }

  const {
    location,
    current: {
      condition,
      temp_c,
      feelslike_c,
      gust_kph,
      humidity,
      wind_dir,
      pressure_in,
    },
  } = weatherData;

  const backgroundImage = getBackgroundImage(condition.text);
  const getCardBodyClassName = (conditionText) => {
    const darkBackgroundConditions = [
      "Icepellets",
      "Partlycloudy",
      "Blizzard",
      "Freezingdrizzle",
      "Snow",
    ];
    return darkBackgroundConditions.includes(conditionText)
      ? "text-black"
      : "text-white";
  };

  return (
    <>
      <div className="d-flex justify-content-center flex-col align-items-center mt-5">
        <div className="d-flex relative w-full">
          <input
            className="form-control weatherInput"
            type="search"
            placeholder="Search"
            id="searchInput"
            aria-label="Search"
            value={searchWeather}
            onChange={handleChange}
          />
          <button className="btn absolute right-8 top-1" onClick={handleSearch}>
            {/* BLACK */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="15"
              height="15"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg> */}

            {/* WHITE */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512 "
              width="15"
              height="15"
            >
              <path
                fill="#ffffff"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
          </button>
        </div>
        <Card className="myCard" style={{ maxWidth: "18rem", backgroundImage }}>
          <Card.Body className={getCardBodyClassName(condition.text)}>
            <div className="text-center">
              <img
                src={condition.icon}
                className="iconwidth card-img-top"
                alt="..."
              />
            </div>
            <Card.Title className="text-center textrotate mt-4">
              {location.name.toUpperCase()}
            </Card.Title>
            <Card.Title className="text-center textrotate mt-4">
              {condition.text.toUpperCase()}
            </Card.Title>
            <Row className="mt-4 frontSide">
              <Col md={6}>
                <div
                  className="text-center"
                  id="cityTemp"
                >{`CURRENT TEMP : ${temp_c}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center"
                  id="cityFeelsLike"
                >{`FEELS LIKE : ${feelslike_c}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center mt-4"
                  id="cityWindSpeed"
                >{`WIND SPEED : ${gust_kph}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center mt-4"
                  id="cityHumidity"
                >{`HUMIDITY : ${humidity}`}</div>
              </Col>
            </Row>
            <Row className="mt-4 backSide">
              <Col md={6}>
                <div
                  className="text-center textrotate"
                  id="cityWindDirection"
                >{`WIND DIRECTION : ${wind_dir}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center textrotate"
                  id="cityAtmosphericPressure"
                >{`AIR PRESSURE : ${pressure_in}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center textrotate mt-4"
                  id="cityLatitude"
                >{`LATITUDE : ${location.lat}`}</div>
              </Col>
              <Col md={6}>
                <div
                  className="text-center textrotate mt-4"
                  id="cityLongitude"
                >{`LONGITUDE : ${location.lon}`}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const getBackgroundImage = (conditionText) => {
  const images = {
    Sunny: "url('Images/Sunny.jpg')",
    Clear: "url('Images/Clear.jpg')",
    Partlycloudy: "url('Images/Partlycloudy.jpg')",
    Overcast: "url('Images/Overcast.avif')",
    Mist: "url('Images/Mist.jpg')",
    Rain: "url('Images/rain.jpg')",
    Snow: "url('Images/snow.jpg')",
    Icepellets: "url('Images/Icepellets.avif')",
    Freezingdrizzle: "url('Images/freezingdrizzle.jpg')",
    Blizzard: "url('Images/Blizzard.jpg')",
    Thundery: "url('Images/thundery.jpg')",
    Rainwiththnder: "url('Images/rainwiththnder.jpg')",
    Snowwiththunder: "url('Images/snowwiththunder.jpg')",
  };

  return images[conditionText] || "url('Images/Clear.jpg')";
};

export default Weather;
