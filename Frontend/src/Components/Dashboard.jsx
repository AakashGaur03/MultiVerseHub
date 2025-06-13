import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const getCurrentState = useSelector((state) => state.getCurrentStatus.state);
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);
	const navigate = useNavigate();

	const [extraTime, setExtraTime] = useState(false);
	const [timer, setTimer] = useState(() => {
		const savedTimer = localStorage.getItem("timerVal");
		return savedTimer !== null ? parseInt(savedTimer, 10) : 50;
	});

	const [redirectCountdown, setRedirectCountdown] = useState(3);
	const [shouldRedirect, setShouldRedirect] = useState(false);

	useEffect(() => {
		if (getCurrentState == null) {
			setTimer(0);
			localStorage.setItem("timerVal", "0");
		} else {
			const savedTimer = localStorage.getItem("timerVal");
			let updateTimer = savedTimer !== null && savedTimer !== "0" ? parseInt(savedTimer, 10) : 50;
			setTimer(updateTimer);
			localStorage.setItem("timerVal", updateTimer.toString());
		}
	}, [getCurrentState]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimer((prevTimer) => {
				if (getCurrentState !== null && prevTimer <= 1) {
					setExtraTime(true);
					localStorage.setItem("timerVal", "50");
					return 50;
				}
				if (prevTimer <= 1 || !prevTimer) {
					setExtraTime(false);
					clearInterval(intervalId);
					setShouldRedirect(true);
					return 0;
				}
				const newTimer = prevTimer - 1;
				localStorage.setItem("timerVal", newTimer.toString());
				return newTimer;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [getCurrentState]);

	// Redirect countdown when timer reaches 0
	useEffect(() => {
		if (!shouldRedirect) return;

		const redirectTimer = setInterval(() => {
			setRedirectCountdown((prev) => {
				if (prev === 1) {
					navigate("/news");
					clearInterval(redirectTimer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(redirectTimer);
	}, [shouldRedirect, navigate]);

	const backgroundColor =
		theme === "light" ? "bg-gradient-to-br from-blue-100 to-purple-100" : "bg-gradient-to-br from-gray-800 to-gray-900";

	return (
		<div
			className={`flex flex-col items-center justify-center h-screen text-center px-4 ${backgroundColor} transition-colors duration-300 ${textColor}`}
		>
			<h1 className="text-3xl md:text-4xl font-bold mb-6">🚀 Preparing your services...</h1>

			<p className="text-lg md:text-xl mb-4 max-w-xl">
				Due to server inactivity, the initial load time can take up to <strong>50 seconds</strong>.
			</p>

			{timer > 0 ? (
				<div className="flex items-center justify-center gap-2 mb-6">
					<div className="animate-ping w-3 h-3 rounded-full bg-blue-600"></div>
					<p className="text-md font-medium">
						Please wait... Estimated response time: <strong>{timer} sec</strong>
					</p>
				</div>
			) : (
				<div className="flex flex-col items-center gap-4">
					<p className="text-green-600 text-xl font-semibold animate-fade-in">
						✅ Thanks for your patience! You can now enjoy our services.
					</p>
					<p className="text-md font-medium">
						Routing to one of our services <code className="font-semibold text-blue-600">/news</code> in{" "}
						<strong>{redirectCountdown}</strong> second{redirectCountdown !== 1 && "s"}...
					</p>
					<button
						onClick={() => navigate("/news")}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
					>
						Route Now
					</button>
				</div>
			)}

			{extraTime && (
				<p className="mt-4 text-red-500 font-medium text-md animate-pulse">
					We’re extremely sorry it took over 50 seconds. We&apos;re looking into it.
				</p>
			)}
		</div>
	);
};

export default Dashboard;
