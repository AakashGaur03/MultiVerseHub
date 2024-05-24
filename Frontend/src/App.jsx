import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  ForgotPassword,
  NavbarComp,
  Dashboard,
  Login,
  Logout,
  Registration,
  OptionContainer,
  News,
  Favorite,
  Cricket,
  Entertainment,
  Sidebar,
  PointsTable,
} from "./index";
import Games from "./Components/Games/Games";
import { useDispatch } from "react-redux";
import { getCricket, getNews } from "./Features";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const getSidebarItems = () => {
    // switch (location.pathname) {
    //   case "/news":
    //     return [
    //       { title: "World", path: "/" },
    //       { title: "Business", path: "/business" },
    //       { title: "Sports", path: "/sports" },
    //       { title: "Entertainment", path: "/entertainment" },
    //       { title: "Education", path: "/education" },
    //       { title: "Technology", path: "/technology" },
    //     ];
    //   case "/cricket":
    //     return [
    //       { title: "Matches", path: "/" },
    //       { title: "Player", path: "/Player" },
    //       { title: "recent", path: "/recent" },
    //       { title: "series", path: "/series" },
    //       { title: "rankings", path: "/rankings" },
    //       { title: "Points", path: "/Points" },
    //     ];
    //   case "/games":
    //     return [
    //       { title: "Car", path: "/" },
    //       { title: "Bike", path: "/Bike" },
    //       { title: "Brain", path: "/Brain" },
    //       { title: "Truck", path: "/Truck" },
    //     ];
    //   default:
    //     return [];
    // }
    if (location.pathname.includes("/news")) {
      return [
        { title: "World", path: "/" },
        { title: "Business", path: "/business" },
        { title: "Sports", path: "/sports" },
        { title: "Entertainment", path: "/entertainment" },
        { title: "Education", path: "/education" },
        { title: "Technology", path: "/technology" },
      ];
    } else if (location.pathname.includes("/cricket")) {
      return [
        { title: "All", path: "/" },
        { title: "International", path: "/International" },
        { title: "League", path: "/League" },
        { title: "Domestic", path: "/Domestic" },
        { title: "Women", path: "/Women" },
        { title: "Rankings", path: "/Rankings" },
      ];
    } else if (location.pathname.includes("/games")) {
      return [
        { title: "Car", path: "/" },
        { title: "Bike", path: "/Bike" },
        { title: "Brain", path: "/Brain" },
        { title: "Truck", path: "/Truck" },
      ];
    } else {
      return [];
    }
  };
  const [sidebarItems, setSidebarItems] = useState(getSidebarItems());
  const [sidebarItemsActive, setSidebarItemsActive] = useState(false);
  const [typeMatches, setTypeMatches] = useState([]);
  useEffect(() => {
    if (
      ["/cricket", "/entertainment", "/news", "/games"].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSidebarItemsActive(true);
    } else setSidebarItemsActive(false);
  }, [location.pathname]);

  useEffect(() => {
    const items = getSidebarItems();
    setSidebarItems(items);
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getCricket()).then((response) => {
      const typeMatches = response.data.responseData.typeMatches;
      setTypeMatches(typeMatches)
      console.log(response, "responseOFCRi");

      let LeaguesMatches = typeMatches.find(
        (match) => match.matchType == "League"
      );
      let InterMatches = typeMatches.find(
        (match) => match.matchType == "International"
      );
      let WomenMatches = typeMatches.find(
        (match) => match.matchType == "Women"
      );

      let IPLMatches = LeaguesMatches?.seriesMatches
        .find((matchseries) =>
          matchseries.seriesAdWrapper.seriesName.includes(
            "Indian Premier League"
          )
        )
        .seriesAdWrapper.matches?.slice(0, 3);

      let IntlMatches = InterMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let WomMatches = WomenMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      // console.log(IntlMatches, "IntlMatches");

      let newCricketData = [];

      // Adding IPL matches to newCricketData
      if (Array.isArray(IPLMatches)) {
        newCricketData.push(...IPLMatches.slice(0, 3));
      }

      // Adding International matches to newCricketData
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      WomMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });

      // Update the state once with all the data
      setCricketData(newCricketData);
    });
  }, []);
  const handleSidebarClick = async (category) => {
    setQuery(category);
    if (location.pathname.includes("/news")) {
      const response = await dispatch(getNews(category));
      if (response) {
        setNewsData(response.data.data.responseData.results);
      }
    } else if (location.pathname.includes("/cricket")) {
      // Conditioning To be Done
      console.log(category);

      let InterMatches = typeMatches.find(
        (match) => match.matchType == "International"
      );

      let IntlMatches = InterMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      console.log(IntlMatches,"IntlMatches")
      let newCricketData = [];
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches); // It slices mathces in series to 2
        }
        console.log(newCricketData)
      });
      // const response = await dispatch(getCricket(category));
      setCricketData(newCricketData)
    }
  };
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [cricketData, setCricketData] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmitNews = async (e) => {
    e.preventDefault();

    const response = await dispatch(getNews(query));
    if (response) {
      setNewsData(response.data.data.responseData.results);
    }
  };
  return (
    <>
      {/* <Router> */}
      <NavbarComp />
      <OptionContainer
        query={query}
        handleChange={handleChange}
        handleSubmitNews={handleSubmitNews}
      />
      <Container fluid className="restOfComponets">
        <div className={`${sidebarItemsActive ? "d-flex" : ""}`}>
          {sidebarItemsActive && (
            <Sidebar
              items={sidebarItems}
              handleItemClick={handleSidebarClick}
            />
          )}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/news"
              element={
                <News
                  query={query}
                  setQuery={setQuery}
                  newsData={newsData}
                  setNewsData={setNewsData}
                  handleChange={handleChange}
                  handleSubmitNews={handleSubmitNews}
                />
              }
            />
            <Route path="/favorites" element={<Favorite />} />
            <Route
              path="/cricket"
              element={
                <Cricket
                  query={query}
                  setQuery={setQuery}
                  cricketData={cricketData}
                  setCricketData={setCricketData}
                  handleChange={handleChange}
                />
              }
            />
            <Route
              path="/cricket/:seriesId/pointsTable"
              element={<PointsTable />}
            />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/games" element={<Games />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
      {/* </Router> */}
    </>
  );
}

export default App;
