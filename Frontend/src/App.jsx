import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
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
  Ranking,
} from "./index";
import Games from "./Components/Games/Games";
import { useDispatch } from "react-redux";
import { getCricket, getCricketRanking, getNews } from "./Features";
import { useEffect, useState } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const getSidebarItems = () => {
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
  const [rankingData, setRankingData] = useState([]);
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
      setTypeMatches(typeMatches);
      // console.log(response, "responseOFCRi");

      // let LeaguesMatches = typeMatches.find(
      //   (match) => match.matchType == "League"
      // );
      let InterMatches = typeMatches.find(
        (match) => match.matchType == "International"
      );
      let WomenMatches = typeMatches.find(
        (match) => match.matchType == "Women"
      );
      let LeagueMatches = typeMatches.find(
        (match) => match.matchType == "League"
      );

      // let IPLMatches = LeaguesMatches?.seriesMatches
      //   .find((matchseries) =>
      //     matchseries.seriesAdWrapper.seriesName.includes(
      //       "Indian Premier League"
      //     )
      //   )
      //   .seriesAdWrapper.matches?.slice(0, 3);

      let IntlMatches = InterMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let LegMatches = LeagueMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let WomMatches = WomenMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      // console.log(IntlMatches, "IntlMatches");

      let newCricketData2 = [];

      // Adding IPL matches to newCricketData2
      // if (Array.isArray(IPLMatches)) {
      //   newCricketData2.push(...IPLMatches.slice(0, 3));
      // }

      // Adding International matches to newCricketData2
      LegMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      WomMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData2.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });

      // Update the state once with all the data
      setCricketData(newCricketData2);
      setNewCricketData(newCricketData2);
    });
  }, []);
  useEffect(() => {
    if (query && location.pathname.includes("/pointsTable")) {
      navigate("/cricket");
      setQuery("");
    }
  }, [location.pathname, navigate, query]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (
  //       location.pathname.includes("/ranking") &&
  //       rankingData.length <= 0
  //     ) {
  //       const response = await dispatch(
  //         getCricketRanking("odi", "", "allrounders")
  //       );
  //       setRankingData(response);
  //       navigate("cricket/ranking", {
  //         state: { rankingsData: response },
  //       });
  //     } else {
  //       navigate("cricket/ranking", {
  //         state: { rankingsData: rankingData },
  //       });
  //     }
  //   };

  //   fetchData();
  // }, [location.pathname, rankingData]);
  const handleSidebarClick = async (category) => {
    setQuery(category);
    navigate("/cricket");
    if (location.pathname.includes("/news")) {
      const response = await dispatch(getNews(category));
      if (response) {
        setNewsData(response.data.data.responseData.results);
        // setQuery("")
      }
    } else if (location.pathname.includes("/cricket")) {
      // console.log("Current pathname:", location.pathname);
      // Conditioning To be Done
      // navigate('/cricket');
      // window.location.href="/cricket"
      // console.log(category);

      if (category === "All") {
        setCricketData(newCricketData);
      } else if (category === "Rankings") {
        if (rankingData.length <= 0) {
          // const response = await dispatch(getCricketRanking("test", "","batsmen"));
          const response = await dispatch(
            getCricketRanking("odi", "", "allrounders")
          );
          setRankingData(response);
          navigate(`cricket/ranking`, {
            state: { rankingsData: response },
          });
        } else {
          navigate(`cricket/ranking`, {
            state: { rankingsData: rankingData },
          });
        }
      } else {
        let InterMatches = typeMatches.find(
          (match) => match.matchType == category
        );

        let IntlMatches = InterMatches.seriesMatches
          .filter((match) => match.seriesAdWrapper)
          .slice(0, 2); // It slices number of series to 2

        // console.log(IntlMatches, "IntlMatches");
        let FilteredCricketData = [];
        IntlMatches.forEach((match) => {
          if (Array.isArray(match.seriesAdWrapper.matches)) {
            FilteredCricketData.push(...match.seriesAdWrapper.matches); // It slices mathces in series to 2
          }
          console.log(FilteredCricketData);
        });
        // const response = await dispatch(getCricket(category));
        setCricketData(FilteredCricketData);
        console.log("routing");
        // navigate('/cricket');
        console.log("routed");
        // setQuery("")
      }
    }
  };
  const dispatch = useDispatch();

  const [newsData, setNewsData] = useState([]);
  const [cricketData, setCricketData] = useState([]);
  const [newCricketData, setNewCricketData] = useState([]);

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
            <Route path="/cricket/ranking" element={<Ranking />} />
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
