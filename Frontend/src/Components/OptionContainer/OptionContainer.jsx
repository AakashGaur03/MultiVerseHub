import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LocalSearch } from "../../index";

const OptionContainer = () => {
	const [isSticky, setIsSticky] = useState(false);
	const [showLocalSearch, setShowLocalSearch] = useState(true);
	const location = useLocation();

	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);

	useEffect(() => {
		const handleScroll = () => {
			const optionContainerHeight = document.querySelector(".optionContainer").clientHeight;
			setIsSticky(window.scrollY > optionContainerHeight);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		getShowLocalSearch();
	}, [location.pathname]);

	const getShowLocalSearch = () => {
		if (
			location.pathname.includes("/news") ||
			location.pathname.includes("/entertainment") ||
			location.pathname.includes("/cricket")
		) {
			setShowLocalSearch(true);
		} else {
			setShowLocalSearch(false);
		}
	};

	const bgClass = theme === "light" ? "bg-light shadow-sm border-top border-bottom" : "bg-dark";

	const textClass = textColor || (theme === "light" ? "text-dark" : "text-light");

	return (
		<div className={`${isSticky ? "posFixedAtTop" : "posNormal"}`}>
			<Container fluid>
				<Navbar className={`${bgClass} d-block optionContainer`}>
					<div className="sm:px-20 px-7">
						<Nav className={`gap-16 ${textClass}`} style={{ overflowX: "auto" }}>
							<Nav.Item>
								<NavLink className={`nav-link ${textClass}`} to="/favorites">
									Favorite
								</NavLink>
							</Nav.Item>
							<Nav.Item>
								<NavLink className={`nav-link ${textClass}`} to="/news">
									News
								</NavLink>
							</Nav.Item>
							<Nav.Item>
								<NavLink className={`nav-link ${textClass}`} to="/cricket">
									Cricket
								</NavLink>
							</Nav.Item>
							<Nav.Item>
								<NavLink className={`nav-link ${textClass}`} to="/entertainment">
									Entertainment
								</NavLink>
							</Nav.Item>
							<Nav.Item>
								<NavLink className={`nav-link ${textClass}`} to="/games">
									Games
								</NavLink>
							</Nav.Item>
							{showLocalSearch && <LocalSearch />}
						</Nav>
					</div>
				</Navbar>
			</Container>
		</div>
	);
};

export default OptionContainer;
