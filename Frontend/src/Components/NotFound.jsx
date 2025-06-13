import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(3);

	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);

	useEffect(() => {
		if (seconds === 0) {
			navigate("/news");
		}

		const timer = setInterval(() => {
			setSeconds((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [seconds, navigate]);

	return (
		<div
			className={`flex flex-col items-center justify-center h-screen text-center transition-colors duration-300 w-full ${
				theme === "light" ? "bg-gray-100" : "bg-gray-900"
			} ${textColor}`}
		>
			<h1 className="text-2xl font-bold mb-4">The route you&apos;re trying to access doesn&apos;t exist.</h1>
			<p className="mb-6 text-lg">
				Redirecting to <code>/news</code> in {seconds} second{seconds !== 1 && "s"}...
			</p>
			<button onClick={() => navigate("/news")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
				Route Now
			</button>
		</div>
	);
};

export default NotFound;
