import { Container, Nav, Navbar, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentStatusUser, toggleTheme } from "../../index";
import { useEffect, useState } from "react";
import {
  ForgotModal,
  LoginModal,
  NewPassModal,
  OtpModal,
} from "../UserControls";

function NavbarComp() {
  const themeColor = useSelector((state) => state.theme.theme);
  const textColor = useSelector((state) => state.theme.textColor);
  const isLoggedIn = useSelector(
    (state) => state.getCurrentStatus.isUserLoggedIn
  );
  const dispatch = useDispatch();
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showPasswordRest, setShowPasswordRest] = useState(false);
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCurrentStatusUser()); // Fetch current user status on component mount
    }
  }, [dispatch]);

  const [showModal, setShowModal] = useState(null);

  const handleClose = () => {
    setShowModal(null);
    setShowEmailInput(false);
    setShowOTPForm(false);
    setShowPasswordRest(false);
  };
  
  const handleShow = (modal) => {
    // Reset states before showing a modal to avoid conflicts
    // setShowEmailInput(false);
    // setShowOTPForm(false);
    // setShowPasswordRest(false);
    setShowModal(modal);
  };
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
              <NavLink onClick={() => handleShow("login")}>
                <button
                  className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
                >
                  Login
                </button>
              </NavLink>
              <NavLink to="/register">
                <button
                  className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
                >
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink to="/logout">
                <button
                  className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
                >
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

      <LoginModal
        show={showModal === "login"}
        handleClose={handleClose}
        handleForgot={() => {
          handleShow("forgot");
          setShowEmailInput(true)
        }}
      />
      <ForgotModal
        show={showModal === "forgot"}
        handleClose={handleClose}
        handleOtp={() => handleShow("otp")}
        showModal={showModal}
        handleShow={handleShow}
        showEmailInput={showEmailInput}
        setShowEmailInput={setShowEmailInput}
        showOTPForm={showOTPForm}
        setShowOTPForm={setShowOTPForm}
        showPasswordRest={showPasswordRest}
        setShowPasswordRest={setShowPasswordRest}
      />
      {/* <NewPassModal
        show={showModal === "newPass"}
        handleClose={handleClose}
      /> */}
      <div></div>
    </>
  );
}

export default NavbarComp;
