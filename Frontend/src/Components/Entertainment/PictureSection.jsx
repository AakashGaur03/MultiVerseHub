/* eslint-disable react/prop-types */
import { useState } from "react";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";
import IFrameWithLoader from "../../GlobalComp/IFrameWithLoader";
import { useSelector } from "react-redux";
const PictureSection = ({ imagesData, videoData }) => {
	const theme = useSelector((state) => state.theme.theme);
	const [imageActive, setImageActive] = useState(true);
	const [videoActive, setVideoActive] = useState(false);
	const setActiveSection = (section) => {
		if (section === "image") {
			setVideoActive(false);
			setImageActive(true);
		} else if (section === "video") {
			setImageActive(false);
			setVideoActive(true);
		}
	};
	return (
		<div className="my-5">
			<div className="flex mb-5">
				<div
					className={`mb-2 mt-3 ps-5 font-semibold text-2xl text-center cursor-pointer ${
						imageActive
							? theme === "dark"
								? "text-white"
								: "text-gray-800"
							: theme === "dark"
							? "text-gray-400"
							: "text-gray-500"
					}`}
				>
					<span className="cursor-pointer" onClick={() => setActiveSection("image")}>
						Image(s) ({imagesData?.backdrops?.length})
					</span>
				</div>
				<div
					className={`mb-2 mt-3 ps-5 font-semibold text-2xl text-center cursor-pointer ${
						videoActive
							? theme === "dark"
								? "text-white"
								: "text-gray-800"
							: theme === "dark"
							? "text-gray-400"
							: "text-gray-500"
					}`}
				>
					<span className="cursor-pointer" onClick={() => setActiveSection("video")}>
						Video(s) ({videoData?.results?.length})
					</span>
				</div>
			</div>
			<div className="flex gap-4 overflow-x-auto">
				{imageActive &&
					(imagesData?.backdrops?.length > 0 ? (
						imagesData?.backdrops?.map((image, index) => (
							<div
								key={index}
								className="flex-none h-auto
              min-h-72 min-w-72 relative"
							>
								{/* <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className=""
                  alt=""
                /> */}
								<ImageWithLoader
									style={{ height: "100%" }}
									src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
									alt={`Backdrop Images`}
									failedImage="/ImageNotFoundVertical.png"
								/>
							</div>
						))
					) : (
						<div className={`ps-5 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>No Image To Show</div>
					))}
			</div>

			<div className="flex gap-4 overflow-x-auto">
				{videoActive &&
					(videoData?.results?.length > 0 ? (
						videoData?.results?.map((video, index) => (
							<div key={index} className="flex-none w-96 h-56 relative">
								{/* <iframe
                  allowFullScreen
                  width="100%"
                  height="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  src={`https://www.youtube.com/embed/${video.key}`}
                ></iframe> */}
								<IFrameWithLoader
									allowFullScreen
									width="100%"
									height="100%"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									src={`https://www.youtube.com/embed/${video.key}`}
								/>
							</div>
						))
					) : (
						<div className={`ps-5 ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>No Video To Show</div>
					))}
			</div>
		</div>
	);
};

export default PictureSection;
