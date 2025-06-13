/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../../GlobalComp/getImageFunc";
import { useNavigate } from "react-router-dom";

const LocalSearchDialogBox = ({ searchPlayersData, setSearchLocalQuery }) => {
	const [imageUrls, setImageUrls] = useState({});
	const [loadingImages, setLoadingImages] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const dialogRef = useRef(null);
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor);

	useEffect(() => {
		const playersToFetch = searchPlayersData?.player?.slice(0, 5) || [];
		if (playersToFetch?.length) {
			playersToFetch?.forEach((player) => {
				if (!imageUrls[player.faceImageId]) {
					// Check if image URL is not already fetched
					setLoadingImages((prevState) => ({
						...prevState,
						[player.faceImageId]: true,
					}));

					getImageUrl(player.faceImageId, imageUrls, setImageUrls, setLoadingImages, dispatch);
				}
			});
		}
	}, [searchPlayersData, imageUrls, dispatch]);

	const callParticularPlayer = (playerId) => {
		navigate(`/cricket/playerInfo/${playerId}`);
		setSearchLocalQuery("");
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dialogRef.current && !dialogRef.current.contains(event.target)) {
				setSearchLocalQuery("");
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
	return (
		<div
			className={`max-h-60 overflow-x-auto searchDialodLocalSearch absolute scrollbar-thin rounded-md z-50 ${
				theme === "dark"
					? "sidebarColor text-white border border-gray-700"
					: "bg-white text-black border border-gray-300 shadow-md"
			}`}
			ref={dialogRef}
		>
			<div className="mb-2 mt-3 uppercase text-center">
				Total results for {searchPlayersData?.category} : {searchPlayersData?.player?.length ?? 0}
			</div>
			<div className="flex flex-col gap-y-5">
				{searchPlayersData?.player?.map((player, index) => (
					<div key={player.id} className="flex cursor-pointer" onClick={() => callParticularPlayer(player.id)}>
						<div>
							{loadingImages[player.faceImageId] ? (
								<div>Loading...</div>
							) : (
								<img
									src={index < 5 ? imageUrls[player.faceImageId] || "/ImageNotFound.png" : "/ImageNotFound.png"}
									alt={player.name}
									style={{ width: "50px", height: "50px" }}
								/>
							)}
						</div>
						<div className="ms-3">
							<div>{player.name}</div>
							<div>{player.teamName}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LocalSearchDialogBox;
