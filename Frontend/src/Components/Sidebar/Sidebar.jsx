/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleClicked } from "../../Features";

const Sidebar = ({ items, handleItemClick }) => {
	const isLoggedIn = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor || (theme === "light" ? "text-black" : "text-white"));

	// console.log(items)
	const dispatch = useDispatch();
	const handleClick = (category) => {
		dispatch(toggleClicked(false));
		handleItemClick(category);
	};
	const isToggleClicked = useSelector((state) => state.sidebar.toggleClicked);

	return (
		<>
			{(!location.pathname.includes("/favorites") || isLoggedIn) && (
				<div className={`min-w-52 h-full z-20 relative ${theme === "dark" ? "sidebarColor" : "sidebarLightGradient"}`}>
					<ul
						className={`sidebarFixedSide min-w-52 h-full ${textColor} ${
							theme === "dark" ? "sidebarColor" : "bg-white"
						} ${isToggleClicked ? "sidebarBoxShadow" : "fixed"}`}
					>
						{items.map((item, index) => (
							<li key={index} onClick={() => handleClick(item.title)}>
								<NavLink>{item.title}</NavLink>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default Sidebar;
