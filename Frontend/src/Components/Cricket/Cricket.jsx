import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getCricket } from "../../Features";
import { useDispatch } from "react-redux";
import { getCricketImageAPIFunc } from "../../Api";

const Cricket = () => {
  const dispatch = useDispatch();
  const [cricketData, setCricketData] = useState([]);
  const [imageData, setImageData] = useState(null); // State variable to store image data

  useEffect(() => {
    dispatch(getCricket()).then((response) => {
      let LeaguesMatches = response.data.responseData.typeMatches.find(
        (match) => match.matchType == "League"
      );
      let InterMatches = response.data.responseData.typeMatches.find(
        (match) => match.matchType == "International"
      );
      console.log(LeaguesMatches, "LeaguesMatches");
      console.log(InterMatches, "InterMatches");

      let IPLMatches = LeaguesMatches.seriesMatches.find((matchseries) =>
        matchseries.seriesAdWrapper.seriesName.includes("Indian Premier League")
      ).seriesAdWrapper.matches;

      let IntlMatches = InterMatches.seriesMatches.filter(
        (match) => match.seriesAdWrapper
      );

      console.log(IntlMatches, "IntlMatches");

      let newCricketData = [];

      // Adding IPL matches to newCricketData
      if (Array.isArray(IPLMatches)) {
        newCricketData.push(...IPLMatches);
      }

      // Adding International matches to newCricketData
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches);
        }
      });

      // Update the state once with all the data
      setCricketData(newCricketData);
    });
  }, []);

  // const getCricketImage = async (imageId) => {
  //   try {
  //     const response = await getCricketImageAPIFunc(imageId); // Call getCricketImageAPIFunc with imageId
  //     return response; // Return the image directly from the API response
  //   } catch (error) {
  //     console.error("Error fetching cricket image:", error);
  //     return null;
  //   }
  // };
  const getCricketImage = async (imageId) => {
    try {
      const response = await getCricketImageAPIFunc(imageId);
      setImageData(response); // Update imageData state with the fetched image data
    } catch (error) {
      console.error("Error fetching cricket image:", error);
    }
  };

  return (
    <div className="flex overflow-y-auto">
      <>
        {cricketData &&
          cricketData.slice(1, 2).map((data, index) => (
            <div className="min-w-52 me-4" md={4} key={index}>
              {/* <img src={data.matchInfo.team2?.imageId} alt="" /> */}
              {/* <img src={getCricketImage(data.matchInfo.team1?.imageId)} alt="" /> */}
              {imageData && <img src={imageData} alt="" />}
              <div> {data.matchInfo.team1?.imageId}</div>
              <img src={data.matchInfo.team1?.imageId} alt="" />
              <div>
                {data.matchInfo?.matchDesc} {data.matchInfo?.seriesName}{" "}
                {data.matchInfo?.matchFormat}
              </div>
              <div>
                {data.matchInfo.team1?.teamSName} :{" "}
                {data.matchScore?.team1Score.inngs1.runs}-
                {data.matchScore?.team1Score.inngs1.wickets} (
                {data.matchScore?.team1Score.inngs1.overs})
              </div>
              <div></div>
              <div>
                {data.matchInfo.team2?.teamSName} :{" "}
                {data.matchScore?.team2Score.inngs1.runs}-
                {data.matchScore?.team2Score.inngs1.wickets} (
                {data.matchScore?.team2Score.inngs1.overs})
              </div>
              <div></div>
              <div>{data.matchInfo?.status}</div>
            </div>
          ))}
      </>
    </div>
  );
};

export default Cricket;
