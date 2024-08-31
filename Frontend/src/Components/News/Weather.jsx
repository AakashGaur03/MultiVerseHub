import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./weather.css";
import { getWeatherAPIFunc } from "../../Api";
import debounce from "../../GlobalComp/debounce";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../../Features";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const stateWeatherData = useSelector((state) => state.weather.data);
  const [searchWeatherState, setSearchWeatherState] = useState(false);
  const [city, setCity] = useState("New Delhi");
  const [searchWeather, setSearchWeather] = useState("");
  const dispatch = useDispatch();
  const loaderTrue = useSelector(
    (state) => state.weather.weatherStatus === "loading"
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(loaderTrue);
  }, [loaderTrue]);

  // Debounce function for setting the city
  const debouncedSetCity = useCallback(
    debounce((newCity) => {
      setCity(newCity);
    }, 500),
    []
  );

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchWeather(newValue);
    debouncedSetCity(newValue);
  };

  useEffect(() => {
    if (stateWeatherData) {
      setWeatherData(stateWeatherData);
      // Update individual state variables
      setLocation(stateWeatherData.location || {});
      setCondition(stateWeatherData.current?.condition || {});
      setTemp_c(stateWeatherData.current?.temp_c || null);
      setFeelsLike_c(stateWeatherData.current?.feelslike_c || null);
      setGust_kph(stateWeatherData.current?.gust_kph || null);
      setHumidity(stateWeatherData.current?.humidity || null);
      setWind_dir(stateWeatherData.current?.wind_dir || null);
      setPressure_in(stateWeatherData.current?.pressure_in || null);
    }
  }, [stateWeatherData]);

  // Fetch weather data when the city changes
  useEffect(() => {
    if(city==="") setCity("New Delhi")
    const fetchWeatherData = async () => {
      setSearchWeatherState(true);
      try {
        await dispatch(getWeather(city));
      } catch (error) {
        console.error(error);
      } finally {
        setSearchWeatherState(false);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);
  // if (!weatherData && searchWeatherState) {
  //   return <div>Loading...</div>;
  // } else if (!weatherData) {
  //   return <div>Oopsie Weahter Data Not Found...</div>;
  // }

  const [location, setLocation] = useState({});
  const [condition, setCondition] = useState({});
  const [temp_c, setTemp_c] = useState(null);
  const [feelslike_c, setFeelsLike_c] = useState(null);
  const [gust_kph, setGust_kph] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind_dir, setWind_dir] = useState(null);
  const [pressure_in, setPressure_in] = useState(null);
  // const {
  //     location,
  //     current: {
  //       condition,
  //       temp_c,
  //       feelslike_c,
  //       gust_kph,
  //       humidity,
  //       wind_dir,
  //       pressure_in,
  //     },
  //   } = weatherData;

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
        <div className="d-flex relative w-4/5">
          <input
            className="form-control weatherInput"
            type="search"
            placeholder="Search Weather"
            id="searchInput"
            aria-label="Search"
            value={searchWeather}
            onChange={handleChange}
          />
        </div>
        {weatherData?.location ? (
          <Card
            className="myCard mt-3"
            style={{ maxWidth: "18rem", backgroundImage }}
          >
            <Card.Body className={getCardBodyClassName(condition.text)}>
              <div className="text-center">
                <img
                  src={condition.icon}
                  className="iconwidth card-img-top"
                  alt="..."
                />
              </div>
              <Card.Title className="text-center textrotate mt-4">
                {location?.name?.toUpperCase()}
              </Card.Title>
              <Card.Title className="text-center textrotate mt-4">
                {condition?.text?.toUpperCase()}
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
        ) : isLoading ? (
          <div className="w-full flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="flex flex-col justify-center min-h-40">
            <div>No Data for "{city}"</div>
            <div>Try something else </div>
          </div>
        )}
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
