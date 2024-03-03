import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Navbar/NavbarComp";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { Container } from "react-bootstrap";
import {Login, Registration} from "./index"
function App() {
  return (
    <>
    <Router>
      <NavbarComp />
      
      <Container>
        <Routes>
          <Route path="/register"
          element={
            <Registration />
          }
          />
          <Route 
          path="/login"
          element={
            <Login/>
          }
          />
          
        </Routes>
      </Container>
    </Router>
    </>
  );
}

export default App;
