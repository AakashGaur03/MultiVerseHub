/* eslint-disable react/prop-types */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector } from "react-redux";

const CustomCircularProgressRating = ({ voteAverage = 7.5 }) => {
	// Ensure voteAverage is a number
	const numericVoteAverage = typeof voteAverage === "number" ? voteAverage : parseFloat(voteAverage);
	const theme = useSelector((state) => state.theme.theme);

	if (isNaN(numericVoteAverage)) {
		console.error("Invalid voteAverage value:", voteAverage);
		return null; // or display a fallback UI if needed
	}

	const getColor = (rating) => {
		if (rating > 8) {
			return "green";
		} else if (rating > 6) {
			return "yellow";
		} else if (rating > 4) {
			return "orange";
		} else {
			return "red";
		}
	};

	return (
		<div className="w-10">
			<CircularProgressbar
				value={numericVoteAverage.toFixed(1) * 10}
				text={`${numericVoteAverage.toFixed(1) * 10}%`}
				styles={buildStyles({
					pathColor: getColor(numericVoteAverage.toFixed(1)),
					textColor: theme === "dark" ? "white" : "#1e293b",
					trailColor: theme === "dark" ? "#334155" : "#cbd5e1",
					backgroundColor: "transparent",
				})}
			/>
		</div>
	);
};

export default CustomCircularProgressRating;
