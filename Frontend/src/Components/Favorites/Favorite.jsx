/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDateinHumanredable } from "../../GlobalComp/formatDate";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";
import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomCircularProgressRating from "../../GlobalComp/CustomCircularProgressRating";
import CustomCard from "../../GlobalComp/CustomCard";
import truncateText from "../../GlobalComp/TruncateText";
import { getImageUrl } from "../../GlobalComp/getImageFunc";
import LikeButtonG from "../../GlobalComp/LikeButtonG";

const Favorite = ({ setQuery }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme.theme);

	const isLoggedIn = useSelector((state) => state.getCurrentStatus.isUserLoggedIn);
	const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
	const activeSidebarItem = useSelector((state) => state.sidebar.currentSidebar);
	const [currentSidebarItem, setCurrentSidebarItem] = useState("All");
	const loaderTrue = useSelector((state) => state.games.status === "loading");
	const [isLoading, setIsLoading] = useState(false);
	const [allGames, setsetAllGames] = useState({});
	const [allEntertainment, setAllEntertainment] = useState({});
	const [allNews, setAllNews] = useState([]);
	const [allCricketMatch, setAllCricketMatch] = useState([]);
	const [allCricketNews, setallCricketNews] = useState([]);
	const [imageUrlsNews, setImageUrlsNews] = useState({});
	// eslint-disable-next-line no-unused-vars
	const [loadingImages, setLoadingImages] = useState({});
	const getPointsTable = async (id) => {
		setQuery("");
		setTimeout(() => {
			navigate(`/cricket/${id}/pointsTable`);
		}, 0);
	};

	useEffect(() => {
		setAllEntertainment(favSectionData?.entertainment);
	}, [favSectionData]);
	useEffect(() => {
		setAllNews(favSectionData?.news);
	}, [favSectionData]);
	useEffect(() => {
		setsetAllGames(favSectionData?.game);
	}, [favSectionData]);
	useEffect(() => {
		setAllCricketMatch(favSectionData?.cricketMatch);
	}, [favSectionData]);
	useEffect(() => {
		setallCricketNews(favSectionData?.cricketNews);
	}, [favSectionData]);
	useEffect(() => {
		setCurrentSidebarItem(activeSidebarItem);
	}, [activeSidebarItem]);
	useEffect(() => {
		setIsLoading(loaderTrue);
	}, [loaderTrue]);
	const particularGameCall = async (id) => {
		navigate(`/game/${id}`);
		window.scroll(0, 0);
	};
	const infoAboutItem = (id, category) => {
		navigate(`/particulars/${category}/${id}`);
	};
	const generateRedirectLink = (id, headLine) => {
		let finalUrl = headLine
			.replace(/'/g, "") // Remove single quotes
			.replace(/,/g, "") // Remove double quotes
			.toLowerCase()
			.replace(/\s+/g, "-") // Replace spaces with hyphens
			.replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

		let url = `https://www.cricbuzz.com/cricket-news/${id}/${finalUrl}`;
		return url;
	};
	useEffect(() => {
		if (allCricketNews?.length > 0) {
			getCricketNews();
		}
	}, [allCricketNews]);
	const getCricketNews = async () => {
		allCricketNews?.forEach((news) => {
			if (news.imageId) {
				setTimeout(() => {
					getImageUrl(news.imageId, imageUrlsNews, setImageUrlsNews, setLoadingImages, dispatch);
				}, 1000);
			}
		});
	};

	return (
		<>
			{!isLoggedIn && (
				<div
					className={`h-[calc(100vh-118px)] flex justify-center items-center flex-col w-full ${
						theme === "dark" ? "bg-[#1f1f1f] text-gray-200" : "bg-[#f4f4f4] text-black"
					}`}
				>
					{/* <LikeButton /> */}
					<div>Please Login to Unlock favorite Section</div>
					<div>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height={50}>
							<path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
						</svg>
					</div>
				</div>
			)}
			{isLoggedIn && (
				<div className="overflow-y-auto w-full">
					{isLoggedIn && (currentSidebarItem === "Entertainment" || currentSidebarItem === "All") && (
						<div className="overflow-y-auto flex my-2 px-5">
							<div className="flex gap-8 pb-4 pt-10 w-full">
								{allEntertainment?.length > 0 ? (
									allEntertainment.map((data) => (
										<div key={data.entertainmentId}>
											<div className="relative">
												<LikeButtonG itemId={data._id} itemType="entertainment" />
												<div className="activeClass">
													<Card
														style={{ width: "15rem", minHeight: "357px" }}
														className="overflow-x-auto rounded-3xl "
														onClick={() => infoAboutItem(data.entertainmentId, data.entertainmentType)}
													>
														<ImageWithLoader
															variant="top"
															className="h-100"
															src={`https://image.tmdb.org/t/p/w500${data.posterUrl}`}
															alt="Movie Thumbnail"
															failedImage="/ImageNotFoundVertical.png"
														/>
													</Card>
													<div className="flex justify-center mt-3 ">
														<CustomCircularProgressRating voteAverage={data?.voteAverage} />
													</div>

													<div
														className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold  ${
															theme === "dark" ? "text-gray-300" : ""
														}`}
													>
														{data.title}
													</div>
													{data.releaseDate && (
														<div
															className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold  ${
																theme === "dark" ? "text-gray-300" : ""
															}`}
														>
															Release Date : {formatDateinHumanredable(data.releaseDate)}
														</div>
													)}
													{data.firstAirDate && (
														<div
															className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold  ${
																theme === "dark" ? "text-gray-300" : ""
															}`}
														>
															Release Date : {formatDateinHumanredable(data.firstAirDate)}
														</div>
													)}
												</div>
											</div>
										</div>
									))
								) : isLoading ? (
									<div className="w-full flex justify-center">
										<div className="loader"></div>
									</div>
								) : (
									<div
										className={`${
											theme === "dark" ? "text-gray-400" : "text-gray-700"
										} w-full text-center text-lg mt-10`}
									>
										No Entertainment Data to Show
									</div>
								)}
							</div>
						</div>
					)}
					{isLoggedIn && (currentSidebarItem === "Game" || currentSidebarItem === "All") && (
						<div className="favSactionAfterLogin">
							<div className="flex flex-wrap justify-center pb-4 pt-10">
								{allGames?.length > 0 ? (
									allGames.map((data) => (
										<div key={data.gameId}>
											<div className="relative m-4 cursor-pointer">
												<LikeButtonG itemId={data._id} itemType="game" />
												<div className="activeClass">
													<div onClick={() => particularGameCall(data.gameId)}>
														<Card
															style={{ width: "18rem", minHeight: "150px" }}
															className="overflow-x-auto rounded-3xl "
														>
															<ImageWithLoader
																src={`${data.thumbnail}`}
																alt="Game Thumbnail"
																failedImage="/ImageNotFound.png"
															/>
														</Card>
														<div
															className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold 
                            ${theme === "dark" ? "text-gray-300" : ""} mt-3
                            `}
														>
															{data.title}
														</div>
														{data.releaseDate && (
															<div
																className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold  ${
																	theme === "dark" ? "text-gray-300" : ""
																}
                            `}
															>
																Release Date : {formatDateinHumanredable(data.releaseDate)}
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									))
								) : isLoading ? (
									<div className="w-full flex justify-center">
										<div className="loader"></div>
									</div>
								) : (
									<div
										className={`${
											theme === "dark" ? "text-gray-400" : "text-gray-700"
										} w-full text-center text-lg mt-10`}
									>
										No Game Data to Show
									</div>
								)}
							</div>
						</div>
					)}

					{isLoggedIn && (currentSidebarItem === "News" || currentSidebarItem === "All") && (
						<div className="pb-4 pt-10">
							{allNews?.length > 0 ? (
								allNews?.map((news, index) => (
									<div key={index} className="relative">
										<div className="absolute z-10 right-4 top-[-30px]"></div>
										<LikeButtonG itemId={news._id} itemType="news" />

										<CustomCard
											alt={"News"}
											index={index}
											imageUrls={news.imageUrl && !news.imageUrl.includes("410") ? news.imageUrl : "/ImageNotFound.png"}
											onError={(e) => {
												e.target.src = "/ImageNotFound.png";
											}}
											redirectLink={news.redirectLink}
											newsStoryHLine={news.title ? truncateText(news.title, 10) : "No Title Found"}
											newsStoryIntro={news.description ? truncateText(news.description, 60) : "No Description Found"}
											newsStorySource={
												<a href={news.sourceRedirectUrl} target="_blank">
													<img
														// eslint-disable-next-line react/no-unknown-property
														variant="top"
														alt="LogoNotAvail.png"
														height={30}
														width={30}
														src={
															news.sourceIconUrl && !news.sourceIconUrl.includes("410")
																? news.sourceIconUrl
																: "/LogoNotAvail.png"
														}
														onError={(e) => {
															// console.error("Error loading image:", e);
															e.target.src = "/LogoNotAvail.png";
															e.target.style.height = "50px";
															e.target.style.width = "50px";
														}}
													/>
												</a>
											}
											updatedOn={formatDate(news.publishDate)}
										/>
									</div>
								))
							) : isLoading ? (
								<div className="w-full flex justify-center hscreen align-items-center">
									<div className="loader"></div>
								</div>
							) : (
								<div
									className={`${theme === "dark" ? "text-gray-400" : "text-gray-700"} w-full text-center text-lg mt-10`}
								>
									No News data Found
								</div>
							)}
						</div>
					)}
					{isLoggedIn && (currentSidebarItem === "Cricket" || currentSidebarItem === "All") && (
						<>
							<div className="pl-4 flex overflow-y-auto pb-4 pt-10">
								{allCricketMatch?.length > 0 ? (
									allCricketMatch?.map((data, index) => (
										<div className="min-w-52 me-4 relative" md={4} key={index}>
											<LikeButtonG itemId={data._id} itemType="cricketMatch" />
											<div>
												<div>
													{data.description} {data.seriesName} {data.matchFormat}
												</div>
												<div>
													{data.team1SName}
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
												<div></div>
												<div>
													{data.team2SName}
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
												<div></div>
												<div>{data.matchStatus}</div>
												<NavLink className="cursor-pointer" onClick={() => getPointsTable(data.seriesId)}>
													Table
												</NavLink>
											</div>
										</div>
									))
								) : isLoading ? (
									<div className="w-full flex justify-center align-items-center mt-5">
										<div className="loader"></div>
									</div>
								) : (
									<div
										className={`${
											theme === "dark" ? "text-gray-400" : "text-gray-700"
										} w-full text-center text-lg mt-10`}
									>
										No Cricket Match Data Found
									</div>
								)}
							</div>

							<div className="pb-4 pt-10">
								{allCricketNews?.length > 0 ? (
									<>
										{allCricketNews?.map((news, index) => (
											<div key={index} className="relative">
												<LikeButtonG itemId={news._id} itemType="cricketNews" />

												<div>
													<CustomCard
														alt={"Cricket"}
														index={index}
														imageUrls={imageUrlsNews[news.imageId]}
														onError={(e) => {
															e.target.src = "/ImageNotFound.png";
														}}
														redirectLink={generateRedirectLink(news.cricketNewsId, news.hLine)}
														newsStoryHLine={news.hLine ? truncateText(news.hLine, 10) : "No Title Found"}
														newsStoryIntro={news.intro ? truncateText(news.intro, 60) : "No Description Found"}
														newsStorySource={
															news.source == "Cricbuzz" && (
																<a href="https://www.cricbuzz.com/" target="_blank">
																	<img
																		className="rounded-full"
																		variant="top"
																		alt="LogoNotAvail.png"
																		height={30}
																		width={30}
																		src="/cricbuzzLogo.png"
																	/>
																</a>
															)
														}
														updatedOn={formatDate(news.pubTime)}
													/>
												</div>
											</div>
										))}
									</>
								) : isLoading ? (
									<div className="w-full flex justify-center hscreen align-items-center">
										<div className="loader"></div>
									</div>
								) : (
									<div
										className={`${
											theme === "dark" ? "text-gray-400" : "text-gray-700"
										} w-full text-center text-lg mt-10`}
									>
										No Cricket News Found
									</div>
								)}
							</div>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Favorite;
