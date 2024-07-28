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
} from "./index";
import Games from "./Components/Games/Games";
import { useDispatch } from "react-redux";
import { updateSidebar } from "./Features";
import { useEffect, useState } from "react";
import ThemeProvider from "./ThemeProvider";

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
    } else if (location.pathname.includes("/entertainment")) {
      return [
        { title: "Movies", path: "/" },
        { title: "TV", path: "/tv" },
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
    if (query && location.pathname.includes("/pointsTable")) {
      navigate("/cricket");
      setQuery("");
    }
  }, [location.pathname, navigate, query]);

  const handleSidebarClick = async (category) => {
    console.log(category);
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
        <NavbarComp />
        <OptionContainer query={query} handleChange={handleChange} />
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
              <Route path="/particulars/:category/:id" element={<Particulars />} />
              <Route path="/games" element={<Games />} />
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
