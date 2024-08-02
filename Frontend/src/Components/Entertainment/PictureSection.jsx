import React, { useState } from "react";

const PictureSection = ({ imagesData, videoData }) => {
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
        <div className="mb-2 mt-3 ps-5 font-semibold text-2xl text-gray-300 text-center">
          <span
            className="cursor-pointer"
            onClick={() => setActiveSection("image")}
          >
            Image(s)
          </span>
        </div>
        <div className="mb-2 mt-3 ps-5 font-semibold text-2xl text-gray-300 text-center">
          <span
            className="cursor-pointer"
            onClick={() => setActiveSection("video")}
          >
            Video(s)
          </span>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {imageActive &&
          (imagesData?.backdrops?.length > 0 ? (
            imagesData?.backdrops?.map((image, index) => (
              <div key={index} className="flex-none">
                <img
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  className=""
                  alt=""
                />
              </div>
            ))
          ) : (
            <div className="ps-5">No Image To Show</div>
          ))}
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {videoActive &&
          (videoData?.results?.length > 0 ?
          videoData?.results?.map((video, index) => (
            <div key={index} className="flex-none w-96 h-56">
              <iframe
                allowFullScreen
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={`https://www.youtube.com/embed/${video.key}`}
                frameBorder="0"
              ></iframe>
            </div>
          )) : <div className="ps-5">No Video To Show</div>)}
      </div>
    </div>
  );
};

export default PictureSection;
