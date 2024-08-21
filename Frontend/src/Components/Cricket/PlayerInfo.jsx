import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getcricketPlayerInfo } from "../../Features";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Table } from "react-bootstrap";

const PlayerInfo = () => {
  const { playerId } = useParams();
  const dispatch = useDispatch();
  const currentPlayerInfo = useSelector((state) => state.cricket.playerInfo);
  const [playerData, setPlayerData] = useState({});
  useEffect(() => {
    let payload = {
      playerId,
      prevData: currentPlayerInfo,
    };
    dispatch(getcricketPlayerInfo(payload));
  }, [playerId]);
  useEffect(() => {
    setPlayerData(currentPlayerInfo?.[playerId]);
    console.log(currentPlayerInfo, "currentPlayerInfo");
    console.log(playerData, "playerData");
  }, [currentPlayerInfo]);
  console.log(playerId);
  return (
    <>
      {/* <Table borderless hover variant="dark">
        <thead>
          <tr>
            {playerData?.batting?.headers?.map((header, index) => (
              <th key={index} className="p-2 border-b text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerData?.batting?.values?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {row.values.map((value, colIndex) => (
                <td key={colIndex} className="p-2 border-b text-left">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table> */}
      {/* <table className="min-w-full border-collapse border"> */}
      {/* <Table borderless hover variant="dark"responsive >
      <thead>
        <tr>
          <th className="p-2 border-b text-left">Format</th>
          {currentPlayerInfo?.batting?.values?.map((row, index) => (
            <th key={index} className="p-2 border-b text-left">
              {row.values[0]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentPlayerInfo?.batting?.headers?.slice(1).map((header, headerIndex) => (
          <tr key={headerIndex} className="border-b">
            <td className="p-2 border-b text-left">{header}</td>
            {currentPlayerInfo?.batting?.values?.map((row, colIndex) => (
              <td key={colIndex} className="p-2 border-b text-left">
                {row.values[headerIndex + 1]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table> */}

      <Row>
        <Col md={4}></Col>
        <Col md={8}>
          <div className="mt-3 uppercase font-semibold text-2xl text-gray-300 ">
            Batting Career Summary
          </div>
          <Table borderless hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="sticky-col p-2 border-b text-center z-0">Format</th>
                {playerData?.batting?.values?.map((row, index) => (
                  <th key={index} className="p-2 border-b text-center">
                    {row.values[0] === "Not Out" ? "NO" : row.values[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerData?.batting?.headers
                ?.slice(1)
                .map((header, headerIndex) => (
                  <tr key={headerIndex} className="border-b">
                    <td className="sticky-col p-2 border-b text-center z-0">
                      {header}
                    </td>
                    {playerData?.batting?.values?.map((row, colIndex) => (
                      <td key={colIndex} className="p-2 border-b text-center">
                        {row.values[headerIndex + 1]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="mt-3 uppercase font-semibold text-2xl text-gray-300 ">
            Bowling Career Summary
          </div>
          <Table borderless hover variant="dark" responsive>
            <thead>
              <tr>
                <th className="sticky-col p-2 border-b text-center z-0">Format</th>
                {playerData?.bowling?.values?.map((row, index) => (
                  <th key={index} className="p-2 border-b text-center">
                    {row.values[0] === "Not Out" ? "NO" : row.values[0]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {playerData?.bowling?.headers
                ?.slice(1)
                .map((header, headerIndex) => (
                  <tr key={headerIndex} className="border-b">
                    <td className="sticky-col p-2 border-b text-center z-0">
                      {header}
                    </td>
                    {playerData?.bowling?.values?.map((row, colIndex) => (
                      <td key={colIndex} className="p-2 border-b text-center">
                        {row.values[headerIndex + 1]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default PlayerInfo;
