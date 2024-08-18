import { Button, Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { CustomCircularProgressRating } from "..";
import { formatDateinHumanredable } from "./formatDate";
import { useEffect, useRef } from "react";
const ListMoviesTv = ({
  ListData,
  Heading,
  LoadMoreOption,
  LoadMoreContent,
  InfoAboutItem,
  MovieOrTv,
}) => {
  const listContainerRef = useRef(null); // Create a ref for the container
  useEffect(() => {
    // Reset the scroll position to the start (left) whenever ListData changes
    if (listContainerRef.current) {
      listContainerRef.current.scrollLeft = 0;
    }
  }, [ListData]);
  const getColor2 = (rating) => {
    if (rating > 8) {
      return "green-600";
    } else if (rating > 6) {
      return "yellow-600";
    } else if (rating > 4) {
      return "orange-600";
    } else {
      return "red-600";
    }
  };
  const getColor = (rating) => {
    if (rating > 8) {
      return "green";
    } else if (rating > 6) {
      return "yellow";
    } else if (rating > 4) {
      return "orange";
    } else {
      return "red";
    }
  };
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-GB", {
  //     day: "2-digit",
  //     month: "long",
  //     year: "numeric",
  //   });
  // };
  return (
    <div>
      <div className="mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">
        {Heading}
      </div>
      <div className="overflow-y-auto flex my-2 px-5" ref={listContainerRef}>
        <div className="flex gap-8 pb-4 pt-10">
          {ListData?.results?.length > 0 ? (
            ListData.results.map((data, index) => (
              <div className="activeClass relative" key={data.id}>
                <Card
                  style={{ width: "15rem" }}
                  className="overflow-x-auto rounded-3xl "
                  onClick={() => InfoAboutItem(data.id, MovieOrTv)}
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  />
                </Card>
                <div className="flex justify-center mt-3 ">
                  <CustomCircularProgressRating
                    voteAverage={data.vote_average}
                  />
                </div>
                {/* {data.vote_average > 0 && (
                  <div
                    className={`text-center mt-3 rounded-3xl bg-${getColor2(
                      data.vote_average.toFixed(1)
                    )}`}
                  >
                    {data.vote_average.toFixed(1)}
                  </div>
                )}
                {!data.vote_average && (
                  <div className={`text-center mt-3`}>NR</div>
                )} */}
                {/* <div className="flex justify-center mt-3 absolute -top-10" style={{left:"50%",transform:"translateX(-50%)"}}>  // To make rating on the top center */}
                {/* <div className="flex justify-center mt-3 ">
                  <div className="w-10">
                    <CircularProgressbar
                      value={data.vote_average.toFixed(1) * 10}
                      text={
                        data.vote_average
                          ? `${data.vote_average.toFixed(1) * 10}%`
                          : `NR`
                      }
                      styles={buildStyles({
                        pathColor: `${getColor(data.vote_average.toFixed(1))}`,
                        textColor: "white",
                        trailColor: "blue",
                        backgroundColor: "red",
                      })}
                    />
                  </div>
                </div> */}
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
                {/* <CircularProgressbar value={50} text={`${50}%`} /> */}
              </div>
            ))
          ) : (
            <div>No Data to Show</div>
          )}

          {Heading !== "Search Results" ||
            (Heading !== "Recommendations" &&
              ListData.page < Math.min(ListData.total_pages, 500) && (
                <div className="w-max flex items-center">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      LoadMoreContent(ListData.page, LoadMoreOption)
                    }
                  >
                    Load More
                  </Button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ListMoviesTv;
