import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { toggleTheme } from "../../Features";
import { Sun, Moon } from "lucide-react"; // Import icons
import truncateTextByChar from "../../GlobalComp/truncateTextByChar";

const ProfileMenu = ({ handleShowLogout }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);
	const user = useSelector((state) => state.getCurrentStatus.user);

	const [dropdownOpen, setDropdownOpen] = useState(false);

	const username = user?.username || user?.name || user?.email?.split("@")[0] || "User";

	const toggleDropdown = () => setDropdownOpen((prev) => !prev);

	const handleProfile = () => {
		setDropdownOpen(false);
		navigate("/profile");
	};

	const handleLogout = () => {
		setDropdownOpen(false);
		handleShowLogout();
	};

	const handleThemeToggle = () => {
		dispatch(toggleTheme());
	};

	return (
		<div className="relative flex items-center gap-4 w-full">
			{/* Hello & Avatar */}
			<div className="flex items-center gap-2 cursor-pointer select-none" onClick={toggleDropdown}>
				<div className={`font-semibold ${textColor}`}>Hello, {truncateTextByChar(username, 10)}</div>
				<img
					src={user?.profileImage || "/default-avatar.png"}
					alt="avatar"
					className={`w-10 h-10 rounded-full border-2 ${theme === "light" ? "border-green-600" : "border-green-400"}`}
				/>
			</div>

			{/* Dropdown */}
			{dropdownOpen && (
				<div
					className={`absolute right-0 top-14 z-50 w-44 rounded-md shadow-md border ${
						theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
					}`}
				>
					<button
						onClick={handleProfile}
						className={`flex items-center gap-2 w-full px-4 py-2 text-left ${
							theme === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
						}`}
					>
						Profile
					</button>
					<button
						onClick={handleLogout}
						className={`flex items-center gap-2 w-full px-4 py-2 text-left ${
							theme === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
						}`}
					>
						Logout
					</button>
					<button
						onClick={handleThemeToggle}
						className={`flex items-center gap-2 w-full px-4 py-2 text-left ${
							theme === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
						}`}
					>
						{theme === "light" ? (
							<>
								<Moon className="w-4 h-4" />
								Dark Mode
							</>
						) : (
							<>
								<Sun className="w-4 h-4" />
								Light Mode
							</>
						)}
					</button>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
