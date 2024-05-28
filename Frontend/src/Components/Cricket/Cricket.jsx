import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { PointsTable, truncateText } from "../../index";
import { NavLink } from "react-router-dom";
import { getCricket, getCricketPointsTable } from "../../Features";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getCricketImageAPIFunc,
  getCricketPointsTableAPIFunc,
} from "../../Api";
import axios from "axios";

const Cricket = ({
  query,
  setQuery,
  cricketData,
  setCricketData,
  handleChange,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [cricketData, setCricketData] = useState([]);
  const [pointstable, setpointstable] = useState({ id: null, data: [] });

  // useEffect(() => {
  //   dispatch(getCricket()).then((response) => {
  //     const typeMatches = response.data.responseData.typeMatches;
  //     console.log(response, "responseOFCRi");

  //     let LeaguesMatches = typeMatches.find(
  //       (match) => match.matchType == "League"
  //     );
  //     let InterMatches = typeMatches.find(
  //       (match) => match.matchType == "International"
  //     );
  //     let WomenMatches = typeMatches.find(
  //       (match) => match.matchType == "Women"
  //     );

  //     let IPLMatches = LeaguesMatches?.seriesMatches
  //       .find((matchseries) =>
  //         matchseries.seriesAdWrapper.seriesName.includes(
  //           "Indian Premier League"
  //         )
  //       )
  //       .seriesAdWrapper.matches?.slice(0, 3);

  //     let IntlMatches = InterMatches.seriesMatches
  //       .filter((match) => match.seriesAdWrapper)
  //       .slice(0, 2); // It slices number of series to 2

  //     let WomMatches = WomenMatches.seriesMatches
  //       .filter((match) => match.seriesAdWrapper)
  //       .slice(0, 2); // It slices number of series to 2

  //     // console.log(IntlMatches, "IntlMatches");

  //     let newCricketData = [];

  //     // Adding IPL matches to newCricketData
  //     if (Array.isArray(IPLMatches)) {
  //       newCricketData.push(...IPLMatches.slice(0, 3));
  //     }

  //     // Adding International matches to newCricketData
  //     IntlMatches.forEach((match) => {
  //       if (Array.isArray(match.seriesAdWrapper.matches)) {
  //         newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
  //       }
  //     });
  //     WomMatches.forEach((match) => {
  //       if (Array.isArray(match.seriesAdWrapper.matches)) {
  //         newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
  //       }
  //     });

  //     // Update the state once with all the data
  //     setCricketData(newCricketData);
  //   });
  // }, []);

  //   const getCricketImage = async (imageId) => {
  //     try {
  //         const response = await getCricketImageAPIFunc(imageId);
  //         console.log(response, "response");

  //         // Check if response data is a Blob
  //         if (!(response instanceof Blob)) {
  //             throw new Error('Response data is not a Blob.');
  //         }

  //         const reader = new FileReader(); // Create a new FileReader object

  //         reader.readAsDataURL(response); // Read the blob data as a data URL

  //         reader.onload = () => {
  //             const imageSrc = reader.result; // Get the base64-encoded data URL
  //             console.log(imageSrc, "imageSrc");
  //             setImageSrc(imageSrc); // Set the image source for rendering
  //         };
  //     } catch (error) {
  //         console.error("Error fetching cricket image:", error);
  //         return null;
  //     }
  // };

  // const [imageSrc, setImageSrc] = useState("");

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     const options = {
  //       method: "GET",
  //       url: "https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c231889/i.jpg",
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "",
  //         "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
  //       },
  //       responseType: "blob", // Set the response type to blob
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response, "respmse22");
  //       const reader = new FileReader(); // Create a new FileReader object
  //       console.log(reader, "reader");

  //       reader.readAsDataURL(response.data); // Read the blob data as a data URL

  //       reader.onload = () => {
  //         const imageSrc = reader.result; // Get the base64-encoded data URL
  //         console.log(reader.result, "resdrresyl");
  //         setImageSrc(imageSrc); // Set the image source for rendering
  //       };
  //     } catch (error) {
  //       console.error("Error fetching cricket image:", error);
  //     }
  //   };

  //   fetchImage();
  // }, []);
  const getPointsTable = async (id) => {
    const options = {
      method: "GET",
      url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`,
      headers: {
        "x-rapidapi-key": "22d26b47d8msh803eeb4fcc0d938p12274fjsna785b41ba11b",
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await getCricketPointsTableAPIFunc(id);
      console.log(response, "1");
      // console.log(response.pointsTable, "3");
      setQuery("");
      // console.log(response.pointsTable[0].pointsTableInfo, "pointsTableInfo");
      let datatoStrore ={}
      if (response) {
        datatoStrore = {
          id,
          data: response.pointsTable[0].pointsTableInfo,
        };
      } else{
        datatoStrore={
          id:-1,
          data:[]
        }

      } 
      setpointstable(datatoStrore);
      // console.log(pointstable.data, "pointstable");

      navigate(`${id}/pointsTable`, {
        state: { pointsTableData: datatoStrore },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex overflow-y-auto">
        {cricketData &&
          cricketData.map((data, index) => (
            <div className="min-w-52 me-4" md={4} key={index}>
              <div>
                {data.matchInfo?.matchDesc} {data.matchInfo?.seriesName}{" "}
                {data.matchInfo?.matchFormat}
              </div>
              <div>
                {data.matchInfo.team1?.teamSName}
                {data.matchScore?.team1Score?.inngs1.runs &&
                  !data.matchScore?.team1Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team1Score?.inngs1.runs}-
                      {data.matchScore?.team1Score?.inngs1.wickets} (
                      {data.matchScore?.team1Score?.inngs1.overs})
                    </>
                  )}
                {data.matchScore?.team1Score?.inngs1.runs &&
                  data.matchScore?.team1Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team1Score?.inngs1.runs}-
                      {data.matchScore?.team1Score?.inngs1.wickets}{" "}
                      {data.matchScore?.team1Score?.inngs2?.runs}-
                      {data.matchScore?.team1Score?.inngs2?.wickets}
                    </>
                  )}
              </div>
              <div></div>
              <div>
                {data.matchInfo.team2?.teamSName}
                {data.matchScore?.team2Score?.inngs1.runs &&
                  !data.matchScore?.team2Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team2Score?.inngs1.runs}-
                      {data.matchScore?.team2Score?.inngs1.wickets} (
                      {data.matchScore?.team2Score?.inngs1.overs})
                    </>
                  )}
                {data.matchScore?.team2Score?.inngs1.runs &&
                  data.matchScore?.team2Score?.inngs2?.runs && (
                    <>
                      : {data.matchScore?.team2Score?.inngs1.runs}-
                      {data.matchScore?.team2Score?.inngs1.wickets}{" "}
                      {data.matchScore?.team2Score?.inngs2?.runs}-
                      {data.matchScore?.team2Score?.inngs2?.wickets}
                    </>
                  )}
              </div>
              <div></div>
              <div>{data.matchInfo?.status}</div>
              <NavLink
                // to={{
                //   pathname: `${data.matchInfo.seriesId}/pointsTable`,
                //   state: { pointsTableData: pointstable },
                // }}
                className="cursor-pointer"
                onClick={() => getPointsTable(data.matchInfo.seriesId)}
              >
                Table
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default Cricket;
