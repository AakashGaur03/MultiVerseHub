import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getCricket } from "../../Features";
import { useDispatch } from "react-redux";
import { getCricketImageAPIFunc } from "../../Api";
import axios from "axios";

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
  // const [imageSrcMap, setImageSrcMap] = useState({});
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const srcMap = {};
  //     for (const data of cricketData) {
  //       if (data.matchInfo.team1) {
  //         const imageId = data.matchInfo.team1.imageId;
  //         if (!imageSrcMap[imageId]) {
  //           try {
  //             const imageData = await getCricketImage(imageId);
  //             srcMap[imageId] = imageData;
  //           } catch (error) {
  //             console.error("Error fetching cricket image:", error);
  //             srcMap[imageId] = null;
  //           }
  //         } else {
  //           srcMap[imageId] = imageSrcMap[imageId];
  //         }
  //       }
  //     }
  //     setImageSrcMap(srcMap);
  //   };

  //   if (cricketData.length > 0) {
  //     fetchImages();
  //   }
  // }, [cricketData]);

  // const getCricketImage = async (imageId) => {
  //   try {
  //     const response = await getCricketImageAPIFunc(imageId);
  //     // Convert binary data to base64 encoded string
  //     const imageData = Buffer.from(response.data, 'binary').toString('base64');
  //     return `data:image/jpeg;base64,${imageData}`;
  //   } catch (error) {
  //     console.error("Error fetching cricket image:", error);
  //     return null;
  //   }
  // };

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c231889/i.jpg',
        headers: {
          'X-RapidAPI-Key': '22d26b47d8msh803eeb4fcc0d938p12274fjsna785b41ba11b',
          'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        },
        responseType: 'blob' // Set the response type to blob
      };
    
      try {
        const response = await axios.request(options);
        const reader = new FileReader(); // Create a new FileReader object
        reader.readAsDataURL(response.data); // Read the blob data as a data URL
    
        reader.onload = () => {
          const imageSrc = reader.result; // Get the base64-encoded data URL
          setImageSrc(imageSrc); // Set the image source for rendering
        };
      } catch (error) {
        console.error('Error fetching cricket image:', error);
      }
    };
    

    fetchImage();
  }, []);

  return (
    <div className="flex overflow-y-auto">
      <>
        {cricketData &&
          cricketData.slice(1, 2).map((data, index) => (
            <div className="min-w-52 me-4" md={4} key={index}>
               {/* {data.matchInfo.team1 && (
              <img
                src={imageSrcMap[data.matchInfo.team1.imageId]}
                alt={`Team 1: ${data.matchInfo.team1.teamSName}`}
              />
            )} */}
              <div> {data.matchInfo.team1?.imageId}</div>
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



<div>
      {imageSrc && <img src={imageSrc} alt="Cricbuzz Image" />}
    </div>
      </>
    </div>
  );
};

export default Cricket;
