import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { AboutSection, CreditSection, ReviewSection } from "../..";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);

  const [aboutData, setAboutData] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [imagesData, setImagesData] = useState([]);

  const { category, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    let payload = {
      category: category,
      id: id,
    };
    dispatch(getEntertainmentParticularsData(payload));
  }, []);

  useEffect(() => {
    setParticulatData(globalParticularData);
    console.log(globalParticularData, "globalParticularData");
    setAboutData(globalParticularData?.about);
    setCreditsData(globalParticularData?.credits);
    setReviewsData(globalParticularData?.reviews);
    console.log(particularData);
  }, [globalParticularData]);
  return (
    <>
      <AboutSection aboutData={aboutData} />
      <CreditSection creditsData={creditsData} />
      <ReviewSection reviewsData={reviewsData} />
    </>
  );
};

export default Particulars;
