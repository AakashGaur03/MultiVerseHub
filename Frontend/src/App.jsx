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
} from "./index";

function App() {
  return (
    <>
      <Router>
        <NavbarComp />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
