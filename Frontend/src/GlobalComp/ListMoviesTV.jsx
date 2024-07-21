import { Button, Card } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const ListMoviesTv = ({
  ListData,
  Heading,
  LoadMoreOption,
  LoadMoreContent,
}) => {
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
  return (
    <div>
      <div className="mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">
        {Heading}
      </div>
      <div className="overflow-y-auto flex my-2 px-5">
        <div className="flex gap-8 py-4">
          {ListData?.results?.length > 0 ? (
            ListData.results.map((data, index) => (
              <div className="activeClass" key={data.id}>
                <Card
                  style={{ width: "15rem" }}
                  className="overflow-x-auto rounded-3xl "
                  onClick={() => infoAboutItem(data.id, "movie")}
                >
                  <Card.Img
                    variant="top"
                    className="h-100"
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  />
                </Card>
                {data.vote_average > 0 && (
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
                )}
                <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                  {data.title}
                </div>
                {/* <CircularProgressbar value={50} text={`${50}%`} /> */}
                <div className="flex justify-center">
                    <div className="w-10">
                  <CircularProgressbar
                    value={data.vote_average.toFixed(1)*10}
                    text={`${data.vote_average.toFixed(1)*10}%`}
                    styles={buildStyles({
                      pathColor: `${getColor(
                      data.vote_average.toFixed(1)
                    )}`,
                      textColor: "white",
                      trailColor: "blue",
                      backgroundColor: "red",
                    })}
                  />
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
          {ListData.page < Math.min(ListData.total_pages, 500) && (
            <div className="w-max flex items-center">
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
