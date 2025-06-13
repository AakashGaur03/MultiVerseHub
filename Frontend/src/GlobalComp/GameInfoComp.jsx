/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const GameInfoComp = ({ label, value }) => {
	const { textColor } = useSelector((state) => state.theme);

	return (
		<div>
			<p className={`${textColor}`}>
				{label}
				<br />
			</p>
			<p className="mb-2">{value}</p>
		</div>
	);
};

export default GameInfoComp;
