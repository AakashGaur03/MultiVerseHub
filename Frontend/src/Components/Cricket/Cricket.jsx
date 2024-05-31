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

  const getPointsTable = async (id) => {
    try {
      const response = await getCricketPointsTableAPIFunc(id);
      console.log(response, "1");
      setQuery("");
      let datatoStrore = {};
      if (response) {
        datatoStrore = {
          id,
          data: response.pointsTable[0].pointsTableInfo,
        };
      } else {
        datatoStrore = {
          id: -1,
          data: [],
        };
      }
      setpointstable(datatoStrore);

      navigate(`${id}/pointsTable`, {
        state: { pointsTableData: datatoStrore },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRanking = async() =>{
      // console.log(pointstable.data, "pointstable");

      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen',
        params: {
          formatType: 'odi',
          isWomen: '1'
        },
        headers: {
          'x-rapidapi-key': '94d5879a35msh63d070accbd04e3p13e33ejsnb6869afe3816',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  }

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
                className="cursor-pointer"
                onClick={() => getPointsTable(data.matchInfo.seriesId)}
              >
                Table
              </NavLink>
            </div>
          ))}

          <button onClick={getRanking}>Get Ranks</button>
      </div>
    </>
  );
};

export default Cricket;
