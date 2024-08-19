import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
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
  Particulars,
  ParticularGame,
} from "./index";
import Games from "./Components/Games/Games";
import { useDispatch } from "react-redux";
import { updateSidebar } from "./Features";
import { useEffect, useRef, useState } from "react";
import ThemeProvider from "./ThemeProvider";
import { getSidebarItems } from "./GlobalComp/sidebarItem";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const [sidebarItems, setSidebarItems] = useState(getSidebarItems());
  const [sidebarItemsActive, setSidebarItemsActive] = useState(false);
  // useEffect(() => {
  //   if (
  //     // ["/cricket", "/entertainment", "/news", "/games"].some((path) =>
  //     ["/cricket", "/entertainment", "/news"].some((path) =>
  //       location.pathname.includes(path)
  //     )
  //   ) {
  //     if (location.pathname === "/cricket/playerInfo/:id") {
  //       setSidebarItemsActive(false);
  //     }
  //     setSidebarItemsActive(true);
  //   } else setSidebarItemsActive(false);
  // }, [location.pathname]);
  useEffect(() => {
    const path = location.pathname;
    const basePaths = ["/cricket", "/entertainment", "/news"];
    const isBasePath = basePaths.some((basePath) => path.startsWith(basePath));
    const isExcluded = path.includes("/playerInfo");

    setSidebarItemsActive(isBasePath && !isExcluded);
  }, [location.pathname]);

  const hasIncludedRanking = useRef(false);

  useEffect(() => {
    if (location.pathname.includes("ranking")) {
      hasIncludedRanking.current = true;
    }

    if (hasIncludedRanking.current) {
      dispatch(updateSidebar(""));
      hasIncludedRanking.current = false;
    }
  }, [location.pathname]);

  useEffect(() => {
    const items = getSidebarItems();
    setSidebarItems(items);
  }, [location.pathname]);

  useEffect(() => {
    if (query && location.pathname.includes("/pointsTable")) {
      navigate("/cricket");
      setQuery("");
    }
  }, [location.pathname, navigate, query]);

  const handleSidebarClick = async (category) => {
    dispatch(updateSidebar(category));
    setQuery(category);
    if (location.pathname.includes("/cricket")) {
      navigate("/cricket");
    }
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <ThemeProvider>
        {/* <Router> */}
        <NavbarComp setQuery={setQuery} />
        <OptionContainer />
        <Container fluid className="restOfComponets">
          <div className={`${sidebarItemsActive ? "d-flex" : ""}`}>
            <div className="d-lg-block d-none ">
              {sidebarItemsActive && (
                <Sidebar
                  items={sidebarItems}
                  handleItemClick={handleSidebarClick}
                />
              )}
            </div>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/news"
                element={
                  <News
                    query={query}
                    setQuery={setQuery}
                    handleChange={handleChange}
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
              <Route
                path="/particulars/:category/:id"
                element={<Particulars />}
              />
              <Route path="/games" element={<Games />} />
              <Route path="/game/:id" element={<ParticularGame />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Container>
        {/* </Router> */}
      </ThemeProvider>
    </>
  );
}

export default App;
