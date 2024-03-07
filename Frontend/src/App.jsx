import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Navbar/NavbarComp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Login, Logout, Registration } from "./index";
import Dashboard from "./Dashboard";

// import axios from "axios";
// import { useState } from "react";

function App() {
  // const [accessToken,setAccessToken] = useState(localStorage.getItem("accessToken"))
  //  const hanlde = async() =>  {
  //   console.log(accessToken)
  //     const response = await axios.get(
  //       "http://localhost:8000/api/v1/users/current-user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );

  //     console.log(response);

  //   }

  return (
    <>
      <Router>
        <NavbarComp />
        {/* <button onClick={hanlde}>Hello</button> */}
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
