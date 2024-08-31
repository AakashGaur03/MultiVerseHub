import React, { useEffect, useState } from "react";

const IFrameWithLoader = ({
  allowFullScreen,
  width,
  height,
  allow,
  src,
  failedImage,
}) => {
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(src);
  useEffect(() => {
    setVideoSrc(src);
  }, [src]);
  const handleVideoLoad = () => {
    setVideoLoading(false);
  };
  const handleVideoError = () => {
    setVideoLoading(false);
    setVideoSrc(failedImage);
  };

  return (
    <div className="h-full">
      {videoLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
            <div className="loader"></div>
        </div>
      )}

      <iframe
        allowFullScreen={allowFullScreen}
        width={width}
        height={height}
        allow={allow}
        src={videoSrc}
        loading="lazy"
        onLoad={handleVideoLoad}
        onError={handleVideoError}
      ></iframe>
    </div>
  );
};

export default IFrameWithLoader;
