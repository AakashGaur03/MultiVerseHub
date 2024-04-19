import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./weather.css"; // Import the CSS file

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Boston");
  const [searchWeather, setSearchWeather] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const url = `https://api.weatherapi.com/v1/current.json?key=df4a82f0766e465cb20153214230410&q=${city}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        setWeatherData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault()
    setCity(searchWeather);
  };
  const handleChange = (e) => {
    setSearchWeather(e.target.value);
  };

  if (!weatherData) {
    return <div>Loading...</div>;
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

  return (
    <>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        id="searchInput"
        aria-label="Search"
        value={searchWeather}
        onChange={handleChange}
      />
      <button className="btn btn-secondary" onClick={handleSearch}>
        Search
      </button>
      <div className="d-flex justify-content-center mt-5">
        <Card className="myCard" style={{ width: "18rem", backgroundImage }}>
          <Card.Body>
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
