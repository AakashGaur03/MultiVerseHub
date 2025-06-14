/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";
import { useSelector } from "react-redux";

const CreditSection = ({ creditsData }) => {
	const theme = useSelector((state) => state.theme.theme);

	return (
		<div className="mt-5">
			<div
				className={`mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-center ${
					theme === "dark" ? "text-gray-300" : "text-gray-700"
				}`}
			>
				Cast
			</div>
			<div className="overflow-y-auto flex my-2 px-5">
				<div className="flex gap-8 pb-4 pt-10">
					{creditsData?.cast?.length > 0 ? (
						creditsData.cast.map((data) => (
							<div className="activeClass relative" key={data.id}>
								<Card
									style={{ width: "15rem" }}
									className={`overflow-x-auto rounded-3xl ${
										theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-800"
									}
`}
								>
									{/* {data.profile_path ? (
                    <Card.Img
                      variant="top"
                      className="h-100"
                      alt="Cast Image"
                      src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      className="h358px"
                      alt="Cast Image"
                      src={`/ImageNotFoundVertical.png`}
                    />
                  )} */}
									<ImageWithLoader
										src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
										alt={`${data.name} Image`}
										failedImage="/ImageNotFoundVertical.png"
									/>
								</Card>
								<div
									className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}
`}
								>
									{data.name}
								</div>
								<div
									className={`text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold italic ${
										theme === "dark" ? "text-gray-300" : "text-gray-700"
									}
`}
								>
									({data.character})
								</div>
							</div>
						))
					) : (
						<div className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>No Data to Show</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CreditSection;
