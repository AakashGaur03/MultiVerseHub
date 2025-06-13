/* eslint-disable react/prop-types */
import { Button, Card } from "react-bootstrap";
import { CustomCircularProgressRating, LikeButton } from "..";
import { formatDateinHumanredable } from "./formatDate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageWithLoader from "./ImageWithLoader";
import { handleLikeOperation } from "./handleLikeClick";
import { addFavSection, removeFavSection } from "../Features";

// eslint-disable-next-line react/prop-types
const ListMoviesTv = ({ ListData, Heading, LoadMoreOption, LoadMoreContent, InfoAboutItem, MovieOrTv }) => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme.theme);
	const loaderTrue = useSelector((state) => state.getEntertainmentData.state === "loading");
	const [isLoading, setIsLoading] = useState(false);
	const [likedItems, setLikedItems] = useState({});
	const [favSectionDataAll, setFavSectionDataAll] = useState({});
	const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
	const favSectionGameLoader = useSelector((state) => state?.favSection?.loader);
	const [isFavLoading, setIsFavLoading] = useState(false);

	const handleLikeClick = async (itemData, movieOrtvIncoming, category = "entertainment") => {
		console.log(itemData, "itemDataitemData");
		itemData = {
			id: itemData.id,
			entertainmentId: itemData.id,
			entertainmentType: movieOrtvIncoming,
			posterUrl: itemData.poster_path,
			voteAverage: itemData.vote_average,
			releaseDate: itemData.release_date,
			firstAirDate: itemData.first_air_date,
			title: itemData.title,
		};
		// console.log(itemData, "ITEMATA");
		await handleLikeOperation({
			category,
			itemData,
			favSectionDataAll,
			setLikedItems,
			dispatch,
			addFavSection,
			removeFavSection,
		});
	};
	useEffect(() => {
		setFavSectionDataAll(favSectionData);
	}, [favSectionData]);
	useEffect(() => {
		setIsFavLoading(favSectionGameLoader);
	}, [favSectionGameLoader]);

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				if (favSectionDataAll && Object.keys(favSectionDataAll).length > 0) {
					const favoriteEntertainment = favSectionDataAll?.entertainment || [];
					// Create a dictionary of liked games based on their IDs
					const likedGamesMap = favoriteEntertainment.reduce((acc, entertainment) => {
						acc[entertainment.entertainmentId] = true;
						return acc;
					}, {});
					setLikedItems(likedGamesMap);
				}
			} catch (error) {
				console.error("Error fetching favorites:", error);
			}
		};

		fetchFavorites();
	}, [favSectionDataAll]);
	useEffect(() => {
		setIsLoading(loaderTrue);
	}, [loaderTrue]);

	return (
		<div>
			<div
				className={`mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-center ${
					theme === "dark" ? "text-gray-300" : "text-gray-700"
				}`}
			>
				{Heading}
			</div>
			<div className="overflow-y-auto flex my-2 px-5">
				<div className="flex gap-8 pb-4 pt-10 w-full">
					{ListData?.results?.length > 0 ? (
						ListData.results.map((data) => (
							<div className="activeClass relative" key={data.id}>
								<div className="absolute z-10 right-4 top-[-30px]">
									<LikeButton
										customId={`likeButton-entertainment-${data.id}`}
										isActive={!!likedItems[data.id]}
										onClick={() => handleLikeClick(data, MovieOrTv)}
									/>
								</div>
								<Card
									style={{ width: "15rem", minHeight: "357px" }}
									className={`overflow-x-auto rounded-3xl shadow-md ${
										theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-800"
									}`}
									onClick={() => InfoAboutItem(data.id, MovieOrTv)}
								>
									<ImageWithLoader
										variant="top"
										className="h-100"
										src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
										alt="Movie Thumbnail"
										failedImage="/ImageNotFoundVertical.png"
									/>
								</Card>
								<div className="flex justify-center mt-3 ">
									<CustomCircularProgressRating voteAverage={data.vote_average} />
								</div>

								<div
									className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}`}
								>
									{data.title}
								</div>
								{data.release_date && (
									<div
										className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold ${
											theme === "dark" ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Release Date : {formatDateinHumanredable(data.release_date)}
									</div>
								)}
								{data.first_air_date && (
									<div
										className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold ${
											theme === "dark" ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Release Date : {formatDateinHumanredable(data.first_air_date)}
									</div>
								)}
							</div>
						))
					) : isLoading ? (
						<div className="w-full flex justify-center">
							<div className="loader"></div>
						</div>
					) : (
						<div className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>No Data to Show</div>
					)}

					{Heading !== "Search Results" &&
						Heading !== "Recommendations" &&
						ListData.page < Math.min(ListData.total_pages, 500) && (
							<div className="w-max flex items-center" style={{ minWidth: "105px" }}>
								<Button
									className={`p-2 rounded-md font-semibold shadow-md ${
										theme === "dark"
											? "bg-gray-700 text-white hover:bg-gray-600"
											: "bg-gray-200 text-gray-800 hover:bg-gray-300"
									}`}
									onClick={() => LoadMoreContent(ListData.page, LoadMoreOption)}
								>
									Load More
								</Button>
							</div>
						)}
				</div>
			</div>
			{isFavLoading && (
				<div className="overlay" style={{ opacity: 0.1 }}>
					<div className="loader2"></div>
				</div>
			)}
		</div>
	);
};

export default ListMoviesTv;
