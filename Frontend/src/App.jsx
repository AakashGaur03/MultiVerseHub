  import "bootstrap/dist/css/bootstrap.min.css";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  } from "./index";
  import Games from "./Components/Games/Games";
import { useDispatch } from "react-redux";
import { getNews } from "./Features";
import { useState } from "react";

  function App() {
    const sidebarItems = [
      { title: "World", path: "/" },
      { title: "Business", path: "/business" },
      { title: "Sports", path: "/sports" },
      { title: "Entertainment", path: "/entertainment" },
      { title: "Education", path: "/education" },
      { title: "Technology", path: "/technology" },
    ];
    const handleSidebarClick = async (category) => {
      setQuery(category); // Update query based on sidebar item clicked
  
      // Fetch news data based on the clicked category
      const response = await dispatch(getNews(category));
      if (response) {
        setNewsData(response.data.data.responseData.results);
      }
    };
    const dispatch = useDispatch();

    const [query, setQuery] = useState("");
    const [newsData, setNewsData] = useState([]);
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
        <Router>
          <NavbarComp />
          <OptionContainer />
          <Container fluid className="restOfComponets">
            <div className="d-flex">
              <Sidebar items={sidebarItems} handleItemClick={handleSidebarClick} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/news" element={<News query={query} setQuery={setQuery} newsData={newsData} setNewsData={setNewsData} handleChange={handleChange} handleSubmitNews={handleSubmitNews} />} />
                <Route path="/favorites" element={<Favorite />} />
                <Route path="/cricket" element={<Cricket />} />
                <Route path="/entertainment" element={<Entertainment />} />
                <Route path="/games" element={<Games />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </div>
          </Container>
        </Router>
      </>
    );
  }

  export default App;
