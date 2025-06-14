import { Container, Navbar, Form, Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentStatusUser, Sidebar, toggleTheme } from "../../index";
import { useEffect, useState } from "react";
import { ForgotModal, LoginModal, LogoutModal, RegisrationModal } from "../UserControls";
import {
	getFavSection,
	loginMessageUpdate,
	toggleClicked,
	updateErrorAndMessage,
	updateLogoutMessage,
	UpdateRegisterMessage,
	updateSidebar,
	updateUserRegistered,
} from "../../Features";
import { getSidebarItems } from "../../GlobalComp/sidebarItem";
import debounce from "../../GlobalComp/debounce";

// function debounce(func, wait) {
//   let timeout;
//   return function (...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// }
function NavbarComp({ setQuery }) {
	const themeColor = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);
	const isLoggedIn = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);
	const [newIsUserLoggedIn, setNewIsUserLoggedIn] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showEmailInput, setShowEmailInput] = useState(true);
	const [showOTPForm, setShowOTPForm] = useState(false);
	const [showPasswordRest, setShowPasswordRest] = useState(false);
	const [sidebarItems, setSidebarItems] = useState(getSidebarItems());

	const isToggleClicked = useSelector((state) => state.sidebar.toggleClicked);

	const [showSidebar, setShowSidebar] = useState(isToggleClicked);

	const [showModal, setShowModal] = useState(null);

	const handleClose = () => {
		setShowModal(null);
		setShowEmailInput(false);
		setShowOTPForm(false);
		setShowPasswordRest(false);
		dispatch(loginMessageUpdate(""));
		dispatch(UpdateRegisterMessage(""));
		dispatch(updateLogoutMessage(""));
		dispatch(updateErrorAndMessage({ error: false, message: "" }));
		dispatch(updateUserRegistered(false));
	};

	const handleShow = (modal) => {
		setShowModal(modal);
	};
	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};
	useEffect(() => {
		setNewIsUserLoggedIn(isLoggedIn);
	}, [isLoggedIn]);

	useEffect(() => {
		// if (isLoggedIn) {
		dispatch(fetchCurrentStatusUser()); // Fetch current user status on component mount
		// }
		if (newIsUserLoggedIn) {
			dispatch(getFavSection());
		}
	}, [dispatch, newIsUserLoggedIn]);

	useEffect(() => {
		const items = getSidebarItems();
		setSidebarItems(items);
		isToggleVisible();
	}, [location.pathname]);

	const [toggleBtnVisible, setToggleBtnVisible] = useState(false);

	const isToggleVisible = () => {
		if (window.innerWidth > 992 || getSidebarItems().length === 0) {
			setToggleBtnVisible(false);
		} else {
			setToggleBtnVisible(true);
		}
	};

	const handleResize = debounce(() => {
		if (window.innerWidth > 992) {
			dispatch(toggleClicked(false));
		} else {
		}
		isToggleVisible(); // Ensure isToggleVisible runs on every resize
	}, 200);

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	useEffect(() => {
		setShowSidebar(isToggleClicked);
	}, [isToggleClicked]);
	const handleShowSidebar = () => {
		dispatch(toggleClicked(true));
	};
	const handleCloseSidebar = () => {
		dispatch(toggleClicked(false));
	};
	const handleSidebarClick = async (category) => {
		dispatch(updateSidebar(category));
		setQuery(category);
		if (location.pathname.includes("/cricket")) {
			navigate("/cricket");
		}
	};

	return (
		<>
			{/* <Navbar expand="lg" className={`bg-body- tertiary bg-${themeColor}`} style={{backgroundColor:"black",color:"white"}}> */}
			<Navbar expand="lg" className={`bg-body- tertiary ${themeColor == "light" ? "bg-light" : ""}`}>
				<Container>
					<Navbar.Brand className={textColor}>
						<NavLink to={"/"}>MultiverseHubb</NavLink>
					</Navbar.Brand>
					{!newIsUserLoggedIn && (
						<>
							<div>
								<NavLink>
									<button
										onClick={() => handleShow("login")}
										className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
									>
										Login
									</button>
								</NavLink>
								<NavLink>
									<button
										onClick={() => handleShow("register")}
										className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
									>
										Sign Up
									</button>
								</NavLink>
							</div>
						</>
					)}
					{newIsUserLoggedIn && (
						<div className="flex align-items-center">
							<button
								onClick={() => handleShow("logout")}
								className={`bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-10`}
							>
								Logout
							</button>
							<Form className="togglePosition d-flex" name="togglePosition">
								<Form.Label htmlFor="toggleThemeBtn"></Form.Label>
								<Form.Check
									name="themeMode"
									checked={themeColor === "dark"}
									onChange={handleToggleTheme}
									type="switch"
									label={`${themeColor === "light" ? "Light" : "Dark"} Mode`}
									id="toggleThemeBtn"
									className={textColor}
								/>
							</Form>
						</div>
					)}
					{toggleBtnVisible && (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={20} onClick={handleShowSidebar}>
							<path
								fill={themeColor === "dark" ? "#ffffff" : "#000000"}
								d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
							/>
						</svg>
					)}

					{/* Dark Theme */}
					{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg> */}
				</Container>
			</Navbar>

			<RegisrationModal show={showModal === "register"} handleClose={handleClose} handleShow={handleShow} />
			<LoginModal
				show={showModal === "login"}
				handleClose={handleClose}
				handleForgot={() => {
					handleShow("forgot");
					setShowEmailInput(true);
				}}
			/>
			<LogoutModal show={showModal === "logout"} handleClose={handleClose} />
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

			<Offcanvas
				show={showSidebar}
				className="d-block d-xl-none sidebarColor text-white p-0"
				onHide={handleCloseSidebar}
				style={{ maxWidth: "225px", paddingInline: "12px" }}
			>
				<Sidebar items={sidebarItems} handleItemClick={handleSidebarClick} />
			</Offcanvas>

			<div></div>
		</>
	);
}

export default NavbarComp;
