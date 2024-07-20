import { Button, Card } from "react-bootstrap";

const ListMoviesTv = ({
  ListData,
  Heading,
  LoadMoreOption,
  LoadMoreContent,
}) => {
  return (
    <div>
      <div className="mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">{Heading}</div>
      <div className="overflow-y-auto flex my-2 px-5">
        <div className="flex gap-8 py-4">
          {ListData?.results?.length > 0 ? (
            ListData.results.map((data, index) => (
              <Card
                style={{ width: "15rem" }}
                className="overflow-x-auto rounded-3xl activeClass"
                key={data.id}
                onClick={() => infoAboutItem(data.id, "movie")}
              >
                <Card.Img
                  variant="top"
                  className="h-100"
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
              </Card>
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
