import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Features";

function NavbarComp() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

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
          <Form className="togglePosition" name="togglePosition">
            <Form.Check
              name="themeMode"
              checked={theme === "Dark"}
              onChange={handleToggleTheme}
              type="switch"
              label={`${theme} Mode`}
            />
          </Form>
        </Container>
      </Navbar>
      <div></div>
    </>
  );
}

export default NavbarComp;
