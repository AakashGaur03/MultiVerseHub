import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEntertainmentParticularsData } from "../../Features";
import { AboutSection, CustomCircularProgressRating } from "../..";
import { Badge } from "react-bootstrap";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";

const Particulars = () => {
  const globalParticularData = useSelector(
    (state) => state.getEntertainmentData.entertainmentParticularData
  );

  const [particularData, setParticulatData] = useState(globalParticularData);

  const [aboutData, setAboutData] = useState([]);
  const [creditsDate, setCreditsData] = useState([]);
  const [reviewsDate, setReviewsData] = useState([]);
  const [videoDate, setVideoData] = useState([]);
  const [imagesDate, setImagesData] = useState([]);

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
    console.log(particularData);
  }, [globalParticularData]);
  return (
    <>
    <AboutSection aboutData={aboutData} />
    </>
  );
};

export default Particulars;
