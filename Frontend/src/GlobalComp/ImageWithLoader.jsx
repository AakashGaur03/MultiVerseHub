import React, { useState } from "react";

const ImageWithLoader = ({ src, width, alt, failedImage }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const handleImageError = () => {
    setImageSrc(failedImage);
    setImageLoading(false);
  };
  return (
    <div className="" style={{ width: width }}>
      {imageLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="loader"></div>
        </div>
      )}

      <img
        src={imageSrc}
        alt={alt}
        width={width}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default ImageWithLoader;
