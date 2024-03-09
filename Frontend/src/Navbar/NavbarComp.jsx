import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentStatusUser, toggleTheme } from "../Features";
import { useEffect, useState } from "react";

function NavbarComp() {
  const theme = useSelector((state) => state.theme.theme);
  const accessToken = useSelector((state) => state.getCurrentStatus.isUserLoggedIn)
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    dispatch(fetchCurrentStatusUser()); // Fetch current user status on component mount
  }, [dispatch]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {!accessToken && (
            <>
              <NavLink to="/login">
                <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10">
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10">
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
          {accessToken && (
            <>
              <NavLink to="/logout">
                <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10">
                  Logout
                </button>
              </NavLink>
            </>
          )}

          <Form className="togglePosition" name="togglePosition">
            <Form.Label htmlFor="toggleThemeBtn"></Form.Label>
            <Form.Check
              name="themeMode"
              checked={theme === "Dark"}
              onChange={handleToggleTheme}
              type="switch"
              label={`${theme} Mode`}
              id="toggleThemeBtn"
            />
          </Form>
        </Container>
      </Navbar>
      <div></div>
    </>
  );
}

export default NavbarComp;
