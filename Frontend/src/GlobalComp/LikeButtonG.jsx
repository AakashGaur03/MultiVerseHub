/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleFavoriteItem } from "../Features";
import { useState } from "react";

const LikeButtonG = ({ itemId, itemType }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const favoriteItems = useSelector((state) => state.favSection.allItem?.data?.favorite || {});
	const theme = useSelector((state) => state.theme.theme);
	const isLiked = favoriteItems[itemType]?.some((item) => {
		return item._id === itemId;
	});

	const handleLike = async (e) => {
		e.stopPropagation();
		setLoading(true);
		try {
			await dispatch(toggleFavoriteItem({ itemId, itemType }));
		} finally {
			setTimeout(() => {
				setLoading(false); // This will now run only after dispatch finishes
			}, 1500);
		}
	};

	return (
		<>
			<button onClick={handleLike} className="text-xl absolute top-2 right-3 z-10">
				{isLiked ? (
					<FaHeart className={`text-red-600 ${theme === "dark" ? "hover:text-red-400" : ""}`} />
				) : (
					<FaRegHeart className={`text-white ${theme === "dark" ? "hover:text-gray-400" : ""}`} />
				)}
			</button>
			{loading && (
				<div className="overlay z-50">
					<div className="loader2"></div>
				</div>
			)}
		</>
	);
};

export default LikeButtonG;
