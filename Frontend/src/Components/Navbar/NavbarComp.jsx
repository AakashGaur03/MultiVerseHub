import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentStatusUser, toggleTheme } from "../../index";
import { useEffect, useState } from "react";

function NavbarComp() {
  const themeColor = useSelector((state) => state.theme.theme);
  const textColor = useSelector((state) => state.theme.textColor);
  const isLoggedIn = useSelector(
    (state) => state.getCurrentStatus.isUserLoggedIn
  );
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCurrentStatusUser()); // Fetch current user status on component mount
    }
  }, [dispatch]);

  return (
    <>
      {/* <Navbar expand="lg" className={`bg-body- tertiary bg-${themeColor}`} style={{backgroundColor:"black",color:"white"}}> */}
      <Navbar
        expand="lg"
        className={`bg-body- tertiary ${
          themeColor == "light" ? "bg-light" : ""
        }`}
      >
        <Container>
          <Navbar.Brand className={textColor} href="#home">
            MultiverseHubb
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={textColor} href="#home">
                Home
              </Nav.Link>
              <Nav.Link className={textColor} href="#link">
                Link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {!isLoggedIn && (
            <>
              <NavLink to="/login">
                <button className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}>
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}>
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink to="/logout">
                <button className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}>
                  Logout
                </button>
              </NavLink>
              <Form className="togglePosition d-flex" name="togglePosition">
                <Form.Label htmlFor="toggleThemeBtn"></Form.Label>
                <Form.Check
                  name="themeMode"
                  checked={themeColor === "dark"}
                  onChange={handleToggleTheme}
                  type="switch"
                  label={`${themeColor} Mode`}
                  id="toggleThemeBtn"
                  className={textColor}
                />
              </Form>
            </>
          )}
        </Container>
      </Navbar>
      <div></div>
    </>
  );
}

export default NavbarComp;
