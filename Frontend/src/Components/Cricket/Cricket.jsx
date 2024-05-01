import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { truncateText } from "../../index";
import { getCricket } from "../../Features";
import { useDispatch } from "react-redux";

const Cricket = () => {
  const dispatch = useDispatch();
  const [cricketData, setCricketData] = useState([]);
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
  return (
    <div>
      Cricket
      {cricketData &&
        cricketData.map((data, index) => (
          <div key={index}>
            <div>{data.matchInfo?.seriesName}</div>
            <div>{data.matchInfo?.stateTitle}</div>
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
    </div>
  );
};

export default Cricket;
