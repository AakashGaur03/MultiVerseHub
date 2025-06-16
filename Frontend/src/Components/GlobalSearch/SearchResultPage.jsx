import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomCircularProgressRating, ListMoviesTV, truncateText } from "../..";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../GlobalComp/getImageFunc";
import { formatDate, formatDateinHumanredable } from "../../GlobalComp/formatDate";
import { Card } from "react-bootstrap";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";

const SearchResultPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const query = new URLSearchParams(location.search).get("q") || "";
	const theme = useSelector((state) => state.theme.theme);

	const newsDataRaw = useSelector((state) => state.news?.data?.data?.responseData?.results || []);
	const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite || {});
	const { tvData = [], movieData = [] } = useSelector((state) => state.entertainment || {});
	const searchPlayersData = useSelector((state) => state.cricket.searchPlayer || {});
	const [imageUrls, setImageUrls] = useState({});
	const [loadingImages, setLoadingImages] = useState({});
	const [filteredFavNews, setFilteredFavNews] = useState([]);
	const [filteredFavEntertainment, setFilteredFavEntertainment] = useState([]);
	const [filteredFavGames, setFilteredFavGames] = useState([]);
	const [filteredFavCricketMatch, setFilteredFavCricketMatch] = useState([]);
	const [filteredFavCricketNews, setFilteredFavCricketNews] = useState([]);
	const [imageUrlsNews, setImageUrlsNews] = useState({});
	console.log(favSectionData, "favSectionDatafavSectionDatafavSectionData");
	const infoAboutItem = (id, category) => {
		navigate(`/particulars/${category}/${id}`);
	};
	useEffect(() => {
		if (filteredFavCricketNews?.length > 0) {
			getCricketNews();
		}
	}, [filteredFavCricketNews]);

	const getCricketNews = async () => {
		filteredFavCricketNews?.forEach((news) => {
			if (news.imageId) {
				setTimeout(() => {
					getImageUrl(news.imageId, imageUrlsNews, setImageUrlsNews, setLoadingImages, dispatch);
				}, 1000);
			}
		});
	};

	useEffect(() => {
		if (!query.trim()) {
			setFilteredFavNews([]);
			setFilteredFavEntertainment([]);
			setFilteredFavGames([]);
			setFilteredFavCricketMatch([]);
			setFilteredFavCricketNews([]);
			return;
		}

		const q = query.toLowerCase();

		setFilteredFavNews(
			(favSectionData?.news || []).filter(
				(item) => (item?.title || "").toLowerCase().includes(q) || (item?.description || "").toLowerCase().includes(q)
			)
		);

		setFilteredFavEntertainment(
			(favSectionData?.entertainment || []).filter(
				(item) =>
					(item?.title || "").toLowerCase().includes(q) ||
					(item?.releaseDate || "").toLowerCase().includes(q) ||
					(item?.firstAirDate || "").toLowerCase().includes(q)
			)
		);

		setFilteredFavGames(
			(favSectionData?.game || []).filter(
				(item) => (item?.title || "").toLowerCase().includes(q) || (item?.releaseDate || "").toLowerCase().includes(q)
			)
		);

		setFilteredFavCricketMatch(
			(favSectionData?.cricketMatch || []).filter(
				(item) =>
					(item?.description || "").toLowerCase().includes(q) ||
					(item?.seriesName || "").toLowerCase().includes(q) ||
					(item?.matchFormat || "").toLowerCase().includes(q) ||
					(item?.matchStatus || "").toLowerCase().includes(q) ||
					(item?.team1SName || "").toLowerCase().includes(q) ||
					(item?.team2SName || "").toLowerCase().includes(q)
			)
		);

		setFilteredFavCricketNews(
			(favSectionData?.cricketNews || []).filter(
				(item) => (item?.hLine || "").toLowerCase().includes(q) || (item?.intro || "").toLowerCase().includes(q)
			)
		);
	}, [query, favSectionData]);

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
			{searchPlayersData?.player?.length > 0 && (
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-3">Cricket Players</h2>
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{searchPlayersData.player.map((player, index) => (
							<div
								key={player?.id || player?.pid}
								className={`p-4 border rounded-lg shadow transition cursor-pointer
                                    hover:bg-gray-100 hover:text-black
                                    dark:hover:bg-gray-800 dark:hover:text-white`}
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
								className={`p-4 border rounded-lg shadow transition cursor-pointer
                                    hover:bg-gray-100 hover:text-black
                                    dark:hover:bg-gray-800 dark:hover:text-white`}
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

			{filteredFavGames.length > 0 && (
				<section className="mb-6">
					<h2 className="text-xl font-semibold mb-3">Favorite Sports</h2>
					<ListMoviesTV data={filteredFavGames} title="Favorite Sports" type="game" />
				</section>
			)}

			{filteredFavCricketMatch?.length > 0 && (
				<>
					<h2 className="text-xl font-semibold mb-3 mt-5">Favorite Cricket Matches</h2>
					<div className="flex flex-wrap gap-4">
						{filteredFavCricketMatch.map((data, index) => (
							<div
								key={index}
								className={`w-64 border rounded-2xl shadow-md p-4 transition-colors duration-300 relative ${
									theme === "dark"
										? "bg-gray-900 border-gray-700 text-gray-100"
										: "bg-white border-gray-200 text-gray-800"
								}`}
							>
								{/* Match Info */}
								<div className="font-semibold text-sm mb-2">
									{data.description} — {data.seriesName}
									<span className={`block text-xs mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
										({data.matchFormat})
									</span>
								</div>

								{/* Team 1 Score */}
								<div className="mb-1 text-sm">
									<span className="font-bold">{data.team1SName}</span>
									{data.team1inngs1runs && !data.team1inngs2runs && (
										<>
											: {data.team1inngs1runs}-{data.team1inngs1wickets} ({data.team1inngs1overs})
										</>
									)}
									{data.team1inngs1runs && data.team1inngs2runs && (
										<>
											: {data.team1inngs1runs}-{data.team1inngs1wickets} {data.team1inngs2runs}-
											{data.team1inngs2wickets}
										</>
									)}
								</div>

								{/* Team 2 Score */}
								<div className="mb-1 text-sm">
									<span className="font-bold">{data.team2SName}</span>
									{data.team2inngs1runs && !data.team2inngs2runs && (
										<>
											: {data.team2inngs1runs}-{data.team2inngs1wickets} ({data.team2inngs1overs})
										</>
									)}
									{data.team2inngs1runs && data.team2inngs2runs && (
										<>
											: {data.team2inngs1runs}-{data.team2inngs1wickets} {data.team2inngs2runs}-
											{data.team2inngs2wickets}
										</>
									)}
								</div>

								{/* Match Status */}
								<div className={`text-xs mt-2 italic ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
									{data.matchStatus}
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{filteredFavCricketNews?.length > 0 && (
				<>
					<h2 className="text-xl font-semibold mb-3 mt-5">Favorite Cricket News</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredFavCricketNews.map((news, index) => (
							<div
								key={index}
								className={`border rounded-2xl shadow-md p-4 transition-colors duration-300 ${
									theme === "dark"
										? "bg-gray-900 border-gray-700 text-gray-100"
										: "bg-white border-gray-200 text-gray-800"
								}`}
							>
								{/* News Image */}
								<div className="w-full h-40 overflow-hidden rounded-xl mb-3">
									<img
										src={imageUrlsNews[news.imageId] || "/ImageNotFound.png"}
										alt={news.hLine || "Cricket News"}
										onError={(e) => {
											e.target.src = "/ImageNotFound.png";
										}}
										className="object-cover w-full h-full rounded-xl"
									/>
								</div>

								{/* Headline */}
								<div className="font-bold text-base mb-2">
									{news.hLine ? truncateText(news.hLine, 12) : "No Title Available"}
								</div>

								{/* Intro */}
								<div className="text-sm mb-2">
									{news.intro ? truncateText(news.intro, 70) : "No Description Available"}
								</div>

								{/* Source & Date */}
								<div className="flex justify-between items-center mt-3 text-xs">
									{news.source === "Cricbuzz" && (
										<a href="https://www.cricbuzz.com/" target="_blank" rel="noopener noreferrer">
											<img src="/cricbuzzLogo.png" alt="Cricbuzz" className="h-6 w-6 rounded-full" />
										</a>
									)}
									<span className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
										{formatDate(news.pubTime)}
									</span>
								</div>
							</div>
						))}
					</div>
				</>
			)}

			{filteredFavEntertainment?.length > 0 && (
				<div className="flex flex-wrap gap-4 justify-center py-6">
					{filteredFavEntertainment.map((data) => (
						<div className="relative" key={data.entertainmentId}>
							{/* Card */}
							<div className="absolute z-10 right-4 top-[-30px]">
								{/* You can add a Like or Remove icon here if needed */}
							</div>

							<Card
								style={{ width: "15rem", minHeight: "357px" }}
								className="overflow-hidden rounded-3xl cursor-pointer"
								onClick={() => infoAboutItem(data.entertainmentId, data.entertainmentType)}
							>
								{/* Poster Image */}
								<ImageWithLoader
									variant="top"
									className="h-100"
									src={`https://image.tmdb.org/t/p/w500${data.posterUrl}`}
									alt={data.title || "Entertainment Poster"}
									failedImage="/ImageNotFoundVertical.png"
								/>
							</Card>

							{/* Rating */}
							<div className="flex justify-center mt-3">
								<CustomCircularProgressRating voteAverage={data?.voteAverage} />
							</div>

							{/* Title */}
							<div
								className={`text-center mt-2 w-60 text-ellipsis whitespace-nowrap overflow-hidden font-semibold ${
									theme === "dark" ? "text-gray-300" : "text-gray-800"
								}`}
							>
								{data.title}
							</div>

							{/* Release Date */}
							{data.releaseDate && (
								<div
									className={`text-center mt-1 w-60 text-ellipsis whitespace-nowrap overflow-hidden font-semibold ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									Release Date: {formatDateinHumanredable(data.releaseDate)}
								</div>
							)}

							{data.firstAirDate && (
								<div
									className={`text-center mt-1 w-60 text-ellipsis whitespace-nowrap overflow-hidden font-semibold ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									Release Date: {formatDateinHumanredable(data.firstAirDate)}
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{[
				searchPlayersData?.player?.length,
				newsDataRaw.length,
				tvData.length,
				movieData.length,
				filteredFavNews.length,
				filteredFavEntertainment.length,
				filteredFavGames.length,
				filteredFavCricketMatch.length,
				filteredFavCricketNews.length,
			].every((len) => len === 0) && (
				<p className="text-gray-400 text-center mt-10">No results found for &quot;{query}&quot;.</p>
			)}
		</div>
	);
};

export default SearchResultPage;
