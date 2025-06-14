import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { CustomCard, LikeButton, Weather, truncateText } from "../../index";
import { getFinanceNews, getNews } from "../../Features";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../GlobalComp/formatDate";
import { addFavSection, removeFavSection } from "../../Features";
import { handleLikeOperation } from "../../GlobalComp/handleLikeClick";

const News = () => {
	// const [newsData, setNewsData] = useState([]);
	const loaderTrueNews = useSelector((state) => state.news.status === "loading");
	const [isLoadingNews, setIsLoadingNews] = useState(false);
	useEffect(() => {
		setIsLoadingNews(loaderTrueNews);
	}, [loaderTrueNews]);
	const theme = useSelector((state) => state.theme.theme);
	const textColor = useSelector((state) => state.theme.textColor || (theme === "light" ? "text-black" : "text-white"));

	const loaderTrueFinance = useSelector((state) => state.news.financeStatus === "loading");
	const [isLoadingFinance, setIsLoadingFinance] = useState(false);
	useEffect(() => {
		setIsLoadingFinance(loaderTrueFinance);
	}, [loaderTrueFinance]);

	const activeSidebarItem = useSelector((state) => state.sidebar.currentSidebar);
	const newsDataNew = useSelector((state) => state.news?.data?.data?.responseData?.results);
	const financenewsDataNew = useSelector((state) => state.news?.financeData?.data?.responseData?.results);

	const [likedItems, setLikedItems] = useState({});
	const [favSectionDataAll, setFavSectionDataAll] = useState({});
	const favSectionData = useSelector((state) => state?.favSection?.allItem?.data?.favorite);
	const favSectionGameLoader = useSelector((state) => state?.favSection?.loader);
	const [isFavLoading, setIsFavLoading] = useState(false);

	const handleLikeClick = async (itemData, category = "news") => {
		itemData = {
			id: itemData.article_id,
			newsId: itemData.article_id,
			imageUrl: itemData.image_url,
			redirectLink: itemData.link,
			title: itemData.title,
			description: itemData.description,
			sourceRedirectUrl: itemData.source_url,
			sourceIconUrl: itemData.source_icon,
			publishDate: itemData.pubDate,
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
					const favoriteNews = favSectionDataAll?.news || [];
					// Create a dictionary of liked games based on their IDs
					const likedGamesMap = favoriteNews.reduce((acc, news) => {
						acc[news.newsId] = true;
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
		handleNewsUpdate();
	}, [activeSidebarItem]);

	const handleNewsUpdate = async () => {
		await dispatch(getNews(activeSidebarItem));
	};

	// const theme = useSelector((state) => state.theme.theme);
	const dispatch = useDispatch();
	const callFinanceNewsApi = async () => {
		await dispatch(getFinanceNews("finance"));
	};
	useEffect(() => {
		callFinanceNewsApi();
	}, []);
	return (
		<div className="w-full pl-0 md:pl-11">
			{isFavLoading && (
				<div className="overlay">
					<div className="loader2"></div>
				</div>
			)}
			<Row>
				<Col md={8} style={{ minWidth: "66.66666667%" }}>
					{newsDataNew?.length > 0 ? (
						<>
							{newsDataNew?.slice(0, 9).map((news, index) => (
								<div key={index} className="relative">
									<div className="absolute z-10 right-4 top-[-30px]">
										<LikeButton
											customHeight="35px"
											customWidth="35px"
											customId={`likeButton-news-${news?.article_id}`}
											isActive={!!likedItems[news.article_id]}
											onClick={() => handleLikeClick(news)}
										/>
									</div>
									<CustomCard
										alt={"News"}
										index={index}
										imageUrls={
											news.image_url && !news.image_url.includes("410") ? news.image_url : "/ImageNotFound.png"
										}
										onError={(e) => {
											e.target.src = "/ImageNotFound.png";
										}}
										redirectLink={news.link}
										newsStoryHLine={news.title ? truncateText(news.title, 10) : "No Title Found"}
										newsStoryIntro={news.description ? truncateText(news.description, 60) : "No Description Found"}
										newsStorySource={
											<a href={news.source_url} target="_blank">
												<img
													variant="top"
													alt="LogoNotAvail.png"
													height={30}
													width={30}
													src={
														news.source_icon && !news.source_icon.includes("410")
															? news.source_icon
															: "/LogoNotAvail.png"
													}
													onError={(e) => {
														console.error("Error loading image:", e);
														e.target.src = "/LogoNotAvail.png";
														e.target.style.height = "50px";
														e.target.style.width = "50px";
													}}
												/>
											</a>
										}
										updatedOn={formatDate(news.pubDate)}
									/>
								</div>
							))}
						</>
					) : isLoadingNews ? (
						<div className="w-full flex justify-center hscreen align-items-center">
							<div className="loader"></div>
						</div>
					) : (
						<div>No News data Found</div>
					)}
				</Col>
				<Col md={4}>
					<div className="colMd4Div" style={{ position: "sticky", top: "0" }}>
						<Weather />
						{/* <WordOfTheDay /> // It Got Paid */}

						<div>
							{financenewsDataNew?.length > 0 ? (
								<>
									{financenewsDataNew?.slice(0, 6).map((news, index) => (
										<Card
											style={{}}
											key={index}
											className={`my-8 ms-3 rounded-2xl border-0 ${theme === "dark" ? "bg-black" : "bg-white"}`}
										>
											<div className="absolute z-10 right-4 top-[-30px]">
												<LikeButton
													customHeight="35px"
													customWidth="35px"
													customId={`likeButton-news-${news?.article_id}`}
													isActive={!!likedItems[news.article_id]}
													onClick={() => handleLikeClick(news)}
												/>
											</div>
											<Card.Body className={`minHeightCard ${textColor}`}>
												<Row>
													<Col md={4} className="d-flex align-items-center">
														<Card.Img
															variant="top"
															alt="ImageNotFound.png"
															className=""
															src={
																news.image_url && !news.image_url.includes("410")
																	? news.image_url
																	: "/ImageNotFound.png"
															}
															onError={(e) => {
																e.target.src = "/ImageNotFound.png";
															}}
														/>
													</Col>
													<Col md={8} className="d-flex justify-center flex-col">
														<div>
															<a href={news.link} target="_blank">
																<Card.Body className="limit2Lines hover:text-amber-500 p-0">
																	{news.title ? truncateText(news.title, 10) : "No Title Found"}
																</Card.Body>
															</a>
														</div>
													</Col>
												</Row>
											</Card.Body>
										</Card>
									))}
								</>
							) : isLoadingFinance ? (
								<div className="w-full flex justify-center hscreen align-items-center">
									<div className="loader"></div>
								</div>
							) : (
								<div>No News data Found</div>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default News;
