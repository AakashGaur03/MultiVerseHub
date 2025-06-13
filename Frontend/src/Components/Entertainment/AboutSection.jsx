/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import CustomCircularProgressRating from "../../GlobalComp/CustomCircularProgressRating";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";

const AboutSection = ({ aboutData }) => {
	const theme = useSelector((state) => state.theme.theme);

	function giveTimeInHours(minutes) {
		let remainHour = Math.floor(minutes / 60);
		let remainMin = minutes % 60;

		remainHour = remainHour.toString().padStart(2, "0");
		remainMin = remainMin.toString().padStart(2, "0");
		return `${remainHour} h ${remainMin} min`;
	}
	return (
		<div
			style={{
				backgroundImage: `url(	https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${aboutData?.backdrop_path})`,
			}}
			className=" bg-no-repeat bg-cover"
		>
			<div
				style={{
					background:
						theme === "dark"
							? "linear-gradient(45deg, black, rgba(0,0,0,0.4))"
							: "linear-gradient(45deg, white, rgba(255,255,255,0.4))",
				}}
				className={`w-full ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
			>
				{/* Here Add for Image Title Percentage Overview */}
				<div className="row">
					<div className="col-md-4 flex justify-center">
						<div className="flex items-center relative">
							{/* <img
                className=""
                style={{ height: "80%" }}
                src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${aboutData?.poster_path}`}
                alt=""
              /> */}

							<ImageWithLoader
								style={{ height: "100%" }}
								heightDiv="80%"
								heightImg="100%"
								src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${aboutData?.poster_path}`}
								alt={`${aboutData?.original_title} Image`}
								failedImage="/ImageNotFoundVertical.png"
							/>
						</div>
					</div>
					<div className="col-md-8 flex flex-col justify-evenly">
						<div>
							<h2 className="text-3xl">{aboutData?.original_title || aboutData?.original_name}</h2>
							<div className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-sm space-y-1`}>
								{aboutData?.release_date && <>Release Date : {formatDateinHumanredable(aboutData?.release_date)}</>}
								{aboutData?.first_air_date && (
									<>First Air Date : {formatDateinHumanredable(aboutData?.first_air_date)}</>
								)}

								<div>{aboutData?.runtime && giveTimeInHours(aboutData?.runtime)}</div>
								<div>{aboutData?.number_of_episodes && <>Total Episode(s) : {aboutData?.number_of_episodes}</>}</div>
								<div>{aboutData?.number_of_seasons && <>Total Season(s) : {aboutData?.number_of_seasons}</>}</div>
							</div>
						</div>
						<div>
							<CustomCircularProgressRating voteAverage={aboutData?.vote_average} />
						</div>
						<div className={`italic ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
							{aboutData?.tagline ? aboutData?.tagline : "Tagline Not Available"}
						</div>
						<div>
							<div className="mb-3">Overview</div>
							<div className={`leading-6 px-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
								{aboutData?.overview ? aboutData?.overview : "Overview not Available"}
							</div>
						</div>
						{/* <div className="flex"> */}
						<div className="flex flex-wrap gap-2">
							{aboutData?.genres?.map((genre) => (
								<div
									className={`customBadge px-3 py-1 rounded-full text-sm font-medium ${
										theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
									}`}
									key={genre.id}
								>
									{genre.name}
								</div>
							))}
						</div>
						{/* </div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutSection;
