import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import Loader from "../../GlobalComp/Loader";
import {
	clearUpdateAccountMessage,
	clearUpdateAvatarMessage,
	fetchCurrentStatusUser,
	updateAccountDetails,
	updateAvatar,
} from "../../Features";

const Profile = () => {
	const dispatch = useDispatch();
	const fileInputRef = useRef();

	const { user, loading: userLoading } = useSelector((state) => state.getCurrentStatus);
	const { loading: updateLoading, message: updateMessage } = useSelector((state) => state.updateAccount);
	const { loading: avatarLoading, message: avatarMessage } = useSelector((state) => state.updateAvatar);
	const theme = useSelector((state) => state.theme.theme);

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [isChanged, setIsChanged] = useState(false);

	const [avatarPreview, setAvatarPreview] = useState("/default-avatar.png");

	useEffect(() => {
		if (!user) {
			dispatch(fetchCurrentStatusUser());
		} else {
			setFullName(user.fullName || "");
			setEmail(user.email || "");
			setAvatarPreview(user.avatar?.trim() ? user.avatar : "/default-avatar.png");
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (updateMessage) {
			const timer = setTimeout(() => {
				dispatch(clearUpdateAccountMessage(null));
			}, 3000); // 3 seconds

			return () => clearTimeout(timer);
		}
	}, [updateMessage, dispatch]);

	useEffect(() => {
		if (avatarMessage) {
			const timer = setTimeout(() => {
				dispatch(clearUpdateAvatarMessage(null));
			}, 3000); // 3 seconds

			return () => clearTimeout(timer);
		}
	}, [avatarMessage, dispatch]);

	useEffect(() => {
		if (!user) return;

		const nameChanged = fullName !== (user.fullName || "");
		const emailChanged = email !== (user.email || "");

		setIsChanged(nameChanged || emailChanged);
	}, [fullName, email, user]);

	const handleProfileUpdate = (e) => {
		e.preventDefault();
		dispatch(updateAccountDetails({ fullName, email })).then((res) => {
			if (res?.statusCode === 200) {
				dispatch(fetchCurrentStatusUser());
				setIsChanged(false);
			}
		});
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setAvatarPreview(URL.createObjectURL(file));
			const formData = new FormData();
			formData.append("avatar", file);
			dispatch(updateAvatar(formData)).then((res) => {
				if (res?.status === 200) {
					dispatch(fetchCurrentStatusUser());
				}
			});
		}
	};

	if (userLoading)
		return (
			<div className="flex justify-center items-center h-[50vh]">
				<Loader />
			</div>
		);

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">My Profile</h1>

			{/* Avatar Section */}
			<div className="flex items-center gap-6 mb-6">
				<div className="relative w-24 h-24">
					<img
						src={avatarPreview}
						alt="Avatar"
						className="w-24 h-24 rounded-full object-cover border-2 border-green-500"
					/>
					<button
						className="absolute bottom-0 right-0 bg-green-600 text-white p-1 rounded-full text-sm hover:bg-green-700"
						onClick={() => fileInputRef.current.click()}
						disabled={avatarLoading}
						type="button"
					>
						📷
					</button>
					<input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleAvatarChange} />
				</div>

				<div>
					<h2 className="text-lg font-semibold">{user?.username || user?.name}</h2>
					<p className="text-sm text-gray-500">{user?.email}</p>
					{avatarLoading && <p className="text-xs text-yellow-500 mt-1">Uploading avatar...</p>}
					{avatarMessage && <p className="text-xs text-green-600 mt-1">{avatarMessage}</p>}
				</div>
			</div>

			{/* Form Section */}
			<Form onSubmit={handleProfileUpdate} className="space-y-4">
				<Form.Group className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
						className={`min-w-36 ${
							theme === "dark"
								? "bg-dark text-light border-secondary dark-placeholder"
								: "bg-white text-dark border-dark light-placeholder"
						}`}
						style={{
							backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
							color: theme === "dark" ? "#fff" : "#000",
							borderColor: theme === "dark" ? "#444" : "#ccc",
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className={`min-w-36 ${
							theme === "dark"
								? "bg-dark text-light border-secondary dark-placeholder"
								: "bg-white text-dark border-dark light-placeholder"
						}`}
						style={{
							backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
							color: theme === "dark" ? "#fff" : "#000",
							borderColor: theme === "dark" ? "#444" : "#ccc",
						}}
					/>
				</Form.Group>

				<button
					type="submit"
					disabled={updateLoading || !isChanged}
					className={`p-2 rounded-md font-semibold shadow-md transition-all duration-200 ${
						updateLoading || !isChanged
							? theme === "dark"
								? "bg-gray-600 text-white cursor-not-allowed"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
							: theme === "dark"
							? "bg-gray-700 text-white hover:bg-gray-600"
							: "bg-gray-200 text-gray-800 hover:bg-gray-300"
					}`}
				>
					{updateLoading ? "Updating..." : "Update Profile"}
				</button>

				{updateMessage && <p className="text-sm mt-2 text-green-600">{updateMessage}</p>}
			</Form>
		</div>
	);
};

export default Profile;
