import { Carousel } from "react-bootstrap";

const CarouselPractice = () => {
  return (
    <div>
      {/* This is infinite Carousel Explore more otherwise need to make custom */}
      {/* <div className="container mx-auto my-8">
        <Carousel indicators={false} interval={null}>
          {movieDataUpcoming?.length > 0 ? (
            Array.from(
              { length: Math.ceil(movieDataUpcoming.length / 4) },
              (_, index) => (
                <Carousel.Item key={index}>
                  <div className="row">
                    {movieDataUpcoming
                      .slice(index * 4, index * 4 + 4)
                      .map((data) => (
                        <div className="col-md-3 " key={data.id}>
                          <div
                            className="card rounded-3xl shadow-lg text-center"
                            onClick={() => infoAboutItem(data.id, "movie")}
                          >
                            <img
                              className="rounded-3xl mx-auto mb- 4"
                              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                              alt={data.title}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </Carousel.Item>
              )
            )
          ) : (
            <div>No Data to Show</div>
          )}
        </Carousel>
      </div> */}

      <div className="container mx-auto my-8">
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="row">
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="First slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Second slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Third slide"
                  />
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="row">
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Fourth slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Fifth slide"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-blue-500 p-4 rounded-lg shadow-lg text-center">
                  <img
                    className="rounded-full mx-auto mb-4"
                    src="https://via.placeholder.com/100"
                    alt="Sixth slide"
                  />
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselPractice;
