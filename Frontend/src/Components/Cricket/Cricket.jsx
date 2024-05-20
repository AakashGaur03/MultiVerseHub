import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { PointsTable, truncateText } from "../../index";
import { NavLink } from "react-router-dom";
import { getCricket } from "../../Features";
import { useDispatch } from "react-redux";
import { getCricketImageAPIFunc } from "../../Api";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios";

const Cricket = () => {
  const dispatch = useDispatch();
  const [cricketData, setCricketData] = useState([]);
  const [pointstable, setpointstable] = useState({ id: null, data: [] });

  useEffect(() => {
    dispatch(getCricket()).then((response) => {
      const typeMatches = response.data.responseData.typeMatches;
      console.log(response, "responseOFCRi");

      let LeaguesMatches = typeMatches.find(
        (match) => match.matchType == "League"
      );
      let InterMatches = typeMatches.find(
        (match) => match.matchType == "International"
      );
      let WomenMatches = typeMatches.find(
        (match) => match.matchType == "Women"
      );

      let IPLMatches = LeaguesMatches?.seriesMatches
        .find((matchseries) =>
          matchseries.seriesAdWrapper.seriesName.includes(
            "Indian Premier League"
          )
        )
        .seriesAdWrapper.matches?.slice(0, 3);

      let IntlMatches = InterMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      let WomMatches = WomenMatches.seriesMatches
        .filter((match) => match.seriesAdWrapper)
        .slice(0, 2); // It slices number of series to 2

      // console.log(IntlMatches, "IntlMatches");

      let newCricketData = [];

      // Adding IPL matches to newCricketData
      if (Array.isArray(IPLMatches)) {
        newCricketData.push(...IPLMatches.slice(0, 3));
      }

      // Adding International matches to newCricketData
      IntlMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });
      WomMatches.forEach((match) => {
        if (Array.isArray(match.seriesAdWrapper.matches)) {
          newCricketData.push(...match.seriesAdWrapper.matches.slice(0, 2)); // It slices mathces in series to 2
        }
      });

      // Update the state once with all the data
      setCricketData(newCricketData);
    });
  }, []);

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
        "x-rapidapi-key": "",
        "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      console.log(response.data);
      console.log(response.data.pointsTable);
      console.log(
        response.data.pointsTable[0].pointsTableInfo,
        "pointsTableInfo"
      );
      if (response.data) {
        let datatoStrore = {
          id,
          data: response.data.pointsTable[0].pointsTableInfo,
        };
        setpointstable(datatoStrore);
        console.log(pointstable.data, "pointstable");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex overflow-y-auto">
          {cricketData &&
            cricketData.map((data, index) => (
              <div className="min-w-52 me-4" md={4} key={index}>
                {/* {data.matchInfo.team1 && (
              <img
                src={imageSrcMap[data.matchInfo.team1.imageId]}
                alt={`Team 1: ${data.matchInfo.team1.teamSName}`}
              />
            )} */}
                {/* <img
              src={getCricketImage(data.matchInfo.team1?.imageId)}
              alt=""
            />*/}
                {/* <div> {data.matchInfo.team1?.imageId}</div> */}
                <div>
                  {data.matchInfo?.matchDesc} {data.matchInfo?.seriesName}{" "}
                  {data.matchInfo?.matchFormat}
                </div>
                <div>
                  {data.matchInfo.team1?.teamSName}
                  {data.matchScore?.team1Score.inngs1.runs &&
                    !data.matchScore?.team1Score.inngs2?.runs && (
                      <>
                        : {data.matchScore?.team1Score.inngs1.runs}-
                        {data.matchScore?.team1Score.inngs1.wickets} (
                        {data.matchScore?.team1Score.inngs1.overs})
                      </>
                    )}
                  {data.matchScore?.team1Score.inngs1.runs &&
                    data.matchScore?.team1Score.inngs2?.runs && (
                      <>
                        : {data.matchScore?.team1Score.inngs1.runs}-
                        {data.matchScore?.team1Score.inngs1.wickets}{" "}
                        {data.matchScore?.team1Score.inngs2?.runs}-
                        {data.matchScore?.team1Score.inngs2?.wickets}
                      </>
                    )}
                </div>
                <div></div>
                <div>
                  {data.matchInfo.team2?.teamSName}
                  {data.matchScore?.team2Score.inngs1.runs &&
                    !data.matchScore?.team2Score.inngs2?.runs && (
                      <>
                        : {data.matchScore?.team2Score.inngs1.runs}-
                        {data.matchScore?.team2Score.inngs1.wickets} (
                        {data.matchScore?.team2Score.inngs1.overs})
                      </>
                    )}
                  {data.matchScore?.team2Score.inngs1.runs &&
                    data.matchScore?.team2Score.inngs2?.runs && (
                      <>
                        : {data.matchScore?.team2Score.inngs1.runs}-
                        {data.matchScore?.team2Score.inngs1.wickets}{" "}
                        {data.matchScore?.team2Score.inngs2?.runs}-
                        {data.matchScore?.team2Score.inngs2?.wickets}
                      </>
                    )}
                </div>
                <div></div>
                <div>{data.matchInfo?.status}</div>
                <NavLink
                  // to={`${data.matchInfo.seriesId}/pointsTable`}
                  className="cursor-pointer"
                  onClick={() => getPointsTable(data.matchInfo.seriesId)}
                >
                  Table
                </NavLink>
              </div>
            ))}

          {/* <Routes>

</Routes> */}

          {/* <div>{imageSrc && <img src={imageSrc} alt="Cricbuzz Image" />}</div> */}
        </div>
        
        <div>
          {pointstable.data &&
            pointstable.data.map((data, index) => (
              <div key={index}>
                <div>Hi</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cricket;
