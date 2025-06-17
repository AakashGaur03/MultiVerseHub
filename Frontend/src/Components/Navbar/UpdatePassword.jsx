import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUpdatePasswordMessage, updatePassword } from "../../Features";
import { Eye, EyeOff } from "lucide-react";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const { loading, message, error } = useSelector((state) => state.updatePassword);
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showOld, setShowOld] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [localError, setLocalError] = useState("");
	useEffect(() => {
		if (message) {
			const timer = setTimeout(() => {
				dispatch(clearUpdatePasswordMessage());
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [message, dispatch]);
	const handleSubmit = (e) => {
		e.preventDefault();
		setLocalError("");

		if (newPassword !== confirmPassword) {
			setLocalError("Passwords do not match");
			return;
		}

		dispatch(updatePassword({ oldPassword, newPassword })).then((res) => {
			console.log(res);
			if (res?.statusCode === 200) {
				setOldPassword("");
				setNewPassword("");
				setConfirmPassword("");
			}
		});
	};

	const inputWrapperStyle = "relative";
	const iconStyle = "absolute right-3 top-2.5 cursor-pointer text-gray-400";

	const inputStyles = `w-full p-2 pr-10 rounded border transition-all duration-200 focus:outline-none ${
		theme === "dark"
			? "bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:border-gray-300"
			: "bg-white text-black border-gray-300 placeholder-gray-500 focus:border-black"
	}`;

	return (
		<div className="max-w-3xl mx-auto p-6">
			<div className={`p-6 rounded-md  transition-all duration-200 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
				<h2 className={`text-lg font-semibold mb-4 ${textColor}`}>Update Password</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Old Password */}
					<div className={inputWrapperStyle}>
						<input
							type={showOld ? "text" : "password"}
							placeholder="Current Password"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							className={inputStyles}
							required
						/>
						<span className={iconStyle} onClick={() => setShowOld(!showOld)}>
							{showOld ? <EyeOff size={18} /> : <Eye size={18} />}
						</span>
					</div>

					{/* New Password */}
					<div className={inputWrapperStyle}>
						<input
							type={showNew ? "text" : "password"}
							placeholder="New Password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className={inputStyles}
							required
						/>
						<span className={iconStyle} onClick={() => setShowNew(!showNew)}>
							{showNew ? <EyeOff size={18} /> : <Eye size={18} />}
						</span>
					</div>

					{/* Confirm Password */}
					<div className={inputWrapperStyle}>
						<input
							type={showConfirm ? "text" : "password"}
							placeholder="Confirm New Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className={inputStyles}
							required
						/>
						<span className={iconStyle} onClick={() => setShowConfirm(!showConfirm)}>
							{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
						</span>
					</div>

					{/* Button */}
					<button
						type="submit"
						disabled={loading}
						className={`px-4 py-2 rounded font-semibold shadow-md transition-all duration-200 ${
							loading
								? theme === "dark"
									? "bg-gray-600 text-white cursor-not-allowed"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
								: theme === "dark"
								? "bg-gray-700 text-white hover:bg-gray-600"
								: "bg-gray-200 text-gray-800 hover:bg-gray-300"
						}`}
					>
						{loading ? "Updating..." : "Update Password"}
					</button>

					{/* Error/Success messages */}
					{localError && <p className="text-red-500 text-sm">{localError}</p>}
					{error && <p className="text-red-500 text-sm">{error}</p>}
					{message && <p className="text-green-600 text-sm">{message}</p>}
				</form>
			</div>
		</div>
	);
};

export default UpdatePassword;
