import React from "react";
import { Card } from "react-bootstrap";
import ImageWithLoader from "../../GlobalComp/ImageWithLoader";

const CreditSection = ({ creditsData }) => {
  return (
    <div className="mt-5">
      <div className="mb-2 mt-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">Cast</div>
      <div className="overflow-y-auto flex my-2 px-5">
        <div className="flex gap-8 pb-4 pt-10">
          {creditsData?.cast?.length > 0 ? (
            creditsData.cast.map((data, index) => (
              <div className="activeClass relative" key={data.id}>
                <Card style={{ width: "15rem" }} className="overflow-x-auto rounded-3xl ">
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
                <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300">
                  {data.name}
                </div>
                <div className="text-center mt-2 text-ellipsis w-60 whitespace-nowrap overflow-hidden font-semibold text-gray-300 italic">
                  ({data.character})
                </div>
              </div>
            ))
          ) : (
            <div>No Data to Show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditSection;
