import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { AboutSection, CreditSection, PictureSection, ReviewSection } from "../..";
import ListMoviesTv from "../../GlobalComp/ListMoviesTV";

const Particulars = () => {
	const navigate = useNavigate();
	const globalParticularData = useSelector((state) => state.getEntertainmentData.entertainmentParticularData);
	const theme = useSelector((state) => state.theme.theme);
	const activeSidebarItem = useSelector((state) => state.sidebar.currentSidebar);
	const loaderTrue = useSelector((state) => state.getEntertainmentData.searchStateParticular === "loading");

	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(loaderTrue);
	}, [loaderTrue]);
	// const [particularData, setParticulatData] = useState(globalParticularData);

	const [aboutData, setAboutData] = useState([]);
	const [creditsData, setCreditsData] = useState([]);
	const [reviewsData, setReviewsData] = useState([]);
	const [videoData, setVideoData] = useState([]);
	const [imagesData, setImagesData] = useState([]);
	const [recommendationData, setRecommendationData] = useState([]);

	const { category, id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		let payload = {
			category: category,
			id: id,
		};
		dispatch(getEntertainmentParticularsData(payload));
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		// setParticulatData(globalParticularData);
		// console.log(globalParticularData, "globalParticularData");
		setAboutData(globalParticularData?.about);
		setCreditsData(globalParticularData?.credits);
		setReviewsData(globalParticularData?.reviews);
		setVideoData(globalParticularData?.video);
		setImagesData(globalParticularData?.images);
		setRecommendationData(globalParticularData?.recommendations);
		// console.log(particularData);
	}, [globalParticularData]);
	const infoAboutItem = (id, category) => {
		navigate(`/particulars/${category}/${id}`);
	};
	return (
		<>
			{globalParticularData ? (
				<div>
					<AboutSection aboutData={aboutData} />
					<CreditSection creditsData={creditsData} />
					<ReviewSection reviewsData={reviewsData} />
					<PictureSection imagesData={imagesData} videoData={videoData} />
					<ListMoviesTv
						ListData={recommendationData}
						Heading="Recommendations"
						InfoAboutItem={infoAboutItem}
						MovieOrTv={activeSidebarItem === "TV" ? "tv" : "movie"}
					/>
				</div>
			) : isLoading ? (
				<div className="w-full flex justify-center hscreen align-items-center">
					<div className="loader"></div>
				</div>
			) : (
				<div className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>No Data to Show</div>
			)}
		</>
	);
};

export default Particulars;
