import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
} from "./index";
import Games from "./Components/Games/Games";

function App() {
  return (
    <>
      <Router>
        <NavbarComp />
        <OptionContainer />
        <Container className="restOfComponets">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/news" element={<News />} />
            <Route path="/favorites" element={<Favorite />} />
            <Route path="/cricket" element={<Cricket />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
