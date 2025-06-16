import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ListMoviesTV } from "../..";
import { useEffect, useState } from "react";
import { getcricketSearchPlayer } from "../../Features";
import { getImageUrl } from "../../GlobalComp/getImageFunc";

const SearchResultPage = () => {
	const location = useLocation();
	const query = new URLSearchParams(location.search).get("q") || "";
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor || (theme === "light" ? "text-black" : "text-white"));

	const newsDataRaw = useSelector((state) => state.news?.data?.data?.responseData?.results || []);
	const { tvData = [], movieData = [] } = useSelector((state) => state.entertainment || {});
	const searchPlayersData = useSelector((state) => state.cricket.searchPlayer || {});
	const [imageUrls, setImageUrls] = useState({});
	const [loadingImages, setLoadingImages] = useState({});

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

	return (
		<div className={`min-h-screen p-6 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
			<h1 className="text-2xl font-bold mb-6">Search Results for: &quot;{query}&quot;</h1>

			{/* 🏏 Cricket Players */}
			<h2 className="text-xl font-semibold mb-3">Cricket</h2>
			{/* 🏏 Cricket Players */}
			{searchPlayersData?.player?.length > 0 && (
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-3">Cricket Players</h2>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{searchPlayersData.player.map((player, index) => (
							<div
								key={player?.id || player?.pid}
								className="p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
								onClick={() => (window.location.href = `/cricket/playerInfo/${player?.id || player?.pid}`)}
							>
								{loadingImages[player.faceImageId] ? (
									<div>Loading...</div>
								) : (
									<img
										src={index < 5 ? imageUrls[player.faceImageId] || "/ImageNotFound.png" : "/ImageNotFound.png"}
										alt={player?.name || "Player"}
										className="w-full h-48 object-cover rounded"
										onError={(e) => {
											if (!e.target.src.includes("default-player.png")) {
												e.target.src = "/default-player.png";
											}
										}}
									/>
								)}
								<h3 className="mt-2 text-lg font-semibold">{player?.name || "Unnamed Player"}</h3>
								<p className="text-sm text-gray-500">{player?.teamName || "Unknown Country"}</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* 📰 News */}
			{newsDataRaw.length > 0 && (
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-3">News</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{newsDataRaw.map((newsItem) => (
							<div
								key={newsItem.article_id}
								className="p-4 border rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition"
							>
								<a href={newsItem.link} target="_blank" rel="noopener noreferrer">
									<div className="flex gap-4">
										<img
											src={
												newsItem.image_url && !newsItem.image_url.includes("410")
													? newsItem.image_url
													: "/ImageNotFound.png"
											}
											alt="news"
											className="w-20 h-20 object-cover rounded-md"
											onError={(e) => {
												e.target.src = "/ImageNotFound.png";
											}}
										/>
										<div className="flex flex-col justify-between">
											<h3 className="text-lg font-semibold">{newsItem.title || "No Title"}</h3>
											<p className="text-sm text-gray-500 line-clamp-3">{newsItem.description || "No Description"}</p>
											<div className="mt-2">
												<img
													src={
														newsItem.source_icon && !newsItem.source_icon.includes("410")
															? newsItem.source_icon
															: "/LogoNotAvail.png"
													}
													alt="source"
													className="w-5 h-5 inline-block mr-2"
													onError={(e) => {
														e.target.src = "/LogoNotAvail.png";
													}}
												/>
												<span className="text-xs text-gray-400">{newsItem.source_url}</span>
											</div>
										</div>
									</div>
								</a>
							</div>
						))}
					</div>
				</section>
			)}

			{/* 📺 TV Shows */}
			{tvData.length > 0 && (
				<section className="mb-6">
					<ListMoviesTV data={tvData} title="TV Shows" type="tv" />
				</section>
			)}

			{/* 🎬 Movies */}
			{movieData.length > 0 && (
				<section className="mb-6">
					<ListMoviesTV data={movieData} title="Movies" type="movie" />
				</section>
			)}

			{/* ❌ No Results */}
			{!searchPlayersData.length && !newsDataRaw.length && !tvData.length && !movieData.length && (
				<p className="text-gray-400 text-center mt-10">No results found for "{query}".</p>
			)}
		</div>
	);
};

export default SearchResultPage;
