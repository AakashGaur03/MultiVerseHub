import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
  PlayerInfo,
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
  const prevLocationRef = useRef(location.pathname);
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
    const basePaths = ["/cricket", "/entertainment", "/news", "/favorites"];
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
  const isMainSectionChange = (currentPath, prevPath) => {
    // Define main sections
    const mainSections = ["/news", "/entertainment", "/cricket", "/games", "/favorites"];

    // Check if current and previous paths are main sections
    const isCurrentMain = mainSections.some((section) => currentPath.startsWith(section));
    const isPrevMain = mainSections.some((section) => prevPath.startsWith(section));

    // Return true if changing between main sections
    return isCurrentMain && isPrevMain && currentPath.split("/")[1] !== prevPath.split("/")[1];
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;

    if (location.pathname.includes("/favorites")) {
      dispatch(updateSidebar("All"));
    } else if (isMainSectionChange(currentPath, prevPath)) {
      dispatch(updateSidebar("")); // Reset sidebar for other sections
    }
    // Check if navigating between main sections
    // if (isMainSectionChange(currentPath, prevPath)) {
    //   if (location.pathname.includes("/favorites")) {
    //     dispatch(updateSidebar("All"));
    //   } else {
    //     dispatch(updateSidebar(""));
    //   }
    // }

    // Update the previous path
    prevLocationRef.current = currentPath;
  }, [location.pathname, dispatch]);

  return (
    <>
      <ThemeProvider>
        {/* <Router> */}
        <NavbarComp setQuery={setQuery} />
        <OptionContainer />
        <Container fluid className="restOfComponets">
          <div className={`${sidebarItemsActive ? "d-flex" : ""}`}>
            <div className="d-lg-block d-none ">
              {sidebarItemsActive && <Sidebar items={sidebarItems} handleItemClick={handleSidebarClick} />}
            </div>

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/news" element={<News query={query} setQuery={setQuery} handleChange={handleChange} />} />
              <Route path="/favorites" element={<Favorite />} />
              <Route
                path="/cricket"
                element={<Cricket query={query} setQuery={setQuery} handleChange={handleChange} />}
              />
              <Route path="/cricket/:seriesId/pointsTable" element={<PointsTable />} />
              <Route path="/cricket/ranking" element={<Ranking />} />
              <Route path="/cricket/playerInfo/:playerId" element={<PlayerInfo />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/particulars/:category/:id" element={<Particulars />} />
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
