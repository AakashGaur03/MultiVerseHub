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

function App() {
  return (
    <>
      <Router>
        <NavbarComp />
        <OptionContainer />
        <Container fluid className="restOfComponets">
          {/* <div className="d-flex">
            <Sidebar />
            <Routes>
              <Route path="/news" element={<News />} />
              <Route path="/favorites" element={<Favorite />} />
              <Route path="/cricket" element={<Cricket />} />
              <Route path="/entertainment" element={<Entertainment />} />
              <Route path="/games" element={<Games />} />
            </Routes>
          </div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes> */}
          <div className="d-flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/news" element={<News />} />
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
