import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toggleTheme, saveThemePreference } from "../../Features"; // ⬅️ Add saveThemePreference
import { Sun, Moon } from "lucide-react";
import truncateTextByChar from "../../GlobalComp/truncateTextByChar";

const ProfileMenu = ({ handleShowLogout }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);
	const user = useSelector((state) => state.getCurrentStatus.user);

	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

	const username = user?.fullName || user?.email?.split("@")[0] || "User";

	const handleToggleDropdown = () => setDropdownOpen((prev) => !prev);

	const handleProfile = () => {
		setDropdownOpen(false);
		navigate("/profile");
	};

	const handleUpdatePassword = () => {
		setDropdownOpen(false);
		navigate("/update-password");
	};

	const handleLogout = () => {
		setDropdownOpen(false);
		handleShowLogout();
	};

	const handleThemeToggle = () => {
		dispatch(toggleTheme());
	};

	const handleSaveTheme = () => {
		dispatch(saveThemePreference(theme));
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const dropdownClass = `absolute right-0 top-14 z-50 w-48 rounded-md shadow-md border transition-all duration-200 ${
		theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
	}`;

	const itemClass = `flex items-center justify-between w-full px-4 py-2 text-left text-sm ${
		theme === "light" ? "hover:bg-gray-100 text-gray-800" : "hover:bg-gray-700 text-gray-200"
	}`;

	return (
		<div className="relative flex items-center gap-4 w-full" ref={dropdownRef}>
			{/* Avatar with Name */}
			<div
				className="flex items-center gap-2 cursor-pointer select-none"
				onClick={handleToggleDropdown}
				role="button"
				aria-haspopup="true"
				aria-expanded={dropdownOpen}
			>
				<div className={`font-semibold capitalize ${textColor}`}>Hello, {truncateTextByChar(username, 10)}</div>
				<img
					src={user?.avatar || "/default-avatar.png"}
					alt="avatar"
					className={`w-10 h-10 rounded-full border-2 object-cover ${
						theme === "light" ? "border-green-600" : "border-green-400"
					}`}
				/>
			</div>

			{/* Dropdown */}
			{dropdownOpen && (
				<div className={dropdownClass}>
					<button onClick={handleProfile} className={itemClass}>
						Profile
					</button>
					<button onClick={handleUpdatePassword} className={itemClass}>
						Update Password
					</button>
					<button onClick={handleLogout} className={itemClass}>
						Logout
					</button>

					<div className={itemClass}>
						<button onClick={handleThemeToggle} className="flex items-center gap-2">
							{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
							{theme === "light" ? "Dark Mode" : "Light Mode"}
						</button>

						{user && (
							<button
								onClick={handleSaveTheme}
								title="Save preference"
								className="hover:text-green-600 transition-colors"
							>
								💾
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
