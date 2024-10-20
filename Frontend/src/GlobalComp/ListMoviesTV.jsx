import { Button, Card } from "react-bootstrap";
import { CustomCircularProgressRating } from "..";
import { formatDateinHumanredable } from "./formatDate";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ImageWithLoader from "./ImageWithLoader";
const ListMoviesTv = ({
  ListData,
  Heading,
  LoadMoreOption,
  LoadMoreContent,
  InfoAboutItem,
  MovieOrTv,
}) => {
  const loaderTrue = useSelector(
    (state) => state.getEntertainmentData.state === "loading"
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(loaderTrue);
  }, [loaderTrue]);

  return (
    <div>
      <div className="mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">
        {Heading}
      </div>
      <div className="overflow-y-auto flex my-2 px-5">
        <div className="flex gap-8 pb-4 pt-10 w-full">
          {ListData?.results?.length > 0 ? (
            ListData.results.map((data) => (
              <div className="activeClass relative" key={data.id}>
                <Card
                  style={{ width: "15rem",minHeight:"357px" }}
                  className="overflow-x-auto rounded-3xl "
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
                  <CustomCircularProgressRating
                    voteAverage={data.vote_average}
                  />
                </div>
                
                <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                  {data.title}
                </div>
                {data.release_date && (
                  <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                    Release Date : {formatDateinHumanredable(data.release_date)}
                  </div>
                )}
                {data.first_air_date && (
                  <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                    Release Date :{" "}
                    {formatDateinHumanredable(data.first_air_date)}
                  </div>
                )}
              </div>
            ))
          ) : isLoading ? (
            <div className="w-full flex justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <div>No Data to Show</div>
          )}

          {Heading !== "Search Results" &&
            Heading !== "Recommendations" &&
            ListData.page < Math.min(ListData.total_pages, 500) && (
              <div
                className="w-max flex items-center"
                style={{ minWidth: "105px" }}
              >
                <Button
                  variant="secondary"
                  onClick={() => LoadMoreContent(ListData.page, LoadMoreOption)}
                >
                  Load More
                </Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ListMoviesTv;
